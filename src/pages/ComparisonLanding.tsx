import LocalLink from "@/components/LocalLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getRobotsContent } from "@/lib/robotsMeta";
import { comparisonPages, getComparisonConfig } from "@/data/comparisonPages";
import { platformPages } from "@/data/platformPages";

const ComparisonLanding = () => {
  const { basePath, lang, t } = useLanguage();
  const slug = basePath.replace(/^\//, "");
  const config = getComparisonConfig(slug, lang);
  const { allCams, isLoading } = useAllCams();

  const camsA = useMemo(() => {
    if (!config || !allCams.length) return [];
    return allCams
      .filter((m) => m.platform?.toLowerCase() === config.platformA.id)
      .sort(() => Math.random() - 0.5);
  }, [allCams, config]);

  const camsB = useMemo(() => {
    if (!config || !allCams.length) return [];
    return allCams
      .filter((m) => m.platform?.toLowerCase() === config.platformB.id)
      .sort(() => Math.random() - 0.5);
  }, [allCams, config]);

  if (!config) return null;

  // Schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const canonicalUrl = `https://www.startvagina.nl/${config.slug}`;

  // Comparison table: determine overall winner
  const winA = config.comparison.categories.filter((c) => c.winner === "a").length;
  const winB = config.comparison.categories.filter((c) => c.winner === "b").length;

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{config.title}</title>
          <meta name="description" content={config.description} />
          <meta name="keywords" content={config.keywords} />
          <meta name="robots" content={getRobotsContent(lang)} />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={config.title} />
          <meta property="og:description" content={config.description} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={config.title} />
          <meta name="twitter:description" content={config.description} />
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-8">
          {/* Hero / H1 section with lighter surface */}
          <div className="mb-8 bg-[hsl(220_18%_15%)] rounded-xl p-6 border border-border/50">
            <h1 className="text-3xl font-bold font-display text-foreground mb-2">
              {config.h1}
            </h1>
            {/* Score badges */}
            <div className="flex items-center gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 bg-primary/15 text-primary text-sm font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                {config.platformA.name}: {winA} {config.winnersLabel === "Winner" ? "wins" : winA === 1 ? "punt" : "punten"}
              </span>
              <span className="text-muted-foreground text-sm font-medium">{config.vsLabel}</span>
              <span className="inline-flex items-center gap-1.5 bg-[hsl(220_15%_22%)] text-foreground text-sm font-semibold px-3 py-1.5 rounded-full border border-border">
                {config.platformB.name}: {winB} {config.winnersLabel === "Winner" ? "wins" : winB === 1 ? "punt" : "punten"}
              </span>
            </div>

            {/* Intro paragraph inside hero */}
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-3xl">{config.intro}</p>
          </div>

          {/* Live cam grids — 5 from each platform side by side */}
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-8 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>{t.modelsLoading}</span>
            </div>
          ) : (
            <section className="mb-10 bg-[hsl(220_18%_12%)] rounded-xl p-5 border border-border/30">
              <h2 className="text-xl font-bold text-foreground mb-4">
                🔴 Live: {config.platformA.name} {config.vsLabel} {config.platformB.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full border border-primary/30">{config.platformA.name}</span>
                    <span className="text-muted-foreground text-sm">— {camsA.length} {t.modelsOnline ?? "online"}</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {camsA.slice(0, 5).map((m) => (
                      <div key={m.id} className="rounded-lg overflow-hidden bg-[hsl(220_18%_15%)] border border-border/50 hover:border-primary/50 transition-all duration-200 hover:shadow-md hover:shadow-primary/10 cursor-pointer"
                        onClick={() => window.open(m.streamUrl || m.thumbnailUrl || "#", "_blank", "noopener,noreferrer")}>
                        {m.thumbnailUrl && (
                          <img src={m.thumbnailUrl} alt={m.name} className="w-full aspect-video object-cover" loading="lazy" />
                        )}
                        <div className="p-1.5">
                          <p className="text-xs font-medium text-foreground truncate">{m.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-[hsl(220_15%_22%)] text-foreground text-xs px-2 py-0.5 rounded-full border border-border">{config.platformB.name}</span>
                    <span className="text-muted-foreground text-sm">— {camsB.length} {t.modelsOnline ?? "online"}</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {camsB.slice(0, 5).map((m) => (
                      <div key={m.id} className="rounded-lg overflow-hidden bg-[hsl(220_18%_15%)] border border-border/50 hover:border-primary/50 transition-all duration-200 hover:shadow-md hover:shadow-primary/10 cursor-pointer"
                        onClick={() => window.open(m.streamUrl || m.thumbnailUrl || "#", "_blank", "noopener,noreferrer")}>
                        {m.thumbnailUrl && (
                          <img src={m.thumbnailUrl} alt={m.name} className="w-full aspect-video object-cover" loading="lazy" />
                        )}
                        <div className="p-1.5">
                          <p className="text-xs font-medium text-foreground truncate">{m.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Comparison Table */}
          <section className="mb-10 max-w-3xl">
            <h2 className="text-xl font-bold text-foreground mb-4">
              📊 {config.comparisonTitle}: {config.platformA.name} {config.vsLabel} {config.platformB.name}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border/60 shadow-lg shadow-black/20">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[hsl(220_18%_18%)] border-b border-border">
                    <th className="text-left px-4 py-3.5 text-muted-foreground font-semibold">{config.comparisonTitle}</th>
                    <th className="text-center px-4 py-3.5 text-foreground font-bold">{config.platformA.name}</th>
                    <th className="text-center px-4 py-3.5 text-foreground font-bold">{config.platformB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {config.comparison.categories.map((cat, i) => (
                    <tr key={i} className={`border-b border-border/40 last:border-0 ${i % 2 === 0 ? "bg-[hsl(220_18%_13%)]" : "bg-[hsl(220_16%_16%)]"}`}>
                      <td className="px-4 py-3 text-muted-foreground font-medium">{cat.label}</td>
                      <td className={`px-4 py-3 text-center font-medium ${cat.winner === "a" ? "text-primary bg-primary/10" : "text-foreground"}`}>
                        {cat.winner === "a" && <span className="mr-1">🏆</span>}
                        {cat.valueA}
                      </td>
                      <td className={`px-4 py-3 text-center font-medium ${cat.winner === "b" ? "text-primary bg-primary/10" : "text-foreground"}`}>
                        {cat.winner === "b" && <span className="mr-1">🏆</span>}
                        {cat.valueB}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[hsl(220_18%_18%)] border-t border-border">
                    <td className="px-4 py-3.5 font-bold text-foreground">{config.winnersLabel}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-flex items-center justify-center gap-1 font-bold text-sm px-3 py-1 rounded-full ${winA >= winB ? "bg-primary/20 text-primary" : "bg-[hsl(220_15%_22%)] text-muted-foreground"}`}>
                        {winA >= winB && "🏆 "}{winA}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-flex items-center justify-center gap-1 font-bold text-sm px-3 py-1 rounded-full ${winB > winA ? "bg-primary/20 text-primary" : "bg-[hsl(220_15%_22%)] text-muted-foreground"}`}>
                        {winB > winA && "🏆 "}{winB}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          {/* More live cams — 5+5 more */}
          {!isLoading && (camsA.length > 5 || camsB.length > 5) && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-foreground mb-4">
                ✨ Meer Live Cams
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {camsA.length > 5 && (
                  <div>
                    <CamGrid
                      title={`${config.platformA.name}`}
                      models={camsA.slice(5, 10)}
                      isLoading={false}
                    />
                  </div>
                )}
                {camsB.length > 5 && (
                  <div>
                    <CamGrid
                      title={`${config.platformB.name}`}
                      models={camsB.slice(5, 10)}
                      isLoading={false}
                    />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Verdict */}
          <section className="mb-10 max-w-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-[hsl(220_18%_15%)] border border-primary/25 rounded-xl p-6 shadow-lg shadow-primary/5">
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              🏆 {config.verdictTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{config.verdict}</p>

            {/* Platform links */}
            <div className="flex flex-wrap gap-3 mt-5">
              <LocalLink
                to={`/live-sex-cams-${config.platformA.id}`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                {config.viewPlatformLabel} {config.platformA.name} →
              </LocalLink>
              <LocalLink
                to={`/live-sex-cams-${config.platformB.id}`}
                className="inline-flex items-center gap-2 bg-secondary text-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/80 transition-colors"
              >
                {config.viewPlatformLabel} {config.platformB.name} →
              </LocalLink>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10 max-w-3xl bg-[hsl(220_18%_13%)] rounded-xl p-6 border border-border/40">
            <h2 className="text-2xl font-bold text-foreground mb-6">{config.faqTitle}</h2>
            <div className="space-y-3">
              {config.faq.map((f, i) => (
                <details key={i} className="group bg-[hsl(220_16%_16%)] border border-border/50 rounded-lg hover:border-primary/30 transition-colors">
                  <summary className="px-4 py-3.5 cursor-pointer font-medium text-foreground hover:text-primary transition-colors">
                    {f.q}
                  </summary>
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Links to individual platform reviews */}
          <section className="mb-10 max-w-3xl">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              {lang === "nl" ? "Platform Reviews" : lang === "en" ? "Platform Reviews" : lang === "fr" ? "Avis sur les plateformes" : lang === "de" ? "Plattform-Bewertungen" : lang === "es" ? "Reseñas de plataformas" : "Recensioni piattaforme"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(platformPages)
                .filter(([k]) => k.includes(config.platformA.id) || k.includes(config.platformB.id))
                .map(([k, v]) => (
                  <LocalLink key={k} to={`/${k}`} className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                    {(v[lang] || v.nl).name} Review
                  </LocalLink>
                ))}
            </div>
          </section>

          {/* Other comparisons */}
          <section className="border-t border-border/40 pt-8 mt-2">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {lang === "nl" ? "Andere vergelijkingen" : lang === "en" ? "Other comparisons" : lang === "fr" ? "Autres comparaisons" : lang === "de" ? "Andere Vergleiche" : lang === "es" ? "Otras comparaciones" : "Altri confronti"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(comparisonPages)
                .filter(([k]) => k !== slug)
                .slice(0, 8)
                .map(([k, v]) => {
                  const cfg = v[lang] || v.nl;
                  return (
                    <LocalLink key={k} to={`/${k}`} className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                      {cfg.platformA.name} {cfg.vsLabel} {cfg.platformB.name}
                    </LocalLink>
                  );
                })}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default ComparisonLanding;
