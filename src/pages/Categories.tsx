import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Categorieën — Webcamsex per Categorie | StartVagina</title>
          <meta name="description" content="Bekijk webcamsex per categorie: MILF, Asian, Latina, Ebony, Big Boobs, Anal, BDSM, Koppels en meer. Vind de perfecte cam girl op StartVagina." />
          <meta name="keywords" content="webcamsex categorieën, cam categorieën, webcam categorieën, cam girls per categorie, webcamsex soorten" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://startvagina.nl/categories" />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
            Webcamsex Categorieën
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            Kies een categorie en ontdek live cam modellen die bij jouw voorkeur passen. Elke categorie toont modellen van alle platforms — Chaturbate, Stripchat, BongaCams, CAM4 en XCams — op één plek.
          </p>

          {/* Category grid — now links instead of buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border bg-card border-border text-foreground hover:bg-accent hover:border-accent text-sm font-medium transition-colors"
              >
                <span className="text-lg">{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>

          {/* SEO text */}
          <section className="max-w-3xl mt-8">
            <h2 className="text-xl font-bold text-foreground mb-3">Webcamsex per categorie op StartVagina</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              StartVagina biedt een uitgebreid overzicht van webcamsex categorieën. Of je nu op zoek bent naar <strong className="text-foreground">MILF cam girls</strong>, <strong className="text-foreground">Latina modellen</strong>, <strong className="text-foreground">BDSM shows</strong> of <strong className="text-foreground">cam koppels</strong> — elke categorie heeft een eigen pagina met live modellen, uitgebreide beschrijvingen en veelgestelde vragen.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Alle categorieën tonen real-time data van de grootste cam platforms: Chaturbate, Stripchat, BongaCams, CAM4 en XCams. Zo vergelijk je het aanbod van alle sites op één plek en vind je altijd de perfecte cam show.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Categories;
