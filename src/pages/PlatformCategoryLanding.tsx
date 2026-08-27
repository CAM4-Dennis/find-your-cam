import { useParams } from "react-router-dom";
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
import { getPlatformCategoryContent } from "@/data/platformCategoryData";
import { getCategoryByShort, platformSlugMap, categorySlugMap } from "@/data/categorySlugs";

/** Convert **bold** markers and newlines to simple HTML */
function renderContent(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "<br/>• ")
    .replace(/\n/g, "<br/>");
}

function matchesPlatformAndCategory(model: CamModel, platformId: string, cat: ReturnType<typeof getCategoryByShort>): boolean {
  if (!cat) return false;
  // Must match platform
  if (model.platform?.toLowerCase() !== platformId.toLowerCase()) return false;
  // Match category by tags, gender, or special flags
  if (cat.matchGender && cat.matchGender.length > 0) {
    if (cat.matchGender.includes(model.gender.toLowerCase())) return true;
  }
  if (cat.matchMobile) {
    return !!model.isMobile || model.tags.some((t) => t.toLowerCase().includes("mobile"));
  }
  if (cat.matchHD) {
    return model.isHD;
  }
  if (cat.matchTags.length === 0) return true; // No tag filter = show all
  const modelTagsLower = model.tags.map((t) => t.toLowerCase());
  return cat.matchTags.some((tag) =>
    modelTagsLower.some((mt) => mt.includes(tag) || tag.includes(mt))
  );
}

const PlatformCategoryLanding = () => {
  const { platform, category } = useParams<{ platform: string; category: string }>();
  const { lang, t } = useLanguage();
  const { allCams, isLoading } = useAllCams();

  // Resolve platform and category
  const platformKey = platform?.replace(/-cams$/, "") || "";
  const platformInfo = platformSlugMap[platformKey];
  const catEntry = getCategoryByShort(category || "");
  const content = getPlatformCategoryContent(platformKey, category || "", lang);

  // Filter cams by platform + category
  const filteredCams = useMemo(() => {
    if (!platformInfo || !catEntry || !allCams.length) return [];
    return allCams
      .filter((m) => matchesPlatformAndCategory(m, platformInfo.platformId, catEntry))
      .sort((a, b) => b.viewers - a.viewers);
  }, [allCams, platformInfo, catEntry]);

  // Split cams into chunks for interleaving with content
  const chunk1 = useMemo(() => filteredCams.slice(0, 12), [filteredCams]);
  const chunk2 = useMemo(() => filteredCams.slice(12, 24), [filteredCams]);
  const chunk3 = useMemo(() => filteredCams.slice(24), [filteredCams]);

  if (!content || !platformInfo || !catEntry) return null;

  const pageSlug = `${platform}/${category}`;

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{content.title}</title>
          <meta name="description" content={content.description} />
          <meta name="robots" content={getRobotsContent(lang)} />
          <link rel="canonical" href={canonicalUrl(pageSlug, lang)} />
          {hreflangEntries(pageSlug).map((h) => (
            <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
          ))}
          <meta property="og:title" content={content.title} />
          <meta property="og:description" content={content.description} />
          <meta property="og:url" content={canonicalUrl(pageSlug, lang)} />
          <script type="application/ld+json">
            {JSON.stringify(faqSchema(content.faq))}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema([
              { name: "StartVagina", url: "https://www.startvagina.nl" },
              { name: platformInfo.name, url: canonicalUrl(`live-sex-cams-${platformKey}`, lang) },
              { name: catEntry.label[lang], url: canonicalUrl(pageSlug, lang) },
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
            <LocalLink to={`/live-sex-cams-${platformKey}`} className="hover:text-foreground transition-colors">
              {platformInfo.name}
            </LocalLink>
            <ChevronRight size={14} />
            <span className="text-foreground">{catEntry.label[lang]}</span>
          </nav>

          {/* H1 + Intro */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold font-display text-foreground mb-3">{content.h1}</h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">{content.intro}</p>
          </section>

          {/* First cam grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <CamGrid
              title={`🔥 ${catEntry.label[lang]} ${lang === "nl" ? "op" : "on"} ${platformInfo.name}`}
              models={chunk1}
              totalOnline={filteredCams.length}
              isLoading={false}
            />
          )}

          {/* Content sections interleaved with cam grids */}
          {content.sections.map((section, i) => (
            <div key={i}>
              <section className="my-8 max-w-3xl">
                <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                <div
                  className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: "<p>" + renderContent(section.text) + "</p>",
                  }}
                />
              </section>

              {/* Interleave more cams after first and second content sections */}
              {i === 0 && chunk2.length > 0 && (
                <CamGrid
                  title={`✨ ${lang === "nl" ? "Meer" : "More"} ${catEntry.label[lang]}`}
                  models={chunk2}
                  totalOnline={chunk2.length}
                  isLoading={false}
                />
              )}
              {i === 1 && chunk3.length > 0 && (
                <CamGrid
                  title={`🌟 ${lang === "nl" ? "Ontdek meer" : "Discover more"} ${catEntry.label[lang]}`}
                  models={chunk3}
                  totalOnline={chunk3.length}
                  isLoading={false}
                />
              )}
            </div>
          ))}

          {/* FAQ Section */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {landingUI.faqTitle[lang]} — {catEntry.label[lang]} {lang === "nl" ? "op" : "on"} {platformInfo.name}
            </h2>
            <div className="space-y-4">
              {content.faq.map((f, i) => (
                <details key={i} className="group bg-card border border-border rounded-lg">
                  <summary className="px-4 py-3 cursor-pointer font-medium text-foreground hover:text-primary transition-colors">
                    {f.q}
                  </summary>
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Cross-links: Other categories on this platform */}
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {lang === "nl" ? `Meer categorieën op ${platformInfo.name}` : `More categories on ${platformInfo.name}`}
            </h2>
            <div className="flex flex-wrap gap-2">
              {categorySlugMap
                .filter((c) => c.short !== category)
                .slice(0, 20)
                .map((c) => (
                  <LocalLink
                    key={c.short}
                    to={`/${platform}/${c.short}`}
                    className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
                  >
                    {c.label[lang]}
                  </LocalLink>
                ))}
            </div>
          </section>

          {/* Cross-links: This category on other platforms */}
          <section className="mt-8 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {lang === "nl" ? `${catEntry.label[lang]} op andere platforms` : `${catEntry.label[lang]} on other platforms`}
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(platformSlugMap)
                .filter(([key]) => key !== platformKey)
                .map(([key, info]) => (
                  <LocalLink
                    key={key}
                    to={`/${key}-cams/${category}`}
                    className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
                  >
                    {info.name}
                  </LocalLink>
                ))}
            </div>
          </section>

          {/* Link back to full category page */}
          <section className="mt-8 border-t border-border pt-8">
            <div className="flex flex-wrap gap-2">
              <LocalLink
                to={`/${catEntry.full}`}
                className="text-sm bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors font-medium"
              >
                {lang === "nl" ? `Alle ${catEntry.label[lang]} cams bekijken →` : `View all ${catEntry.label[lang]} cams →`}
              </LocalLink>
              <LocalLink
                to={`/live-sex-cams-${platformKey}`}
                className="text-sm bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors font-medium"
              >
                {lang === "nl" ? `Alle ${platformInfo.name} cams →` : `All ${platformInfo.name} cams →`}
              </LocalLink>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default PlatformCategoryLanding;
