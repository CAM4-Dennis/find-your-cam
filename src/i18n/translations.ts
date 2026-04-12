export type Language = "nl" | "en" | "fr" | "it" | "de" | "es";

export const SUPPORTED_LANGUAGES: Language[] = ["nl", "en", "fr", "it", "de", "es"];

export const LANGUAGE_LABELS: Record<Language, string> = {
  nl: "🇳🇱 Nederlands",
  en: "🇬🇧 English",
  fr: "🇫🇷 Français",
  it: "🇮🇹 Italiano",
  de: "🇩🇪 Deutsch",
  es: "🇪🇸 Español",
};

export const OG_LOCALES: Record<Language, string> = {
  nl: "nl_NL",
  en: "en_US",
  fr: "fr_FR",
  it: "it_IT",
  de: "de_DE",
  es: "es_ES",
};

type TranslationStrings = {
  // Meta / SEO
  siteTitle: string;
  siteDescription: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;

  // Navigation
  navHome: string;
  navCategories: string;
  navCountries: string;
  navLanguages: string;
  navNew: string;
  navTopCams: string;
  navBlog: string;

  // Header
  searchPlaceholder: string;
  sfwLabel: string;
  nsfwLabel: string;

  // Age Gate
  ageGateTitle: string;
  ageGateText: string;
  ageGateConfirm: string;
  ageGateLeave: string;

  // Index page sections
  heroTitle: string;
  sectionPopular: string;
  sectionNew: string;
  sectionAge2030: string;
  sectionMobile: string;
  sectionOutdoor: string;
  sectionCouples: string;
  sectionDiscover: string;
  filterResults: string;

  // Filter sidebar
  filterClearAll: string;
  filterHDOnly: string;
  filterAge: string;
  filterGender: string;
  filterCategory: string;
  filterLanguage: string;
  filterCamSites: string;
  genderFemale: string;
  genderCouple: string;
  genderShemale: string;
  genderMale: string;

  // Footer
  footerTagline: string;
  footerCategories: string;
  footerPlatforms: string;
  footerPopularCountries: string;
  footerDiscover: string;
  footerLanguages: string;
  footerAllCategories: string;
  footerAllCountries: string;
  footerAllLanguages: string;
  footerCopyright: string;
  footerDisclaimer: string;
  footerNewCamGirls: string;
  footerWebcamsex: string;
  footerCamGirls: string;
  footerLiveSexCams: string;
  footerSexchat: string;

  // Footer SEO - Homepage
  footerSeoHomeTitle: string;
  footerSeoHomeP1: string;
  footerSeoHomeP2: string;

  // Footer category labels
  catMilf: string;
  catTeen18: string;
  catCouples: string;
  catAnal: string;
  catBigBoobs: string;
  catLatina: string;

  // SEO intro text
  introText: string;

  // Language switcher
  langSwitcherLabel: string;
};

