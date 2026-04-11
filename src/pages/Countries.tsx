import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { countryToFullSlug } from "@/lib/countrySlug";

const Countries = () => {
  const { allCams } = useAllCams();
  const [expanded, setExpanded] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);

  /** Merge country name variants into a canonical name */
  const countryMergeMap: Record<string, string> = {
    "The Netherlands": "Nederland",
    "Netherlands": "Nederland",
    "North Holland": "Nederland",
    "South Holland": "Nederland",
    "Belgium": "België",
  };

  // Pinned countries shown first (in this order)
  const pinnedCountries = [
    "Nederland", "België", "Suriname", "Curaçao", "Aruba", "Sint Maarten",
  ];

  const countryCounts = useMemo(() => {
    const map = new Map<string, { flag: string; count: number }>();
    for (const m of allCams) {
      if (!m.country || m.country === "Onbekend") continue;
      // Merge variants into canonical name
      const canonical = countryMergeMap[m.country] || m.country;
      const flag = canonical === "Nederland" ? "🇳🇱" : canonical === "België" ? "🇧🇪" : m.countryFlag;
      const existing = map.get(canonical);
      if (existing) {
        existing.count++;
      } else {
        map.set(canonical, { flag, count: 1 });
      }
    }
    return Array.from(map.entries())
      .map(([country, { flag, count }]) => ({ country, flag, count }))
      .sort((a, b) => {
        const aPin = pinnedCountries.indexOf(a.country);
        const bPin = pinnedCountries.indexOf(b.country);
        const aIsPinned = aPin !== -1;
        const bIsPinned = bPin !== -1;
        if (aIsPinned && !bIsPinned) return -1;
        if (!aIsPinned && bIsPinned) return 1;
        if (aIsPinned && bIsPinned) return aPin - bPin;
        return b.count - a.count;
      });
  }, [allCams]);



  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Webcamsex per Land — Cam Girls uit Alle Landen | StartVagina</title>
          <meta name="description" content="Bekijk live webcam modellen per land. Nederlandse, Belgische, Duitse, Colombiaanse en internationale cam girls op StartVagina. Gratis webcamsex uit elk land." />
          <meta name="keywords" content="webcamsex per land, cam girls per land, internationale webcamsex, webcam modellen landen" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://startvagina.nl/countries" />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
            Webcamsex per Land
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            Ontdek live cam modellen uit jouw favoriete land. Van Nederlandse cam girls tot Colombiaanse schoonheden en Oost-Europese modellen — kies een land en bekijk wie er nu live is.
          </p>

          {/* Country chips — all link to dedicated pages, 3 rows visible, expandable */}
          <div
            ref={chipsRef}
            className={`flex flex-wrap gap-2 mb-2 overflow-hidden transition-all duration-300 ${
              expanded ? "" : "max-h-[9.5rem]"
            }`}
          >
            {countryCounts.map(({ country, flag, count }) => (
              <Link
                key={country}
                to={`/${countryToFullSlug(country)}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors bg-card border-border text-foreground hover:bg-accent hover:border-accent"
              >
                <span>{flag}</span>
                <span>{country}</span>
                <span className="text-xs ml-1 text-muted-foreground">({count})</span>
              </Link>
            ))}
          </div>
          {countryCounts.length > 15 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-primary hover:text-primary/80 transition-colors mb-6 flex items-center gap-1"
            >
              {expanded ? "▲ Minder landen tonen" : `▼ Alle ${countryCounts.length} landen tonen`}
            </button>
          )}
          {(expanded || countryCounts.length <= 15) && <div className="mb-6" />}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Countries;
