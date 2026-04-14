/**
 * Lightweight SEO pre-render script — NO browser needed.
 *
 * After `vite build`, this script:
 * 1. Reads the built index.html as template
 * 2. For each route, injects the correct <title>, <meta>, <link>, and JSON-LD
 *    directly into the HTML <head>
 * 3. Writes each page as dist/<route>/index.html
 *
 * This ensures Google receives correct meta tags, canonical URLs, and
 * structured data without needing Playwright or Chromium.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const BASE = "https://startvagina.nl";

// ---------- Read template ----------
const template = readFileSync(join(DIST, "index.html"), "utf-8");

// ---------- Route meta definitions ----------

// Import page configs from source (we duplicate the essential SEO data here)
const pages = [
  // Homepage
  {
    slugs: [""],
    title: "StartVagina — Gratis Webcamsex & Live Sex Cams Nederland België",
    description: "StartVagina is dé zoekmachine voor gratis webcamsex en live sex cams. Bekijk duizenden cam girls, sexchat en erotische webcam shows van Nederlandse en Belgische modellen.",
    keywords: "webcamsex, live sex cams, gratis webcam, sexchat, cam girls",
    schema: { "@context": "https://schema.org", "@type": "WebSite", name: "StartVagina", url: BASE, description: "Dé zoekmachine voor gratis webcamsex en live sex cams.", inLanguage: "nl" },
  },
  // Core pages
  { slugs: ["categories"], title: "Webcamsex Categorieën — Alle Cam Categorieën | StartVagina", description: "Bekijk alle webcamsex categorieën. Van teen tot mature, MILF tot BDSM. Vind jouw favoriete categorie cam girls.", keywords: "webcamsex categorieën, cam categorieën" },
  { slugs: ["countries"], title: "Webcamsex per Land — Cam Girls uit Alle Landen | StartVagina", description: "Ontdek cam girls per land. Nederlandse, Belgische, Colombiaanse en meer webcam modellen live.", keywords: "webcamsex landen, cam girls landen" },
  { slugs: ["languages"], title: "Webcamsex per Taal — Cam Girls in Jouw Taal | StartVagina", description: "Vind cam girls die jouw taal spreken. Webcamsex in het Nederlands, Engels, Duits en meer.", keywords: "webcamsex taal, cam girls taal" },
  { slugs: ["new"], title: "Nieuwe Webcam Modellen — Verse Cam Girls | StartVagina", description: "Ontdek de nieuwste cam modellen die net begonnen zijn met streamen. Verse gezichten, nieuwe shows.", keywords: "nieuwe cam modellen, nieuwe cam girls" },
  { slugs: ["top"], title: "Top Cam Girls — Populairste Webcam Modellen | StartVagina", description: "De populairste en best bekeken cam girls live op webcam. Top modellen van alle platforms.", keywords: "top cam girls, populaire cam modellen" },
  { slugs: ["blog"], title: "Blog — StartVagina", description: "Lees het laatste nieuws, tips en achtergronden over webcamsex en live cam shows.", keywords: "webcamsex blog, cam blog" },

  // Keyword landing pages
  { slugs: ["webcamsex"], title: "Webcamsex — Gratis Live Webcam Sex Kijken | StartVagina", description: "Gratis webcamsex kijken met duizenden cam girls live online. De beste webcam sex van Nederland en België op één plek.", keywords: "webcamsex, webcam sex, gratis webcamsex", faq: [{ q: "Is webcamsex gratis?", a: "Ja! Op StartVagina kun je gratis webcamsex kijken." }, { q: "Welke webcamsex sites zijn het best?", a: "De populairste webcamsex sites zijn Chaturbate, Stripchat, BongaCams en CAM4." }] },
  { slugs: ["gratis-webcam-sex"], title: "Gratis Webcam Sex — Live Cam Girls Zonder te Betalen | StartVagina", description: "Gratis webcam sex kijken met de mooiste cam girls. Geen creditcard nodig, geen registratie.", keywords: "gratis webcam sex, gratis cam, gratis sexcam" },
  { slugs: ["sexchat"], title: "Sexchat — Live Sex Chat met Cam Girls | StartVagina", description: "Live sexchat met cam girls. Chat gratis met webcam modellen op Chaturbate, Stripchat en meer.", keywords: "sexchat, sex chat, live sexchat" },
  { slugs: ["cam-girls"], title: "Cam Girls — Live Webcam Meisjes Kijken | StartVagina", description: "Bekijk de mooiste cam girls live op webcam. Duizenden webcam meisjes van alle platforms op één plek.", keywords: "cam girls, webcam meisjes, cam meisjes" },
  { slugs: ["live-sex-cams"], title: "Live Sex Cams — Gratis Live Cam Shows | StartVagina", description: "Gratis live sex cams kijken. Duizenden modellen live op Chaturbate, Stripchat, BongaCams en CAM4.", keywords: "live sex cams, live cam, live sex" },

  // Platform landing pages
  { slugs: ["live-sex-cams-cam4"], title: "Live Sex Cams CAM4 — Gratis Cam4 Webcamsex | StartVagina", description: "Bekijk gratis live sex cams van CAM4 op StartVagina. Duizenden CAM4 modellen live online.", keywords: "cam4, cam4 live, cam4 webcamsex" },
  { slugs: ["live-sex-cams-chaturbate"], title: "Live Sex Cams Chaturbate — Gratis Chaturbate Cams | StartVagina", description: "Gratis Chaturbate cam shows op StartVagina. De grootste selectie Chaturbate modellen live.", keywords: "chaturbate, chaturbate live, chaturbate cams" },
  { slugs: ["live-sex-cams-bongacams"], title: "Live Sex Cams BongaCams — Gratis BongaCams Shows | StartVagina", description: "BongaCams live sex cams gratis kijken op StartVagina. Europese cam modellen op BongaCams.", keywords: "bongacams, bongacams live, bongacams cams" },
  { slugs: ["live-sex-cams-stripchat"], title: "Live Sex Cams Stripchat — Gratis Stripchat Cams | StartVagina", description: "Stripchat live cam shows gratis op StartVagina. VR cams, categoriefilters en meer.", keywords: "stripchat, stripchat live, stripchat cams" },
  { slugs: ["live-sex-cams-xcams"], title: "Live Sex Cams XCams — Gratis XCams Shows | StartVagina", description: "XCams live sex cams op StartVagina. Europese cam modellen op XCams.", keywords: "xcams, xcams live, xcams cams" },

  // Category landing pages
  { slugs: ["webcamsex-teen-18-plus"], title: "Webcamsex Teen 18+ — Jonge Cam Girls Live | StartVagina", description: "Bekijk jonge cam girls van 18+ live op webcam. Gratis teen webcamsex met de mooiste jonge modellen van Chaturbate, Stripchat, BongaCams en CAM4.", keywords: "teen webcamsex, 18+ cam girls, jonge cam girls", faq: [{ q: "Zijn alle modellen echt 18+?", a: "Ja, alle cam platforms vereisen strikte leeftijdsverificatie met officiële documenten." }] },
  { slugs: ["webcamsex-milf"], title: "Webcamsex MILF — Ervaren Vrouwen Live op Cam | StartVagina", description: "MILF webcamsex met ervaren vrouwen live op cam. Bekijk de mooiste MILF cam modellen gratis.", keywords: "milf webcamsex, milf cam, milf live", faq: [{ q: "Wat betekent MILF in webcamsex?", a: "MILF verwijst naar volwassen vrouwen, meestal 30+, die webcamsex aanbieden." }] },
  { slugs: ["webcamsex-mature"], title: "Webcamsex Mature — Oudere Vrouwen Live op Webcam | StartVagina", description: "Mature webcamsex met oudere vrouwen live op cam. Gratis webcam shows van mature modellen.", keywords: "mature webcamsex, mature cam, oudere vrouwen webcam" },
  { slugs: ["webcamsex-asian"], title: "Webcamsex Asian — Aziatische Cam Girls Live | StartVagina", description: "Aziatische cam girls live op webcam. Gratis Asian webcamsex met modellen uit Japan, Korea, Thailand en meer.", keywords: "asian webcamsex, aziatische cam girls, asian cam" },
  { slugs: ["webcamsex-latina"], title: "Webcamsex Latina — Latijnse Cam Girls Live | StartVagina", description: "Latina cam girls live op webcam. Gratis webcamsex met Colombiaanse, Braziliaanse en Mexicaanse cam modellen.", keywords: "latina webcamsex, latina cam girls, colombiaanse cam girls" },
  { slugs: ["webcamsex-ebony"], title: "Webcamsex Ebony — Zwarte Cam Girls Live | StartVagina", description: "Ebony cam girls live op webcam. Gratis webcamsex met mooie zwarte modellen.", keywords: "ebony webcamsex, ebony cam girls, zwarte cam girls" },
  { slugs: ["webcamsex-grote-borsten"], title: "Webcamsex Grote Borsten — Big Boobs Cam Girls | StartVagina", description: "Cam girls met grote borsten live op webcam. Gratis big boobs webcamsex met de mooiste busty modellen.", keywords: "grote borsten webcamsex, big boobs cam, busty cam girls" },
  { slugs: ["webcamsex-kleine-borsten"], title: "Webcamsex Kleine Borsten — Petite Cam Girls | StartVagina", description: "Petite cam girls met kleine borsten live op webcam. Gratis small tits webcamsex.", keywords: "kleine borsten webcamsex, small tits cam, petite cam girls" },
  { slugs: ["webcamsex-anal"], title: "Webcamsex Anal — Anale Cam Shows Live | StartVagina", description: "Anal webcamsex met cam girls die live anale shows doen. Gratis anal cam shows.", keywords: "anal webcamsex, anal cam, anale webcam" },
  { slugs: ["webcamsex-koppels"], title: "Webcamsex Koppels — Live Cam Koppels | StartVagina", description: "Koppels webcamsex live bekijken. Gratis cam shows van echte koppels op Chaturbate, CAM4 en meer.", keywords: "koppels webcamsex, couples cam, koppel cam" },
  { slugs: ["webcamsex-squirt"], title: "Webcamsex Squirt — Squirting Cam Shows Live | StartVagina", description: "Squirt webcamsex met cam girls die live squirten. Gratis squirting cam shows.", keywords: "squirt webcamsex, squirting cam, squirt cam girls" },
  { slugs: ["webcamsex-bdsm"], title: "Webcamsex BDSM — Bondage & Fetish Cams Live | StartVagina", description: "BDSM webcamsex met dominante en submissive cam modellen. Bondage, fetish en domination shows live.", keywords: "bdsm webcamsex, bondage cam, fetish cam" },
  { slugs: ["webcamsex-tattoo"], title: "Webcamsex Tattoo — Getatoeëerde Cam Girls Live | StartVagina", description: "Getatoeëerde cam girls live op webcam. Inked en tattooed modellen gratis.", keywords: "tattoo webcamsex, getatoeeerde cam girls, inked cam" },
  { slugs: ["webcamsex-hairy"], title: "Webcamsex Hairy — Behaarde Cam Girls Live | StartVagina", description: "Hairy cam girls live op webcam. Gratis webcamsex met natuurlijk behaarde modellen.", keywords: "hairy webcamsex, hairy cam girls, behaarde cam" },
  { slugs: ["webcamsex-voeten"], title: "Webcamsex Voeten — Foot Fetish Cam Shows | StartVagina", description: "Foot fetish webcamsex met cam girls die hun voeten tonen. Gratis voeten cam shows.", keywords: "voeten webcamsex, foot fetish cam, voeten cam" },
  { slugs: ["webcamsex-outdoor"], title: "Webcamsex Outdoor — Buiten Cam Shows Live | StartVagina", description: "Outdoor webcamsex met cam girls die buiten streamen. Gratis buitensex cam shows.", keywords: "outdoor webcamsex, buiten cam, outdoor cam girls" },
  { slugs: ["webcamsex-mobiel"], title: "Mobiele Webcamsex — Cam Girls op Telefoon | StartVagina", description: "Mobiele webcamsex met cam girls die streamen vanaf hun telefoon. Spontaan, intiem en overal.", keywords: "mobiele webcamsex, mobile cam, telefoon webcam" },

  // Language landing pages
  { slugs: ["webcamsex-in-het-nederlands"], title: "Webcamsex in het Nederlands — Nederlandstalige Cam Girls | StartVagina", description: "Nederlandstalige cam girls live op webcam. Gratis webcamsex met modellen die Nederlands spreken.", keywords: "webcamsex nederlands, nederlandstalige cam girls" },
  { slugs: ["english-webcam-sex-chat"], title: "English Webcam Sex Chat — English Speaking Cam Girls | StartVagina", description: "English speaking cam girls live on webcam. Free webcam sex with English models.", keywords: "english webcam sex, english cam girls" },
  { slugs: ["webcamsex-auf-deutsch"], title: "Webcamsex auf Deutsch — Deutsche Cam Girls | StartVagina", description: "Deutsche Cam Girls live auf Webcam. Kostenlose Webcamsex mit deutschsprachigen Modellen.", keywords: "webcamsex deutsch, deutsche cam girls" },
  { slugs: ["webcamsex-en-francais"], title: "Webcamsex en Français — Cam Girls Françaises | StartVagina", description: "Cam girls françaises en direct sur webcam. Webcamsex gratuit avec des modèles francophones.", keywords: "webcamsex francais, cam girls françaises" },
  { slugs: ["webcamsex-en-espanol"], title: "Webcamsex en Español — Cam Girls Españolas | StartVagina", description: "Cam girls españolas en vivo por webcam. Webcamsex gratis con modelos de habla hispana.", keywords: "webcamsex español, cam girls españolas" },
  { slugs: ["webcamsex-in-italiano"], title: "Webcamsex in Italiano — Cam Girls Italiane | StartVagina", description: "Cam girls italiane in diretta su webcam. Webcamsex gratis con modelle italiane.", keywords: "webcamsex italiano, cam girls italiane" },
  { slugs: ["webcamsex-em-portugues"], title: "Webcamsex em Português — Cam Girls Brasileiras | StartVagina", description: "Cam girls brasileiras ao vivo na webcam. Webcamsex grátis com modelos que falam português.", keywords: "webcamsex português, cam girls brasileiras" },
  { slugs: ["webcamsex-na-russkom"], title: "Webcamsex на Русском — Русские Вебкам Модели | StartVagina", description: "Русские вебкам модели онлайн. Бесплатный вебкамсекс с русскоговорящими моделями.", keywords: "webcamsex русский, русские cam girls" },
  { slugs: ["japanese-webcam-sex"], title: "Japanese Webcam Sex — Japanese Cam Girls Live | StartVagina", description: "Japanese cam girls live on webcam. Free Japanese webcam sex shows.", keywords: "japanese webcam sex, japanese cam girls" },
  { slugs: ["korean-webcam-sex"], title: "Korean Webcam Sex — Korean Cam Girls Live | StartVagina", description: "Korean cam girls live on webcam. Free Korean webcam sex shows.", keywords: "korean webcam sex, korean cam girls" },

  // Country landing pages
  { slugs: ["webcamsex-nederland"], title: "Webcamsex Nederland — Nederlandse Cam Girls Live | StartVagina", description: "Nederlandse cam girls live op webcam. Gratis webcamsex met modellen uit Nederland.", keywords: "webcamsex nederland, nederlandse cam girls" },
  { slugs: ["webcamsex-belgie"], title: "Webcamsex België — Belgische Cam Girls Live | StartVagina", description: "Belgische cam girls live op webcam. Gratis webcamsex met Vlaamse en Waalse modellen.", keywords: "webcamsex belgie, belgische cam girls" },
  { slugs: ["webcamsex-duitsland"], title: "Webcamsex Duitsland — Duitse Cam Girls Live | StartVagina", description: "Duitse cam girls live op webcam. Gratis webcamsex met modellen uit Duitsland.", keywords: "webcamsex duitsland, duitse cam girls" },
  { slugs: ["webcamsex-colombia"], title: "Webcamsex Colombia — Colombiaanse Cam Girls Live | StartVagina", description: "Colombiaanse cam girls live op webcam. Colombia is de cam-hoofdstad van de wereld.", keywords: "webcamsex colombia, colombiaanse cam girls" },
  { slugs: ["webcamsex-roemenie"], title: "Webcamsex Roemenië — Roemeense Cam Girls Live | StartVagina", description: "Roemeense cam girls live op webcam. Gratis webcamsex met modellen uit Roemenië.", keywords: "webcamsex roemenie, roemeense cam girls" },
  { slugs: ["webcamsex-italie"], title: "Webcamsex Italië — Italiaanse Cam Girls Live | StartVagina", description: "Italiaanse cam girls live op webcam. Gratis webcamsex met modellen uit Italië.", keywords: "webcamsex italie, italiaanse cam girls" },
  { slugs: ["webcamsex-spanje"], title: "Webcamsex Spanje — Spaanse Cam Girls Live | StartVagina", description: "Spaanse cam girls live op webcam. Gratis webcamsex met modellen uit Spanje.", keywords: "webcamsex spanje, spaanse cam girls" },
  { slugs: ["webcamsex-frankrijk"], title: "Webcamsex Frankrijk — Franse Cam Girls Live | StartVagina", description: "Franse cam girls live op webcam. Gratis webcamsex met modellen uit Frankrijk.", keywords: "webcamsex frankrijk, franse cam girls" },
  { slugs: ["webcamsex-verenigd-koninkrijk"], title: "Webcamsex Verenigd Koninkrijk — Britse Cam Girls Live | StartVagina", description: "Britse cam girls live op webcam. Gratis webcamsex met modellen uit het VK.", keywords: "webcamsex uk, britse cam girls" },
  { slugs: ["webcamsex-verenigde-staten"], title: "Webcamsex Verenigde Staten — Amerikaanse Cam Girls Live | StartVagina", description: "Amerikaanse cam girls live op webcam. Gratis webcamsex met modellen uit de VS.", keywords: "webcamsex usa, amerikaanse cam girls" },
  { slugs: ["webcamsex-rusland"], title: "Webcamsex Rusland — Russische Cam Girls Live | StartVagina", description: "Russische cam girls live op webcam. Gratis webcamsex met modellen uit Rusland.", keywords: "webcamsex rusland, russische cam girls" },
  { slugs: ["webcamsex-oekraine"], title: "Webcamsex Oekraïne — Oekraïense Cam Girls Live | StartVagina", description: "Oekraïense cam girls live op webcam. Gratis webcamsex met modellen uit Oekraïne.", keywords: "webcamsex oekraine, oekraiense cam girls" },
  { slugs: ["webcamsex-brazilie"], title: "Webcamsex Brazilië — Braziliaanse Cam Girls Live | StartVagina", description: "Braziliaanse cam girls live op webcam. Gratis webcamsex met modellen uit Brazilië.", keywords: "webcamsex brazilie, braziliaanse cam girls" },
  { slugs: ["webcamsex-japan"], title: "Webcamsex Japan — Japanse Cam Girls Live | StartVagina", description: "Japanse cam girls live op webcam. Gratis webcamsex met modellen uit Japan.", keywords: "webcamsex japan, japanse cam girls" },
  { slugs: ["webcamsex-polen"], title: "Webcamsex Polen — Poolse Cam Girls Live | StartVagina", description: "Poolse cam girls live op webcam. Gratis webcamsex met modellen uit Polen.", keywords: "webcamsex polen, poolse cam girls" },
  { slugs: ["webcamsex-mexico"], title: "Webcamsex Mexico — Mexicaanse Cam Girls Live | StartVagina", description: "Mexicaanse cam girls live op webcam. Gratis webcamsex met modellen uit Mexico.", keywords: "webcamsex mexico, mexicaanse cam girls" },
  { slugs: ["webcamsex-tsjechie"], title: "Webcamsex Tsjechië — Tsjechische Cam Girls Live | StartVagina", description: "Tsjechische cam girls live op webcam. Gratis webcamsex met modellen uit Tsjechië.", keywords: "webcamsex tsjechie, tsjechische cam girls" },
  { slugs: ["webcamsex-filipijnen"], title: "Webcamsex Filipijnen — Filipijnse Cam Girls Live | StartVagina", description: "Filipijnse cam girls live op webcam. Gratis webcamsex met modellen uit de Filipijnen.", keywords: "webcamsex filipijnen, filipijnse cam girls" },
  { slugs: ["webcamsex-thailand"], title: "Webcamsex Thailand — Thaise Cam Girls Live | StartVagina", description: "Thaise cam girls live op webcam. Gratis webcamsex met modellen uit Thailand.", keywords: "webcamsex thailand, thaise cam girls" },
];

// Language prefixes for hreflang
const langs = ["nl", "en", "fr", "de", "es", "it"];
const langPrefixes = { nl: "", en: "/en", fr: "/fr", de: "/de", es: "/es", it: "/it" };

// ---------- HTML injection ----------

function buildMetaTags(slug, page) {
  const canonical = slug ? `${BASE}/${slug}` : BASE;
  const tags = [];

  tags.push(`<title>${escapeHtml(page.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeAttr(page.description)}">`);
  tags.push(`<meta name="keywords" content="${escapeAttr(page.keywords)}">`);
  tags.push(`<meta name="robots" content="index, follow">`);
  tags.push(`<link rel="canonical" href="${canonical}">`);

  // Open Graph
  tags.push(`<meta property="og:title" content="${escapeAttr(page.title)}">`);
  tags.push(`<meta property="og:description" content="${escapeAttr(page.description)}">`);
  tags.push(`<meta property="og:type" content="website">`);
  tags.push(`<meta property="og:url" content="${canonical}">`);
  tags.push(`<meta property="og:site_name" content="StartVagina">`);
  tags.push(`<meta property="og:image" content="${BASE}/og-image.png">`);

  // Twitter
  tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  tags.push(`<meta name="twitter:title" content="${escapeAttr(page.title)}">`);
  tags.push(`<meta name="twitter:description" content="${escapeAttr(page.description)}">`);
  tags.push(`<meta name="twitter:image" content="${BASE}/og-image.png">`);

  // Hreflang (for the base slug, not language-prefixed)
  const baseSlug = slug.replace(/^(en|fr|de|es|it)\//, "").replace(/^(en|fr|de|es|it)$/, "");
  for (const lang of langs) {
    const prefix = langPrefixes[lang];
    const href = baseSlug ? `${BASE}${prefix}/${baseSlug}` : `${BASE}${prefix || ""}`;
    tags.push(`<link rel="alternate" hreflang="${lang}" href="${href}">`);
  }
  tags.push(`<link rel="alternate" hreflang="x-default" href="${baseSlug ? `${BASE}/${baseSlug}` : BASE}">`);

  // JSON-LD structured data
  if (page.faq && page.faq.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`);
  } else if (page.schema) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(page.schema)}</script>`);
  }

  return tags.join("\n    ");
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function injectMeta(htmlTemplate, metaTags) {
  // Remove the fallback <title> tag, then insert our meta tags before </head>
  let html = htmlTemplate.replace(/<title>[^<]*<\/title>/, "");
  return html.replace("</head>", `    ${metaTags}\n</head>`);
}

// ---------- Generate pages ----------

function writePage(slug, html) {
  let outPath;
  if (!slug) {
    outPath = join(DIST, "index.html");
  } else {
    const dir = join(DIST, slug);
    mkdirSync(dir, { recursive: true });
    outPath = join(dir, "index.html");
  }
  writeFileSync(outPath, html, "utf-8");
}

console.log("\n🔍 Pre-rendering SEO meta tags...\n");

let count = 0;

for (const page of pages) {
  for (const baseSlug of page.slugs) {
    // Generate for each language prefix
    for (const lang of langs) {
      const prefix = langPrefixes[lang];
      let fullSlug;

      if (!baseSlug && !prefix) {
        fullSlug = ""; // root
      } else if (!baseSlug) {
        fullSlug = prefix.slice(1); // e.g. "en"
      } else if (!prefix) {
        fullSlug = baseSlug; // e.g. "webcamsex-teen-18-plus"
      } else {
        fullSlug = `${prefix.slice(1)}/${baseSlug}`; // e.g. "en/webcamsex-teen-18-plus"
      }

      const metaTags = buildMetaTags(fullSlug, page);
      const html = injectMeta(template, metaTags);
      writePage(fullSlug, html);
      count++;
    }
  }
}

console.log(`✅ Pre-rendered ${count} pages with SEO meta tags`);
console.log(`📁 Output: ${DIST}\n`);