export const translations: Record<Language, TranslationStrings> = {
  nl: {
    siteTitle: "StartVagina — Gratis Webcamsex & Live Sex Cams Nederland België",
    siteDescription: "StartVagina is dé zoekmachine voor gratis webcamsex en live sex cams. Bekijk duizenden cam girls, sexchat en erotische webcam shows van Nederlandse en Belgische modellen.",
    ogTitle: "StartVagina — Gratis Webcamsex & Live Sex Cams",
    ogDescription: "Dé zoekmachine voor gratis webcamsex. Nederlandse en Belgische cam girls live op je scherm.",
    twitterTitle: "StartVagina — Gratis Webcamsex & Live Cam Girls",
    twitterDescription: "Dé zoekmachine voor gratis webcamsex en live sex cams in Nederland en België.",

    navHome: "Home",
    navCategories: "Categorieën",
    navCountries: "Landen",
    navLanguages: "Talen",
    navNew: "Nieuw",
    navTopCams: "Top Cams",
    navBlog: "Blog",

    searchPlaceholder: "Zoek model of categorie...",
    sfwLabel: "SFW",
    nsfwLabel: "NSFW",

    ageGateTitle: "StartVagina",
    ageGateText: "Deze website bevat expliciete inhoud die alleen bedoeld is voor volwassenen (18+). Door verder te gaan bevestig je dat je 18 jaar of ouder bent.",
    ageGateConfirm: "Ik ben 18 jaar of ouder — Doorgaan",
    ageGateLeave: "Ik ben jonger dan 18 — Verlaat de site",

    heroTitle: "Gratis Webcamsex & Live Sex Cams",
    sectionPopular: "🔥 Populaire Cams",
    sectionNew: "🆕 Nieuwe Cams",
    sectionAge2030: "🔞 Leeftijd 20-30",
    sectionMobile: "📱 Mobiele Cams",
    sectionOutdoor: "🌳 Outdoor Cams",
    sectionCouples: "💑 Koppels",
    sectionDiscover: "🔍 Meer Ontdekken",
    filterResults: "🔍 Filterresultaten",

    filterClearAll: "✕ Wis alle filters",
    filterHDOnly: "Alleen HD",
    filterAge: "Leeftijd",
    filterGender: "Geslacht",
    filterCategory: "Categorie",
    filterLanguage: "Taal",
    filterCamSites: "Cam Sites",
    genderFemale: "Vrouw",
    genderCouple: "Koppel",
    genderShemale: "Shemale",
    genderMale: "Man",

    footerTagline: "Jouw startpagina voor gratis live webcamsex. Alle cam sites, alle modellen, één plek.",
    footerCategories: "Categorieën",
    footerPlatforms: "Platformen",
    footerPopularCountries: "Populaire Landen",
    footerDiscover: "Ontdek",
    footerLanguages: "Talen",
    footerAllCategories: "Alle categorieën →",
    footerAllCountries: "Alle landen →",
    footerAllLanguages: "Alle talen →",
    footerCopyright: "Alle rechten voorbehouden. 18+ — Alleen voor volwassenen.",
    footerDisclaimer: "StartVagina is een zoekmachine en host zelf geen content. Alle streams worden aangeboden door externe platformen.",
    footerNewCamGirls: "Nieuwe Cam Girls",
    footerWebcamsex: "Webcamsex",
    footerCamGirls: "Cam Girls",
    footerLiveSexCams: "Live Sex Cams",
    footerSexchat: "Sexchat",

    footerSeoHomeTitle: "StartVagina — Dé Zoekmachine voor Gratis Webcamsex",
    footerSeoHomeP1: "StartVagina.nl bundelt duizenden live cam girls van de vijf grootste platformen — Chaturbate, Stripchat, BongaCams, CAM4 en XCams — op één overzichtelijke pagina. Geen registratie, geen kosten, direct kijken.",
    footerSeoHomeP2: "Filter op categorie, zoek per land of vind modellen die jouw taal spreken. Met meer dan 10.000 modellen tegelijk online is er altijd iemand live die bij je past.",

    catMilf: "MILF Cams",
    catTeen18: "Teen 18+ Cams",
    catCouples: "Koppels Webcamsex",
    catAnal: "Anal Shows",
    catBigBoobs: "Big Boobs",
    catLatina: "Latina Cams",

    introText: "Welkom bij <strong>StartVagina</strong>, dé zoekmachine voor gratis <strong>webcamsex</strong> en <strong>live sex cams</strong>. Bekijk duizenden <strong>cam girls</strong> en <strong>webcam modellen</strong> uit Nederland en België. Geniet van gratis <strong>sexchat</strong>, <strong>erotische webcam</strong> shows en live cam streams. Filter op categorie, leeftijd, land en meer.",

    langSwitcherLabel: "Taal",
  },

  en: {
    siteTitle: "StartVagina — Free Webcam Sex & Live Sex Cams",
    siteDescription: "StartVagina is the ultimate search engine for free webcam sex and live sex cams. Watch thousands of cam girls, sex chat and erotic webcam shows live.",
    ogTitle: "StartVagina — Free Webcam Sex & Live Sex Cams",
    ogDescription: "The ultimate search engine for free webcam sex. Thousands of cam girls live on your screen.",
    twitterTitle: "StartVagina — Free Webcam Sex & Live Cam Girls",
    twitterDescription: "The ultimate search engine for free webcam sex and live sex cams.",

    navHome: "Home",
    navCategories: "Categories",
    navCountries: "Countries",
    navLanguages: "Languages",
    navNew: "New",
    navTopCams: "Top Cams",
    navBlog: "Blog",

    searchPlaceholder: "Search model or category...",
    sfwLabel: "SFW",
    nsfwLabel: "NSFW",

    ageGateTitle: "StartVagina",
    ageGateText: "This website contains explicit content intended only for adults (18+). By continuing you confirm that you are 18 years or older.",
    ageGateConfirm: "I am 18 or older — Enter",
    ageGateLeave: "I am under 18 — Leave",

    heroTitle: "Free Webcam Sex & Live Sex Cams",
    sectionPopular: "🔥 Popular Cams",
    sectionNew: "🆕 New Cams",
    sectionAge2030: "🔞 Age 20-30",
    sectionMobile: "📱 Mobile Cams",
    sectionOutdoor: "🌳 Outdoor Cams",
    sectionCouples: "💑 Couples",
    sectionDiscover: "🔍 Discover More",
    filterResults: "🔍 Filter Results",

    filterClearAll: "✕ Clear all filters",
    filterHDOnly: "HD Only",
    filterAge: "Age",
    filterGender: "Gender",
    filterCategory: "Category",
    filterLanguage: "Language",
    filterCamSites: "Cam Sites",
    genderFemale: "Female",
    genderCouple: "Couple",
    genderShemale: "Shemale",
    genderMale: "Male",

    footerTagline: "Your homepage for free live webcam sex. All cam sites, all models, one place.",
    footerCategories: "Categories",
    footerPlatforms: "Platforms",
    footerPopularCountries: "Popular Countries",
    footerDiscover: "Discover",
    footerLanguages: "Languages",
    footerAllCategories: "All categories →",
    footerAllCountries: "All countries →",
    footerAllLanguages: "All languages →",
    footerCopyright: "All rights reserved. 18+ — Adults only.",
    footerDisclaimer: "StartVagina is a search engine and does not host any content. All streams are provided by external platforms.",
    footerNewCamGirls: "New Cam Girls",
    footerWebcamsex: "Webcam Sex",
    footerCamGirls: "Cam Girls",
    footerLiveSexCams: "Live Sex Cams",
    footerSexchat: "Sex Chat",

    footerSeoHomeTitle: "StartVagina — The Search Engine for Free Webcam Sex",
    footerSeoHomeP1: "StartVagina brings together thousands of live cam girls from the five biggest platforms — Chaturbate, Stripchat, BongaCams, CAM4 and XCams — on one clear page. No registration, no costs, watch instantly.",
    footerSeoHomeP2: "Filter by category, search by country or find models who speak your language. With over 10,000 models online at the same time, there's always someone live who matches your taste.",

    catMilf: "MILF Cams",
    catTeen18: "Teen 18+ Cams",
    catCouples: "Couples Webcam Sex",
    catAnal: "Anal Shows",
    catBigBoobs: "Big Boobs",
    catLatina: "Latina Cams",

    introText: "Welcome to <strong>StartVagina</strong>, the ultimate search engine for free <strong>webcam sex</strong> and <strong>live sex cams</strong>. Watch thousands of <strong>cam girls</strong> and <strong>webcam models</strong> live. Enjoy free <strong>sex chat</strong>, <strong>erotic webcam</strong> shows and live cam streams. Filter by category, age, country and more.",

    langSwitcherLabel: "Language",
  },

  fr: {
    siteTitle: "StartVagina — Webcam Sexe Gratuit & Cams en Direct",
    siteDescription: "StartVagina est le moteur de recherche ultime pour le webcam sexe gratuit et les cams en direct. Regardez des milliers de cam girls, chat sexe et shows webcam érotiques en direct.",
    ogTitle: "StartVagina — Webcam Sexe Gratuit & Cams en Direct",
    ogDescription: "Le moteur de recherche ultime pour le webcam sexe gratuit. Des milliers de cam girls en direct sur votre écran.",
    twitterTitle: "StartVagina — Webcam Sexe Gratuit & Cam Girls en Direct",
    twitterDescription: "Le moteur de recherche ultime pour le webcam sexe gratuit et les cams en direct.",

    navHome: "Accueil",
    navCategories: "Catégories",
    navCountries: "Pays",
    navLanguages: "Langues",
    navNew: "Nouveau",
    navTopCams: "Top Cams",
    navBlog: "Blog",

    searchPlaceholder: "Rechercher modèle ou catégorie...",
    sfwLabel: "SFW",
    nsfwLabel: "NSFW",

    ageGateTitle: "StartVagina",
    ageGateText: "Ce site contient du contenu explicite destiné uniquement aux adultes (18+). En continuant, vous confirmez avoir 18 ans ou plus.",
    ageGateConfirm: "J'ai 18 ans ou plus — Entrer",
    ageGateLeave: "J'ai moins de 18 ans — Quitter",

    heroTitle: "Webcam Sexe Gratuit & Cams en Direct",
    sectionPopular: "🔥 Cams Populaires",
    sectionNew: "🆕 Nouvelles Cams",
    sectionAge2030: "🔞 Âge 20-30",
    sectionMobile: "📱 Cams Mobiles",
    sectionOutdoor: "🌳 Cams Extérieur",
    sectionCouples: "💑 Couples",
    sectionDiscover: "🔍 Découvrir Plus",
    filterResults: "🔍 Résultats du filtre",

    filterClearAll: "✕ Effacer tous les filtres",
    filterHDOnly: "HD uniquement",
    filterAge: "Âge",
    filterGender: "Genre",
    filterCategory: "Catégorie",
    filterLanguage: "Langue",
    filterCamSites: "Sites Cam",
    genderFemale: "Femme",
    genderCouple: "Couple",
    genderShemale: "Shemale",
    genderMale: "Homme",

    footerTagline: "Votre page d'accueil pour le webcam sexe gratuit en direct. Tous les sites cam, tous les modèles, un seul endroit.",
    footerCategories: "Catégories",
    footerPlatforms: "Plateformes",
    footerPopularCountries: "Pays Populaires",
    footerDiscover: "Découvrir",
    footerLanguages: "Langues",
    footerAllCategories: "Toutes les catégories →",
    footerAllCountries: "Tous les pays →",
    footerAllLanguages: "Toutes les langues →",
    footerCopyright: "Tous droits réservés. 18+ — Réservé aux adultes.",
    footerDisclaimer: "StartVagina est un moteur de recherche et n'héberge aucun contenu. Tous les streams sont fournis par des plateformes externes.",
    footerNewCamGirls: "Nouvelles Cam Girls",
    footerWebcamsex: "Webcam Sexe",
    footerCamGirls: "Cam Girls",
    footerLiveSexCams: "Cams en Direct",
    footerSexchat: "Chat Sexe",

    footerSeoHomeTitle: "StartVagina — Le Moteur de Recherche pour Webcam Sexe Gratuit",
    footerSeoHomeP1: "StartVagina regroupe des milliers de cam girls en direct des cinq plus grandes plateformes — Chaturbate, Stripchat, BongaCams, CAM4 et XCams — sur une seule page claire. Sans inscription, sans frais, regardez instantanément.",
    footerSeoHomeP2: "Filtrez par catégorie, recherchez par pays ou trouvez des modèles qui parlent votre langue. Avec plus de 10 000 modèles en ligne simultanément, il y a toujours quelqu'un en direct qui correspond à vos goûts.",

    catMilf: "Cams MILF",
    catTeen18: "Cams Teen 18+",
    catCouples: "Webcam Sexe Couples",
    catAnal: "Shows Anal",
    catBigBoobs: "Gros Seins",
    catLatina: "Cams Latina",

    introText: "Bienvenue sur <strong>StartVagina</strong>, le moteur de recherche ultime pour le <strong>webcam sexe</strong> gratuit et les <strong>cams en direct</strong>. Regardez des milliers de <strong>cam girls</strong> et <strong>modèles webcam</strong> en direct. Profitez du <strong>chat sexe</strong> gratuit, des shows <strong>webcam érotiques</strong> et des streams en direct. Filtrez par catégorie, âge, pays et plus.",

    langSwitcherLabel: "Langue",
  },

  it: {
    siteTitle: "StartVagina — Webcam Sex Gratis & Cam dal Vivo",
    siteDescription: "StartVagina è il motore di ricerca definitivo per webcam sex gratis e cam dal vivo. Guarda migliaia di cam girl, chat erotiche e show in webcam dal vivo.",
    ogTitle: "StartVagina — Webcam Sex Gratis & Cam dal Vivo",
    ogDescription: "Il motore di ricerca definitivo per webcam sex gratis. Migliaia di cam girl dal vivo sul tuo schermo.",
    twitterTitle: "StartVagina — Webcam Sex Gratis & Cam Girl dal Vivo",
    twitterDescription: "Il motore di ricerca definitivo per webcam sex gratis e cam dal vivo.",

    navHome: "Home",
    navCategories: "Categorie",
    navCountries: "Paesi",
    navLanguages: "Lingue",
    navNew: "Nuove",
    navTopCams: "Top Cams",
    navBlog: "Blog",

    searchPlaceholder: "Cerca modella o categoria...",
    sfwLabel: "SFW",
    nsfwLabel: "NSFW",

    ageGateTitle: "StartVagina",
    ageGateText: "Questo sito contiene contenuti espliciti destinati solo agli adulti (18+). Continuando confermi di avere 18 anni o più.",
    ageGateConfirm: "Ho 18 anni o più — Entra",
    ageGateLeave: "Ho meno di 18 anni — Esci",

    heroTitle: "Webcam Sex Gratis & Cam dal Vivo",
    sectionPopular: "🔥 Cam Popolari",
    sectionNew: "🆕 Nuove Cam",
    sectionAge2030: "🔞 Età 20-30",
    sectionMobile: "📱 Cam Mobile",
    sectionOutdoor: "🌳 Cam Outdoor",
    sectionCouples: "💑 Coppie",
    sectionDiscover: "🔍 Scopri di Più",
    filterResults: "🔍 Risultati Filtro",

    filterClearAll: "✕ Cancella tutti i filtri",
    filterHDOnly: "Solo HD",
    filterAge: "Età",
    filterGender: "Genere",
    filterCategory: "Categoria",
    filterLanguage: "Lingua",
    filterCamSites: "Siti Cam",
    genderFemale: "Donna",
    genderCouple: "Coppia",
    genderShemale: "Shemale",
    genderMale: "Uomo",

    footerTagline: "La tua homepage per webcam sex gratis dal vivo. Tutti i siti cam, tutte le modelle, un unico posto.",
    footerCategories: "Categorie",
    footerPlatforms: "Piattaforme",
    footerPopularCountries: "Paesi Popolari",
    footerDiscover: "Scopri",
    footerLanguages: "Lingue",
    footerAllCategories: "Tutte le categorie →",
    footerAllCountries: "Tutti i paesi →",
    footerAllLanguages: "Tutte le lingue →",
    footerCopyright: "Tutti i diritti riservati. 18+ — Solo per adulti.",
    footerDisclaimer: "StartVagina è un motore di ricerca e non ospita alcun contenuto. Tutti gli stream sono forniti da piattaforme esterne.",
    footerNewCamGirls: "Nuove Cam Girl",
    footerWebcamsex: "Webcam Sex",
    footerCamGirls: "Cam Girl",
    footerLiveSexCams: "Cam dal Vivo",
    footerSexchat: "Chat Erotica",

    footerSeoHomeTitle: "StartVagina — Il Motore di Ricerca per Webcam Sex Gratis",
    footerSeoHomeP1: "StartVagina riunisce migliaia di cam girl dal vivo dalle cinque più grandi piattaforme — Chaturbate, Stripchat, BongaCams, CAM4 e XCams — in un'unica pagina chiara. Nessuna registrazione, nessun costo, guarda subito.",
    footerSeoHomeP2: "Filtra per categoria, cerca per paese o trova modelle che parlano la tua lingua. Con oltre 10.000 modelle online contemporaneamente, c'è sempre qualcuno dal vivo che corrisponde ai tuoi gusti.",

    catMilf: "Cam MILF",
    catTeen18: "Cam Teen 18+",
    catCouples: "Webcam Sex Coppie",
    catAnal: "Show Anali",
    catBigBoobs: "Tette Grandi",
    catLatina: "Cam Latina",

    introText: "Benvenuto su <strong>StartVagina</strong>, il motore di ricerca definitivo per <strong>webcam sex</strong> gratis e <strong>cam dal vivo</strong>. Guarda migliaia di <strong>cam girl</strong> e <strong>modelle webcam</strong> dal vivo. Goditi la <strong>chat erotica</strong> gratuita, gli show <strong>webcam erotici</strong> e gli stream dal vivo. Filtra per categoria, età, paese e altro.",

    langSwitcherLabel: "Lingua",
  },

  de: {
    siteTitle: "StartVagina — Gratis Webcam Sex & Live Sex Cams",
    siteDescription: "StartVagina ist die ultimative Suchmaschine für gratis Webcam Sex und Live Sex Cams. Schau dir tausende Cam Girls, Sexchat und erotische Webcam Shows live an.",
    ogTitle: "StartVagina — Gratis Webcam Sex & Live Sex Cams",
    ogDescription: "Die ultimative Suchmaschine für gratis Webcam Sex. Tausende Cam Girls live auf deinem Bildschirm.",
    twitterTitle: "StartVagina — Gratis Webcam Sex & Live Cam Girls",
    twitterDescription: "Die ultimative Suchmaschine für gratis Webcam Sex und Live Sex Cams.",

    navHome: "Home",
    navCategories: "Kategorien",
    navCountries: "Länder",
    navLanguages: "Sprachen",
    navNew: "Neu",
    navTopCams: "Top Cams",
    navBlog: "Blog",

    searchPlaceholder: "Model oder Kategorie suchen...",
    sfwLabel: "SFW",
    nsfwLabel: "NSFW",

    ageGateTitle: "StartVagina",
    ageGateText: "Diese Website enthält explizite Inhalte, die nur für Erwachsene (18+) bestimmt sind. Durch Fortfahren bestätigst du, dass du 18 Jahre oder älter bist.",
    ageGateConfirm: "Ich bin 18 oder älter — Weiter",
    ageGateLeave: "Ich bin unter 18 — Verlassen",

    heroTitle: "Gratis Webcam Sex & Live Sex Cams",
    sectionPopular: "🔥 Beliebte Cams",
    sectionNew: "🆕 Neue Cams",
    sectionAge2030: "🔞 Alter 20-30",
    sectionMobile: "📱 Mobile Cams",
    sectionOutdoor: "🌳 Outdoor Cams",
    sectionCouples: "💑 Paare",
    sectionDiscover: "🔍 Mehr Entdecken",
    filterResults: "🔍 Filterergebnisse",

    filterClearAll: "✕ Alle Filter löschen",
    filterHDOnly: "Nur HD",
    filterAge: "Alter",
    filterGender: "Geschlecht",
    filterCategory: "Kategorie",
    filterLanguage: "Sprache",
    filterCamSites: "Cam Seiten",
    genderFemale: "Frau",
    genderCouple: "Paar",
    genderShemale: "Shemale",
    genderMale: "Mann",

    footerTagline: "Deine Startseite für gratis Live Webcam Sex. Alle Cam Seiten, alle Models, an einem Ort.",
    footerCategories: "Kategorien",
    footerPlatforms: "Plattformen",
    footerPopularCountries: "Beliebte Länder",
    footerDiscover: "Entdecken",
    footerLanguages: "Sprachen",
    footerAllCategories: "Alle Kategorien →",
    footerAllCountries: "Alle Länder →",
    footerAllLanguages: "Alle Sprachen →",
    footerCopyright: "Alle Rechte vorbehalten. 18+ — Nur für Erwachsene.",
    footerDisclaimer: "StartVagina ist eine Suchmaschine und hostet keine Inhalte. Alle Streams werden von externen Plattformen bereitgestellt.",
    footerNewCamGirls: "Neue Cam Girls",
    footerWebcamsex: "Webcam Sex",
    footerCamGirls: "Cam Girls",
    footerLiveSexCams: "Live Sex Cams",
    footerSexchat: "Sexchat",

    footerSeoHomeTitle: "StartVagina — Die Suchmaschine für Gratis Webcam Sex",
    footerSeoHomeP1: "StartVagina bündelt tausende Live Cam Girls von den fünf größten Plattformen — Chaturbate, Stripchat, BongaCams, CAM4 und XCams — auf einer übersichtlichen Seite. Keine Registrierung, keine Kosten, sofort schauen.",
    footerSeoHomeP2: "Filtere nach Kategorie, suche nach Land oder finde Models die deine Sprache sprechen. Mit über 10.000 Models gleichzeitig online gibt es immer jemanden live der zu dir passt.",

    catMilf: "MILF Cams",
    catTeen18: "Teen 18+ Cams",
    catCouples: "Paare Webcam Sex",
    catAnal: "Anal Shows",
    catBigBoobs: "Große Brüste",
    catLatina: "Latina Cams",

    introText: "Willkommen bei <strong>StartVagina</strong>, der ultimativen Suchmaschine für gratis <strong>Webcam Sex</strong> und <strong>Live Sex Cams</strong>. Schau dir tausende <strong>Cam Girls</strong> und <strong>Webcam Models</strong> live an. Genieße kostenlosen <strong>Sexchat</strong>, <strong>erotische Webcam</strong> Shows und Live Cam Streams. Filtere nach Kategorie, Alter, Land und mehr.",

    langSwitcherLabel: "Sprache",
  },

  es: {
    siteTitle: "StartVagina — Webcam Sexo Gratis & Cams en Vivo",
    siteDescription: "StartVagina es el buscador definitivo de webcam sexo gratis y cams en vivo. Mira miles de cam girls, chat sexual y shows eróticos en webcam en directo.",
    ogTitle: "StartVagina — Webcam Sexo Gratis & Cams en Vivo",
    ogDescription: "El buscador definitivo de webcam sexo gratis. Miles de cam girls en vivo en tu pantalla.",
    twitterTitle: "StartVagina — Webcam Sexo Gratis & Cam Girls en Vivo",
    twitterDescription: "El buscador definitivo de webcam sexo gratis y cams en vivo.",

    navHome: "Inicio",
    navCategories: "Categorías",
    navCountries: "Países",
    navLanguages: "Idiomas",
    navNew: "Nuevas",
    navTopCams: "Top Cams",
    navBlog: "Blog",

    searchPlaceholder: "Buscar modelo o categoría...",
    sfwLabel: "SFW",
    nsfwLabel: "NSFW",

    ageGateTitle: "StartVagina",
    ageGateText: "Este sitio web contiene contenido explícito destinado solo a adultos (18+). Al continuar confirmas que tienes 18 años o más.",
    ageGateConfirm: "Tengo 18 años o más — Entrar",
    ageGateLeave: "Soy menor de 18 — Salir",

    heroTitle: "Webcam Sexo Gratis & Cams en Vivo",
    sectionPopular: "🔥 Cams Populares",
    sectionNew: "🆕 Nuevas Cams",
    sectionAge2030: "🔞 Edad 20-30",
    sectionMobile: "📱 Cams Móviles",
    sectionOutdoor: "🌳 Cams Exterior",
    sectionCouples: "💑 Parejas",
    sectionDiscover: "🔍 Descubrir Más",
    filterResults: "🔍 Resultados del Filtro",

    filterClearAll: "✕ Borrar todos los filtros",
    filterHDOnly: "Solo HD",
    filterAge: "Edad",
    filterGender: "Género",
    filterCategory: "Categoría",
    filterLanguage: "Idioma",
    filterCamSites: "Sitios Cam",
    genderFemale: "Mujer",
    genderCouple: "Pareja",
    genderShemale: "Shemale",
    genderMale: "Hombre",

    footerTagline: "Tu página de inicio para webcam sexo gratis en vivo. Todos los sitios cam, todas las modelos, en un solo lugar.",
    footerCategories: "Categorías",
    footerPlatforms: "Plataformas",
    footerPopularCountries: "Países Populares",
    footerDiscover: "Descubrir",
    footerLanguages: "Idiomas",
    footerAllCategories: "Todas las categorías →",
    footerAllCountries: "Todos los países →",
    footerAllLanguages: "Todos los idiomas →",
    footerCopyright: "Todos los derechos reservados. 18+ — Solo para adultos.",
    footerDisclaimer: "StartVagina es un buscador y no aloja ningún contenido. Todos los streams son proporcionados por plataformas externas.",
    footerNewCamGirls: "Nuevas Cam Girls",
    footerWebcamsex: "Webcam Sexo",
    footerCamGirls: "Cam Girls",
    footerLiveSexCams: "Cams en Vivo",
    footerSexchat: "Chat Sexual",

    footerSeoHomeTitle: "StartVagina — El Buscador de Webcam Sexo Gratis",
    footerSeoHomeP1: "StartVagina reúne miles de cam girls en vivo de las cinco plataformas más grandes — Chaturbate, Stripchat, BongaCams, CAM4 y XCams — en una sola página clara. Sin registro, sin costes, mira al instante.",
    footerSeoHomeP2: "Filtra por categoría, busca por país o encuentra modelos que hablen tu idioma. Con más de 10.000 modelos en línea simultáneamente, siempre hay alguien en vivo que se ajusta a tus gustos.",

    catMilf: "Cams MILF",
    catTeen18: "Cams Teen 18+",
    catCouples: "Webcam Sexo Parejas",
    catAnal: "Shows Anal",
    catBigBoobs: "Tetas Grandes",
    catLatina: "Cams Latina",

    introText: "Bienvenido a <strong>StartVagina</strong>, el buscador definitivo de <strong>webcam sexo</strong> gratis y <strong>cams en vivo</strong>. Mira miles de <strong>cam girls</strong> y <strong>modelos webcam</strong> en directo. Disfruta del <strong>chat sexual</strong> gratuito, shows de <strong>webcam erótica</strong> y streams en vivo. Filtra por categoría, edad, país y más.",

    langSwitcherLabel: "Idioma",
  },
};
