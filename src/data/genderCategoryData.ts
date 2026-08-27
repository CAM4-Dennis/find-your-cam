import type { Language } from "@/i18n/translations";

/* ────────────────────────────────────────────────────────────────────────────
 *  Gender × Category combo page content
 *  Template-based system that generates unique SEO content for every
 *  combination of gender (4) and category (30) in NL and EN.
 *  Example pages: /vrouwen/milf, /mannen/asian, /koppels/teen, /trans/mature
 * ────────────────────────────────────────────────────────────────────────── */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GenderCategoryContent {
  title: string;
  h1: string;
  description: string;
  intro: string;
  sections: { title: string; text: string }[];
  faq: { q: string; a: string }[];
}

export interface GenderConfig {
  slug: string;
  genderId: string;
  label: Record<"nl" | "en", string>;
}

// ─── Gender configs ──────────────────────────────────────────────────────────

export const genderConfigs: GenderConfig[] = [
  { slug: "vrouwen", genderId: "female", label: { nl: "Vrouwen", en: "Women" } },
  { slug: "mannen", genderId: "male", label: { nl: "Mannen", en: "Men" } },
  { slug: "koppels", genderId: "couple", label: { nl: "Koppels", en: "Couples" } },
  { slug: "trans", genderId: "trans", label: { nl: "Trans", en: "Trans" } },
];

type SupportedLang = "nl" | "en";

// ─── Category config (labels) ────────────────────────────────────────────────

interface CategoryConfig {
  label: Record<SupportedLang, string>;
}

const categoryConfigs: Record<string, CategoryConfig> = {
  teen:       { label: { nl: "Teen 18+",            en: "Teen 18+" } },
  milf:       { label: { nl: "MILF",                en: "MILF" } },
  mature:     { label: { nl: "Mature",              en: "Mature" } },
  asian:      { label: { nl: "Aziatisch",           en: "Asian" } },
  latina:     { label: { nl: "Latina",              en: "Latina" } },
  ebony:      { label: { nl: "Ebony",               en: "Ebony" } },
  bigtits:    { label: { nl: "Grote Borsten",       en: "Big Tits" } },
  petite:     { label: { nl: "Petite",              en: "Petite" } },
  anal:       { label: { nl: "Anaal",               en: "Anal" } },
  couple:     { label: { nl: "Koppels",             en: "Couples" } },
  squirt:     { label: { nl: "Squirt",              en: "Squirt" } },
  bdsm:       { label: { nl: "BDSM",                en: "BDSM" } },
  tattoo:     { label: { nl: "Tattoo",              en: "Tattoo" } },
  hairy:      { label: { nl: "Behaard",             en: "Hairy" } },
  feet:       { label: { nl: "Voeten",              en: "Feet" } },
  outdoor:    { label: { nl: "Outdoor",             en: "Outdoor" } },
  mobile:     { label: { nl: "Mobiel",              en: "Mobile" } },
  blonde:     { label: { nl: "Blond",               en: "Blonde" } },
  brunette:   { label: { nl: "Brunette",            en: "Brunette" } },
  redhead:    { label: { nl: "Roodharig",           en: "Redhead" } },
  curvy:      { label: { nl: "Curvy/BBW",           en: "Curvy/BBW" } },
  slim:       { label: { nl: "Slank",               en: "Slim" } },
  lovense:    { label: { nl: "Lovense/Interactief", en: "Lovense/Interactive" } },
  bigass:     { label: { nl: "Grote Kont",          en: "Big Ass" } },
  striptease: { label: { nl: "Striptease",          en: "Striptease" } },
  dildo:      { label: { nl: "Dildo",               en: "Dildo" } },
  cosplay:    { label: { nl: "Cosplay",             en: "Cosplay" } },
  smoking:    { label: { nl: "Roken",               en: "Smoking" } },
  pregnant:   { label: { nl: "Zwanger",             en: "Pregnant" } },
  muscle:     { label: { nl: "Gespierd",            en: "Muscle" } },
};

// ─── Gender descriptions ─────────────────────────────────────────────────────

interface GenderDescription {
  intro: string;
  strengths: string[];
  howTo: string;
}

