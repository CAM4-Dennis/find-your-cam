/**
 * Pre-render static HTML body content for SEO.
 * Replaces empty <div id="root"></div> with semantic HTML containing
 * h1, intro/content text, FAQ, and navigation links.
 *
 * Run AFTER vite build + prerender.mjs:
 *   node scripts/prerender-content.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const BASE = "https://startvagina.nl";

// ─── Languages ───────────────────────────────────────────────
const langs = ["nl", "en", "fr", "de", "es", "it"];
const langPrefixes = { nl: "", en: "/en", fr: "/fr", de: "/de", es: "/es", it: "/it" };

// ─── Nav labels ──────────────────────────────────────────────
const navLabels = {
  categories: { nl: "Categorieën", en: "Categories", fr: "Catégories", de: "Kategorien", es: "Categorías", it: "Categorie" },
  countries: { nl: "Landen", en: "Countries", fr: "Pays", de: "Länder", es: "Países", it: "Paesi" },
  languages: { nl: "Talen", en: "Languages", fr: "Langues", de: "Sprachen", es: "Idiomas", it: "Lingue" },
  newLabel: { nl: "Nieuw", en: "New", fr: "Nouveau", de: "Neu", es: "Nuevo", it: "Nuovo" },
  top: { nl: "Top", en: "Top", fr: "Top", de: "Top", es: "Top", it: "Top" },
  blog: { nl: "Blog", en: "Blog", fr: "Blog", de: "Blog", es: "Blog", it: "Blog" },
  faqTitle: { nl: "Veelgestelde vragen", en: "Frequently asked questions", fr: "Questions fréquentes", de: "Häufig gestellte Fragen", es: "Preguntas frecuentes", it: "Domande frequenti" },
};

// ─── Helpers ─────────────────────────────────────────────────
function esc(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderContent(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "<br/>• ")
    .replace(/\n/g, "<br/>");
}

function langLink(lang, path) {
  const prefix = langPrefixes[lang] || "";
  return `${prefix}/${path}`.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
}

function buildNav(lang) {
  const prefix = langPrefixes[lang] || "";
  const links = [
    { href: `${prefix}/categories`, label: navLabels.categories[lang] },
    { href: `${prefix}/countries`, label: navLabels.countries[lang] },
    { href: `${prefix}/languages`, label: navLabels.languages[lang] },
    { href: `${prefix}/new`, label: navLabels.newLabel[lang] },
    { href: `${prefix}/top`, label: navLabels.top[lang] },
    { href: `${prefix}/blog`, label: navLabels.blog[lang] },
  ];
  return `<nav aria-label="Main">${links.map(l => `<a href="${l.href || "/"}">${esc(l.label)}</a>`).join(" | ")}</nav>`;
}

function buildFaq(faq, lang) {
  if (!faq || faq.length === 0) return "";
  return `<section><h2>${esc(navLabels.faqTitle[lang])}</h2>${faq.map(f =>
    `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`
  ).join("")}</section>`;
}

function buildFooter(lang) {
  return `<footer><p>© ${new Date().getFullYear()} StartVagina.nl</p></footer>`;
}

function buildPage(lang, h1, bodyHtml, faq) {
  const nav = buildNav(lang);
  const faqHtml = buildFaq(faq, lang);
  const footer = buildFooter(lang);
  return `${nav}<main><h1>${h1}</h1>${bodyHtml}</main>${faqHtml}${footer}`;
}

// ─── Data imports (dynamic, to handle TS with tsx path alias) ─
// We'll parse them manually via a simpler approach: use tsx to eval
// Actually, the data files use `import type` from @/i18n/translations
// which is type-only. We can load them with a small shim.

// Since data files use `@/` alias and `import type`, we need to
// handle this. Let's read the TS source and extract data manually
// by using a runtime TS execution approach.

// Instead of complex TS loading, we'll inline the page definitions here,
// reading from the same data that prerender.mjs already references.

// ─── Page data (imported from prerender.mjs structure) ────────

// Homepage meta per lang
const homeMeta = {
  nl: { h1: "StartVagina — Gratis Webcamsex &amp; Live Sex Cams", intro: "StartVagina is dé zoekmachine voor gratis webcamsex en live sex cams. Bekijk duizenden cam girls, sexchat en erotische webcam shows van Nederlandse en Belgische modellen." },
  en: { h1: "StartVagina — Free Webcam Sex &amp; Live Sex Cams", intro: "StartVagina is the ultimate search engine for free webcam sex and live sex cams. Watch thousands of cam girls, sex chat and erotic webcam shows live." },
  fr: { h1: "StartVagina — Webcam Sexe Gratuit &amp; Cams en Direct", intro: "StartVagina est le moteur de recherche ultime pour le webcam sexe gratuit et les cams en direct. Regardez des milliers de cam girls en direct." },
  de: { h1: "StartVagina — Gratis Webcam Sex &amp; Live Sex Cams", intro: "StartVagina ist die ultimative Suchmaschine für gratis Webcam Sex und Live Sex Cams. Schau dir tausende Cam Girls live an." },
  es: { h1: "StartVagina — Webcam Sexo Gratis &amp; Cams en Vivo", intro: "StartVagina es el buscador definitivo de webcam sexo gratis y cams en vivo. Mira miles de cam girls en directo." },
  it: { h1: "StartVagina — Webcam Sex Gratis &amp; Cam dal Vivo", intro: "StartVagina è il motore di ricerca definitivo per webcam sex gratis e cam dal vivo. Guarda migliaia di cam girl in diretta." },
};

// Simple pages (categories, countries, languages, new, top, blog)
const simplePages = {
  categories: {
    nl: { h1: "Webcamsex Categorieën", desc: "Bekijk alle webcamsex categorieën. Van teen tot mature, MILF tot BDSM. Vind jouw favoriete categorie cam girls." },
    en: { h1: "Webcam Sex Categories", desc: "Browse all webcam sex categories. From teen to mature, MILF to BDSM. Find your favourite category of cam girls." },
    fr: { h1: "Catégories Webcam Sexe", desc: "Parcourez toutes les catégories de webcam sexe. De teen à mature, MILF à BDSM." },
    de: { h1: "Webcam Sex Kategorien", desc: "Durchsuche alle Webcam Sex Kategorien. Von Teen bis Mature, MILF bis BDSM." },
    es: { h1: "Categorías Webcam Sexo", desc: "Explora todas las categorías de webcam sexo. De teen a mature, MILF a BDSM." },
    it: { h1: "Categorie Webcam Sex", desc: "Sfoglia tutte le categorie di webcam sex. Da teen a mature, MILF a BDSM." },
  },
  countries: {
    nl: { h1: "Webcamsex per Land", desc: "Ontdek cam girls per land. Nederlandse, Belgische, Colombiaanse en meer webcam modellen live." },
    en: { h1: "Webcam Sex by Country", desc: "Discover cam girls by country. Dutch, Belgian, Colombian and more webcam models live." },
    fr: { h1: "Webcam Sexe par Pays", desc: "Découvrez des cam girls par pays." },
    de: { h1: "Webcam Sex nach Land", desc: "Entdecke Cam Girls nach Land." },
    es: { h1: "Webcam Sexo por País", desc: "Descubre cam girls por país." },
    it: { h1: "Webcam Sex per Paese", desc: "Scopri cam girl per paese." },
  },
  languages: {
    nl: { h1: "Webcamsex per Taal", desc: "Vind cam girls die jouw taal spreken. Webcamsex in het Nederlands, Engels, Duits en meer." },
    en: { h1: "Webcam Sex by Language", desc: "Find cam girls who speak your language." },
    fr: { h1: "Webcam Sexe par Langue", desc: "Trouvez des cam girls qui parlent votre langue." },
    de: { h1: "Webcam Sex nach Sprache", desc: "Finde Cam Girls die deine Sprache sprechen." },
    es: { h1: "Webcam Sexo por Idioma", desc: "Encuentra cam girls que hablan tu idioma." },
    it: { h1: "Webcam Sex per Lingua", desc: "Trova cam girl che parlano la tua lingua." },
  },
  new: {
    nl: { h1: "Nieuwe Webcam Modellen", desc: "Ontdek de nieuwste cam modellen die net begonnen zijn met streamen." },
    en: { h1: "New Webcam Models", desc: "Discover the newest webcam models who just started streaming." },
    fr: { h1: "Nouveaux Modèles Webcam", desc: "Découvrez les derniers modèles webcam." },
    de: { h1: "Neue Webcam Models", desc: "Entdecke die neuesten Webcam Models." },
    es: { h1: "Nuevas Modelos Webcam", desc: "Descubre las modelos webcam más nuevas." },
    it: { h1: "Nuove Modelle Webcam", desc: "Scopri le modelle webcam più recenti." },
  },
  top: {
    nl: { h1: "Top Cam Girls", desc: "De populairste en best bekeken cam girls live op webcam." },
    en: { h1: "Top Cam Girls", desc: "The most popular and most viewed cam girls live on webcam." },
    fr: { h1: "Top Cam Girls", desc: "Les cam girls les plus populaires en direct." },
    de: { h1: "Top Cam Girls", desc: "Die beliebtesten Cam Girls live auf Webcam." },
    es: { h1: "Top Cam Girls", desc: "Las cam girls más populares en vivo." },
    it: { h1: "Top Cam Girl", desc: "Le cam girl più popolari in diretta." },
  },
  blog: {
    nl: { h1: "Blog", desc: "Lees het laatste nieuws, tips en achtergronden over webcamsex en live cam shows." },
    en: { h1: "Blog", desc: "Read the latest news, tips and backgrounds about webcam sex." },
    fr: { h1: "Blog", desc: "Lisez les dernières nouvelles et conseils sur le webcam sexe." },
    de: { h1: "Blog", desc: "Lies die neuesten Nachrichten über Webcam Sex." },
    es: { h1: "Blog", desc: "Lee las últimas noticias sobre webcam sexo." },
    it: { h1: "Blog", desc: "Leggi le ultime notizie su webcam sex." },
  },
};

// ─── Load TS data files via tsx register ─────────────────────
// We'll use a subprocess to extract JSON from the TS data files.
import { execSync } from "child_process";

function loadTsData(expr, cwd) {
  const script = `
    const path = require("path");
    // Shim the @/ alias
    const Module = require("module");
    const origResolve = Module._resolveFilename;
    Module._resolveFilename = function(request, parent, ...rest) {
      if (request.startsWith("@/")) {
        request = path.resolve("${cwd.replace(/\\/g, "\\\\")}/src", request.slice(2));
      }
      return origResolve.call(this, request, parent, ...rest);
    };
    ${expr}
  `;
  try {
    const result = execSync(`npx tsx -e '${script.replace(/'/g, "'\\''")}'`, {
      cwd,
      encoding: "utf-8",
      timeout: 30000,
    });
    return JSON.parse(result.trim());
  } catch (e) {
    console.error("Failed to load TS data:", e.message);
    return null;
  }
}

// Load keyword pages
const projectDir = join(__dirname, "..");
const keywordPages = loadTsData(`
  const { keywordPages } = require("./src/data/keywordPages");
  console.log(JSON.stringify(keywordPages));
`, projectDir);

// Load category pages
const categoryPages = loadTsData(`
  const { categoryPages } = require("./src/data/categoryPages");
  console.log(JSON.stringify(categoryPages));
`, projectDir);

// Load country pages
const countryPagesI18n = loadTsData(`
  const { countryPagesI18n } = require("./src/data/countryPages");
  console.log(JSON.stringify(countryPagesI18n));
`, projectDir);

// Load platform pages
const platformPages = loadTsData(`
  const { platformPages } = require("./src/data/platformPages");
  console.log(JSON.stringify(platformPages));
`, projectDir);

// ─── Inject into dist files ──────────────────────────────────

function readDist(slug) {
  let filePath;
  if (!slug) {
    filePath = join(DIST, "index.html");
  } else {
    filePath = join(DIST, slug, "index.html");
  }
  if (!existsSync(filePath)) return null;
  return { path: filePath, html: readFileSync(filePath, "utf-8") };
}

function injectBody(html, bodyContent) {
  return html.replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`);
}

function writeDistPage(filePath, html) {
  writeFileSync(filePath, html, "utf-8");
}

function processPage(slug, lang, h1, bodyHtml, faq) {
  const file = readDist(slug);
  if (!file) return false;
  const content = buildPage(lang, h1, bodyHtml, faq);
  const newHtml = injectBody(file.html, content);
  writeDistPage(file.path, newHtml);
  return true;
}

// ─── Generate all pages ──────────────────────────────────────

console.log("\n📄 Pre-rendering body content for SEO...\n");
let count = 0;

// 1. Homepage
for (const lang of langs) {
  const prefix = langPrefixes[lang];
  const slug = prefix ? prefix.slice(1) : "";
  const meta = homeMeta[lang];
  const bodyHtml = `<p>${meta.intro}</p>`;
  if (processPage(slug, lang, meta.h1, bodyHtml, null)) count++;
}

// 2. Simple pages
for (const [pageSlug, pageLangs] of Object.entries(simplePages)) {
  for (const lang of langs) {
    const prefix = langPrefixes[lang];
    const fullSlug = prefix ? `${prefix.slice(1)}/${pageSlug}` : pageSlug;
    const meta = pageLangs[lang];
    const bodyHtml = `<p>${esc(meta.desc)}</p>`;
    if (processPage(fullSlug, lang, esc(meta.h1), bodyHtml, null)) count++;
  }
}

// 3. Keyword landing pages
if (keywordPages) {
  for (const [slug, langData] of Object.entries(keywordPages)) {
    for (const lang of langs) {
      const config = langData[lang];
      if (!config) continue;
      const prefix = langPrefixes[lang];
      const fullSlug = prefix ? `${prefix.slice(1)}/${slug}` : slug;
      const bodyHtml = `<p>${esc(config.intro)}</p>`;
      const faq = config.faq || [];
      if (processPage(fullSlug, lang, esc(config.h1), bodyHtml, faq)) count++;
    }
  }
}

// 4. Platform landing pages
if (platformPages) {
  for (const [slug, langData] of Object.entries(platformPages)) {
    for (const lang of langs) {
      const config = langData[lang];
      if (!config) continue;
      const prefix = langPrefixes[lang];
      const fullSlug = prefix ? `${prefix.slice(1)}/${slug}` : slug;
      const bodyHtml = `<p>${renderContent(config.content)}</p>`;
      const faq = config.faq || [];
      if (processPage(fullSlug, lang, esc(config.h1), bodyHtml, faq)) count++;
    }
  }
}

// 5. Category landing pages
if (categoryPages) {
  for (const [slug, langData] of Object.entries(categoryPages)) {
    for (const lang of langs) {
      const config = langData[lang];
      if (!config) continue;
      const prefix = langPrefixes[lang];
      const fullSlug = prefix ? `${prefix.slice(1)}/${slug}` : slug;
      const bodyHtml = `<p>${renderContent(config.content)}</p>`;
      const faq = config.faq || [];
      if (processPage(fullSlug, lang, esc(config.h1), bodyHtml, faq)) count++;
    }
  }
}

// 6. Country landing pages
if (countryPagesI18n) {
  for (const [slug, langData] of Object.entries(countryPagesI18n)) {
    for (const lang of langs) {
      const config = langData[lang];
      if (!config) continue;
      const prefix = langPrefixes[lang];
      const fullSlug = prefix ? `${prefix.slice(1)}/${slug}` : slug;
      const bodyHtml = `<p>${renderContent(config.content)}</p>`;
      const faq = config.faq || [];
      if (processPage(fullSlug, lang, esc(config.h1), bodyHtml, faq)) count++;
    }
  }
}

// 7. Language landing pages (meta from prerender.mjs — we use the title from the dist file)
const languageSlugs = [
  "webcamsex-in-het-nederlands", "english-webcam-sex-chat", "webcamsex-auf-deutsch",
  "webcamsex-en-francais", "webcamsex-en-espanol", "webcamsex-in-italiano",
  "webcamsex-em-portugues", "webcamsex-na-russkom", "japanese-webcam-sex", "korean-webcam-sex",
];

const langPageMeta = {
  "webcamsex-in-het-nederlands": {
    nl: { h1: "Webcamsex in het Nederlands", desc: "Nederlandstalige cam girls live op webcam. Gratis webcamsex met modellen die Nederlands spreken." },
    en: { h1: "Dutch Speaking Cam Girls Live", desc: "Dutch speaking cam girls live on webcam. Free webcam sex in your chosen language." },
    fr: { h1: "Cam Girls Néerlandophones en Direct", desc: "Cam girls néerlandophones en direct sur webcam." },
    de: { h1: "Niederländisch sprechende Cam Girls Live", desc: "Niederländisch sprechende Cam Girls live auf Webcam." },
    es: { h1: "Cam Girls de Habla Neerlandesa en Vivo", desc: "Cam girls de habla neerlandesa en vivo por webcam." },
    it: { h1: "Cam Girl di Lingua Olandese dal Vivo", desc: "Cam girl di lingua olandese in diretta su webcam." },
  },
  "english-webcam-sex-chat": {
    nl: { h1: "Engelstalige Cam Girls Live", desc: "Engelstalige cam girls live op webcam." },
    en: { h1: "English Speaking Cam Girls Live", desc: "English speaking cam girls live on webcam." },
    fr: { h1: "Cam Girls Anglophones en Direct", desc: "Cam girls anglophones en direct." },
    de: { h1: "Englisch sprechende Cam Girls Live", desc: "Englisch sprechende Cam Girls live." },
    es: { h1: "Cam Girls de Habla Inglesa en Vivo", desc: "Cam girls de habla inglesa en vivo." },
    it: { h1: "Cam Girl di Lingua Inglese dal Vivo", desc: "Cam girl di lingua inglese in diretta." },
  },
  "webcamsex-auf-deutsch": {
    nl: { h1: "Duitstalige Cam Girls Live", desc: "Duitstalige cam girls live op webcam." },
    en: { h1: "German Speaking Cam Girls Live", desc: "German speaking cam girls live on webcam." },
    fr: { h1: "Cam Girls Germanophones en Direct", desc: "Cam girls germanophones en direct." },
    de: { h1: "Deutschsprachige Cam Girls Live", desc: "Deutschsprachige Cam Girls live auf Webcam." },
    es: { h1: "Cam Girls de Habla Alemana en Vivo", desc: "Cam girls de habla alemana en vivo." },
    it: { h1: "Cam Girl di Lingua Tedesca dal Vivo", desc: "Cam girl di lingua tedesca in diretta." },
  },
  "webcamsex-en-francais": {
    nl: { h1: "Franstalige Cam Girls Live", desc: "Franstalige cam girls live op webcam." },
    en: { h1: "French Speaking Cam Girls Live", desc: "French speaking cam girls live on webcam." },
    fr: { h1: "Cam Girls Francophones en Direct", desc: "Cam girls francophones en direct sur webcam." },
    de: { h1: "Französisch sprechende Cam Girls Live", desc: "Französisch sprechende Cam Girls live." },
    es: { h1: "Cam Girls de Habla Francesa en Vivo", desc: "Cam girls de habla francesa en vivo." },
    it: { h1: "Cam Girl di Lingua Francese dal Vivo", desc: "Cam girl di lingua francese in diretta." },
  },
  "webcamsex-en-espanol": {
    nl: { h1: "Spaanstalige Cam Girls Live", desc: "Spaanstalige cam girls live op webcam." },
    en: { h1: "Spanish Speaking Cam Girls Live", desc: "Spanish speaking cam girls live on webcam." },
    fr: { h1: "Cam Girls Hispanophones en Direct", desc: "Cam girls hispanophones en direct." },
    de: { h1: "Spanisch sprechende Cam Girls Live", desc: "Spanisch sprechende Cam Girls live." },
    es: { h1: "Cam Girls de Habla Hispana en Vivo", desc: "Cam girls de habla hispana en vivo por webcam." },
    it: { h1: "Cam Girl di Lingua Spagnola dal Vivo", desc: "Cam girl di lingua spagnola in diretta." },
  },
  "webcamsex-in-italiano": {
    nl: { h1: "Italiaanstalige Cam Girls Live", desc: "Italiaanstalige cam girls live op webcam." },
    en: { h1: "Italian Speaking Cam Girls Live", desc: "Italian speaking cam girls live on webcam." },
    fr: { h1: "Cam Girls Italophones en Direct", desc: "Cam girls italophones en direct." },
    de: { h1: "Italienisch sprechende Cam Girls Live", desc: "Italienisch sprechende Cam Girls live." },
    es: { h1: "Cam Girls de Habla Italiana en Vivo", desc: "Cam girls de habla italiana en vivo." },
    it: { h1: "Cam Girl di Lingua Italiana dal Vivo", desc: "Cam girl di lingua italiana in diretta su webcam." },
  },
  "webcamsex-em-portugues": {
    nl: { h1: "Portugeestalige Cam Girls Live", desc: "Portugeestalige cam girls live op webcam." },
    en: { h1: "Portuguese Speaking Cam Girls Live", desc: "Portuguese speaking cam girls live on webcam." },
    fr: { h1: "Cam Girls Lusophones en Direct", desc: "Cam girls lusophones en direct." },
    de: { h1: "Portugiesisch sprechende Cam Girls Live", desc: "Portugiesisch sprechende Cam Girls live." },
    es: { h1: "Cam Girls de Habla Portuguesa en Vivo", desc: "Cam girls de habla portuguesa en vivo." },
    it: { h1: "Cam Girl di Lingua Portoghese dal Vivo", desc: "Cam girl di lingua portoghese in diretta." },
  },
  "webcamsex-na-russkom": {
    nl: { h1: "Russischtalige Cam Girls Live", desc: "Russischtalige cam girls live op webcam." },
    en: { h1: "Russian Speaking Cam Girls Live", desc: "Russian speaking cam girls live on webcam." },
    fr: { h1: "Cam Girls Russophones en Direct", desc: "Cam girls russophones en direct." },
    de: { h1: "Russisch sprechende Cam Girls Live", desc: "Russisch sprechende Cam Girls live." },
    es: { h1: "Cam Girls de Habla Rusa en Vivo", desc: "Cam girls de habla rusa en vivo." },
    it: { h1: "Cam Girl di Lingua Russa dal Vivo", desc: "Cam girl di lingua russa in diretta." },
  },
  "japanese-webcam-sex": {
    nl: { h1: "Japanstalige Cam Girls Live", desc: "Japanstalige cam girls live op webcam." },
    en: { h1: "Japanese Speaking Cam Girls Live", desc: "Japanese speaking cam girls live on webcam." },
    fr: { h1: "Cam Girls Japonaises en Direct", desc: "Cam girls japonaises en direct." },
    de: { h1: "Japanisch sprechende Cam Girls Live", desc: "Japanisch sprechende Cam Girls live." },
    es: { h1: "Cam Girls Japonesas en Vivo", desc: "Cam girls japonesas en vivo." },
    it: { h1: "Cam Girl Giapponesi dal Vivo", desc: "Cam girl giapponesi in diretta." },
  },
  "korean-webcam-sex": {
    nl: { h1: "Koreaanstalige Cam Girls Live", desc: "Koreaanstalige cam girls live op webcam." },
    en: { h1: "Korean Speaking Cam Girls Live", desc: "Korean speaking cam girls live on webcam." },
    fr: { h1: "Cam Girls Coréennes en Direct", desc: "Cam girls coréennes en direct." },
    de: { h1: "Koreanisch sprechende Cam Girls Live", desc: "Koreanisch sprechende Cam Girls live." },
    es: { h1: "Cam Girls Coreanas en Vivo", desc: "Cam girls coreanas en vivo." },
    it: { h1: "Cam Girl Coreane dal Vivo", desc: "Cam girl coreane in diretta." },
  },
};

for (const slug of languageSlugs) {
  const pageMeta = langPageMeta[slug];
  if (!pageMeta) continue;
  for (const lang of langs) {
    const meta = pageMeta[lang];
    if (!meta) continue;
    const prefix = langPrefixes[lang];
    const fullSlug = prefix ? `${prefix.slice(1)}/${slug}` : slug;
    const bodyHtml = `<p>${esc(meta.desc)}</p>`;
    if (processPage(fullSlug, lang, esc(meta.h1), bodyHtml, null)) count++;
  }
}

console.log(`✅ Pre-rendered body content for ${count} pages`);
console.log(`📁 Output: ${DIST}\n`);
