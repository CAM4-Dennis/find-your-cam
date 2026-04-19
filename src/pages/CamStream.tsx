import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

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

/** Generate a dynamic SEO-rich profile description from model data (translated) */
function generateProfileText(model: CamModel, platformName: string, t: any): string {
  const parts: string[] = [];

  const genderLabel = model.gender === "female" ? t.camGenderFemale : model.gender === "couple" ? t.camGenderCouple : model.gender === "male" ? t.camGenderMale : t.camGenderModel;
  const country = model.country && model.country !== "Onbekend" ? model.country : "";

  parts.push(t.profileIsPopular(model.name, genderLabel, model.age || null, country, platformName));

  if (model.viewers > 0) {
    parts.push(t.profileViewers(model.name, model.viewers));
  }

  const features: string[] = [];
  if (model.isHD) features.push("HD");
  if (model.isNew) features.push(t.camNew.toLowerCase());
  if (model.isMobile) features.push("mobile");
  if (features.length > 0) {
    parts.push(t.profileFeatures(model.name, features.join(", ")));
  }

  if (model.languages && model.languages.length > 0) {
    parts.push(t.profileLanguages(model.name, model.languages.join(", ")));
  }

  if (model.tags && model.tags.length > 0) {
    const tagList = model.tags.slice(0, 5).map(t => t.toLowerCase()).join(", ");
    parts.push(t.profileTags(tagList));
  }

  parts.push(t.profileWatchFree(model.name));

  return parts.join(" ");
}

const CamStream = () => {
  const { platform, username } = useParams<{ platform: string; username: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { localePath, t } = useLanguage();
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
            <p className="text-muted-foreground">{t.camStreamNotFound}</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate(localePath("/"))}>
              <ArrowLeft size={16} className="mr-2" /> {t.camBack}
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
          <title>{t.camTitle(model.name, platformName)}</title>
          <meta name="description" content={t.camDesc(model.name, platformName)} />
          <meta name="keywords" content={`${model.name}, ${platformName}, ${model.name} webcam, ${model.name} live${model.country && model.country !== "Onbekend" ? ", " + model.country + " cam" : ""}${model.tags?.slice(0, 3).map(tag => ", " + tag).join("") || ""}`} />
          <link rel="canonical" href={`https://www.startvagina.nl/${platform}/${username}`} />
          <meta property="og:title" content={t.camTitle(model.name, platformName)} />
          <meta property="og:description" content={t.camDesc(model.name, platformName)} />
          <meta property="og:url" content={`https://www.startvagina.nl/${platform}/${username}`} />
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
              url: `https://www.startvagina.nl/${platform}/${username}`,
            })}
          </script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-6 space-y-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(localePath("/"))} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} className="mr-1" /> {t.camBackToOverview}
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
                        {t.camWatchFree(model.name)}
                      </span>
                      <span className="text-white/70 text-sm">
                        {t.camClickToOpen}
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
                    <Eye size={14} /> {model.viewers.toLocaleString()} {t.camViewers}
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
                <h2 className="font-semibold text-foreground">{t.camModelInfo}</h2>
                <dl className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t.camPlatform}</dt>
                    <dd className="text-foreground">{model.platform}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t.camGender}</dt>
                    <dd className="text-foreground capitalize">{model.gender}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t.camCountry}</dt>
                    <dd className="text-foreground">{model.countryFlag} {model.country}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t.camShowType}</dt>
                    <dd className="text-foreground capitalize">{model.showType.toLowerCase()}</dd>
                  </div>
                  {model.isHD && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{t.camQuality}</dt>
                      <dd className="text-primary font-bold">HD</dd>
                    </div>
                  )}
                  {model.languages?.length > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{t.camLanguages}</dt>
                      <dd className="text-foreground">🗣️ {model.languages.join(", ")}</dd>
                    </div>
                  )}
                  {model.isNew && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{t.camStatus}</dt>
                      <dd className="text-accent font-bold">🆕 {t.camNew}</dd>
                    </div>
                  )}
                  {model.viewers > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{t.camViewersLabel}</dt>
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
                {t.camViewOnPlatform(model.platform)}
              </a>

              {model.paymentUrl && (
                <a
                  href={model.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block w-full text-center bg-accent text-accent-foreground py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition"
                >
                  {t.camStartPrivate}
                </a>
              )}
            </aside>
          </div>

          {/* Dynamic profile description */}
          <section className="bg-card border border-border rounded-lg p-5 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              {t.camAbout(model.name)}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {generateProfileText(model, platformName, t)}
            </p>
            {model.tags?.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{t.camTags}</h3>
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