const genderDescriptions: Record<string, Record<SupportedLang, GenderDescription>> = {

  vrouwen: {
    nl: {
      intro: "Vrouwelijke cam modellen vormen de grootste en meest diverse groep op vrijwel elk cam platform. Of je nu kijkt op Chaturbate, Stripchat, BongaCams of een ander platform — het aanbod vrouwelijke modellen is overweldigend groot. Van amateurs tot professionele performers, vrouwelijke modellen bieden shows in elke denkbare categorie en niche.",
      strengths: [
        "Verreweg het grootste aanbod op elk platform — altijd duizenden vrouwelijke modellen online",
        "Beschikbaar in elke categorie, niche en lichaamtype dat je maar kunt bedenken",
        "Van subtiele erotiek tot expliciete shows — vrouwelijke modellen bieden het volledige spectrum",
        "Platforms zoals Chaturbate en Stripchat hebben geavanceerde filters specifiek voor vrouwelijke modellen",
      ],
      howTo: "Op StartVagina vind je eenvoudig vrouwelijke cam modellen door te filteren op gender. Combineer het genderfilter met een categorie naar keuze om precies het type show te vinden dat bij jou past. De meeste platforms hebben de meerderheid van hun aanbod in vrouwelijke modellen, dus je hebt altijd keuze genoeg.",
    },
    en: {
      intro: "Female cam models form the largest and most diverse group on virtually every cam platform. Whether you're watching on Chaturbate, Stripchat, BongaCams, or any other platform — the selection of female models is overwhelmingly vast. From amateurs to professional performers, female models offer shows in every conceivable category and niche.",
      strengths: [
        "By far the largest selection on every platform — always thousands of female models online",
        "Available in every category, niche, and body type imaginable",
        "From subtle erotica to explicit shows — female models offer the full spectrum",
        "Platforms like Chaturbate and Stripchat have advanced filters specifically for female models",
      ],
      howTo: "On StartVagina you can easily find female cam models by filtering on gender. Combine the gender filter with a category of your choice to find exactly the type of show that suits you. Most platforms have the majority of their offering in female models, so you'll always have plenty of choice.",
    },
  },

  mannen: {
    nl: {
      intro: "Mannelijke cam modellen vormen een groeiende niche in de cam-industrie. Hoewel het aanbod kleiner is dan bij vrouwen, bieden mannelijke modellen unieke shows die steeds populairder worden. Platforms zoals Chaturbate en CAM4 hebben een aanzienlijk aanbod mannelijke performers, van solo-shows tot interactieve sessies.",
      strengths: [
        "Een groeiende niche met steeds meer professionele mannelijke performers",
        "Populair op Chaturbate en CAM4 waar de mannelijke community het sterkst is",
        "Unieke dynamiek — mannelijke shows bieden een ander soort energie en interactie",
        "Minder concurrentie betekent vaak meer persoonlijke aandacht van het model",
      ],
      howTo: "Op StartVagina filter je op 'Mannen' om mannelijke cam modellen te vinden. Chaturbate en CAM4 hebben het grootste aanbod mannelijke modellen. Gebruik categorie-filters om specifieke typen mannelijke shows te vinden, van gespierd tot twink, van solo tot interactief.",
    },
    en: {
      intro: "Male cam models represent a growing niche in the cam industry. While the selection is smaller than for women, male models offer unique shows that are becoming increasingly popular. Platforms like Chaturbate and CAM4 have a considerable selection of male performers, from solo shows to interactive sessions.",
      strengths: [
        "A growing niche with more and more professional male performers",
        "Popular on Chaturbate and CAM4 where the male community is strongest",
        "Unique dynamic — male shows offer a different kind of energy and interaction",
        "Less competition often means more personal attention from the model",
      ],
      howTo: "On StartVagina, filter on 'Men' to find male cam models. Chaturbate and CAM4 have the largest selection of male models. Use category filters to find specific types of male shows, from muscular to twink, from solo to interactive.",
    },
  },

  koppels: {
    nl: {
      intro: "Koppels op cam bieden een voyeuristische ervaring die solo-shows niet kunnen evenaren. Echte stellen delen hun intimiteit live en creëren een authentieke dynamiek vol chemie en passie. CAM4 en Chaturbate zijn bijzonder populair voor koppelshows, met zowel heteroseksuele als LGBTQ+ stellen.",
      strengths: [
        "Authentieke chemie tussen echte partners die hun intimiteit delen",
        "Variatie van romantisch en sensueel tot wild en ongegeneerd",
        "Bijzonder populair op CAM4 en Chaturbate met een grote koppels-community",
        "Voyeuristische thrill die je bij solo-shows niet vindt",
      ],
      howTo: "Op StartVagina vind je koppels door te filteren op het gender 'Koppels'. CAM4 is van oudsher sterk in koppelshows, maar ook Chaturbate heeft een groot aanbod. Filter vervolgens op categorie om het type koppel-show te vinden dat je zoekt — van romantisch tot hardcore.",
    },
    en: {
      intro: "Couples on cam offer a voyeuristic experience that solo shows can't match. Real couples share their intimacy live, creating an authentic dynamic full of chemistry and passion. CAM4 and Chaturbate are particularly popular for couples shows, featuring both heterosexual and LGBTQ+ couples.",
      strengths: [
        "Authentic chemistry between real partners sharing their intimacy",
        "Variety from romantic and sensual to wild and uninhibited",
        "Especially popular on CAM4 and Chaturbate with a large couples community",
        "Voyeuristic thrill you won't find in solo shows",
      ],
      howTo: "On StartVagina, find couples by filtering on the 'Couples' gender. CAM4 has traditionally been strong in couples shows, but Chaturbate also has a large selection. Then filter by category to find the type of couples show you're looking for — from romantic to hardcore.",
    },
  },

  trans: {
    nl: {
      intro: "Trans cam modellen vormen een van de snelst groeiende categorieën in de cam-industrie. Met toenemende acceptatie en zichtbaarheid groeit het aanbod trans performers gestaag. Chaturbate en Stripchat bieden het grootste aanbod trans modellen, van pre-op tot post-op, met shows die variëren van sensueel tot expliciet.",
      strengths: [
        "Een van de snelst groeiende niches in de cam-industrie",
        "Groot aanbod op Chaturbate en Stripchat met gespecialiseerde trans-secties",
        "Unieke schoonheid en diversiteit — van femme tot androgyn",
        "Hechte community met loyale fans en interactieve modellen",
      ],
      howTo: "Op StartVagina filter je op 'Trans' om trans cam modellen te vinden. Chaturbate heeft een aparte trans-sectie met uitstekende filters. Stripchat biedt eveneens een groot aanbod. Gebruik categorie-filters om specifieker te zoeken op lichaamtype, etniciteit of type show.",
    },
    en: {
      intro: "Trans cam models represent one of the fastest-growing categories in the cam industry. With increasing acceptance and visibility, the selection of trans performers continues to grow steadily. Chaturbate and Stripchat offer the largest selection of trans models, from pre-op to post-op, with shows ranging from sensual to explicit.",
      strengths: [
        "One of the fastest-growing niches in the cam industry",
        "Large selection on Chaturbate and Stripchat with dedicated trans sections",
        "Unique beauty and diversity — from femme to androgynous",
        "Tight-knit community with loyal fans and interactive models",
      ],
      howTo: "On StartVagina, filter on 'Trans' to find trans cam models. Chaturbate has a dedicated trans section with excellent filters. Stripchat also offers a large selection. Use category filters to search more specifically by body type, ethnicity, or show type.",
    },
  },
};

// ─── Category descriptions (gender-aware) ────────────────────────────────────

interface GenderCategoryDescription {
  intro: string;
  appeal: string;
  tips: string[];
}

