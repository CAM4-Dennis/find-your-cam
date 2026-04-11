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
          <meta name="description" content={`Bekijk ${model.name}${model.age ? ` (${model.age})` : ''} gratis live op ${platformName}. ${model.country ? `${model.country} webcam model` : 'Webcam model'} — live sex cam, sexchat en erotische shows op StartVagina.`} />
          <meta name="keywords" content={`${model.name}, ${platformName}, ${model.name} webcam, ${model.name} live, ${platformName} cam, webcamsex ${platformName}, ${model.name} ${platformName}`} />
          <link rel="canonical" href={`https://startvagina.nl/${platform}/${username}`} />
          <meta property="og:title" content={`${model.name} Live op ${platformName} — StartVagina`} />
          <meta property="og:description" content={`Bekijk ${model.name} gratis live op ${platformName}. Live webcamsex en sexchat.`} />
          <meta property="og:url" content={`https://startvagina.nl/${platform}/${username}`} />
          <meta name="robots" content="noindex, nofollow" />
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

          {/* Similar cams */}
          <SimilarCams currentModel={model} />
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default CamStream;
