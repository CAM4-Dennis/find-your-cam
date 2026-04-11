import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface CountryConfig {
  slug: string;
  country: string;
  flag: string;
  title: string;
  h1: string;
  description: string;
  keywords: string;
  content: string;
  faq: { q: string; a: string }[];
}

function renderContent(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "<br/>• ")
    .replace(/\n/g, "<br/>");
}

const countryPages: Record<string, CountryConfig> = {
  "webcamsex-nederland": {
    slug: "webcamsex-nederland",
    country: "Nederland",
    flag: "🇳🇱",
    title: "Webcamsex Nederland — Nederlandse Cam Girls Live | StartVagina",
    h1: "Webcamsex Nederland — Nederlandse Cam Girls Live",
    description: "Nederlandse cam girls live op webcam. Gratis webcamsex met modellen uit Nederland op Chaturbate, CAM4, Stripchat en meer. De beste Nederlandse webcam modellen.",
    keywords: "webcamsex nederland, nederlandse cam girls, nederlandse webcamsex, cam girls nederland, live cam nederland, webcam nederland, dutch cam girls",
    content: `Nederland heeft een enorm actieve cam-community en is een van de sterkste cam-landen van Europa. Vooral op **CAM4** vind je een groot aantal Nederlandse cam girls en koppels die live gaan vanuit hun eigen huis. Of het nu gaat om amateurs uit Amsterdam, studenten uit Utrecht of koppels uit Rotterdam — Nederlandse webcamsex is direct, ongegeneerd en authentiek.

**Waarom Nederlandse cams zo populair zijn:**
- **CAM4 is de Nederlandse favoriet**: nergens vind je zoveel Nederlandse cam modellen als op CAM4 — het platform is enorm populair in de Benelux
- **Echte amateurs**: Nederlandse cam girls zijn vaak echte amateurs, geen professionele modellen — en dat maakt het juist zo aantrekkelijk
- **Koppels uit Nederland**: Nederland is een van de weinige landen waar veel echte koppels samen live gaan
- **Directe communicatie**: Nederlanders zijn bekend om hun directheid — en dat vertaalt zich naar open, eerlijke cam shows
- **Nederlandstalige chat**: eindelijk webcamsex in je eigen taal, zonder taalbarrière

Via StartVagina zie je alle live Nederlandse modellen van Chaturbate, CAM4, Stripchat, BongaCams en XCams op één plek. Filter op Nederland en ontdek wie er nu online is.`,
    faq: [
      { q: "Op welk platform vind ik de meeste Nederlandse cam girls?", a: "CAM4 is veruit het populairste platform voor Nederlandse cam modellen. Daarnaast vind je ook Nederlandse cam girls op Chaturbate en Stripchat. Via StartVagina zie je ze allemaal." },
      { q: "Kan ik in het Nederlands chatten?", a: "Ja! Nederlandse cam modellen chatten uiteraard in het Nederlands. Op CAM4 is Nederlands een van de meest gesproken talen in de chatrooms." },
      { q: "Zijn er ook Nederlandse cam koppels?", a: "Absoluut! Nederland heeft een van de grootste aantallen cam koppels. Vooral op CAM4 gaan veel Nederlandse stellen samen live." },
    ],
  },
  "webcamsex-belgie": {
    slug: "webcamsex-belgie",
    country: "België",
    flag: "🇧🇪",
    title: "Webcamsex België — Belgische Cam Girls Live | StartVagina",
    h1: "Webcamsex België — Belgische Cam Girls Live",
    description: "Belgische cam girls live op webcam. Gratis webcamsex met Vlaamse en Waalse modellen op Chaturbate, CAM4, BongaCams en meer.",
    keywords: "webcamsex belgie, belgische cam girls, vlaamse webcamsex, cam girls belgie, webcam belgie, belgian cam girls",
    content: `België levert verrassend veel cam modellen — zowel **Vlaamse als Waalse**. Vooral op CAM4 en BongaCams zijn Belgische cam girls goed vertegenwoordigd. Vlaamse modellen chatten vaak in het Nederlands, wat voor Nederlandse kijkers een groot pluspunt is.

**België op cam:**
- **Vlaams-Nederlandse connection**: Vlaamse cam girls spreken Nederlands en zijn daardoor extra populair bij Nederlandse kijkers
- **CAM4 en BongaCams**: de twee platforms waar je de meeste Belgische modellen vindt
- **Waalse modellen**: Franstalige Belgische cam girls bedienen de Franse en internationale markt
- **Koppels**: net als Nederland heeft België relatief veel koppels die samen live gaan
- **Kwaliteit boven kwantiteit**: het aanbod is kleiner dan Nederland, maar de kwaliteit is hoog

Ontdek hier alle live Belgische cam modellen van alle platforms op StartVagina.`,
    faq: [
      { q: "Spreken Belgische cam girls Nederlands?", a: "Vlaamse modellen spreken Nederlands, Waalse modellen Frans. Op StartVagina kun je alle Belgische modellen zien ongeacht taal." },
      { q: "Waar vind ik Belgische cam modellen?", a: "CAM4 en BongaCams hebben de meeste Belgische cam girls. Via StartVagina zie je het aanbod van alle platforms." },
    ],
  },
  "webcamsex-duitsland": {
    slug: "webcamsex-duitsland",
    country: "Duitsland",
    flag: "🇩🇪",
    title: "Webcamsex Duitsland — Duitse Cam Girls Live | StartVagina",
    h1: "Webcamsex Duitsland — Duitse Cam Girls Live",
    description: "Duitse cam girls live op webcam. Gratis webcamsex met modellen uit Duitsland. Duitse webcam modellen op Chaturbate, Stripchat en meer.",
    keywords: "webcamsex duitsland, deutsche cam girls, german cam girls, cam girls duitsland, webcam duitsland, deutsche webcam",
    content: `Duitsland is een van de **grootste markten voor webcamsex in Europa**. Duitse cam girls staan bekend om hun directheid en professionele aanpak. Op Stripchat en BongaCams vind je een groot aanbod Duitse modellen.

**Duitsland in de cam-wereld:**
- **Grote markt**: Duitsland is na het VK de grootste Europese markt voor webcamsex
- **Professioneel**: veel Duitse cam girls werken met professionele setups — goede camera's, belichting en geluid
- **Meertalig**: de meeste Duitse modellen spreken ook Engels, sommige zelfs Nederlands
- **Stripchat en BongaCams**: de twee platforms met het grootste Duitse aanbod
- **Variatie**: van Berlijnse alternatievelingen tot Beierse schoonheden — Duitsland biedt enorme diversiteit

Bekijk hier alle live Duitse cam girls van alle platforms op StartVagina.`,
    faq: [
      { q: "Spreken Duitse cam girls Engels?", a: "De meeste Duitse cam modellen spreken goed Engels naast Duits. Op Stripchat kun je filteren op taal." },
      { q: "Op welk platform vind ik Duitse cam girls?", a: "Stripchat en BongaCams hebben het grootste aanbod Duitse modellen. Chaturbate heeft ook een goede selectie." },
    ],
  },
  "webcamsex-colombia": {
    slug: "webcamsex-colombia",
    country: "Colombia",
    flag: "🇨🇴",
    title: "Webcamsex Colombia — Colombiaanse Cam Girls Live | StartVagina",
    h1: "Webcamsex Colombia — Colombiaanse Cam Girls Live",
    description: "Colombiaanse cam girls live op webcam. Colombia is de cam-hoofdstad van de wereld. Gratis webcamsex met de mooiste Colombiaanse modellen.",
    keywords: "webcamsex colombia, colombiaanse cam girls, colombian cam girls, cam girls colombia, webcam colombia, latina cam colombia",
    content: `Colombia is dé **cam-hoofdstad van de wereld**. Geen ander land levert zoveel webcam modellen als Colombia. Colombiaanse cam girls staan bekend om hun passie, energie en prachtige looks.

**Waarom Colombia de cam-wereld domineert:**
- **Grootste cam-land ter wereld**: Colombia heeft meer actieve cam modellen dan enig ander land — duizenden streamen dagelijks
- **Chaturbate en Stripchat**: op beide platforms vormen Colombiaanse modellen de grootste niet-Engelstalige groep
- **Passie en energie**: Colombiaanse cam girls brengen een ongekende energie naar hun shows — dansen, interactie en spontaniteit
- **Betaalbaar tippen**: door het verschil in koopkracht zijn Colombiaanse modellen extra dankbaar voor tips
- **Steden als Medellín en Cali**: deze steden zijn uitgegroeid tot cam-hubs waar honderden modellen werken
- **Curves en zelfvertrouwen**: Colombiaanse vrouwen omarmen hun lichaam en stralen dat uit

Op StartVagina zie je alle live Colombiaanse cam girls van alle platforms. De shows zijn interactief, energiek en onvergetelijk.`,
    faq: [
      { q: "Waarom zijn er zoveel Colombiaanse cam girls?", a: "Colombia combineert schoonheid met economische motivatie. Webcamsex is er een geaccepteerd beroep dat goed betaalt. Steden als Medellín en Cali hebben grote cam-communities." },
      { q: "Spreken Colombiaanse cam girls Engels?", a: "Steeds meer Colombiaanse modellen spreken Engels. Veel gebruiken ook vertaaltools in de chat. De meeste chatten in het Spaans." },
    ],
  },
  "webcamsex-roemenie": {
    slug: "webcamsex-roemenie",
    country: "Roemenië",
    flag: "🇷🇴",
    title: "Webcamsex Roemenië — Roemeense Cam Girls Live | StartVagina",
    h1: "Webcamsex Roemenië — Roemeense Cam Girls Live",
    description: "Roemeense cam girls live op webcam. Roemenië is een van de grootste cam-landen van Europa. Gratis webcamsex met Roemeense modellen.",
    keywords: "webcamsex roemenie, roemeense cam girls, romanian cam girls, cam girls roemenie, webcam roemenie",
    content: `Roemenië is naast Colombia een van de **absolute grootmachten in de webcamsex-wereld**. Veel Roemeense modellen werken vanuit professionele studio's met uitstekende camera's en belichting. Het resultaat: HD-shows van hoog niveau.

**Roemenië als cam-grootmacht:**
- **Studio-cultuur**: Roemenië heeft honderden professionele cam-studio's waar modellen onder begeleiding werken
- **HD als standaard**: door de studio-setups zijn Roemeense streams vaak van uitstekende kwaliteit
- **Stripchat en BongaCams**: de twee platforms waar Roemeense modellen het sterkst vertegenwoordigd zijn
- **Professioneel en ambitieus**: Roemeense cam girls nemen hun werk serieus en investeren in hun shows
- **Europese schoonheid**: Roemeense vrouwen combineren Oost-Europese looks met een warme, toegankelijke stijl

Op StartVagina ontdek je alle live Roemeense cam girls van alle platforms op één plek.`,
    faq: [
      { q: "Waarom zijn er zoveel Roemeense cam girls?", a: "Roemenië heeft een ontwikkelde cam-studio-industrie. Veel vrouwen werken vanuit professionele studio's die camera's, internet en begeleiding bieden." },
      { q: "Spreken Roemeense modellen Engels?", a: "Ja, de meeste Roemeense cam girls spreken goed Engels. Velen spreken ook Frans, Spaans of Italiaans." },
    ],
  },
  "webcamsex-italie": {
    slug: "webcamsex-italie",
    country: "Italië",
    flag: "🇮🇹",
    title: "Webcamsex Italië — Italiaanse Cam Girls Live | StartVagina",
    h1: "Webcamsex Italië — Italiaanse Cam Girls Live",
    description: "Italiaanse cam girls live op webcam. Gratis webcamsex met modellen uit Italië. Temperamentvolle Italiaanse webcam shows op alle platforms.",
    keywords: "webcamsex italie, italiaanse cam girls, italian cam girls, cam girls italie, webcam italie, italiana cam",
    content: `Italiaanse cam girls combineren **Mediterrane schoonheid** met temperament en passie. Italië heeft een groeiende cam-community, vooral op BongaCams en XCams.

**Italië op cam:**
- **Mediterraans temperament**: Italiaanse cam girls zijn expressief, sensueel en weten een publiek te boeien
- **XCams-connectie**: XCams heeft Europese roots en trekt veel Italiaanse modellen aan
- **BongaCams**: ook op BongaCams vind je een goede selectie Italiaanse cam girls
- **Meertalig**: Italiaanse modellen spreken vaak ook Engels en Frans
- **Stijlvol**: Italiaanse vrouwen brengen een natuurlijke elegantie naar hun shows

Ontdek alle live Italiaanse cam modellen op StartVagina — van Rome tot Milaan, van Napels tot Turijn.`,
    faq: [
      { q: "Op welk platform vind ik Italiaanse cam girls?", a: "XCams en BongaCams hebben de meeste Italiaanse modellen. Chaturbate en Stripchat hebben ook een selectie." },
      { q: "Spreken Italiaanse cam girls Engels?", a: "Veel Italiaanse modellen spreken basis-Engels. Op XCams chatten ze vaak in het Italiaans en Frans." },
    ],
  },
  "webcamsex-spanje": {
    slug: "webcamsex-spanje",
    country: "Spanje",
    flag: "🇪🇸",
    title: "Webcamsex Spanje — Spaanse Cam Girls Live | StartVagina",
    h1: "Webcamsex Spanje — Spaanse Cam Girls Live",
    description: "Spaanse cam girls live op webcam. Gratis webcamsex met modellen uit Spanje. Heet Spaans temperament live op je scherm.",
    keywords: "webcamsex spanje, spaanse cam girls, spanish cam girls, cam girls spanje, webcam spanje, espanola cam",
    content: `Spaanse cam girls brengen dat typische **Spaanse temperament** naar je scherm — vurig, zelfverzekerd en expressief.

**Spanje op cam:**
- **Temperament en passie**: Spaanse modellen zijn expressief, spontaan en laten hun emoties zien
- **Groeiende community**: het aantal Spaanse cam girls groeit gestaag op alle platforms
- **Chaturbate en Stripchat**: de twee platforms met het meeste Spaanse aanbod
- **XCams**: met zijn Europese focus heeft XCams ook een sterke Spaanse selectie
- **Zomervibes**: Spaanse cam girls brengen vaak een zonnige, ontspannen sfeer naar hun shows

Bekijk hier alle live Spaanse cam modellen van alle platforms op StartVagina.`,
    faq: [
      { q: "Spreken Spaanse cam girls Engels?", a: "Sommige Spaanse modellen spreken Engels, maar velen chatten voornamelijk in het Spaans. Chaturbate heeft een vertaalfunctie in de chat." },
      { q: "Wanneer zijn Spaanse cam girls online?", a: "Spaanse modellen zijn vooral online in de avonduren (Europese tijd), van 20:00 tot 02:00 CET." },
    ],
  },
  "webcamsex-frankrijk": {
    slug: "webcamsex-frankrijk",
    country: "Frankrijk",
    flag: "🇫🇷",
    title: "Webcamsex Frankrijk — Franse Cam Girls Live | StartVagina",
    h1: "Webcamsex Frankrijk — Franse Cam Girls Live",
    description: "Franse cam girls live op webcam. Gratis webcamsex met modellen uit Frankrijk. Elegante Franse webcam shows op XCams, Chaturbate en meer.",
    keywords: "webcamsex frankrijk, franse cam girls, french cam girls, cam girls frankrijk, webcam frankrijk, francaise cam",
    content: `Franse cam girls brengen een vleugje **elegantie en verfijning** naar webcamsex. Frankrijk is de thuisbasis van XCams, een premium Europees platform.

**Frankrijk in de cam-wereld:**
- **XCams thuisbasis**: XCams is een Frans platform dat veel Franse modellen aantrekt — premium kwaliteit
- **Elegante stijl**: Franse cam girls staan bekend om een stijlvolle, sensuele aanpak
- **Chaturbate en Stripchat**: ook op de grote internationale platforms vind je Franse modellen
- **Franstalige community**: voor Belgische en Canadese Franstalige kijkers ideaal
- **Lingerie en tease**: Franse modellen leggen vaak meer nadruk op sfeer, lingerie en opbouw

Ontdek alle live Franse cam modellen op StartVagina.`,
    faq: [
      { q: "Op welk platform vind ik de meeste Franse cam girls?", a: "XCams is het beste platform voor Franse cam modellen. Chaturbate en Stripchat hebben ook een goede selectie." },
      { q: "Is XCams een Frans platform?", a: "Ja, XCams heeft zijn oorsprong in Frankrijk en trekt daarom veel Franse en Zuid-Europese modellen aan." },
    ],
  },
  "webcamsex-verenigd-koninkrijk": {
    slug: "webcamsex-verenigd-koninkrijk",
    country: "Verenigd Koninkrijk",
    flag: "🇬🇧",
    title: "Webcamsex UK — Britse Cam Girls Live | StartVagina",
    h1: "Webcamsex UK — Britse Cam Girls Live",
    description: "Britse cam girls live op webcam. Gratis webcamsex met modellen uit het Verenigd Koninkrijk op Chaturbate, Stripchat en meer.",
    keywords: "webcamsex uk, britse cam girls, british cam girls, cam girls uk, webcam uk, english cam girls",
    content: `Het Verenigd Koninkrijk heeft een actieve cam-scene met modellen die in het **Engels** chatten — ideaal voor een breed publiek.

**UK cam-scene:**
- **Engelstalig**: Britse cam girls communiceren moeiteloos met een internationaal publiek
- **Girl-next-door vibes**: veel Britse modellen hebben een toegankelijke, natuurlijke uitstraling
- **Chaturbate en BongaCams**: de populairste platforms voor Britse cam girls
- **Professioneel**: veel Britse modellen investeren in hun setup en bieden HD-streams
- **Humor**: Britse cam girls staan bekend om hun humor en gezellige chatsfeer

Bekijk alle live Britse cam modellen op StartVagina.`,
    faq: [
      { q: "Op welk platform vind ik Britse cam girls?", a: "Chaturbate heeft het grootste aanbod Britse modellen. BongaCams en Stripchat hebben ook een goede selectie." },
    ],
  },
  "webcamsex-verenigde-staten": {
    slug: "webcamsex-verenigde-staten",
    country: "Verenigde Staten",
    flag: "🇺🇸",
    title: "Webcamsex VS — Amerikaanse Cam Girls Live | StartVagina",
    h1: "Webcamsex VS — Amerikaanse Cam Girls Live",
    description: "Amerikaanse cam girls live op webcam. Gratis webcamsex met modellen uit de VS op Chaturbate, Stripchat en meer. De grootste cam-markt ter wereld.",
    keywords: "webcamsex vs, amerikaanse cam girls, american cam girls, cam girls usa, webcam usa, us cam girls",
    content: `De Verenigde Staten zijn de **grootste markt voor webcamsex** ter wereld. Amerikaanse cam girls zijn vaak professioneel, met goede camera-setups en interactieve shows.

**De VS als cam-grootmacht:**
- **Chaturbate-kern**: Amerikaanse modellen vormen de kern van Chaturbate — het platform is Amerikaans en de grootste groep modellen komt uit de VS
- **Enorme variatie**: van college girls uit Californië tot MILF's uit Texas — de diversiteit is ongeëvenaard
- **Professionele setups**: veel Amerikaanse cam girls investeren in professionele camera's, belichting en achtergronden
- **Interactieve shows**: tip-goals, connected toys en creatieve shows zijn standaard
- **Alle tijdzones**: door de breedte van het land zijn er 24/7 Amerikaanse modellen online

Op StartVagina vergelijk je Amerikaanse cam girls van alle platforms in één overzicht.`,
    faq: [
      { q: "Wanneer zijn Amerikaanse cam girls online?", a: "Door de meerdere tijdzones in de VS zijn er altijd Amerikaanse modellen online. De piek is 's avonds Amerikaanse tijd (02:00-08:00 CET)." },
    ],
  },
  "webcamsex-rusland": {
    slug: "webcamsex-rusland",
    country: "Rusland",
    flag: "🇷🇺",
    title: "Webcamsex Rusland — Russische Cam Girls Live | StartVagina",
    h1: "Webcamsex Rusland — Russische Cam Girls Live",
    description: "Russische cam girls live op webcam. Gratis webcamsex met modellen uit Rusland op BongaCams, Stripchat en Chaturbate.",
    keywords: "webcamsex rusland, russische cam girls, russian cam girls, cam girls rusland, webcam rusland",
    content: `Russische cam girls zijn **legendarisch** in de webcamsex-wereld. Bekend om hun schoonheid, professionele presentatie en HD-streams.

**Rusland op cam:**
- **BongaCams favoriet**: BongaCams is het platform bij uitstek voor Russische modellen — het platform richt zich sterk op de Oost-Europese markt
- **Schoonheid als standaard**: Russische cam girls staan bekend om hun looks — slanke figuren, lange benen en verzorgde uitstraling
- **Professioneel**: veel Russische modellen werken vanuit studio's of hebben thuis professionele setups
- **Meertalig**: naast Russisch spreken velen Engels, soms ook Duits of Frans
- **Stripchat en Chaturbate**: ook op deze platforms zijn Russische modellen talrijk aanwezig

Ontdek alle live Russische cam girls op StartVagina.`,
    faq: [
      { q: "Op welk platform vind ik Russische cam girls?", a: "BongaCams heeft verreweg het grootste aanbod Russische modellen. Stripchat en Chaturbate hebben ook veel Russische cam girls." },
    ],
  },
  "webcamsex-oekraine": {
    slug: "webcamsex-oekraine",
    country: "Oekraïne",
    flag: "🇺🇦",
    title: "Webcamsex Oekraïne — Oekraïense Cam Girls Live | StartVagina",
    h1: "Webcamsex Oekraïne — Oekraïense Cam Girls Live",
    description: "Oekraïense cam girls live op webcam. Gratis webcamsex met modellen uit Oekraïne op BongaCams, Stripchat en Chaturbate.",
    keywords: "webcamsex oekraine, oekraiense cam girls, ukrainian cam girls, cam girls oekraine, webcam oekraine",
    content: `Oekraïne levert, net als Rusland en Roemenië, een groot aantal **professionele cam modellen**. Oekraïense cam girls staan bekend om hun slanke looks en meertalige vaardigheden.

**Oekraïne in de cam-wereld:**
- **Professionele aanpak**: veel Oekraïense modellen werken vanuit studio's met hoge productiewaarde
- **BongaCams en Stripchat**: de twee platforms met het grootste Oekraïense aanbod
- **Slanke schoonheid**: Oekraïense cam girls zijn bekend om hun slanke figuren en verzorgde uitstraling
- **Meertalig**: veel modellen spreken Engels, Russisch en soms ook Duits of Frans
- **Ambitieus**: Oekraïense modellen investeren in hun shows en bouwen trouwe fanbases op

Bekijk alle live Oekraïense cam modellen op StartVagina.`,
    faq: [
      { q: "Wat is het verschil tussen Russische en Oekraïense cam girls?", a: "Hoewel ze vaak op dezelfde platforms actief zijn, hebben Oekraïense modellen vaak een iets andere stijl — wat warmer en toegankelijker. Beide landen leveren topmodellen." },
    ],
  },
  "webcamsex-brazilie": {
    slug: "webcamsex-brazilie",
    country: "Brazilië",
    flag: "🇧🇷",
    title: "Webcamsex Brazilië — Braziliaanse Cam Girls Live | StartVagina",
    h1: "Webcamsex Brazilië — Braziliaanse Cam Girls Live",
    description: "Braziliaanse cam girls live op webcam. Gratis webcamsex met modellen uit Brazilië. Samba, curves en passie live op je scherm.",
    keywords: "webcamsex brazilie, braziliaanse cam girls, brazilian cam girls, cam girls brazilie, webcam brazilie, brasileira cam",
    content: `Braziliaanse cam girls brengen de **energie van carnaval** naar je scherm. Bekend om hun curves, dansmoves en uitbundige persoonlijkheid.

**Brazilië op cam:**
- **Curves en dans**: Braziliaanse modellen omarmen hun lichaam en integreren vaak dans in hun shows
- **Tweede cam-land van Latijns-Amerika**: na Colombia levert Brazilië de meeste Latijnse cam modellen
- **Chaturbate en Stripchat**: de populairste platforms voor Braziliaanse cam girls
- **Portugees en Engels**: de meeste Braziliaanse modellen chatten in het Portugees, maar steeds meer spreken ook Engels
- **Energiek en spontaan**: Braziliaanse shows zijn zelden saai — verwacht dans, lachen en interactie

Ontdek alle live Braziliaanse cam modellen op StartVagina.`,
    faq: [
      { q: "Spreken Braziliaanse cam girls Engels?", a: "Steeds meer Braziliaanse modellen spreken Engels, maar de meeste chatten voornamelijk in het Portugees. Vertaaltools helpen bij de communicatie." },
    ],
  },
  "webcamsex-japan": {
    slug: "webcamsex-japan",
    country: "Japan",
    flag: "🇯🇵",
    title: "Webcamsex Japan — Japanse Cam Girls Live | StartVagina",
    h1: "Webcamsex Japan — Japanse Cam Girls Live",
    description: "Japanse cam girls live op webcam. Gratis webcamsex met modellen uit Japan. Cosplay, kawaii en Japanse webcam shows.",
    keywords: "webcamsex japan, japanse cam girls, japanese cam girls, cam girls japan, webcam japan, cosplay cam",
    content: `Japanse cam girls bieden een **unieke ervaring** — van cosplay en kawaii-esthetiek tot meer traditionele shows. Japan heeft een eigen cam-cultuur.

**Japan op cam:**
- **Cosplay en roleplay**: veel Japanse modellen integreren cosplay, schoolgirl outfits en anime-elementen in hun shows
- **Kawaii-esthetiek**: schattig, speels en creatief — Japanse cam girls hebben een herkenbare stijl
- **Stripchat en Chaturbate**: de twee westerse platforms met het meeste Japanse aanbod
- **Petite**: veel Japanse modellen hebben een petite lichaamsbouw die een specifiek publiek aanspreekt
- **Tijdsverschil**: door het grote tijdsverschil zijn Japanse modellen vooral overdag (Europese tijd) online

Ontdek alle live Japanse cam modellen op StartVagina.`,
    faq: [
      { q: "Wanneer zijn Japanse cam girls online?", a: "Door het tijdsverschil (8 uur voor op CET) zijn Japanse modellen vooral tussen 10:00 en 20:00 CET online." },
    ],
  },
  "webcamsex-polen": {
    slug: "webcamsex-polen",
    country: "Polen",
    flag: "🇵🇱",
    title: "Webcamsex Polen — Poolse Cam Girls Live | StartVagina",
    h1: "Webcamsex Polen — Poolse Cam Girls Live",
    description: "Poolse cam girls live op webcam. Gratis webcamsex met modellen uit Polen op Chaturbate, BongaCams en Stripchat.",
    keywords: "webcamsex polen, poolse cam girls, polish cam girls, cam girls polen, webcam polen",
    content: `Polen is een **groeiend cam-land** in Oost-Europa. Poolse cam girls combineren Slavische schoonheid met een toegankelijke, vriendelijke stijl.

**Polen op cam:**
- **Slavische schoonheid**: Poolse cam girls combineren Oost-Europese looks met een warme persoonlijkheid
- **BongaCams en Stripchat**: de platforms met het meeste Poolse aanbod
- **Professioneel**: veel Poolse modellen hebben goede setups met HD-streams
- **Meertalig**: Poolse cam girls spreken vaak Engels en soms ook Duits
- **Groeiende community**: het aantal Poolse cam modellen groeit elk jaar

Bekijk alle live Poolse cam modellen op StartVagina.`,
    faq: [
      { q: "Spreken Poolse cam girls Engels?", a: "De meeste Poolse cam modellen spreken goed Engels. Sommige spreken ook Duits, wat handig is voor Nederlandse kijkers." },
    ],
  },
  "webcamsex-mexico": {
    slug: "webcamsex-mexico",
    country: "Mexico",
    flag: "🇲🇽",
    title: "Webcamsex Mexico — Mexicaanse Cam Girls Live | StartVagina",
    h1: "Webcamsex Mexico — Mexicaanse Cam Girls Live",
    description: "Mexicaanse cam girls live op webcam. Gratis webcamsex met modellen uit Mexico op Chaturbate, Stripchat en meer.",
    keywords: "webcamsex mexico, mexicaanse cam girls, mexican cam girls, cam girls mexico, webcam mexico",
    content: `Mexico levert een groeiend aantal cam modellen dat de **Latijnse webcamsex-scene** versterkt. Mexicaanse cam girls staan bekend om hun warmte en humor.

**Mexico op cam:**
- **Warmte en humor**: Mexicaanse modellen zijn gezellig, grappig en interactief
- **Chaturbate favoriet**: op Chaturbate zijn Mexicaanse cam girls bijzonder actief
- **Groeiend aanbod**: Mexico wordt steeds belangrijker in de cam-wereld
- **Spaanstalig**: de meeste Mexicaanse modellen chatten in het Spaans
- **Variatie**: van jonge modellen uit Mexico-Stad tot MILF's uit Guadalajara

Ontdek alle live Mexicaanse cam modellen op StartVagina.`,
    faq: [
      { q: "Spreken Mexicaanse cam girls Engels?", a: "Sommige Mexicaanse modellen spreken Engels, maar de meeste chatten voornamelijk in het Spaans." },
    ],
  },
  "webcamsex-tsjechie": {
    slug: "webcamsex-tsjechie",
    country: "Tsjechië",
    flag: "🇨🇿",
    title: "Webcamsex Tsjechië — Tsjechische Cam Girls Live | StartVagina",
    h1: "Webcamsex Tsjechië — Tsjechische Cam Girls Live",
    description: "Tsjechische cam girls live op webcam. Gratis webcamsex met modellen uit Tsjechië op Stripchat, BongaCams en Chaturbate.",
    keywords: "webcamsex tsjechie, tsjechische cam girls, czech cam girls, cam girls tsjechie, webcam tsjechie",
    content: `Tsjechië heeft een lange traditie in de erotische industrie en dat vertaalt zich naar een **sterke cam-presence**. Tsjechische cam girls zijn professioneel en meertalig.

**Tsjechië op cam:**
- **Erotische traditie**: Tsjechië is al decennia een belangrijke speler in de Europese erotische industrie
- **Professioneel**: Tsjechische modellen hebben ervaring en investeren in kwaliteit
- **Stripchat en BongaCams**: de populairste platforms voor Tsjechische cam girls
- **Meertalig**: veel Tsjechische modellen spreken Engels, Duits en soms ook Russisch
- **Praag als hub**: veel Tsjechische cam modellen werken vanuit Praag

Bekijk alle live Tsjechische cam modellen op StartVagina.`,
    faq: [
      { q: "Spreken Tsjechische cam girls Engels?", a: "Ja, de meeste Tsjechische modellen spreken goed Engels en vaak ook Duits." },
    ],
  },
  "webcamsex-filipijnen": {
    slug: "webcamsex-filipijnen",
    country: "Filipijnen",
    flag: "🇵🇭",
    title: "Webcamsex Filipijnen — Filipijnse Cam Girls Live | StartVagina",
    h1: "Webcamsex Filipijnen — Filipijnse Cam Girls Live",
    description: "Filipijnse cam girls live op webcam. Gratis webcamsex met modellen uit de Filipijnen. Vriendelijk, speels en altijd online.",
    keywords: "webcamsex filipijnen, filipijnse cam girls, filipina cam girls, cam girls filipijnen, webcam filipijnen, pinay cam",
    content: `De Filipijnen leveren een enorm aantal cam modellen — **vriendelijk, Engels-sprekend en bijna altijd online**. Filipijnse cam girls zijn geliefd om hun warme persoonlijkheid.

**Filipijnen op cam:**
- **Engels als voertaal**: Filipijnse cam girls spreken vloeiend Engels — geen taalbarrière
- **Altijd online**: door het tijdsverschil vind je Filipijnse modellen op elk moment van de dag
- **Vriendelijk en warm**: Filipijnse cam girls staan bekend om hun hartelijke, open communicatie
- **Chaturbate en Stripchat**: de twee platforms met het grootste Filipijnse aanbod
- **Groot aanbod**: de Filipijnen zijn een van de grootste Aziatische cam-landen

Ontdek alle live Filipijnse cam modellen op StartVagina.`,
    faq: [
      { q: "Spreken Filipijnse cam girls Engels?", a: "Ja! Engels is een officiële taal in de Filipijnen. Vrijwel alle Filipijnse cam modellen spreken vloeiend Engels." },
    ],
  },
  "webcamsex-thailand": {
    slug: "webcamsex-thailand",
    country: "Thailand",
    flag: "🇹🇭",
    title: "Webcamsex Thailand — Thaise Cam Girls Live | StartVagina",
    h1: "Webcamsex Thailand — Thaise Cam Girls Live",
    description: "Thaise cam girls live op webcam. Gratis webcamsex met modellen uit Thailand op Chaturbate, Stripchat en meer.",
    keywords: "webcamsex thailand, thaise cam girls, thai cam girls, cam girls thailand, webcam thailand",
    content: `Thaise cam girls bieden een **exotische webcamsex-ervaring**. Thailand heeft een levendige cam-scene met modellen die variëren van petite Thai beauties tot meer ervaren performers.

**Thailand op cam:**
- **Exotische schoonheid**: Thaise modellen hebben een unieke, exotische uitstraling
- **Petite en elegant**: veel Thaise cam girls hebben een petite lichaamsbouw
- **Chaturbate en Stripchat**: de populairste platforms voor Thaise modellen
- **Speels**: Thaise cam girls zijn vaak speels, vrolijk en interactief
- **Betaalbaar**: Thailand is een populaire bestemming voor kijkers die graag tippen

Bekijk alle live Thaise cam modellen op StartVagina.`,
    faq: [
      { q: "Spreken Thaise cam girls Engels?", a: "Veel Thaise modellen spreken basis-Engels. De communicatie is vaak een mix van Engels en emoticons." },
    ],
  },
};

