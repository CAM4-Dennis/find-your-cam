import type { Language } from "@/i18n/translations";

/* ────────────────────────────────────────────────────────────────────────────
 *  Platform × Category combo page content
 *  Template-based system that generates unique SEO content for every
 *  combination of platform (8) and category (30) in NL and EN.
 * ────────────────────────────────────────────────────────────────────────── */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PlatformCategoryContent {
  title: string;
  h1: string;
  description: string;
  intro: string;
  sections: { title: string; text: string }[];
  faq: { q: string; a: string }[];
}

interface PlatformDescription {
  intro: string;
  strengths: string[];
  howTo: string;
  uniqueFact: string;
}

interface CategoryDescription {
  intro: string;
  appeal: string;
  whatToExpect: string;
  tips: string[];
}

// ─── Platform config ─────────────────────────────────────────────────────────

interface PlatformConfig {
  name: string;
  platformId: string;
}

const platformConfigs: Record<string, PlatformConfig> = {
  chaturbate:  { name: "Chaturbate",  platformId: "Chaturbate" },
  stripchat:   { name: "Stripchat",   platformId: "Stripchat" },
  bongacams:   { name: "BongaCams",   platformId: "BongaCams" },
  cam4:        { name: "CAM4",        platformId: "Cam4" },
  jerkmate:    { name: "Jerkmate",    platformId: "Jerkmate" },
  xcams:       { name: "XCams",       platformId: "XCams" },
  flirt4free:  { name: "Flirt4Free",  platformId: "Flirt4Free" },
  islive:      { name: "Islive",      platformId: "Islive" },
};

// ─── Category config ─────────────────────────────────────────────────────────

interface CategoryConfig {
  label: Record<"nl" | "en", string>;
}

const categoryConfigs: Record<string, CategoryConfig> = {
  teen:       { label: { nl: "Teen 18+",               en: "Teen 18+" } },
  milf:       { label: { nl: "MILF",                   en: "MILF" } },
  mature:     { label: { nl: "Mature",                 en: "Mature" } },
  asian:      { label: { nl: "Aziatisch",              en: "Asian" } },
  latina:     { label: { nl: "Latina",                 en: "Latina" } },
  ebony:      { label: { nl: "Ebony",                  en: "Ebony" } },
  bigtits:    { label: { nl: "Grote Borsten",          en: "Big Tits" } },
  petite:     { label: { nl: "Petite",                 en: "Petite" } },
  anal:       { label: { nl: "Anaal",                  en: "Anal" } },
  couple:     { label: { nl: "Koppels",                en: "Couples" } },
  squirt:     { label: { nl: "Squirt",                 en: "Squirt" } },
  bdsm:       { label: { nl: "BDSM",                   en: "BDSM" } },
  tattoo:     { label: { nl: "Tattoo",                 en: "Tattoo" } },
  hairy:      { label: { nl: "Behaard",                en: "Hairy" } },
  feet:       { label: { nl: "Voeten",                 en: "Feet" } },
  outdoor:    { label: { nl: "Outdoor",                en: "Outdoor" } },
  mobile:     { label: { nl: "Mobiel",                 en: "Mobile" } },
  blonde:     { label: { nl: "Blond",                  en: "Blonde" } },
  brunette:   { label: { nl: "Brunette",               en: "Brunette" } },
  redhead:    { label: { nl: "Roodharig",              en: "Redhead" } },
  curvy:      { label: { nl: "Curvy/BBW",              en: "Curvy/BBW" } },
  slim:       { label: { nl: "Slank",                  en: "Slim" } },
  lovense:    { label: { nl: "Lovense/Interactief",    en: "Lovense/Interactive" } },
  bigass:     { label: { nl: "Grote Kont",             en: "Big Ass" } },
  striptease: { label: { nl: "Striptease",             en: "Striptease" } },
  dildo:      { label: { nl: "Dildo",                  en: "Dildo" } },
  cosplay:    { label: { nl: "Cosplay",                en: "Cosplay" } },
  smoking:    { label: { nl: "Roken",                  en: "Smoking" } },
  pregnant:   { label: { nl: "Zwanger",                en: "Pregnant" } },
  muscle:     { label: { nl: "Gespierd",               en: "Muscle" } },
};

// ─── Platform descriptions ──────────────────────────────────────────────────

const platformDescriptions: Record<string, Record<"nl" | "en", PlatformDescription>> = {

  chaturbate: {
    nl: {
      intro: "Chaturbate is 's werelds grootste cam platform en bestaat al sinds 2011. Met duizenden modellen die tegelijkertijd online zijn, biedt Chaturbate een ongeëvenaarde keuze. Het token-gebaseerde systeem maakt het mogelijk om gratis te kijken én te interacteren met modellen via tips.",
      strengths: [
        "Grootste selectie modellen online — op elk moment meer dan 4.000 performers live",
        "Volledig gratis kijken zonder account, met interactieve Lovense toys in veel kamers",
        "HD- en 4K-streams standaard, met een unieke community-driven sfeer",
        "Token-systeem geeft je volledige controle over hoeveel je uitgeeft",
      ],
      howTo: "Je kunt op Chaturbate direct beginnen met kijken zonder registratie. Maak een gratis account aan om te chatten en modellen te tippen. Tokens koop je eenvoudig via de site — hiermee stuur je interactieve toys aan en vraag je om specifieke shows.",
      uniqueFact: "Chaturbate heeft een unieke amateur-vibe die je op geen enkel ander platform vindt. De community is enorm actief en veel modellen hebben een trouwe fanbase opgebouwd.",
    },
    en: {
      intro: "Chaturbate is the world's largest cam platform, online since 2011. With thousands of models streaming simultaneously, Chaturbate offers an unparalleled selection. The token-based system lets you watch for free and interact with models through tipping.",
      strengths: [
        "Largest selection of models online — over 4,000 performers live at any given moment",
        "Completely free to watch without an account, with interactive Lovense toys in many rooms",
        "HD and 4K streams as standard, with a unique community-driven atmosphere",
        "Token system gives you full control over your spending",
      ],
      howTo: "You can start watching on Chaturbate instantly without any registration. Create a free account to chat and tip models. Tokens are easily purchased on the site — use them to control interactive toys and request specific shows.",
      uniqueFact: "Chaturbate has a unique amateur vibe you won't find on any other platform. The community is incredibly active and many models have built a loyal fanbase.",
    },
  },

  stripchat: {
    nl: {
      intro: "Stripchat staat bekend om innovatie en was het eerste cam platform dat VR-cams introduceerde. Sinds 2016 is het uitgegroeid tot een van de grootste platforms ter wereld, met een enorme modeldatabase en geavanceerde zoekfuncties die het vinden van jouw ideale model makkelijk maken.",
      strengths: [
        "Geavanceerde filters en zoekfunctie — vind precies wat je zoekt in seconden",
        "Als eerste platform ter wereld met VR-cam ondersteuning voor een meeslepende ervaring",
        "Grote modeldatabase met meer dan 5.000 modellen tegelijkertijd online",
        "Gratis shows zonder verplichte registratie, plus regelmatige promoties",
      ],
      howTo: "Op Stripchat begin je met kijken door simpelweg de site te bezoeken. De uitgebreide filteropties helpen je snel de juiste categorie of type model te vinden. Een gratis account geeft je toegang tot extra functies zoals favorieten opslaan en privéberichten.",
      uniqueFact: "Stripchat is een pionier op het gebied van VR-webcams en biedt ook een eigen AI-aanbevelingssysteem dat leert van je voorkeuren.",
    },
    en: {
      intro: "Stripchat is renowned for innovation and was the first cam platform to introduce VR cams. Since 2016, it has grown into one of the largest platforms worldwide, with a massive model database and advanced search functions that make finding your ideal model effortless.",
      strengths: [
        "Advanced filters and search functionality — find exactly what you're looking for in seconds",
        "First platform in the world with VR cam support for an immersive experience",
        "Huge model database with over 5,000 models online simultaneously",
        "Free shows without mandatory registration, plus regular promotions",
      ],
      howTo: "Start watching on Stripchat by simply visiting the site. The extensive filter options help you quickly find the right category or model type. A free account gives you access to extra features like saving favourites and private messaging.",
      uniqueFact: "Stripchat is a pioneer in VR webcams and also offers its own AI recommendation system that learns from your preferences.",
    },
  },

  bongacams: {
    nl: {
      intro: "BongaCams is een van de populairste cam platforms in Europa en staat bekend om zijn grote aanbod Oost-Europese modellen. Het platform biedt regelmatig promoties, wedstrijden en bonussen waardoor je meer waar voor je geld krijgt.",
      strengths: [
        "Groot aanbod Europese modellen, met name uit Oost-Europa en Rusland",
        "Regelmatige promoties, wedstrijden en bonusacties voor gebruikers",
        "HD-streams standaard met een gebruiksvriendelijke interface",
        "Gratis toegang tot alle openbare kamers zonder account",
      ],
      howTo: "BongaCams is gratis te bezoeken en je kunt direct beginnen met kijken. Registreer een gratis account voor chatfunctionaliteit en bonussen. Via tokens kun je modellen tippen en privéshows aanvragen.",
      uniqueFact: "BongaCams organiseert regelmatig grote modelwedstrijden met flinke prijzenpotten, wat zorgt voor extra gemotiveerde en enthousiaste modellen op het platform.",
    },
    en: {
      intro: "BongaCams is one of the most popular cam platforms in Europe, known for its large selection of Eastern European models. The platform regularly offers promotions, contests, and bonuses, giving you more value for your money.",
      strengths: [
        "Large selection of European models, particularly from Eastern Europe and Russia",
        "Regular promotions, contests, and bonus campaigns for users",
        "HD streams as standard with a user-friendly interface",
        "Free access to all public rooms without an account",
      ],
      howTo: "BongaCams is free to visit and you can start watching immediately. Register a free account for chat functionality and bonuses. Use tokens to tip models and request private shows.",
      uniqueFact: "BongaCams regularly organises large model contests with significant prize pools, resulting in extra motivated and enthusiastic models on the platform.",
    },
  },

  cam4: {
    nl: {
      intro: "CAM4 is een van de langstlopende cam platforms ter wereld, opgericht in 2007. Het staat bekend om zijn authentieke amateur community en heeft een bijzonder sterke Europese achterban, inclusief een flinke Nederlandse en Belgische modelbasis.",
      strengths: [
        "Langstlopende platform met bijna twee decennia ervaring in de cam-industrie",
        "Sterke Europese community met veel Nederlandse en Belgische modellen",
        "Echte amateurs en koppels die een authentieke kijkervaring bieden",
        "Gratis kijken met een laagdrempelige registratie",
      ],
      howTo: "Op CAM4 kun je direct beginnen met kijken. Maak een gratis account aan om te chatten en je favoriete modellen op te slaan. CAM4 werkt met een token-systeem voor tips en privéshows.",
      uniqueFact: "CAM4 is bijzonder populair onder echte amateurs en koppels. Het platform heeft een opvallend groot aanbod Nederlandstalige modellen, waardoor je in je eigen taal kunt communiceren.",
    },
    en: {
      intro: "CAM4 is one of the longest-running cam platforms in the world, founded in 2007. It's known for its authentic amateur community and has a particularly strong European following, including a sizeable Dutch and Belgian model base.",
      strengths: [
        "Longest-running platform with nearly two decades of experience in the cam industry",
        "Strong European community with many Dutch and Belgian models",
        "Real amateurs and couples offering an authentic viewing experience",
        "Free to watch with easy, low-barrier registration",
      ],
      howTo: "On CAM4, you can start watching right away. Create a free account to chat and save your favourite models. CAM4 uses a token system for tips and private shows.",
      uniqueFact: "CAM4 is especially popular among real amateurs and couples. The platform has a remarkably large selection of Dutch-speaking models, so you can communicate in your own language.",
    },
  },

  jerkmate: {
    nl: {
      intro: "Jerkmate is een uniek cam platform dat functioneert als aggregator: het combineert modellen van meerdere grote platforms in één overzicht. Dankzij een slim matching-algoritme word je gekoppeld aan modellen die bij jouw voorkeuren passen, zonder dat je op elk platform apart hoeft te zoeken.",
      strengths: [
        "Combineert modellen van meerdere platforms — het grootste gecombineerde aanbod",
        "Slim matching-algoritme dat je koppelt aan je ideale model",
        "Geen apart account nodig voor elk onderliggend platform",
        "Overzichtelijke interface met geavanceerde filteropties",
      ],
      howTo: "Bij Jerkmate begin je door je voorkeuren op te geven. Het matching-systeem toont je vervolgens modellen die bij je passen. Je kunt direct beginnen met kijken — Jerkmate regelt de rest op de achtergrond.",
      uniqueFact: "Jerkmate is de enige cam-aggregator die modellen van platforms zoals Streamate, Chaturbate en meer combineert in één naadloze ervaring.",
    },
    en: {
      intro: "Jerkmate is a unique cam platform that functions as an aggregator: it combines models from multiple major platforms into one overview. Thanks to a smart matching algorithm, you're paired with models that match your preferences, without having to search each platform separately.",
      strengths: [
        "Combines models from multiple platforms — the largest combined selection",
        "Smart matching algorithm that pairs you with your ideal model",
        "No separate account needed for each underlying platform",
        "Clean interface with advanced filter options",
      ],
      howTo: "With Jerkmate, you start by entering your preferences. The matching system then shows you models that fit your taste. You can start watching right away — Jerkmate handles the rest in the background.",
      uniqueFact: "Jerkmate is the only cam aggregator that combines models from platforms like Streamate, Chaturbate, and more into one seamless experience.",
    },
  },

  xcams: {
    nl: {
      intro: "XCams is een premium Europees cam platform dat zich richt op kwaliteit boven kwantiteit. Met voornamelijk professionele modellen biedt XCams een meer intieme en gepolijste ervaring dan de grotere massaplatforms.",
      strengths: [
        "Premium kwaliteit met professionele, ervaren modellen",
        "Europese focus met modellen uit Frankrijk, Spanje, Italië en meer",
        "Intimere sfeer met kleinere kamers en meer persoonlijke aandacht",
        "Uitstekende video- en audiokwaliteit in alle streams",
      ],
      howTo: "Op XCams kun je beginnen door de modellijst te verkennen. Het platform biedt gratis previews van kamers. Maak een account aan om volledig te profiteren van de functies, inclusief cam-to-cam en privéshows.",
      uniqueFact: "XCams onderscheidt zich door een sterk Europees karakter. Veel modellen spreken meerdere talen en het platform voelt minder massaal dan de grote Amerikaanse concurrenten.",
    },
    en: {
      intro: "XCams is a premium European cam platform that focuses on quality over quantity. Featuring primarily professional models, XCams offers a more intimate and polished experience compared to the larger mass platforms.",
      strengths: [
        "Premium quality with professional, experienced models",
        "European focus with models from France, Spain, Italy, and more",
        "More intimate atmosphere with smaller rooms and personal attention",
        "Excellent video and audio quality across all streams",
      ],
      howTo: "On XCams, start by exploring the model list. The platform offers free room previews. Create an account to fully enjoy features including cam-to-cam and private shows.",
      uniqueFact: "XCams distinguishes itself through a strong European character. Many models speak multiple languages and the platform feels less crowded than its larger American competitors.",
    },
  },

  flirt4free: {
    nl: {
      intro: "Flirt4Free is een premium cam platform dat bekendstaat om professionele shows en een uitgebreid categorieaanbod, inclusief een van de beste fetisj-secties in de industrie. Met HD-streams, multi-user shows en gratis credits voor nieuwe gebruikers is het een populaire keuze voor kenners.",
      strengths: [
        "Professionele kwaliteitsshows met HD-streaming als standaard",
        "Uitgebreide categorieën inclusief een van de beste fetisj-secties online",
        "Multi-user shows waarbij je met anderen de kosten deelt",
        "Gratis credits voor nieuwe gebruikers om het platform te verkennen",
      ],
      howTo: "Op Flirt4Free ontvang je als nieuwe gebruiker gratis credits om het platform te ontdekken. Je kunt direct shows bekijken en met de gratis credits een privéshow proberen. Het platform biedt ook multi-user shows die betaalbaarder zijn.",
      uniqueFact: "Flirt4Free heeft een van de meest uitgebreide fetisj- en niche-categorieën van alle cam platforms. Van BDSM tot voetenfetisj — hier vind je voor elke voorkeur een gespecialiseerd model.",
    },
    en: {
      intro: "Flirt4Free is a premium cam platform known for professional shows and an extensive category selection, including one of the best fetish sections in the industry. With HD streams, multi-user shows, and free credits for new users, it's a popular choice for connoisseurs.",
      strengths: [
        "Professional quality shows with HD streaming as standard",
        "Extensive categories including one of the best fetish sections online",
        "Multi-user shows where you share costs with others",
        "Free credits for new users to explore the platform",
      ],
      howTo: "On Flirt4Free, new users receive free credits to discover the platform. You can watch shows immediately and use the free credits to try a private show. The platform also offers more affordable multi-user shows.",
      uniqueFact: "Flirt4Free has one of the most extensive fetish and niche category selections of any cam platform. From BDSM to foot fetish — you'll find a specialised model for every preference.",
    },
  },

  islive: {
    nl: {
      intro: "Islive is het grootste Nederlandse cam platform en dé keuze voor wie Nederlandstalige cam modellen zoekt. Met een sterke lokale community, freechat-opties en cam-to-cam functionaliteit biedt Islive een vertrouwde ervaring voor Nederlandse en Belgische gebruikers.",
      strengths: [
        "Het grootste aanbod Nederlandstalige cam modellen — chat in je eigen taal",
        "Freechat waarmee je modellen gratis kunt leren kennen voordat je betaalt",
        "Cam-to-cam functionaliteit voor een interactievere, persoonlijkere ervaring",
        "Sterke lokale community populair in Nederland en België",
      ],
      howTo: "Op Islive begin je in de freechat, waar je gratis met modellen kunt praten. Registreer een account om gebruik te maken van cam-to-cam en privéshows. Het platform is volledig in het Nederlands en de modellen spreken je taal.",
      uniqueFact: "Islive is het enige grote cam platform dat specifiek op de Nederlandse en Belgische markt is gericht. Alle modellen spreken Nederlands en de klantenservice is ook Nederlandstalig.",
    },
    en: {
      intro: "Islive is the largest Dutch cam platform and the go-to choice for anyone looking for Dutch-speaking cam models. With a strong local community, free chat options, and cam-to-cam functionality, Islive offers a familiar experience for Dutch and Belgian users.",
      strengths: [
        "The largest selection of Dutch-speaking cam models — chat in your own language",
        "Free chat where you can get to know models before paying",
        "Cam-to-cam functionality for a more interactive, personal experience",
        "Strong local community popular in the Netherlands and Belgium",
      ],
      howTo: "On Islive, you start in the free chat, where you can talk to models for free. Register an account to use cam-to-cam and private shows. The platform is fully in Dutch and the models speak your language.",
      uniqueFact: "Islive is the only major cam platform specifically targeting the Dutch and Belgian market. All models speak Dutch and customer support is also available in Dutch.",
    },
  },
};

