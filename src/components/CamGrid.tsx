import { useState } from "react";
import CamCard from "./CamCard";
import type { CamModel } from "@/types/cam";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/i18n/LanguageContext";

const PAGE_SIZE = 30;

interface CamGridProps {
  title: string;
  models: CamModel[];
  totalOnline?: number;
  isLoading?: boolean;
}

const CamGridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="rounded-lg overflow-hidden bg-card border border-border">
        <Skeleton className="w-full aspect-video" />
        <div className="p-3 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const CamGrid = ({ title, models, totalOnline, isLoading }: CamGridProps) => {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleModels = models.slice(0, visibleCount);
  const hasMore = visibleCount < models.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, models.length));
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="section-title">{title}</h2>
        {totalOnline !== undefined && (
          <span className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">{totalOnline.toLocaleString()}</span> modellen online
          </span>
        )}
      </div>
      {isLoading ? (
        <CamGridSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {visibleModels.map((model) => (
              <CamCard key={model.id} model={model} />
            ))}
          </div>
          {models.length > PAGE_SIZE && (
            <div className="flex flex-col items-center gap-2 pt-4">
              <span className="text-sm text-muted-foreground">
                {t.showingOfTotal(Math.min(visibleCount, models.length), models.length)}
              </span>
              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  {t.loadMore}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CamGrid;
