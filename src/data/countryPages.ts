import type { Language } from "@/i18n/translations";

export interface CountryLangConfig {
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

type CountryLangs = Record<Language, CountryLangConfig>;

function c(slug: string, flag: string, nl: Omit<CountryLangConfig,"slug"|"flag">, en: typeof nl, fr: typeof nl, de: typeof nl, es: typeof nl, it: typeof nl): CountryLangs {
  const w = (d: typeof nl): CountryLangConfig => ({ slug, flag, ...d });
  return { nl: w(nl), en: w(en), fr: w(fr), de: w(de), es: w(es), it: w(it) };
}

export const countryPagesI18n: Record<string, CountryLangs> = {

"nederlandse-cam-girls": c("nederlandse-cam-girls", "🇳🇱",
  { country: "Nederland", title: "Webcamsex Nederland — Nederlandse Cam Girls Live | StartVagina", h1: "Webcamsex Nederland — Nederlandse Cam Girls Live", description: "Nederlandse cam girls live op webcam. Gratis webcamsex met modellen uit Nederland.", keywords: "webcamsex nederland, nederlandse cam girls",
    content: `Nederland heeft een enorm actieve cam-community. Vooral op **CAM4** vind je veel Nederlandse cam girls en koppels.\n\n**Waarom Nederlandse cams zo populair zijn:**\n- **CAM4 is de Nederlandse favoriet**: nergens zoveel Nederlandse modellen\n- **Echte amateurs**: geen professionele modellen maar echte mensen\n- **Koppels uit Nederland**: veel koppels die samen live gaan\n- **Directe communicatie**: open en eerlijke cam shows`,
    faq: [{ q: "Op welk platform vind ik de meeste Nederlandse cam girls?", a: "CAM4 is verreweg het populairst. Ook Chaturbate en Stripchat hebben Nederlandse modellen." }, { q: "Zijn er ook Nederlandse cam koppels?", a: "Ja! Nederland heeft een van de grootste aantallen cam koppels, vooral op CAM4." }] },
  { country: "Netherlands", title: "Webcam Sex Netherlands — Dutch Cam Girls Live | StartVagina", h1: "Webcam Sex Netherlands — Dutch Cam Girls Live", description: "Dutch cam girls live on webcam. Free webcam sex with models from the Netherlands.", keywords: "webcam sex netherlands, dutch cam girls",
    content: `The Netherlands has an enormously active cam community. Especially on **CAM4** you'll find many Dutch cam girls and couples.\n\n**Why Dutch cams are so popular:**\n- **CAM4 is the Dutch favourite**: nowhere more Dutch models\n- **Real amateurs**: genuine people, not professional models\n- **Dutch couples**: many couples who go live together\n- **Direct communication**: open and honest cam shows`,
    faq: [{ q: "Which platform has the most Dutch cam girls?", a: "CAM4 is by far the most popular. Chaturbate and Stripchat also have Dutch models." }, { q: "Are there Dutch cam couples?", a: "Yes! The Netherlands has one of the largest numbers of cam couples, especially on CAM4." }] },
  { country: "Pays-Bas", title: "Webcam Sexe Pays-Bas — Cam Girls Néerlandaises en Direct | StartVagina", h1: "Webcam Sexe Pays-Bas — Cam Girls Néerlandaises", description: "Cam girls néerlandaises en direct. Webcam sexe gratuit avec des modèles des Pays-Bas.", keywords: "webcam sexe pays-bas, cam girls néerlandaises",
    content: `Les Pays-Bas ont une communauté cam extrêmement active. Sur **CAM4** vous trouverez beaucoup de cam girls et couples néerlandais.\n\n**Pourquoi les cams néerlandaises sont populaires :**\n- **CAM4 est le favori néerlandais**\n- **Vrais amateurs** : des gens authentiques\n- **Couples néerlandais** : beaucoup diffusent ensemble\n- **Communication directe** : shows ouverts et honnêtes`,
    faq: [{ q: "Où trouver des cam girls néerlandaises ?", a: "CAM4 est de loin le plus populaire. Chaturbate et Stripchat en ont aussi." }, { q: "Y a-t-il des couples cam néerlandais ?", a: "Oui ! Les Pays-Bas ont un grand nombre de couples cam, surtout sur CAM4." }] },
  { country: "Niederlande", title: "Webcam Sex Niederlande — Niederländische Cam Girls Live | StartVagina", h1: "Webcam Sex Niederlande — Niederländische Cam Girls", description: "Niederländische Cam Girls live auf Webcam. Gratis Webcam Sex mit Models aus den Niederlanden.", keywords: "webcam sex niederlande, niederländische cam girls",
    content: `Die Niederlande haben eine äußerst aktive Cam-Community. Besonders auf **CAM4** findest du viele niederländische Cam Girls und Paare.\n\n**Warum niederländische Cams so beliebt sind:**\n- **CAM4 ist der niederländische Favorit**\n- **Echte Amateure**: authentische Menschen\n- **Niederländische Paare**: viele gehen zusammen live\n- **Direkte Kommunikation**: offene und ehrliche Shows`,
    faq: [{ q: "Wo finde ich niederländische Cam Girls?", a: "CAM4 ist mit Abstand am beliebtesten. Chaturbate und Stripchat haben auch niederländische Models." }, { q: "Gibt es niederländische Cam Paare?", a: "Ja! Die Niederlande haben sehr viele Cam Paare, besonders auf CAM4." }] },
  { country: "Países Bajos", title: "Webcam Sexo Países Bajos — Cam Girls Holandesas en Vivo | StartVagina", h1: "Webcam Sexo Países Bajos — Cam Girls Holandesas", description: "Cam girls holandesas en vivo. Webcam sexo gratis con modelos de los Países Bajos.", keywords: "webcam sexo países bajos, cam girls holandesas",
    content: `Los Países Bajos tienen una comunidad cam extremadamente activa. En **CAM4** encontrarás muchas cam girls y parejas holandesas.\n\n**Por qué las cams holandesas son populares:**\n- **CAM4 es el favorito holandés**\n- **Amateurs reales**: personas auténticas\n- **Parejas holandesas**: muchas transmiten juntas\n- **Comunicación directa**: shows abiertos y honestos`,
    faq: [{ q: "¿Dónde encuentro cam girls holandesas?", a: "CAM4 es con diferencia el más popular. Chaturbate y Stripchat también tienen." }, { q: "¿Hay parejas cam holandesas?", a: "¡Sí! Los Países Bajos tienen muchas parejas cam, especialmente en CAM4." }] },
  { country: "Paesi Bassi", title: "Webcam Sex Paesi Bassi — Cam Girl Olandesi dal Vivo | StartVagina", h1: "Webcam Sex Paesi Bassi — Cam Girl Olandesi", description: "Cam girl olandesi in diretta. Webcam sex gratis con modelle dai Paesi Bassi.", keywords: "webcam sex paesi bassi, cam girl olandesi",
    content: `I Paesi Bassi hanno una comunità cam estremamente attiva. Su **CAM4** trovi molte cam girl e coppie olandesi.\n\n**Perché le cam olandesi sono popolari:**\n- **CAM4 è il favorito olandese**\n- **Amatori reali**: persone autentiche\n- **Coppie olandesi**: molte trasmettono insieme\n- **Comunicazione diretta**: show aperti e onesti`,
    faq: [{ q: "Dove trovo cam girl olandesi?", a: "CAM4 è di gran lunga il più popolare. Chaturbate e Stripchat ne hanno anche." }, { q: "Ci sono coppie cam olandesi?", a: "Sì! I Paesi Bassi hanno molte coppie cam, specialmente su CAM4." }] },
),

"belgische-cam-girls": c("belgische-cam-girls", "🇧🇪",
  { country: "België", title: "Webcamsex België — Belgische Cam Girls Live | StartVagina", h1: "Webcamsex België — Belgische Cam Girls Live", description: "Belgische cam girls live op webcam. Gratis webcamsex met Vlaamse en Waalse modellen.", keywords: "webcamsex belgie, belgische cam girls",
    content: `België levert verrassend veel cam modellen — zowel **Vlaamse als Waalse**. CAM4 en BongaCams zijn de populairste platforms.\n\n- **Vlaams-Nederlandse connection**: Vlaamse cam girls spreken Nederlands\n- **CAM4 en BongaCams**: meeste Belgische modellen\n- **Koppels**: net als Nederland veel koppels samen live`,
    faq: [{ q: "Spreken Belgische cam girls Nederlands?", a: "Vlaamse modellen spreken Nederlands, Waalse modellen Frans." }, { q: "Waar vind ik Belgische cam modellen?", a: "CAM4 en BongaCams hebben de meeste Belgische cam girls." }] },
  { country: "Belgium", title: "Webcam Sex Belgium — Belgian Cam Girls Live | StartVagina", h1: "Webcam Sex Belgium — Belgian Cam Girls Live", description: "Belgian cam girls live on webcam. Free webcam sex with Flemish and Walloon models.", keywords: "webcam sex belgium, belgian cam girls",
    content: `Belgium produces a surprising number of cam models — both **Flemish and Walloon**. CAM4 and BongaCams are the most popular platforms.\n\n- **Flemish-Dutch connection**: Flemish cam girls speak Dutch\n- **CAM4 and BongaCams**: most Belgian models\n- **Couples**: like the Netherlands, many couples go live together`,
    faq: [{ q: "Do Belgian cam girls speak Dutch?", a: "Flemish models speak Dutch, Walloon models speak French." }, { q: "Where to find Belgian cam models?", a: "CAM4 and BongaCams have the most Belgian cam girls." }] },
  { country: "Belgique", title: "Webcam Sexe Belgique — Cam Girls Belges en Direct | StartVagina", h1: "Webcam Sexe Belgique — Cam Girls Belges", description: "Cam girls belges en direct. Webcam sexe gratuit avec des modèles flamandes et wallonnes.", keywords: "webcam sexe belgique, cam girls belges",
    content: `La Belgique produit un nombre surprenant de modèles cam — **flamandes et wallonnes**. CAM4 et BongaCams sont les plus populaires.\n\n- **Connexion flamande-néerlandaise** : les cam girls flamandes parlent néerlandais\n- **CAM4 et BongaCams** : le plus de modèles belges\n- **Couples** : beaucoup diffusent ensemble`,
    faq: [{ q: "Les cam girls belges parlent-elles français ?", a: "Les modèles wallonnes parlent français, les flamandes néerlandais." }, { q: "Où trouver des cam girls belges ?", a: "CAM4 et BongaCams ont le plus de cam girls belges." }] },
  { country: "Belgien", title: "Webcam Sex Belgien — Belgische Cam Girls Live | StartVagina", h1: "Webcam Sex Belgien — Belgische Cam Girls", description: "Belgische Cam Girls live. Gratis Webcam Sex mit flämischen und wallonischen Models.", keywords: "webcam sex belgien, belgische cam girls",
    content: `Belgien liefert überraschend viele Cam Models — **flämische und wallonische**. CAM4 und BongaCams sind am beliebtesten.\n\n- **Flämisch-niederländische Verbindung**: Flämische Cam Girls sprechen Niederländisch\n- **CAM4 und BongaCams**: die meisten belgischen Models\n- **Paare**: wie in den Niederlanden gehen viele Paare zusammen live`,
    faq: [{ q: "Sprechen belgische Cam Girls Niederländisch?", a: "Flämische Models sprechen Niederländisch, wallonische Französisch." }, { q: "Wo finde ich belgische Cam Girls?", a: "CAM4 und BongaCams haben die meisten." }] },
  { country: "Bélgica", title: "Webcam Sexo Bélgica — Cam Girls Belgas en Vivo | StartVagina", h1: "Webcam Sexo Bélgica — Cam Girls Belgas", description: "Cam girls belgas en vivo. Webcam sexo gratis con modelos flamencas y valonas.", keywords: "webcam sexo bélgica, cam girls belgas",
    content: `Bélgica produce un número sorprendente de modelos cam — **flamencas y valonas**. CAM4 y BongaCams son los más populares.\n\n- **Conexión flamenca-holandesa**: las cam girls flamencas hablan holandés\n- **CAM4 y BongaCams**: más modelos belgas\n- **Parejas**: muchas transmiten juntas`,
    faq: [{ q: "¿Las cam girls belgas hablan holandés?", a: "Las flamencas hablan holandés, las valonas francés." }, { q: "¿Dónde encontrar cam girls belgas?", a: "CAM4 y BongaCams tienen las más." }] },
  { country: "Belgio", title: "Webcam Sex Belgio — Cam Girl Belghe dal Vivo | StartVagina", h1: "Webcam Sex Belgio — Cam Girl Belghe", description: "Cam girl belghe in diretta. Webcam sex gratis con modelle fiamminghe e vallone.", keywords: "webcam sex belgio, cam girl belghe",
    content: `Il Belgio produce un numero sorprendente di modelle cam — **fiamminghe e vallone**. CAM4 e BongaCams sono i più popolari.\n\n- **Connessione fiamminga-olandese**: le cam girl fiamminghe parlano olandese\n- **CAM4 e BongaCams**: più modelle belghe\n- **Coppie**: molte trasmettono insieme`,
    faq: [{ q: "Le cam girl belghe parlano olandese?", a: "Le fiamminghe parlano olandese, le vallone francese." }, { q: "Dove trovo cam girl belghe?", a: "CAM4 e BongaCams ne hanno di più." }] },
),

"colombiaanse-cam-girls": c("colombiaanse-cam-girls", "🇨🇴",
  { country: "Colombia", title: "Webcamsex Colombia — Colombiaanse Cam Girls Live | StartVagina", h1: "Webcamsex Colombia — Colombiaanse Cam Girls Live", description: "Colombiaanse cam girls live. Colombia is de cam-hoofdstad van de wereld.", keywords: "webcamsex colombia, colombiaanse cam girls",
    content: `Colombia is de **cam-hoofdstad van de wereld**. Duizenden Colombiaanse vrouwen streamen dagelijks.\n\n- **Grootste aanbod**: meer cam models dan welk land ook\n- **Chaturbate dominant**: de meeste Colombiaanse modellen zitten op Chaturbate\n- **Passie en energie**: bekendstaan om hun enthousiasme\n- **Betaalbaar**: tips gaan ver door het koopkrachtverschil`,
    faq: [{ q: "Waarom komen zoveel cam girls uit Colombia?", a: "Colombia heeft de hoogste concentratie cam modellen ter wereld. De combinatie van internetontwikkeling en economische mogelijkheden maakt het tot cam-hoofdstad." }] },
  { country: "Colombia", title: "Webcam Sex Colombia — Colombian Cam Girls Live | StartVagina", h1: "Webcam Sex Colombia — Colombian Cam Girls Live", description: "Colombian cam girls live. Colombia is the cam capital of the world.", keywords: "webcam sex colombia, colombian cam girls",
    content: `Colombia is the **cam capital of the world**. Thousands of Colombian women stream daily.\n\n- **Largest selection**: more cam models than any other country\n- **Chaturbate dominant**: most Colombian models are on Chaturbate\n- **Passion and energy**: known for their enthusiasm\n- **Affordable**: tips go far due to purchasing power difference`,
    faq: [{ q: "Why do so many cam girls come from Colombia?", a: "Colombia has the highest concentration of cam models in the world. The combination of internet development and economic opportunity makes it the cam capital." }] },
  { country: "Colombie", title: "Webcam Sexe Colombie — Cam Girls Colombiennes en Direct | StartVagina", h1: "Webcam Sexe Colombie — Cam Girls Colombiennes", description: "Cam girls colombiennes en direct. La Colombie est la capitale mondiale des cams.", keywords: "webcam sexe colombie, cam girls colombiennes",
    content: `La Colombie est la **capitale mondiale des cams**. Des milliers de Colombiennes diffusent quotidiennement.\n\n- **Plus grande sélection** : plus de modèles cam que tout autre pays\n- **Chaturbate dominant** : la plupart des modèles colombiennes sont sur Chaturbate\n- **Passion et énergie** : connues pour leur enthousiasme\n- **Abordable** : les pourboires vont loin`,
    faq: [{ q: "Pourquoi tant de cam girls viennent de Colombie ?", a: "La Colombie a la plus haute concentration de modèles cam au monde." }] },
  { country: "Kolumbien", title: "Webcam Sex Kolumbien — Kolumbianische Cam Girls Live | StartVagina", h1: "Webcam Sex Kolumbien — Kolumbianische Cam Girls", description: "Kolumbianische Cam Girls live. Kolumbien ist die Cam-Hauptstadt der Welt.", keywords: "webcam sex kolumbien, kolumbianische cam girls",
    content: `Kolumbien ist die **Cam-Hauptstadt der Welt**. Tausende Kolumbianerinnen streamen täglich.\n\n- **Größtes Angebot**: mehr Cam Models als jedes andere Land\n- **Chaturbate dominant**: die meisten kolumbianischen Models sind auf Chaturbate\n- **Leidenschaft und Energie**: bekannt für Begeisterung\n- **Günstig**: Tipps gehen weit durch Kaufkraftunterschiede`,
    faq: [{ q: "Warum kommen so viele Cam Girls aus Kolumbien?", a: "Kolumbien hat die höchste Konzentration an Cam Models weltweit." }] },
  { country: "Colombia", title: "Webcam Sexo Colombia — Cam Girls Colombianas en Vivo | StartVagina", h1: "Webcam Sexo Colombia — Cam Girls Colombianas", description: "Cam girls colombianas en vivo. Colombia es la capital mundial de las cams.", keywords: "webcam sexo colombia, cam girls colombianas",
    content: `Colombia es la **capital mundial de las cams**. Miles de colombianas transmiten diariamente.\n\n- **Mayor selección**: más modelos cam que cualquier otro país\n- **Chaturbate dominante**: la mayoría están en Chaturbate\n- **Pasión y energía**: conocidas por su entusiasmo\n- **Asequible**: las propinas rinden mucho por diferencia de poder adquisitivo`,
    faq: [{ q: "¿Por qué tantas cam girls vienen de Colombia?", a: "Colombia tiene la mayor concentración de modelos cam del mundo." }] },
  { country: "Colombia", title: "Webcam Sex Colombia — Cam Girl Colombiane dal Vivo | StartVagina", h1: "Webcam Sex Colombia — Cam Girl Colombiane", description: "Cam girl colombiane in diretta. La Colombia è la capitale mondiale delle cam.", keywords: "webcam sex colombia, cam girl colombiane",
    content: `La Colombia è la **capitale mondiale delle cam**. Migliaia di colombiane trasmettono ogni giorno.\n\n- **Più grande selezione**: più modelle cam di qualsiasi altro paese\n- **Chaturbate dominante**: la maggior parte sono su Chaturbate\n- **Passione ed energia**: note per il loro entusiasmo\n- **Accessibile**: le mance rendono molto per differenza di potere d'acquisto`,
    faq: [{ q: "Perché così tante cam girl vengono dalla Colombia?", a: "La Colombia ha la più alta concentrazione di modelle cam al mondo." }] },
),

};

// Remaining countries with compact translated data
const remainingCountries: Array<{slug: string; flag: string; nl: string; en: string; fr: string; de: string; es: string; it: string; nlA: string; enA: string; frA: string; deA: string; esA: string; itA: string; platform: string}> = [
  { slug: "duitse-cam-girls", flag: "🇩🇪", nl: "Duitsland", en: "Germany", fr: "Allemagne", de: "Deutschland", es: "Alemania", it: "Germania", nlA: "Duitse", enA: "German", frA: "allemandes", deA: "deutsche", esA: "alemanas", itA: "tedesche", platform: "Stripchat en BongaCams" },
  { slug: "roemeense-cam-girls", flag: "🇷🇴", nl: "Roemenië", en: "Romania", fr: "Roumanie", de: "Rumänien", es: "Rumanía", it: "Romania", nlA: "Roemeense", enA: "Romanian", frA: "roumaines", deA: "rumänische", esA: "rumanas", itA: "rumene", platform: "BongaCams en Stripchat" },
  { slug: "italiaanse-cam-girls", flag: "🇮🇹", nl: "Italië", en: "Italy", fr: "Italie", de: "Italien", es: "Italia", it: "Italia", nlA: "Italiaanse", enA: "Italian", frA: "italiennes", deA: "italienische", esA: "italianas", itA: "italiane", platform: "XCams en BongaCams" },
  { slug: "spaanse-cam-girls", flag: "🇪🇸", nl: "Spanje", en: "Spain", fr: "Espagne", de: "Spanien", es: "España", it: "Spagna", nlA: "Spaanse", enA: "Spanish", frA: "espagnoles", deA: "spanische", esA: "españolas", itA: "spagnole", platform: "Stripchat en Chaturbate" },
  { slug: "franse-cam-girls", flag: "🇫🇷", nl: "Frankrijk", en: "France", fr: "France", de: "Frankreich", es: "Francia", it: "Francia", nlA: "Franse", enA: "French", frA: "françaises", deA: "französische", esA: "francesas", itA: "francesi", platform: "XCams en Chaturbate" },
  { slug: "britse-cam-girls", flag: "🇬🇧", nl: "VK", en: "United Kingdom", fr: "Royaume-Uni", de: "Vereinigtes Königreich", es: "Reino Unido", it: "Regno Unito", nlA: "Britse", enA: "British", frA: "britanniques", deA: "britische", esA: "británicas", itA: "britanniche", platform: "Chaturbate en Stripchat" },
  { slug: "amerikaanse-cam-girls", flag: "🇺🇸", nl: "VS", en: "United States", fr: "États-Unis", de: "USA", es: "Estados Unidos", it: "Stati Uniti", nlA: "Amerikaanse", enA: "American", frA: "américaines", deA: "amerikanische", esA: "americanas", itA: "americane", platform: "Chaturbate en Stripchat" },
  { slug: "russische-cam-girls", flag: "🇷🇺", nl: "Rusland", en: "Russia", fr: "Russie", de: "Russland", es: "Rusia", it: "Russia", nlA: "Russische", enA: "Russian", frA: "russes", deA: "russische", esA: "rusas", itA: "russe", platform: "BongaCams en Stripchat" },
  { slug: "oekraiense-cam-girls", flag: "🇺🇦", nl: "Oekraïne", en: "Ukraine", fr: "Ukraine", de: "Ukraine", es: "Ucrania", it: "Ucraina", nlA: "Oekraïense", enA: "Ukrainian", frA: "ukrainiennes", deA: "ukrainische", esA: "ucranianas", itA: "ucraine", platform: "BongaCams en Stripchat" },
  { slug: "braziliaanse-cam-girls", flag: "🇧🇷", nl: "Brazilië", en: "Brazil", fr: "Brésil", de: "Brasilien", es: "Brasil", it: "Brasile", nlA: "Braziliaanse", enA: "Brazilian", frA: "brésiliennes", deA: "brasilianische", esA: "brasileñas", itA: "brasiliane", platform: "Chaturbate en Stripchat" },
  { slug: "japanse-cam-girls", flag: "🇯🇵", nl: "Japan", en: "Japan", fr: "Japon", de: "Japan", es: "Japón", it: "Giappone", nlA: "Japanse", enA: "Japanese", frA: "japonaises", deA: "japanische", esA: "japonesas", itA: "giapponesi", platform: "Stripchat" },
  { slug: "poolse-cam-girls", flag: "🇵🇱", nl: "Polen", en: "Poland", fr: "Pologne", de: "Polen", es: "Polonia", it: "Polonia", nlA: "Poolse", enA: "Polish", frA: "polonaises", deA: "polnische", esA: "polacas", itA: "polacche", platform: "BongaCams en Stripchat" },
  { slug: "mexicaanse-cam-girls", flag: "🇲🇽", nl: "Mexico", en: "Mexico", fr: "Mexique", de: "Mexiko", es: "México", it: "Messico", nlA: "Mexicaanse", enA: "Mexican", frA: "mexicaines", deA: "mexikanische", esA: "mexicanas", itA: "messicane", platform: "Chaturbate en Stripchat" },
  { slug: "tsjechische-cam-girls", flag: "🇨🇿", nl: "Tsjechië", en: "Czech Republic", fr: "République tchèque", de: "Tschechien", es: "República Checa", it: "Repubblica Ceca", nlA: "Tsjechische", enA: "Czech", frA: "tchèques", deA: "tschechische", esA: "checas", itA: "ceche", platform: "Stripchat en BongaCams" },
  { slug: "filipijnse-cam-girls", flag: "🇵🇭", nl: "Filipijnen", en: "Philippines", fr: "Philippines", de: "Philippinen", es: "Filipinas", it: "Filippine", nlA: "Filipijnse", enA: "Filipina", frA: "philippines", deA: "philippinische", esA: "filipinas", itA: "filippine", platform: "Chaturbate en Stripchat" },
  { slug: "thaise-cam-girls", flag: "🇹🇭", nl: "Thailand", en: "Thailand", fr: "Thaïlande", de: "Thailand", es: "Tailandia", it: "Thailandia", nlA: "Thaise", enA: "Thai", frA: "thaïlandaises", deA: "thailändische", esA: "tailandesas", itA: "thailandesi", platform: "Chaturbate en Stripchat" },
];

// Generate translations for remaining countries programmatically
const t = {
  nl: {
    ws: "Webcamsex",
    title: (c: string, a: string) => `Webcamsex ${c} — ${a} Cam Girls Live | StartVagina`,
    h1: (c: string, a: string) => `Webcamsex ${c} — ${a} Cam Girls Live`,
    desc: (c: string, a: string) => `${a} cam girls live op webcam. Gratis webcamsex met modellen uit ${c}. Ontdek de beste ${a.toLowerCase()} cam modellen op Chaturbate, Stripchat, BongaCams en meer.`,
    kw: (c: string, a: string) => `webcamsex ${c.toLowerCase()}, ${a.toLowerCase()} cam girls, cam girls ${c.toLowerCase()}, live webcam ${c.toLowerCase()}`,
    content: (c: string, a: string, p: string) => `Op zoek naar **${a.toLowerCase()} cam girls**? Op StartVagina verzamelen we alle live cam modellen uit ${c} op één plek. Of je nu een fan bent van Chaturbate, Stripchat, BongaCams of CAM4 — hier vind je ${a.toLowerCase()} modellen van alle platforms tegelijk, zonder te hoeven switchen.

**Waarom ${a.toLowerCase()} cam girls populair zijn:**
- **${p}**: de platforms met het grootste aanbod ${a.toLowerCase()} modellen
- **Real-time overzicht**: zie direct welke ${a.toLowerCase()} cam girls nu online zijn
- **Gratis kijken**: alle openbare shows zijn zonder registratie te bekijken
- **Vergelijk platforms**: ontdek op welk platform de meeste modellen uit ${c} actief zijn
- **Diverse shows**: van solo en striptease tot interactieve toy-shows en privé sessies

Het aanbod ${a.toLowerCase()} cam modellen varieert per tijdstip. Overdag zijn er andere modellen online dan in de avond, afhankelijk van de tijdzone in ${c}. Via StartVagina zie je altijd wie er nu live is — gefilterd op land, categorie of platform.

**Hoe het werkt op StartVagina:**

StartVagina haalt live data op van alle grote cam platforms. Zodra een ${a.toLowerCase()} model online gaat, verschijnt zij automatisch in ons overzicht. Je kunt direct doorklikken naar het platform van je keuze om gratis mee te kijken of te chatten. Geen account nodig op StartVagina zelf — wij zijn de vergelijker, niet het platform.

Ben je specifiek op zoek naar ${a.toLowerCase()} cam koppels, mannelijke modellen of trans performers uit ${c}? Gebruik de filters op StartVagina om precies te vinden wat je zoekt.`,
    fq1: (c: string, a: string) => `Op welk platform vind ik de meeste ${a.toLowerCase()} cam girls?`,
    fa1: (a: string, p: string) => `${p} hebben het grootste aanbod ${a.toLowerCase()} modellen. Via StartVagina zie je het aanbod van alle platforms tegelijk, zodat je altijd de beste keuze kunt maken.`,
    fq2: (c: string, a: string) => `Zijn ${a.toLowerCase()} cam shows gratis?`,
    fa2: (c: string, a: string) => `Ja! De openbare shows van ${a.toLowerCase()} cam modellen zijn volledig gratis te bekijken zonder registratie. Je betaalt alleen als je tokens stuurt voor tips, verzoeken of een privé show.`,
    fq3: (c: string, a: string) => `Hoe vind ik ${a.toLowerCase()} cam girls op StartVagina?`,
    fa3: (c: string, a: string) => `Op StartVagina kun je filteren op land om ${a.toLowerCase()} modellen te zien. Alle live cam girls uit ${c} worden automatisch getoond zodra ze online gaan op een van de aangesloten platforms.`,
  },
  en: {
    ws: "Webcam Sex",
    title: (c: string, a: string) => `Webcam Sex ${c} — ${a} Cam Girls Live | StartVagina`,
    h1: (c: string, a: string) => `Webcam Sex ${c} — ${a} Cam Girls Live`,
    desc: (c: string, a: string) => `${a} cam girls live on webcam. Free webcam sex with models from ${c}. Discover the best ${a.toLowerCase()} cam models on Chaturbate, Stripchat, BongaCams and more.`,
    kw: (c: string, a: string) => `webcam sex ${c.toLowerCase()}, ${a.toLowerCase()} cam girls, cam girls ${c.toLowerCase()}, live webcam ${c.toLowerCase()}`,
    content: (c: string, a: string, p: string) => `Looking for **${a.toLowerCase()} cam girls**? StartVagina brings together all live cam models from ${c} in one place. Whether you prefer Chaturbate, Stripchat, BongaCams or CAM4 — find ${a.toLowerCase()} models from all platforms at once, without switching between sites.

**Why ${a.toLowerCase()} cam girls are popular:**
- **${p}**: the platforms with the largest selection of ${a.toLowerCase()} models
- **Real-time overview**: see which ${a.toLowerCase()} cam girls are online right now
- **Free to watch**: all public shows are available without registration
- **Compare platforms**: discover which platform has the most active models from ${c}
- **Diverse shows**: from solo and striptease to interactive toy shows and private sessions

The selection of ${a.toLowerCase()} cam models varies by time of day, depending on the timezone in ${c}. With StartVagina, you always see who is currently live — filtered by country, category or platform.

**How StartVagina works:**

StartVagina fetches live data from all major cam platforms. As soon as a ${a.toLowerCase()} model goes online, she automatically appears in our overview. Click through directly to the platform of your choice to watch or chat for free. No account needed on StartVagina — we are the comparison site, not the platform itself.`,
    fq1: (c: string, a: string) => `Which platform has the most ${a.toLowerCase()} cam girls?`,
    fa1: (a: string, p: string) => `${p} have the largest selection of ${a.toLowerCase()} models. StartVagina shows models from all platforms at once, so you can always find the best option.`,
    fq2: (c: string, a: string) => `Are ${a.toLowerCase()} cam shows free?`,
    fa2: (c: string, a: string) => `Yes! Public shows by ${a.toLowerCase()} cam models are completely free to watch without registration. You only pay if you send tokens for tips, requests or a private show.`,
    fq3: (c: string, a: string) => `How do I find ${a.toLowerCase()} cam girls on StartVagina?`,
    fa3: (c: string, a: string) => `On StartVagina you can filter by country to find ${a.toLowerCase()} models. All live cam girls from ${c} are automatically shown when they go online on any connected platform.`,
  },
  fr: {
    ws: "Webcam Sexe",
    title: (c: string, a: string) => `Webcam Sexe ${c} — Cam Girls ${a} en Direct | StartVagina`,
    h1: (c: string, a: string) => `Webcam Sexe ${c} — Cam Girls ${a}`,
    desc: (c: string, a: string) => `Cam girls ${a} en direct. Webcam sexe gratuit avec des modèles de ${c}.`,
    kw: (c: string, a: string) => `webcam sexe ${c.toLowerCase()}, cam girls ${a}`,
    content: (c: string, a: string, p: string) => `Découvrez les **cam girls ${a}** en direct sur StartVagina. Les modèles de ${c} sont principalement sur ${p}.

**Pourquoi choisir les cam girls ${a} :**
- **${p}** : les plateformes avec le plus de modèles ${a}
- **En direct** : voyez quelles cam girls ${a} sont en ligne maintenant
- **Gratuit** : tous les shows publics sans inscription
- **Toutes les plateformes** : comparez les modèles de tous les sites cam
- **Shows variés** : du solo au privé en passant par les shows interactifs

StartVagina récupère les données en temps réel de toutes les grandes plateformes. Dès qu'une modèle ${a} se connecte, elle apparaît automatiquement dans notre aperçu.`,
    fq1: (c: string, a: string) => `Où trouver des cam girls ${a} ?`,
    fa1: (a: string, p: string) => `${p} ont la plus grande sélection de modèles ${a}. StartVagina montre les modèles de toutes les plateformes en même temps.`,
    fq2: (c: string, a: string) => `Les shows ${a} sont-ils gratuits ?`,
    fa2: (c: string, a: string) => `Oui ! Les shows publics des modèles ${a} sont entièrement gratuits. Vous ne payez que pour les pourboires ou les shows privés.`,
    fq3: (c: string, a: string) => `Comment trouver des cam girls ${a} ?`,
    fa3: (c: string, a: string) => `Sur StartVagina, filtrez par pays pour trouver les modèles ${a} en direct sur toutes les plateformes.`,
  },
  de: {
    ws: "Webcam Sex",
    title: (c: string, a: string) => `Webcam Sex ${c} — ${a} Cam Girls Live | StartVagina`,
    h1: (c: string, a: string) => `Webcam Sex ${c} — ${a} Cam Girls`,
    desc: (c: string, a: string) => `${a} Cam Girls live auf Webcam. Gratis Webcam Sex mit Models aus ${c}.`,
    kw: (c: string, a: string) => `webcam sex ${c.toLowerCase()}, ${a.toLowerCase()} cam girls`,
    content: (c: string, a: string, p: string) => `Entdecke **${a.toLowerCase()} Cam Girls** live auf StartVagina. Models aus ${c} findest du hauptsächlich auf ${p}.

**Warum ${a.toLowerCase()} Cam Girls beliebt sind:**
- **${p}**: die Plattformen mit den meisten ${a.toLowerCase()} Models
- **Live-Übersicht**: sieh sofort, welche ${a.toLowerCase()} Cam Girls jetzt online sind
- **Gratis schauen**: alle öffentlichen Shows ohne Registrierung
- **Alle Plattformen**: vergleiche Models aller Cam-Seiten auf einen Blick
- **Vielfältige Shows**: von Solo und Striptease bis zu interaktiven Toy-Shows

StartVagina ruft Echtzeit-Daten von allen großen Cam-Plattformen ab. Sobald ein ${a.toLowerCase()} Model online geht, erscheint sie automatisch in unserer Übersicht.`,
    fq1: (c: string, a: string) => `Wo finde ich ${a.toLowerCase()} Cam Girls?`,
    fa1: (a: string, p: string) => `${p} haben die größte Auswahl an ${a.toLowerCase()} Models. StartVagina zeigt Models aller Plattformen gleichzeitig.`,
    fq2: (c: string, a: string) => `Sind ${a.toLowerCase()} Cam Shows kostenlos?`,
    fa2: (c: string, a: string) => `Ja! Öffentliche Shows von ${a.toLowerCase()} Models sind komplett kostenlos. Du zahlst nur für Tipps oder private Shows.`,
    fq3: (c: string, a: string) => `Wie finde ich ${a.toLowerCase()} Cam Girls auf StartVagina?`,
    fa3: (c: string, a: string) => `Auf StartVagina kannst du nach Land filtern, um ${a.toLowerCase()} Models live auf allen Plattformen zu finden.`,
  },
  es: {
    ws: "Webcam Sexo",
    title: (c: string, a: string) => `Webcam Sexo ${c} — Cam Girls ${a} en Vivo | StartVagina`,
    h1: (c: string, a: string) => `Webcam Sexo ${c} — Cam Girls ${a}`,
    desc: (c: string, a: string) => `Cam girls ${a} en vivo. Webcam sexo gratis con modelos de ${c}.`,
    kw: (c: string, a: string) => `webcam sexo ${c.toLowerCase()}, cam girls ${a}`,
    content: (c: string, a: string, p: string) => `Descubre **cam girls ${a}** en vivo en StartVagina. Las modelos de ${c} se encuentran principalmente en ${p}.

**Por qué elegir cam girls ${a}:**
- **${p}**: las plataformas con más modelos ${a}
- **En directo**: ve qué cam girls ${a} están en línea ahora
- **Gratis**: todos los shows públicos sin registro
- **Todas las plataformas**: compara modelos de todos los sitios cam
- **Shows variados**: desde solo hasta shows privados e interactivos

StartVagina obtiene datos en tiempo real de todas las grandes plataformas. Cuando una modelo ${a} se conecta, aparece automáticamente en nuestra vista general.`,
    fq1: (c: string, a: string) => `¿Dónde encuentro cam girls ${a}?`,
    fa1: (a: string, p: string) => `${p} tienen la mayor selección de modelos ${a}. StartVagina muestra modelos de todas las plataformas a la vez.`,
    fq2: (c: string, a: string) => `¿Los shows ${a} son gratis?`,
    fa2: (c: string, a: string) => `¡Sí! Los shows públicos de modelos ${a} son completamente gratis. Solo pagas por propinas o shows privados.`,
    fq3: (c: string, a: string) => `¿Cómo encuentro cam girls ${a} en StartVagina?`,
    fa3: (c: string, a: string) => `En StartVagina puedes filtrar por país para encontrar modelos ${a} en vivo en todas las plataformas.`,
  },
  it: {
    ws: "Webcam Sex",
    title: (c: string, a: string) => `Webcam Sex ${c} — Cam Girl ${a} dal Vivo | StartVagina`,
    h1: (c: string, a: string) => `Webcam Sex ${c} — Cam Girl ${a}`,
    desc: (c: string, a: string) => `Cam girl ${a} in diretta. Webcam sex gratis con modelle da ${c}.`,
    kw: (c: string, a: string) => `webcam sex ${c.toLowerCase()}, cam girl ${a}`,
    content: (c: string, a: string, p: string) => `Scopri le **cam girl ${a}** in diretta su StartVagina. Le modelle da ${c} si trovano principalmente su ${p}.

**Perché scegliere le cam girl ${a}:**
- **${p}**: le piattaforme con più modelle ${a}
- **In diretta**: vedi quali cam girl ${a} sono online ora
- **Gratis**: tutti gli show pubblici senza registrazione
- **Tutte le piattaforme**: confronta modelle di tutti i siti cam
- **Show vari**: dal solo allo striptease fino a show interattivi e privati

StartVagina recupera dati in tempo reale da tutte le grandi piattaforme. Quando una modella ${a} va online, appare automaticamente nella nostra panoramica.`,
    fq1: (c: string, a: string) => `Dove trovo cam girl ${a}?`,
    fa1: (a: string, p: string) => `${p} hanno la più grande selezione di modelle ${a}. StartVagina mostra modelle di tutte le piattaforme contemporaneamente.`,
    fq2: (c: string, a: string) => `Gli show ${a} sono gratuiti?`,
    fa2: (c: string, a: string) => `Sì! Gli show pubblici delle modelle ${a} sono completamente gratuiti. Paghi solo per mance o show privati.`,
    fq3: (c: string, a: string) => `Come trovo cam girl ${a} su StartVagina?`,
    fa3: (c: string, a: string) => `Su StartVagina puoi filtrare per paese per trovare modelle ${a} in diretta su tutte le piattaforme.`,
  },
};

for (const rc of remainingCountries) {
  const langs: Record<string, CountryLangConfig> = {};
  for (const lang of ["nl","en","fr","de","es","it"] as Language[]) {
    const cn = rc[lang]; // country name in this language
    const adj = (rc as any)[`${lang}A`] as string; // adjective
    const tl = t[lang];
    langs[lang] = {
      slug: rc.slug,
      flag: rc.flag,
      country: cn,
      title: tl.title(cn, adj),
      h1: tl.h1(cn, adj),
      description: tl.desc(cn, adj),
      keywords: tl.kw(cn, adj),
      content: tl.content(cn, adj, rc.platform),
      faq: [
        { q: tl.fq1(cn, adj), a: tl.fa1(adj, rc.platform) },
        { q: tl.fq2(cn, adj), a: tl.fa2(cn, adj) },
        { q: tl.fq3(cn, adj), a: tl.fa3(cn, adj) },
      ],
    };
  }
  countryPagesI18n[rc.slug] = langs as CountryLangs;
}

/** Get translated country config */
export function getCountryConfig(slug: string, lang: Language): CountryLangConfig | null {
  const page = countryPagesI18n[slug];
  if (!page) return null;
  return page[lang] || page.nl;
}
