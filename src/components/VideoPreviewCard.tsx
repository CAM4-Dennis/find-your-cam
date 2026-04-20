import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Clock, Heart, ExternalLink, Volume2, VolumeX } from "lucide-react";
import type { Language } from "@/i18n/translations";

const PREVIEW_SECONDS = 15;

interface VideoPreviewCardProps {
  postId: number;
  title: string;
  username: string;
  avatarUrl: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration?: number; // ms
  reactionsCount: number;
  affiliateLink: string;
  lang: Language;
}

const ctaI18n: Record<string, { watchFull: string; previewEnded: string; continueOn: string }> = {
  nl: { watchFull: "Bekijk volledige video op CAM4", previewEnded: "Preview afgelopen", continueOn: "Verder kijken op CAM4" },
  en: { watchFull: "Watch full video on CAM4", previewEnded: "Preview ended", continueOn: "Continue watching on CAM4" },
  fr: { watchFull: "Voir la vidéo complète sur CAM4", previewEnded: "Aperçu terminé", continueOn: "Continuer sur CAM4" },
  de: { watchFull: "Ganzes Video auf CAM4 ansehen", previewEnded: "Vorschau beendet", continueOn: "Weiter auf CAM4" },
  es: { watchFull: "Ver video completo en CAM4", previewEnded: "Vista previa terminada", continueOn: "Seguir viendo en CAM4" },
  it: { watchFull: "Guarda il video completo su CAM4", previewEnded: "Anteprima terminata", continueOn: "Continua su CAM4" },
};

function formatDuration(ms?: number): string {
  if (!ms) return "";
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

const VideoPreviewCard = ({
  postId,
  title,
  username,
  avatarUrl,
  videoUrl,
  thumbnailUrl,
  duration,
  reactionsCount,
  affiliateLink,
  lang,
}: VideoPreviewCardProps) => {
  const [state, setState] = useState<"idle" | "playing" | "ended">("idle");
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number>(0);
  const t = ctaI18n[lang] || ctaI18n.nl;

  const startPreview = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state === "playing") return;
    setState("playing");
    setProgress(0);
  }, [state]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMuted((m) => !m);
  }, []);

  // Handle video time tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video || state !== "playing") return;

    video.currentTime = 0;
    video.muted = muted;
    video.play().catch(() => {
      // Autoplay blocked — keep showing thumbnail
      setState("idle");
    });

    const onTimeUpdate = () => {
      const elapsed = video.currentTime;
      setProgress(Math.min(elapsed / PREVIEW_SECONDS, 1));
      if (elapsed >= PREVIEW_SECONDS) {
        video.pause();
        setState("ended");
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.pause();
    };
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync muted state
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <div className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-colors">
      {/* Video / Thumbnail area */}
      <div className="aspect-video relative overflow-hidden bg-muted">
        {/* Always render video element (hidden when idle) */}
        <video
          ref={videoRef}
          src={state !== "idle" ? videoUrl : undefined}
          poster={thumbnailUrl}
          muted={muted}
          playsInline
          preload="none"
          className={`w-full h-full object-cover ${state === "idle" ? "hidden" : ""}`}
        />

        {/* Thumbnail (shown when idle) */}
        {state === "idle" && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* IDLE: Play button overlay */}
        {state === "idle" && (
          <button
            onClick={startPreview}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg hover:bg-primary transition-colors">
              <Play size={22} className="text-white fill-white ml-0.5" />
            </div>
          </button>
        )}

        {/* PLAYING: Progress bar + mute button */}
        {state === "playing" && (
          <>
            {/* Progress bar at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-black/30">
              <div
                className="h-full bg-primary transition-all duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              {muted ? <VolumeX size={14} className="text-white" /> : <Volume2 size={14} className="text-white" />}
            </button>

            {/* Preview badge */}
            <span className="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-0.5 rounded font-medium">
              PREVIEW
            </span>
          </>
        )}

        {/* ENDED: CTA overlay */}
        {state === "ended" && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 px-4">
            <p className="text-white/70 text-xs">{t.previewEnded}</p>
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg"
            >
              <ExternalLink size={14} />
              {t.continueOn}
            </a>
            <button
              onClick={(e) => { e.preventDefault(); setState("idle"); setProgress(0); }}
              className="text-white/50 text-xs hover:text-white/80 transition-colors"
            >
              ↻ Replay
            </button>
          </div>
        )}

        {/* Duration badge (idle only) */}
        {state === "idle" && duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
            <Clock size={10} />
            {formatDuration(duration)}
          </span>
        )}
      </div>

      {/* Info section */}
      <div className="p-2.5">
        <h3 className="text-sm font-medium text-foreground truncate">{title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <img
            src={avatarUrl}
            alt={username}
            className="w-5 h-5 rounded-full object-cover"
            loading="lazy"
          />
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs text-muted-foreground truncate hover:text-primary transition-colors"
          >
            {username}
          </a>
          {reactionsCount > 0 && (
            <span className="text-xs text-muted-foreground flex items-center gap-0.5 ml-auto">
              <Heart size={10} /> {reactionsCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPreviewCard;
