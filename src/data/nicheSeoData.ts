import type { Language } from "@/i18n/translations";

interface NicheSeo {
  title: string;
  description: string;
}

/**
 * Hand-crafted SEO meta for popular niches, keyed by slug.
 * Falls back to template-based generation for unlisted niches.
 */
const nicheMetaOverrides: Record<string, Partial<Record<Language, NicheSeo>>> = {
  masturbation: {
    nl: { title: "Masturbatie Video's — Solo Cam Shows op CAM4 | StartVagina", description: "Bekijk exclusieve masturbatie video's van cam modellen op CAM4. Solo shows met vingers en toys — van slow build tot intense orgasmes." },
    en: { title: "Masturbation Videos — Solo Cam Shows on CAM4 | StartVagina", description: "Watch exclusive masturbation videos from cam models on CAM4. Solo shows with fingers and toys — from slow build to intense orgasms." },
  },
  squirt: {
    nl: { title: "Squirt Video's — Squirtende Cam Girls op CAM4 | StartVagina", description: "Bekijk squirt video's van cam modellen op CAM4. Intense orgasmes en spectaculaire squirt shows van amateurs en professionals." },
    en: { title: "Squirt Videos — Squirting Cam Girls on CAM4 | StartVagina", description: "Watch squirt videos from cam models on CAM4. Intense orgasms and spectacular squirt shows from amateurs and professionals." },
  },
  amateur: {
    nl: { title: "Amateur Video's — Echte Amateur Cam Shows op CAM4 | StartVagina", description: "Bekijk amateur video's van echte cam modellen op CAM4. Authentiek, ongescript en persoonlijk — echte vrouwen delen intieme momenten." },
    en: { title: "Amateur Videos — Real Amateur Cam Shows on CAM4 | StartVagina", description: "Watch amateur videos from real cam models on CAM4. Authentic, unscripted and personal — real women sharing intimate moments." },
  },
  anal: {
    nl: { title: "Anale Video's — Anale Cam Shows op CAM4 | StartVagina", description: "Bekijk anale video's van cam modellen op CAM4. Training, toys en meer — exclusieve anale content van amateurs." },
    en: { title: "Anal Videos — Anal Cam Shows on CAM4 | StartVagina", description: "Watch anal videos from cam models on CAM4. Training, toys and more — exclusive anal content from amateur models." },
  },
  milf: {
    nl: { title: "MILF Video's — Ervaren Vrouwen op CAM4 | StartVagina", description: "Bekijk MILF video's van ervaren cam modellen op CAM4. Zelfverzekerde vrouwen met ervaring die weten hoe ze je moeten verleiden." },
    en: { title: "MILF Videos — Experienced Women on CAM4 | StartVagina", description: "Watch MILF videos from experienced cam models on CAM4. Confident women who know exactly how to please." },
  },
  "18-plus-girls": {
    nl: { title: "18+ Meisjes Video's — Jonge Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van jonge 18+ cam girls op CAM4. Verse nieuwe modellen die hun eerste shows delen." },
    en: { title: "18+ Girls Videos — Young Cam Girls on CAM4 | StartVagina", description: "Watch videos from young 18+ cam girls on CAM4. Fresh new models sharing their first shows." },
  },
  "big-tits": {
    nl: { title: "Grote Borsten Video's — Cam Girls met Grote Tieten op CAM4 | StartVagina", description: "Bekijk video's van cam modellen met grote borsten op CAM4. Van natuurlijk tot enhanced — de beste busty cam girl content." },
    en: { title: "Big Tits Videos — Busty Cam Girls on CAM4 | StartVagina", description: "Watch videos from busty cam models on CAM4. From natural to enhanced — the best big tits cam girl content." },
  },
  "hairy-pussy": {
    nl: { title: "Hairy Pussy Video's — Ongeschoren Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van cam modellen met een natuurlijke look op CAM4. Ongeschoren en trots — hairy pussy content van echte vrouwen." },
    en: { title: "Hairy Pussy Videos — Natural Cam Girls on CAM4 | StartVagina", description: "Watch videos from natural cam models on CAM4. Unshaved and proud — hairy pussy content from real women." },
  },
  pussy: {
    nl: { title: "Pussy Video's — Close-up Cam Shows op CAM4 | StartVagina", description: "Bekijk pussy video's en close-up content van cam modellen op CAM4. Intiem en expliciet — de beste cam girl pussy content." },
    en: { title: "Pussy Videos — Close-up Cam Shows on CAM4 | StartVagina", description: "Watch pussy videos and close-up content from cam models on CAM4. Intimate and explicit — the best cam girl pussy content." },
  },
  blowjob: {
    nl: { title: "Blowjob Video's — Orale Cam Shows op CAM4 | StartVagina", description: "Bekijk blowjob video's van cam modellen op CAM4. Deepthroat, sloppy en meer — exclusieve orale content." },
    en: { title: "Blowjob Videos — Oral Cam Shows on CAM4 | StartVagina", description: "Watch blowjob videos from cam models on CAM4. Deepthroat, sloppy and more — exclusive oral content." },
  },
  "big-ass": {
    nl: { title: "Grote Kont Video's — Cam Girls met een Big Ass op CAM4 | StartVagina", description: "Bekijk video's van cam modellen met een grote kont op CAM4. Twerk, booty shows en meer van de mooiste curves." },
    en: { title: "Big Ass Videos — Booty Cam Girls on CAM4 | StartVagina", description: "Watch videos from cam models with a big ass on CAM4. Twerk, booty shows and more from the best curves." },
  },
  "public-streaming": {
    nl: { title: "Publieke Stream Video's — Outdoor Cam Shows op CAM4 | StartVagina", description: "Bekijk publieke streaming video's op CAM4. Cam modellen die het buiten of op openbare plekken doen — spannend en onvoorspelbaar." },
    en: { title: "Public Streaming Videos — Outdoor Cam Shows on CAM4 | StartVagina", description: "Watch public streaming videos on CAM4. Cam models going live outdoors and in public — thrilling and unpredictable." },
  },
  creampie: {
    nl: { title: "Creampie Video's — Creampie Cam Shows op CAM4 | StartVagina", description: "Bekijk creampie video's van cam modellen op CAM4. Exclusieve creampie content van amateurs en koppels." },
    en: { title: "Creampie Videos — Creampie Cam Shows on CAM4 | StartVagina", description: "Watch creampie videos from cam models on CAM4. Exclusive creampie content from amateurs and couples." },
  },
  latina: {
    nl: { title: "Latina Video's — Latina Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Latina cam modellen op CAM4. Heet, gepassioneerd en vol energie — de beste Latijns-Amerikaanse cam girl content." },
    en: { title: "Latina Videos — Latina Cam Girls on CAM4 | StartVagina", description: "Watch videos from Latina cam models on CAM4. Hot, passionate and full of energy — the best Latin American cam girl content." },
  },
  redheads: {
    nl: { title: "Roodharige Video's — Redhead Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van roodharige cam modellen op CAM4. Vurig en verleidelijk — exclusieve redhead content." },
    en: { title: "Redhead Videos — Redhead Cam Girls on CAM4 | StartVagina", description: "Watch videos from redhead cam models on CAM4. Fiery and seductive — exclusive redhead content." },
  },
  pee: {
    nl: { title: "Pee Video's — Watersport Cam Shows op CAM4 | StartVagina", description: "Bekijk pee video's van cam modellen op CAM4. Watersport en golden shower content van avontuurlijke modellen." },
    en: { title: "Pee Videos — Watersports Cam Shows on CAM4 | StartVagina", description: "Watch pee videos from cam models on CAM4. Watersports and golden shower content from adventurous models." },
  },
  tattoos: {
    nl: { title: "Tattoo Video's — Getatoeëerde Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van getatoeëerde cam modellen op CAM4. Inked babes met attitude — de mooiste tattoo cam girls." },
    en: { title: "Tattoo Videos — Tattooed Cam Girls on CAM4 | StartVagina", description: "Watch videos from tattooed cam models on CAM4. Inked babes with attitude — the hottest tattooed cam girls." },
  },
  bbw: {
    nl: { title: "BBW Video's — Curvy Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van BBW cam modellen op CAM4. Voluptueuze vrouwen met zelfvertrouwen — de beste plus-size cam content." },
    en: { title: "BBW Videos — Curvy Cam Girls on CAM4 | StartVagina", description: "Watch videos from BBW cam models on CAM4. Voluptuous women with confidence — the best plus-size cam content." },
  },
  petite: {
    nl: { title: "Petite Video's — Kleine Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van petite cam modellen op CAM4. Klein maar fijn — schattige en sexy petite cam girls." },
    en: { title: "Petite Videos — Small Cam Girls on CAM4 | StartVagina", description: "Watch videos from petite cam models on CAM4. Small but mighty — cute and sexy petite cam girls." },
  },
  feet: {
    nl: { title: "Voeten Video's — Foot Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk voeten video's van cam modellen op CAM4. Foot fetish content, voetmassage en meer van de mooiste voetjes." },
    en: { title: "Feet Videos — Foot Fetish Cam Shows on CAM4 | StartVagina", description: "Watch feet videos from cam models on CAM4. Foot fetish content, foot massages and more from beautiful feet." },
  },
  bdsm: {
    nl: { title: "BDSM Video's — Bondage & Dominatie Cam Shows op CAM4 | StartVagina", description: "Bekijk BDSM video's van cam modellen op CAM4. Bondage, dominatie en submission — van beginners tot hardcore." },
    en: { title: "BDSM Videos — Bondage & Domination Cam Shows on CAM4 | StartVagina", description: "Watch BDSM videos from cam models on CAM4. Bondage, domination and submission — from beginners to hardcore." },
  },
  blonde: {
    nl: { title: "Blonde Video's — Blonde Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van blonde cam modellen op CAM4. Klassiek mooi en verleidelijk — de mooiste blonde cam girls." },
    en: { title: "Blonde Videos — Blonde Cam Girls on CAM4 | StartVagina", description: "Watch videos from blonde cam models on CAM4. Classic beauty and seduction — the hottest blonde cam girls." },
  },
  lesbian: {
    nl: { title: "Lesbische Video's — Girl-on-Girl Cam Shows op CAM4 | StartVagina", description: "Bekijk lesbische video's van cam modellen op CAM4. Twee vrouwen, echte passie — exclusieve girl-on-girl content." },
    en: { title: "Lesbian Videos — Girl-on-Girl Cam Shows on CAM4 | StartVagina", description: "Watch lesbian videos from cam models on CAM4. Two women, real passion — exclusive girl-on-girl content." },
  },
  shower: {
    nl: { title: "Douche Video's — Shower Cam Shows op CAM4 | StartVagina", description: "Bekijk douche video's van cam modellen op CAM4. Nat, zeepachtig en sexy — cam girls onder de douche." },
    en: { title: "Shower Videos — Shower Cam Shows on CAM4 | StartVagina", description: "Watch shower videos from cam models on CAM4. Wet, soapy and sexy — cam girls in the shower." },
  },
  cosplay: {
    nl: { title: "Cosplay Video's — Cosplay Cam Girls op CAM4 | StartVagina", description: "Bekijk cosplay video's van cam modellen op CAM4. Anime, gaming en fantasy cosplay — creatieve en sexy shows." },
    en: { title: "Cosplay Videos — Cosplay Cam Girls on CAM4 | StartVagina", description: "Watch cosplay videos from cam models on CAM4. Anime, gaming and fantasy cosplay — creative and sexy shows." },
  },
  asian: {
    nl: { title: "Aziatische Video's — Asian Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Aziatische cam modellen op CAM4. Japans, Koreaans, Thais en meer — exotische schoonheid." },
    en: { title: "Asian Videos — Asian Cam Girls on CAM4 | StartVagina", description: "Watch videos from Asian cam models on CAM4. Japanese, Korean, Thai and more — exotic beauty." },
  },
  "fuck-machine": {
    nl: { title: "Fuck Machine Video's — Machine Cam Shows op CAM4 | StartVagina", description: "Bekijk fuck machine video's van cam modellen op CAM4. Intense machine-powered shows voor maximaal genot." },
    en: { title: "Fuck Machine Videos — Machine Cam Shows on CAM4 | StartVagina", description: "Watch fuck machine videos from cam models on CAM4. Intense machine-powered shows for maximum pleasure." },
  },
  ebony: {
    nl: { title: "Ebony Video's — Zwarte Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van ebony cam modellen op CAM4. Prachtige zwarte vrouwen met passie en stijl." },
    en: { title: "Ebony Videos — Black Cam Girls on CAM4 | StartVagina", description: "Watch videos from ebony cam models on CAM4. Beautiful black women with passion and style." },
  },
  fitness: {
    nl: { title: "Fitness Video's — Sportieve Cam Girls op CAM4 | StartVagina", description: "Bekijk fitness video's van sportieve cam modellen op CAM4. Gespierd, flexibel en sexy — workout meets webcam." },
    en: { title: "Fitness Videos — Athletic Cam Girls on CAM4 | StartVagina", description: "Watch fitness videos from athletic cam models on CAM4. Toned, flexible and sexy — workout meets webcam." },
  },
  "fem-dom": {
    nl: { title: "Femdom Video's — Dominante Vrouwen op CAM4 | StartVagina", description: "Bekijk femdom video's van dominante cam modellen op CAM4. Machtige vrouwen die de controle nemen." },
    en: { title: "Femdom Videos — Dominant Women on CAM4 | StartVagina", description: "Watch femdom videos from dominant cam models on CAM4. Powerful women taking full control." },
  },
  "cum-play": {
    nl: { title: "Cum Play Video's — Cum Shows op CAM4 | StartVagina", description: "Bekijk cum play video's van cam modellen op CAM4. Creatieve en messy cum shows." },
    en: { title: "Cum Play Videos — Cum Shows on CAM4 | StartVagina", description: "Watch cum play videos from cam models on CAM4. Creative and messy cum shows." },
  },
  gamer: {
    nl: { title: "Gamer Girl Video's — Gaming Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van gamer cam modellen op CAM4. Gaming en sexy shows gecombineerd — voor de echte gamer fans." },
    en: { title: "Gamer Girl Videos — Gaming Cam Girls on CAM4 | StartVagina", description: "Watch videos from gamer cam models on CAM4. Gaming and sexy shows combined — for real gamer fans." },
  },
  arab: {
    nl: { title: "Arabische Video's — Arabische Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Arabische cam modellen op CAM4. Exotisch, mysterieus en onweerstaanbaar mooi." },
    en: { title: "Arab Videos — Arab Cam Girls on CAM4 | StartVagina", description: "Watch videos from Arab cam models on CAM4. Exotic, mysterious and irresistibly beautiful." },
  },
  twerk: {
    nl: { title: "Twerk Video's — Twerking Cam Girls op CAM4 | StartVagina", description: "Bekijk twerk video's van cam modellen op CAM4. Shake it — de beste booty shaking en twerk content." },
    en: { title: "Twerk Videos — Twerking Cam Girls on CAM4 | StartVagina", description: "Watch twerk videos from cam models on CAM4. Shake it — the best booty shaking and twerk content." },
  },
  smoking: {
    nl: { title: "Smoking Video's — Rokende Cam Girls op CAM4 | StartVagina", description: "Bekijk smoking fetish video's van cam modellen op CAM4. Verleidelijk en sensueel — rokende cam girls." },
    en: { title: "Smoking Videos — Smoking Cam Girls on CAM4 | StartVagina", description: "Watch smoking fetish videos from cam models on CAM4. Seductive and sensual — smoking cam girls." },
  },
  "oil-show": {
    nl: { title: "Olie Show Video's — Oiled Up Cam Girls op CAM4 | StartVagina", description: "Bekijk olie show video's van cam modellen op CAM4. Glanzend, glad en onweerstaanbaar — oiled up cam content." },
    en: { title: "Oil Show Videos — Oiled Up Cam Girls on CAM4 | StartVagina", description: "Watch oil show videos from cam models on CAM4. Shiny, slippery and irresistible — oiled up cam content." },
  },
  pregnant: {
    nl: { title: "Zwangere Video's — Pregnant Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van zwangere cam modellen op CAM4. Mooi, sensueel en uniek — pregnant cam content." },
    en: { title: "Pregnant Videos — Pregnant Cam Girls on CAM4 | StartVagina", description: "Watch videos from pregnant cam models on CAM4. Beautiful, sensual and unique — pregnant cam content." },
  },
  fisting: {
    nl: { title: "Fisting Video's — Fisting Cam Shows op CAM4 | StartVagina", description: "Bekijk fisting video's van cam modellen op CAM4. Extreme en intense content voor de echte liefhebber." },
    en: { title: "Fisting Videos — Fisting Cam Shows on CAM4 | StartVagina", description: "Watch fisting videos from cam models on CAM4. Extreme and intense content for true enthusiasts." },
  },
  fantasy: {
    nl: { title: "Fantasy Video's — Fantasy Cam Shows op CAM4 | StartVagina", description: "Bekijk fantasy video's van cam modellen op CAM4. Roleplay, verkleed en fantasierijke shows." },
    en: { title: "Fantasy Videos — Fantasy Cam Shows on CAM4 | StartVagina", description: "Watch fantasy videos from cam models on CAM4. Roleplay, costumes and imaginative shows." },
  },
  leather: {
    nl: { title: "Leren Video's — Leather Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk leather fetish video's van cam modellen op CAM4. Stoer, dominant en verleidelijk in leer." },
    en: { title: "Leather Videos — Leather Fetish Cam Shows on CAM4 | StartVagina", description: "Watch leather fetish videos from cam models on CAM4. Tough, dominant and seductive in leather." },
  },
  latex: {
    nl: { title: "Latex Video's — Latex Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk latex fetish video's van cam modellen op CAM4. Strak, glanzend en onweerstaanbaar — latex cam content." },
    en: { title: "Latex Videos — Latex Fetish Cam Shows on CAM4 | StartVagina", description: "Watch latex fetish videos from cam models on CAM4. Tight, shiny and irresistible — latex cam content." },
  },
  "kinky-wife": {
    nl: { title: "Kinky Wife Video's — Stoute Vrouwen op CAM4 | StartVagina", description: "Bekijk kinky wife video's op CAM4. Getrouwde vrouwen die hun wilde kant laten zien." },
    en: { title: "Kinky Wife Videos — Naughty Wives on CAM4 | StartVagina", description: "Watch kinky wife videos on CAM4. Married women showing their wild side." },
  },
  hardcore: {
    nl: { title: "Hardcore Video's — Hardcore Cam Shows op CAM4 | StartVagina", description: "Bekijk hardcore video's van cam modellen op CAM4. Intens, expliciet en ongecensureerd." },
    en: { title: "Hardcore Videos — Hardcore Cam Shows on CAM4 | StartVagina", description: "Watch hardcore videos from cam models on CAM4. Intense, explicit and uncensored." },
  },
  "slavic-girls": {
    nl: { title: "Slavische Meisjes Video's — Oost-Europese Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Slavische cam modellen op CAM4. Prachtige Oost-Europese vrouwen met schoonheid en charme." },
    en: { title: "Slavic Girls Videos — Eastern European Cam Girls on CAM4 | StartVagina", description: "Watch videos from Slavic cam models on CAM4. Beautiful Eastern European women with beauty and charm." },
  },
  bisexual: {
    nl: { title: "Biseksuele Video's — Bisexual Cam Shows op CAM4 | StartVagina", description: "Bekijk biseksuele video's van cam modellen op CAM4. Vrouwen die van beide kanten genieten." },
    en: { title: "Bisexual Videos — Bisexual Cam Shows on CAM4 | StartVagina", description: "Watch bisexual videos from cam models on CAM4. Women who enjoy both sides." },
  },
  facesitting: {
    nl: { title: "Facesitting Video's — Facesitting Cam Shows op CAM4 | StartVagina", description: "Bekijk facesitting video's van cam modellen op CAM4. Dominant en sensueel — de beste facesitting content." },
    en: { title: "Facesitting Videos — Facesitting Cam Shows on CAM4 | StartVagina", description: "Watch facesitting videos from cam models on CAM4. Dominant and sensual — the best facesitting content." },
  },
  handjob: {
    nl: { title: "Handjob Video's — Handjob Cam Shows op CAM4 | StartVagina", description: "Bekijk handjob video's van cam modellen op CAM4. Handmatig verwennen op z'n best." },
    en: { title: "Handjob Videos — Handjob Cam Shows on CAM4 | StartVagina", description: "Watch handjob videos from cam models on CAM4. Manual pleasure at its finest." },
  },
  "pov-joi": {
    nl: { title: "POV JOI Video's — Jerk Off Instructie Cam Shows op CAM4 | StartVagina", description: "Bekijk POV JOI video's van cam modellen op CAM4. Persoonlijke instructies vanuit het eerste persoon." },
    en: { title: "POV JOI Videos — Jerk Off Instruction Cam Shows on CAM4 | StartVagina", description: "Watch POV JOI videos from cam models on CAM4. Personal instructions from a first-person perspective." },
  },
  massage: {
    nl: { title: "Massage Video's — Erotische Massage Cam Shows op CAM4 | StartVagina", description: "Bekijk erotische massage video's van cam modellen op CAM4. Sensueel, ontspannend en verleidelijk." },
    en: { title: "Massage Videos — Erotic Massage Cam Shows on CAM4 | StartVagina", description: "Watch erotic massage videos from cam models on CAM4. Sensual, relaxing and seductive." },
  },
  indian: {
    nl: { title: "Indiase Video's — Indian Cam Girls op CAM4 | StartVagina", description: "Bekijk video's van Indiase cam modellen op CAM4. Exotische schoonheid uit India." },
    en: { title: "Indian Videos — Indian Cam Girls on CAM4 | StartVagina", description: "Watch videos from Indian cam models on CAM4. Exotic beauty from India." },
  },
  giantess: {
    nl: { title: "Giantess Video's — Giantess Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk giantess fetish video's van cam modellen op CAM4. Groots, dominant en uniek." },
    en: { title: "Giantess Videos — Giantess Fetish Cam Shows on CAM4 | StartVagina", description: "Watch giantess fetish videos from cam models on CAM4. Grand, dominant and unique." },
  },
  asmr: {
    nl: { title: "ASMR Video's — ASMR Cam Shows op CAM4 | StartVagina", description: "Bekijk ASMR video's van cam modellen op CAM4. Fluisterzachte, tintelende content die je rillingen bezorgt." },
    en: { title: "ASMR Videos — ASMR Cam Shows on CAM4 | StartVagina", description: "Watch ASMR videos from cam models on CAM4. Whisper-soft, tingly content that gives you chills." },
  },
  findom: {
    nl: { title: "Findom Video's — Financial Domination Cam Shows op CAM4 | StartVagina", description: "Bekijk findom video's van cam modellen op CAM4. Financiële dominatie door machtige vrouwen." },
    en: { title: "Findom Videos — Financial Domination Cam Shows on CAM4 | StartVagina", description: "Watch findom videos from cam models on CAM4. Financial domination by powerful women." },
  },
  pegging: {
    nl: { title: "Pegging Video's — Pegging Cam Shows op CAM4 | StartVagina", description: "Bekijk pegging video's van cam modellen op CAM4. Rollenomkering op z'n best." },
    en: { title: "Pegging Videos — Pegging Cam Shows on CAM4 | StartVagina", description: "Watch pegging videos from cam models on CAM4. Role reversal at its finest." },
  },
  "interracial-couple": {
    nl: { title: "Interracial Koppel Video's — Mixed Couple Cam Shows op CAM4 | StartVagina", description: "Bekijk interracial koppel video's op CAM4. Diverse koppels, echte passie en intieme momenten." },
    en: { title: "Interracial Couple Videos — Mixed Couple Cam Shows on CAM4 | StartVagina", description: "Watch interracial couple videos on CAM4. Diverse couples, real passion and intimate moments." },
  },
  "big-cock": {
    nl: { title: "Big Cock Video's — Grote Lul Cam Shows op CAM4 | StartVagina", description: "Bekijk big cock video's op CAM4. Indrukwekkend en intens — de grootste cam content." },
    en: { title: "Big Cock Videos — Big Dick Cam Shows on CAM4 | StartVagina", description: "Watch big cock videos on CAM4. Impressive and intense — the biggest cam content." },
  },
  "dirty-talk": {
    nl: { title: "Dirty Talk Video's — Dirty Talk Cam Shows op CAM4 | StartVagina", description: "Bekijk dirty talk video's van cam modellen op CAM4. Woorden die je gek maken." },
    en: { title: "Dirty Talk Videos — Dirty Talk Cam Shows on CAM4 | StartVagina", description: "Watch dirty talk videos from cam models on CAM4. Words that drive you wild." },
  },
  gangbang: {
    nl: { title: "Gangbang Video's — Gangbang Cam Shows op CAM4 | StartVagina", description: "Bekijk gangbang video's op CAM4. Groepsactie op z'n heetst." },
    en: { title: "Gangbang Videos — Gangbang Cam Shows on CAM4 | StartVagina", description: "Watch gangbang videos on CAM4. Group action at its hottest." },
  },
  threesome: {
    nl: { title: "Trio Video's — Threesome Cam Shows op CAM4 | StartVagina", description: "Bekijk trio video's op CAM4. Drie is niet te veel — de beste threesome cam content." },
    en: { title: "Threesome Videos — Threesome Cam Shows on CAM4 | StartVagina", description: "Watch threesome videos on CAM4. Three is not a crowd — the best threesome cam content." },
  },
  69: {
    nl: { title: "69 Video's — 69 Positie Cam Shows op CAM4 | StartVagina", description: "Bekijk 69 video's van cam modellen op CAM4. Gelijktijdig genieten in de klassieke 69 positie." },
    en: { title: "69 Videos — 69 Position Cam Shows on CAM4 | StartVagina", description: "Watch 69 videos from cam models on CAM4. Mutual pleasure in the classic 69 position." },
  },
  tickling: {
    nl: { title: "Kietelen Video's — Tickling Fetish Cam Shows op CAM4 | StartVagina", description: "Bekijk tickling fetish video's van cam modellen op CAM4. Speels, prikkelend en uniek." },
    en: { title: "Tickling Videos — Tickling Fetish Cam Shows on CAM4 | StartVagina", description: "Watch tickling fetish videos from cam models on CAM4. Playful, stimulating and unique." },
  },
  ballbusting: {
    nl: { title: "Ballbusting Video's — Ballbusting Cam Shows op CAM4 | StartVagina", description: "Bekijk ballbusting video's van cam modellen op CAM4. Extreme femdom content voor de liefhebber." },
    en: { title: "Ballbusting Videos — Ballbusting Cam Shows on CAM4 | StartVagina", description: "Watch ballbusting videos from cam models on CAM4. Extreme femdom content for enthusiasts." },
  },
};

/**
 * Template-based fallback for niches without hand-crafted SEO.
 */
function generateNicheSeo(nicheName: string, lang: Language): NicheSeo {
  if (lang === "en") {
    return {
      title: `${nicheName} Videos — ${nicheName} Cam Shows on CAM4 | StartVagina`,
      description: `Watch exclusive ${nicheName.toLowerCase()} videos from cam models on CAM4. Browse free preview content in the ${nicheName.toLowerCase()} niche.`,
    };
  }
  // Default: Dutch
  return {
    title: `${nicheName} Video's — ${nicheName} Cam Shows op CAM4 | StartVagina`,
    description: `Bekijk exclusieve ${nicheName.toLowerCase()} video's van cam modellen op CAM4. Browse gratis preview content in de ${nicheName.toLowerCase()} niche.`,
  };
}

/**
 * Get SEO meta for a niche, using hand-crafted data or falling back to templates.
 */
export function getNicheSeo(slug: string, nicheName: string, lang: Language): NicheSeo {
  const override = nicheMetaOverrides[slug];
  if (override?.[lang]) return override[lang];
  if (override?.nl && lang !== "en") return override.nl; // fall back to NL for non-EN
  return generateNicheSeo(nicheName, lang);
}
