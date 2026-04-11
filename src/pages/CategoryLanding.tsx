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
import type { CamModel } from "@/types/cam";

interface CategoryConfig {
  slug: string;
  label: string;
  emoji: string;
  title: string;
  h1: string;
  description: string;
  keywords: string;
  content: string;
  faq: { q: string; a: string }[];
  matchTags: string[];
  matchGender?: string[];
  matchMobile?: boolean;
}

/** Convert **bold** markers and newlines to simple HTML */
function renderContent(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "<br/>• ")
    .replace(/\n/g, "<br/>");
}

function matchesCategory(model: CamModel, cat: CategoryConfig): boolean {
  if (cat.matchGender && cat.matchGender.length > 0) {
    if (cat.matchGender.includes(model.gender.toLowerCase())) return true;
  }
  if (cat.matchMobile) {
    return !!model.isMobile || model.tags.some((t) => t.toLowerCase().includes("mobile"));
  }
  const modelTagsLower = model.tags.map((t) => t.toLowerCase());
  return cat.matchTags.some((tag) =>
    modelTagsLower.some((mt) => mt.includes(tag) || tag.includes(mt))
  );
}

const categoryPages: Record<string, CategoryConfig> = {
  "webcamsex-teen-18-plus": {
    slug: "webcamsex-teen-18-plus",
    label: "Teen (18+)",
    emoji: "🔞",
    title: "Webcamsex Teen 18+ — Jonge Cam Girls Live | StartVagina",
    h1: "Webcamsex Teen 18+ — Jonge Cam Girls Live",
    description:
      "Bekijk jonge cam girls van 18+ live op webcam. Gratis teen webcamsex met de mooiste jonge modellen van Chaturbate, Stripchat, BongaCams en CAM4.",
    keywords:
      "teen webcamsex, 18+ cam girls, jonge cam girls, teen cam, webcamsex jong, jonge webcam modellen, 18 plus cam",
    content: `Op zoek naar jonge cam girls van 18 en ouder? Op StartVagina vind je de mooiste **teen cam modellen** die live online zijn op de grootste cam platforms. Van verse gezichten die net begonnen zijn tot populaire jonge modellen met duizenden volgers.

**Wat je kunt verwachten:**
- **Verse modellen**: veel 18+ cam girls zijn nieuw op het platform — spontaan, enthousiast en nieuwsgierig
- **Alle platforms**: we tonen jonge modellen van Chaturbate, Stripchat, BongaCams, CAM4 en XCams op één plek
- **Gratis kijken**: alle openbare shows zijn zonder registratie en zonder kosten te bekijken
- **Dagelijks nieuw**: elke dag verschijnen er nieuwe jonge modellen die voor het eerst live gaan

De teen-categorie is een van de populairste op alle cam sites. Dat betekent veel keuze, maar ook veel concurrentie om de aandacht. Via StartVagina filter je direct op deze categorie zodat je niet hoeft te zoeken — de mooiste jonge cam girls staan meteen voor je klaar.

Let op: alle modellen op StartVagina zijn 18 jaar of ouder. De leeftijdsverificatie wordt door de cam platforms zelf uitgevoerd.`,
    faq: [
      { q: "Zijn alle modellen echt 18+?", a: "Ja, alle cam platforms (Chaturbate, Stripchat, BongaCams, CAM4, XCams) vereisen strikte leeftijdsverificatie met officiële documenten voordat een model kan streamen." },
      { q: "Hoe vind ik de jongste cam modellen?", a: "Op StartVagina kun je filteren op de teen-categorie. Platforms zoals Chaturbate hebben ook een 'New Cams' filter waarmee je modellen vindt die net begonnen zijn." },
    ],
    matchTags: ["teen", "18", "young", "18+", "teenager"],
  },

  "webcamsex-milf": {
    slug: "webcamsex-milf",
    label: "MILF",
    emoji: "💋",
    title: "Webcamsex MILF — Ervaren Vrouwen Live op Cam | StartVagina",
    h1: "Webcamsex MILF — Ervaren Vrouwen Live",
    description:
      "MILF webcamsex met ervaren vrouwen live op cam. Bekijk de mooiste MILF cam modellen gratis op Chaturbate, Stripchat en meer. Volwassen vrouwen die weten wat ze doen.",
    keywords:
      "milf webcamsex, milf cam, milf live, webcamsex ervaren vrouwen, milf chaturbate, milf cam girls, volwassen webcamsex",
    content: `MILF webcamsex is een van de meest gezochte categorieën — en terecht. **Ervaren vrouwen** die precies weten wat ze doen, zelfverzekerd voor de camera staan en hun kijkers op een volwassen manier weten te boeien. Geen onzekerheid, geen schroom — puur zelfvertrouwen en sensualiteit.

**Waarom MILF cams zo populair zijn:**
- **Ervaring**: MILF modellen weten hoe ze een show moeten opbouwen — van tease tot climax
- **Zelfvertrouwen**: deze vrouwen zijn comfortabel in hun eigen huid en stralen dat uit
- **Interactie**: MILF cam girls zijn vaak betere conversatie-partners en nemen de tijd voor chat
- **Variatie**: van classy en elegant tot wild en ongegeneerd — er is voor elk wat wils
- **Trouwe kijkers**: MILF modellen bouwen vaak een loyale fanbase op die steeds terugkomt

Op StartVagina verzamelen we alle live MILF cam modellen van Chaturbate, Stripchat, BongaCams, CAM4 en XCams. Filter op deze categorie en ontdek waarom miljoenen kijkers de voorkeur geven aan een ervaren vrouw boven een jong model.`,
    faq: [
      { q: "Wat betekent MILF in webcamsex?", a: "MILF staat voor 'Mother I'd Like to F***' en verwijst in de cam-wereld naar volwassen vrouwen, meestal 30+, die webcamsex aanbieden. Het is een van de populairste categorieën op alle cam platforms." },
      { q: "Op welk platform vind ik de meeste MILF modellen?", a: "Chaturbate en Stripchat hebben het grootste aanbod MILF cam girls. BongaCams heeft veel Europese MILF modellen. Via StartVagina vergelijk je alle platforms tegelijk." },
    ],
    matchTags: ["milf"],
  },

  "webcamsex-mature": {
    slug: "webcamsex-mature",
    label: "Mature",
    emoji: "👩‍🦳",
    title: "Webcamsex Mature — Oudere Vrouwen Live op Webcam | StartVagina",
    h1: "Webcamsex Mature — Oudere Vrouwen Live",
    description:
      "Mature webcamsex met oudere vrouwen live op cam. Gratis webcam shows van mature modellen op Chaturbate, Stripchat en meer. Ervaring op z'n best.",
    keywords:
      "mature webcamsex, mature cam, oudere vrouwen webcam, granny cam, mature live, webcamsex ouder, mature cam girls",
    content: `Mature webcamsex draait om vrouwen die de 40, 50 of zelfs 60 gepasseerd zijn en vol zelfvertrouwen voor de camera staan. Deze **oudere cam modellen** bewijzen dat sensualiteit geen leeftijdsgrens kent — integendeel, het wordt er alleen maar beter op.

**Wat mature cams bijzonder maakt:**
- **Levenservaring**: mature modellen hebben een ontspannen, onbevangen houding die je bij jongere modellen zelden ziet
- **Echtheid**: geen filters, geen trucjes — wat je ziet is wat je krijgt, en dat is precies de charme
- **Persoonlijk contact**: mature cam girls nemen de tijd voor hun kijkers en bouwen echte connecties op
- **Nichepubliek**: een kleinere maar zeer loyale groep kijkers die weet wat ze wil

Het aanbod mature modellen is kleiner dan de reguliere categorieën, maar de kwaliteit is hoog. Vooral op Chaturbate en Stripchat vind je een goede selectie mature vrouwen die regelmatig online zijn. Via StartVagina zie je ze allemaal op één plek — ongeacht het platform.`,
    faq: [
      { q: "Wat is het verschil tussen MILF en Mature?", a: "MILF verwijst meestal naar vrouwen van 30-45 jaar, terwijl Mature modellen over het algemeen 45+ zijn. De grenzen zijn vloeiend, maar mature duidt op meer rijpere leeftijd." },
      { q: "Zijn er veel mature cam modellen online?", a: "Het aanbod is kleiner dan populaire categorieën, maar er zijn altijd tientallen mature modellen live. Chaturbate en Stripchat hebben de grootste selectie." },
    ],
    matchTags: ["mature", "granny", "older"],
  },

  "webcamsex-asian": {
    slug: "webcamsex-asian",
    label: "Asian",
    emoji: "🌸",
    title: "Webcamsex Asian — Aziatische Cam Girls Live | StartVagina",
    h1: "Webcamsex Asian — Aziatische Cam Girls",
    description:
      "Aziatische cam girls live op webcam. Gratis Asian webcamsex met modellen uit Japan, Korea, Thailand, Filipijnen en meer. De mooiste Aziatische cam modellen.",
    keywords:
      "asian webcamsex, aziatische cam girls, asian cam, japanse webcam, koreaanse cam girls, thai cam, asian live cam",
    content: `Aziatische cam girls behoren tot de meest populaire modellen op de grote cam platforms. Van **Japanse** schoonheden en **Koreaanse** cam girls tot modellen uit **Thailand**, de **Filipijnen** en **China** — de diversiteit is enorm en de kwaliteit hoog.

**Waarom Asian cams zo geliefd zijn:**
- **Diversiteit**: Azië is een enorm continent met heel verschillende looks en culturen — van petite Japanse modellen tot curvy Filipijnse cam girls
- **Exotische uitstraling**: voor Europese kijkers bieden Aziatische cam modellen iets anders, iets nieuws
- **Speels en creatief**: veel Aziatische cam girls staan bekend om creatieve shows met cosplay, roleplay en kawaii-elementen
- **Grote aanwezigheid op Stripchat**: Stripchat heeft een uitgebreide selectie Aziatische modellen met goede filters op land en etniciteit
- **Tijdsverschil voordeel**: door het tijdsverschil zijn er juist overdag (Europese tijd) veel Aziatische modellen online

Of je nu specifiek zoekt naar Japanse, Koreaanse, Thai of Filipijnse cam girls — op StartVagina filter je op de Asian-categorie en zie je modellen van alle platforms in één overzicht. Ideaal om te ontdekken en vergelijken.`,
    faq: [
      { q: "Op welk platform vind ik de meeste Aziatische cam girls?", a: "Stripchat heeft het grootste aanbod Aziatische modellen met uitgebreide filters. Chaturbate en BongaCams hebben ook een goede selectie. Via StartVagina zie je ze allemaal." },
      { q: "Wanneer zijn Aziatische cam modellen online?", a: "Door het tijdsverschil zijn veel Aziatische modellen online tussen 06:00 en 18:00 CET. Maar populaire modellen passen hun schema aan op Europese en Amerikaanse kijkers." },
    ],
    matchTags: ["asian", "asiatic"],
  },

  "webcamsex-latina": {
    slug: "webcamsex-latina",
    label: "Latina",
    emoji: "🌶️",
    title: "Webcamsex Latina — Latijnse Cam Girls Live | StartVagina",
    h1: "Webcamsex Latina — Latijnse Cam Girls",
    description:
      "Latina cam girls live op webcam. Gratis webcamsex met Colombiaanse, Braziliaanse en Mexicaanse cam modellen. Heet, temperamentvol en live.",
    keywords:
      "latina webcamsex, latina cam girls, colombiaanse cam girls, braziliaanse webcam, mexicaanse cam, latina live cam, latin cam",
    content: `Latina cam girls brengen **vuur, passie en temperament** naar je scherm. Colombia, Brazilië, Mexico, Venezuela en Argentinië leveren een ongelooflijke stroom aan prachtige modellen die de cam-wereld domineren — en het is niet moeilijk te zien waarom.

**Wat Latina cams zo heet maakt:**
- **Passie en energie**: Latijnse modellen staan bekend om hun enthousiasme, spontaniteit en aanstekelijke energie
- **Colombia is cam-hoofdstad**: Colombia is het land met de meeste cam modellen ter wereld — duizenden Colombiaanse vrouwen streamen dagelijks
- **Curves en zelfvertrouwen**: Latina cam girls omarmen hun lichaam en stralen dat uit in elke show
- **Betaalbaar tippen**: door het verschil in koopkracht zijn Latijnse modellen vaak extra dankbaar voor tips, wat leidt tot interactievere shows
- **Taalbarrière steeds kleiner**: veel Latina modellen spreken inmiddels goed Engels naast Spaans

Op Chaturbate en Stripchat vormen Latina modellen de grootste groep na de Engelstalige modellen. Op CAM4 vind je ook een sterke Latijnse community. Via StartVagina zie je alle live Latina cam girls van alle platforms — filter, vergelijk en ontdek je nieuwe favoriet.`,
    faq: [
      { q: "Uit welke landen komen de meeste Latina cam girls?", a: "Colombia levert verreweg de meeste cam modellen, gevolgd door Brazilië, Mexico, Venezuela en Argentinië. Colombia wordt niet voor niets de 'cam-hoofdstad van de wereld' genoemd." },
      { q: "Spreken Latina cam girls Engels?", a: "Steeds meer Latina modellen spreken goed Engels. Op grote platforms kun je filteren op taal. Veel modellen gebruiken ook vertaaltools in de chat." },
    ],
    matchTags: ["latina", "latino", "latin"],
  },

  "webcamsex-ebony": {
    slug: "webcamsex-ebony",
    label: "Ebony",
    emoji: "🖤",
    title: "Webcamsex Ebony — Zwarte Cam Girls Live | StartVagina",
    h1: "Webcamsex Ebony — Zwarte Cam Girls Live",
    description:
      "Ebony cam girls live op webcam. Gratis webcamsex met mooie zwarte modellen op Chaturbate, Stripchat en meer. Ebony cams op z'n best.",
    keywords:
      "ebony webcamsex, ebony cam girls, zwarte cam girls, ebony cam, black cam girls, ebony live, ebony webcam",
    content: `Ebony webcamsex is een categorie die steeds populairder wordt — en terecht. **Zwarte cam modellen** brengen een unieke mix van schoonheid, zelfvertrouwen en energie die onweerstaanbaar is.

**Wat Ebony cams bijzonder maakt:**
- **Zelfvertrouwen en body positivity**: ebony cam girls vieren hun lichaam in alle vormen en maten
- **Energieke shows**: van sensual slow tease tot high-energy dansshows — ebony modellen weten hoe ze een publiek moeten vermaken
- **Sterke community**: ebony cam girls hebben vaak een trouwe, betrokken fanbase
- **Groeiend aanbod**: steeds meer zwarte modellen ontdekken webcamsex als platform voor zelfexpressie en inkomen
- **Alle platforms vertegenwoordigd**: van Chaturbate en Stripchat tot BongaCams — overal vind je ebony cam models

De ebony-categorie biedt een verfrissende diversiteit in de cam-wereld. Op StartVagina verzamelen we alle live ebony cam girls van de grote platforms, zodat je in één overzicht kunt vergelijken en ontdekken.`,
    faq: [
      { q: "Op welk platform vind ik de meeste ebony cam girls?", a: "Chaturbate en Stripchat hebben het grootste aanbod ebony modellen. Stripchat biedt goede filters om specifiek op etniciteit te zoeken." },
      { q: "Wat betekent ebony in webcamsex?", a: "Ebony is de gangbare term in de cam-industrie voor zwarte/donkere cam modellen. Het is een van de populairste zoekcategorieën op alle cam platforms." },
    ],
    matchTags: ["ebony", "black"],
  },

  "webcamsex-grote-borsten": {
    slug: "webcamsex-grote-borsten",
    label: "Big Boobs",
    emoji: "🍈",
    title: "Webcamsex Grote Borsten — Big Boobs Cam Girls | StartVagina",
    h1: "Webcamsex Grote Borsten — Big Boobs Cam Girls",
    description:
      "Cam girls met grote borsten live op webcam. Gratis big boobs webcamsex met de mooiste busty modellen van Chaturbate, Stripchat en meer.",
    keywords:
      "grote borsten webcamsex, big boobs cam, busty cam girls, grote tieten webcam, big tits cam, busty webcam, webcamsex grote tieten",
    content: `Grote borsten zijn de **meest gezochte categorie** in webcamsex — wereldwijd. Of het nu gaat om natuurlijke curves of enhanced assets, **busty cam girls** trekken de meeste kijkers en staan bovenaan de populariteitslijsten van alle cam platforms.

**Waarom big boobs cams #1 zijn:**
- **Universele aantrekkingskracht**: grote borsten zijn veruit het populairste zoekwoord op Chaturbate, Stripchat en BongaCams
- **Enorm aanbod**: op elk platform zijn er honderden busty modellen tegelijk online
- **Variatie**: van natuurlijke DD+ cups tot professioneel enhanced — voor elke voorkeur is er een model
- **Interactieve shows**: veel busty cam girls gebruiken hun assets als centraal element in hun shows
- **Alle leeftijden**: van jonge 18+ modellen tot ervaren MILF's — busty modellen vind je in elke leeftijdscategorie

Op StartVagina filter je met één klik op de Big Boobs categorie en zie je alle live busty cam girls van Chaturbate, Stripchat, BongaCams, CAM4 en XCams. Vergelijk, ontdek en vind je perfecte match.`,
    faq: [
      { q: "Hoe filter ik op borst-grootte?", a: "Op StartVagina kun je filteren op de Big Boobs categorie. Op platforms als Stripchat kun je ook filteren op specifieke lichaamskenmerken." },
      { q: "Zijn de grote borsten echt?", a: "Dat varieert per model. Veel cam girls hebben natuurlijke grote borsten, terwijl anderen enhanced zijn. Sommige platforms hebben tags voor 'natural' of 'enhanced'." },
    ],
    matchTags: ["big boobs", "big tits", "bigboobs", "bigtits", "busty", "huge boobs"],
  },

  "webcamsex-kleine-borsten": {
    slug: "webcamsex-kleine-borsten",
    label: "Small Tits",
    emoji: "🌷",
    title: "Webcamsex Kleine Borsten — Petite Cam Girls | StartVagina",
    h1: "Webcamsex Kleine Borsten — Petite Cam Girls",
    description:
      "Petite cam girls met kleine borsten live op webcam. Gratis small tits webcamsex met slanke, petite modellen op alle cam platforms.",
    keywords:
      "kleine borsten webcamsex, small tits cam, petite cam girls, kleine tieten webcam, petite webcam, slanke cam girls",
    content: `Niet iedereen zoekt grote borsten — en dat is precies waarom de petite categorie zo'n trouwe fanbase heeft. **Cam girls met kleine borsten** brengen een elegante, natuurlijke uitstraling naar het scherm die steeds meer kijkers aanspreekt.

**De charme van petite cams:**
- **Natuurlijke schoonheid**: small tits modellen kiezen bewust voor een natural look — geen implants, geen opvulling
- **Slank en atletisch**: veel petite cam girls hebben een slanke, sportieve body die prachtig op camera komt
- **Jonge uitstraling**: petite modellen ogen vaak jong en fris, wat een specifiek publiek aanspreekt
- **Creatieve shows**: zonder de focus op borsten leggen petite modellen vaak meer nadruk op creativiteit, roleplay en persoonlijkheid
- **Trouwe fanbase**: kijkers die van petite houden zijn vaak loyaler en komen vaker terug

Op StartVagina filter je direct op kleine borsten / petite en zie je alle beschikbare modellen van alle cam platforms. Een nichemarkt, maar met verrassend veel keuze.`,
    faq: [
      { q: "Zijn er veel petite cam modellen online?", a: "Ja! Petite is een populaire categorie. Op elk moment zijn er honderden small tits modellen online op Chaturbate, Stripchat en andere platforms." },
      { q: "Wat betekent petite in webcamsex?", a: "Petite verwijst naar slanke cam modellen met een klein postuur en kleine borsten. Het is een van de meest gezochte categorieën na big boobs." },
    ],
    matchTags: ["small tits", "smalltits", "petite", "tiny tits"],
  },

  "webcamsex-anal": {
    slug: "webcamsex-anal",
    label: "Anal",
    emoji: "🍑",
    title: "Webcamsex Anal — Anale Cam Shows Live | StartVagina",
    h1: "Webcamsex Anal — Live Anale Shows",
    description:
      "Anal webcamsex met cam girls die live anale shows doen. Gratis anal cam shows op Chaturbate, Stripchat en meer. De beste anale webcam modellen.",
    keywords:
      "anal webcamsex, anal cam, anale webcam, anal cam girls, anal show, anale cam shows, anal live cam",
    content: `Anal webcamsex is een van de snelst groeiende categorieën op cam platforms. Steeds meer modellen nemen **anale shows** op in hun repertoire, en de vraag van kijkers is enorm. Van subtiele anale tease tot expliciete shows — de variatie is groot.

**Wat je kunt verwachten bij anal cams:**
- **Interactieve tip-shows**: veel modellen starten anale acties bij een bepaald tip-doel — zo bouw je samen naar een climax toe
- **Connected toys**: populaire modellen gebruiken connected anale toys die reageren op tips
- **Van softcore tot hardcore**: sommige modellen doen subtiele anale tease, anderen gaan all-in — je kiest zelf wat je aanspreekt
- **Gratis in openbare shows**: veel anale shows vinden plaats in de openbare room, zonder dat je hoeft te betalen
- **Alle platforms**: Chaturbate, Stripchat, BongaCams en CAM4 hebben allemaal een uitgebreide anal-categorie

Op StartVagina filter je direct op de anal-categorie en zie je welke modellen nu live zijn met anale content. Van ervaren performers tot modellen die het voor het eerst proberen — er is altijd wat te ontdekken.`,
    faq: [
      { q: "Zijn anale shows gratis te bekijken?", a: "Veel modellen doen anale acties in hun openbare gratis shows, vaak gekoppeld aan een tip-doel. Sommige modellen bewaren anale content voor privé shows." },
      { q: "Op welk platform vind ik de meeste anal cam shows?", a: "Chaturbate en Stripchat hebben de grootste selectie modellen met anal-tags. Je kunt op beide platforms filteren op specifieke categorieën." },
    ],
    matchTags: ["anal", "ass", "anal play"],
  },

  "webcamsex-koppels": {
    slug: "webcamsex-koppels",
    label: "Koppels",
    emoji: "💑",
    title: "Webcamsex Koppels — Live Cam Koppels | StartVagina",
    h1: "Webcamsex Koppels — Koppels Live op Cam",
    description:
      "Koppels webcamsex live bekijken. Gratis cam shows van echte koppels op Chaturbate, CAM4, Stripchat en meer. Stel-cams op z'n best.",
    keywords:
      "koppels webcamsex, couples cam, koppel cam, webcamsex stellen, cam koppels, couples live cam, koppel webcam",
    content: `Koppels webcamsex is een unieke ervaring die je nergens anders vindt. **Echte stellen** die samen voor de camera gaan — van getrouwde paren tot dating couples en alles daartussenin. De chemie is echt, de actie is ongeregisseerd en dat maakt het zo opwindend.

**Waarom koppel-cams zo populair zijn:**
- **Echte chemie**: geen acteurs, geen scripts — je kijkt naar echte stellen die van elkaars lichaam genieten
- **Variatie in dynamiek**: van romantisch en sensueel tot wild en experimenteel — elk koppel heeft een eigen stijl
- **CAM4 is koppel-koning**: CAM4 heeft het grootste aanbod aan cam koppels, vooral uit Nederland en België
- **Interactief**: veel koppels laten kijkers meebeslissen over wat er gebeurt via chat en tip-doelen
- **Voyeur-ervaring**: koppel-cams geven het gevoel dat je stiekem meekijkt — en precies dat maakt het spannend

Op CAM4 vind je opvallend veel **Nederlandse en Belgische koppels** die samen live gaan. Chaturbate en Stripchat hebben ook een grote couples-sectie met internationale stellen. Via StartVagina zie je alle live koppels van alle platforms in één overzicht.`,
    faq: [
      { q: "Op welk platform vind ik de meeste cam koppels?", a: "CAM4 is verreweg het populairste platform voor koppels, vooral Nederlandse en Belgische stellen. Chaturbate en Stripchat hebben ook een groot aanbod internationale koppels." },
      { q: "Zijn koppel-shows gratis?", a: "Ja, de meeste koppel-shows zijn gratis te bekijken in de openbare room. Net als bij solo modellen kun je tippen voor specifieke acties of een privé show aanvragen." },
    ],
    matchTags: [],
    matchGender: ["couple", "c"],
  },

  "webcamsex-squirt": {
    slug: "webcamsex-squirt",
    label: "Squirt",
    emoji: "💦",
    title: "Webcamsex Squirt — Squirting Cam Shows Live | StartVagina",
    h1: "Webcamsex Squirt — Live Squirting Shows",
    description:
      "Squirt webcamsex met cam girls die live squirten. Gratis squirting cam shows op Chaturbate, Stripchat en meer. De meest spectaculaire cam shows.",
    keywords:
      "squirt webcamsex, squirting cam, squirt cam girls, webcam squirt, squirting show, squirt live cam, squirting webcam",
    content: `Squirting shows zijn de **meest spectaculaire** momenten in webcamsex. Het zijn de shows waar chatrooms exploderen, tip-meldingen niet meer stoppen en kijkers collectief hun adem inhouden. **Squirt cam girls** die dit beheersen zijn echte crowd-pleasers.

**Wat squirt cams zo bijzonder maakt:**
- **Het ultieme hoogtepunt**: een squirting orgasme is het meest visuele en indrukwekkende hoogtepunt op cam
- **Tip-driven shows**: de meeste squirt shows zijn opgebouwd rond een tip-doel — samen met de chatroom werk je naar het moment toe
- **Connected toys**: veel squirt-modellen gebruiken Lovense of andere vibrators die reageren op tips, wat de opbouw intensiever maakt
- **Echtheid**: squirting op cam is live en ongeregisseerd — wat je ziet is echt
- **Populaire tags**: "squirt" is een van de meest gebruikte tags op Chaturbate en Stripchat

Op StartVagina filter je direct op de squirt-categorie en ontdek je welke modellen nu live zijn. Of ze nu al squirten of er naartoe werken in hun show — je bent altijd op het juiste moment.`,
    faq: [
      { q: "Is squirting op cam echt?", a: "Ja, squirting op live cam is echt. De shows zijn onbewerkt en live — er is geen montage of nabewerking. Veel modellen hebben squirting als hun specialiteit ontwikkeld." },
      { q: "Hoe weet ik wanneer een model gaat squirten?", a: "De meeste squirt-modellen werken met een tip-doel. Als het doel bereikt is, start de finale. Kijk naar de tags en het tip-menu van een model voor indicaties." },
    ],
    matchTags: ["squirt", "squirting"],
  },

  "webcamsex-bdsm": {
    slug: "webcamsex-bdsm",
    label: "BDSM",
    emoji: "⛓️",
    title: "Webcamsex BDSM — Bondage & Fetish Cams Live | StartVagina",
    h1: "Webcamsex BDSM — Bondage & Fetish Shows",
    description:
      "BDSM webcamsex met dominante en submissive cam modellen. Bondage, fetish en domination shows live op Chaturbate, Stripchat en meer.",
    keywords:
      "bdsm webcamsex, bondage cam, fetish cam, domination webcam, bdsm cam girls, fetish live cam, bdsm shows, dominatrix cam",
    content: `BDSM webcamsex opent een wereld van **bondage, dominantie, submissie en fetish** die je nergens zo veilig en toegankelijk kunt verkennen als via live cam shows. Van professionele dominatrixen tot onderdanige modellen die gehoorzamen — BDSM cams bedienen het hele spectrum.

**Het BDSM cam-landschap:**
- **Domination (Domme)**: ervaren dominatrixen die controle nemen en kijkers commanderen — van JOI tot humiliation
- **Bondage**: modellen die zichzelf (of door een partner) laten vastbinden met touw, leer of handboeien
- **Fetish-variatie**: voet-fetish, leer, latex, roleplay, pet play, CBT en tientallen andere niches
- **Submissive modellen**: cam girls die zich onderwerpen aan de wensen van de chatroom via tip-doelen
- **Veilige verkenning**: BDSM cams laten je fantasieën verkennen vanuit de veiligheid van je eigen scherm

Stripchat heeft een uitgebreide BDSM-sectie met gespecialiseerde filters. Chaturbate biedt de meeste variatie in BDSM-tags. Op StartVagina filteren we op alle BDSM-gerelateerde tags zodat je het volledige aanbod van alle platforms in één overzicht ziet.`,
    faq: [
      { q: "Is BDSM webcamsex veilig?", a: "Ja, je kijkt vanaf je eigen scherm en bepaalt zelf hoever je gaat. De modellen zijn ervaren en houden zich aan de grenzen van het platform. Er is geen fysiek contact." },
      { q: "Waar vind ik de beste BDSM cam shows?", a: "Stripchat heeft een uitgebreide BDSM-categorie met filters op specifieke fetishes. Chaturbate biedt de meeste variatie door het grote aantal modellen met BDSM-tags." },
    ],
    matchTags: ["bdsm", "bondage", "domination", "fetish"],
  },

  "webcamsex-tattoo": {
    slug: "webcamsex-tattoo",
    label: "Tattoo",
    emoji: "🎨",
    title: "Webcamsex Tattoo — Getatoeëerde Cam Girls Live | StartVagina",
    h1: "Webcamsex Tattoo — Getatoeëerde Cam Girls",
    description:
      "Getatoeëerde cam girls live op webcam. Bekijk inked en tattooed modellen gratis op Chaturbate, Stripchat en meer. Body art meets webcamsex.",
    keywords:
      "tattoo webcamsex, getatoeeerde cam girls, inked cam, tattoo cam girls, tattooed webcam, body art cam, inked modellen",
    content: `Tattoos en webcamsex gaan perfect samen. **Getatoeëerde cam girls** combineren body art met sensualiteit en creëren een visueel spektakel dat kijkers fascineert. Van subtiele kleine tattoos tot full-body ink — deze modellen dragen kunst op hun huid.

**Waarom tattoo cams aanspreken:**
- **Visueel aantrekkelijk**: tattoos voegen een extra laag van schoonheid en intrigue toe aan cam shows
- **Alternatieve uitstraling**: geïnkte modellen trekken kijkers aan die houden van een edgy, alternatieve look
- **Verhalen op de huid**: elke tattoo vertelt een verhaal — en modellen delen die graag in de chat
- **Body confidence**: vrouwen met veel tattoos stralen vaak een enorm zelfvertrouwen uit
- **Groeiende trend**: tattoos worden steeds populairder, en het aantal getatoeëerde cam modellen groeit mee

Van goth-achtige full sleeve modellen tot elegante vrouwen met subtiele ink — op StartVagina filter je op de tattoo-tag en ontdek je het brede spectrum van getatoeëerde cam girls op alle platforms.`,
    faq: [
      { q: "Zijn er veel getatoeëerde cam modellen?", a: "Ja, tattoos zijn enorm populair onder cam modellen. Op Chaturbate en Stripchat kun je filteren op de tattoo-tag en vind je op elk moment honderden geïnkte modellen online." },
      { q: "Op welk platform vind ik de meeste tattoo cam girls?", a: "Chaturbate heeft het grootste totale aanbod, maar Stripchat biedt de beste filters om specifiek op tattoos te zoeken." },
    ],
    matchTags: ["tattoo", "tattoos", "tattooed", "inked"],
  },

  "webcamsex-hairy": {
    slug: "webcamsex-hairy",
    label: "Hairy",
    emoji: "🌿",
    title: "Webcamsex Hairy — Behaarde Cam Girls Live | StartVagina",
    h1: "Webcamsex Hairy — Natuurlijk Behaarde Cam Girls",
    description:
      "Hairy cam girls live op webcam. Gratis webcamsex met natuurlijk behaarde modellen. Bush, hairy pussy en natural cam shows op alle platforms.",
    keywords:
      "hairy webcamsex, hairy cam girls, behaarde cam, hairy pussy cam, bush webcam, natural cam girls, ongeschoren webcam",
    content: `De hairy-categorie viert de **natuurlijke vrouw** — ongeschoren, ongegeneerd en prachtig. In een wereld waar smooth de norm is, kiezen steeds meer cam modellen bewust voor een natural look. En hun fanbase groeit gestaag.

**De appeal van hairy cams:**
- **Natuurlijk en echt**: hairy cam girls kiezen bewust voor een ongeschoren look als statement van body positivity
- **Retro-charme**: het doet denken aan de jaren '70 en '80 — een nostalgische, ongekunstelde esthetiek
- **Trouwe niche**: kijkers die van hairy houden zijn enorm loyaal — het is een specifieke voorkeur met een sterke community
- **Variatie**: van een nette trim tot een volle bush — de hairy-categorie omvat een breed spectrum
- **Groeiende acceptatie**: met de body positivity-beweging wordt hairy steeds geaccepteerder en populairder

Op StartVagina filter je op de hairy-tag en ontdek je alle live behaarde cam modellen van Chaturbate, Stripchat, BongaCams, CAM4 en XCams in één overzicht.`,
    faq: [
      { q: "Zijn er veel hairy cam modellen?", a: "Het is een niche-categorie, maar er zijn altijd tientallen hairy cam girls online. De tag is populair op Chaturbate en Stripchat." },
      { q: "Waarom is hairy webcamsex populair?", a: "Steeds meer mensen waarderen de natuurlijke look. De body positivity-beweging heeft bijgedragen aan een groeiende waardering voor ongeschoren lichamen." },
    ],
    matchTags: ["hairy", "hairy pussy", "hairypussy"],
  },

  "webcamsex-voeten": {
    slug: "webcamsex-voeten",
    label: "Feet",
    emoji: "🦶",
    title: "Webcamsex Voeten — Foot Fetish Cam Shows | StartVagina",
    h1: "Webcamsex Voeten — Foot Fetish Shows Live",
    description:
      "Foot fetish webcamsex met cam girls die hun voeten tonen. Gratis voeten cam shows, foot worship en footjob content op alle cam platforms.",
    keywords:
      "voeten webcamsex, foot fetish cam, voeten cam, feet cam girls, foot worship, footjob cam, voeten fetish webcam",
    content: `Foot fetish is een van de **meest voorkomende fetishes** ter wereld — en webcamsex is de perfecte plek om deze passie te beleven. **Voeten cam girls** die weten hoe ze hun voeten moeten presenteren zijn enorm gewild en bouwen trouwe fanbases op.

**Wat foot fetish cams bieden:**
- **Foot worship**: modellen die hun voeten in alle hoeken tonen, masseren en verwennen
- **Footjob shows**: expliciete shows met voeten als centraal element
- **Close-up camera's**: veel voeten-modellen gebruiken extra camera's voor gedetailleerde close-ups
- **Hoge hakken en nylons**: van blote voeten tot stiletto's en kousen — de variatie is eindeloos
- **Interactief**: veel foot fetish modellen laten kijkers kiezen welke schoenen ze dragen of wat ze met hun voeten doen

Foot fetish is op Chaturbate en Stripchat een van de meest gebruikte tags. Op StartVagina filteren we op voeten-gerelateerde tags zodat je snel alle beschikbare foot fetish modellen vindt — van subtiel tot expliciet.`,
    faq: [
      { q: "Is foot fetish populair op cam sites?", a: "Ja, feet/voeten is een van de meest gezochte categorieën. Op Chaturbate staat het consequent in de top 10 van meest gebruikte tags." },
      { q: "Welke cam sites zijn het best voor foot fetish?", a: "Chaturbate en Stripchat hebben het grootste aanbod foot fetish modellen. Stripchat biedt specifieke filters voor deze categorie." },
    ],
    matchTags: ["feet", "foot", "foot fetish", "footjob"],
  },

  "webcamsex-outdoor": {
    slug: "webcamsex-outdoor",
    label: "Outdoor",
    emoji: "🌳",
    title: "Webcamsex Outdoor — Buiten Cam Shows Live | StartVagina",
    h1: "Webcamsex Outdoor — Live Buiten Shows",
    description:
      "Outdoor webcamsex met cam girls die buiten streamen. Gratis buitensex cam shows in tuinen, balkons, stranden en meer. Exhibitionisme op z'n best.",
    keywords:
      "outdoor webcamsex, buiten cam, outdoor cam girls, exhibitionist cam, public webcam, buiten sex cam, tuin webcam, balkon cam",
    content: `Outdoor webcamsex brengt de opwinding van **exhibitionisme** naar je scherm. Cam modellen die durven te streamen vanuit hun tuin, op het balkon, bij het zwembad of zelfs op openbare plekken — de spanning van betrapt kunnen worden maakt het extra pikant.

**De thrill van outdoor cams:**
- **Exhibitionisme**: de spanning van buiten naakt zijn terwijl buren of voorbijgangers mee kunnen kijken
- **Natuurlijk licht**: buitenshows hebben een unieke, flatterende belichting die je in de slaapkamer niet krijgt
- **Spontaniteit**: outdoor shows voelen minder gepland en meer avontuurlijk
- **Seizoensgebonden**: in de zomermaanden explodeert het aanbod outdoor cam shows — tuinen, balkons en stranden worden podia
- **Locatie-variatie**: van luxe zwembaden in Spanje tot balkons in Amsterdam — elke locatie brengt een eigen sfeer

Let op: outdoor cams zijn afhankelijk van weer en seizoen. In de zomer is het aanbod het grootst. Via StartVagina filter je op outdoor-tags en ontdek je welke modellen nu buiten aan het streamen zijn.`,
    faq: [
      { q: "Wanneer zijn de meeste outdoor cam shows?", a: "In de Europese zomermaanden (juni-september) is het aanbod het grootst. Door het tijdsverschil vind je ook in de winter outdoor shows van modellen in warmere landen." },
      { q: "Is outdoor cammen legaal?", a: "Cam platforms hebben regels over streamen op openbare plekken. De meeste outdoor shows vinden plaats in privé-tuinen, op balkons of bij privé-zwembaden." },
    ],
    matchTags: ["outdoor", "outside", "public", "exhib", "voyeur", "garden", "pool", "beach", "balcon"],
  },

  "webcamsex-mobiel": {
    slug: "webcamsex-mobiel",
    label: "Mobiel",
    emoji: "📱",
    title: "Mobiele Webcamsex — Cam Girls op Telefoon | StartVagina",
    h1: "Mobiele Webcamsex — Cam Girls op de Telefoon",
    description:
      "Mobiele webcamsex met cam girls die streamen vanaf hun telefoon. Gratis mobile cam shows — spontaan, intiem en overal. Webcamsex onderweg.",
    keywords:
      "mobiele webcamsex, mobile cam, telefoon webcam, webcamsex mobiel, mobile cam girls, smartphone cam, webcamsex onderweg",
    content: `Mobiele cams zijn een **groeiend fenomeen** in de webcamsex-wereld. Steeds meer cam modellen streamen vanaf hun smartphone in plaats van een vaste camera-setup. Het resultaat? **Spontane, intieme en ongeregisseerde** shows die voelen alsof je een videocall hebt met het model.

**Wat mobile cams anders maakt:**
- **Spontaniteit**: modellen pakken hun telefoon en gaan live — vanuit bed, de badkamer, onderweg of zelfs op vakantie
- **Intimiteit**: de handheld camera creëert een persoonlijk, bijna privé gevoel
- **Beweging**: mobiele modellen zijn niet gebonden aan hun bureau — ze kunnen rondlopen, van locatie wisselen en verrassen
- **Lage drempel**: veel nieuwe modellen beginnen met hun telefoon, wat zorgt voor verse gezichten die je nergens anders ziet
- **Overal en altijd**: mobiel streamen betekent dat modellen live kunnen gaan wanneer de inspiratie toeslaat

Op StartVagina filter je op mobiele cam shows en ontdek je modellen die nu live zijn op hun telefoon. Het voelt anders dan traditionele webcamsex — persoonlijker, spontaner en rauwer.`,
    faq: [
      { q: "Wat is het verschil tussen mobiele en reguliere cam shows?", a: "Mobiele shows worden gestreamd vanaf een smartphone. De beeldkwaliteit kan iets minder zijn, maar de spontaniteit en intimiteit zijn juist groter. Het voelt als een persoonlijke videocall." },
      { q: "Kan ik webcamsex kijken op mijn mobiel?", a: "Ja! Alle cam platforms en StartVagina werken volledig op mobiele browsers. Je kunt altijd en overal webcamsex kijken op je smartphone of tablet." },
    ],
    matchTags: ["mobile"],
    matchMobile: true,
  },
};

