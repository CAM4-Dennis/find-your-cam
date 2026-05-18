import LocalLink from "@/components/LocalLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Loader2, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getRobotsContent } from "@/lib/robotsMeta";
import { platformPages, getPlatformConfig } from "@/data/platformPages";

function renderContent(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "<br/>• ")
    .replace(/\n/g, "<br/>");
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={20}
          className={i <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}
        />
      ))}
      <span className="ml-1 text-lg font-bold text-foreground">{rating.toFixed(1)}</span>
      <span className="text-sm text-muted-foreground">/ 5</span>
    </div>
  );
}

const PlatformLanding = () => {
  const { basePath, lang, t } = useLanguage();
  const slug = basePath.replace(/^\//, "");
  const config = getPlatformConfig(slug, lang);
  const { allCams, isLoading } = useAllCams();

  const platformCams = useMemo(() => {
    if (!config || !allCams.length) return [];
    return allCams
      .filter((m) => m.platform?.toLowerCase() === config.platformId)
      .sort(() => Math.random() - 0.5);
  }, [allCams, config]);

  // Split cams into chunks for interleaving with content
  const camChunks = useMemo(() => {
    const chunk1 = platformCams.slice(0, 10);
    const chunk2 = platformCams.slice(10, 20);
    const chunk3 = platformCams.slice(20, 30);
    return [chunk1, chunk2, chunk3];
  }, [platformCams]);

  if (!config) return null;

  const hasReview = !!(config.contentSections && config.contentSections.length > 0);
  const statLabels = {
    founded: { nl: "Opgericht", en: "Founded", fr: "Fondé", de: "Gegründet", es: "Fundado", it: "Fondato" },
    models: { nl: "Modellen", en: "Models", fr: "Modèles", de: "Models", es: "Modelos", it: "Modelle" },
    free: { nl: "Gratis kijken", en: "Free to watch", fr: "Gratuit", de: "Kostenlos", es: "Gratis", it: "Gratuito" },
    hd: { nl: "HD Kwaliteit", en: "HD Quality", fr: "Qualité HD", de: "HD-Qualität", es: "Calidad HD", it: "Qualità HD" },
    mobile: { nl: "Mobiel", en: "Mobile", fr: "Mobile", de: "Mobil", es: "Móvil", it: "Mobile" },
    toys: { nl: "Interactief speelgoed", en: "Interactive toys", fr: "Jouets interactifs", de: "Interaktive Toys", es: "Juguetes interactivos", it: "Giocattoli interattivi" },
    vr: { nl: "VR", en: "VR", fr: "VR", de: "VR", es: "VR", it: "VR" },
    yes: { nl: "Ja ✅", en: "Yes ✅", fr: "Oui ✅", de: "Ja ✅", es: "Sí ✅", it: "Sì ✅" },
    no: { nl: "Nee ❌", en: "No ❌", fr: "Non ❌", de: "Nein ❌", es: "No ❌", it: "No ❌" },
  };
  const yn = (v: boolean) => v ? statLabels.yes[lang] : statLabels.no[lang];

  // Structured data
  const structuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  if (config.rating) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: { "@type": "WebApplication", name: config.name, applicationCategory: "Entertainment" },
      reviewRating: { "@type": "Rating", ratingValue: config.rating, bestRating: 5 },
      author: { "@type": "Organization", name: "StartVagina" },
      reviewBody: config.verdict || config.description,
    });
  }

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{config.title}</title>
          <meta name="description" content={config.description} />
          <meta name="keywords" content={config.keywords} />
          <meta name="robots" content={getRobotsContent(lang)} />
          <link rel="canonical" href={`https://www.startvagina.nl/${config.slug}`} />
          <meta property="og:title" content={config.title} />
          <meta property="og:description" content={config.description} />
          <meta property="og:url" content={`https://www.startvagina.nl/${config.slug}`} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={config.title} />
          <meta name="twitter:description" content={config.description} />
          {structuredData.map((sd, i) => (
            <script key={i} type="application/ld+json">{JSON.stringify(sd)}</script>
          ))}
        </Helmet>

        <Header />

        <main className="container flex-1 py-8">
          {/* H1 + Rating */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-display text-foreground mb-2">
              {config.h1}
            </h1>
            {config.rating && (
              <div className="flex items-center gap-3">
                <StarRating rating={config.rating} />
                {config.reviewTitle && (
                  <span className="text-sm text-muted-foreground">— {config.reviewTitle}</span>
                )}
              </div>
            )}
          </div>

          {/* Cam Grid Row 1 */}
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>{t.modelsLoading}</span>
            </div>
          ) : (
            <CamGrid
              title={`🔴 ${config.name} Live — ${platformCams.length} ${config.modelsOnlineLabel}`}
              models={camChunks[0]}
              totalOnline={platformCams.length}
              isLoading={isLoading}
            />
          )}

          {hasReview ? (
            <>
              {/* Content Section 1 */}
              {config.contentSections![0] && (
                <section className="mt-12 max-w-3xl">
                  <h2 className="text-xl font-bold text-foreground mb-3">{config.contentSections![0].title}</h2>
                  <div
                    className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: "<p>" + renderContent(config.contentSections![0].text) + "</p>" }}
                  />
                </section>
              )}

              {/* Pros & Cons */}
              {config.pros && config.cons && (
                <section className="mt-10 grid md:grid-cols-2 gap-4 max-w-3xl">
                  <div className="bg-card border border-green-500/20 rounded-lg p-5">
                    <h3 className="text-lg font-bold text-green-500 mb-3">{config.prosTitle || "Pros"}</h3>
                    <ul className="space-y-2">
                      {config.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-green-500 mt-0.5 shrink-0">✅</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card border border-red-500/20 rounded-lg p-5">
                    <h3 className="text-lg font-bold text-red-500 mb-3">{config.consTitle || "Cons"}</h3>
                    <ul className="space-y-2">
                      {config.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-red-500 mt-0.5 shrink-0">❌</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Cam Grid Row 2 */}
              {camChunks[1].length > 0 && (
                <div className="mt-10">
                  <CamGrid
                    title={config.popularTitle || `🔥 Popular ${config.name} Models`}
                    models={camChunks[1]}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {/* Content Section 2 */}
              {config.contentSections![1] && (
                <section className="mt-12 max-w-3xl">
                  <h2 className="text-xl font-bold text-foreground mb-3">{config.contentSections![1].title}</h2>
                  <div
                    className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: "<p>" + renderContent(config.contentSections![1].text) + "</p>" }}
                  />
                </section>
              )}

              {/* Stats */}
              {config.stats && (
                <section className="mt-10 max-w-3xl">
                  <h2 className="text-xl font-bold text-foreground mb-4">{config.statsTitle || "Statistics"}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{statLabels.founded[lang]}</div>
                      <div className="text-lg font-bold text-foreground">{config.stats.founded}</div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{statLabels.models[lang]}</div>
                      <div className="text-lg font-bold text-foreground">{config.stats.modelsEstimate}</div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{statLabels.free[lang]}</div>
                      <div className="text-lg font-bold text-foreground">{yn(config.stats.freeToWatch)}</div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{statLabels.hd[lang]}</div>
                      <div className="text-lg font-bold text-foreground">{yn(config.stats.hdAvailable)}</div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{statLabels.mobile[lang]}</div>
                      <div className="text-lg font-bold text-foreground">{yn(config.stats.mobileApp)}</div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{statLabels.toys[lang]}</div>
                      <div className="text-lg font-bold text-foreground">{yn(config.stats.interactiveToys)}</div>
                    </div>
                    {config.stats.vrAvailable !== undefined && (
                      <div className="bg-card border border-border rounded-lg p-4 text-center">
                        <div className="text-xs text-muted-foreground mb-1">{statLabels.vr[lang]}</div>
                        <div className="text-lg font-bold text-foreground">{yn(config.stats.vrAvailable)}</div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Cam Grid Row 3 */}
              {camChunks[2].length > 0 && (
                <div className="mt-10">
                  <CamGrid
                    title={config.moreCamsTitle || `✨ More ${config.name} Cams`}
                    models={camChunks[2]}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {/* Content Section 3 */}
              {config.contentSections![2] && (
                <section className="mt-12 max-w-3xl">
                  <h2 className="text-xl font-bold text-foreground mb-3">{config.contentSections![2].title}</h2>
                  <div
                    className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: "<p>" + renderContent(config.contentSections![2].text) + "</p>" }}
                  />
                </section>
              )}

              {/* Verdict */}
              {config.verdict && (
                <section className="mt-10 max-w-3xl bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    🏆 {config.verdictTitle || "Our Verdict"}
                  </h2>
                  <div
                    className="text-muted-foreground leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: renderContent(config.verdict) }}
                  />
                  {config.rating && (
                    <div className="mt-4">
                      <StarRating rating={config.rating} />
                    </div>
                  )}
                </section>
              )}
            </>
          ) : (
            /* Fallback: old-style layout for platforms without review data */
            <section className="mt-12 max-w-3xl">
              <h2 className="text-xl font-bold text-foreground mb-3">{config.aboutTitle}</h2>
              <div
                className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: "<p>" + renderContent(config.content) + "</p>" }}
              />
            </section>
          )}

          {/* FAQ */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">{config.faqTitle}</h2>
            <div className="space-y-4">
              {config.faq.map((f, i) => (
                <details key={i} className="group bg-card border border-border rounded-lg">
                  <summary className="px-4 py-3 cursor-pointer font-medium text-foreground hover:text-primary transition-colors">{f.q}</summary>
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Other platforms */}
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">{config.otherPlatforms}</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(platformPages)
                .filter(([k]) => k !== slug)
                .map(([k, v]) => (
                  <LocalLink key={k} to={`/${k}`} className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                    {(v[lang] || v.nl).name} Live Cams
                  </LocalLink>
                ))}
              <LocalLink to="/categories" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                {t.navCategories}
              </LocalLink>
              <LocalLink to="/blog" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                Blog
              </LocalLink>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default PlatformLanding;