// ─── Category descriptions ──────────────────────────────────────────────────

const categoryDescriptions: Record<string, Record<"nl" | "en", CategoryDescription>> = {

  teen: {
    nl: {
      intro: "Teen 18+ cam shows zijn enorm populair vanwege de jeugdige energie en spontaniteit van de modellen. Alle modellen zijn uiteraard 18 jaar of ouder en worden streng geverifieerd door elk platform.",
      appeal: "De aantrekkingskracht van de teen 18+ categorie zit in de frisheid en het enthousiasme van jonge modellen die net begonnen zijn met cammen. Hun ongekunstelde uitstraling en nieuwsgierige houding zorgen voor opwindende, onvoorspelbare shows.",
      whatToExpect: "Verwacht energieke shows met veel interactie, playful vibes en modellen die graag nieuwe dingen uitproberen. Veel teen modellen zijn nieuw op het platform, wat zorgt voor een verfrissende dynamiek.",
      tips: [
        "Gebruik het 'New Models' filter om de nieuwste teen modellen te ontdekken",
        "Veel teen modellen zijn actiever in de avonduren en weekenden",
        "Tip vroeg om gezien te worden — nieuwe modellen waarderen vroege supporters extra",
      ],
    },
    en: {
      intro: "Teen 18+ cam shows are hugely popular thanks to the youthful energy and spontaneity of the models. All models are of course 18 years or older and strictly verified by each platform.",
      appeal: "The appeal of the teen 18+ category lies in the freshness and enthusiasm of young models who are just starting out with camming. Their natural charm and curious attitude make for exciting, unpredictable shows.",
      whatToExpect: "Expect energetic shows with plenty of interaction, playful vibes, and models eager to try new things. Many teen models are new to the platform, creating a refreshing dynamic.",
      tips: [
        "Use the 'New Models' filter to discover the newest teen models",
        "Many teen models are more active during evenings and weekends",
        "Tip early to get noticed — new models especially appreciate early supporters",
      ],
    },
  },

  milf: {
    nl: {
      intro: "MILF cam shows bieden de ervaring en zelfverzekerdheid die alleen rijpere vrouwen kunnen geven. Deze modellen weten precies wat ze doen en brengen een niveau van sensualiteit en expertise dat moeilijk te evenaren is.",
      appeal: "De populariteit van MILF cam shows komt door de combinatie van ervaring, zelfvertrouwen en rijpe schoonheid. MILF modellen zijn vaak meer ontspannen en durven verder te gaan in hun shows.",
      whatToExpect: "Verwacht professionele, zelfverzekerde shows van vrouwen die hun lichaam kennen en weten hoe ze hun kijkers moeten verleiden. MILF modellen bieden vaak langere, meer opgebouwde shows met aandacht voor sfeer.",
      tips: [
        "MILF modellen zijn vaak overdag online wanneer het rustiger is — perfecte timing voor persoonlijke aandacht",
        "Veel MILF modellen bieden cam-to-cam aan voor een intiemere ervaring",
        "Neem de tijd om een connectie op te bouwen — MILF modellen waarderen echte interactie",
      ],
    },
    en: {
      intro: "MILF cam shows offer the experience and confidence that only mature women can provide. These models know exactly what they're doing and bring a level of sensuality and expertise that's hard to match.",
      appeal: "The popularity of MILF cam shows comes from the combination of experience, self-confidence, and mature beauty. MILF models are often more relaxed and willing to push boundaries in their shows.",
      whatToExpect: "Expect professional, confident shows from women who know their bodies and understand how to seduce their audience. MILF models often offer longer, more gradual shows with attention to atmosphere.",
      tips: [
        "MILF models are often online during daytime when it's quieter — perfect timing for personal attention",
        "Many MILF models offer cam-to-cam for a more intimate experience",
        "Take time to build a connection — MILF models appreciate genuine interaction",
      ],
    },
  },

  mature: {
    nl: {
      intro: "Mature cam shows tonen vrouwen van 40+ die met trots hun ervaring en sensualiteit delen. Deze categorie bewijst dat leeftijd niets afdoet aan aantrekkingskracht — integendeel.",
      appeal: "Mature modellen stralen een onweerstaanbare zelfverzekerdheid uit. Ze zijn comfortabel in hun eigen huid, weten wat ze willen en zijn niet bang om dat te laten zien.",
      whatToExpect: "Verwacht intieme, volwassen shows met veel persoonlijke aandacht. Mature modellen nemen de tijd, bouwen sfeer op en bieden een diepere verbinding dan je op andere plaatsen vindt.",
      tips: [
        "Mature modellen waarderen respectvolle en volwassen interactie in de chat",
        "Veel mature modellen zijn 's ochtends en overdag online",
        "Privéshows met mature modellen zijn vaak bijzonder persoonlijk en intiem",
      ],
    },
    en: {
      intro: "Mature cam shows feature women aged 40+ who proudly share their experience and sensuality. This category proves that age takes nothing away from attractiveness — quite the opposite.",
      appeal: "Mature models radiate an irresistible self-confidence. They're comfortable in their own skin, know what they want, and aren't afraid to show it.",
      whatToExpect: "Expect intimate, adult shows with plenty of personal attention. Mature models take their time, build atmosphere, and offer a deeper connection than you'll find elsewhere.",
      tips: [
        "Mature models appreciate respectful and adult interaction in the chat",
        "Many mature models are online in the morning and during the day",
        "Private shows with mature models tend to be especially personal and intimate",
      ],
    },
  },

  asian: {
    nl: {
      intro: "Aziatische cam modellen zijn wereldwijd populair vanwege hun exotische schoonheid, speelse persoonlijkheid en culturele diversiteit. Van Japanse tot Filipijnse modellen — de variatie is enorm.",
      appeal: "De aantrekkingskracht van Aziatische cam shows zit in de combinatie van schoonheid, mysterie en een vaak speelse, kawaii-achtige stijl. Veel kijkers worden aangetrokken door de unieke esthetiek en culturele invloeden.",
      whatToExpect: "Verwacht een mix van schattige en sensuele shows, vaak met cosplay-elementen of unieke thema's. Aziatische modellen brengen vaak een eigen culturele twist mee die hun shows onderscheidt.",
      tips: [
        "Houd rekening met tijdzones — veel Aziatische modellen zijn 's nachts (Europese tijd) online",
        "Cosplay en thema-shows zijn populair bij Aziatische modellen — vraag ernaar",
        "Een klein woordje in hun taal wordt altijd gewaardeerd",
      ],
    },
    en: {
      intro: "Asian cam models are popular worldwide for their exotic beauty, playful personalities, and cultural diversity. From Japanese to Filipina models — the variety is enormous.",
      appeal: "The appeal of Asian cam shows lies in the combination of beauty, mystery, and an often playful, kawaii-like style. Many viewers are attracted by the unique aesthetics and cultural influences.",
      whatToExpect: "Expect a mix of cute and sensual shows, often with cosplay elements or unique themes. Asian models frequently bring their own cultural twist that sets their shows apart.",
      tips: [
        "Keep time zones in mind — many Asian models are online at night (European time)",
        "Cosplay and themed shows are popular with Asian models — ask about them",
        "A small greeting in their language is always appreciated",
      ],
    },
  },

  latina: {
    nl: {
      intro: "Latina cam modellen brengen vuur, passie en een ongeëvenaarde energie naar hun shows. Bekend om hun rondingen, temperament en dans-skills, zijn Latina modellen een van de meest geliefde categorieën.",
      appeal: "Het Latijnse temperament vertaalt zich naar shows vol passie, dans en expressie. Latina modellen zijn van nature expressief en weten hoe ze een show moeten neerzetten die je niet snel vergeet.",
      whatToExpect: "Verwacht energieke shows met veel dans, expressieve persoonlijkheden en modellen die niet bang zijn om hun emoties te tonen. Latina modellen zijn vaak erg interactief en bouwen snel een band op met hun kijkers.",
      tips: [
        "Latina modellen houden van interactie — wees actief in de chat voor de beste ervaring",
        "Veel Latina modellen spreken Spaans en Engels, sommigen ook Portugees",
        "Reggaeton en muziek spelen vaak een rol in hun shows — geniet van de vibe",
      ],
    },
    en: {
      intro: "Latina cam models bring fire, passion, and unmatched energy to their shows. Known for their curves, temperament, and dance skills, Latina models are among the most beloved categories.",
      appeal: "The Latin temperament translates into shows full of passion, dancing, and expression. Latina models are naturally expressive and know how to put on a show you won't soon forget.",
      whatToExpect: "Expect energetic shows with lots of dancing, expressive personalities, and models who aren't afraid to show their emotions. Latina models are often highly interactive and quickly build rapport with their viewers.",
      tips: [
        "Latina models love interaction — be active in chat for the best experience",
        "Many Latina models speak Spanish and English, some also Portuguese",
        "Reggaeton and music often play a role in their shows — enjoy the vibe",
      ],
    },
  },

  ebony: {
    nl: {
      intro: "Ebony cam modellen vieren diversiteit en brengen een krachtige, zelfverzekerde uitstraling naar het scherm. Met een breed scala aan lichaamstypen en persoonlijkheden is de ebony categorie rijk en gevarieerd.",
      appeal: "Ebony modellen staan bekend om hun zelfvertrouwen, expressieve persoonlijkheden en indrukwekkende dansmoves. Hun shows zijn vaak energiek, muzikaal en vol persoonlijkheid.",
      whatToExpect: "Verwacht zelfverzekerde, energieke shows met veel persoonlijkheid. Ebony modellen brengen vaak muziek en dans in hun shows en zijn niet bang om zichzelf te laten zien.",
      tips: [
        "Ebony modellen waarderen complimenten en positieve energie in de chat",
        "Veel ebony modellen zijn gespecialiseerd in twerking en dans-shows",
        "Zoek naar modellen met interactieve toys voor extra spannende shows",
      ],
    },
    en: {
      intro: "Ebony cam models celebrate diversity and bring a powerful, confident presence to the screen. With a wide range of body types and personalities, the ebony category is rich and varied.",
      appeal: "Ebony models are known for their self-confidence, expressive personalities, and impressive dance moves. Their shows are often energetic, musical, and full of personality.",
      whatToExpect: "Expect confident, energetic shows with lots of personality. Ebony models often incorporate music and dancing into their shows and aren't afraid to be themselves.",
      tips: [
        "Ebony models appreciate compliments and positive energy in chat",
        "Many ebony models specialise in twerking and dance shows",
        "Look for models with interactive toys for extra exciting shows",
      ],
    },
  },

  bigtits: {
    nl: {
      intro: "Grote borsten behoren tot de meest gezochte categorieën op cam sites. Modellen met een volle boezem weten precies hoe ze hun assets in scène moeten zetten voor een spectaculaire show.",
      appeal: "De aantrekkingskracht is tijdloos — grote borsten combineren visueel spektakel met sensualiteit. Of het nu gaat om natuurlijk of enhanced, de variatie in deze categorie is enorm.",
      whatToExpect: "Verwacht shows waarin borsten centraal staan: olie-shows, titty-fucks, bouncing en creatieve outfits die de décolleté accentueren. Veel modellen met grote borsten bieden speciale thema-shows aan.",
      tips: [
        "Veel modellen bieden speciale olie-shows of lingerie-shows aan — vraag ernaar in de chat",
        "Gebruik filters op cupmaat als het platform dit ondersteunt",
        "Modellen met grote borsten zijn populair — overweeg een privéshow voor exclusieve aandacht",
      ],
    },
    en: {
      intro: "Big tits are among the most searched-for categories on cam sites. Models with full busts know exactly how to showcase their assets for a spectacular show.",
      appeal: "The appeal is timeless — big tits combine visual spectacle with sensuality. Whether natural or enhanced, the variety in this category is enormous.",
      whatToExpect: "Expect shows where breasts take centre stage: oil shows, titty fucks, bouncing, and creative outfits that accentuate cleavage. Many big-titted models offer special themed shows.",
      tips: [
        "Many models offer special oil shows or lingerie shows — ask in chat",
        "Use cup size filters if the platform supports them",
        "Models with big tits are popular — consider a private show for exclusive attention",
      ],
    },
  },

  petite: {
    nl: {
      intro: "Petite cam modellen betoveren met hun slanke, compacte lichamen en vaak jeugdige uitstraling. De petite categorie is ideaal voor wie houdt van elegantie en fijne lichaamsbouw.",
      appeal: "Petite modellen combineren kwetsbaarheid met veerkracht. Hun kleinere gestalte maakt elke beweging gracieus, en veel kijkers genieten van het contrast tussen onschuldig uiterlijk en gedurfde shows.",
      whatToExpect: "Verwacht elegante shows van modellen met een slank figuur. Petite modellen zijn vaak wendbaar en creatief in hun posities, wat zorgt voor visueel aantrekkelijke shows.",
      tips: [
        "Petite modellen zijn vaak actiever in interactieve shows — probeer tip-gebaseerde spelletjes",
        "Lingerie en bodystockings komen extra goed tot hun recht bij petite modellen",
        "Veel petite modellen doen ook aan cosplay of rollenspel",
      ],
    },
    en: {
      intro: "Petite cam models enchant with their slim, compact bodies and often youthful appearance. The petite category is ideal for those who appreciate elegance and delicate builds.",
      appeal: "Petite models combine vulnerability with resilience. Their smaller stature makes every movement graceful, and many viewers enjoy the contrast between innocent appearance and daring shows.",
      whatToExpect: "Expect elegant shows from models with slender figures. Petite models are often flexible and creative with positions, making for visually appealing shows.",
      tips: [
        "Petite models are often more active in interactive shows — try tip-based games",
        "Lingerie and bodystockings look especially good on petite models",
        "Many petite models also do cosplay or roleplay",
      ],
    },
  },

  anal: {
    nl: {
      intro: "Anale cam shows zijn voor kijkers die van intense, grensverleggende content houden. Modellen in de anaal categorie zijn ervaren, voorbereid en bereid om een show neer te zetten die je bijblijft.",
      appeal: "Anale shows bieden een extra niveau van intensiteit en intimiteit. Het taboe-element maakt het extra spannend, terwijl de modellen laten zien hoeveel plezier ze eraan beleven.",
      whatToExpect: "Verwacht shows variërend van subtiel anaal spel tot intensere penetratie, vaak met gespecialiseerde toys. Veel modellen bouwen hier naartoe op als climax van hun show.",
      tips: [
        "Wees geduldig — anale shows zijn beter wanneer er een opbouw is",
        "Modellen die anaal aanbieden vermelden dit vaak in hun profiel of tags",
        "Tip genereus voor speciale verzoeken — anale shows vragen extra inspanning van modellen",
      ],
    },
    en: {
      intro: "Anal cam shows are for viewers who enjoy intense, boundary-pushing content. Models in the anal category are experienced, prepared, and willing to put on an unforgettable show.",
      appeal: "Anal shows offer an extra level of intensity and intimacy. The taboo element adds excitement, while the models demonstrate how much pleasure they derive from it.",
      whatToExpect: "Expect shows ranging from subtle anal play to more intense penetration, often with specialised toys. Many models build towards this as the climax of their show.",
      tips: [
        "Be patient — anal shows are better when there's a build-up",
        "Models who offer anal often mention this in their profile or tags",
        "Tip generously for special requests — anal shows require extra effort from models",
      ],
    },
  },

  couple: {
    nl: {
      intro: "Koppels cam shows bieden een voyeuristische kijkervaring die je nergens anders vindt. Echte stellen delen hun intimiteit live, wat zorgt voor een authentieke en opwindende dynamiek.",
      appeal: "Het kijken naar een echt koppel dat geniet van elkaars lichaam is inherent opwindender dan een soloshow. De chemie, de spontaniteit en de echte passie maken koppelshows onweerstaanbaar.",
      whatToExpect: "Verwacht alles van sensuele voorspellen tot volledige seks, orale shows en creatieve standjes. Koppels variëren enorm — van romantisch en zacht tot wild en ongegeneerd.",
      tips: [
        "Koppels reageren vaak goed op specifieke standjes-verzoeken via tips",
        "Zoek koppels die al langer samen zijn — hun chemie is voelbaar door het scherm",
        "Veel koppels streamen in de avond vanuit hun eigen slaapkamer voor een intieme sfeer",
      ],
    },
    en: {
      intro: "Couples cam shows offer a voyeuristic viewing experience you won't find anywhere else. Real couples share their intimacy live, creating an authentic and exciting dynamic.",
      appeal: "Watching a real couple enjoying each other's bodies is inherently more exciting than a solo show. The chemistry, spontaneity, and genuine passion make couples shows irresistible.",
      whatToExpect: "Expect everything from sensual foreplay to full sex, oral shows, and creative positions. Couples vary enormously — from romantic and gentle to wild and uninhibited.",
      tips: [
        "Couples often respond well to specific position requests through tips",
        "Look for couples who've been together longer — their chemistry is palpable through the screen",
        "Many couples stream in the evening from their own bedroom for an intimate vibe",
      ],
    },
  },

  squirt: {
    nl: {
      intro: "Squirt shows behoren tot de meest spectaculaire cam shows die je kunt bekijken. Het moment waarop een model squirt is intens, visueel indrukwekkend en bijzonder opwindend.",
      appeal: "De aantrekkingskracht van squirt shows zit in de intensiteit en het visuele spektakel. Het is een teken van echt, intens genot dat moeilijk te faken is, wat het extra authentiek maakt.",
      whatToExpect: "Verwacht intense opbouw gevolgd door spectaculaire squirt-orgasmes. Modellen gebruiken vaak vibrators, dildo's en G-spot toys om tot een squirtend hoogtepunt te komen.",
      tips: [
        "Squirt-shows vergen opbouw — geniet van het hele proces, niet alleen de climax",
        "Modellen met interactieve toys laten je meebeslissen over het tempo richting de squirt",
        "Filter op 'squirt' tags om modellen te vinden die hier echt goed in zijn",
      ],
    },
    en: {
      intro: "Squirt shows are among the most spectacular cam shows you can watch. The moment a model squirts is intense, visually impressive, and incredibly exciting.",
      appeal: "The appeal of squirt shows lies in their intensity and visual spectacle. It's a sign of real, intense pleasure that's hard to fake, making it feel extra authentic.",
      whatToExpect: "Expect intense build-up followed by spectacular squirting orgasms. Models often use vibrators, dildos, and G-spot toys to reach a squirting climax.",
      tips: [
        "Squirt shows need build-up — enjoy the entire process, not just the climax",
        "Models with interactive toys let you influence the pace towards the squirt",
        "Filter on 'squirt' tags to find models who are truly skilled at this",
      ],
    },
  },

  bdsm: {
    nl: {
      intro: "BDSM cam shows verkennen de wereld van dominantie, submissie, bondage en discipline. Van lichte spanking tot volledige rope bondage — de BDSM categorie biedt shows voor elk ervaringsniveau.",
      appeal: "BDSM spreekt aan omdat het machtsdynamiek en vertrouwen centraal stelt. De spanning tussen controle en overgave creëert een unieke, intense kijkervaring die je nergens anders vindt.",
      whatToExpect: "Verwacht shows variërend van softcore dominatrice-sessies tot hardcore bondage, spanking, roleplay en meer. Veel BDSM modellen zijn professioneel opgeleid en hebben uitgebreide collecties accessoires.",
      tips: [
        "Communiceer duidelijk over je grenzen en voorkeuren als je een privéshow boekt",
        "Veel dominatrices bieden taken aan — volg de regels voor de beste ervaring",
        "BDSM-shows zijn het meest indrukwekkend bij ervaren modellen — check reviews en profielen",
      ],
    },
    en: {
      intro: "BDSM cam shows explore the world of dominance, submission, bondage, and discipline. From light spanking to full rope bondage — the BDSM category offers shows for every experience level.",
      appeal: "BDSM appeals because it centres power dynamics and trust. The tension between control and surrender creates a unique, intense viewing experience you won't find elsewhere.",
      whatToExpect: "Expect shows ranging from softcore dominatrix sessions to hardcore bondage, spanking, roleplay, and more. Many BDSM models are professionally trained and have extensive accessory collections.",
      tips: [
        "Communicate clearly about your limits and preferences when booking a private show",
        "Many dominatrices offer tasks — follow the rules for the best experience",
        "BDSM shows are most impressive with experienced models — check reviews and profiles",
      ],
    },
  },

  tattoo: {
    nl: {
      intro: "Cam modellen met tattoos stralen een rebelse, artistieke uitstraling uit. Inkt op het lichaam vertelt een verhaal en voegt een extra visuele dimensie toe aan elke show.",
      appeal: "Tattoos geven modellen een uniek, herkenbaar uiterlijk. De combinatie van body art en erotiek creëert een esthetisch aantrekkelijke ervaring voor liefhebbers van alternatieve schoonheid.",
      whatToExpect: "Verwacht modellen met prachtige body art, van subtiele kleine tattoos tot volledig geïnkte lichamen. Veel getattooeerde modellen hebben ook piercings en een alternatieve stijl.",
      tips: [
        "Vraag modellen naar de verhalen achter hun tattoos — het is een mooie ijsbreker",
        "Getattooeerde modellen zijn vaak te vinden in de alt/punk subcategorie",
        "Veel getattooeerde modellen combineren hun inkt met cosplay of thema-shows",
      ],
    },
    en: {
      intro: "Cam models with tattoos radiate a rebellious, artistic vibe. Ink on the body tells a story and adds an extra visual dimension to every show.",
      appeal: "Tattoos give models a unique, recognisable look. The combination of body art and erotica creates an aesthetically appealing experience for lovers of alternative beauty.",
      whatToExpect: "Expect models with beautiful body art, from subtle small tattoos to fully inked bodies. Many tattooed models also have piercings and an alternative style.",
      tips: [
        "Ask models about the stories behind their tattoos — it's a great icebreaker",
        "Tattooed models can often be found in the alt/punk subcategory",
        "Many tattooed models combine their ink with cosplay or themed shows",
      ],
    },
  },

  hairy: {
    nl: {
      intro: "De hairy categorie viert natuurlijke lichaamsbeharing in al haar vormen. Van een subtiel bosje tot volledig ongeschoren — deze modellen omarmen hun natuurlijke lichaam met trots.",
      appeal: "In een wereld waar alles gladgeschoren lijkt, biedt de hairy categorie een verfrissend alternatief. Natuurlijke lichaamsbeharing straalt authenticiteit en zelfvertrouwen uit.",
      whatToExpect: "Verwacht modellen die trots hun natuurlijke lichaamsbeharing tonen. Van volle bosjes tot behaarde oksels en benen — deze categorie is voor liefhebbers van het ongepolijste en natuurlijke.",
      tips: [
        "Laat modellen weten dat je hun natuurlijke look waardeert — het wordt zeer gewaardeerd",
        "Veel hairy modellen zetten hun natuurlijke look bewust in als onderdeel van hun brand",
        "Deze categorie overlapt vaak met vintage en retro stijlen",
      ],
    },
    en: {
      intro: "The hairy category celebrates natural body hair in all its forms. From a subtle bush to fully unshaven — these models embrace their natural bodies with pride.",
      appeal: "In a world where everything seems clean-shaven, the hairy category offers a refreshing alternative. Natural body hair radiates authenticity and self-confidence.",
      whatToExpect: "Expect models who proudly display their natural body hair. From full bushes to hairy armpits and legs — this category is for lovers of the unpolished and natural.",
      tips: [
        "Let models know you appreciate their natural look — it's very much welcomed",
        "Many hairy models deliberately incorporate their natural look as part of their brand",
        "This category often overlaps with vintage and retro styles",
      ],
    },
  },

  feet: {
    nl: {
      intro: "Voetenfetisj is een van de meest populaire fetisjen ter wereld, en cam platforms bieden de perfecte manier om ervan te genieten. Modellen in de voetencategorie weten precies hoe ze hun voeten verleidelijk in scène moeten zetten.",
      appeal: "De aantrekkingskracht van voetenshows gaat verder dan alleen het visuele. Het gaat om de elegantie van een voetboog, het spel met tenen, het dragen van schoenen en kousen — een complete sensuele ervaring.",
      whatToExpect: "Verwacht shows met footjobs, toe-sucking, high heels, kousen, olie op voeten en creatieve voetgerelateerde content. Veel voeten-modellen hebben uitgebreide schoenencollecties.",
      tips: [
        "Wees specifiek over wat je wilt zien — voetenfetisj kent veel subniches",
        "Veel modellen bieden op maat gemaakte voetcontent aan via custom videos",
        "Zoek op tags als 'feet', 'soles' of 'footjob' voor de beste resultaten",
      ],
    },
    en: {
      intro: "Foot fetish is one of the most popular fetishes worldwide, and cam platforms offer the perfect way to enjoy it. Models in the feet category know exactly how to showcase their feet seductively.",
      appeal: "The appeal of foot shows goes beyond just the visual. It's about the elegance of an arch, the play with toes, wearing shoes and stockings — a complete sensual experience.",
      whatToExpect: "Expect shows featuring footjobs, toe sucking, high heels, stockings, oiled feet, and creative foot-related content. Many foot models have extensive shoe collections.",
      tips: [
        "Be specific about what you want to see — foot fetish has many sub-niches",
        "Many models offer custom-made foot content via custom videos",
        "Search for tags like 'feet', 'soles', or 'footjob' for the best results",
      ],
    },
  },

  outdoor: {
    nl: {
      intro: "Outdoor cam shows bieden de spanning van exhibitionisme en de schoonheid van de natuur gecombineerd. Modellen die buiten streamen voegen een element van risico en avontuur toe dat binnen-shows niet kunnen evenaren.",
      appeal: "De spanning van betrapt kunnen worden, natuurlijk licht op het lichaam en een onconventionele setting maken outdoor shows onweerstaanbaar voor liefhebbers van avontuur.",
      whatToExpect: "Verwacht shows in tuinen, op balkons, op het strand of in de natuur. Outdoor shows zijn vaak spontaner en onvoorspelbaarder dan studio-shows.",
      tips: [
        "Outdoor shows zijn weersafhankelijk — zoek ze vooral in de zomermaanden",
        "De kwaliteit kan variëren door natuurlijk licht en wind — dat hoort erbij",
        "Veel outdoor modellen streamen via mobiel — verwacht een ruwe, authentieke vibe",
      ],
    },
    en: {
      intro: "Outdoor cam shows combine the thrill of exhibitionism with the beauty of nature. Models who stream outside add an element of risk and adventure that indoor shows can't match.",
      appeal: "The thrill of potentially being caught, natural light on the body, and an unconventional setting make outdoor shows irresistible for adventure lovers.",
      whatToExpect: "Expect shows in gardens, on balconies, at the beach, or in nature. Outdoor shows are often more spontaneous and unpredictable than studio shows.",
      tips: [
        "Outdoor shows are weather-dependent — look for them especially in summer months",
        "Quality may vary due to natural light and wind — that's part of the charm",
        "Many outdoor models stream via mobile — expect a raw, authentic vibe",
      ],
    },
  },

  mobile: {
    nl: {
      intro: "Mobiele cam shows brengen de actie letterlijk dichterbij. Modellen die via hun telefoon streamen bieden een POV-achtige ervaring die intiem en persoonlijk aanvoelt, alsof ze je een videocall geven.",
      appeal: "Het mobiele perspectief geeft shows een selfie-achtige intimiteit. Het voelt alsof het model je persoonlijk belt, wat de ervaring veel intiemer maakt dan een traditionele webcam-setup.",
      whatToExpect: "Verwacht een close-up, persoonlijk perspectief met een wat ruwere beeldkwaliteit. Mobiele shows zijn spontaner, kunnen overal plaatsvinden en voelen als een privégesprek.",
      tips: [
        "Mobiele streams zijn perfect voor kijkers die zelf ook op hun telefoon kijken",
        "De audio is vaak dichter en persoonlijker via mobiel",
        "Veel mobiele modellen combineren dit met outdoor of badkamer-content",
      ],
    },
    en: {
      intro: "Mobile cam shows bring the action literally closer. Models streaming from their phones offer a POV-like experience that feels intimate and personal, as if they're giving you a video call.",
      appeal: "The mobile perspective gives shows a selfie-like intimacy. It feels as though the model is personally calling you, making the experience much more intimate than a traditional webcam setup.",
      whatToExpect: "Expect a close-up, personal perspective with slightly rougher image quality. Mobile shows are more spontaneous, can happen anywhere, and feel like a private conversation.",
      tips: [
        "Mobile streams are perfect for viewers also watching on their phone",
        "Audio is often closer and more personal via mobile",
        "Many mobile models combine this with outdoor or bathroom content",
      ],
    },
  },

  blonde: {
    nl: {
      intro: "Blonde cam modellen zijn tijdloos populair en vertegenwoordigen een klassieke esthetiek. Van platinablond tot honingblond — de variatie in de blonde categorie is verrassend groot.",
      appeal: "Blond haar straalt een mix van onschuld en glamour uit. Blonde modellen variëren van girl-next-door types tot glamoureuze bombshells, waardoor er voor elke smaak iets is.",
      whatToExpect: "Verwacht een brede variatie: van schattige blonde amateurs tot professionele blonde performers. Blonde modellen zijn actief in vrijwel elke subcategorie en niche.",
      tips: [
        "Combineer 'blonde' met een andere categorie voor specifiekere resultaten",
        "Blonde Oost-Europese modellen zijn bijzonder populair op BongaCams en Stripchat",
        "Veel blonde modellen variëren hun haarkleur — check hun profiel voor de actuele look",
      ],
    },
    en: {
      intro: "Blonde cam models are timelessly popular, representing a classic aesthetic. From platinum blonde to honey blonde — the variety in the blonde category is surprisingly wide.",
      appeal: "Blonde hair radiates a mix of innocence and glamour. Blonde models range from girl-next-door types to glamorous bombshells, offering something for every taste.",
      whatToExpect: "Expect wide variety: from cute blonde amateurs to professional blonde performers. Blonde models are active in virtually every subcategory and niche.",
      tips: [
        "Combine 'blonde' with another category for more specific results",
        "Blonde Eastern European models are especially popular on BongaCams and Stripchat",
        "Many blonde models change their hair colour — check their profile for their current look",
      ],
    },
  },

  brunette: {
    nl: {
      intro: "Brunette cam modellen belichamen een natuurlijke, aardse schoonheid. Donker haar geeft een mysterieuze, verleidelijke uitstraling die miljoenen kijkers aanspreekt.",
      appeal: "Brunettes worden geassocieerd met mysterie, intelligentie en een natuurlijke elegantie. Van donkerbruin tot kastanjebruin — brunette modellen bieden een aantrekkelijk alternatief voor de klassieke blonde look.",
      whatToExpect: "Verwacht modellen met een warme, natuurlijke uitstraling. Brunettes zijn goed vertegenwoordigd in alle categorieën en bieden een enorme diversiteit in stijl en persoonlijkheid.",
      tips: [
        "Brunette modellen vormen de grootste groep op de meeste platforms — gebruik extra filters om te specificeren",
        "Veel Latijns-Amerikaanse en Mediterrane modellen zijn brunette",
        "Combineer met lichaamstypefilters voor meer gerichte zoekresultaten",
      ],
    },
    en: {
      intro: "Brunette cam models embody a natural, earthy beauty. Dark hair gives a mysterious, seductive appearance that appeals to millions of viewers.",
      appeal: "Brunettes are associated with mystery, intelligence, and natural elegance. From dark brown to chestnut — brunette models offer an attractive alternative to the classic blonde look.",
      whatToExpect: "Expect models with a warm, natural appearance. Brunettes are well-represented across all categories and offer enormous diversity in style and personality.",
      tips: [
        "Brunette models form the largest group on most platforms — use extra filters to narrow down",
        "Many Latin American and Mediterranean models are brunette",
        "Combine with body type filters for more targeted search results",
      ],
    },
  },

  redhead: {
    nl: {
      intro: "Roodharige cam modellen zijn zeldzaam en daarom extra gewild. Rood haar — van vurig rood tot subtiel aardbeienblond — geeft modellen een opvallende, onvergetelijke uitstraling.",
      appeal: "Roodharig wordt geassocieerd met passie, temperament en een vleugje rebellie. De zeldzaamheid van echt rood haar maakt deze modellen extra bijzonder en gewild.",
      whatToExpect: "Verwacht modellen met een opvallende uitstraling, vaak met de bijbehorende lichte huid en sproeten. Roodharige modellen vallen op in elke categorie en trekken vaak een trouwe fanbase aan.",
      tips: [
        "Roodharige modellen zijn zeldzamer — sla je favorieten op om ze snel terug te vinden",
        "Veel roodharige modellen zijn bijzonder populair in fetisj- en cosplay-shows",
        "Ierse en Schotse modellen zijn vaker van nature roodharig",
      ],
    },
    en: {
      intro: "Redhead cam models are rare and therefore extra desirable. Red hair — from fiery red to subtle strawberry blonde — gives models a striking, unforgettable appearance.",
      appeal: "Red hair is associated with passion, temperament, and a touch of rebellion. The rarity of natural red hair makes these models extra special and sought-after.",
      whatToExpect: "Expect models with a striking appearance, often with fair skin and freckles. Redhead models stand out in any category and often attract a loyal fanbase.",
      tips: [
        "Redhead models are rarer — save your favourites to find them quickly",
        "Many redhead models are especially popular in fetish and cosplay shows",
        "Irish and Scottish models are more often naturally redheaded",
      ],
    },
  },

  curvy: {
    nl: {
      intro: "De curvy/BBW categorie viert volle rondingen en lichaamspositiviteit. Modellen in deze categorie omarmen hun vormen en stralen een aanstekelijk zelfvertrouwen uit dat hun shows extra aantrekkelijk maakt.",
      appeal: "Curvy modellen bewijzen dat schoonheid in alle maten komt. Hun rondingen, zelfvertrouwen en ongeremde energie zorgen voor shows die net zo opwindend zijn als in elke andere categorie — zo niet meer.",
      whatToExpect: "Verwacht zelfverzekerde modellen die trots hun rondingen laten zien. Shows variëren van sensuele striptease tot energieke dans en meer. Curvy modellen zijn vaak bijzonder interactief.",
      tips: [
        "Curvy modellen waarderen positieve body-positivity complimenten",
        "Veel curvy modellen zijn gespecialiseerd in twerking en dans",
        "BBW en curvy zijn verwante maar verschillende subcategorieën — probeer beide",
      ],
    },
    en: {
      intro: "The curvy/BBW category celebrates full curves and body positivity. Models in this category embrace their shapes and radiate an infectious confidence that makes their shows extra appealing.",
      appeal: "Curvy models prove that beauty comes in all sizes. Their curves, confidence, and uninhibited energy make for shows that are just as exciting as any other category — if not more.",
      whatToExpect: "Expect confident models who proudly show off their curves. Shows range from sensual striptease to energetic dancing and more. Curvy models are often especially interactive.",
      tips: [
        "Curvy models appreciate positive body-positivity compliments",
        "Many curvy models specialise in twerking and dancing",
        "BBW and curvy are related but different subcategories — try both",
      ],
    },
  },

  slim: {
    nl: {
      intro: "Slanke cam modellen combineren elegantie met een ranke lichaamsbouw. De slim categorie is perfect voor wie houdt van modellen met een atletisch, slank of mager figuur.",
      appeal: "Slanke modellen stralen lichtheid en gratie uit. Elke beweging wordt geaccentueerd door hun ranke silhouet, wat zorgt voor visueel sierlijke shows.",
      whatToExpect: "Verwacht elegante modellen met een slank figuur die hun flexibiliteit en gratie benutten. Slanke modellen zijn vaak bijzonder beweeglijk en creatief met posities.",
      tips: [
        "Combineer 'slim' met categoriën als 'petite' of 'teen 18+' voor meer specifieke resultaten",
        "Slanke modellen doen het uitstekend in dans- en striptease-shows",
        "Veel fitness- en yogamodellen vallen in de slim categorie",
      ],
    },
    en: {
      intro: "Slim cam models combine elegance with a slender physique. The slim category is perfect for those who love models with an athletic, slim, or lean figure.",
      appeal: "Slim models radiate lightness and grace. Every movement is accentuated by their slender silhouette, creating visually graceful shows.",
      whatToExpect: "Expect elegant models with slim figures who utilise their flexibility and grace. Slim models are often particularly agile and creative with positions.",
      tips: [
        "Combine 'slim' with categories like 'petite' or 'teen 18+' for more specific results",
        "Slim models excel in dance and striptease shows",
        "Many fitness and yoga models fall in the slim category",
      ],
    },
  },

  lovense: {
    nl: {
      intro: "Lovense en interactieve cam shows vormen de toekomst van live cam entertainment. Met op afstand bestuurbare toys kunnen kijkers direct invloed uitoefenen op het genot van het model — tips sturen trillingen, en jij bepaalt de intensiteit.",
      appeal: "De aantrekkingskracht zit in de directe interactie: jouw tip veroorzaakt een echte, zichtbare reactie bij het model. Dit creëert een unieke machtsdynamiek en een gevoel van echte connectie.",
      whatToExpect: "Verwacht shows met interactieve vibrators (Lovense Lush, Domi, etc.) die reageren op tips. Hoe meer je tipt, hoe intenser de vibratie. Veel modellen hebben tip-menu's met verschillende intensiteiten.",
      tips: [
        "Check het tip-menu van het model om te zien welke bedragen welke vibratiesterkte activeren",
        "Interactieve shows zijn het leukst met meerdere tippers — de cumulatieve energie is geweldig",
        "Veel modellen bieden 'tip-controlled orgasm' shows — volg het model naar een climax",
      ],
    },
    en: {
      intro: "Lovense and interactive cam shows represent the future of live cam entertainment. With remotely controlled toys, viewers can directly influence the model's pleasure — tips send vibrations, and you control the intensity.",
      appeal: "The appeal lies in direct interaction: your tip causes a real, visible reaction from the model. This creates a unique power dynamic and a sense of genuine connection.",
      whatToExpect: "Expect shows with interactive vibrators (Lovense Lush, Domi, etc.) that respond to tips. The more you tip, the more intense the vibration. Many models have tip menus with different intensity levels.",
      tips: [
        "Check the model's tip menu to see which amounts activate which vibration levels",
        "Interactive shows are most fun with multiple tippers — the cumulative energy is amazing",
        "Many models offer 'tip-controlled orgasm' shows — guide the model to a climax",
      ],
    },
  },

  bigass: {
    nl: {
      intro: "De grote kont categorie viert modellen met indrukwekkende achterwerken. Van natuurlijk vol tot fitness-getraind — deze modellen weten precies hoe ze hun beste asset moeten presenteren.",
      appeal: "Een grote, mooie kont is universeel aantrekkelijk. Shows in deze categorie draaien om twerking, shaking, olie-shows en alles wat het achterwerk in de schijnwerpers zet.",
      whatToExpect: "Verwacht twerk-shows, booty-clapping, olie-massages, doggy-style posities en shows die volledig in het teken staan van de achterste. Veel modellen dragen speciaal ondergoed dat hun kont accentueert.",
      tips: [
        "Twerk-shows zijn een specialiteit — tip voor een persoonlijke twerk-sessie",
        "Olie-shows met een grote kont zijn bijzonder populair",
        "Latina en ebony modellen zijn vaak goed vertegenwoordigd in deze categorie",
      ],
    },
    en: {
      intro: "The big ass category celebrates models with impressive rears. From naturally full to fitness-trained — these models know exactly how to present their best asset.",
      appeal: "A big, beautiful butt is universally attractive. Shows in this category revolve around twerking, shaking, oil shows, and everything that puts the rear in the spotlight.",
      whatToExpect: "Expect twerk shows, booty clapping, oil massages, doggy-style positions, and shows entirely dedicated to the behind. Many models wear special underwear that accentuates their butt.",
      tips: [
        "Twerk shows are a speciality — tip for a personal twerk session",
        "Oil shows with a big ass are especially popular",
        "Latina and ebony models are often well-represented in this category",
      ],
    },
  },

  striptease: {
    nl: {
      intro: "Striptease is de oudste kunstvorm in de erotische entertainment en op cam sites is het springlevend. Modellen die een striptease beheersen bouwen spanning op, laag voor laag, tot een onvergetelijke climax.",
      appeal: "De essentie van striptease is anticipatie. Het langzaam onthullen van het lichaam, de suggestieve bewegingen, de spanning van 'wat komt er nu?' — het is een tijdloze verleiding.",
      whatToExpect: "Verwacht opgebouwde shows waar modellen langzaam hun kleding uitdoen, vaak op muziek. Van lingerie-strips tot volledige burlesque-achtige performances — striptease is een kunstvorm.",
      tips: [
        "Geniet van het proces — de beste striptease is de langzame, niet de snelle",
        "Veel modellen hebben speciale outfits voor striptease — vraag naar hun garderobe",
        "Tip na elk kledingstuk voor een interactieve striptease-ervaring",
      ],
    },
    en: {
      intro: "Striptease is the oldest art form in erotic entertainment, and on cam sites it's very much alive. Models who master striptease build tension, layer by layer, to an unforgettable climax.",
      appeal: "The essence of striptease is anticipation. The slow revealing of the body, the suggestive movements, the tension of 'what comes next?' — it's a timeless seduction.",
      whatToExpect: "Expect built-up shows where models slowly remove their clothing, often to music. From lingerie strips to full burlesque-style performances — striptease is an art form.",
      tips: [
        "Enjoy the process — the best striptease is the slow one, not the fast one",
        "Many models have special outfits for striptease — ask about their wardrobe",
        "Tip after each garment for an interactive striptease experience",
      ],
    },
  },

  dildo: {
    nl: {
      intro: "Dildo shows zijn een kernonderdeel van de cam-ervaring. Modellen gebruiken een enorme variatie aan dildo's — van realistisch tot fantasie — voor shows die variëren van sensueel tot intens.",
      appeal: "Het visuele element van penetratie met dildo's is direct opwindend. De verscheidenheid in maten, vormen en materialen zorgt ervoor dat elke show anders is.",
      whatToExpect: "Verwacht shows met allerlei soorten dildo's: realistisch, glazen, zuignap, dubbel, en meer. Modellen bouwen vaak op van kleiner naar groter en variëren tussen vaginaal en anaal gebruik.",
      tips: [
        "Veel modellen hebben een collectie dildo's — vraag naar hun favoriete",
        "Rides (zuignap-dildo) shows zijn bijzonder populair en visueel indrukwekkend",
        "Combineer met de 'deepthroat' tag voor orale dildo-shows",
      ],
    },
    en: {
      intro: "Dildo shows are a core part of the cam experience. Models use an enormous variety of dildos — from realistic to fantasy — for shows ranging from sensual to intense.",
      appeal: "The visual element of dildo penetration is directly exciting. The variety in sizes, shapes, and materials ensures every show is different.",
      whatToExpect: "Expect shows with all kinds of dildos: realistic, glass, suction cup, double, and more. Models often build up from smaller to larger and alternate between vaginal and anal use.",
      tips: [
        "Many models have a dildo collection — ask about their favourite",
        "Ride (suction cup dildo) shows are especially popular and visually impressive",
        "Combine with the 'deepthroat' tag for oral dildo shows",
      ],
    },
  },

  cosplay: {
    nl: {
      intro: "Cosplay cam shows combineren de fantasiewereld met erotiek. Modellen verkleden zich als anime-personages, superhelden, game-characters en meer voor unieke thema-shows die creativiteit en sensualiteit samenbrengen.",
      appeal: "Cosplay maakt fantasieën letterlijk waar. Het zien van je favoriete fictieve personage tot leven komen in een erotische context is een unieke ervaring die alleen op cam te vinden is.",
      whatToExpect: "Verwacht uitgebreide kostuums, roleplay-scenarios, thema-kamers en modellen die volledig in hun personage opgaan. Van schoolgirl tot succubus — de mogelijkheden zijn eindeloos.",
      tips: [
        "Veel cosplay modellen nemen verzoeken aan — vraag naar je favoriete personage",
        "Aziatische modellen zijn vaak bijzonder goed in anime-cosplay",
        "Cosplay shows zijn populairder rond conventie-seizoenen en nieuwe anime-releases",
      ],
    },
    en: {
      intro: "Cosplay cam shows combine the fantasy world with erotica. Models dress up as anime characters, superheroes, game characters, and more for unique themed shows that bring together creativity and sensuality.",
      appeal: "Cosplay literally makes fantasies come true. Seeing your favourite fictional character come to life in an erotic context is a unique experience found only on cam.",
      whatToExpect: "Expect elaborate costumes, roleplay scenarios, themed rooms, and models who fully embody their character. From schoolgirl to succubus — the possibilities are endless.",
      tips: [
        "Many cosplay models take requests — ask about your favourite character",
        "Asian models are often especially skilled at anime cosplay",
        "Cosplay shows are more popular around convention seasons and new anime releases",
      ],
    },
  },

  smoking: {
    nl: {
      intro: "Roken-fetisj cam shows zijn een niche maar trouwe categorie. Modellen die roken tijdens hun show creëren een sensuele, filmische sfeer die fans van deze fetisj bijzonder aanspreekt.",
      appeal: "De combinatie van rook, lippen en verleidelijke blikken creëert een glamoureuze, retro-achtige sfeer. Roken op cam heeft iets cinematografisch — denk aan oude Hollywood-sterren.",
      whatToExpect: "Verwacht modellen die sensueel roken terwijl ze poses aannemen, langzaam uitkleden of gewoon chatten. Sommige modellen gebruiken sigaretten, anderen vapes of sigaren.",
      tips: [
        "Wees specifiek over je voorkeur: sigaret, sigaar of vape",
        "Roken wordt vaak gecombineerd met lingerie of retro-stijl outfits",
        "Dit is een niche-categorie — sla favoriete modellen op, ze zijn minder talrijk",
      ],
    },
    en: {
      intro: "Smoking fetish cam shows are a niche but loyal category. Models who smoke during their show create a sensual, cinematic atmosphere that particularly appeals to fans of this fetish.",
      appeal: "The combination of smoke, lips, and seductive glances creates a glamorous, retro-like atmosphere. Smoking on cam has something cinematic — think old Hollywood stars.",
      whatToExpect: "Expect models who sensually smoke while posing, slowly undressing, or just chatting. Some models use cigarettes, others vapes or cigars.",
      tips: [
        "Be specific about your preference: cigarette, cigar, or vape",
        "Smoking is often combined with lingerie or retro-style outfits",
        "This is a niche category — save favourite models, they're less numerous",
      ],
    },
  },

  pregnant: {
    nl: {
      intro: "Zwangere cam modellen vieren de schoonheid van het moederlichaam. De zwanger-categorie is voor wie het zwangere lichaam bewondert — de rondingen, de gloed en de unieke sensualiteit van deze levensfase.",
      appeal: "Zwangerschap straalt vruchtbaarheid, vrouwelijkheid en een unieke schoonheid uit. De veranderende lichaamsvorm, vollere borsten en de 'pregnancy glow' maken deze modellen bijzonder aantrekkelijk.",
      whatToExpect: "Verwacht modellen die trots hun zwangere buik en vollere vormen tonen. Shows variëren van zacht en sensueel tot expliciet, afhankelijk van het model en de fase van de zwangerschap.",
      tips: [
        "Zwangere modellen zijn tijdelijk — geniet van ze nu, want ze zijn straks niet meer zwanger",
        "Wees respectvol over de zwangerschap — de meeste modellen delen graag hun ervaring",
        "Belly-olie-shows zijn bijzonder populair in deze categorie",
      ],
    },
    en: {
      intro: "Pregnant cam models celebrate the beauty of the expectant body. The pregnant category is for those who admire the pregnant form — the curves, the glow, and the unique sensuality of this life phase.",
      appeal: "Pregnancy radiates fertility, femininity, and unique beauty. The changing body shape, fuller breasts, and the 'pregnancy glow' make these models particularly attractive.",
      whatToExpect: "Expect models who proudly show their pregnant belly and fuller forms. Shows range from soft and sensual to explicit, depending on the model and pregnancy stage.",
      tips: [
        "Pregnant models are temporary — enjoy them now, as they won't be pregnant forever",
        "Be respectful about the pregnancy — most models are happy to share their experience",
        "Belly oil shows are particularly popular in this category",
      ],
    },
  },

  muscle: {
    nl: {
      intro: "Gespierde cam modellen tonen de schoonheid van een getraind lichaam. Van fitness modellen tot bodybuilders — de muscle categorie is voor bewonderaars van kracht, discipline en fysieke perfectie.",
      appeal: "Gespierde modellen combineren kracht met sensualiteit. Het gebeeldhouwde lichaam, de strakke spieren en de discipline die erachter zit spreken een specifiek publiek enorm aan.",
      whatToExpect: "Verwacht flex-shows, olie-shows over gespannen spieren, fitness-gerelateerde content en modellen die trots hun getrainde lichaam presenteren. Veel gespierde modellen doen ook aan sportgerelateerde roleplay.",
      tips: [
        "Veel gespierde modellen zijn ook personal trainers — vraag naar fitness-tips",
        "Olie- en flex-shows zijn de populairste formats in deze categorie",
        "Gespierde modellen zijn vaak actiever in de ochtend na hun workout",
      ],
    },
    en: {
      intro: "Muscular cam models showcase the beauty of a trained body. From fitness models to bodybuilders — the muscle category is for admirers of strength, discipline, and physical perfection.",
      appeal: "Muscular models combine strength with sensuality. The sculpted body, tight muscles, and the discipline behind it strongly appeal to a specific audience.",
      whatToExpect: "Expect flex shows, oil shows over tense muscles, fitness-related content, and models who proudly present their trained physique. Many muscular models also do sport-related roleplay.",
      tips: [
        "Many muscular models are also personal trainers — ask for fitness tips",
        "Oil and flex shows are the most popular formats in this category",
        "Muscular models are often more active in the morning after their workout",
      ],
    },
  },
};

