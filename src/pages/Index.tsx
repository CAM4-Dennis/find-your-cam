import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import CamGrid from "@/components/CamGrid";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import LazySection from "@/components/LazySection";
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
import { useLanguage } from "@/i18n/LanguageContext";
import { OG_LOCALES } from "@/i18n/translations";

const Index = () => {
  const { data: geo } = useGeoLocation();
  const [filters, setFilters] = useState<CamFilters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(true);
  const { t, lang, langPrefix } = useLanguage();

  // Stagger API calls: primary loads immediately, secondary after 500ms
  const [loadSecondary, setLoadSecondary] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoadSecondary(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Primary: main cam sources (load immediately)
  const { data: cam4Female = [], isLoading: loadingCam4 } = useCam4Online({ gender: "female", limit: 150 });
  const { data: cbFemale = [], isLoading: loadingCB } = useChaturbateOnline({ gender: "f", limit: 150 });
  const { data: bongaFemale = [], isLoading: loadingBonga } = useBongaCamsOnline({ section: "straight", limit: 150 });
  const { data: stripFemale = [], isLoading: loadingStrip } = useStripchatOnline({ tag: "girls", limit: 150 });

  // Secondary: deferred until after first paint
  const { data: xcamsFemale = [], isLoading: loadingXCams } = useXCamsOnline({ gender: "F", limit: 50 }, loadSecondary);
  const { data: coupleCams4 = [], isLoading: loadingCouples4 } = useCam4Online({ gender: "couple", limit: 150 }, loadSecondary);
  const { data: coupleCamsCB = [], isLoading: loadingCouplesCB } = useChaturbateOnline({ gender: "c", limit: 150 }, loadSecondary);
  const { data: coupleBonga = [], isLoading: loadingCouplesBonga } = useBongaCamsOnline({ section: "couples", limit: 150 }, loadSecondary);
  const { data: coupleXCams = [], isLoading: loadingCouplesXCams } = useXCamsOnline({ gender: "P", limit: 50 }, loadSecondary);
  const { data: stripCouples = [], isLoading: loadingStripCouples } = useStripchatOnline({ tag: "couples", limit: 150 }, loadSecondary);
  const { data: newCams = [], isLoading: loadingNew } = useChaturbateOnline({ gender: "f", limit: 150, offset: 150 }, loadSecondary);

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
    filters.tags.length > 0 || filters.hd === true || filters.ageRange !== null ||
    filters.languages.length > 0;

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

  const canonicalUrl = `https://www.startvagina.nl${langPrefix || ""}`;

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <html lang={lang} />
          <title>{t.siteTitle}</title>
          <meta name="description" content={t.siteDescription} />
          <meta name="keywords" content="webcamsex, live sex cams, gratis webcam, sexchat, cam girls" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={t.ogTitle} />
          <meta property="og:description" content={t.ogDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:site_name" content="StartVagina" />
          <meta property="og:locale" content={OG_LOCALES[lang]} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t.twitterTitle} />
          <meta name="twitter:description" content={t.twitterDescription} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "StartVagina",
              url: canonicalUrl,
              alternateName: "StartVagina.nl",
              description: t.siteDescription,
              inLanguage: lang,
              potentialAction: {
                "@type": "SearchAction",
                target: `${canonicalUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            })}
          </script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-4">
            {t.heroTitle}
          </h1>

          <LoadingBar
            platforms={[
              { name: "Cam4", isLoading: loadingCam4 || loadingCouples4 },
              { name: "Chaturbate", isLoading: loadingCB || loadingCouplesCB || loadingNew },
              { name: "BongaCams", isLoading: loadingBonga || loadingCouplesBonga },
              // { name: "XCams", isLoading: loadingXCams || loadingCouplesXCams }, // temporarily disabled
              { name: "Stripchat", isLoading: loadingStrip || loadingStripCouples },
            ]}
          />

          <div className="flex gap-6 mt-4">
            <div className="flex-1 space-y-8 min-w-0">
              {hasActiveFilters && filteredModels ? (
                <CamGrid
                  title={t.filterResults}
                  models={filteredModels}
                  totalOnline={filteredModels.length}
                  isLoading={isLoading}
                />
              ) : (
                <>
                  {/* Above the fold — render immediately */}
                  <CamGrid
                    title={t.sectionPopular}
                    models={popularCams.slice(0, 10)}
                    totalOnline={popularCams.length}
                    isLoading={loadingCam4 || loadingCB || loadingBonga}
                  />
                  <CamGrid
                    title={t.sectionNew}
                    models={newCamsSection}
                    isLoading={isLoading}
                  />
                  {/* Below the fold — lazy render on scroll */}
                  <LazySection>
                    <CamGrid
                      title={t.sectionAge2030}
                      models={youngCams}
                      isLoading={isLoading}
                    />
                  </LazySection>
                  <LazySection>
                    <CamGrid
                      title={t.sectionMobile}
                      models={mobileCams}
                      isLoading={isLoading}
                    />
                  </LazySection>
                  <LazySection>
                    <CamGrid
                      title={t.sectionOutdoor}
                      models={outdoorCams}
                      isLoading={isLoading}
                    />
                  </LazySection>
                  <LazySection>
                    <CamGrid
                      title={t.sectionCouples}
                      models={couples}
                      isLoading={loadingCouples4 || loadingCouplesCB || loadingCouplesBonga || loadingCouplesXCams}
                    />
                  </LazySection>
                  <LazySection>
                    <CamGrid
                      title={t.sectionDiscover}
                      models={newCams}
                      isLoading={loadingNew || loadingCB}
                    />
                  </LazySection>
                </>
              )}
            </div>

            <div className="hidden lg:block shrink-0">
              <div className="sticky top-6">
                <button
                  onClick={() => setShowFilters((v) => !v)}
                  className="mb-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  aria-expanded={showFilters}
                >
                  <svg
                    className={`h-3.5 w-3.5 transition-transform ${showFilters ? "rotate-90" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {showFilters ? t.filterHide : t.filterShow}
                </button>
                {showFilters && (
                  <div className="w-64 max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin">
                    <FilterSidebar filters={filters} onChange={setFilters} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <LazySection minHeight="100px">
          <div className="container max-w-3xl py-8">
            <p
              className="text-sm text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: t.introText.replace(
                  /<strong>/g,
                  '<strong class="text-foreground">'
                ),
              }}
            />
          </div>
        </LazySection>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Index;