const categoryDescriptions: Record<string, Record<SupportedLang, GenderCategoryDescription>> = {

  teen: {
    nl: {
      intro: "Teen 18+ cam shows staan bekend om hun jeugdige energie en spontaniteit. Alle modellen zijn 18+ en streng geverifieerd.",
      appeal: "De frisheid en het enthousiasme van jonge modellen die net begonnen zijn met cammen zorgen voor opwindende, onvoorspelbare shows.",
      tips: [
        "Gebruik het 'New Models' filter om de nieuwste modellen te ontdekken",
        "Veel teen modellen zijn actiever in de avonduren en weekenden",
        "Tip vroeg om gezien te worden — nieuwe modellen waarderen supporters extra",
      ],
    },
    en: {
      intro: "Teen 18+ cam shows are known for their youthful energy and spontaneity. All models are 18+ and strictly verified.",
      appeal: "The freshness and enthusiasm of young models just starting out with camming make for exciting, unpredictable shows.",
      tips: [
        "Use the 'New Models' filter to discover the newest models",
        "Many teen models are more active during evenings and weekends",
        "Tip early to get noticed — new models especially appreciate supporters",
      ],
    },
  },

  milf: {
    nl: {
      intro: "MILF cam shows bieden de ervaring en zelfverzekerdheid die alleen rijpere performers kunnen geven. Ze weten precies wat ze doen.",
      appeal: "De combinatie van ervaring, zelfvertrouwen en rijpe sensualiteit maakt MILF shows bijzonder populair onder kenners.",
      tips: [
        "MILF modellen zijn vaak overdag online — perfecte timing voor persoonlijke aandacht",
        "Veel MILF modellen bieden cam-to-cam aan voor een intiemere ervaring",
        "Neem de tijd om een connectie op te bouwen — MILF modellen waarderen echte interactie",
      ],
    },
    en: {
      intro: "MILF cam shows offer the experience and confidence that only mature performers can provide. They know exactly what they're doing.",
      appeal: "The combination of experience, self-confidence, and mature sensuality makes MILF shows particularly popular among connoisseurs.",
      tips: [
        "MILF models are often online during the day — perfect timing for personal attention",
        "Many MILF models offer cam-to-cam for a more intimate experience",
        "Take time to build a connection — MILF models appreciate genuine interaction",
      ],
    },
  },

  mature: {
    nl: {
      intro: "Mature cam shows tonen performers van 40+ die met trots hun ervaring en sensualiteit delen. Leeftijd doet niets af aan aantrekkingskracht.",
      appeal: "Mature modellen stralen onweerstaanbare zelfverzekerdheid uit. Ze zijn comfortabel in hun eigen huid en weten wat ze willen.",
      tips: [
        "Mature modellen waarderen respectvolle en volwassen interactie",
        "Veel mature modellen zijn 's ochtends en overdag online",
        "Privéshows zijn vaak bijzonder persoonlijk en intiem",
      ],
    },
    en: {
      intro: "Mature cam shows feature performers aged 40+ who proudly share their experience and sensuality. Age takes nothing away from attractiveness.",
      appeal: "Mature models radiate irresistible self-confidence. They're comfortable in their own skin and know what they want.",
      tips: [
        "Mature models appreciate respectful and adult interaction",
        "Many mature models are online in the morning and during the day",
        "Private shows tend to be especially personal and intimate",
      ],
    },
  },

  asian: {
    nl: {
      intro: "Aziatische cam modellen zijn wereldwijd populair vanwege hun exotische schoonheid, speelse persoonlijkheid en culturele diversiteit.",
      appeal: "De combinatie van schoonheid, mysterie en een vaak speelse stijl trekt miljoenen kijkers aan. Cosplay en thema-shows zijn populaire elementen.",
      tips: [
        "Houd rekening met tijdzones — veel Aziatische modellen zijn 's nachts (EU-tijd) online",
        "Cosplay en thema-shows zijn populair — vraag ernaar",
        "Een klein woordje in hun taal wordt altijd gewaardeerd",
      ],
    },
    en: {
      intro: "Asian cam models are popular worldwide for their exotic beauty, playful personalities, and cultural diversity.",
      appeal: "The combination of beauty, mystery, and an often playful style attracts millions of viewers. Cosplay and themed shows are popular elements.",
      tips: [
        "Keep time zones in mind — many Asian models are online at night (EU time)",
        "Cosplay and themed shows are popular — ask about them",
        "A small greeting in their language is always appreciated",
      ],
    },
  },

  latina: {
    nl: {
      intro: "Latina cam modellen brengen vuur, passie en ongeëvenaarde energie naar hun shows. Bekend om hun rondingen en temperament.",
      appeal: "Het Latijnse temperament vertaalt zich naar shows vol passie, dans en expressie die je niet snel vergeet.",
      tips: [
        "Latina modellen houden van interactie — wees actief in de chat",
        "Veel Latina modellen spreken Spaans en Engels",
        "Reggaeton en muziek spelen vaak een rol in hun shows",
      ],
    },
    en: {
      intro: "Latina cam models bring fire, passion, and unmatched energy to their shows. Known for their curves and temperament.",
      appeal: "The Latin temperament translates into shows full of passion, dancing, and expression you won't soon forget.",
      tips: [
        "Latina models love interaction — be active in chat",
        "Many Latina models speak Spanish and English",
        "Reggaeton and music often play a role in their shows",
      ],
    },
  },

  ebony: {
    nl: {
      intro: "Ebony cam modellen vieren diversiteit en brengen een krachtige, zelfverzekerde uitstraling naar het scherm.",
      appeal: "Ebony modellen staan bekend om hun zelfvertrouwen, expressieve persoonlijkheden en energieke shows vol dans en persoonlijkheid.",
      tips: [
        "Ebony modellen waarderen complimenten en positieve energie",
        "Veel ebony modellen zijn gespecialiseerd in twerking en dans",
        "Zoek modellen met interactieve toys voor extra spannende shows",
      ],
    },
    en: {
      intro: "Ebony cam models celebrate diversity and bring a powerful, confident presence to the screen.",
      appeal: "Ebony models are known for their self-confidence, expressive personalities, and energetic shows full of dance and personality.",
      tips: [
        "Ebony models appreciate compliments and positive energy",
        "Many ebony models specialise in twerking and dancing",
        "Look for models with interactive toys for extra exciting shows",
      ],
    },
  },

  bigtits: {
    nl: {
      intro: "Grote borsten behoren tot de meest gezochte categorieën op cam sites. Modellen met een volle boezem weten precies hoe ze hun assets in scène zetten.",
      appeal: "De aantrekkingskracht is tijdloos — grote borsten combineren visueel spektakel met sensualiteit. De variatie is enorm, van natuurlijk tot enhanced.",
      tips: [
        "Veel modellen bieden speciale olie-shows of lingerie-shows aan",
        "Gebruik cupmaat-filters als het platform dit ondersteunt",
        "Overweeg een privéshow voor exclusieve aandacht",
      ],
    },
    en: {
      intro: "Big tits are among the most searched categories on cam sites. Models with full busts know exactly how to showcase their assets.",
      appeal: "The appeal is timeless — big tits combine visual spectacle with sensuality. The variety is enormous, from natural to enhanced.",
      tips: [
        "Many models offer special oil shows or lingerie shows",
        "Use cup size filters if the platform supports them",
        "Consider a private show for exclusive attention",
      ],
    },
  },

  petite: {
    nl: {
      intro: "Petite cam modellen betoveren met hun slanke, compacte lichamen en elegante uitstraling.",
      appeal: "Petite modellen combineren kwetsbaarheid met veerkracht. Hun kleinere gestalte maakt elke beweging gracieus en visueel aantrekkelijk.",
      tips: [
        "Petite modellen zijn vaak actiever in interactieve tip-gebaseerde shows",
        "Lingerie en bodystockings komen extra goed tot hun recht",
        "Veel petite modellen doen ook aan cosplay of rollenspel",
      ],
    },
    en: {
      intro: "Petite cam models enchant with their slim, compact bodies and elegant appearance.",
      appeal: "Petite models combine vulnerability with resilience. Their smaller stature makes every movement graceful and visually appealing.",
      tips: [
        "Petite models are often more active in interactive tip-based shows",
        "Lingerie and bodystockings look especially good on them",
        "Many petite models also do cosplay or roleplay",
      ],
    },
  },

  anal: {
    nl: {
      intro: "Anale cam shows zijn voor kijkers die van intense, grensverleggende content houden. Modellen in deze categorie zijn ervaren en voorbereid.",
      appeal: "Anale shows bieden een extra niveau van intensiteit en intimiteit. Het taboe-element maakt het extra spannend.",
      tips: [
        "Wees geduldig — anale shows zijn beter wanneer er opbouw is",
        "Modellen die anaal aanbieden vermelden dit vaak in hun profiel",
        "Tip genereus voor speciale verzoeken — dit vraagt extra inspanning",
      ],
    },
    en: {
      intro: "Anal cam shows are for viewers who enjoy intense, boundary-pushing content. Models in this category are experienced and prepared.",
      appeal: "Anal shows offer an extra level of intensity and intimacy. The taboo element adds excitement.",
      tips: [
        "Be patient — anal shows are better with build-up",
        "Models who offer anal often mention this in their profile",
        "Tip generously for special requests — this requires extra effort",
      ],
    },
  },

  couple: {
    nl: {
      intro: "Koppels-shows bieden een voyeuristische ervaring met echte stellen die hun intimiteit live delen.",
      appeal: "De chemie tussen echte partners is inherent opwindender dan een soloshow. Spontaniteit en passie maken deze shows onweerstaanbaar.",
      tips: [
        "Koppels reageren goed op specifieke verzoeken via tips",
        "Zoek stellen die al langer samen zijn voor voelbare chemie",
        "Veel koppels streamen 's avonds vanuit hun eigen slaapkamer",
      ],
    },
    en: {
      intro: "Couples shows offer a voyeuristic experience with real partners sharing their intimacy live.",
      appeal: "The chemistry between real partners is inherently more exciting than a solo show. Spontaneity and passion make these shows irresistible.",
      tips: [
        "Couples respond well to specific requests through tips",
        "Look for couples who've been together longer for palpable chemistry",
        "Many couples stream in the evening from their own bedroom",
      ],
    },
  },

  squirt: {
    nl: {
      intro: "Squirt shows behoren tot de meest spectaculaire cam shows. Het moment van squirten is intens en visueel indrukwekkend.",
      appeal: "De intensiteit en het visuele spektakel maken squirt shows onweerstaanbaar. Het is een teken van echt, intens genot.",
      tips: [
        "Squirt shows vergen opbouw — geniet van het hele proces",
        "Modellen met interactieve toys laten je meebeslissen over het tempo",
        "Filter op 'squirt' tags om de beste modellen te vinden",
      ],
    },
    en: {
      intro: "Squirt shows are among the most spectacular cam shows. The squirting moment is intense and visually impressive.",
      appeal: "The intensity and visual spectacle make squirt shows irresistible. It's a sign of real, intense pleasure.",
      tips: [
        "Squirt shows need build-up — enjoy the entire process",
        "Models with interactive toys let you influence the pace",
        "Filter on 'squirt' tags to find the best models",
      ],
    },
  },

  bdsm: {
    nl: {
      intro: "BDSM cam shows verkennen dominantie, submissie, bondage en discipline. Van lichte spanking tot volledige rope bondage.",
      appeal: "BDSM stelt machtsdynamiek en vertrouwen centraal. De spanning tussen controle en overgave creëert een unieke, intense kijkervaring.",
      tips: [
        "Communiceer duidelijk over grenzen bij een privéshow",
        "BDSM shows zijn het meest indrukwekkend bij ervaren modellen",
        "Veel dominatrices bieden taken aan — volg de regels voor de beste ervaring",
      ],
    },
    en: {
      intro: "BDSM cam shows explore dominance, submission, bondage, and discipline. From light spanking to full rope bondage.",
      appeal: "BDSM centres power dynamics and trust. The tension between control and surrender creates a unique, intense viewing experience.",
      tips: [
        "Communicate clearly about limits when booking a private show",
        "BDSM shows are most impressive with experienced models",
        "Many dominatrices offer tasks — follow the rules for the best experience",
      ],
    },
  },

  tattoo: {
    nl: {
      intro: "Getattooeerde modellen stralen een rebelse, artistieke uitstraling uit. Body art voegt een extra visuele dimensie toe aan shows.",
      appeal: "Tattoos geven modellen een uniek, herkenbaar uiterlijk. De combinatie van body art en erotiek is esthetisch aantrekkelijk.",
      tips: [
        "Vraag naar de verhalen achter de tattoos — het is een mooie ijsbreker",
        "Getattooeerde modellen zijn vaak ook actief in alt/punk subcategorieën",
        "Veel getattooeerde modellen combineren inkt met cosplay",
      ],
    },
    en: {
      intro: "Tattooed models radiate a rebellious, artistic vibe. Body art adds an extra visual dimension to shows.",
      appeal: "Tattoos give models a unique, recognisable look. The combination of body art and erotica is aesthetically appealing.",
      tips: [
        "Ask about the stories behind the tattoos — it's a great icebreaker",
        "Tattooed models are often also active in alt/punk subcategories",
        "Many tattooed models combine ink with cosplay",
      ],
    },
  },

  hairy: {
    nl: {
      intro: "De hairy categorie viert natuurlijke lichaamsbeharing in al haar vormen. Deze modellen omarmen hun natuurlijke lichaam met trots.",
      appeal: "In een wereld waar alles gladgeschoren lijkt, biedt de hairy categorie een verfrissend alternatief vol authenticiteit en zelfvertrouwen.",
      tips: [
        "Laat weten dat je de natuurlijke look waardeert — het wordt zeer gewaardeerd",
        "Deze categorie overlapt vaak met vintage en retro stijlen",
        "Veel hairy modellen zetten hun natuurlijke look bewust in als onderdeel van hun brand",
      ],
    },
    en: {
      intro: "The hairy category celebrates natural body hair in all its forms. These models embrace their natural bodies with pride.",
      appeal: "In a world where everything seems clean-shaven, the hairy category offers a refreshing alternative full of authenticity and confidence.",
      tips: [
        "Let them know you appreciate the natural look — it's very much welcomed",
        "This category often overlaps with vintage and retro styles",
        "Many hairy models deliberately incorporate their natural look as part of their brand",
      ],
    },
  },

  feet: {
    nl: {
      intro: "Voetenfetisj is een van de populairste fetisjen ter wereld. Modellen in deze categorie weten precies hoe ze hun voeten verleidelijk presenteren.",
      appeal: "Het gaat verder dan alleen het visuele — de elegantie van een voetboog, het spel met tenen, schoenen en kousen vormen een complete sensuele ervaring.",
      tips: [
        "Wees specifiek over wat je wilt zien — voetenfetisj kent veel subniches",
        "Veel modellen bieden op maat gemaakte voetcontent aan",
        "Zoek op tags als 'feet', 'soles' of 'footjob' voor de beste resultaten",
      ],
    },
    en: {
      intro: "Foot fetish is one of the most popular fetishes worldwide. Models in this category know exactly how to showcase their feet seductively.",
      appeal: "It goes beyond just the visual — the elegance of an arch, the play with toes, shoes and stockings form a complete sensual experience.",
      tips: [
        "Be specific about what you want to see — foot fetish has many sub-niches",
        "Many models offer custom-made foot content",
        "Search for tags like 'feet', 'soles', or 'footjob' for the best results",
      ],
    },
  },

  outdoor: {
    nl: {
      intro: "Outdoor cam shows combineren de spanning van exhibitionisme met de schoonheid van de natuur. Een element van risico en avontuur.",
      appeal: "De spanning van betrapt kunnen worden, natuurlijk licht op het lichaam en een onconventionele setting maken outdoor shows onweerstaanbaar.",
      tips: [
        "Outdoor shows zijn weersafhankelijk — zoek ze vooral in de zomermaanden",
        "De kwaliteit kan variëren door natuurlijk licht — dat hoort erbij",
        "Veel outdoor modellen streamen via mobiel voor een ruwe, authentieke vibe",
      ],
    },
    en: {
      intro: "Outdoor cam shows combine the thrill of exhibitionism with the beauty of nature. An element of risk and adventure.",
      appeal: "The thrill of potentially being caught, natural light on the body, and an unconventional setting make outdoor shows irresistible.",
      tips: [
        "Outdoor shows are weather-dependent — look for them in summer months",
        "Quality may vary due to natural light — that's part of the charm",
        "Many outdoor models stream via mobile for a raw, authentic vibe",
      ],
    },
  },

  mobile: {
    nl: {
      intro: "Mobiele cam shows brengen de actie dichterbij. Modellen die via hun telefoon streamen bieden een POV-achtige, intieme ervaring.",
      appeal: "Het mobiele perspectief geeft shows een selfie-achtige intimiteit. Het voelt alsof het model je persoonlijk videobelt.",
      tips: [
        "Mobiele streams zijn perfect als je zelf ook op je telefoon kijkt",
        "De audio is vaak dichter en persoonlijker via mobiel",
        "Veel mobiele modellen combineren dit met outdoor of badkamer-content",
      ],
    },
    en: {
      intro: "Mobile cam shows bring the action closer. Models streaming from their phones offer a POV-like, intimate experience.",
      appeal: "The mobile perspective gives shows a selfie-like intimacy. It feels as though the model is personally video-calling you.",
      tips: [
        "Mobile streams are perfect if you're also watching on your phone",
        "Audio is often closer and more personal via mobile",
        "Many mobile models combine this with outdoor or bathroom content",
      ],
    },
  },

  blonde: {
    nl: {
      intro: "Blonde modellen zijn tijdloos populair en vertegenwoordigen een klassieke esthetiek. Van platinablond tot honingblond — de variatie is groot.",
      appeal: "Blond haar straalt een mix van onschuld en glamour uit, van girl-next-door tot glamoureuze bombshell.",
      tips: [
        "Combineer 'blond' met een andere categorie voor specifiekere resultaten",
        "Blonde Oost-Europese modellen zijn populair op BongaCams en Stripchat",
        "Veel modellen variëren hun haarkleur — check het profiel voor de actuele look",
      ],
    },
    en: {
      intro: "Blonde models are timelessly popular, representing a classic aesthetic. From platinum to honey blonde — the variety is wide.",
      appeal: "Blonde hair radiates a mix of innocence and glamour, from girl-next-door to glamorous bombshell.",
      tips: [
        "Combine 'blonde' with another category for more specific results",
        "Blonde Eastern European models are popular on BongaCams and Stripchat",
        "Many models change their hair colour — check their profile for the current look",
      ],
    },
  },

  brunette: {
    nl: {
      intro: "Brunette modellen belichamen een natuurlijke, aardse schoonheid. Donker haar geeft een mysterieuze, verleidelijke uitstraling.",
      appeal: "Brunettes worden geassocieerd met mysterie, intelligentie en natuurlijke elegantie — een aantrekkelijk alternatief voor de blonde look.",
      tips: [
        "Brunettes vormen de grootste groep — gebruik extra filters om te specificeren",
        "Veel Latijns-Amerikaanse en Mediterrane modellen zijn brunette",
        "Combineer met lichaamstypefilters voor gerichtere resultaten",
      ],
    },
    en: {
      intro: "Brunette models embody a natural, earthy beauty. Dark hair gives a mysterious, seductive appearance.",
      appeal: "Brunettes are associated with mystery, intelligence, and natural elegance — an attractive alternative to the blonde look.",
      tips: [
        "Brunettes form the largest group — use extra filters to narrow down",
        "Many Latin American and Mediterranean models are brunette",
        "Combine with body type filters for more targeted results",
      ],
    },
  },

  redhead: {
    nl: {
      intro: "Roodharige modellen zijn zeldzaam en daarom extra gewild. Rood haar geeft een opvallende, onvergetelijke uitstraling.",
      appeal: "Roodharig wordt geassocieerd met passie, temperament en rebellie. De zeldzaamheid maakt deze modellen extra bijzonder.",
      tips: [
        "Roodharige modellen zijn zeldzamer — sla favorieten op om ze terug te vinden",
        "Veel roodharige modellen zijn populair in fetisj- en cosplay-shows",
        "Ierse en Schotse modellen zijn vaker van nature roodharig",
      ],
    },
    en: {
      intro: "Redhead models are rare and therefore extra desirable. Red hair gives a striking, unforgettable appearance.",
      appeal: "Red hair is associated with passion, temperament, and rebellion. The rarity makes these models extra special.",
      tips: [
        "Redhead models are rarer — save favourites to find them quickly",
        "Many redhead models are popular in fetish and cosplay shows",
        "Irish and Scottish models are more often naturally redheaded",
      ],
    },
  },

  curvy: {
    nl: {
      intro: "De curvy/BBW categorie viert volle rondingen en lichaamspositiviteit. Modellen omarmen hun vormen met aanstekelijk zelfvertrouwen.",
      appeal: "Curvy modellen bewijzen dat schoonheid in alle maten komt. Hun rondingen en ongeremde energie zorgen voor opwindende shows.",
      tips: [
        "Curvy modellen waarderen positieve body-positivity complimenten",
        "Veel curvy modellen zijn gespecialiseerd in twerking en dans",
        "BBW en curvy zijn verwante maar verschillende subcategorieën — probeer beide",
      ],
    },
    en: {
      intro: "The curvy/BBW category celebrates full curves and body positivity. Models embrace their shapes with infectious confidence.",
      appeal: "Curvy models prove that beauty comes in all sizes. Their curves and uninhibited energy make for exciting shows.",
      tips: [
        "Curvy models appreciate positive body-positivity compliments",
        "Many curvy models specialise in twerking and dancing",
        "BBW and curvy are related but different subcategories — try both",
      ],
    },
  },

  slim: {
    nl: {
      intro: "Slanke modellen combineren elegantie met een ranke lichaamsbouw. Perfect voor wie houdt van een atletisch of slank figuur.",
      appeal: "Slanke modellen stralen lichtheid en gratie uit. Elke beweging wordt geaccentueerd door hun ranke silhouet.",
      tips: [
        "Combineer 'slank' met categorieën als 'petite' of 'teen 18+' voor specifiekere resultaten",
        "Slanke modellen doen het uitstekend in dans- en striptease-shows",
        "Veel fitness- en yogamodellen vallen in de slim categorie",
      ],
    },
    en: {
      intro: "Slim models combine elegance with a slender physique. Perfect for those who love athletic or slim figures.",
      appeal: "Slim models radiate lightness and grace. Every movement is accentuated by their slender silhouette.",
      tips: [
        "Combine 'slim' with categories like 'petite' or 'teen 18+' for more specific results",
        "Slim models excel in dance and striptease shows",
        "Many fitness and yoga models fall in the slim category",
      ],
    },
  },

  lovense: {
    nl: {
      intro: "Lovense en interactieve toy shows laten kijkers direct invloed uitoefenen op het genot van het model via tips en tokens.",
      appeal: "De interactiviteit maakt je een actieve deelnemer in plaats van passieve kijker. Elke tip triggert een reactie van de vibrator.",
      tips: [
        "Tip in verschillende bedragen om verschillende intensiteitsniveaus te ontdekken",
        "Veel modellen hebben een tipmenu — check de beschrijving voor opties",
        "Interactieve shows zijn het leukst wanneer meerdere kijkers samenwerken",
      ],
    },
    en: {
      intro: "Lovense and interactive toy shows let viewers directly influence the model's pleasure through tips and tokens.",
      appeal: "The interactivity makes you an active participant rather than a passive viewer. Every tip triggers a vibrator response.",
      tips: [
        "Tip different amounts to discover different intensity levels",
        "Many models have a tip menu — check the description for options",
        "Interactive shows are most fun when multiple viewers collaborate",
      ],
    },
  },

  bigass: {
    nl: {
      intro: "De grote kont categorie is een van de populairste op cam sites. Modellen met een volle achterste weten precies hoe ze hun rondingen presenteren.",
      appeal: "Een grote kont is visueel spectaculair en trekt enorm veel kijkers. Twerking, booty-shaking en creatieve outfits staan centraal.",
      tips: [
        "Veel modellen bieden speciale twerk-shows aan — vraag ernaar",
        "Latina en ebony modellen zijn vaak sterk vertegenwoordigd in deze categorie",
        "Zoek op tags als 'bigass', 'booty' of 'twerk' voor de beste resultaten",
      ],
    },
    en: {
      intro: "The big ass category is one of the most popular on cam sites. Models with full behinds know exactly how to present their curves.",
      appeal: "A big ass is visually spectacular and attracts enormous audiences. Twerking, booty-shaking, and creative outfits take centre stage.",
      tips: [
        "Many models offer special twerk shows — ask about them",
        "Latina and ebony models are often well-represented in this category",
        "Search for tags like 'bigass', 'booty', or 'twerk' for the best results",
      ],
    },
  },

  striptease: {
    nl: {
      intro: "Striptease cam shows zijn de ultieme mix van spanning en verleidingskunst. Modellen bouwen langzaam op, laag voor laag.",
      appeal: "De opbouw en het langzame onthullen creëren spanning die een directe naaktshow niet kan evenaren. Het is een kunstvorm.",
      tips: [
        "Geniet van de opbouw — de beste striptease-shows nemen hun tijd",
        "Veel modellen hebben speciale outfits voor striptease-avonden",
        "Tip om het tempo te beïnvloeden — langzamer of sneller, jij bepaalt",
      ],
    },
    en: {
      intro: "Striptease cam shows are the ultimate mix of suspense and the art of seduction. Models build slowly, layer by layer.",
      appeal: "The build-up and slow reveal create tension that a direct nude show can't match. It's an art form.",
      tips: [
        "Enjoy the build-up — the best striptease shows take their time",
        "Many models have special outfits for striptease nights",
        "Tip to influence the pace — slower or faster, you decide",
      ],
    },
  },

  dildo: {
    nl: {
      intro: "Dildo cam shows bieden expliciet plezier met een breed scala aan toys, van realistische dildo's tot creatieve vormen en maten.",
      appeal: "De visuele intensiteit van dildo-shows gecombineerd met het zichtbare genot van het model maakt dit een van de populairste categorieën.",
      tips: [
        "Veel modellen hebben een collectie dildo's — vraag naar hun favoriete",
        "Tip voor specifieke toy-verzoeken of snelheden",
        "Combineer met de 'anal' of 'squirt' categorie voor intensere shows",
      ],
    },
    en: {
      intro: "Dildo cam shows offer explicit pleasure with a wide range of toys, from realistic dildos to creative shapes and sizes.",
      appeal: "The visual intensity of dildo shows combined with the model's visible pleasure makes this one of the most popular categories.",
      tips: [
        "Many models have a collection of dildos — ask about their favourite",
        "Tip for specific toy requests or speeds",
        "Combine with the 'anal' or 'squirt' category for more intense shows",
      ],
    },
  },

  cosplay: {
    nl: {
      intro: "Cosplay cam shows combineren fantasie met erotiek. Modellen verkleden zich als personages uit anime, games, films en meer.",
      appeal: "De fantasie-element tilt shows naar een ander niveau. Cosplay voegt rollenspel en verbeelding toe aan de erotische ervaring.",
      tips: [
        "Veel cosplay modellen nemen verzoeken aan — deel je favoriete personage",
        "Aziatische modellen zijn vaak bijzonder bedreven in cosplay",
        "Cosplay shows zijn het populairst rond Halloween en Comic Con-seizoenen",
      ],
    },
    en: {
      intro: "Cosplay cam shows combine fantasy with erotica. Models dress up as characters from anime, games, movies, and more.",
      appeal: "The fantasy element elevates shows to another level. Cosplay adds roleplay and imagination to the erotic experience.",
      tips: [
        "Many cosplay models take requests — share your favourite character",
        "Asian models are often particularly skilled at cosplay",
        "Cosplay shows are most popular around Halloween and Comic Con seasons",
      ],
    },
  },

  smoking: {
    nl: {
      intro: "Roken is een populaire fetisj-niche op cam sites. Modellen die roken tijdens hun show voegen een laag van nonchalante sensualiteit toe.",
      appeal: "De combinatie van rook, lippen en een ontspannen houding creëert een bijzondere erotische sfeer die veel kijkers aanspreekt.",
      tips: [
        "Smoking fetisj modellen zijn een specifieke niche — gebruik tags om ze te vinden",
        "Veel smoking modellen combineren roken met andere fetisjen",
        "Wees respectvol en specifiek over je voorkeuren — elk model heeft eigen grenzen",
      ],
    },
    en: {
      intro: "Smoking is a popular fetish niche on cam sites. Models who smoke during their show add a layer of nonchalant sensuality.",
      appeal: "The combination of smoke, lips, and a relaxed attitude creates a special erotic atmosphere that appeals to many viewers.",
      tips: [
        "Smoking fetish models are a specific niche — use tags to find them",
        "Many smoking models combine smoking with other fetishes",
        "Be respectful and specific about your preferences — each model has their own limits",
      ],
    },
  },

  pregnant: {
    nl: {
      intro: "Zwangere cam modellen delen de unieke schoonheid van zwangerschap in hun shows. Deze niche heeft een trouwe en groeiende fanbase.",
      appeal: "Het ronde lichaam, de gloed en de vrouwelijkheid van zwangerschap creëren een unieke erotische aantrekkingskracht.",
      tips: [
        "Zwangere modellen zijn seizoensgebonden — sla favorieten op",
        "Wees respectvol en bewonderend in je interactie",
        "Veel zwangere modellen bieden ook melk-gerelateerde content aan",
      ],
    },
    en: {
      intro: "Pregnant cam models share the unique beauty of pregnancy in their shows. This niche has a loyal and growing fanbase.",
      appeal: "The rounded body, the glow, and the femininity of pregnancy create a unique erotic appeal.",
      tips: [
        "Pregnant models are seasonal — save favourites",
        "Be respectful and admiring in your interaction",
        "Many pregnant models also offer milk-related content",
      ],
    },
  },

  muscle: {
    nl: {
      intro: "Gespierde modellen tonen kracht en discipline. Van fitness-modellen tot bodybuilders, deze categorie biedt indrukwekkende lichamen.",
      appeal: "Gespierde lichamen stralen kracht en toewijding uit. De combinatie van fysieke power en erotiek is visueel spectaculair.",
      tips: [
        "Veel gespierde modellen bieden flex-shows en olie-shows aan",
        "Deze categorie is populair bij zowel mannelijke als vrouwelijke modellen",
        "Fitness- en bodybuilding-fans vinden hier hun ideale model",
      ],
    },
    en: {
      intro: "Muscular models showcase strength and discipline. From fitness models to bodybuilders, this category offers impressive physiques.",
      appeal: "Muscular bodies radiate power and dedication. The combination of physical power and erotica is visually spectacular.",
      tips: [
        "Many muscular models offer flex shows and oil shows",
        "This category is popular with both male and female models",
        "Fitness and bodybuilding fans will find their ideal model here",
      ],
    },
  },
};

