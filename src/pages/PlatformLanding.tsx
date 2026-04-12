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
import { Link /* replaced */ } from "react-router-dom";
import LocalLink from "@/components/LocalLink";
import { useLanguage } from "@/i18n/LanguageContext";

interface PlatformConfig {
  slug: string;
  platformId: string; // matches CamModel.platform
  name: string;
  title: string;
  h1: string;
  description: string;
  keywords: string;
  intro: string;
  content: string;
  faq: { q: string; a: string }[];
}

/** Convert **bold** markers and newlines to simple HTML */
function renderContent(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "<br/>• ")
    .replace(/\n/g, "<br/>");
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
    intro: "",
    content: `CAM4 is al sinds 2007 een van de meest populaire webcamsex platforms ter wereld — en met name in Nederland en België heeft het een enorme fanbase opgebouwd. Wat CAM4 uniek maakt? Het draait hier om **echte mensen**. Geen gepolijste studio-opnames, maar authentieke amateurs en koppels die vanuit hun eigen slaapkamer of woonkamer live gaan.

Op StartVagina verzamelen we alle live CAM4 modellen op één overzichtelijke pagina. Je ziet in real-time wie er online is, inclusief thumbnail previews en het aantal kijkers. Geen gedoe met inloggen of registreren — klik op een model en je kijkt direct mee.

**Waarom CAM4 zo populair is in Nederland:**
- Een van de weinige cam sites met een groot aantal **Nederlandse en Vlaamse modellen**
- Sterke community van **echte amateurs** — geen scripts, geen regisseurs
- Populair bij **koppels** die samen live gaan
- Gratis kijken zonder account, inclusief HD-streams
- Actieve chatrooms waar modellen direct reageren op kijkers

Of je nu op zoek bent naar een gezellige Nederlandse cam girl, een spannend koppel of gewoon wilt rondkijken — CAM4 heeft het. En via StartVagina kun je tegelijk vergelijken met modellen van Chaturbate, Stripchat en andere platforms.`,
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
    intro: "",
    content: `Chaturbate is met afstand het **grootste webcamsex platform ter wereld**. Op elk willekeurig moment zijn er meer dan 4.000 modellen tegelijk live — van solo cam girls en jongens tot koppels en groepen. De naam zegt het al: een mix van "chat" en "masturbate", en dat vat de sfeer perfect samen.

Op StartVagina tonen we alle live Chaturbate cam girls in een overzichtelijk grid. Je hoeft niet te zoeken op Chaturbate zelf — wij laten je in één oogopslag zien wie er online is, met thumbnail previews, leeftijd en tags. Klik en kijk, zo simpel is het.

**Wat maakt Chaturbate de nummer één?**
- **Grootste aanbod**: duizenden modellen 24/7 online, uit elke hoek van de wereld
- **Token-systeem**: kijk gratis mee en tip alleen als je dat wilt — geen verplichte betalingen
- **Interactieve shows**: veel modellen gebruiken Lovense en andere connected toys die reageren op tips
- **Enorme variatie**: of je nu houdt van jonge cam girls, curvy modellen, MILF's, koppels of een specifieke niche — het is er allemaal
- **Geen registratie nodig**: alle openbare shows zijn direct en anoniem te bekijken

Chaturbate is ook de plek waar veel **nieuwe cam modellen** hun carrière beginnen. Via het "New Cams"-filter ontdek je dagelijks verse gezichten die voor het eerst live gaan. En dankzij het enorme aantal kijkers is de chatsfeer altijd levendig.

Tip: gebruik de filters op StartVagina om Chaturbate-modellen te combineren met cam girls van Stripchat, BongaCams en CAM4. Zo mis je nooit de beste show.`,
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
    intro: "",
    content: `BongaCams heeft zich in korte tijd opgewerkt tot een van de **grootste cam platforms van Europa**. Met het hoofdkantoor in Cyprus en een sterke focus op de Europese markt, trekt BongaCams een ander type model aan dan de Amerikaanse concurrenten — denk aan prachtige Oost-Europese, Nederlandse en Belgische cam girls die in HD-kwaliteit streamen.

Op StartVagina zie je alle live BongaCams modellen op één plek. Real-time data, thumbnail previews en directe links naar de streams — zonder omwegen.

**Wat BongaCams onderscheidt:**
- **Europese focus**: veel modellen uit Roemenië, Rusland, Oekraïne, Nederland en België — vaak meertalig
- **HD als standaard**: BongaCams staat bekend om hoge videokwaliteit, ook in gratis shows
- **Gratis tokens voor nieuwe gebruikers**: bij registratie ontvang je direct tokens om te tippen
- **Actieve promoties**: regelmatig wedstrijden en awards die modellen extra motiveren
- **Gebruiksvriendelijke interface**: schoon design, snelle streams, goede mobiele ervaring

BongaCams is ideaal als je houdt van Europese schoonheden met een professionele uitstraling, maar toch de spontaniteit van live webcamsex. De modellen zijn over het algemeen interactief en reageren snel in de chat.

Een voordeel van BongaCams ten opzichte van Chaturbate is de **overzichtelijkheid**. Waar Chaturbate je kan overweldigen met duizenden opties, biedt BongaCams een meer gecureerde ervaring. En via StartVagina vergelijk je beide platforms moeiteloos naast elkaar.`,
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
    intro: "",
    content: `Stripchat is de afgelopen jaren uitgegroeid tot een serieuze concurrent van Chaturbate — en op sommige vlakken heeft het de gigant al ingehaald. Met **innovatieve features** zoals VR cam shows, AI-aanbevelingen en een gelikte interface trekt Stripchat zowel modellen als kijkers aan die op zoek zijn naar de nieuwste technologie in webcamsex.

Op StartVagina tonen we alle live Stripchat modellen real-time. Thumbnail previews, kijkersaantallen en directe links — in één klik ben je bij je favoriete model.

**Waarom Stripchat eruit springt:**
- **VR cam shows**: als een van de weinige platforms biedt Stripchat **virtual reality** shows aan — met een VR-headset zit je virtueel naast het model
- **Enorm aanbod**: duizenden modellen tegelijk online, vergelijkbaar met Chaturbate
- **Slimme filters**: zoek op leeftijd, lichaamsbouw, haarkleur, etniciteit, taal en tientallen categorieën
- **Interactieve toys**: veel modellen gebruiken connected toys die reageren op tips — populaire functie bij kijkers
- **Gratis en anoniem**: alle openbare shows zijn zonder account te bekijken
- **Snelgroeiend**: steeds meer topmodellen stappen over van andere platforms naar Stripchat

Wat Stripchat bijzonder maakt is de **balans tussen kwantiteit en kwaliteit**. Het enorme aanbod van Chaturbate gecombineerd met de gepolijste ervaring van premium sites. De zoekfunctie en filters zijn uitstekend, waardoor je snel vindt wat je zoekt.

Of je nu een doorgewinterde cam-kijker bent of voor het eerst webcamsex ontdekt — Stripchat is een platform dat je moet kennen. En via StartVagina vergelijk je Stripchat-modellen direct met die van CAM4, BongaCams en Chaturbate.`,
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
    intro: "",
    content: `XCams is het **best bewaarde geheim** van de Europese webcamsex-wereld. Waar platforms als Chaturbate en Stripchat draaien om volume — duizenden modellen tegelijk — kiest XCams bewust voor een andere aanpak: **kwaliteit boven kwantiteit**. Het resultaat? Een selecte groep van de mooiste en meest professionele Europese cam modellen.

Op StartVagina tonen we alle live XCams modellen naast die van de grote platforms. Zo ontdek je een wereld van premium webcamsex die je anders misschien had gemist.

**Wat maakt XCams uniek?**
- **Premium Europees**: XCams heeft zijn roots in Frankrijk en richt zich op de Europese markt — veel modellen uit Frankrijk, Spanje, Italië, Nederland en België
- **Kwaliteit boven kwantiteit**: minder modellen online, maar een hoger gemiddeld niveau qua looks, setup en interactie
- **Professionele sfeer**: veel modellen hebben professionele camera's, belichting en achtergronden — het voelt als een premium ervaring
- **Intieme chatrooms**: door het kleinere aantal kijkers per model is de interactie persoonlijker dan op de grote platforms
- **Meertalig**: veel modellen spreken meerdere Europese talen, waaronder Nederlands, Frans, Duits en Engels

XCams is perfect voor wie uitgeput raakt van het eindeloos scrollen op Chaturbate en op zoek is naar iets **exclusievers**. De modellen nemen meer de tijd voor hun kijkers en de shows voelen persoonlijker en intiemer aan.

Het platform is minder bekend dan de grote namen, maar dat is juist het voordeel — minder concurrentie om de aandacht van je favoriete model. Via StartVagina kun je XCams-modellen ontdekken naast het aanbod van Chaturbate, Stripchat, BongaCams en CAM4.`,
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
          <h1 className="text-3xl font-bold font-display text-foreground mb-6">
            {config.h1}
          </h1>

          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>Modellen laden…</span>
            </div>
          ) : (
            <CamGrid
              title={`🔴 ${config.name} Live — ${platformCams.length} modellen online`}
              models={platformCams}
              totalOnline={platformCams.length}
              isLoading={isLoading}
            />
          )}

          {/* SEO content below cams */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-xl font-bold text-foreground mb-3">Over {config.name}</h2>
            <div
              className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: "<p>" + renderContent(config.content) + "</p>" }}
            />
          </section>

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
                  <LocalLink
                    key={p.slug}
                    to={`/${p.slug}`}
                    className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
                  >
                    {p.name} Live Cams
                  </LocalLink>
                ))}
              <LocalLink
                to="/webcamsex"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Webcamsex
              </LocalLink>
              <LocalLink
                to="/cam-girls"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Cam Girls
              </LocalLink>
              <LocalLink
                to="/categories"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Categorieën
              </LocalLink>
              <LocalLink
                to="/blog"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Blog
              </LocalLink>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default PlatformLanding;
