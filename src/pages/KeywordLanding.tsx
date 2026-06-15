import { useLocation } from "react-router-dom";
import LocalLink from "@/components/LocalLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Loader2, ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getRobotsContent } from "@/lib/robotsMeta";
import { keywordPages, getKeywordConfig } from "@/data/keywordPages";
import { canonicalUrl, hreflangEntries, breadcrumbSchema, faqSchema } from "@/lib/seoHelpers";

const KeywordLanding = () => {
  const location = useLocation();
  const { basePath, lang, t } = useLanguage();
  const keyword = basePath.replace(/^\//, "");
  const config = getKeywordConfig(keyword, lang);
  const { allCams, isLoading } = useAllCams();

  const shuffled = useMemo(() => {
    if (!allCams.length) return [];
    return [...allCams].sort(() => Math.random() - 0.5);
  }, [allCams]);

  if (!config) return null;

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{config.title}</title>
          <meta name="description" content={config.description} />
          <meta name="keywords" content={config.keywords} />
          <meta name="robots" content={getRobotsContent(lang)} />
          <link rel="canonical" href={canonicalUrl(keyword, lang)} />
          {hreflangEntries(keyword).map((h) => (
            <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
          ))}
          <meta property="og:title" content={config.title} />
          <meta property="og:description" content={config.description} />
          <meta property="og:url" content={canonicalUrl(keyword, lang)} />
          <script type="application/ld+json">
            {JSON.stringify(faqSchema(config.faq))}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema([
              { name: "StartVagina", url: "https://www.startvagina.nl" },
              { name: config.h1.split('—')[0].trim(), url: canonicalUrl(keyword, lang) },
            ]))}
          </script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4 text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
            <LocalLink to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Home size={14} /> StartVagina
            </LocalLink>
            <ChevronRight size={14} />
            <span className="text-foreground">{config.h1.split('—')[0].trim()}</span>
          </nav>

          <section className="mb-8">
            <h1 className="text-3xl font-bold font-display text-foreground mb-3">{config.h1}</h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">{config.intro}</p>
          </section>

          {config.content && (
            <section className="mb-8 max-w-3xl">
              <div
                className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{
                  __html: "<p>" + config.content
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n\n/g, "</p><p>")
                    .replace(/\n- /g, "<br/>• ")
                    .replace(/\n/g, "<br/>") + "</p>",
                }}
              />
            </section>
          )}

          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>{t.modelsLoading}</span>
            </div>
          ) : <CamGrid models={shuffled} />}

          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">{config.faqTitle}</h2>
            <div className="space-y-4">
              {config.faq.map((f, i) => (
                <details key={i} className="group bg-card border border-border rounded-lg">
                  <summary className="px-4 py-3 cursor-pointer font-medium text-foreground hover:text-primary transition-colors">
                    {f.q}
                  </summary>
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">{config.moreTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(keywordPages)
                .filter(([k]) => k !== keyword)
                .map(([k, v]) => (
                  <LocalLink key={k} to={`/${k}`} className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                    {(v[lang] || v.nl).h1.split("—")[0].trim()}
                  </LocalLink>
                ))}
              <LocalLink to="/blog" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                Blog
              </LocalLink>
              <LocalLink to="/categories" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                {t.navCategories}
              </LocalLink>
              <LocalLink to="/top" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                Top Cams
              </LocalLink>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default KeywordLanding;
