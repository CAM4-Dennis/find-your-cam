import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import LoadingBar from "@/components/LoadingBar";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useMemo } from "react";
import { Link } from "react-router-dom";

interface PlatformConfig {
  slug: string;
  platformId: string; // matches CamModel.platform
  name: string;
  title: string;
  h1: string;
  description: string;
  keywords: string;
  intro: string;
  faq: { q: string; a: string }[];
}

const platforms: Record<string, PlatformConfig> = {
  "live-sex-cams-cam4": {
    slug: "live-sex-cams-cam4",
    platformId: "cam4",
    name: "CAM4",
    title: "Live Sex Cams CAM4 — Gratis Cam4 Webcamsex | StartVagina",
    h1: "Live Sex Cams CAM4 — Gratis Webcam Shows",
    description:
      "Bekijk gratis live sex cams van CAM4 op StartVagina. Duizenden CAM4 modellen live online. Nederlandse en Belgische cam girls, koppels en meer op Cam4.",
    keywords:
      "cam4, cam4 live, cam4 webcamsex, cam4 gratis, cam4 nederland, cam4 sex cams, cam4 cam girls, cam4 modellen, cam4 live sex",
    intro:
      "Ontdek alle live CAM4 modellen op StartVagina. CAM4 staat bekend om echte amateurs en koppels uit Nederland en België. Bekijk gratis live webcam shows, chat met modellen en geniet van ongeregisseerde cam sex — 24/7 online.",
    faq: [
      {
        q: "Wat is CAM4?",
        a: "CAM4 is een populair webcamsex platform met de nadruk op echte amateurs. Het platform is bijzonder populair in Nederland en België en staat bekend om de grote selectie Nederlandse cam modellen en koppels.",
      },
      {
        q: "Is CAM4 gratis?",
        a: "Ja, je kunt gratis live cam shows kijken op CAM4. Je hebt alleen tokens nodig als je wilt tippen of een privé show wilt aanvragen. Een account aanmaken is gratis.",
      },
      {
        q: "Hoeveel CAM4 modellen zijn er online?",
        a: "Op elk moment zijn er honderden CAM4 modellen online. StartVagina toont alle live CAM4 cam girls en koppels in real-time.",
      },
    ],
  },
  "live-sex-cams-chaturbate": {
    slug: "live-sex-cams-chaturbate",
    platformId: "chaturbate",
    name: "Chaturbate",
    title: "Live Sex Cams Chaturbate — Gratis Chaturbate Shows | StartVagina",
    h1: "Live Sex Cams Chaturbate — Gratis Cam Shows",
    description:
      "Gratis Chaturbate live sex cams kijken op StartVagina. De populairste cam girls van Chaturbate live online. Webcamsex, sexchat en erotische shows.",
    keywords:
      "chaturbate, chaturbate live, chaturbate gratis, chaturbate nederland, chaturbate cam girls, chaturbate webcamsex, chaturbate modellen, chaturbate sex cams",
    intro:
      "Chaturbate is 's werelds grootste webcamsex platform met duizenden modellen tegelijk online. Op StartVagina zie je alle live Chaturbate cam girls op één overzichtelijke pagina. Filter, zoek en begin direct met kijken — gratis en zonder registratie.",
    faq: [
      {
        q: "Wat is Chaturbate?",
        a: "Chaturbate is het grootste webcamsex platform ter wereld. Met duizenden modellen 24/7 online biedt het een enorme variatie aan cam shows — van solo modellen tot koppels en groepen.",
      },
      {
        q: "Is Chaturbate gratis kijken?",
        a: "Ja! Alle openbare Chaturbate shows zijn gratis te bekijken. Je kunt tokens kopen om te tippen of privé shows aan te vragen, maar kijken is altijd gratis.",
      },
      {
        q: "Waarom Chaturbate via StartVagina?",
        a: "StartVagina combineert Chaturbate met andere platforms zodat je in één overzicht alle live modellen kunt vergelijken. Handig als je het beste van alle cam sites wilt zien.",
      },
    ],
  },
  "live-sex-cams-bongacams": {
    slug: "live-sex-cams-bongacams",
    platformId: "bongacams",
    name: "BongaCams",
    title: "Live Sex Cams BongaCams — Gratis BongaCams Webcamsex | StartVagina",
    h1: "Live Sex Cams BongaCams — Gratis Webcam Shows",
    description:
      "Bekijk gratis BongaCams live sex cams op StartVagina. Populaire BongaCams cam girls en modellen live online. Europese webcamsex op z'n best.",
    keywords:
      "bongacams, bongacams live, bongacams gratis, bongacams nederland, bongacams cam girls, bongacams webcamsex, bongacams modellen, bongacams sex cams",
    intro:
      "BongaCams is een van de populairste Europese cam sites met een groot aanbod aan cam girls uit Oost-Europa, Nederland en België. Bekijk alle live BongaCams modellen hier op StartVagina — gratis en in HD kwaliteit.",
    faq: [
      {
        q: "Wat is BongaCams?",
        a: "BongaCams is een groot Europees webcamsex platform. Het staat bekend om de hoge videokwaliteit, veel Europese modellen en een gebruiksvriendelijke interface.",
      },
      {
        q: "Is BongaCams gratis?",
        a: "Ja, openbare cam shows op BongaCams zijn gratis te bekijken. Het platform biedt ook gratis tokens aan voor nieuwe gebruikers.",
      },
      {
        q: "Wat maakt BongaCams anders?",
        a: "BongaCams onderscheidt zich door de grote selectie Europese modellen, HD-streams en het feit dat veel modellen Nederlands spreken.",
      },
    ],
  },
  "live-sex-cams-stripchat": {
    slug: "live-sex-cams-stripchat",
    platformId: "stripchat",
    name: "Stripchat",
    title: "Live Sex Cams Stripchat — Gratis Stripchat Shows | StartVagina",
    h1: "Live Sex Cams Stripchat — Gratis Cam Shows",
    description:
      "Gratis Stripchat live sex cams kijken op StartVagina. Duizenden Stripchat cam girls en modellen live. VR cam shows, sexchat en meer.",
    keywords:
      "stripchat, stripchat live, stripchat gratis, stripchat nederland, stripchat cam girls, stripchat webcamsex, stripchat modellen, stripchat vr cams",
    intro:
      "Stripchat is een snelgroeiend cam platform dat bekend staat om innovatieve features zoals VR cam shows. Bekijk alle live Stripchat modellen op StartVagina — van cam girls tot koppels, allemaal gratis en in hoge kwaliteit.",
    faq: [
      {
        q: "Wat is Stripchat?",
        a: "Stripchat is een populair webcamsex platform met unieke features zoals VR-shows en interactieve speelgoed-integratie. Het platform groeit snel en heeft duizenden modellen online.",
      },
      {
        q: "Heeft Stripchat VR cam shows?",
        a: "Ja! Stripchat is een van de weinige cam sites die VR-shows aanbiedt. Met een VR-headset kun je een meeslepende ervaring beleven met je favoriete modellen.",
      },
      {
        q: "Is Stripchat gratis?",
        a: "Ja, alle openbare shows op Stripchat zijn gratis. Het platform biedt ook een uitgebreide zoekmachine met filters op categorie, leeftijd en meer.",
      },
    ],
  },
  "live-sex-cams-xcams": {
    slug: "live-sex-cams-xcams",
    platformId: "xcams",
    name: "XCams",
    title: "Live Sex Cams XCams — Gratis XCams Webcamsex | StartVagina",
    h1: "Live Sex Cams XCams — Europese Cam Shows",
    description:
      "Bekijk gratis XCams live sex cams op StartVagina. Europese XCams cam girls en modellen live online. Premium webcamsex uit Frankrijk, Nederland en België.",
    keywords:
      "xcams, xcams live, xcams gratis, xcams nederland, xcams cam girls, xcams webcamsex, xcams modellen, xcams europees",
    intro:
      "XCams is het premium Europese cam platform bij uitstek. Met een focus op kwaliteit boven kwantiteit biedt XCams een selectie van de mooiste Europese cam modellen. Bekijk alle live XCams shows hier op StartVagina.",
    faq: [
      {
        q: "Wat is XCams?",
        a: "XCams is een Europees webcamsex platform met een focus op premium kwaliteit. Het platform is vooral populair in Frankrijk, Nederland en België en staat bekend om professionele modellen.",
      },
      {
        q: "Is XCams gratis?",
        a: "Je kunt gratis XCams shows bekijken via StartVagina. Het platform biedt zowel gratis openbare shows als premium privé opties.",
      },
      {
        q: "Waarom XCams kiezen?",
        a: "XCams onderscheidt zich door de Europese focus, hoge videokwaliteit en een intieme sfeer met minder modellen maar hogere productiewaarde.",
      },
    ],
  },
};

