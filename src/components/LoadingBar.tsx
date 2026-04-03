import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface PlatformStatus {
  name: string;
  isLoading: boolean;
}

interface LoadingBarProps {
  platforms: PlatformStatus[];
}

const LoadingBar = ({ platforms }: LoadingBarProps) => {
  const total = platforms.length;
  const loaded = platforms.filter((p) => !p.isLoading).length;
  const allDone = loaded === total;

  if (allDone) return null;

  const percent = Math.round((loaded / total) * 100);

  return (
    <div className="bg-card border border-border rounded-lg p-3 space-y-2 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 size={14} className="animate-spin text-primary" />
        <span>
          Modellen laden… <span className="text-foreground font-medium">{loaded}/{total}</span> platformen geladen
        </span>
      </div>
      <Progress value={percent} className="h-1.5" />
      <div className="flex flex-wrap gap-1.5">
        {platforms.map((p) => (
          <span
            key={p.name}
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors ${
              p.isLoading
                ? "bg-muted text-muted-foreground"
                : "bg-primary/15 text-primary"
            }`}
          >
            {p.isLoading ? "⏳" : "✓"} {p.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingBar;
