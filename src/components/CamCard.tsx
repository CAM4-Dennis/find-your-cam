import { Eye } from "lucide-react";

export interface CamModel {
  id: string;
  name: string;
  age: number;
  viewers: number;
  country: string;
  countryFlag: string;
  platform: string;
  thumbnail: string;
  tags: string[];
  isOnline: boolean;
}

interface CamCardProps {
  model: CamModel;
}

const CamCard = ({ model }: CamCardProps) => {
  return (
    <article className="cam-card" aria-label={`${model.name}, ${model.age} jaar`}>
      <div className="relative overflow-hidden">
        <img
          src={model.thumbnail}
          alt={`Live webcam van ${model.name}`}
          className="cam-card-image"
          loading="lazy"
          width={320}
          height={180}
        />
        {/* Platform badge */}
        <span className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-xs font-medium px-2 py-0.5 rounded text-foreground">
          {model.platform}
        </span>
        {/* Viewers */}
        <span className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-xs font-medium px-2 py-0.5 rounded text-foreground flex items-center gap-1">
          <Eye size={12} />
          {model.viewers.toLocaleString()}
        </span>
        {/* Online indicator */}
        {model.isOnline && (
          <span className="absolute bottom-2 left-2 online-badge bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded text-foreground">
            <span className="online-dot" />
            LIVE
          </span>
        )}
      </div>
      <div className="p-3 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {model.name} ({model.age})
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{model.countryFlag}</span>
          <span>{model.country}</span>
        </div>
      </div>
    </article>
  );
};

export default CamCard;