// ─── Template helpers ────────────────────────────────────────────────────────

type SupportedLang = "nl" | "en";

const uiStrings: Record<SupportedLang, {
  sectionAboutTitle: (cat: string, plat: string) => string;
  sectionWhyTitle: (plat: string, cat: string) => string;
  sectionHowTitle: string;
  sectionTipsTitle: (cat: string, plat: string) => string;
  faqPlatTitle: (cat: string, plat: string) => string;
}> = {
  nl: {
    sectionAboutTitle: (cat, plat) => `Over ${cat} op ${plat}`,
    sectionWhyTitle: (plat, cat) => `Waarom ${plat} voor ${cat}?`,
    sectionHowTitle: "Hoe begin je met gratis kijken?",
    sectionTipsTitle: (cat, plat) => `Tips voor ${cat} op ${plat}`,
    faqPlatTitle: (cat, plat) => `${cat} op ${plat}`,
  },
  en: {
    sectionAboutTitle: (cat, plat) => `About ${cat} on ${plat}`,
    sectionWhyTitle: (plat, cat) => `Why ${plat} for ${cat}?`,
    sectionHowTitle: "How to start watching for free?",
    sectionTipsTitle: (cat, plat) => `Tips for ${cat} on ${plat}`,
    faqPlatTitle: (cat, plat) => `${cat} on ${plat}`,
  },
};

