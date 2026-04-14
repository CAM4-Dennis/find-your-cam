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

"webcamsex-nederland": c("webcamsex-nederland", "🇳🇱",
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

"webcamsex-belgie": c("webcamsex-belgie", "🇧🇪",
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

"webcamsex-colombia": c("webcamsex-colombia", "🇨🇴",
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
  { slug: "webcamsex-duitsland", flag: "🇩🇪", nl: "Duitsland", en: "Germany", fr: "Allemagne", de: "Deutschland", es: "Alemania", it: "Germania", nlA: "Duitse", enA: "German", frA: "allemandes", deA: "deutsche", esA: "alemanas", itA: "tedesche", platform: "Stripchat en BongaCams" },
  { slug: "webcamsex-roemenie", flag: "🇷🇴", nl: "Roemenië", en: "Romania", fr: "Roumanie", de: "Rumänien", es: "Rumanía", it: "Romania", nlA: "Roemeense", enA: "Romanian", frA: "roumaines", deA: "rumänische", esA: "rumanas", itA: "rumene", platform: "BongaCams en Stripchat" },
  { slug: "webcamsex-italie", flag: "🇮🇹", nl: "Italië", en: "Italy", fr: "Italie", de: "Italien", es: "Italia", it: "Italia", nlA: "Italiaanse", enA: "Italian", frA: "italiennes", deA: "italienische", esA: "italianas", itA: "italiane", platform: "XCams en BongaCams" },
  { slug: "webcamsex-spanje", flag: "🇪🇸", nl: "Spanje", en: "Spain", fr: "Espagne", de: "Spanien", es: "España", it: "Spagna", nlA: "Spaanse", enA: "Spanish", frA: "espagnoles", deA: "spanische", esA: "españolas", itA: "spagnole", platform: "Stripchat en Chaturbate" },
  { slug: "webcamsex-frankrijk", flag: "🇫🇷", nl: "Frankrijk", en: "France", fr: "France", de: "Frankreich", es: "Francia", it: "Francia", nlA: "Franse", enA: "French", frA: "françaises", deA: "französische", esA: "francesas", itA: "francesi", platform: "XCams en Chaturbate" },
  { slug: "webcamsex-verenigd-koninkrijk", flag: "🇬🇧", nl: "VK", en: "United Kingdom", fr: "Royaume-Uni", de: "Vereinigtes Königreich", es: "Reino Unido", it: "Regno Unito", nlA: "Britse", enA: "British", frA: "britanniques", deA: "britische", esA: "británicas", itA: "britanniche", platform: "Chaturbate en Stripchat" },
  { slug: "webcamsex-verenigde-staten", flag: "🇺🇸", nl: "VS", en: "United States", fr: "États-Unis", de: "USA", es: "Estados Unidos", it: "Stati Uniti", nlA: "Amerikaanse", enA: "American", frA: "américaines", deA: "amerikanische", esA: "americanas", itA: "americane", platform: "Chaturbate en Stripchat" },
  { slug: "webcamsex-rusland", flag: "🇷🇺", nl: "Rusland", en: "Russia", fr: "Russie", de: "Russland", es: "Rusia", it: "Russia", nlA: "Russische", enA: "Russian", frA: "russes", deA: "russische", esA: "rusas", itA: "russe", platform: "BongaCams en Stripchat" },
  { slug: "webcamsex-oekraine", flag: "🇺🇦", nl: "Oekraïne", en: "Ukraine", fr: "Ukraine", de: "Ukraine", es: "Ucrania", it: "Ucraina", nlA: "Oekraïense", enA: "Ukrainian", frA: "ukrainiennes", deA: "ukrainische", esA: "ucranianas", itA: "ucraine", platform: "BongaCams en Stripchat" },
  { slug: "webcamsex-brazilie", flag: "🇧🇷", nl: "Brazilië", en: "Brazil", fr: "Brésil", de: "Brasilien", es: "Brasil", it: "Brasile", nlA: "Braziliaanse", enA: "Brazilian", frA: "brésiliennes", deA: "brasilianische", esA: "brasileñas", itA: "brasiliane", platform: "Chaturbate en Stripchat" },
  { slug: "webcamsex-japan", flag: "🇯🇵", nl: "Japan", en: "Japan", fr: "Japon", de: "Japan", es: "Japón", it: "Giappone", nlA: "Japanse", enA: "Japanese", frA: "japonaises", deA: "japanische", esA: "japonesas", itA: "giapponesi", platform: "Stripchat" },
  { slug: "webcamsex-polen", flag: "🇵🇱", nl: "Polen", en: "Poland", fr: "Pologne", de: "Polen", es: "Polonia", it: "Polonia", nlA: "Poolse", enA: "Polish", frA: "polonaises", deA: "polnische", esA: "polacas", itA: "polacche", platform: "BongaCams en Stripchat" },
  { slug: "webcamsex-mexico", flag: "🇲🇽", nl: "Mexico", en: "Mexico", fr: "Mexique", de: "Mexiko", es: "México", it: "Messico", nlA: "Mexicaanse", enA: "Mexican", frA: "mexicaines", deA: "mexikanische", esA: "mexicanas", itA: "messicane", platform: "Chaturbate en Stripchat" },
  { slug: "webcamsex-tsjechie", flag: "🇨🇿", nl: "Tsjechië", en: "Czech Republic", fr: "République tchèque", de: "Tschechien", es: "República Checa", it: "Repubblica Ceca", nlA: "Tsjechische", enA: "Czech", frA: "tchèques", deA: "tschechische", esA: "checas", itA: "ceche", platform: "Stripchat en BongaCams" },
  { slug: "webcamsex-filipijnen", flag: "🇵🇭", nl: "Filipijnen", en: "Philippines", fr: "Philippines", de: "Philippinen", es: "Filipinas", it: "Filippine", nlA: "Filipijnse", enA: "Filipina", frA: "philippines", deA: "philippinische", esA: "filipinas", itA: "filippine", platform: "Chaturbate en Stripchat" },
  { slug: "webcamsex-thailand", flag: "🇹🇭", nl: "Thailand", en: "Thailand", fr: "Thaïlande", de: "Thailand", es: "Tailandia", it: "Thailandia", nlA: "Thaise", enA: "Thai", frA: "thaïlandaises", deA: "thailändische", esA: "tailandesas", itA: "thailandesi", platform: "Chaturbate en Stripchat" },
];

// Generate translations for remaining countries programmatically
const t = {
  nl: { ws: "Webcamsex", title: (c: string, a: string) => `Webcamsex ${c} — ${a} Cam Girls Live | StartVagina`, h1: (c: string, a: string) => `Webcamsex ${c} — ${a} Cam Girls Live`, desc: (c: string, a: string) => `${a} cam girls live op webcam. Gratis webcamsex met modellen uit ${c}.`, kw: (c: string, a: string) => `webcamsex ${c.toLowerCase()}, ${a.toLowerCase()} cam girls`, content: (c: string, a: string, p: string) => `Ontdek **${a.toLowerCase()} cam girls** live op StartVagina. Modellen uit ${c} zijn vooral te vinden op ${p}.\n\n- **Live modellen**: ${a} cam girls die nu online zijn\n- **Gratis kijken**: alle openbare shows zonder registratie\n- **Alle platforms**: vergelijk modellen van alle cam sites`, fq: (c: string, a: string) => `Op welk platform vind ik ${a.toLowerCase()} cam girls?`, fa: (a: string, p: string) => `${p} hebben het grootste aanbod ${a.toLowerCase()} modellen.` },
  en: { ws: "Webcam Sex", title: (c: string, a: string) => `Webcam Sex ${c} — ${a} Cam Girls Live | StartVagina`, h1: (c: string, a: string) => `Webcam Sex ${c} — ${a} Cam Girls Live`, desc: (c: string, a: string) => `${a} cam girls live on webcam. Free webcam sex with models from ${c}.`, kw: (c: string, a: string) => `webcam sex ${c.toLowerCase()}, ${a.toLowerCase()} cam girls`, content: (c: string, a: string, p: string) => `Discover **${a.toLowerCase()} cam girls** live on StartVagina. Models from ${c} are mainly found on ${p}.\n\n- **Live models**: ${a} cam girls who are online now\n- **Free viewing**: all public shows without registration\n- **All platforms**: compare models from all cam sites`, fq: (c: string, a: string) => `Which platform has the most ${a.toLowerCase()} cam girls?`, fa: (a: string, p: string) => `${p} have the largest selection of ${a.toLowerCase()} models.` },
  fr: { ws: "Webcam Sexe", title: (c: string, a: string) => `Webcam Sexe ${c} — Cam Girls ${a} en Direct | StartVagina`, h1: (c: string, a: string) => `Webcam Sexe ${c} — Cam Girls ${a}`, desc: (c: string, a: string) => `Cam girls ${a} en direct. Webcam sexe gratuit avec des modèles de ${c}.`, kw: (c: string, a: string) => `webcam sexe ${c.toLowerCase()}, cam girls ${a}`, content: (c: string, a: string, p: string) => `Découvrez les **cam girls ${a}** en direct sur StartVagina. Les modèles de ${c} sont principalement sur ${p}.\n\n- **Modèles en direct** : cam girls ${a} en ligne maintenant\n- **Visionnage gratuit** : tous les shows publics sans inscription\n- **Toutes les plateformes** : comparez les modèles`, fq: (c: string, a: string) => `Où trouver des cam girls ${a} ?`, fa: (a: string, p: string) => `${p} ont la plus grande sélection de modèles ${a}.` },
  de: { ws: "Webcam Sex", title: (c: string, a: string) => `Webcam Sex ${c} — ${a} Cam Girls Live | StartVagina`, h1: (c: string, a: string) => `Webcam Sex ${c} — ${a} Cam Girls`, desc: (c: string, a: string) => `${a} Cam Girls live auf Webcam. Gratis Webcam Sex mit Models aus ${c}.`, kw: (c: string, a: string) => `webcam sex ${c.toLowerCase()}, ${a.toLowerCase()} cam girls`, content: (c: string, a: string, p: string) => `Entdecke **${a.toLowerCase()} Cam Girls** live auf StartVagina. Models aus ${c} findest du hauptsächlich auf ${p}.\n\n- **Live Models**: ${a} Cam Girls die jetzt online sind\n- **Gratis schauen**: alle öffentlichen Shows ohne Registrierung\n- **Alle Plattformen**: Models aller Cam-Seiten vergleichen`, fq: (c: string, a: string) => `Wo finde ich ${a.toLowerCase()} Cam Girls?`, fa: (a: string, p: string) => `${p} haben die größte Auswahl an ${a.toLowerCase()} Models.` },
  es: { ws: "Webcam Sexo", title: (c: string, a: string) => `Webcam Sexo ${c} — Cam Girls ${a} en Vivo | StartVagina`, h1: (c: string, a: string) => `Webcam Sexo ${c} — Cam Girls ${a}`, desc: (c: string, a: string) => `Cam girls ${a} en vivo. Webcam sexo gratis con modelos de ${c}.`, kw: (c: string, a: string) => `webcam sexo ${c.toLowerCase()}, cam girls ${a}`, content: (c: string, a: string, p: string) => `Descubre **cam girls ${a}** en vivo en StartVagina. Las modelos de ${c} se encuentran principalmente en ${p}.\n\n- **Modelos en vivo**: cam girls ${a} en línea ahora\n- **Ver gratis**: todos los shows públicos sin registro\n- **Todas las plataformas**: compara modelos de todos los sitios cam`, fq: (c: string, a: string) => `¿Dónde encuentro cam girls ${a}?`, fa: (a: string, p: string) => `${p} tienen la mayor selección de modelos ${a}.` },
  it: { ws: "Webcam Sex", title: (c: string, a: string) => `Webcam Sex ${c} — Cam Girl ${a} dal Vivo | StartVagina`, h1: (c: string, a: string) => `Webcam Sex ${c} — Cam Girl ${a}`, desc: (c: string, a: string) => `Cam girl ${a} in diretta. Webcam sex gratis con modelle da ${c}.`, kw: (c: string, a: string) => `webcam sex ${c.toLowerCase()}, cam girl ${a}`, content: (c: string, a: string, p: string) => `Scopri le **cam girl ${a}** in diretta su StartVagina. Le modelle da ${c} si trovano principalmente su ${p}.\n\n- **Modelle in diretta**: cam girl ${a} online ora\n- **Visione gratuita**: tutti gli show pubblici senza registrazione\n- **Tutte le piattaforme**: confronta modelle di tutti i siti cam`, fq: (c: string, a: string) => `Dove trovo cam girl ${a}?`, fa: (a: string, p: string) => `${p} hanno la più grande selezione di modelle ${a}.` },
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
      faq: [{ q: tl.fq(cn, adj), a: tl.fa(adj, rc.platform) }],
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
