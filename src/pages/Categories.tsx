import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import LocalLink from "@/components/LocalLink";
import { useLanguage } from "@/i18n/LanguageContext";
import { getRobotsContent } from "@/lib/robotsMeta";

const categories = [
  { label: "Teen (18+)", emoji: "🔞", slug: "jonge-cam-girls-18-plus" },
  { label: "MILF", emoji: "💋", slug: "milf-webcamsex-ervaren-vrouwen" },
  { label: "Mature", emoji: "👩‍🦳", slug: "mature-webcamsex-oudere-vrouwen" },
  { label: "Asian", emoji: "🌸", slug: "aziatische-cam-girls-live" },
  { label: "Latina", emoji: "🌶️", slug: "latina-cam-girls-live" },
  { label: "Ebony", emoji: "🖤", slug: "ebony-cam-girls-live" },
  { label: "Grote Borsten", emoji: "🍈", slug: "cam-girls-grote-borsten" },
  { label: "Kleine Borsten", emoji: "🌷", slug: "petite-cam-girls-kleine-borsten" },
  { label: "Anal", emoji: "🍑", slug: "anale-cam-shows-live" },
  { label: "Koppels", emoji: "💑", slug: "cam-koppels-live-sex" },
  { label: "Squirt", emoji: "💦", slug: "squirt-cam-shows-live" },
  { label: "BDSM", emoji: "⛓️", slug: "bdsm-bondage-cam-shows" },
  { label: "Tattoo", emoji: "🎨", slug: "getatoeeerde-cam-girls" },
  { label: "Hairy", emoji: "🌿", slug: "behaarde-cam-girls-natural" },
  { label: "Voeten", emoji: "🦶", slug: "voeten-fetish-cam-shows" },
  { label: "Outdoor", emoji: "🌳", slug: "outdoor-cam-shows-buiten" },
  { label: "Mobiel", emoji: "📱", slug: "mobiele-cam-shows-live" },
];

const Categories = () => {
  const { t, lang, langPrefix } = useLanguage();

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{t.categoriesTitle}</title>
          <meta name="description" content={t.categoriesDescription} />
          <meta name="robots" content={getRobotsContent(lang)} />
          <meta property="og:title" content={t.categoriesTitle} />
          <meta property="og:description" content={t.categoriesDescription} />
          <meta property="og:url" content="https://www.startvagina.nl/categorieen" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="StartVagina" />
          <link rel="canonical" href={`https://www.startvagina.nl${langPrefix}/categorieen`} />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
            {t.categoriesH1}
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            {t.categoriesDescription}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
            {categories.map((cat) => (
              <LocalLink
                key={cat.slug}
                to={`/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border bg-card border-border text-foreground hover:bg-accent hover:border-accent text-sm font-medium transition-colors"
              >
                <span className="text-lg">{cat.emoji}</span>
                <span>{cat.label}</span>
              </LocalLink>
            ))}
          </div>

          <section className="max-w-3xl mt-8">
            <h2 className="text-xl font-bold text-foreground mb-3">{t.categoriesSeoTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">{t.categoriesSeoP1}</p>
            <p className="text-muted-foreground leading-relaxed">{t.categoriesSeoP2}</p>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Categories;
