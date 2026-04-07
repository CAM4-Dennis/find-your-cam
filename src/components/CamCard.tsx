import type { CamModel } from "@/types/cam";
import { useState } from "react";
import { Link } from "react-router-dom";
interface CamCardProps {
  model: CamModel;
}

const CamCard = ({ model }: CamCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="cam-card group" aria-label={`${model.name}${model.age ? `, ${model.age} jaar` : ''}`}>
      <Link to={`/cam/${model.slug}`} state={{ model }} className="block">
        <div className="relative overflow-hidden">
          <img
            src={imgError ? model.thumbnailFallback : model.thumbnail}
            alt={`Live webcam van ${model.name}`}
            className="cam-card-image"
            loading="lazy"
            width={320}
            height={180}
            onError={() => setImgError(true)}
          />
          {/* HD badge */}
          {model.isHD && (
            <span className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
              HD
            </span>
          )}
          {/* New badge */}
          {model.isNew && (
            <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-accent/90 text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
              NIEUW
            </span>
          )}
          {/* HD badge */}
          {model.isHD && (
            <span className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
              HD
            </span>
          )}
          {/* New badge */}
          {model.isNew && (
            <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-accent/90 text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
              NIEUW
            </span>
          )}
        </div>
        <div className="p-3 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground truncate">
              {model.name}{model.age ? ` (${model.age})` : ''}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{model.countryFlag}</span>
            <span>{model.country}</span>
          </div>
          {model.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {model.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default CamCard;
