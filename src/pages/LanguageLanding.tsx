import { Navigate } from "react-router-dom";
import LocalLink from "@/components/LocalLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { landingUI } from "@/data/i18nHelpers";
import { languagePageData } from "@/data/languagePageData";
import { getRobotsContent } from "@/lib/robotsMeta";
import type { Language } from "@/i18n/translations";

function renderContent(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "<br/>• ")
    .replace(/\n/g, "<br/>");
}

function modelMatchesLanguage(modelLanguages: string[], aliases: string[]): boolean {
  return modelLanguages.some((ml) => {
    const lower = ml.toLowerCase().trim();
    return aliases.some((alias) => lower === alias);
  });
}

const allLanguagePages = Object.values(languagePageData);

/**
 * Map language-page slugs to the site language prefix they belong to.
 * Pages not listed here (PT, RU, JA, KO) are available under all prefixes.
 * Under /nl (default, no prefix): all pages are available.
 * Under /en: only the English page.
 * Under /fr: only the French page, etc.
 */
const slugToSiteLang: Record<string, Language> = {
  "webcamsex-in-het-nederlands": "nl",
  "english-webcam-sex-chat": "en",
  "webcamsex-auf-deutsch": "de",
  "webcamsex-en-francais": "fr",
  "webcamsex-en-espanol": "es",
  "webcamsex-in-italiano": "it",
};

/** noindex languages — pages under these prefixes get noindex, nofollow */
const NOINDEX_LANGS: Language[] = ["fr", "it", "de", "es"];

const LanguageLanding = () => {
  const { basePath, lang, t } = useLanguage();
  const slug = basePath.replace(/^\//, "");
  const config = languagePageData[slug || ""];
  const { allCams, isLoading } = useAllCams();

  const languageCams = useMemo(() => {
    if (!config || !allCams.length) return [];
    return allCams
      .filter((m) => m.languages?.length > 0 && modelMatchesLanguage(m.languages, config.aliases))
      .sort(() => Math.random() - 0.5);
  }, [allCams, config]);

  if (!config) return null;

  // If this slug is restricted to a specific site language and the current
  // site language doesn't match, redirect to the canonical (unprefixed/nl) version.
  const restrictedTo = slugToSiteLang[slug];
  if (restrictedTo && lang !== "nl" && lang !== restrictedTo) {
    return <Navigate to={`/${config.slug}`} replace />;
  }

  // Resolve i18n content: prefer current site language, fall back to nl
  const i18n = config.i18n[lang] || config.i18n.nl!;

  const robotsContent = NOINDEX_LANGS.includes(lang) ? "noindex, nofollow" : getRobotsContent(lang);

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{i18n.title}</title>
          <meta name="description" content={i18n.description} />
          <meta name="keywords" content={i18n.keywords} />
          <meta name="robots" content={robotsContent} />
          <link rel="canonical" href={`https://www.startvagina.nl/${config.slug}`} />
          <meta property="og:title" content={i18n.title} />
          <meta property="og:description" content={i18n.description} />
          <meta property="og:url" content={`https://www.startvagina.nl/${config.slug}`} />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: i18n.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            })}
          </script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-8">
          <h1 className="text-3xl font-bold font-display text-foreground mb-6">
            {config.emoji} {i18n.h1}
          </h1>

          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>{t.modelsLoading}</span>
            </div>
          ) : (
            <CamGrid
              title={`${config.emoji} ${config.name} — ${languageCams.length} ${landingUI.modelsOnline[lang]}`}
              models={languageCams}
              totalOnline={languageCams.length}
              isLoading={isLoading}
            />
          )}

          <section className="mt-12 max-w-3xl">
            <div
              className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{
                __html: "<p>" + renderContent(i18n.content) + "</p>",
              }}
            />
          </section>

          {/* FAQ */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {landingUI.faqTitle[lang]}
            </h2>
            <div className="space-y-4">
              {i18n.faq.map((f, i) => (
                <details key={i} className="group bg-card border border-border rounded-lg">
                  <summary className="px-4 py-3 cursor-pointer font-medium text-foreground hover:text-primary transition-colors">
                    {f.q}
                  </summary>
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Cross-links */}
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {landingUI.moreLanguages[lang]}
            </h2>
            <div className="flex flex-wrap gap-2">
              {allLanguagePages
                .filter((l) => l.slug !== config.slug)
                .map((l) => (
                  <LocalLink
                    key={l.slug}
                    to={`/${l.slug}`}
                    className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
                  >
                    {l.emoji} {l.name}
                  </LocalLink>
                ))}
              <LocalLink to="/languages" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                🗣️ {t.navLanguages}
              </LocalLink>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default LanguageLanding;