// ─── FAQ templates per platform × lang ───────────────────────────────────────

interface FaqTemplate {
  q: string;
  a: string;
}

const platformFaqTemplates: Record<string, Record<SupportedLang, (cat: string) => FaqTemplate[]>> = {

  chaturbate: {
    nl: (cat) => [
      { q: `Is ${cat} kijken op Chaturbate gratis?`, a: `Ja, Chaturbate is volledig gratis te bekijken. Je kunt ${cat} shows volgen zonder account of betaling. Wil je chatten of tippen? Dan maak je een gratis account aan en koop je optioneel tokens.` },
      { q: `Hoeveel ${cat} modellen zijn er op Chaturbate?`, a: `Chaturbate is het grootste cam platform ter wereld. Er zijn op elk moment honderden ${cat} modellen online. Het exacte aantal wisselt per tijdstip, maar de keuze is altijd enorm.` },
      { q: `Kan ik ${cat} modellen op Chaturbate tippen met Lovense?`, a: `Ja, veel ${cat} modellen op Chaturbate gebruiken interactieve Lovense toys. Door tokens te sturen activeer je de vibratie — zo heb je directe invloed op de show.` },
    ],
    en: (cat) => [
      { q: `Is watching ${cat} on Chaturbate free?`, a: `Yes, Chaturbate is completely free to watch. You can follow ${cat} shows without an account or payment. Want to chat or tip? Create a free account and optionally purchase tokens.` },
      { q: `How many ${cat} models are on Chaturbate?`, a: `Chaturbate is the world's largest cam platform. There are hundreds of ${cat} models online at any given time. The exact number varies by time of day, but the selection is always enormous.` },
      { q: `Can I tip ${cat} models on Chaturbate with Lovense?`, a: `Yes, many ${cat} models on Chaturbate use interactive Lovense toys. By sending tokens you activate the vibration — giving you direct influence over the show.` },
    ],
  },

  stripchat: {
    nl: (cat) => [
      { q: `Hoe vind ik ${cat} modellen op Stripchat?`, a: `Stripchat heeft de meest geavanceerde zoekfunctie van alle cam sites. Gebruik de filters om direct op ${cat} te zoeken en combineer met andere kenmerken zoals taal, leeftijd of regio.` },
      { q: `Heeft Stripchat VR-shows voor ${cat}?`, a: `Ja! Stripchat is het eerste platform met VR-cams. Sommige ${cat} modellen bieden VR-shows aan voor een volledig meeslepende ervaring. Je hebt hiervoor een VR-headset nodig.` },
      { q: `Is Stripchat gratis voor ${cat} shows?`, a: `Absoluut. Alle openbare ${cat} shows op Stripchat zijn gratis te bekijken. Voor privéshows of speciale functies kun je tokens aanschaffen.` },
    ],
    en: (cat) => [
      { q: `How do I find ${cat} models on Stripchat?`, a: `Stripchat has the most advanced search function of any cam site. Use the filters to search directly for ${cat} and combine with other characteristics like language, age, or region.` },
      { q: `Does Stripchat have VR shows for ${cat}?`, a: `Yes! Stripchat is the first platform with VR cams. Some ${cat} models offer VR shows for a fully immersive experience. You'll need a VR headset for this.` },
      { q: `Is Stripchat free for ${cat} shows?`, a: `Absolutely. All public ${cat} shows on Stripchat are free to watch. For private shows or special features, you can purchase tokens.` },
    ],
  },

  bongacams: {
    nl: (cat) => [
      { q: `Zijn er veel ${cat} modellen op BongaCams?`, a: `Ja, BongaCams heeft een groot aanbod ${cat} modellen, met name uit Europa. Het platform groeit snel en er komen dagelijks nieuwe modellen bij in deze categorie.` },
      { q: `Welke bonussen biedt BongaCams voor ${cat}?`, a: `BongaCams biedt regelmatig promoties en bonussen aan. Nieuwe gebruikers ontvangen vaak gratis tokens, en er zijn regelmatig wedstrijden waar ${cat} modellen aan deelnemen.` },
      { q: `Kan ik gratis ${cat} shows bekijken op BongaCams?`, a: `Ja, alle openbare ${cat} kamers op BongaCams zijn gratis toegankelijk. Je kunt direct beginnen met kijken zonder registratie.` },
    ],
    en: (cat) => [
      { q: `Are there many ${cat} models on BongaCams?`, a: `Yes, BongaCams has a large selection of ${cat} models, particularly from Europe. The platform is growing rapidly with new models joining this category daily.` },
      { q: `What bonuses does BongaCams offer for ${cat}?`, a: `BongaCams regularly offers promotions and bonuses. New users often receive free tokens, and there are regular contests that ${cat} models participate in.` },
      { q: `Can I watch free ${cat} shows on BongaCams?`, a: `Yes, all public ${cat} rooms on BongaCams are freely accessible. You can start watching immediately without registration.` },
    ],
  },

  cam4: {
    nl: (cat) => [
      { q: `Zijn er Nederlandse ${cat} modellen op CAM4?`, a: `Ja! CAM4 heeft van alle platforms het grootste aanbod Nederlandse en Belgische modellen. Je vindt hier ${cat} modellen die Nederlands spreken, waardoor je in je eigen taal kunt communiceren.` },
      { q: `Is CAM4 geschikt voor ${cat} amateurs?`, a: `Absoluut. CAM4 staat bekend om zijn authentieke amateur-community. Veel ${cat} modellen op CAM4 zijn echte amateurs die vanuit huis streamen.` },
      { q: `Hoe bekijk ik ${cat} shows op CAM4 gratis?`, a: `Alle openbare shows op CAM4 zijn gratis. Bezoek de site, filter op ${cat}, en begin direct met kijken. Een gratis account geeft toegang tot extra functies.` },
    ],
    en: (cat) => [
      { q: `Are there Dutch ${cat} models on CAM4?`, a: `Yes! CAM4 has the largest selection of Dutch and Belgian models of any platform. You'll find ${cat} models who speak Dutch, allowing you to communicate in your own language.` },
      { q: `Is CAM4 suitable for amateur ${cat}?`, a: `Absolutely. CAM4 is known for its authentic amateur community. Many ${cat} models on CAM4 are real amateurs streaming from home.` },
      { q: `How do I watch ${cat} shows on CAM4 for free?`, a: `All public shows on CAM4 are free. Visit the site, filter for ${cat}, and start watching immediately. A free account gives access to extra features.` },
    ],
  },

  jerkmate: {
    nl: (cat) => [
      { q: `Hoe werkt het matching-algoritme van Jerkmate voor ${cat}?`, a: `Jerkmate vraagt naar je voorkeuren, waaronder ${cat}, en matcht je vervolgens met modellen die perfect aansluiten. Je ziet meteen welke modellen beschikbaar zijn, samengebracht vanuit meerdere platforms.` },
      { q: `Combineert Jerkmate ${cat} modellen van verschillende platforms?`, a: `Ja, dat is het unieke aan Jerkmate. Het aggregeert ${cat} modellen van platforms zoals Streamate en meer, zodat je de grootste selectie in één overzicht hebt.` },
      { q: `Heb ik een apart account nodig voor ${cat} op Jerkmate?`, a: `Nee, je hebt slechts één Jerkmate-account nodig. Het platform regelt de verbinding met de onderliggende platforms automatisch.` },
    ],
    en: (cat) => [
      { q: `How does Jerkmate's matching algorithm work for ${cat}?`, a: `Jerkmate asks about your preferences, including ${cat}, and then matches you with models that fit perfectly. You immediately see which models are available, aggregated from multiple platforms.` },
      { q: `Does Jerkmate combine ${cat} models from different platforms?`, a: `Yes, that's what makes Jerkmate unique. It aggregates ${cat} models from platforms like Streamate and more, giving you the largest selection in one overview.` },
      { q: `Do I need a separate account for ${cat} on Jerkmate?`, a: `No, you only need one Jerkmate account. The platform handles the connection to the underlying platforms automatically.` },
    ],
  },

  xcams: {
    nl: (cat) => [
      { q: `Wat maakt ${cat} op XCams anders dan andere platforms?`, a: `XCams richt zich op premium kwaliteit. De ${cat} modellen op XCams zijn vaak professioneler en ervaren, wat resulteert in gepolijstere en intiemere shows.` },
      { q: `Zijn er veel Europese ${cat} modellen op XCams?`, a: `Ja, XCams heeft een sterke Europese focus. Je vindt er ${cat} modellen uit Frankrijk, Spanje, Italië, Roemenië en andere Europese landen.` },
      { q: `Biedt XCams cam-to-cam voor ${cat}?`, a: `Ja, XCams biedt cam-to-cam functionaliteit zodat ${cat} modellen jou ook kunnen zien. Dit maakt de ervaring veel persoonlijker en interactiever.` },
    ],
    en: (cat) => [
      { q: `What makes ${cat} on XCams different from other platforms?`, a: `XCams focuses on premium quality. The ${cat} models on XCams are often more professional and experienced, resulting in more polished and intimate shows.` },
      { q: `Are there many European ${cat} models on XCams?`, a: `Yes, XCams has a strong European focus. You'll find ${cat} models from France, Spain, Italy, Romania, and other European countries.` },
      { q: `Does XCams offer cam-to-cam for ${cat}?`, a: `Yes, XCams offers cam-to-cam functionality so ${cat} models can see you too. This makes the experience much more personal and interactive.` },
    ],
  },

  flirt4free: {
    nl: (cat) => [
      { q: `Krijg ik gratis credits voor ${cat} op Flirt4Free?`, a: `Ja, nieuwe gebruikers van Flirt4Free ontvangen gratis credits. Hiermee kun je ${cat} shows uitproberen, inclusief privéshows en multi-user shows, zonder direct te hoeven betalen.` },
      { q: `Heeft Flirt4Free veel ${cat} modellen?`, a: `Flirt4Free heeft een uitgebreid categorieaanbod met veel ${cat} modellen. Het platform staat vooral bekend om professionele shows en niche-categorieën.` },
      { q: `Wat zijn multi-user shows voor ${cat} op Flirt4Free?`, a: `Bij multi-user shows deel je de kosten met andere kijkers. Je betaalt minder dan bij een privéshow maar krijgt toch een ${cat} show van hoge kwaliteit.` },
    ],
    en: (cat) => [
      { q: `Do I get free credits for ${cat} on Flirt4Free?`, a: `Yes, new Flirt4Free users receive free credits. You can use these to try ${cat} shows, including private and multi-user shows, without having to pay upfront.` },
      { q: `Does Flirt4Free have many ${cat} models?`, a: `Flirt4Free has an extensive category selection with many ${cat} models. The platform is especially known for professional shows and niche categories.` },
      { q: `What are multi-user shows for ${cat} on Flirt4Free?`, a: `In multi-user shows, you share costs with other viewers. You pay less than a private show but still get a high-quality ${cat} show.` },
    ],
  },

  islive: {
    nl: (cat) => [
      { q: `Zijn de ${cat} modellen op Islive Nederlandstalig?`, a: `Ja, Islive is het grootste Nederlandse cam platform. Vrijwel alle ${cat} modellen spreken Nederlands, zodat je in je eigen taal kunt communiceren en een vertrouwde ervaring hebt.` },
      { q: `Biedt Islive freechat voor ${cat}?`, a: `Ja, op Islive kun je via freechat gratis met ${cat} modellen praten voordat je besluit een privéshow te starten. Zo leer je het model eerst kennen.` },
      { q: `Kan ik cam-to-cam doen met ${cat} modellen op Islive?`, a: `Absoluut. Islive biedt cam-to-cam functionaliteit zodat ${cat} modellen jou ook kunnen zien. Dit maakt de ervaring veel persoonlijker.` },
    ],
    en: (cat) => [
      { q: `Are the ${cat} models on Islive Dutch-speaking?`, a: `Yes, Islive is the largest Dutch cam platform. Virtually all ${cat} models speak Dutch, so you can communicate in your own language for a familiar experience.` },
      { q: `Does Islive offer free chat for ${cat}?`, a: `Yes, on Islive you can talk to ${cat} models for free via free chat before deciding to start a private show. This way you get to know the model first.` },
      { q: `Can I do cam-to-cam with ${cat} models on Islive?`, a: `Absolutely. Islive offers cam-to-cam functionality so ${cat} models can see you too. This makes the experience much more personal.` },
    ],
  },
};

