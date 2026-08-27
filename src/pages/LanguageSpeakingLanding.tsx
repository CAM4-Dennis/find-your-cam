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
import type { CamModel } from "@/types/cam";
import { useLanguage } from "@/i18n/LanguageContext";
import { getRobotsContent } from "@/lib/robotsMeta";
import { canonicalUrl, hreflangEntries, breadcrumbSchema, faqSchema } from "@/lib/seoHelpers";
import { landingUI } from "@/data/i18nHelpers";
import { getLanguageSpeakingContent, getLanguageSpeakingEntry, languageSpeakingPages } from "@/data/languageSpeakingData";

function renderContent(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "<br/>• ")
    .replace(/\n/g, "<br/>");
}

function matchesLanguage(model: CamModel, matchCodes: string[]): boolean {
  if (!model.languages || model.languages.length === 0) return false;
  const modelLangsLower = model.languages.map((l) => l.toLowerCase().trim());
  return matchCodes.some((code) =>
    modelLangsLower.some((ml) => ml.includes(code) || code.includes(ml))
  );
}

const LanguageSpeakingLanding = () => {
  const { basePath, lang } = useLanguage();
  const slug = basePath.replace(/^\//, "");
  const entry = getLanguageSpeakingEntry(slug);
  const content = getLanguageSpeakingContent(slug, lang);
  const { allCams, isLoading } = useAllCams();

  const filteredCams = useMemo(() => {
    if (!entry || !allCams.length) return [];
    return allCams
      .filter((m) => matchesLanguage(m, entry.matchCodes))
      .sort((a, b) => b.viewers - a.viewers);
  }, [allCams, entry]);

  const chunk1 = useMemo(() => filteredCams.slice(0, 15), [filteredCams]);
  const chunk2 = useMemo(() => filteredCams.slice(15, 30), [filteredCams]);

  if (!content || !entry) return null;

  const label = entry.label[lang === "nl" ? "nl" : "en"];

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{content.title}</title>
          <meta name="description" content={content.description} />
          <meta name="robots" content={getRobotsContent(lang)} />
          <link rel="canonical" href={canonicalUrl(slug, lang)} />
          {hreflangEntries(slug).map((h) => (
            <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
          ))}
          <meta property="og:title" content={content.title} />
          <meta property="og:description" content={content.description} />
          <meta property="og:url" content={canonicalUrl(slug, lang)} />
          <script type="application/ld+json">
            {JSON.stringify(faqSchema(content.faq))}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema([
              { name: "StartVagina", url: "https://www.startvagina.nl" },
              { name: lang === "nl" ? "Talen" : "Languages", url: canonicalUrl("talen", lang) },
              { name: label, url: canonicalUrl(slug, lang) },
            ]))}
          </script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-8">
          <nav aria-label="breadcrumb" className="mb-4 text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
            <LocalLink to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Home size={14} /> StartVagina
            </LocalLink>
            <ChevronRight size={14} />
            <LocalLink to="/talen" className="hover:text-foreground transition-colors">
              {lang === "nl" ? "Talen" : "Languages"}
            </LocalLink>
            <ChevronRight size={14} />
            <span className="text-foreground">{entry.flag} {label}</span>
          </nav>

          <section className="mb-8">
            <h1 className="text-3xl font-bold font-display text-foreground mb-3">{content.h1}</h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">{content.intro}</p>
          </section>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <CamGrid
              title={`${entry.flag} ${label} ${lang === "nl" ? "Cam Modellen" : "Cam Models"}`}
              models={chunk1}
              totalOnline={filteredCams.length}
              isLoading={false}
            />
          )}

          <section className="my-8 max-w-3xl">
            <div
              className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: "<p>" + renderContent(content.content) + "</p>" }}
            />
          </section>

          {chunk2.length > 0 && (
            <CamGrid
              title={`✨ ${lang === "nl" ? "Meer" : "More"} ${label}`}
              models={chunk2}
              totalOnline={chunk2.length}
              isLoading={false}
            />
          )}

          {/* FAQ */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {landingUI.faqTitle[lang]} — {label}
            </h2>
            <div className="space-y-4">
              {content.faq.map((f, i) => (
                <details key={i} className="group bg-card border border-border rounded-lg">
                  <summary className="px-4 py-3 cursor-pointer font-medium text-foreground hover:text-primary transition-colors">{f.q}</summary>
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Cross-links: Other languages */}
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {lang === "nl" ? "Andere talen" : "Other languages"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {languageSpeakingPages
                .filter((p) => p.slug !== slug)
                .map((p) => (
                  <LocalLink
                    key={p.slug}
                    to={`/${p.slug}`}
                    className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
                  >
                    {p.flag} {p.label[lang === "nl" ? "nl" : "en"]}
                  </LocalLink>
                ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default LanguageSpeakingLanding;
