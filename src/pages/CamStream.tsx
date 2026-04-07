import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import type { CamModel } from "@/types/cam";
import { ArrowLeft, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const CamStream = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState(false);

  const model = location.state?.model as CamModel | undefined;

  // For CAM4, prefer iframe over HLS (HLS has CORS issues)
  const isCam4 = model?.platform === "Cam4";
  const hasIframe = !!model?.iframeEmbed;
  const hasHls = !!model?.previewUrl && !isCam4;

  useEffect(() => {
    if (!hasHls || !model?.previewUrl || !videoRef.current) {
      if (!hasIframe) setError(true);
      return;
    }

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      hls.loadSource(model.previewUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) setError(true);
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
  }, [model?.previewUrl, hasHls, hasIframe]);

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
          <title>{`${model.name} Live Webcam — StartVagina`}</title>
          <meta name="description" content={`Bekijk de live webcam stream van ${model.name} (${model.age}) uit ${model.country}. Gratis live cam op StartVagina.`} />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6 space-y-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} className="mr-1" /> Terug naar overzicht
          </Button>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Video player */}
            <div className="space-y-3">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                {hasIframe && !hasHls ? (
                  <div
                    className="absolute inset-0 w-full h-full"
                    dangerouslySetInnerHTML={{ __html: model.iframeEmbed!.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"') }}
                  />
                ) : error ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 gap-3">
                    <p className="text-sm">Stream is niet beschikbaar of offline.</p>
                    <a
                      href={model.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary underline text-sm"
                    >
                      Bekijk op {model.platform}
                    </a>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    muted
                    playsInline
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold font-display text-foreground">
                  {model.name} ({model.age})
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
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default CamStream;