// ─── Category FAQ templates ──────────────────────────────────────────────────

const categoryFaqTemplates: Record<string, Record<SupportedLang, (plat: string) => FaqTemplate>> = {

  teen: {
    nl: (plat) => ({ q: `Zijn alle Teen 18+ modellen op ${plat} geverifieerd?`, a: `Ja, ${plat} vereist strikte leeftijdsverificatie met officieel ID. Alle teen modellen zijn minimaal 18 jaar oud.` }),
    en: (plat) => ({ q: `Are all Teen 18+ models on ${plat} verified?`, a: `Yes, ${plat} requires strict age verification with official ID. All teen models are at least 18 years old.` }),
  },
  milf: {
    nl: (plat) => ({ q: `Hoe herken ik echte MILF modellen op ${plat}?`, a: `MILF modellen op ${plat} zijn doorgaans 30-50 jaar en profileren zich bewust als MILF. Check hun profiel voor leeftijd en beschrijving.` }),
    en: (plat) => ({ q: `How do I recognise real MILF models on ${plat}?`, a: `MILF models on ${plat} are typically aged 30-50 and consciously profile themselves as MILF. Check their profile for age and description.` }),
  },
  mature: {
    nl: (plat) => ({ q: `Vanaf welke leeftijd wordt een model als mature beschouwd op ${plat}?`, a: `Op ${plat} vallen modellen van 40 jaar en ouder doorgaans in de mature categorie. De exacte grens verschilt per model.` }),
    en: (plat) => ({ q: `From what age is a model considered mature on ${plat}?`, a: `On ${plat}, models aged 40 and over typically fall in the mature category. The exact threshold varies per model.` }),
  },
  asian: {
    nl: (plat) => ({ q: `Uit welke landen komen de Aziatische modellen op ${plat}?`, a: `Aziatische modellen op ${plat} komen uit diverse landen: Japan, Korea, Filipijnen, Thailand, China en meer. De variatie is groot.` }),
    en: (plat) => ({ q: `Which countries do the Asian models on ${plat} come from?`, a: `Asian models on ${plat} come from diverse countries: Japan, Korea, Philippines, Thailand, China, and more. The variety is wide.` }),
  },
  latina: {
    nl: (plat) => ({ q: `Spreken Latina modellen op ${plat} ook Engels?`, a: `Veel Latina modellen op ${plat} spreken zowel Spaans als Engels. Sommigen spreken ook Portugees. Check het profiel voor taalinformatie.` }),
    en: (plat) => ({ q: `Do Latina models on ${plat} also speak English?`, a: `Many Latina models on ${plat} speak both Spanish and English. Some also speak Portuguese. Check the profile for language information.` }),
  },
  ebony: {
    nl: (plat) => ({ q: `Zijn er veel Ebony modellen online op ${plat}?`, a: `Ja, ${plat} heeft een goed aanbod Ebony modellen. Het aantal verschilt per tijdstip, maar er zijn altijd meerdere Ebony modellen live.` }),
    en: (plat) => ({ q: `Are there many Ebony models online on ${plat}?`, a: `Yes, ${plat} has a good selection of Ebony models. Numbers vary by time of day, but there are always multiple Ebony models live.` }),
  },
  bigtits: {
    nl: (plat) => ({ q: `Kan ik op ${plat} filteren op borstgrootte?`, a: `De meeste platforms, waaronder ${plat}, laten je filteren op lichaamstags. Zoek op 'big tits' of vergelijkbare tags om modellen met grote borsten te vinden.` }),
    en: (plat) => ({ q: `Can I filter by breast size on ${plat}?`, a: `Most platforms, including ${plat}, let you filter by body tags. Search for 'big tits' or similar tags to find models with large breasts.` }),
  },
  petite: {
    nl: (plat) => ({ q: `Wat is het verschil tussen petite en slim op ${plat}?`, a: `Petite verwijst naar kleinere, compacte vrouwen (vaak onder 1.63m), terwijl slim puur over een slank figuur gaat. Op ${plat} kun je op beide filteren.` }),
    en: (plat) => ({ q: `What's the difference between petite and slim on ${plat}?`, a: `Petite refers to smaller, compact women (often under 5'4"), while slim is purely about a slender figure. On ${plat} you can filter for both.` }),
  },
  anal: {
    nl: (plat) => ({ q: `Bieden alle ${plat} modellen anale shows aan?`, a: `Nee, niet alle modellen bieden anaal aan. Op ${plat} kun je filteren op modellen die anaal in hun tags of tip-menu hebben staan.` }),
    en: (plat) => ({ q: `Do all ${plat} models offer anal shows?`, a: `No, not all models offer anal. On ${plat} you can filter for models who have anal listed in their tags or tip menu.` }),
  },
  couple: {
    nl: (plat) => ({ q: `Zijn de koppels op ${plat} echte stellen?`, a: `De meeste koppels op ${plat} zijn echte partners. Sommige zijn professionele duo's. Check hun profiel voor meer informatie over hun relatie.` }),
    en: (plat) => ({ q: `Are the couples on ${plat} real partners?`, a: `Most couples on ${plat} are real partners. Some are professional duos. Check their profile for more information about their relationship.` }),
  },
  squirt: {
    nl: (plat) => ({ q: `Hoe weet ik of een model op ${plat} echt kan squirten?`, a: `Modellen die regelmatig squirten vermelden dit in hun profiel of tags. Op ${plat} kun je ook kijkersreviews checken en kijken naar hun show-historie.` }),
    en: (plat) => ({ q: `How do I know if a model on ${plat} can really squirt?`, a: `Models who regularly squirt mention this in their profile or tags. On ${plat} you can also check viewer reviews and look at their show history.` }),
  },
  bdsm: {
    nl: (plat) => ({ q: `Zijn de BDSM modellen op ${plat} professioneel opgeleid?`, a: `Veel BDSM modellen op ${plat} hebben ervaring en soms professionele training. Check hun profiel voor hun specialiteiten en ervaring.` }),
    en: (plat) => ({ q: `Are the BDSM models on ${plat} professionally trained?`, a: `Many BDSM models on ${plat} have experience and sometimes professional training. Check their profile for their specialities and experience.` }),
  },
  tattoo: {
    nl: (plat) => ({ q: `Kan ik op ${plat} filteren op modellen met tattoos?`, a: `Ja, op ${plat} kun je zoeken op tags als 'tattoo' of 'inked' om modellen met tattoos te vinden. Veel modellen vermelden het ook in hun bio.` }),
    en: (plat) => ({ q: `Can I filter for tattooed models on ${plat}?`, a: `Yes, on ${plat} you can search for tags like 'tattoo' or 'inked' to find tattooed models. Many models also mention it in their bio.` }),
  },
  hairy: {
    nl: (plat) => ({ q: `Zijn hairy shows populair op ${plat}?`, a: `Ja, de hairy categorie heeft een trouwe fanbase op ${plat}. Er zijn altijd meerdere modellen online die hun natuurlijke lichaamsbeharing tonen.` }),
    en: (plat) => ({ q: `Are hairy shows popular on ${plat}?`, a: `Yes, the hairy category has a loyal fanbase on ${plat}. There are always multiple models online showcasing their natural body hair.` }),
  },
  feet: {
    nl: (plat) => ({ q: `Hebben ${plat} modellen speciale voeten-shows?`, a: `Ja, veel modellen op ${plat} bieden speciale voetenshows aan met footjobs, toe-play en meer. Filter op 'feet' om ze te vinden.` }),
    en: (plat) => ({ q: `Do ${plat} models have special foot shows?`, a: `Yes, many models on ${plat} offer special foot shows featuring footjobs, toe play, and more. Filter for 'feet' to find them.` }),
  },
  outdoor: {
    nl: (plat) => ({ q: `Zijn outdoor shows toegestaan op ${plat}?`, a: `Ja, ${plat} staat outdoor shows toe zolang modellen aan de platformregels voldoen. De beschikbaarheid hangt af van het seizoen en het weer.` }),
    en: (plat) => ({ q: `Are outdoor shows allowed on ${plat}?`, a: `Yes, ${plat} allows outdoor shows as long as models comply with platform rules. Availability depends on the season and weather.` }),
  },
  mobile: {
    nl: (plat) => ({ q: `Kan ik ${plat} ook op mijn telefoon bekijken?`, a: `Ja, ${plat} is volledig mobiel-geoptimaliseerd. Je kunt alle shows bekijken op je smartphone of tablet met dezelfde kwaliteit.` }),
    en: (plat) => ({ q: `Can I watch ${plat} on my phone?`, a: `Yes, ${plat} is fully mobile-optimised. You can watch all shows on your smartphone or tablet with the same quality.` }),
  },
  blonde: {
    nl: (plat) => ({ q: `Zijn er veel blonde modellen op ${plat}?`, a: `Ja, blonde modellen vormen een van de grootste groepen op ${plat}. Er zijn altijd tientallen blonde modellen online in verschillende stijlen.` }),
    en: (plat) => ({ q: `Are there many blonde models on ${plat}?`, a: `Yes, blonde models form one of the largest groups on ${plat}. There are always dozens of blonde models online in various styles.` }),
  },
  brunette: {
    nl: (plat) => ({ q: `Hoe vind ik de beste brunette modellen op ${plat}?`, a: `Gebruik de zoekfilters op ${plat} om op brunette te filteren. Sorteer op populariteit of rating om de best beoordeelde brunette modellen te vinden.` }),
    en: (plat) => ({ q: `How do I find the best brunette models on ${plat}?`, a: `Use the search filters on ${plat} to filter for brunette. Sort by popularity or rating to find the top-rated brunette models.` }),
  },
  redhead: {
    nl: (plat) => ({ q: `Zijn roodharige modellen zeldzaam op ${plat}?`, a: `Roodharige modellen zijn zeldzamer dan blonde of brunette, maar ${plat} heeft altijd een selectie online. Sla je favorieten op om ze terug te vinden.` }),
    en: (plat) => ({ q: `Are redhead models rare on ${plat}?`, a: `Redhead models are rarer than blonde or brunette, but ${plat} always has a selection online. Save your favourites to find them again.` }),
  },
  curvy: {
    nl: (plat) => ({ q: `Wat is het verschil tussen curvy en BBW op ${plat}?`, a: `Curvy verwijst naar vrouwen met uitgesproken rondingen, terwijl BBW (Big Beautiful Women) vaak voller gebouwd zijn. Op ${plat} overlappen deze categorieën deels.` }),
    en: (plat) => ({ q: `What's the difference between curvy and BBW on ${plat}?`, a: `Curvy refers to women with pronounced curves, while BBW (Big Beautiful Women) are often fuller-figured. On ${plat} these categories partially overlap.` }),
  },
  slim: {
    nl: (plat) => ({ q: `Zijn slanke modellen populair op ${plat}?`, a: `Ja, slanke modellen zijn zeer populair op ${plat}. De slim categorie omvat atletische, slanke en rankere modellen en is een van de meest bezochte.` }),
    en: (plat) => ({ q: `Are slim models popular on ${plat}?`, a: `Yes, slim models are very popular on ${plat}. The slim category includes athletic, slender, and lean models and is one of the most visited.` }),
  },
  lovense: {
    nl: (plat) => ({ q: `Welke interactieve toys gebruiken modellen op ${plat}?`, a: `Modellen op ${plat} gebruiken voornamelijk Lovense toys zoals de Lush, Domi en Nora. Sommigen gebruiken ook OhMiBod of andere merken. Het tip-menu toont welke vibraties je kunt activeren.` }),
    en: (plat) => ({ q: `Which interactive toys do models use on ${plat}?`, a: `Models on ${plat} primarily use Lovense toys like the Lush, Domi, and Nora. Some also use OhMiBod or other brands. The tip menu shows which vibrations you can activate.` }),
  },
  bigass: {
    nl: (plat) => ({ q: `Kan ik twerk-shows vinden op ${plat}?`, a: `Ja, veel modellen met een grote kont op ${plat} bieden twerk-shows aan. Filter op 'big ass' of 'twerk' en tip voor een persoonlijke twerk-sessie.` }),
    en: (plat) => ({ q: `Can I find twerk shows on ${plat}?`, a: `Yes, many big ass models on ${plat} offer twerk shows. Filter for 'big ass' or 'twerk' and tip for a personal twerk session.` }),
  },
  striptease: {
    nl: (plat) => ({ q: `Bieden alle modellen op ${plat} striptease aan?`, a: `De meeste modellen op ${plat} doen een vorm van striptease als onderdeel van hun show. Modellen die striptease als specialiteit hebben, vermelden dit in hun profiel.` }),
    en: (plat) => ({ q: `Do all models on ${plat} offer striptease?`, a: `Most models on ${plat} perform some form of striptease as part of their show. Models who specialise in striptease mention it in their profile.` }),
  },
  dildo: {
    nl: (plat) => ({ q: `Welke soorten dildo's gebruiken modellen op ${plat}?`, a: `Modellen op ${plat} gebruiken een breed scala: realistische dildo's, glazen toys, zuignap-dildo's, dubbelzijdige en meer. Veel modellen tonen hun collectie in hun profiel.` }),
    en: (plat) => ({ q: `What types of dildos do models use on ${plat}?`, a: `Models on ${plat} use a wide range: realistic dildos, glass toys, suction cup dildos, double-sided, and more. Many models showcase their collection in their profile.` }),
  },
  cosplay: {
    nl: (plat) => ({ q: `Kan ik cosplay-verzoeken doen op ${plat}?`, a: `Ja, veel cosplay modellen op ${plat} nemen verzoeken aan. Neem contact op via de chat of privébericht om te vragen of ze jouw favoriete personage kunnen doen.` }),
    en: (plat) => ({ q: `Can I make cosplay requests on ${plat}?`, a: `Yes, many cosplay models on ${plat} take requests. Reach out via chat or private message to ask if they can do your favourite character.` }),
  },
  smoking: {
    nl: (plat) => ({ q: `Zijn er veel roken-fetisj modellen op ${plat}?`, a: `Roken is een niche-categorie, maar ${plat} heeft een selectie modellen die hier in gespecialiseerd zijn. Zoek op de 'smoking' tag om ze te vinden.` }),
    en: (plat) => ({ q: `Are there many smoking fetish models on ${plat}?`, a: `Smoking is a niche category, but ${plat} has a selection of models who specialise in it. Search for the 'smoking' tag to find them.` }),
  },
  pregnant: {
    nl: (plat) => ({ q: `Hoe vind ik zwangere modellen op ${plat}?`, a: `Filter op de 'pregnant' tag op ${plat}. Houd er rekening mee dat dit een tijdelijke categorie is — het aantal zwangere modellen wisselt.` }),
    en: (plat) => ({ q: `How do I find pregnant models on ${plat}?`, a: `Filter for the 'pregnant' tag on ${plat}. Keep in mind this is a temporary category — the number of pregnant models fluctuates.` }),
  },
  muscle: {
    nl: (plat) => ({ q: `Zijn er fitness-modellen op ${plat}?`, a: `Ja, de muscle categorie op ${plat} bevat fitness-modellen en bodybuilders. Ze bieden flex-shows, olie-shows en sportgerelateerde content aan.` }),
    en: (plat) => ({ q: `Are there fitness models on ${plat}?`, a: `Yes, the muscle category on ${plat} includes fitness models and bodybuilders. They offer flex shows, oil shows, and sport-related content.` }),
  },
};

