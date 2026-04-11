import { useState, useMemo, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";

interface CountrySeo {
  title: string;
  description: string;
  intro: string;
}

const countrySeoData: Record<string, CountrySeo> = {
  Nederland: {
    title: "Live Sex Cams Nederland — Nederlandse Cam Girls | StartVagina",
    description: "Nederlandse cam girls live op webcam. Gratis webcamsex met modellen uit Nederland op Chaturbate, CAM4, Stripchat en meer. De beste Nederlandse webcam modellen.",
    intro: "Nederland heeft een enorm actieve cam-community. Vooral op CAM4 vind je een groot aantal Nederlandse cam girls en koppels die live gaan vanuit hun eigen huis. Of het nu gaat om amateurs uit Amsterdam, studenten uit Utrecht of koppels uit Rotterdam — Nederlandse webcamsex is direct, ongegeneerd en authentiek. Via StartVagina zie je alle live Nederlandse modellen van alle platforms op één plek.",
  },
  België: {
    title: "Live Sex Cams België — Belgische Cam Girls | StartVagina",
    description: "Belgische cam girls live op webcam. Gratis webcamsex met Vlaamse en Waalse modellen op Chaturbate, CAM4, BongaCams en meer.",
    intro: "België levert verrassend veel cam modellen — zowel Vlaamse als Waalse. Vooral op CAM4 en BongaCams zijn Belgische cam girls goed vertegenwoordigd. Vlaamse modellen chatten vaak in het Nederlands, wat voor Nederlandse kijkers een groot pluspunt is. Ontdek hier alle live Belgische cam modellen.",
  },
  Duitsland: {
    title: "Live Sex Cams Duitsland — Duitse Cam Girls | StartVagina",
    description: "Duitse cam girls live op webcam. Gratis webcamsex met modellen uit Duitsland. Duitse webcam modellen op Chaturbate, Stripchat en meer.",
    intro: "Duitsland is een van de grootste markten voor webcamsex in Europa. Duitse cam girls staan bekend om hun directheid en professionele aanpak. Op Stripchat en BongaCams vind je een groot aanbod Duitse modellen die in het Duits én Engels chatten. Bekijk hier alle live Duitse cam girls.",
  },
  Colombia: {
    title: "Live Sex Cams Colombia — Colombiaanse Cam Girls | StartVagina",
    description: "Colombiaanse cam girls live op webcam. Colombia is de cam-hoofdstad van de wereld. Gratis webcamsex met de mooiste Colombiaanse modellen.",
    intro: "Colombia is dé cam-hoofdstad van de wereld. Geen ander land levert zoveel webcam modellen als Colombia. Colombiaanse cam girls staan bekend om hun passie, energie en prachtige looks. Op Chaturbate en Stripchat vormen ze de grootste groep niet-Engelstalige modellen. De shows zijn interactief, energiek en onvergetelijk.",
  },
  Roemenië: {
    title: "Live Sex Cams Roemenië — Roemeense Cam Girls | StartVagina",
    description: "Roemeense cam girls live op webcam. Roemenië is een van de grootste cam-landen van Europa. Gratis webcamsex met Roemeense modellen.",
    intro: "Roemenië is naast Colombia een van de absolute grootmachten in de webcamsex-wereld. Veel Roemeense modellen werken vanuit professionele studio's met uitstekende camera's en belichting. Het resultaat: HD-shows van hoog niveau. Op Stripchat, BongaCams en Chaturbate zijn Roemeense cam girls altijd goed vertegenwoordigd.",
  },
  Italië: {
    title: "Live Sex Cams Italië — Italiaanse Cam Girls | StartVagina",
    description: "Italiaanse cam girls live op webcam. Gratis webcamsex met modellen uit Italië. Temperamentvolle Italiaanse webcam shows op alle platforms.",
    intro: "Italiaanse cam girls combineren Mediterrane schoonheid met temperament en passie. Italië heeft een groeiende cam-community, vooral op BongaCams en XCams (dat Europese roots heeft). Italiaanse modellen chatten vaak in het Italiaans en Engels en staan bekend om hun expressieve, sensuele showstijl.",
  },
  Spanje: {
    title: "Live Sex Cams Spanje — Spaanse Cam Girls | StartVagina",
    description: "Spaanse cam girls live op webcam. Gratis webcamsex met modellen uit Spanje. Heet Spaans temperament live op je scherm.",
    intro: "Spanje levert prachtige cam modellen met dat typische Spaanse temperament — vurig, zelfverzekerd en expressief. Op Chaturbate en Stripchat vind je een groeiend aantal Spaanse cam girls. XCams, met zijn Europese focus, heeft ook een sterke Spaanse selectie. Bekijk hier alle live Spaanse modellen.",
  },
  Frankrijk: {
    title: "Live Sex Cams Frankrijk — Franse Cam Girls | StartVagina",
    description: "Franse cam girls live op webcam. Gratis webcamsex met modellen uit Frankrijk. Elegante Franse webcam shows op XCams, Chaturbate en meer.",
    intro: "Franse cam girls brengen een vleugje elegantie en verfijning naar webcamsex. Frankrijk is de thuisbasis van XCams, een premium Europees platform dat veel Franse modellen aantrekt. Ook op Chaturbate en Stripchat vind je Franse cam girls die bekend staan om hun stijlvolle, sensuele shows.",
  },
  "Verenigd Koninkrijk": {
    title: "Live Sex Cams UK — Britse Cam Girls | StartVagina",
    description: "Britse cam girls live op webcam. Gratis webcamsex met modellen uit het Verenigd Koninkrijk op Chaturbate, Stripchat en meer.",
    intro: "Het Verenigd Koninkrijk heeft een actieve cam-scene met modellen die in het Engels chatten — ideaal voor een breed publiek. Britse cam girls variëren van girl-next-door types tot professionele modellen. Op Chaturbate en BongaCams zijn ze goed vertegenwoordigd.",
  },
  "Verenigde Staten": {
    title: "Live Sex Cams VS — Amerikaanse Cam Girls | StartVagina",
    description: "Amerikaanse cam girls live op webcam. Gratis webcamsex met modellen uit de VS op Chaturbate, Stripchat en meer. De grootste cam-markt ter wereld.",
    intro: "De Verenigde Staten zijn de grootste markt voor webcamsex. Amerikaanse cam girls zijn vaak professioneel, met goede camera-setups en interactieve shows. Op Chaturbate vormen ze de kern van het platform. Verwacht een enorme variatie in looks, stijlen en categorieën.",
  },
  Rusland: {
    title: "Live Sex Cams Rusland — Russische Cam Girls | StartVagina",
    description: "Russische cam girls live op webcam. Gratis webcamsex met modellen uit Rusland op BongaCams, Stripchat en Chaturbate.",
    intro: "Russische cam girls zijn legendarisch in de webcamsex-wereld. Bekend om hun schoonheid, professionele presentatie en HD-streams. BongaCams is het platform bij uitstek voor Russische modellen, maar ook op Stripchat en Chaturbate zijn ze talrijk aanwezig.",
  },
  Oekraïne: {
    title: "Live Sex Cams Oekraïne — Oekraïense Cam Girls | StartVagina",
    description: "Oekraïense cam girls live op webcam. Gratis webcamsex met modellen uit Oekraïne op BongaCams, Stripchat en Chaturbate.",
    intro: "Oekraïne levert, net als Rusland en Roemenië, een groot aantal professionele cam modellen. Oekraïense cam girls staan bekend om hun slanke looks, hoge productiewaarde en meertalige vaardigheden. Op BongaCams en Stripchat zijn ze bijzonder goed vertegenwoordigd.",
  },
  Brazilië: {
    title: "Live Sex Cams Brazilië — Braziliaanse Cam Girls | StartVagina",
    description: "Braziliaanse cam girls live op webcam. Gratis webcamsex met modellen uit Brazilië. Samba, curves en passie live op je scherm.",
    intro: "Braziliaanse cam girls brengen de energie van carnaval naar het scherm. Bekend om hun curves, dansmoves en uitbundige persoonlijkheid. Brazilië is na Colombia het grootste Latijns-Amerikaanse cam-land. Op Chaturbate en Stripchat vind je dagelijks honderden Braziliaanse modellen live.",
  },
  Japan: {
    title: "Live Sex Cams Japan — Japanse Cam Girls | StartVagina",
    description: "Japanse cam girls live op webcam. Gratis webcamsex met modellen uit Japan. Cosplay, kawaii en Japanse webcam shows.",
    intro: "Japanse cam girls bieden een unieke ervaring — van cosplay en kawaii esthetiek tot meer traditionele shows. Japan heeft een eigen cam-cultuur die verschilt van westerse platforms. Op Stripchat en Chaturbate vind je Japanse modellen die vaak creatief en speels te werk gaan.",
  },
  Polen: {
    title: "Live Sex Cams Polen — Poolse Cam Girls | StartVagina",
    description: "Poolse cam girls live op webcam. Gratis webcamsex met modellen uit Polen op Chaturbate, BongaCams en Stripchat.",
    intro: "Polen is een groeiend cam-land in Oost-Europa. Poolse cam girls combineren Slavische schoonheid met een toegankelijke, vriendelijke stijl. Op BongaCams en Stripchat zijn Poolse modellen goed vertegenwoordigd, vaak met HD-streams en professionele setups.",
  },
  Mexico: {
    title: "Live Sex Cams Mexico — Mexicaanse Cam Girls | StartVagina",
    description: "Mexicaanse cam girls live op webcam. Gratis webcamsex met modellen uit Mexico op Chaturbate, Stripchat en meer.",
    intro: "Mexico levert een groeiend aantal cam modellen dat de Latijnse webcamsex-scene versterkt. Mexicaanse cam girls staan bekend om hun warmte, humor en interactieve shows. Op Chaturbate zijn ze bijzonder actief, met shows die variëren van gezellig chatten tot hete actie.",
  },
  Tsjechië: {
    title: "Live Sex Cams Tsjechië — Tsjechische Cam Girls | StartVagina",
    description: "Tsjechische cam girls live op webcam. Gratis webcamsex met modellen uit Tsjechië op Stripchat, BongaCams en Chaturbate.",
    intro: "Tsjechië heeft een lange traditie in de erotische industrie en dat vertaalt zich naar een sterke cam-presence. Tsjechische cam girls zijn professioneel, aantrekkelijk en vaak meertalig. Op Stripchat en BongaCams vind je een goede selectie Tsjechische modellen.",
  },
  Filipijnen: {
    title: "Live Sex Cams Filipijnen — Filipijnse Cam Girls | StartVagina",
    description: "Filipijnse cam girls live op webcam. Gratis webcamsex met modellen uit de Filipijnen. Vriendelijk, speels en altijd online.",
    intro: "De Filipijnen leveren een enorm aantal cam modellen — vriendelijk, Engels-sprekend en bijna altijd online. Filipijnse cam girls zijn geliefd om hun warme persoonlijkheid en toegankelijke stijl. Op Chaturbate en Stripchat zijn ze een van de grootste Aziatische groepen.",
  },
  Thailand: {
    title: "Live Sex Cams Thailand — Thaise Cam Girls | StartVagina",
    description: "Thaise cam girls live op webcam. Gratis webcamsex met modellen uit Thailand op Chaturbate, Stripchat en meer.",
    intro: "Thaise cam girls bieden een exotische webcamsex-ervaring. Thailand heeft een levendige cam-scene met modellen die variëren van petite Thai beauties tot meer ervaren performers. Op Chaturbate en Stripchat zijn Thaise modellen goed te vinden.",
  },
};

/** Generate dynamic SEO for countries without predefined content */
function getCountrySeo(country: string, count: number): CountrySeo {
  const predefined = countrySeoData[country];
  if (predefined) return predefined;

  return {
    title: `Live Sex Cams ${country} — Cam Girls uit ${country} | StartVagina`,
    description: `Cam girls uit ${country} live op webcam. Bekijk ${count} live modellen uit ${country} op Chaturbate, Stripchat, BongaCams en meer. Gratis webcamsex.`,
    intro: `Ontdek live cam modellen uit ${country} op StartVagina. We tonen alle online cam girls uit ${country} van de grootste cam platforms — Chaturbate, Stripchat, BongaCams, CAM4 en XCams. Klik op een model en kijk direct mee, gratis en zonder registratie.`,
  };
}

const Countries = () => {
  const { allCams, isLoading } = useAllCams();
  const [selected, setSelected] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll to results when a country is selected
  useEffect(() => {
    if (selected && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  // Build country list with counts, sorted by count desc
  const countryCounts = useMemo(() => {
    const map = new Map<string, { flag: string; count: number }>();
    for (const m of allCams) {
      if (!m.country || m.country === "Onbekend") continue;
      const existing = map.get(m.country);
      if (existing) {
        existing.count++;
      } else {
        map.set(m.country, { flag: m.countryFlag, count: 1 });
      }
    }
    return Array.from(map.entries())
      .map(([country, { flag, count }]) => ({ country, flag, count }))
      .sort((a, b) => b.count - a.count);
  }, [allCams]);

  const filteredCams = useMemo(() => {
    if (!selected) return null;
    return allCams
      .filter(m => m.country === selected)
      .sort(() => Math.random() - 0.5);
  }, [allCams, selected]);

  const selectedCount = filteredCams?.length || 0;
  const seo = selected ? getCountrySeo(selected, selectedCount) : null;

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{seo ? seo.title : "Webcamsex per Land — Cam Girls uit Alle Landen | StartVagina"}</title>
          <meta name="description" content={seo ? seo.description : "Bekijk live webcam modellen per land. Nederlandse, Belgische, Duitse, Colombiaanse en internationale cam girls op StartVagina. Gratis webcamsex uit elk land."} />
          <meta name="keywords" content={seo && selected ? `webcamsex ${selected}, cam girls ${selected}, ${selected} webcam, live cam ${selected}, ${selected} cam girls` : "webcamsex per land, cam girls per land, internationale webcamsex, webcam modellen landen"} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://startvagina.nl/countries" />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
            {selected ? `Live Sex Cams ${selected}` : "Webcamsex per Land"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            {seo ? seo.intro : "Ontdek live cam modellen uit jouw favoriete land. Van Nederlandse cam girls tot Colombiaanse schoonheden en Oost-Europese modellen — selecteer een land en bekijk wie er nu live is."}
          </p>

          {/* Country chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {countryCounts.map(({ country, flag, count }) => (
              <button
                key={country}
                onClick={() => setSelected(selected === country ? null : country)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
                  selected === country
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:bg-accent hover:border-accent"
                }`}
              >
                <span>{flag}</span>
                <span>{country}</span>
                <span className={`text-xs ml-1 ${
                  selected === country ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  ({count})
                </span>
              </button>
            ))}
          </div>

          {/* Results */}
          <div ref={resultsRef} />
          {selected && filteredCams ? (
            <CamGrid
              title={`${countryCounts.find(c => c.country === selected)?.flag} ${selected}`}
              models={filteredCams}
              totalOnline={filteredCams.length}
              isLoading={isLoading}
            />
          ) : (
            !selected && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">🌍 Kies een land om cam modellen te bekijken</p>
              </div>
            )
          )}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Countries;