/** Map variant country names to canonical name for matching */
const countryVariants: Record<string, string[]> = {
  Nederland: ["Nederland", "The Netherlands", "Netherlands", "North Holland", "South Holland"],
  België: ["België", "Belgium"],
};

const CountryLandingPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "");
  const config = countryPages[slug || ""];
  const { allCams, isLoading } = useAllCams();

  const countryCams = useMemo(() => {
    if (!config || !allCams.length) return [];
    const variants = countryVariants[config.country] || [config.country];
    return allCams
      .filter((m) => variants.includes(m.country))
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
              {config.flag} {config.h1}
            </h1>
            <div
              className="text-muted-foreground max-w-3xl leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{
                __html: "<p>" + renderContent(config.content) + "</p>",
              }}
            />
          </section>

          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>Modellen laden…</span>
            </div>
          ) : (
            <CamGrid
              title={`${config.flag} ${config.country} — ${countryCams.length} modellen online`}
              models={countryCams}
              totalOnline={countryCams.length}
              isLoading={isLoading}
            />
          )}

          {/* FAQ */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Veelgestelde vragen — Webcamsex {config.country}
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
              Meer landen op StartVagina
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.values(countryPages)
                .filter((c) => c.slug !== config.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/${c.slug}`}
                    className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
                  >
                    {c.flag} {c.country}
                  </Link>
                ))}
              <Link to="/countries" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                🌍 Alle Landen
              </Link>
              <Link to="/webcamsex" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                Webcamsex
              </Link>
              <Link to="/categories" className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors">
                Categorieën
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default CountryLandingPage;
