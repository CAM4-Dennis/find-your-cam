import { useLocation } from "react-router-dom";
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
import { keywordPages, getKeywordConfig } from "@/data/keywordPages";

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
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://www.startvagina.nl/${keyword}`} />
          <meta property="og:title" content={config.title} />
          <meta property="og:description" content={config.description} />
          <meta property="og:url" content={`https://www.startvagina.nl/${keyword}`} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: config.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            })}
          </script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-8">
          <section className="mb-8">
            <h1 className="text-3xl font-bold font-display text-foreground mb-3">{config.h1}</h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">{config.intro}</p>
          </section>

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
