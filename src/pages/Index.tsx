import { useState, useMemo } from "react";
import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import CamGrid from "@/components/CamGrid";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { useCam4Online } from "@/hooks/useCam4";
import { useChaturbateOnline } from "@/hooks/useChaturbate";
import { useBongaCamsOnline } from "@/hooks/useBongaCams";
import { useXCamsOnline } from "@/hooks/useXCams";
import { useStripchatOnline } from "@/hooks/useStripchat";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { Helmet } from "react-helmet-async";
import type { CamModel } from "@/types/cam";
import type { CamFilters } from "@/types/filters";
import { defaultFilters } from "@/types/filters";
import { applyFilters } from "@/lib/filterModels";
import { getCountryName } from "@/lib/countryFlags";

const Index = () => {
  const { data: geo } = useGeoLocation();
  const [filters, setFilters] = useState<CamFilters>(defaultFilters);

  const { data: cam4Female = [], isLoading: loadingCam4 } = useCam4Online({ gender: "female", limit: 150 });
  const { data: cbFemale = [], isLoading: loadingCB } = useChaturbateOnline({ gender: "f", limit: 150 });
  const { data: bongaFemale = [], isLoading: loadingBonga } = useBongaCamsOnline({ section: "straight", limit: 150 });
  const { data: xcamsFemale = [], isLoading: loadingXCams } = useXCamsOnline({ gender: "F", limit: 150 });
  const { data: coupleCams4 = [], isLoading: loadingCouples4 } = useCam4Online({ gender: "couple", limit: 150 });
  const { data: coupleCamsCB = [], isLoading: loadingCouplesCB } = useChaturbateOnline({ gender: "c", limit: 150 });
  const { data: coupleBonga = [], isLoading: loadingCouplesBonga } = useBongaCamsOnline({ section: "couples", limit: 150 });
  const { data: coupleXCams = [], isLoading: loadingCouplesXCams } = useXCamsOnline({ gender: "P", limit: 150 });
  const { data: stripFemale = [], isLoading: loadingStrip } = useStripchatOnline({ tag: "girls", limit: 150 });
  const { data: stripCouples = [], isLoading: loadingStripCouples } = useStripchatOnline({ tag: "couples", limit: 150 });
  const { data: newCams = [], isLoading: loadingNew } = useChaturbateOnline({ gender: "f", limit: 150, offset: 150 });

  // Only show cams that include women (female, couple with female)
  const isFemaleRelated = (m: CamModel) => {
    const g = m.gender?.toLowerCase() || "";
    return g === "female" || g === "couple" || g.includes("couple_f") || g === "f";
  };

  // Merge all models into one pool, filtered to female-related only
  const allModels = useMemo(() => {
    return [...cam4Female, ...cbFemale, ...bongaFemale, ...xcamsFemale, ...stripFemale,
            ...coupleCams4, ...coupleCamsCB, ...coupleBonga, ...coupleXCams, ...stripCouples,
            ...newCams].filter(isFemaleRelated);
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
  const popularCams: CamModel[] = useMemo(() => {
    const all = [...cam4Female, ...cbFemale, ...bongaFemale, ...xcamsFemale, ...stripFemale];
    if (!geo?.country) return all.sort(() => Math.random() - 0.5);

    const viewerCountry = getCountryName(geo.country);
    const local: CamModel[] = [];
    const rest: CamModel[] = [];

    for (const m of all) {
      if (m.country?.toLowerCase() === viewerCountry.toLowerCase()) {
        local.push(m);
      } else {
        rest.push(m);
      }
    }

    return [
      ...local.sort(() => Math.random() - 0.5),
      ...rest.sort(() => Math.random() - 0.5),
    ];
  }, [cam4Female, cbFemale, bongaFemale, xcamsFemale, stripFemale, geo]);

  // Category sections from allModels pool
  const newCamsSection: CamModel[] = useMemo(
    () => allModels.filter((m) => m.isNew).sort(() => Math.random() - 0.5).slice(0, 15),
    [allModels]
  );
  const youngCams: CamModel[] = useMemo(
    () => allModels.filter((m) => m.age >= 20 && m.age <= 30).sort(() => Math.random() - 0.5).slice(0, 15),
    [allModels]
  );
  const mobileCams: CamModel[] = useMemo(
    () => allModels.filter((m) => m.isMobile || m.tags.some(t => t.toLowerCase().includes("mobile"))).sort(() => Math.random() - 0.5).slice(0, 15),
    [allModels]
  );
  const outdoorCams: CamModel[] = useMemo(() => {
    const outdoorTags = ["outdoor", "outside", "public", "exhib", "voyeur", "garden", "pool", "shower", "bath", "balcon", "forest", "park", "beach"];
    return allModels
      .filter((m) => m.tags.some(t => outdoorTags.some(ot => t.toLowerCase().includes(ot))))
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);
  }, [allModels]);

  const couples: CamModel[] = useMemo(
    () => [...coupleCams4, ...coupleCamsCB, ...coupleBonga, ...coupleXCams, ...stripCouples].filter(isFemaleRelated).sort(() => Math.random() - 0.5),
    [coupleCams4, coupleCamsCB, coupleBonga, coupleXCams, stripCouples]
  );

  const isLoading = loadingCam4 || loadingCB || loadingBonga || loadingXCams || loadingStrip ||
    loadingCouples4 || loadingCouplesCB || loadingCouplesBonga || loadingCouplesXCams || loadingStripCouples || loadingNew;

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>StartVagina — Gratis Webcamsex & Live Sex Cams Nederland België</title>
          <meta
            name="description"
            content="StartVagina is dé zoekmachine voor gratis webcamsex en live sex cams. Bekijk duizenden cam girls van Chaturbate, Stripchat, BongaCams en Cam4. Nederlandse en Belgische webcam modellen, sexchat en erotische shows. Filter op leeftijd, land en categorie."
          />
          <meta name="keywords" content="webcamsex, live sex cams, gratis webcam, sexchat, cam girls, Nederlandse webcamsex, Belgische webcamsex, erotische webcam, webcam modellen, live sex chat, gratis cam, cam meisjes, sex cam, webcam sex, live cam" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://startvagina.nl" />
          <meta property="og:title" content="StartVagina — Gratis Webcamsex & Live Sex Cams" />
          <meta property="og:description" content="Dé zoekmachine voor gratis webcamsex. Nederlandse en Belgische cam girls live op je scherm." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://startvagina.nl" />
          <meta property="og:site_name" content="StartVagina" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="StartVagina — Gratis Webcamsex & Live Cam Girls" />
          <meta name="twitter:description" content="Dé zoekmachine voor gratis webcamsex en live sex cams in Nederland en België." />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "StartVagina",
              url: "https://startvagina.nl",
              alternateName: "StartVagina.nl",
              description: "Dé zoekmachine voor gratis webcamsex, live sex cams en erotische webcam shows van Nederlandse en Belgische cam girls.",
              inLanguage: "nl",
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
              Gratis Webcamsex & Live Sex Cams
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
              Welkom bij <strong>StartVagina</strong>, dé zoekmachine voor gratis <strong>webcamsex</strong> en <strong>live sex cams</strong>. 
              Bekijk duizenden <strong>cam girls</strong> en <strong>webcam modellen</strong> uit Nederland en België. 
              Geniet van gratis <strong>sexchat</strong>, <strong>erotische webcam</strong> shows en live cam streams. 
              Filter op categorie, leeftijd, land en meer.
            </p>
          </div>

          <LoadingBar
            platforms={[
              { name: "Cam4", isLoading: loadingCam4 || loadingCouples4 },
              { name: "Chaturbate", isLoading: loadingCB || loadingCouplesCB || loadingNew },
              { name: "BongaCams", isLoading: loadingBonga || loadingCouplesBonga },
              { name: "XCams", isLoading: loadingXCams || loadingCouplesXCams },
              { name: "Stripchat", isLoading: loadingStrip || loadingStripCouples },
            ]}
          />

          <div className="flex gap-6 mt-4">
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
                    models={popularCams.slice(0, 15)}
                    totalOnline={popularCams.length}
                    isLoading={loadingCam4 || loadingCB || loadingBonga || loadingXCams}
                  />
                  <CamGrid
                    title="🆕 Nieuwe Cams"
                    models={newCamsSection}
                    isLoading={isLoading}
                  />
                  <CamGrid
                    title="🔞 Leeftijd 20-30"
                    models={youngCams}
                    isLoading={isLoading}
                  />
                  <CamGrid
                    title="📱 Mobiele Cams"
                    models={mobileCams}
                    isLoading={isLoading}
                  />
                  <CamGrid
                    title="🌳 Outdoor Cams"
                    models={outdoorCams}
                    isLoading={isLoading}
                  />
                  <CamGrid
                    title="💑 Koppels"
                    models={couples}
                    isLoading={loadingCouples4 || loadingCouplesCB || loadingCouplesBonga || loadingCouplesXCams}
                  />
                  <CamGrid
                    title="🔍 Meer Ontdekken"
                    models={newCams}
                    isLoading={loadingNew || loadingCB}
                  />
                </>
              )}
            </div>

            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto scrollbar-thin">
                <FilterSidebar filters={filters} onChange={setFilters} />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Index;
