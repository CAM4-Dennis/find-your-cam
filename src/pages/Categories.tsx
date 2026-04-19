import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import LocalLink from "@/components/LocalLink";
import { useLanguage } from "@/i18n/LanguageContext";

const categories = [
  { label: "Teen (18+)", emoji: "🔞", slug: "webcamsex-teen-18-plus" },
  { label: "MILF", emoji: "💋", slug: "webcamsex-milf" },
  { label: "Mature", emoji: "👩‍🦳", slug: "webcamsex-mature" },
  { label: "Asian", emoji: "🌸", slug: "webcamsex-asian" },
  { label: "Latina", emoji: "🌶️", slug: "webcamsex-latina" },
  { label: "Ebony", emoji: "🖤", slug: "webcamsex-ebony" },
  { label: "Grote Borsten", emoji: "🍈", slug: "webcamsex-grote-borsten" },
  { label: "Kleine Borsten", emoji: "🌷", slug: "webcamsex-kleine-borsten" },
  { label: "Anal", emoji: "🍑", slug: "webcamsex-anal" },
  { label: "Koppels", emoji: "💑", slug: "webcamsex-koppels" },
  { label: "Squirt", emoji: "💦", slug: "webcamsex-squirt" },
  { label: "BDSM", emoji: "⛓️", slug: "webcamsex-bdsm" },
  { label: "Tattoo", emoji: "🎨", slug: "webcamsex-tattoo" },
  { label: "Hairy", emoji: "🌿", slug: "webcamsex-hairy" },
  { label: "Voeten", emoji: "🦶", slug: "webcamsex-voeten" },
  { label: "Outdoor", emoji: "🌳", slug: "webcamsex-outdoor" },
  { label: "Mobiel", emoji: "📱", slug: "webcamsex-mobiel" },
];

const Categories = () => {
  const { t, langPrefix } = useLanguage();

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{t.categoriesTitle}</title>
          <meta name="description" content={t.categoriesDescription} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://www.startvagina.nl${langPrefix}/categories`} />
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
