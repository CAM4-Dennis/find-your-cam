import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import CamGrid from "@/components/CamGrid";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { featuredModels, topModels, newModels } from "@/data/mockModels";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>StartVagina — Gratis Live Sex Cams, Webcam Shows & Chat</title>
          <meta
            name="description"
            content="StartVagina is dé zoekmachine voor gratis live sex cams. Bekijk duizenden webcam modellen van Chaturbate, Stripchat, BongaCams en meer. Filter op categorie, leeftijd, land en meer."
          />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://startvagina.nl" />
          <meta property="og:title" content="StartVagina — Gratis Live Sex Cams" />
          <meta property="og:description" content="Dé zoekmachine voor gratis live webcam shows. Duizenden modellen van de beste cam-platformen." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://startvagina.nl" />
          <meta property="og:site_name" content="StartVagina" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="StartVagina — Gratis Live Sex Cams" />
          <meta name="twitter:description" content="Dé zoekmachine voor gratis live webcam shows." />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "StartVagina",
              url: "https://startvagina.nl",
              description: "Dé zoekmachine voor gratis live sex cams en webcam shows.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://startvagina.nl/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            })}
          </script>
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          {/* SEO H1 */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold font-display">
              Gratis Live Sex Cams & Webcam Shows
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
              Welkom bij StartVagina, dé zoekmachine voor gratis live sex cams. Bekijk webcam shows van de beste platformen, 
              filter op categorie, geslacht, leeftijd, land en meer. Ontdek duizenden modellen die nu live zijn.
            </p>
          </div>

          <div className="flex gap-6">
            {/* Main content */}
            <div className="flex-1 space-y-8 min-w-0">
              <CamGrid title="🔥 Populaire Cams" models={featuredModels} totalOnline={18432} />
              <CamGrid title="⭐ Top Cams" models={topModels} />
              <CamGrid title="🆕 Nieuw Online" models={newModels} />
            </div>

            {/* Sidebar - desktop only */}
            <div className="hidden lg:block w-64 shrink-0">
              <FilterSidebar />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Index;