// ─── Content generation ──────────────────────────────────────────────────────

function buildSections(
  platformSlug: string,
  categorySlug: string,
  lang: SupportedLang,
  platformName: string,
  catLabel: string,
): { title: string; text: string }[] {
  const plat = platformDescriptions[platformSlug]?.[lang];
  const cat = categoryDescriptions[categorySlug]?.[lang];
  if (!plat || !cat) return [];

  const ui = uiStrings[lang];

  // Section 1: About this category on this platform
  const section1 = {
    title: ui.sectionAboutTitle(catLabel, platformName),
    text: lang === "nl"
      ? `${cat.intro}\n\nOp ${platformName} vind je een uitgebreid aanbod ${catLabel} modellen die live online zijn. ${plat.intro.split(". ").slice(1).join(". ") || plat.intro}\n\n${cat.appeal} ${platformName} biedt de perfecte omgeving om ${catLabel} shows te ontdekken, met een groot aantal actieve modellen in deze categorie.`
      : `${cat.intro}\n\nOn ${platformName}, you'll find an extensive selection of ${catLabel} models streaming live. ${plat.intro.split(". ").slice(1).join(". ") || plat.intro}\n\n${cat.appeal} ${platformName} provides the perfect environment to discover ${catLabel} shows, with a large number of active models in this category.`,
  };

  // Section 2: Why this platform for this category
  const strengthsList = plat.strengths.map((s) => `- ${s}`).join("\n");
  const section2 = {
    title: ui.sectionWhyTitle(platformName, catLabel),
    text: lang === "nl"
      ? `${platformName} is een uitstekende keuze voor ${catLabel} cam shows. Dit zijn de voornaamste redenen:\n\n${strengthsList}\n\n${plat.uniqueFact} Dit maakt ${platformName} bijzonder geschikt voor ${catLabel} content.`
      : `${platformName} is an excellent choice for ${catLabel} cam shows. Here are the main reasons:\n\n${strengthsList}\n\n${plat.uniqueFact} This makes ${platformName} particularly suitable for ${catLabel} content.`,
  };

  // Section 3: How to get started
  const section3 = {
    title: ui.sectionHowTitle,
    text: lang === "nl"
      ? `${plat.howTo}\n\nOm ${catLabel} shows te vinden, gebruik je de zoekfunctie of categoriefilters op ${platformName}. ${cat.whatToExpect} Via StartVagina (www.startvagina.nl) kun je ook direct modellen in deze categorie bekijken en vergelijken.`
      : `${plat.howTo}\n\nTo find ${catLabel} shows, use the search function or category filters on ${platformName}. ${cat.whatToExpect} Via StartVagina (www.startvagina.nl) you can also directly view and compare models in this category.`,
  };

  // Section 4: Tips
  const tipsList = cat.tips.map((t) => `- ${t}`).join("\n");
  const section4 = {
    title: ui.sectionTipsTitle(catLabel, platformName),
    text: lang === "nl"
      ? `Wil je het meeste uit ${catLabel} shows op ${platformName} halen? Hier zijn onze tips:\n\n${tipsList}\n\nOnthoud dat de beste ervaring vaak komt door actief deel te nemen aan de chat en modellen te laten weten dat je hun show waardeert.`
      : `Want to get the most out of ${catLabel} shows on ${platformName}? Here are our tips:\n\n${tipsList}\n\nRemember that the best experience often comes from actively participating in chat and letting models know you appreciate their show.`,
  };

  return [section1, section2, section3, section4];
}