// ─── Gender-specific context for template merging ────────────────────────────

interface GenderContext {
  /** Phrase used in combined content, e.g. "vrouwelijke" or "mannelijke" */
  adjective: string;
  /** Short descriptor for variety */
  variety: string;
  /** Key platforms for this gender */
  platforms: string;
  /** Gender-specific note for combined content */
  note: string;
}

const genderContexts: Record<string, Record<SupportedLang, GenderContext>> = {
  vrouwen: {
    nl: {
      adjective: "vrouwelijke",
      variety: "Het aanbod vrouwelijke modellen is het grootst van alle categorieën",
      platforms: "Chaturbate, Stripchat, BongaCams, CAM4, XCams, Jerkmate en Islive",
      note: "Vrouwelijke modellen vormen de ruggengraat van elk cam platform en zijn beschikbaar in elke niche.",
    },
    en: {
      adjective: "female",
      variety: "The selection of female models is the largest of all categories",
      platforms: "Chaturbate, Stripchat, BongaCams, CAM4, XCams, Jerkmate and Islive",
      note: "Female models form the backbone of every cam platform and are available in every niche.",
    },
  },
  mannen: {
    nl: {
      adjective: "mannelijke",
      variety: "Mannelijke modellen zijn een groeiende niche met een loyale fanbase",
      platforms: "Chaturbate, CAM4 en Stripchat",
      note: "Hoewel het aanbod kleiner is dan bij vrouwen, groeit de mannelijke cam-scene snel en biedt unieke shows.",
    },
    en: {
      adjective: "male",
      variety: "Male models are a growing niche with a loyal fanbase",
      platforms: "Chaturbate, CAM4 and Stripchat",
      note: "While the selection is smaller than for women, the male cam scene is growing rapidly and offers unique shows.",
    },
  },
  koppels: {
    nl: {
      adjective: "koppels",
      variety: "Koppels bieden een unieke dynamiek die solo-shows niet kunnen evenaren",
      platforms: "CAM4, Chaturbate en Stripchat",
      note: "Koppels op cam zijn bijzonder populair op CAM4 en Chaturbate, met zowel hetero als LGBTQ+ stellen.",
    },
    en: {
      adjective: "couples",
      variety: "Couples offer a unique dynamic that solo shows can't match",
      platforms: "CAM4, Chaturbate and Stripchat",
      note: "Couples on cam are particularly popular on CAM4 and Chaturbate, with both hetero and LGBTQ+ pairs.",
    },
  },
  trans: {
    nl: {
      adjective: "trans",
      variety: "Trans modellen vormen een van de snelst groeiende niches",
      platforms: "Chaturbate, Stripchat en BongaCams",
      note: "De trans cam-scene groeit snel dankzij toenemende acceptatie en een hechte, loyale community.",
    },
    en: {
      adjective: "trans",
      variety: "Trans models represent one of the fastest-growing niches",
      platforms: "Chaturbate, Stripchat and BongaCams",
      note: "The trans cam scene is growing rapidly thanks to increasing acceptance and a tight-knit, loyal community.",
    },
  },
};

