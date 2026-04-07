import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import LoadingBar from "@/components/LoadingBar";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import type { CamModel } from "@/types/cam";

interface Category {
  label: string;
  emoji: string;
  matchTags: string[];
  matchGender?: string[];
}

const categories: Category[] = [
  { label: "Teen (18+)", emoji: "🔞", matchTags: ["teen", "18", "young", "18+", "teenager"] },
  { label: "MILF", emoji: "💋", matchTags: ["milf"] },
  { label: "Mature", emoji: "👩‍🦳", matchTags: ["mature", "granny", "older"] },
  { label: "Asian", emoji: "🌸", matchTags: ["asian", "asiatic"] },
  { label: "Latina", emoji: "🌶️", matchTags: ["latina", "latino", "latin"] },
  { label: "Ebony", emoji: "🖤", matchTags: ["ebony", "black"] },
  { label: "Big Boobs", emoji: "🍈", matchTags: ["big boobs", "big tits", "bigboobs", "bigtits", "busty", "huge boobs"] },
  { label: "Small Tits", emoji: "🌷", matchTags: ["small tits", "smalltits", "petite", "tiny tits"] },
  { label: "Anal", emoji: "🍑", matchTags: ["anal", "ass", "anal play"] },
  { label: "Koppels", emoji: "💑", matchTags: [], matchGender: ["couple", "c"] },
  { label: "Squirt", emoji: "💦", matchTags: ["squirt", "squirting"] },
  { label: "BDSM", emoji: "⛓️", matchTags: ["bdsm", "bondage", "domination", "fetish"] },
  { label: "Tattoo", emoji: "🎨", matchTags: ["tattoo", "tattoos", "tattooed", "inked"] },
  { label: "Hairy", emoji: "🌿", matchTags: ["hairy", "hairy pussy", "hairypussy"] },
  { label: "Feet", emoji: "🦶", matchTags: ["feet", "foot", "foot fetish", "footjob"] },
  { label: "Outdoor", emoji: "🌳", matchTags: ["outdoor", "outside", "public", "exhib", "voyeur", "garden", "pool", "beach", "balcon"] },
  { label: "Mobiel", emoji: "📱", matchTags: ["mobile"] },
];

function matchesCategory(model: CamModel, cat: Category): boolean {
  if (cat.matchGender && cat.matchGender.length > 0) {
    if (cat.matchGender.includes(model.gender.toLowerCase())) return true;
  }
  if (cat.label === "Mobiel") {
    return !!model.isMobile || model.tags.some(t => t.toLowerCase().includes("mobile"));
  }
  const modelTagsLower = model.tags.map(t => t.toLowerCase());
  return cat.matchTags.some(tag =>
    modelTagsLower.some(mt => mt.includes(tag) || tag.includes(mt))
  );
}

const Categories = () => {
  const { allCams, isLoading } = useAllCams();
  const [selected, setSelected] = useState<string | null>(null);

  const categorizedCams = useMemo(() => {
    if (!selected) return null;
    const cat = categories.find(c => c.label === selected);
    if (!cat) return [];
    return allCams
      .filter(m => matchesCategory(m, cat))
      .sort(() => Math.random() - 0.5);
  }, [allCams, selected]);

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Categorieën — StartVagina | Webcamsex per Categorie</title>
          <meta name="description" content="Bekijk webcamsex per categorie: MILF, Asian, Latina, Ebony, Big Boobs, Anal, BDSM en meer. Vind de perfecte cam girl op StartVagina." />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
            Categorieën
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Kies een categorie en ontdek live cam modellen die bij jouw voorkeur passen.
          </p>

          {/* Category grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelected(selected === cat.label ? null : cat.label)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  selected === cat.label
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:bg-accent hover:border-accent"
                }`}
              >
                <span className="text-lg">{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Results */}
          {selected && categorizedCams ? (
            <CamGrid
              title={`${categories.find(c => c.label === selected)?.emoji} ${selected}`}
              models={categorizedCams}
              totalOnline={categorizedCams.length}
              isLoading={isLoading}
            />
          ) : (
            !selected && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">👆 Kies een categorie om te beginnen</p>
              </div>
            )
          )}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Categories;
