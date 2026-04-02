import CamCard, { type CamModel } from "./CamCard";

interface CamGridProps {
  title: string;
  models: CamModel[];
  totalOnline?: number;
}

const CamGrid = ({ title, models, totalOnline }: CamGridProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="section-title">{title}</h2>
        {totalOnline && (
          <a href="/all" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Alle <span className="text-primary font-semibold">{totalOnline.toLocaleString()}</span> modellen online →
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {models.map((model) => (
          <CamCard key={model.id} model={model} />
        ))}
      </div>
    </section>
  );
};

export default CamGrid;