// ─── UI label templates ──────────────────────────────────────────────────────

const ui = {
  nl: {
    sectionAbout: (cat: string, gender: string) => `Over ${cat} ${gender} Cam Shows`,
    sectionWhy: (cat: string, gender: string) => `Waarom ${gender} voor ${cat} Shows`,
    sectionHow: (cat: string, gender: string) => `Hoe ${cat} ${gender} Shows Bekijken`,
    faqFree: (cat: string, gender: string) => `Zijn ${cat} ${gender} cam shows gratis?`,
    faqFreeA: (cat: string, gender: string) => `Ja, op de meeste platforms kun je ${cat} ${gender} cam shows gratis bekijken in de openbare chat. Voor privéshows en speciale verzoeken heb je tokens of credits nodig. StartVagina helpt je de beste gratis ${cat} ${gender} shows te vinden op platforms als Chaturbate, Stripchat en meer.`,
    faqBest: (cat: string, gender: string) => `Welk platform is het beste voor ${cat} ${gender} cams?`,
    faqHow: (cat: string, gender: string) => `Hoe vind ik ${cat} ${gender} modellen?`,
    faqHowA: (cat: string, gender: string) => `Op StartVagina kun je eenvoudig filteren op gender en categorie. Selecteer "${gender}" als gender en "${cat}" als categorie om direct de relevante modellen te zien. Je kunt ook verder filteren op platform, leeftijd en meer.`,
    faqSafe: () => "Is het veilig om cam shows te bekijken?",
    faqSafeA: () => "Ja, alle platforms die op StartVagina worden getoond zijn betrouwbaar en veilig. Ze gebruiken versleutelde verbindingen en verifiëren de leeftijd van alle modellen. Je hoeft nooit persoonlijke informatie te delen om gratis te kijken.",
  },
  en: {
    sectionAbout: (cat: string, gender: string) => `About ${cat} ${gender} Cam Shows`,
    sectionWhy: (cat: string, gender: string) => `Why ${gender} for ${cat} Shows`,
    sectionHow: (cat: string, gender: string) => `How to Watch ${cat} ${gender} Shows`,
    faqFree: (cat: string, gender: string) => `Are ${cat} ${gender} cam shows free?`,
    faqFreeA: (cat: string, gender: string) => `Yes, on most platforms you can watch ${cat} ${gender} cam shows for free in the public chat. For private shows and special requests, you'll need tokens or credits. StartVagina helps you find the best free ${cat} ${gender} shows on platforms like Chaturbate, Stripchat and more.`,
    faqBest: (cat: string, gender: string) => `Which platform is best for ${cat} ${gender} cams?`,
    faqHow: (cat: string, gender: string) => `How do I find ${cat} ${gender} models?`,
    faqHowA: (cat: string, gender: string) => `On StartVagina you can easily filter by gender and category. Select "${gender}" as gender and "${cat}" as category to see the relevant models right away. You can also further filter by platform, age, and more.`,
    faqSafe: () => "Is it safe to watch cam shows?",
    faqSafeA: () => "Yes, all platforms shown on StartVagina are reputable and safe. They use encrypted connections and verify the age of all models. You never need to share personal information to watch for free.",
  },
};