function buildFaq(
  platformSlug: string,
  categorySlug: string,
  lang: SupportedLang,
  platformName: string,
  catLabel: string,
): { q: string; a: string }[] {
  const platformFaqs = platformFaqTemplates[platformSlug]?.[lang]?.(catLabel) ?? [];
  const categoryFaq = categoryFaqTemplates[categorySlug]?.[lang]?.(platformName);

  const faqs = [...platformFaqs];
  if (categoryFaq) faqs.push(categoryFaq);

  return faqs;
}

// ─── Exported functions ──────────────────────────────────────────────────────

/** Check if a platform-category combo is valid */
export function isValidPlatformCategory(
  platformSlug: string,
  categoryShortSlug: string,
): boolean {
  return platformSlug in platformConfigs && categoryShortSlug in categoryConfigs;
}

/** Generate content for a platform × category combo page */
export function getPlatformCategoryContent(
  platformSlug: string,
  categoryShortSlug: string,
  lang: Language,
): PlatformCategoryContent | null {
  // Only NL and EN are supported for combo pages
  if (lang !== "nl" && lang !== "en") return null;

  const platConfig = platformConfigs[platformSlug];
  const catConfig = categoryConfigs[categoryShortSlug];
  if (!platConfig || !catConfig) return null;

  const platformName = platConfig.name;
  const catLabel = catConfig.label[lang];

  const title = lang === "nl"
    ? `${catLabel} Cams op ${platformName} — Live ${catLabel} Shows | StartVagina`
    : `${catLabel} Cams on ${platformName} — Live ${catLabel} Shows | StartVagina`;

  const h1 = lang === "nl"
    ? `${catLabel} Live op ${platformName} — Gratis ${catLabel} Cam Shows`
    : `${catLabel} Live on ${platformName} — Free ${catLabel} Cam Shows`;

  // Unique meta description
  const description = lang === "nl"
    ? `Bekijk gratis ${catLabel} cam shows op ${platformName}. Live ${catLabel} modellen, HD-streams en interactieve shows op StartVagina.`
    : `Watch free ${catLabel} cam shows on ${platformName}. Live ${catLabel} models, HD streams and interactive shows on StartVagina.`;

  // Intro
  const platDesc = platformDescriptions[platformSlug]?.[lang];
  const catDesc = categoryDescriptions[categoryShortSlug]?.[lang];
  const intro = lang === "nl"
    ? `Ontdek de beste ${catLabel} cam modellen op ${platformName}. ${platDesc?.intro.split(". ")[0] ?? platformName} biedt een breed aanbod ${catLabel} shows die je gratis kunt bekijken. ${catDesc?.intro.split(". ")[0] ?? ""}.`
    : `Discover the best ${catLabel} cam models on ${platformName}. ${platDesc?.intro.split(". ")[0] ?? platformName} offers a wide selection of ${catLabel} shows you can watch for free. ${catDesc?.intro.split(". ")[0] ?? ""}.`;

  const sections = buildSections(platformSlug, categoryShortSlug, lang, platformName, catLabel);
  const faq = buildFaq(platformSlug, categoryShortSlug, lang, platformName, catLabel);

  return { title, h1, description, intro, sections, faq };
}

// ─── Re-exports for convenience ──────────────────────────────────────────────

export const PLATFORM_SLUGS = Object.keys(platformConfigs);
export const CATEGORY_SHORT_SLUGS = Object.keys(categoryConfigs);

export function getPlatformConfig(slug: string): PlatformConfig | undefined {
  return platformConfigs[slug];
}

export function getCategoryLabel(slug: string, lang: "nl" | "en"): string | undefined {
  return categoryConfigs[slug]?.label[lang];
}