const PlatformLanding = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "");
  const config = platforms[slug || ""];
  const { allCams, isLoading } = useAllCams();

  const platformCams = useMemo(() => {
    if (!config || !allCams.length) return [];
    return allCams
      .filter((m) => m.platform?.toLowerCase() === config.platformId)
      .sort(() => Math.random() - 0.5);
  }, [allCams, config]);

  if (!config) return null;

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{config.title}</title>
          <meta name="description" content={config.description} />
          <meta name="keywords" content={config.keywords} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://startvagina.nl/${config.slug}`} />
          <meta property="og:title" content={config.title} />
          <meta property="og:description" content={config.description} />
          <meta property="og:url" content={`https://startvagina.nl/${config.slug}`} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={config.title} />
          <meta name="twitter:description" content={config.description} />
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
            <h1 className="text-3xl font-bold font-display text-foreground mb-3">
              {config.h1}
            </h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">
              {config.intro}
            </p>
          </section>

          {isLoading ? (
            <LoadingBar />
          ) : (
            <CamGrid
              title={`🔴 ${config.name} Live — ${platformCams.length} modellen online`}
              models={platformCams}
              totalOnline={platformCams.length}
              isLoading={isLoading}
            />
          )}

          {/* FAQ Section */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Veelgestelde vragen over {config.name}
            </h2>
            <div className="space-y-4">
              {config.faq.map((f, i) => (
                <details
                  key={i}
                  className="group bg-card border border-border rounded-lg"
                >
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

          {/* Cross-links to other platforms */}
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Andere platforms op StartVagina
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.values(platforms)
                .filter((p) => p.slug !== config.slug)
                .map((p) => (
                  <Link
                    key={p.slug}
                    to={`/${p.slug}`}
                    className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
                  >
                    {p.name} Live Cams
                  </Link>
                ))}
              <Link
                to="/webcamsex"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Webcamsex
              </Link>
              <Link
                to="/cam-girls"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Cam Girls
              </Link>
              <Link
                to="/categories"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Categorieën
              </Link>
              <Link
                to="/blog"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default PlatformLanding;