// ─── Best-platform mapping per gender × category ─────────────────────────────

function getBestPlatformAnswer(
  genderSlug: string,
  categorySlug: string,
  lang: SupportedLang,
  catLabel: string,
  genderLabel: string,
): string {
  // Gender-specific platform recommendations
  const recs: Record<string, Record<string, Record<SupportedLang, string>>> = {
    vrouwen: {
      _default: {
        nl: `Voor ${catLabel} vrouwelijke modellen raden we Chaturbate en Stripchat aan — zij hebben het grootste aanbod. BongaCams is sterk in Oost-Europese modellen, terwijl Islive de beste keuze is voor Nederlandstalige ${catLabel} vrouwen.`,
        en: `For ${catLabel} female models, we recommend Chaturbate and Stripchat — they have the largest selection. BongaCams is strong in Eastern European models, while Islive is the best choice for Dutch-speaking ${catLabel} women.`,
      },
      bdsm: {
        nl: `Voor ${catLabel} vrouwelijke modellen is Flirt4Free de beste keuze dankzij hun uitgebreide fetisj-sectie. Stripchat en Chaturbate bieden eveneens een groot aanbod BDSM-modellen.`,
        en: `For ${catLabel} female models, Flirt4Free is the best choice thanks to their extensive fetish section. Stripchat and Chaturbate also offer a large selection of BDSM models.`,
      },
      lovense: {
        nl: `Chaturbate is veruit het beste platform voor ${catLabel} vrouwelijke shows — de meeste modellen daar gebruiken Lovense toys. Stripchat heeft ook veel interactieve modellen.`,
        en: `Chaturbate is by far the best platform for ${catLabel} female shows — most models there use Lovense toys. Stripchat also has many interactive models.`,
      },
    },
    mannen: {
      _default: {
        nl: `Voor ${catLabel} mannelijke modellen is Chaturbate de beste keuze met het grootste aanbod. CAM4 is ook sterk in mannelijke performers, vooral in de Europese markt. Stripchat heeft een groeiende mannelijke sectie.`,
        en: `For ${catLabel} male models, Chaturbate is the best choice with the largest selection. CAM4 is also strong in male performers, especially in the European market. Stripchat has a growing male section.`,
      },
      muscle: {
        nl: `Voor gespierde mannelijke modellen is Chaturbate de beste keuze. CAM4 heeft ook veel fitness-modellen. Flirt4Free biedt premium mannelijke shows met uitstekende kwaliteit.`,
        en: `For muscular male models, Chaturbate is the best choice. CAM4 also has many fitness models. Flirt4Free offers premium male shows with excellent quality.`,
      },
    },
    koppels: {
      _default: {
        nl: `Voor ${catLabel} koppelshows is CAM4 van oudsher de sterkste keuze — het platform staat bekend om zijn koppels-community. Chaturbate biedt eveneens een groot aanbod koppels met goede filters.`,
        en: `For ${catLabel} couples shows, CAM4 has traditionally been the strongest choice — the platform is known for its couples community. Chaturbate also offers a large selection of couples with good filters.`,
      },
    },
    trans: {
      _default: {
        nl: `Voor ${catLabel} trans modellen is Chaturbate de beste keuze met een aparte trans-sectie. Stripchat heeft ook een groot aanbod trans performers. BongaCams en XCams bieden eveneens trans modellen.`,
        en: `For ${catLabel} trans models, Chaturbate is the best choice with a dedicated trans section. Stripchat also has a large selection of trans performers. BongaCams and XCams also offer trans models.`,
      },
      asian: {
        nl: `Voor Aziatische trans modellen zijn Chaturbate en Stripchat de beste platforms. Veel Aziatische trans modellen komen uit Thailand en de Filipijnen en zijn vaak 's nachts online (Europese tijd).`,
        en: `For Asian trans models, Chaturbate and Stripchat are the best platforms. Many Asian trans models come from Thailand and the Philippines and are often online at night (European time).`,
      },
      latina: {
        nl: `Voor Latina trans modellen is Chaturbate veruit het populairst. Veel Colombiaanse en Braziliaanse trans modellen zijn actief op Chaturbate en brengen een ongekende energie naar hun shows.`,
        en: `For Latina trans models, Chaturbate is by far the most popular. Many Colombian and Brazilian trans models are active on Chaturbate and bring unmatched energy to their shows.`,
      },
    },
  };

  const genderRecs = recs[genderSlug];
  if (!genderRecs) {
    return lang === "nl"
      ? `StartVagina vergelijkt alle grote platforms zodat je de beste ${catLabel} ${genderLabel} shows vindt. Chaturbate en Stripchat hebben doorgaans het breedste aanbod.`
      : `StartVagina compares all major platforms so you can find the best ${catLabel} ${genderLabel} shows. Chaturbate and Stripchat typically have the widest selection.`;
  }

  const specific = genderRecs[categorySlug]?.[lang];
  if (specific) return specific;

  return genderRecs._default[lang];
}

