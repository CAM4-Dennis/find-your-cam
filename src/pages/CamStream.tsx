import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";

// Auto-refreshing thumbnail for platforms without stream embed (e.g., XCams)
function useRefreshingThumbnail(baseUrl: string, enabled: boolean, intervalMs = 3000) {
  const [url, setUrl] = useState(baseUrl);
  useEffect(() => {
    if (!enabled || !baseUrl) return;
    setUrl(baseUrl + "?t=" + Date.now());
    const timer = setInterval(() => {
      setUrl(baseUrl + "?t=" + Date.now());
    }, intervalMs);
    return () => clearInterval(timer);
  }, [baseUrl, enabled, intervalMs]);
  return url;
}
import Hls from "hls.js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import type { CamModel } from "@/types/cam";
import { ArrowLeft, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import SimilarCams from "@/components/SimilarCams";

/** Generate a dynamic SEO-rich profile description from model data */
function generateProfileText(model: CamModel, platformName: string): string {
  const parts: string[] = [];

  // Opening
  const genderLabel = model.gender === "female" ? "cam girl" : model.gender === "couple" ? "cam koppel" : model.gender === "male" ? "cam model" : "cam model";
  const ageText = model.age ? ` van ${model.age} jaar` : "";
  const countryText = model.country && model.country !== "Onbekend" ? ` uit ${model.country}` : "";

  parts.push(`${model.name} is een populaire ${genderLabel}${ageText}${countryText} op ${platformName}.`);

  // Status
  if (model.viewers > 0) {
    parts.push(`Op dit moment ${model.viewers > 100 ? "kijken er " + model.viewers.toLocaleString() + " mensen mee" : "is " + model.name + " live met " + model.viewers.toLocaleString() + " kijkers"} — een ${model.viewers > 500 ? "enorm populaire" : model.viewers > 100 ? "drukbezochte" : "gezellige"} show.`);
  }

  // Quality & features
  const features: string[] = [];
  if (model.isHD) features.push("HD-kwaliteit stream");
  if (model.isNew) features.push("nieuw op het platform");
  if (model.isMobile) features.push("streamt vanaf mobiel");
  if (features.length > 0) {
    parts.push(`${model.name} biedt ${features.join(", ")}.`);
  }

  // Languages
  if (model.languages && model.languages.length > 0) {
    if (model.languages.length === 1) {
      parts.push(`${model.name} spreekt ${model.languages[0]}.`);
    } else {
      const last = model.languages[model.languages.length - 1];
      const rest = model.languages.slice(0, -1).join(", ");
      parts.push(`${model.name} spreekt ${rest} en ${last}, waardoor je makkelijk kunt chatten.`);
    }
  }

  // Tags
  if (model.tags && model.tags.length > 0) {
    const tagList = model.tags.slice(0, 5).map(t => t.toLowerCase()).join(", ");
    parts.push(`Populaire tags bij deze show: ${tagList}.`);
  }

  // Platform context
  const platformContexts: Record<string, string> = {
    Chaturbate: `Op Chaturbate kun je de show van ${model.name} gratis bekijken. Tip met tokens voor interactie of vraag een privé show aan voor een persoonlijke ervaring.`,
    Cam4: `${model.name} is actief op CAM4, het platform dat bekend staat om echte amateurs en een sterke Nederlandse community. De show is gratis te bekijken.`,
    BongaCams: `Via BongaCams stream ${model.name} in hoge kwaliteit. Het platform biedt gratis tokens voor nieuwe gebruikers, ideaal om direct te kunnen tippen.`,
    Stripchat: `Op Stripchat biedt ${model.name} een interactieve show. Het platform staat bekend om slimme filters en innovatieve features zoals VR-shows.`,
    XCams: `${model.name} is te vinden op XCams, het premium Europese cam platform. De shows zijn intiem en persoonlijk door het kleinere publiek.`,
  };
  if (platformContexts[platformName]) {
    parts.push(platformContexts[platformName]);
  }

  // CTA
  parts.push(`Bekijk ${model.name} nu gratis live op StartVagina — geen registratie nodig.`);

  return parts.join(" ");
}

const CamStream = () => {
  const { platform, username } = useParams<{ platform: string; username: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const videoRef = useCallback((node: HTMLVideoElement | null) => {
    setVideoEl(node);
  }, []);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState(false);

  const model = location.state?.model as CamModel | undefined;

  // Format platform name for display in titles
  const platformDisplayNames: Record<string, string> = {
    chaturbate: "Chaturbate",
    bongacams: "BongaCams",
    cam4: "CAM4",
    stripchat: "Stripchat",
    xcams: "XCams",
  };
  const platformName = model?.platform || platformDisplayNames[platform || ""] || platform || "Webcam";

  const hasIframe = !!model?.iframeEmbed;
  const hasHls = !!model?.previewUrl && !hasIframe;
  // Platforms without embed support show thumbnail + CTA
  const isRedirectOnly = !hasIframe && !hasHls;
  // Auto-refresh thumbnail for XCams (live snapshots update every few seconds on CDN)
  const isXCams = model?.platform === "XCams";
  const liveThumbnail = useRefreshingThumbnail(model?.thumbnail || "", isRedirectOnly && isXCams);

  useEffect(() => {
    if (!hasHls || !model?.previewUrl || !videoEl) {
      return;
    }

    const video = videoEl;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 6,
        maxBufferLength: 10,
        maxMaxBufferLength: 30,
      });
      hlsRef.current = hls;
      hls.loadSource(model.previewUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.muted = true;
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              setError(true);
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = model.previewUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    } else {
      setError(true);
    }

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [model?.previewUrl, hasHls, hasIframe, videoEl]);

  if (!model) {
    return (
      <AgeGate>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="container flex-1 py-12 text-center">
            <p className="text-muted-foreground">Stream niet gevonden. Ga terug naar de homepage.</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
              <ArrowLeft size={16} className="mr-2" /> Terug
            </Button>
          </main>
          <Footer />
        </div>
      </AgeGate>
    );
  }

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{`${model.name} Live op ${platformName} — Gratis Webcamsex | StartVagina`}</title>
          <meta name="description" content={`Bekijk ${model.name}${model.age ? ` (${model.age})` : ''} gratis live op ${platformName}. ${model.country && model.country !== "Onbekend" ? model.country + " " : ""}${model.gender === "female" ? "cam girl" : model.gender === "couple" ? "koppel" : "cam model"}${model.tags?.length > 0 ? " — " + model.tags.slice(0, 3).join(", ") : ""}. Live webcamsex en sexchat op StartVagina.`} />
          <meta name="keywords" content={`${model.name}, ${platformName}, ${model.name} webcam, ${model.name} live, ${platformName} cam, webcamsex ${platformName}${model.country && model.country !== "Onbekend" ? ", " + model.country + " cam" : ""}${model.tags?.slice(0, 3).map(t => ", " + t).join("") || ""}`} />
          <link rel="canonical" href={`https://startvagina.nl/${platform}/${username}`} />
          <meta property="og:title" content={`${model.name} Live op ${platformName} — StartVagina`} />
          <meta property="og:description" content={`Bekijk ${model.name} gratis live op ${platformName}. Live webcamsex en sexchat.`} />
          <meta property="og:url" content={`https://startvagina.nl/${platform}/${username}`} />
          <meta name="robots" content="noindex, nofollow" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: model.name,
                ...(model.country && model.country !== "Onbekend" ? { nationality: model.country } : {}),
                ...(model.age ? { description: `${model.name}, ${model.age} jaar, webcam model op ${platformName}` } : {}),
                knowsLanguage: model.languages?.length > 0 ? model.languages : undefined,
              },
              description: `Bekijk ${model.name} live op ${platformName}`,
              url: `https://startvagina.nl/${platform}/${username}`,
            })}
          </script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-6 space-y-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} className="mr-1" /> Terug naar overzicht
          </Button>

          <div className="grid gap-6">
            {/* Video player / embed / thumbnail */}
            <div className="space-y-3">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-[16/10]">
                {hasIframe ? (
                  <div
                    className="absolute inset-0 w-full h-full"
                    dangerouslySetInnerHTML={{ __html: model.iframeEmbed!.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"') }}
                  />
                ) : hasHls && !error ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    muted
                    playsInline
                  />
                ) : (
                  /* Thumbnail preview with CTA overlay for platforms without embed */
                  <a
                    href={model.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="absolute inset-0 flex flex-col items-center justify-center group cursor-pointer"
                  >
                    <img
                      src={isXCams ? liveThumbnail : model.thumbnail}
                      alt={`Preview van ${model.name}`}
                      className={`absolute inset-0 w-full h-full object-cover ${isXCams ? "transition-opacity duration-500" : ""}`}
                      onError={(e) => { (e.target as HTMLImageElement).src = model.thumbnailFallback; }}
                    />
                    {isXCams && (
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-red-600/90 text-white text-xs font-bold px-2 py-1 rounded">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        LIVE SNAPSHOT
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ExternalLink size={28} className="text-primary-foreground" />
                      </div>
                      <span className="text-white font-semibold text-lg drop-shadow-lg">
                        Bekijk {model.name} Live op {model.platform}
                      </span>
                      <span className="text-white/70 text-sm">
                        Klik om de gratis stream te openen
                      </span>
                    </div>
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold font-display text-foreground">
                  {model.name}{model.age ? ` (${model.age})` : ''}
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {model.viewers.toLocaleString()} kijkers
                  </span>
                  <span>{model.countryFlag} {model.country}</span>
                </div>
              </div>

              {model.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {model.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar info */}
            <aside className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <h2 className="font-semibold text-foreground">Model Info</h2>
                <dl className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Platform</dt>
                    <dd className="text-foreground">{model.platform}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Geslacht</dt>
                    <dd className="text-foreground capitalize">{model.gender}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Land</dt>
                    <dd className="text-foreground">{model.countryFlag} {model.country}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Show type</dt>
                    <dd className="text-foreground capitalize">{model.showType.toLowerCase()}</dd>
                  </div>
                  {model.isHD && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Kwaliteit</dt>
                      <dd className="text-primary font-bold">HD</dd>
                    </div>
                  )}
                  {model.languages?.length > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Talen</dt>
                      <dd className="text-foreground">🗣️ {model.languages.join(", ")}</dd>
                    </div>
                  )}
                  {model.isNew && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Status</dt>
                      <dd className="text-accent font-bold">🆕 Nieuw</dd>
                    </div>
                  )}
                  {model.viewers > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Kijkers</dt>
                      <dd className="text-foreground">{model.viewers.toLocaleString()}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <a
                href={model.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block w-full text-center bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition"
              >
                Bekijk op {model.platform} →
              </a>

              {model.paymentUrl && (
                <a
                  href={model.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block w-full text-center bg-accent text-accent-foreground py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition"
                >
                  Start privé show →
                </a>
              )}
            </aside>
          </div>

          {/* Dynamic profile description */}
          <section className="bg-card border border-border rounded-lg p-5 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Over {model.name}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {generateProfileText(model, platformName)}
            </p>
            {model.tags?.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {model.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Similar cams */}
          <SimilarCams currentModel={model} />
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default CamStream;