const CategoryLanding = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "");
  const config = categoryPages[slug || ""];
  const { allCams, isLoading } = useAllCams();

  const categoryCams = useMemo(() => {
    if (!config || !allCams.length) return [];
    return allCams
      .filter((m) => matchesCategory(m, config))
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
            <div
              className="text-muted-foreground max-w-3xl leading-relaxed space-y-3 [&>p]:mb-3 [&_strong]:text-foreground [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{
                __html: "<p>" + renderContent(config.content) + "</p>",
              }}
            />
          </section>

          {isLoading ? (
            <LoadingBar />
          ) : (
            <CamGrid
              title={`${config.emoji} ${config.label} — ${categoryCams.length} modellen online`}
              models={categoryCams}
              totalOnline={categoryCams.length}
              isLoading={isLoading}
            />
          )}

          {/* FAQ Section */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Veelgestelde vragen — {config.label}
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

          {/* Cross-links */}
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Meer categorieën op StartVagina
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.values(categoryPages)
                .filter((c) => c.slug !== config.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/${c.slug}`}
                    className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
                  >
                    {c.emoji} {c.label}
                  </Link>
                ))}
              <Link
                to="/categories"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Alle Categorieën
              </Link>
              <Link
                to="/webcamsex"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Webcamsex
              </Link>
              <Link
                to="/live-sex-cams"
                className="text-sm bg-secondary text-muted-foreground px-3 py-1.5 rounded hover:text-foreground transition-colors"
              >
                Live Sex Cams
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default CategoryLanding;
