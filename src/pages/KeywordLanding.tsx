import { useParams, useLocation } from "react-router-dom";
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

interface KeywordConfig {
  title: string;
  h1: string;
  description: string;
  keywords: string;
  intro: string;
  faq: { q: string; a: string }[];
}

const keywordPages: Record<string, KeywordConfig> = {
  webcamsex: {
    title: "Webcamsex — Gratis Live Webcam Sex Kijken | StartVagina",
    h1: "Webcamsex — Gratis Live Cam Shows",
    description: "Gratis webcamsex kijken met duizenden cam girls live online. De beste webcam sex van Nederland en België op één plek. Chaturbate, Stripchat, BongaCams en meer.",
    keywords: "webcamsex, webcam sex, gratis webcamsex, live webcam sex, webcamsex nederland, webcamsex belgie",
    intro: "Welkom bij StartVagina — dé plek voor gratis webcamsex. Bekijk duizenden cam modellen live vanuit Nederland, België en de rest van de wereld. Kies je favoriet platform en geniet van gratis webcam sex shows zonder registratie.",
    faq: [
      { q: "Is webcamsex gratis?", a: "Ja! Op StartVagina kun je gratis webcamsex kijken. Alle streams zijn live en zonder registratie te bekijken. Wil je chatten of tippen, dan heb je een gratis account nodig bij het betreffende platform." },
      { q: "Welke webcamsex sites zijn het best?", a: "De populairste webcamsex sites zijn Chaturbate, Stripchat, BongaCams en CAM4. Op StartVagina verzamelen we alle modellen van deze platforms op één plek zodat je makkelijk kunt vergelijken." },
      { q: "Is webcamsex anoniem?", a: "Ja, je kunt volledig anoniem webcamsex kijken. Je hoeft geen account aan te maken om streams te bekijken. De modellen kunnen jou niet zien tenzij je zelf je cam aanzet in een privé show." },
    ],
  },
  "gratis-webcam-sex": {
    title: "Gratis Webcam Sex — Live Cam Girls Zonder te Betalen | StartVagina",
    h1: "Gratis Webcam Sex — Live & Zonder Betalen",
    description: "Gratis webcam sex kijken met de mooiste cam girls. Geen creditcard nodig, geen registratie. Live cam shows van Chaturbate, Stripchat en meer.",
    keywords: "gratis webcam sex, gratis cam, gratis sexcam, webcam sex gratis, gratis live cam, sex cam gratis",
    intro: "Op zoek naar gratis webcam sex? Bij StartVagina kijk je gratis naar duizenden live cam shows. Geen creditcard nodig, geen verborgen kosten. Kies een model en begin met kijken — het is zo simpel.",
    faq: [
      { q: "Is het echt gratis?", a: "Ja! Alle openbare cam shows zijn 100% gratis te bekijken. Je betaalt alleen als je tokens koopt voor tips of privé shows, maar dat is geheel optioneel." },
      { q: "Heb ik een account nodig?", a: "Nee, voor het kijken van gratis webcam sex heb je geen account nodig. Wil je chatten met de modellen, dan kun je een gratis account aanmaken." },
    ],
  },
  sexchat: {
    title: "Sexchat — Live Sex Chat met Cam Girls | StartVagina",
    h1: "Sexchat — Live Chatten met Cam Modellen",
    description: "Start een sexchat met duizenden live cam girls. Gratis sex chatten op Chaturbate, Stripchat en BongaCams. De beste sexchat ervaring van Nederland.",
    keywords: "sexchat, sex chat, gratis sexchat, live sexchat, sexchat nederland, sexchat belgie, erotische chat",
    intro: "Zin in een spannende sexchat? Op StartVagina vind je duizenden cam modellen die live online zijn en klaar staan voor een erotische chat. Van gezellig kletsen tot expliciete privé shows — er is voor ieder wat wils.",
    faq: [
      { q: "Hoe werkt sexchat?", a: "Je kiest een model dat online is, opent de stream en typt je bericht in de chat. De meeste modellen reageren op berichten in de openbare chat. Voor een privé sexchat kun je een privé show aanvragen." },
      { q: "Is sexchat veilig?", a: "Ja, sexchatten via de grote cam platforms is veilig. Je bent anoniem en de platforms hebben strikte privacy-regels. Deel nooit persoonlijke gegevens in de chat." },
    ],
  },
  "cam-girls": {
    title: "Cam Girls — De Mooiste Live Cam Meisjes | StartVagina",
    h1: "Cam Girls — Live Cam Meisjes Online",
    description: "Bekijk de mooiste cam girls live op StartVagina. Duizenden cam meisjes van Chaturbate, Stripchat, BongaCams en CAM4 op één plek.",
    keywords: "cam girls, cam meisjes, cam girls nederland, live cam girls, gratis cam girls, webcam meisjes, cam girl",
    intro: "Op StartVagina vind je de mooiste cam girls van de populairste platforms. Of je nu houdt van Nederlandse cam meisjes, Latijns-Amerikaanse schoonheden of Oost-Europese modellen — hier vind je ze allemaal live.",
    faq: [
      { q: "Hoeveel cam girls zijn er online?", a: "Op elk moment zijn er duizenden cam girls online. StartVagina toont modellen van Chaturbate, Stripchat, BongaCams, CAM4 en XCams — samen goed voor 10.000+ live cam girls." },
      { q: "Kan ik cam girls filteren?", a: "Ja! Gebruik onze filters om cam girls te zoeken op platform, categorie, land of tags. Zo vind je snel precies wat je zoekt." },
    ],
  },
  "live-sex-cams": {
    title: "Live Sex Cams — Gratis Live Webcam Shows | StartVagina",
    h1: "Live Sex Cams — Nu Live Kijken",
    description: "Live sex cams kijken met duizenden modellen. Gratis live webcam shows op Chaturbate, Stripchat, BongaCams en meer. 24/7 online.",
    keywords: "live sex cams, live cam sex, live webcam sex, live sex chat, live cam, live sex shows",
    intro: "Ontdek duizenden live sex cams op StartVagina. Onze platform toont real-time welke modellen nu online zijn op de grootste cam sites. 24 uur per dag, 7 dagen per week — er is altijd iemand live.",
    faq: [
      { q: "Zijn de cams echt live?", a: "Ja! Alle streams op StartVagina zijn 100% live. We tonen real-time data van de cam platforms. Wat je ziet, gebeurt op dit moment." },
      { q: "Op welke tijden zijn de meeste cams online?", a: "De meeste modellen zijn online tussen 20:00 en 02:00 CET (Nederlandse tijd). Maar omdat onze modellen uit de hele wereld komen, zijn er 24/7 duizenden cams beschikbaar." },
    ],
  },
};

