import type { Language } from "@/i18n/translations";

export interface LanguagePageI18n {
  title: string;
  h1: string;
  description: string;
  keywords: string;
  content: string;
  faq: { q: string; a: string }[];
}

export interface LanguagePageConfig {
  slug: string;
  name: string;
  emoji: string;
  aliases: string[];
  i18n: Partial<Record<Language, LanguagePageI18n>>;
}

export const languagePageData: Record<string, LanguagePageConfig> = {
  "webcamsex-in-het-nederlands": {
    slug: "webcamsex-in-het-nederlands",
    name: "Nederlands",
    emoji: "🇳🇱",
    aliases: ["dutch", "nl", "nederlands", "nederlandstalig"],
    i18n: {
      nl: {
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
        faq: [
          { q: "Op welk platform vind ik Nederlandstalige cam girls?", a: "CAM4 heeft verreweg de meeste Nederlandstalige cam modellen. Op Chaturbate en BongaCams vind je er ook, maar minder." },
          { q: "Spreken alle Nederlandse cam girls Nederlands in de chat?", a: "De meeste wel, maar sommige modellen chatten ook in het Engels om een breder publiek te bereiken. Filter op taal om zeker te zijn." },
        ],
      },
      en: {
        title: "Dutch Webcam Sex — Dutch Speaking Cam Girls | StartVagina",
        h1: "Dutch Webcam Sex Chat",
        description: "Dutch speaking cam girls live on webcam. Free webcam sex with models who speak Dutch. Chat in Dutch on CAM4, Chaturbate and more.",
        keywords: "dutch webcam sex, dutch cam girls, dutch speaking cam, webcam sex dutch, nederlandstalige cam girls",
        content: `Webcam sex **without a language barrier** — for Dutch speakers. On StartVagina you'll find all cam models who speak Dutch, from Dutch and Flemish cam girls to Surinamese models. Chat in Dutch for a more personal experience.

**Why Dutch cams are special:**
- **No language barrier**: express exactly what you want in Dutch
- **More personal**: Dutch cam girls understand your humor, culture and hints
- **CAM4 is the place**: the most popular platform for Dutch-speaking cam models
- **Flemish counts too**: Belgian cam girls who speak Dutch are also featured here
- **Direct communication**: Dutch and Flemish people are known for their openness — and you'll notice that in the chat

Whether you're looking for a casual chat or a hot show — Dutch-speaking cam girls offer the best of both worlds.`,
        faq: [
          { q: "Which platform has the most Dutch cam girls?", a: "CAM4 has by far the most Dutch-speaking cam models. You can also find some on Chaturbate and BongaCams." },
        ],
      },
    },
  },

  "english-webcam-sex-chat": {
    slug: "english-webcam-sex-chat",
    name: "English",
    emoji: "🇬🇧",
    aliases: ["english", "en", "eng"],
    i18n: {
      en: {
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
        faq: [
          { q: "Do most cam models speak English?", a: "Yes! English is the most common language on all major cam platforms. Even models from non-English countries often speak basic to fluent English." },
        ],
      },
      nl: {
        title: "Engelstalige Webcamsex — Engelstalige Cam Girls | StartVagina",
        h1: "Webcamsex in het Engels",
        description: "Engelstalige cam girls live op webcam. Gratis webcamsex met modellen die Engels spreken op Chaturbate, Stripchat en meer.",
        keywords: "webcamsex engels, engelstalige cam girls, english cam girls, webcamsex english, cam girls engels spreken",
        content: `Engels is de **universele taal van webcamsex**. De overgrote meerderheid van cam modellen spreekt minstens basis-Engels, waardoor het de makkelijkste taal is om contact te maken. Op StartVagina filteren we alle modellen die Engels spreken — van native speakers tot meertalige schoonheden.

**Waarom Engelstalige cams domineren:**
- **Grootste selectie**: Engelstalige modellen vormen de grootste groep op elk platform
- **Alle platforms**: Chaturbate, Stripchat, BongaCams, CAM4 en XCams hebben enorme Engelstalige communities
- **Native + meertalig**: van Amerikaanse en Britse modellen tot Colombiaanse en Roemeense cam girls die vloeiend Engels spreken
- **Beste interactie**: Engelstalige chatrooms zijn het meest actief en levendig

Of je nu uit Nederland, België of waar dan ook komt — Engelstalige cam shows geven je de breedste keuze en beste interactie.`,
        faq: [
          { q: "Spreken de meeste cam modellen Engels?", a: "Ja! Engels is de meest voorkomende taal op alle grote cam platforms. Zelfs modellen uit niet-Engelstalige landen spreken vaak basis tot vloeiend Engels." },
        ],
      },
    },
  },

  "webcamsex-auf-deutsch": {
    slug: "webcamsex-auf-deutsch",
    name: "Deutsch",
    emoji: "🇩🇪",
    aliases: ["german", "de", "deutsch"],
    i18n: {
      de: {
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
        faq: [
          { q: "Auf welcher Plattform finde ich deutsche Cam Girls?", a: "Stripchat und BongaCams haben die meisten deutschsprachigen Models. Auch auf Chaturbate gibt es eine gute Auswahl." },
        ],
      },
      nl: {
        title: "Duitstalige Webcamsex — Duitse Cam Girls | StartVagina",
        h1: "Webcamsex in het Duits",
        description: "Duitstalige cam girls live op webcam. Gratis webcamsex met modellen die Duits spreken op Stripchat, BongaCams en meer.",
        keywords: "webcamsex duits, duitstalige cam girls, german cam girls, webcamsex auf deutsch, deutsche cam girls, cam girls duits spreken",
        content: `Webcamsex in het Duits — voor iedereen die liever in het **Duits** chat. Op StartVagina vind je alle cam modellen die Duits spreken, van Duitse cam girls tot Oostenrijkse en Zwitserse modellen.

**Duitstalige cams:**
- **Stripchat en BongaCams**: de platforms met de meeste Duitstalige modellen
- **Persoonlijk contact**: in het Duits chatten voelt natuurlijker en directer
- **Grote keuze**: van Berlijn tot Wenen, van professioneel tot amateur
- **Niet alleen moedertaalsprekers**: veel Oost-Europese modellen spreken vloeiend Duits

Geniet van webcamsex zonder taalbarrière — op StartVagina vind je ze allemaal.`,
        faq: [
          { q: "Op welk platform vind ik Duitstalige cam girls?", a: "Stripchat en BongaCams hebben de meeste Duitstalige modellen. Op Chaturbate vind je er ook een goede selectie." },
        ],
      },
    },
  },

  "webcamsex-en-francais": {
    slug: "webcamsex-en-francais",
    name: "Français",
    emoji: "🇫🇷",
    aliases: ["french", "fr", "français", "francais"],
    i18n: {
      fr: {
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
        faq: [
          { q: "Où trouver des cam girls françaises?", a: "XCams est la meilleure plateforme pour les modèles francophones. Chaturbate et Stripchat ont aussi de bonnes sélections." },
        ],
      },
      nl: {
        title: "Franstalige Webcamsex — Franse Cam Girls | StartVagina",
        h1: "Webcamsex in het Frans",
        description: "Franstalige cam girls live op webcam. Gratis webcamsex met modellen die Frans spreken op XCams, Chaturbate en meer.",
        keywords: "webcamsex frans, franstalige cam girls, french cam girls, webcamsex en francais, cam girls frans spreken, franse cam girls",
        content: `Frans is de taal van de liefde — en van **webcamsex**. Op StartVagina vind je alle cam girls die Frans spreken. Van Franse modellen tot Waalse Belgische cam girls, Canadese en Afrikaanse Franstalige modellen.

**Franstalige cams:**
- **XCams**: het platform van Franse oorsprong, met het grootste aantal Franstalige modellen
- **Chaturbate en Stripchat**: ook goede selecties van Franse cam girls
- **Diversiteit**: Frankrijk, België, Canada, Zwitserland, Afrika — het Frans verbindt
- **Intimiteit**: chatten in je moedertaal maakt de ervaring persoonlijker

Ontdek alle Franstalige cam girls op StartVagina.`,
        faq: [
          { q: "Waar vind ik Franstalige cam girls?", a: "XCams is het beste platform voor Franstalige modellen. Chaturbate en Stripchat hebben ook goede selecties." },
        ],
      },
    },
  },

  "webcamsex-en-espanol": {
    slug: "webcamsex-en-espanol",
    name: "Español",
    emoji: "🇪🇸",
    aliases: ["spanish", "es", "español", "espanol"],
    i18n: {
      es: {
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
        faq: [
          { q: "¿Dónde encontrar cam girls que hablen español?", a: "Chaturbate y Stripchat tienen miles de modelos hispanohablantes, principalmente de Colombia, México y España." },
        ],
      },
      nl: {
        title: "Spaanstalige Webcamsex — Spaanse Cam Girls | StartVagina",
        h1: "Webcamsex in het Spaans",
        description: "Spaanstalige cam girls live op webcam. Gratis webcamsex met modellen die Spaans spreken uit Colombia, Spanje, Mexico en meer.",
        keywords: "webcamsex spaans, spaanstalige cam girls, spanish cam girls, webcamsex en espanol, cam girls spaans spreken, spaanse cam girls, latijnse cam girls",
        content: `Spaans is de **op één na meest gesproken taal** in de webcamsex-wereld. Met duizenden modellen uit Colombia, Spanje, Mexico, Venezuela en Argentinië bieden Spaanstalige cams passie, energie en een authentieke connectie.

**Spaanstalige cams:**
- **Colombia leidt**: het land met de meeste cam modellen ter wereld — bijna allemaal spreken ze Spaans
- **Chaturbate en Stripchat**: de platforms met de meeste Spaanstalige modellen
- **Spanje, Mexico, Venezuela, Argentinië**: een enorme diversiteit aan accenten en stijlen
- **Directe communicatie**: praat met de modellen in hun eigen taal voor een persoonlijkere ervaring
- **Intense interactie**: Latijns-Amerikaanse modellen staan bekend om hun energie en interactie met het publiek

Ontdek alle Spaanstalige cam girls op StartVagina.`,
        faq: [
          { q: "Waar vind ik Spaanstalige cam girls?", a: "Chaturbate en Stripchat hebben duizenden Spaanstalige modellen, voornamelijk uit Colombia, Mexico en Spanje." },
        ],
      },
    },
  },

  "webcamsex-in-italiano": {
    slug: "webcamsex-in-italiano",
    name: "Italiano",
    emoji: "🇮🇹",
    aliases: ["italian", "it", "italiano"],
    i18n: {
      it: {
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
        faq: [
          { q: "Dove trovo cam girls italiane?", a: "XCams e BongaCams hanno il maggior numero di modelle italiane. Anche su Chaturbate e Stripchat ne trovi alcune." },
        ],
      },
      nl: {
        title: "Italiaanstalige Webcamsex — Italiaanse Cam Girls | StartVagina",
        h1: "Webcamsex in het Italiaans",
        description: "Italiaanse cam girls live op webcam. Gratis webcamsex met modellen die Italiaans spreken op XCams, BongaCams en meer.",
        keywords: "webcamsex italiaans, italiaanse cam girls, italian cam girls, webcamsex in italiano, cam girls italiaans spreken",
        content: `Webcamsex in het Italiaans biedt een **intieme en persoonlijke** ervaring. Italiaanse cam girls combineren mediterrane schoonheid met temperament en passie. Op StartVagina vind je alle modellen die Italiaans spreken.

**Italiaanstalige cams:**
- **XCams**: Europees platform met veel Italiaanse modellen
- **BongaCams**: goede selectie van cam girls uit Italië
- **Natuurlijke elegantie**: Italiaanse modellen brengen een unieke stijl naar hun shows
- **Communicatie in het Italiaans**: chat in het Italiaans voor een authentiekere ervaring

Ontdek alle Italiaanse cam girls op StartVagina.`,
        faq: [
          { q: "Waar vind ik Italiaanse cam girls?", a: "XCams en BongaCams hebben het grootste aantal Italiaanse modellen. Op Chaturbate en Stripchat vind je er ook enkele." },
        ],
      },
    },
  },

  "webcamsex-em-portugues": {
    slug: "webcamsex-em-portugues",
    name: "Português",
    emoji: "🇵🇹",
    aliases: ["portuguese", "pt", "português", "portugues"],
    i18n: {
      nl: {
        title: "Portugeestalige Webcamsex — Braziliaanse Cam Girls | StartVagina",
        h1: "Webcamsex in het Portugees",
        description: "Portugees sprekende cam girls live op webcam. Gratis webcamsex met Braziliaanse en Portugese modellen op Chaturbate, Stripchat en meer.",
        keywords: "webcamsex portugees, braziliaanse cam girls, portuguese cam girls, webcamsex em portugues, cam girls portugal, brasileiras cam",
        content: `Portugees is de taal van de **Braziliaanse cam girls** — de op één na grootste Latijns-Amerikaanse groep in de webcamsex-wereld. Met energie, curves en vriendelijkheid bieden Portugeestalige modellen een unieke ervaring.

**Portugeestalige cams:**
- **Brazilië domineert**: duizenden Braziliaanse cam girls dagelijks online
- **Chaturbate en Stripchat**: de platforms met de meeste Braziliaanse modellen
- **Energie en spontaniteit**: Braziliaanse shows zijn levendig en interactief
- **Portugal ook**: Portugese modellen brengen een verfijnde Europese stijl

Ontdek alle Portugees sprekende cam modellen op StartVagina.`,
        faq: [
          { q: "Waar vind ik Braziliaanse cam girls?", a: "Chaturbate en Stripchat hebben de grootste selectie Braziliaanse modellen. Velen spreken Portugees en Engels." },
        ],
      },
      en: {
        title: "Portuguese Webcam Sex — Brazilian Cam Girls Live | StartVagina",
        h1: "Portuguese Webcam Sex",
        description: "Portuguese speaking cam girls live on webcam. Free webcam sex with Brazilian and Portuguese models on Chaturbate, Stripchat and more.",
        keywords: "portuguese webcam sex, brazilian cam girls, portuguese cam girls, webcam sex portuguese, brasileiras cam, cam girls brazil",
        content: `Portuguese is the language of **Brazilian cam girls** — the second-largest Latin group in the global webcam sex world. With energy, curves and charm, Portuguese-speaking models offer a unique experience.

**Portuguese-speaking cams:**
- **Brazil dominates**: thousands of Brazilian cam girls online daily
- **Chaturbate and Stripchat**: the platforms with the most Brazilian models
- **Energy and spontaneity**: Brazilian shows are lively and interactive
- **Portugal too**: Portuguese models bring a refined European style

Discover all Portuguese-speaking cam models on StartVagina.`,
        faq: [
          { q: "Where can I find Brazilian cam girls?", a: "Chaturbate and Stripchat have the largest selection of Brazilian models. Many speak both Portuguese and English." },
        ],
      },
    },
  },

  "webcamsex-na-russkom": {
    slug: "webcamsex-na-russkom",
    name: "Русский",
    emoji: "🇷🇺",
    aliases: ["russian", "ru", "русский"],
    i18n: {
      nl: {
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
        faq: [
          { q: "Waar vind ik Russischtalige cam girls?", a: "BongaCams heeft het grootste aanbod. Stripchat en Chaturbate hebben ook veel Russisch sprekende modellen." },
        ],
      },
      en: {
        title: "Russian Webcam Sex — Russian Speaking Cam Girls | StartVagina",
        h1: "Russian Webcam Sex Chat",
        description: "Russian speaking cam girls live on webcam. Free webcam sex with models who speak Russian on BongaCams, Stripchat and Chaturbate.",
        keywords: "russian webcam sex, russian cam girls, russian speaking cam, webcam sex russian, russian cam models",
        content: `Russian is one of the **most spoken languages** on cam platforms. Russian-speaking cam girls come from Russia, Ukraine, Belarus and other former Soviet countries. They are known for their beauty and professional approach.

**Russian-speaking cams:**
- **BongaCams**: the go-to platform for Russian-speaking models
- **Stripchat and Chaturbate**: also many Russian-speaking cam girls
- **Professional**: many Russian models work from studios with HD setups
- **Multilingual**: besides Russian, many also speak English

Discover all Russian-speaking cam models on StartVagina.`,
        faq: [
          { q: "Where can I find Russian cam girls?", a: "BongaCams has the largest selection. Stripchat and Chaturbate also have many Russian-speaking models." },
        ],
      },
    },
  },

  "japanese-webcam-sex": {
    slug: "japanese-webcam-sex",
    name: "日本語",
    emoji: "🇯🇵",
    aliases: ["japanese", "ja", "jp", "日本語"],
    i18n: {
      nl: {
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
        faq: [
          { q: "Wanneer zijn Japanse cam girls online?", a: "Door het tijdsverschil (8 uur voor op CET) zijn ze vooral tussen 10:00 en 20:00 CET online." },
        ],
      },
      en: {
        title: "Japanese Webcam Sex — Japanese Cam Girls Live | StartVagina",
        h1: "Japanese Webcam Sex Chat",
        description: "Japanese speaking cam girls live on webcam. Free webcam sex with Japanese models on Stripchat, Chaturbate and more. Cosplay and kawaii cam shows.",
        keywords: "japanese webcam sex, japanese cam girls, japanese live cam, cosplay cam, kawaii cam, japanese webcam chat",
        content: `Japanese cam girls offer a **unique webcam sex experience** with cosplay, kawaii aesthetics and a distinct culture. On StartVagina you'll find all models who speak Japanese.

**Japanese-speaking cams:**
- **Stripchat**: the western platform with the most Japanese models
- **Cosplay and roleplay**: many Japanese cam girls integrate anime and cosplay into their shows
- **Kawaii culture**: a recognizable, playful style you won't find anywhere else
- **Online during the day**: due to the time difference, Japanese models are mostly online during daytime (CET)

Discover all Japanese-speaking cam models on StartVagina.`,
        faq: [
          { q: "When are Japanese cam girls online?", a: "Due to the time difference (8 hours ahead of CET), they are mostly online between 10:00 AM and 8:00 PM CET." },
        ],
      },
    },
  },

  "korean-webcam-sex": {
    slug: "korean-webcam-sex",
    name: "한국어",
    emoji: "🇰🇷",
    aliases: ["korean", "ko", "kr", "한국어"],
    i18n: {
      nl: {
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
        faq: [
          { q: "Zijn er veel Koreaanse cam modellen?", a: "Het aanbod groeit. Stripchat heeft de meeste Koreaanse modellen op westerse platforms." },
        ],
      },
      en: {
        title: "Korean Webcam Sex — Korean Cam Girls Live | StartVagina",
        h1: "Korean Webcam Sex Chat",
        description: "Korean speaking cam girls live on webcam. Free webcam sex with Korean models on Stripchat and Chaturbate.",
        keywords: "korean webcam sex, korean cam girls, korean live cam, korean webcam chat, k-beauty cam",
        content: `Korean cam girls bring **K-beauty and elegance** to webcam sex. With a growing presence on western platforms, Korean-speaking models are increasingly easy to find.

**Korean cams:**
- **Stripchat**: the platform with the most Korean models
- **K-beauty aesthetics**: Korean cam girls are often stylish and well-groomed
- **Growing selection**: more and more Korean models are discovering western cam platforms
- **Unique style**: a mix of Asian elegance and modern flair

Discover all Korean-speaking cam models on StartVagina.`,
        faq: [
          { q: "Are there many Korean cam models?", a: "The selection is growing. Stripchat has the most Korean models on western platforms." },
        ],
      },
    },
  },
};
