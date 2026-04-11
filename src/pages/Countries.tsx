import { useState, useMemo, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";

const Countries = () => {
  const { allCams, isLoading } = useAllCams();
  const [selected, setSelected] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll to results when a country is selected
  useEffect(() => {
    if (selected && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  // Build country list with counts, sorted by count desc
  const countryCounts = useMemo(() => {
    const map = new Map<string, { flag: string; count: number }>();
    for (const m of allCams) {
      if (!m.country || m.country === "Onbekend") continue;
      const existing = map.get(m.country);
      if (existing) {
        existing.count++;
      } else {
        map.set(m.country, { flag: m.countryFlag, count: 1 });
      }
    }
    return Array.from(map.entries())
      .map(([country, { flag, count }]) => ({ country, flag, count }))
      .sort((a, b) => b.count - a.count);
  }, [allCams]);

  const filteredCams = useMemo(() => {
    if (!selected) return null;
    return allCams
      .filter(m => m.country === selected)
      .sort(() => Math.random() - 0.5);
  }, [allCams, selected]);

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Landen — StartVagina | Webcamsex per Land</title>
          <meta name="description" content="Bekijk live webcam modellen per land. Nederlandse, Belgische, Duitse en internationale cam girls op StartVagina." />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
            Landen
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Ontdek live cam modellen uit jouw favoriete land. Van Nederlandse cam girls tot modellen van over de hele wereld.
          </p>

          {/* Country chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {countryCounts.map(({ country, flag, count }) => (
              <button
                key={country}
                onClick={() => setSelected(selected === country ? null : country)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
                  selected === country
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:bg-accent hover:border-accent"
                }`}
              >
                <span>{flag}</span>
                <span>{country}</span>
                <span className={`text-xs ml-1 ${
                  selected === country ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  ({count})
                </span>
              </button>
            ))}
          </div>

          {/* Results */}
          <div ref={resultsRef} />
          {selected && filteredCams ? (
            <CamGrid
              title={`${countryCounts.find(c => c.country === selected)?.flag} ${selected}`}
              models={filteredCams}
              totalOnline={filteredCams.length}
              isLoading={isLoading}
            />
          ) : (
            !selected && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">🌍 Kies een land om cam modellen te bekijken</p>
              </div>
            )
          )}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Countries;