// ─── Section builders ────────────────────────────────────────────────────────

function buildSections(
  genderSlug: string,
  categorySlug: string,
  lang: SupportedLang,
  genderLabel: string,
  catLabel: string,
): { title: string; text: string }[] {
  const genderDesc = genderDescriptions[genderSlug]?.[lang];
  const catDesc = categoryDescriptions[categorySlug]?.[lang];
  const gCtx = genderContexts[genderSlug]?.[lang];
  const uiLang = ui[lang];

  if (!genderDesc || !catDesc || !gCtx) return [];

  // Section 1: About [cat] [gender]
  const section1 = {
    title: uiLang.sectionAbout(catLabel, genderLabel),
    text: lang === "nl"
      ? `${catDesc.intro} Gecombineerd met ${gCtx.adjective} modellen krijg je een unieke kijkervaring. ${catDesc.appeal} ${gCtx.variety}, en in de ${catLabel} categorie is dat niet anders. Je vindt ${gCtx.adjective} ${catLabel} modellen op platforms als ${gCtx.platforms}.`
      : `${catDesc.intro} Combined with ${gCtx.adjective} models, you get a unique viewing experience. ${catDesc.appeal} ${gCtx.variety}, and the ${catLabel} category is no different. You'll find ${gCtx.adjective} ${catLabel} models on platforms like ${gCtx.platforms}.`,
  };

  // Section 2: Why [gender] for [cat]
  const strengthsList = genderDesc.strengths.map((s) => `• ${s}`).join("\n");
  const section2 = {
    title: uiLang.sectionWhy(catLabel, genderLabel),
    text: lang === "nl"
      ? `Waarom zou je specifiek ${gCtx.adjective} modellen kiezen voor ${catLabel} shows? ${gCtx.note}\n\nSterke punten van ${genderLabel.toLowerCase()} cam shows:\n${strengthsList}\n\nDeze voordelen maken ${gCtx.adjective} ${catLabel} shows op StartVagina een uitstekende keuze voor zowel beginners als ervaren kijkers.`
      : `Why choose specifically ${gCtx.adjective} models for ${catLabel} shows? ${gCtx.note}\n\nStrengths of ${genderLabel.toLowerCase()} cam shows:\n${strengthsList}\n\nThese advantages make ${gCtx.adjective} ${catLabel} shows on StartVagina an excellent choice for both beginners and experienced viewers.`,
  };

  // Section 3: How to watch
  const tipsList = catDesc.tips.map((t) => `• ${t}`).join("\n");
  const section3 = {
    title: uiLang.sectionHow(catLabel, genderLabel),
    text: lang === "nl"
      ? `${genderDesc.howTo}\n\nTips voor het bekijken van ${catLabel} ${genderLabel.toLowerCase()} shows:\n${tipsList}\n\nOnthoud dat de beste ervaring komt door actief deel te nemen aan de chat en modellen te laten weten dat je hun show waardeert. Op StartVagina vind je alle ${gCtx.adjective} ${catLabel} modellen van de beste platforms op één plek.`
      : `${genderDesc.howTo}\n\nTips for watching ${catLabel} ${genderLabel.toLowerCase()} shows:\n${tipsList}\n\nRemember that the best experience comes from actively participating in chat and letting models know you appreciate their show. On StartVagina you'll find all ${gCtx.adjective} ${catLabel} models from the best platforms in one place.`,
  };

  return [section1, section2, section3];
}

