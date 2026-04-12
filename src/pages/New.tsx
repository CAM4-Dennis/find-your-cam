import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useLanguage } from "@/i18n/LanguageContext";
import type { CamModel } from "@/types/cam";

type GenderFilter = "female" | "male" | "trans" | "couple";

const genderFilterLabels: Record<GenderFilter, Record<string, string>> = {
  female: { nl: "👩 Vrouwen", en: "👩 Women", fr: "👩 Femmes", it: "👩 Donne", de: "👩 Frauen", es: "👩 Mujeres" },
  male: { nl: "👨 Mannen", en: "👨 Men", fr: "👨 Hommes", it: "👨 Uomini", de: "👨 Männer", es: "👨 Hombres" },
  trans: { nl: "⚧️ Trans", en: "⚧️ Trans", fr: "⚧️ Trans", it: "⚧️ Trans", de: "⚧️ Trans", es: "⚧️ Trans" },
  couple: { nl: "💑 Koppels", en: "💑 Couples", fr: "💑 Couples", it: "💑 Coppie", de: "💑 Paare", es: "💑 Parejas" },
};

function matchesGender(m: CamModel, filter: GenderFilter): boolean {
  const g = m.gender?.toLowerCase() || "";
  switch (filter) {
    case "female":
      return g === "female" || g === "f" || g === "vrouw";
    case "male":
      return g === "male" || g === "m" || g === "man";
    case "trans":
      return g === "shemale" || g === "trans" || g === "t" || g.includes("trans");
    case "couple":
      return g === "couple" || g === "c" || g.includes("couple") || g === "koppel";
    default:
      return true;
  }
}

const New = () => {
  const { allCams, isLoading } = useAllCams();
  const { t, lang } = useLanguage();
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("female");

  const newCams = useMemo(() => {
    return allCams
      .filter(m => m.isNew && matchesGender(m, genderFilter))
      .sort(() => Math.random() - 0.5);
  }, [allCams, genderFilter]);

  const recentlyDiscovered = useMemo(() => {
    return allCams
      .filter(m => !m.isNew && m.viewers <= 50 && matchesGender(m, genderFilter))
      .sort(() => Math.random() - 0.5)
      .slice(0, 30);
  }, [allCams, genderFilter]);

  const filters: GenderFilter[] = ["female", "male", "trans", "couple"];

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{t.newTitle}</title>
          <meta name="description" content={t.newDescription} />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6 space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
              {t.newH1}
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              {t.newDescription}
            </p>
          </div>

          {/* Gender filter tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setGenderFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  genderFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {genderFilterLabels[f][lang] || genderFilterLabels[f].en}
              </button>
            ))}
          </div>

          <CamGrid
            title={t.newSectionJustStarted}
            models={newCams}
            totalOnline={newCams.length}
            isLoading={isLoading}
          />

          {recentlyDiscovered.length > 0 && (
            <CamGrid
              title={t.newSectionHiddenGems}
              models={recentlyDiscovered}
              totalOnline={recentlyDiscovered.length}
              isLoading={isLoading}
            />
          )}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default New;
