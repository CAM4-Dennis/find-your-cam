import { useLocation } from "react-router-dom";
import LocalLink from "@/components/LocalLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useMemo } from "react";
import { Link /* replaced */ } from "react-router-dom";
import LocalLink from "@/components/LocalLink";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface LanguageConfig {
  slug: string;
  name: string;
  emoji: string;
  title: string;
  h1: string;
  description: string;
  keywords: string;
  content: string;
  aliases: string[];
  faq: { q: string; a: string }[];
}

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

const languagePages: Record<string, LanguageConfig> = {
  "webcamsex-in-het-nederlands": {
    slug: "webcamsex-in-het-nederlands",
    name: "Nederlands",
    emoji: "🇳🇱",
    title: "Webcamsex in het Nederlands — Nederlandstalige Cam Girls | StartVagina",
    h1: "Webcamsex in het Nederlands",
    description: "Nederlandstalige cam girls live op webcam. Gratis webcamsex met modellen die Nederlands spreken. Chat in je eigen taal op Chaturbate, CAM4 en meer.",
    keywords: "webcamsex nederlands, nederlandstalige cam girls, dutch cam girls, webcamsex in het nederlands, nederlandse webcam, cam girls nederlands spreken",
    content: `Eindelijk webcamsex **zonder taalbarrière**. Op StartVagina vind je alle cam modellen die Nederlands spreken — van Nederlandse en Vlaamse cam girls tot Surinaamse modellen. Chat in je eigen taal, stel vragen en geniet van een persoonlijke ervaring.

**Waarom Nederlandstalige cams zo fijn zijn:**
- **Geen taalbarrière**: vertel precies wat je wilt in je moedertaal
- **Persoonlijker**: Nederlandse cam girls begrijpen je humor, cultuur en hints
- **CAM4 is de plek**: het populairste platform voor Nederlandstalige cam modellen
- **Vlaams telt mee**: ook Belgische cam girls die Nederlands spreken vind je hier
- **Directe communicatie**: Nederlanders en Vlamingen staan bekend om hun openheid — en dat merk je in de chat

Of je nu op zoek bent naar een gezellig praatje of een hete show — Nederlandstalige cam girls bieden het beste van twee werelden.`,
    aliases: ["dutch", "nl", "nederlands", "nederlandstalig"],
    faq: [
      { q: "Op welk platform vind ik Nederlandstalige cam girls?", a: "CAM4 heeft verreweg de meeste Nederlandstalige cam modellen. Op Chaturbate en BongaCams vind je er ook, maar minder." },
      { q: "Spreken alle Nederlandse cam girls Nederlands in de chat?", a: "De meeste wel, maar sommige modellen chatten ook in het Engels om een breder publiek te bereiken. Filter op taal om zeker te zijn." },
    ],
  },
  "english-webcam-sex-chat": {
    slug: "english-webcam-sex-chat",
    name: "English",
    emoji: "🇬🇧",
    title: "English Webcam Sex Chat — English Speaking Cam Girls | StartVagina",
    h1: "English Webcam Sex Chat",
    description: "English speaking cam girls live on webcam. Free webcam sex with models who speak English. Chat in English on Chaturbate, Stripchat and more.",
    keywords: "english webcam sex, english cam girls, english speaking cam, webcam sex english, english sex chat, cam girls english",
    content: `English is the **universal language of webcam sex**. The vast majority of cam models speak at least basic English, making it the easiest language to connect in. On StartVagina, we filter all models who speak English — from native speakers to multilingual beauties.

**Why English cams dominate:**
- **Largest selection**: English-speaking models make up the biggest group on every platform
- **All platforms**: Chaturbate, Stripchat, BongaCams, CAM4 and XCams all have massive English-speaking communities
- **Native + multilingual**: from American and British models to Colombian and Romanian cam girls who speak fluent English
- **Best interaction**: English chat rooms are the most active and lively

Whether you're from the UK, US, Netherlands or anywhere else — English cam shows give you the widest choice and best interaction.`,
    aliases: ["english", "en", "eng"],
    faq: [
      { q: "Do most cam models speak English?", a: "Yes! English is the most common language on all major cam platforms. Even models from non-English countries often speak basic to fluent English." },
    ],
  },
  "webcamsex-auf-deutsch": {
    slug: "webcamsex-auf-deutsch",
    name: "Deutsch",
    emoji: "🇩🇪",
    title: "Webcamsex auf Deutsch — Deutsche Cam Girls Live | StartVagina",
    h1: "Webcamsex auf Deutsch",
    description: "Deutschsprachige Cam Girls live auf Webcam. Gratis Webcamsex mit Modellen die Deutsch sprechen. Deutsche Cam Shows auf Chaturbate, Stripchat und mehr.",
    keywords: "webcamsex deutsch, deutsche cam girls, german cam girls, webcamsex auf deutsch, deutsche webcam, cam girls deutsch sprechen",
    content: `Webcamsex auf Deutsch — für alle die lieber in ihrer **Muttersprache** chatten. Auf StartVagina findest du alle Cam Models die Deutsch sprechen, von deutschen Cam Girls über österreichische Modelle bis hin zu Schweizerinnen.

**Deutschsprachige Cams:**
- **Stripchat und BongaCams**: die Plattformen mit den meisten deutschsprachigen Models
- **Persönlicher Kontakt**: in deiner Muttersprache chattest du natürlicher und direkter
- **Große Auswahl**: von Berlin bis Wien, von professionell bis Amateur
- **Auch Nicht-Muttersprachler**: viele osteuropäische Models sprechen fließend Deutsch

Genieße Webcamsex ohne Sprachbarriere — auf StartVagina findest du sie alle.`,
    aliases: ["german", "de", "deutsch"],
    faq: [
      { q: "Auf welcher Plattform finde ich deutsche Cam Girls?", a: "Stripchat und BongaCams haben die meisten deutschsprachigen Models. Auch auf Chaturbate gibt es eine gute Auswahl." },
    ],
  },
  "webcamsex-en-francais": {
    slug: "webcamsex-en-francais",
    name: "Français",
    emoji: "🇫🇷",
    title: "Webcamsex en Français — Cam Girls Francophones | StartVagina",
    h1: "Webcamsex en Français",
    description: "Cam girls francophones en direct sur webcam. Webcamsex gratuit avec des modèles qui parlent français. XCams, Chaturbate et plus.",
    keywords: "webcamsex francais, cam girls francaises, french cam girls, webcamsex en francais, cam francophone, sexe cam francais",
    content: `Le français est la langue de l'amour — et du **webcamsex**. Sur StartVagina, retrouvez toutes les cam girls qui parlent français. Des modèles françaises aux Belges wallonnes, en passant par les Canadiennes et les Africaines francophones.

**Le webcamsex francophone:**
- **XCams**: la plateforme d'origine française, avec le plus grand nombre de modèles francophones
- **Chaturbate et Stripchat**: également de bonnes sélections de cam girls françaises
- **Diversité**: France, Belgique, Canada, Suisse, Afrique — le français rassemble
- **Intimité**: chatter dans sa langue maternelle rend l'expérience plus personnelle

Découvrez toutes les cam girls francophones sur StartVagina.`,
    aliases: ["french", "fr", "français", "francais"],
    faq: [
      { q: "Où trouver des cam girls françaises?", a: "XCams est la meilleure plateforme pour les modèles francophones. Chaturbate et Stripchat ont aussi de bonnes sélections." },
    ],
  },
  "webcamsex-en-espanol": {
    slug: "webcamsex-en-espanol",
    name: "Español",
    emoji: "🇪🇸",
    title: "Webcamsex en Español — Cam Girls Hispanas en Vivo | StartVagina",
    h1: "Webcamsex en Español",
    description: "Cam girls que hablan español en vivo por webcam. Webcamsex gratis con modelos hispanas de Colombia, España, México y más.",
    keywords: "webcamsex español, cam girls español, spanish cam girls, webcamsex en español, cams en español, sexo cam español, cam girls hispanas",
    content: `El español es el **segundo idioma más hablado** en el mundo del webcamsex. Con miles de modelos de Colombia, España, México, Venezuela y Argentina, las cams en español ofrecen pasión, energía y una conexión auténtica.

**Webcamsex en español:**
- **Colombia lidera**: el país con más cam models del mundo — casi todas hablan español
- **Chaturbate y Stripchat**: las plataformas con más modelos hispanohablantes
- **España, México, Venezuela, Argentina**: una enorme diversidad de acentos y estilos
- **Comunicación directa**: habla con las modelos en su idioma para una experiencia más personal
- **Interacción intensa**: las modelos latinas son conocidas por su energía e interacción con el público

Descubre todas las cam girls que hablan español en StartVagina.`,
    aliases: ["spanish", "es", "español", "espanol"],
    faq: [
      { q: "¿Dónde encontrar cam girls que hablen español?", a: "Chaturbate y Stripchat tienen miles de modelos hispanohablantes, principalmente de Colombia, México y España." },
    ],
  },
  "webcamsex-in-italiano": {
    slug: "webcamsex-in-italiano",
    name: "Italiano",
    emoji: "🇮🇹",
    title: "Webcamsex in Italiano — Cam Girls Italiane dal Vivo | StartVagina",
    h1: "Webcamsex in Italiano",
    description: "Cam girls italiane dal vivo su webcam. Webcamsex gratis con modelle che parlano italiano su XCams, BongaCams e altro.",
    keywords: "webcamsex italiano, cam girls italiane, italian cam girls, webcamsex in italiano, cam italiane, sesso cam italiano",
    content: `Il webcamsex in italiano offre un'esperienza **intima e personale**. Le cam girls italiane combinano bellezza mediterranea con temperamento e passione. Su StartVagina trovi tutte le modelle che parlano italiano.

**Webcamsex italiano:**
- **XCams**: piattaforma europea con molte modelle italiane
- **BongaCams**: buona selezione di cam girls dall'Italia
- **Eleganza naturale**: le modelle italiane portano uno stile unico alle loro show
- **Comunicazione in italiano**: chatta nella tua lingua per un'esperienza più autentica

Scopri tutte le cam girls italiane su StartVagina.`,
    aliases: ["italian", "it", "italiano"],
    faq: [
      { q: "Dove trovo cam girls italiane?", a: "XCams e BongaCams hanno il maggior numero di modelle italiane. Anche su Chaturbate e Stripchat ne trovi alcune." },
    ],
  },
  "webcamsex-em-portugues": {
    slug: "webcamsex-em-portugues",
    name: "Português",
    emoji: "🇵🇹",
    title: "Webcamsex em Português — Cam Girls Brasileiras ao Vivo | StartVagina",
    h1: "Webcamsex em Português",
    description: "Cam girls que falam português ao vivo na webcam. Webcamsex grátis com modelos brasileiras e portuguesas no Chaturbate, Stripchat e mais.",
    keywords: "webcamsex portugues, cam girls brasileiras, portuguese cam girls, webcamsex em portugues, cam girls portugal, brasileiras cam",
    content: `O português é a língua das **cam girls brasileiras** — o segundo maior grupo latino no webcamsex mundial. Com energia, curvas e simpatia, as modelos lusófonas oferecem uma experiência única.

**Webcamsex em português:**
- **Brasil domina**: milhares de cam girls brasileiras online diariamente
- **Chaturbate e Stripchat**: as plataformas com mais modelos brasileiras
- **Energia e espontaneidade**: shows brasileiros são animados e interativos
- **Portugal também**: modelos portuguesas trazem um estilo europeu refinado

Descubra todas as cam girls que falam português na StartVagina.`,
    aliases: ["portuguese", "pt", "português", "portugues"],
    faq: [
      { q: "Onde encontro cam girls brasileiras?", a: "Chaturbate e Stripchat têm a maior seleção de modelos brasileiras. Muitas falam português e inglês." },
    ],
  },
  "webcamsex-na-russkom": {
    slug: "webcamsex-na-russkom",
    name: "Русский",
    emoji: "🇷🇺",
    title: "Вебкамсекс на Русском — Русские Кам Модели | StartVagina",
    h1: "Webcamsex in het Russisch",
    description: "Russisch sprekende cam girls live op webcam. Gratis webcamsex met modellen die Russisch spreken op BongaCams, Stripchat en Chaturbate.",
    keywords: "webcamsex russisch, russische cam girls, russian cam girls, webcamsex russian, русский вебкам, русские модели",
    content: `Russisch is een van de **meest gesproken talen** op cam platforms. Russischtalige cam girls komen uit Rusland, Oekraïne, Belarus en andere voormalige Sovjet-landen. Ze staan bekend om hun schoonheid en professionele aanpak.

**Russischtalige cams:**
- **BongaCams**: het platform bij uitstek voor Russischtalige modellen
- **Stripchat en Chaturbate**: ook veel Russisch sprekende cam girls
- **Professioneel**: veel Russische modellen werken vanuit studio's met HD-setups
- **Meertalig**: naast Russisch spreken velen ook Engels

Ontdek alle Russisch sprekende cam modellen op StartVagina.`,
    aliases: ["russian", "ru", "русский"],
    faq: [
      { q: "Waar vind ik Russischtalige cam girls?", a: "BongaCams heeft het grootste aanbod. Stripchat en Chaturbate hebben ook veel Russisch sprekende modellen." },
    ],
  },
  "japanese-webcam-sex": {
    slug: "japanese-webcam-sex",
    name: "日本語",
    emoji: "🇯🇵",
    title: "Japanese Webcam Sex — Japanese Cam Girls Live | StartVagina",
    h1: "Webcamsex in het Japans",
    description: "Japans sprekende cam girls live op webcam. Gratis webcamsex met Japanse modellen op Stripchat, Chaturbate en meer. Cosplay en kawaii cam shows.",
    keywords: "japanese webcam sex, japanese cam girls, japanse cam girls, 日本語 ウェブカム, japanese live cam, cosplay cam",
    content: `Japanse cam girls bieden een **unieke webcamsex-ervaring** met cosplay, kawaii-esthetiek en een eigen cultuur. Op StartVagina vind je alle modellen die Japans spreken.

**Japanstalige cams:**
- **Stripchat**: het westerse platform met de meeste Japanse modellen
- **Cosplay en roleplay**: veel Japanse cam girls integreren anime en cosplay in hun shows
- **Kawaii cultuur**: een herkenbare, speelse stijl die nergens anders te vinden is
- **Overdag online**: door het tijdsverschil zijn Japanse modellen vooral overdag (CET) online

Ontdek alle Japans sprekende cam modellen op StartVagina.`,
    aliases: ["japanese", "ja", "jp", "日本語"],
    faq: [
      { q: "Wanneer zijn Japanse cam girls online?", a: "Door het tijdsverschil (8 uur voor op CET) zijn ze vooral tussen 10:00 en 20:00 CET online." },
    ],
  },
  "korean-webcam-sex": {
    slug: "korean-webcam-sex",
    name: "한국어",
    emoji: "🇰🇷",
    title: "Korean Webcam Sex — Korean Cam Girls Live | StartVagina",
    h1: "Webcamsex in het Koreaans",
    description: "Koreaans sprekende cam girls live op webcam. Gratis webcamsex met Koreaanse modellen op Stripchat en Chaturbate.",
    keywords: "korean webcam sex, korean cam girls, koreaanse cam girls, 한국어 웹캠, korean live cam",
    content: `Koreaanse cam girls brengen **K-beauty en elegantie** naar webcamsex. Met een groeiende aanwezigheid op westerse platforms zijn Koreaans sprekende modellen steeds makkelijker te vinden.

**Koreaanse cams:**
- **Stripchat**: het platform met de meeste Koreaanse modellen
- **K-beauty esthetiek**: Koreaanse cam girls zijn vaak stijlvol en verzorgd
- **Groeiend aanbod**: steeds meer Koreaanse modellen ontdekken westerse cam platforms
- **Unieke stijl**: een mix van Aziatische elegantie en moderne flair

Ontdek alle Koreaans sprekende cam modellen op StartVagina.`,
    aliases: ["korean", "ko", "kr", "한국어"],
    faq: [
      { q: "Zijn er veel Koreaanse cam modellen?", a: "Het aanbod groeit. Stripchat heeft de meeste Koreaanse modellen op westerse platforms." },
    ],
  },
};

const allLanguagePages = Object.values(languagePages);

const LanguageLanding = () => {
  const location = useLocation();
  const { basePath } = useLanguage();
  const slug = basePath.replace(/^\//, "");
  const config = languagePages[slug || ""];
  const { allCams, isLoading } = useAllCams();

  const languageCams = useMemo(() => {
    if (!config || !allCams.length) return [];
    return allCams
      .filter((m) => m.languages?.length > 0 && modelMatchesLanguage(m.languages, config.aliases))
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
            {config.emoji} {config.h1}
          </h1>

          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>Modellen laden…</span>
            </div>
          ) : (
            <CamGrid
              title={`${config.emoji} ${config.name} — ${languageCams.length} modellen online`}
              models={languageCams}
              totalOnline={languageCams.length}
              isLoading={isLoading}
            />
          )}

          <section className="mt-12 max-w-3xl">
            <div
              className="text-muted-foreground leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{
                __html: "<p>" + renderContent(config.content) + "</p>",
              }}
            />
          </section>

          {/* FAQ */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Veelgestelde vragen
            </h2>
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

          {/* Cross-links */}
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Meer talen op StartVagina
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
                🗣️ Alle Talen
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