// ─── FAQ builders ────────────────────────────────────────────────────────────

function buildFaq(
  genderSlug: string,
  categorySlug: string,
  lang: SupportedLang,
  genderLabel: string,
  catLabel: string,
): { q: string; a: string }[] {
  const uiLang = ui[lang];

  return [
    {
      q: uiLang.faqFree(catLabel, genderLabel.toLowerCase()),
      a: uiLang.faqFreeA(catLabel, genderLabel.toLowerCase()),
    },
    {
      q: uiLang.faqBest(catLabel, genderLabel.toLowerCase()),
      a: getBestPlatformAnswer(genderSlug, categorySlug, lang, catLabel, genderLabel.toLowerCase()),
    },
    {
      q: uiLang.faqHow(catLabel, genderLabel.toLowerCase()),
      a: uiLang.faqHowA(catLabel, genderLabel.toLowerCase()),
    },
    {
      q: uiLang.faqSafe(),
      a: uiLang.faqSafeA(),
    },
  ];
}

// ─── Exported functions ──────────────────────────────────────────────────────

/** Generate content for a gender × category combo page */
export function getGenderCategoryContent(
  genderSlug: string,
  categoryShortSlug: string,
  lang: Language,
): GenderCategoryContent | null {
  // Only NL and EN are supported for combo pages
  if (lang !== "nl" && lang !== "en") return null;

  const genderCfg = genderConfigs.find((g) => g.slug === genderSlug);
  const catConfig = categoryConfigs[categoryShortSlug];
  if (!genderCfg || !catConfig) return null;

  const genderLabel = genderCfg.label[lang];
  const catLabel = catConfig.label[lang];
  const genderDesc = genderDescriptions[genderSlug]?.[lang];
  const catDesc = categoryDescriptions[categoryShortSlug]?.[lang];
  if (!genderDesc || !catDesc) return null;

  const title = lang === "nl"
    ? `${catLabel} ${genderLabel} Cams — Live ${catLabel} ${genderLabel} | StartVagina`
    : `${catLabel} ${genderLabel} Cams — Live ${catLabel} ${genderLabel} | StartVagina`;

  const h1 = lang === "nl"
    ? `${catLabel} ${genderLabel} Live — Gratis ${catLabel} Cam Shows`
    : `${catLabel} ${genderLabel} Live — Free ${catLabel} Cam Shows`;

  // Meta description (max 160 chars)
  const description = lang === "nl"
    ? `Bekijk ${catLabel.toLowerCase()} ${genderLabel.toLowerCase()} cam shows gratis. Live modellen, HD-streams en interactieve shows op StartVagina.`.slice(0, 160)
    : `Watch ${catLabel.toLowerCase()} ${genderLabel.toLowerCase()} cam shows for free. Live models, HD streams and interactive shows on StartVagina.`.slice(0, 160);

  // Intro (2-3 sentences combining gender + category)
  const gCtx = genderContexts[genderSlug]?.[lang];
  const intro = lang === "nl"
    ? `Ontdek de beste ${catLabel.toLowerCase()} ${genderLabel.toLowerCase()} cam shows op StartVagina. ${catDesc.intro} ${gCtx?.variety ?? ""} — filter op "${genderLabel}" en "${catLabel}" om direct de juiste modellen te vinden.`
    : `Discover the best ${catLabel.toLowerCase()} ${genderLabel.toLowerCase()} cam shows on StartVagina. ${catDesc.intro} ${gCtx?.variety ?? ""} — filter on "${genderLabel}" and "${catLabel}" to find the right models instantly.`;

  const sections = buildSections(genderSlug, categoryShortSlug, lang, genderLabel, catLabel);
  const faq = buildFaq(genderSlug, categoryShortSlug, lang, genderLabel, catLabel);

  return { title, h1, description, intro, sections, faq };
}

/** Get gender config by slug */
export function getGenderConfig(slug: string): GenderConfig | undefined {
  return genderConfigs.find((g) => g.slug === slug);
}

// ─── Re-exports for convenience ──────────────────────────────────────────────

export const GENDER_SLUGS = genderConfigs.map((g) => g.slug);
export const GENDER_CATEGORY_SHORT_SLUGS = Object.keys(categoryConfigs);

export function getGenderCategoryLabel(
  slug: string,
  lang: SupportedLang,
): string | undefined {
  return categoryConfigs[slug]?.label[lang];
}