const KeywordLanding = () => {
  const location = useLocation();
  const { basePath, t } = useLanguage();
  const keyword = basePath.replace(/^\//, "");
  const config = keywordPages[keyword || ""];
  const { allCams, isLoading } = useAllCams();

  const shuffled = useMemo(() => {
    if (!allCams.length) return [];
    return [...allCams].sort(() => Math.random() - 0.5);
  }, [allCams]);

  if (!config) return null;

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{config.title}</title>
          <meta name="description" content={config.description} />
          <meta name="keywords" content={config.keywords} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://startvagina.nl/${keyword}`} />
          <meta property="og:title" content={config.title} />
          <meta property="og:description" content={config.description} />
          <meta property="og:url" content={`https://startvagina.nl/${keyword}`} />
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
            <h1 className="text-3xl font-bold font-display text-foreground mb-3">{config.h1}</h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">{config.intro}</p>
          </section>

          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>{t.modelsLoading}</span>
            </div>
          ) : <CamGrid models={shuffled} />}

          {/* FAQ Section for SEO */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Veelgestelde vragen</h2>
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

          {/* Internal links for SEO */}
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Meer op StartVagina</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(keywordPages)
                .filter(([k]) => k !== keyword)
                .map(([k, v]) => (
                  <LocalLink key={k} to={`/${k}`} className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                    {v.h1.split("—")[0].trim()}
                  </LocalLink>
                ))}
              <LocalLink to="/blog" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                Blog
              </LocalLink>
              <LocalLink to="/categories" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                Categorieën
              </LocalLink>
              <LocalLink to="/top" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                Top Cams
              </LocalLink>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default KeywordLanding;
