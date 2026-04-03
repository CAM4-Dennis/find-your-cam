import { useState, useMemo } from "react";
import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import CamGrid from "@/components/CamGrid";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { useCam4Online } from "@/hooks/useCam4";
import { useChaturbateOnline } from "@/hooks/useChaturbate";
import { useBongaCamsOnline } from "@/hooks/useBongaCams";
import { useXCamsOnline } from "@/hooks/useXCams";
import { useStripchatOnline } from "@/hooks/useStripchat";
import { Helmet } from "react-helmet-async";
import type { CamModel } from "@/types/cam";
import type { CamFilters } from "@/types/filters";
import { defaultFilters } from "@/types/filters";
import { applyFilters } from "@/lib/filterModels";

const Index = () => {
  const [filters, setFilters] = useState<CamFilters>(defaultFilters);

  const { data: cam4Female = [], isLoading: loadingCam4 } = useCam4Online({ gender: "female", limit: 50 });
  const { data: cbFemale = [], isLoading: loadingCB } = useChaturbateOnline({ gender: "f", limit: 50 });
  const { data: bongaFemale = [], isLoading: loadingBonga } = useBongaCamsOnline({ section: "straight", limit: 50 });
  const { data: xcamsFemale = [], isLoading: loadingXCams } = useXCamsOnline({ gender: "woman", limit: 50 });
  const { data: coupleCams4 = [], isLoading: loadingCouples4 } = useCam4Online({ gender: "couple", limit: 50 });
  const { data: coupleCamsCB = [], isLoading: loadingCouplesCB } = useChaturbateOnline({ gender: "c", limit: 50 });
  const { data: coupleBonga = [], isLoading: loadingCouplesBonga } = useBongaCamsOnline({ section: "couples", limit: 50 });
  const { data: coupleXCams = [], isLoading: loadingCouplesXCams } = useXCamsOnline({ gender: "couple", limit: 50 });
  const { data: stripFemale = [], isLoading: loadingStrip } = useStripchatOnline({ tag: "girls", limit: 50 });
  const { data: stripCouples = [], isLoading: loadingStripCouples } = useStripchatOnline({ tag: "couples", limit: 50 });
  const { data: newCams = [], isLoading: loadingNew } = useChaturbateOnline({ limit: 50, offset: 100 });

  // Merge all models into one pool, then filter
  const allModels = useMemo(() => {
    return [...cam4Female, ...cbFemale, ...bongaFemale, ...xcamsFemale, ...stripFemale,
            ...coupleCams4, ...coupleCamsCB, ...coupleBonga, ...coupleXCams, ...stripCouples,
            ...newCams];
  }, [cam4Female, cbFemale, bongaFemale, xcamsFemale, stripFemale, coupleCams4, coupleCamsCB, coupleBonga, coupleXCams, stripCouples, newCams]);

  const hasActiveFilters = filters.gender.length > 0 || filters.platforms.length > 0 ||
    filters.tags.length > 0 || filters.hd === true || filters.ageRange !== null;

  const filteredModels = useMemo(() => {
    if (!hasActiveFilters) return null; // use sectioned view
    const filtered = applyFilters(allModels, filters);
    // Deduplicate by id
    const seen = new Set<string>();
    return filtered.filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    }).sort(() => Math.random() - 0.5);
  }, [allModels, filters, hasActiveFilters]);

  // Sectioned views (no filters active)
  const popularCams: CamModel[] = useMemo(
    () => [...cam4Female, ...cbFemale, ...bongaFemale, ...xcamsFemale, ...stripFemale].sort(() => Math.random() - 0.5),
    [cam4Female, cbFemale, bongaFemale, xcamsFemale, stripFemale]
  );
  const couples: CamModel[] = useMemo(
    () => [...coupleCams4, ...coupleCamsCB, ...coupleBonga, ...coupleXCams].sort(() => Math.random() - 0.5),
    [coupleCams4, coupleCamsCB, coupleBonga, coupleXCams]
  );

  const isLoading = loadingCam4 || loadingCB || loadingBonga || loadingXCams ||
    loadingCouples4 || loadingCouplesCB || loadingCouplesBonga || loadingCouplesXCams || loadingNew;

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>StartVagina — Gratis Live Sex Cams, Webcam Shows & Chat</title>
          <meta
            name="description"
            content="StartVagina is dé zoekmachine voor gratis live sex cams. Bekijk duizenden webcam modellen van Chaturbate, Stripchat, BongaCams en meer. Filter op categorie, leeftijd, land en meer."
          />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://startvagina.nl" />
          <meta property="og:title" content="StartVagina — Gratis Live Sex Cams" />
          <meta property="og:description" content="Dé zoekmachine voor gratis live webcam shows. Duizenden modellen van de beste cam-platformen." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://startvagina.nl" />
          <meta property="og:site_name" content="StartVagina" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="StartVagina — Gratis Live Sex Cams" />
          <meta name="twitter:description" content="Dé zoekmachine voor gratis live webcam shows." />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "StartVagina",
              url: "https://startvagina.nl",
              description: "Dé zoekmachine voor gratis live sex cams en webcam shows.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://startvagina.nl/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            })}
          </script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold font-display">
              Gratis Live Sex Cams & Webcam Shows
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
              Welkom bij StartVagina, dé zoekmachine voor gratis live sex cams. Bekijk webcam shows van de beste platformen,
              filter op categorie, geslacht, leeftijd, land en meer. Ontdek duizenden modellen die nu live zijn.
            </p>
          </div>

          <div className="flex gap-6">
            <div className="flex-1 space-y-8 min-w-0">
              {hasActiveFilters && filteredModels ? (
                <CamGrid
                  title={`🔍 Filterresultaten`}
                  models={filteredModels}
                  totalOnline={filteredModels.length}
                  isLoading={isLoading}
                />
              ) : (
                <>
                  <CamGrid
                    title="🔥 Populaire Cams"
                    models={popularCams}
                    totalOnline={popularCams.length}
                    isLoading={loadingCam4 || loadingCB || loadingBonga || loadingXCams}
                  />
                  <CamGrid
                    title="💑 Koppels"
                    models={couples}
                    isLoading={loadingCouples4 || loadingCouplesCB || loadingCouplesBonga || loadingCouplesXCams}
                  />
                  <CamGrid
                    title="🆕 Meer Ontdekken"
                    models={newCams}
                    isLoading={loadingNew || loadingCB}
                  />
                </>
              )}
            </div>

            <div className="hidden lg:block w-64 shrink-0">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Index;
