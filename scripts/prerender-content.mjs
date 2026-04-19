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
const BASE = "https://www.startvagina.nl";

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
  nl: { h1: "StartVagina — Gratis Webcamsex &amp; Live Sex Cams", intro: "StartVagina is dé zoekmachine voor gratis webcamsex en live sex cams. Bekijk duizenden cam girls, sexchat en erotische webcam shows van Nederlandse en Belgische modellen.\n\nOnze zoekmachine doorzoekt de grootste webcam platforms ter wereld — waaronder Chaturbate, Stripchat, BongaCams en CAM4 — en brengt alle live cam shows samen op één overzichtelijke plek. Of je nu op zoek bent naar Nederlandse cam girls, exotische modellen uit Colombia of Roemenië, of specifieke categorieën zoals MILF, Teen 18+ of BDSM: bij StartVagina vind je het allemaal.\n\nGeen registratie nodig, geen creditcard, gewoon gratis webcamsex kijken wanneer je maar wilt. Filter op categorie, land, taal of platform en ontdek elke dag nieuwe modellen die live online zijn." },
  en: { h1: "StartVagina — Free Webcam Sex &amp; Live Sex Cams", intro: "StartVagina is the ultimate search engine for free webcam sex and live sex cams. Watch thousands of cam girls, enjoy sex chat and erotic webcam shows live — no signup required.\n\nOur search engine crawls the world's biggest webcam platforms — including Chaturbate, Stripchat, BongaCams and CAM4 — and brings all live cam shows together in one convenient place. Whether you're looking for Dutch cam girls, exotic models from Colombia or Romania, or specific categories like MILF, Teen 18+ or BDSM: StartVagina has it all.\n\nNo registration needed, no credit card, just free webcam sex whenever you want. Filter by category, country, language or platform and discover new models going live every day." },
  fr: { h1: "StartVagina — Webcam Sexe Gratuit &amp; Cams en Direct", intro: "StartVagina est le moteur de recherche ultime pour le webcam sexe gratuit et les cams en direct. Regardez des milliers de cam girls et profitez de shows érotiques sans inscription.\n\nNotre moteur de recherche explore les plus grandes plateformes webcam au monde — dont Chaturbate, Stripchat, BongaCams et CAM4 — et rassemble tous les shows cam en direct en un seul endroit pratique. Que vous recherchiez des cam girls néerlandaises, des modèles exotiques de Colombie ou de Roumanie, ou des catégories spécifiques comme MILF, Teen 18+ ou BDSM : StartVagina a tout ce qu'il vous faut.\n\nAucune inscription requise, aucune carte de crédit, juste du webcam sexe gratuit quand vous le souhaitez." },
  de: { h1: "StartVagina — Gratis Webcam Sex &amp; Live Sex Cams", intro: "StartVagina ist die ultimative Suchmaschine für gratis Webcam Sex und Live Sex Cams. Schau dir tausende Cam Girls live an — kostenlos und ohne Anmeldung auf allen Plattformen.\n\nUnsere Suchmaschine durchsucht die größten Webcam-Plattformen der Welt — darunter Chaturbate, Stripchat, BongaCams und CAM4 — und bringt alle Live-Cam-Shows an einem übersichtlichen Ort zusammen. Ob du nach niederländischen Cam Girls, exotischen Models aus Kolumbien oder Rumänien oder bestimmten Kategorien wie MILF, Teen 18+ oder BDSM suchst: Bei StartVagina findest du alles.\n\nKeine Registrierung nötig, keine Kreditkarte, einfach gratis Webcam Sex schauen wann immer du willst." },
  es: { h1: "StartVagina — Webcam Sexo Gratis &amp; Cams en Vivo", intro: "StartVagina es el buscador definitivo de webcam sexo gratis y cams en vivo. Mira miles de cam girls en directo de Chaturbate, Stripchat, BongaCams y CAM4 sin registro.\n\nNuestro motor de búsqueda rastrea las mayores plataformas de webcam del mundo — incluyendo Chaturbate, Stripchat, BongaCams y CAM4 — y reúne todos los shows en vivo en un solo lugar conveniente. Ya sea que busques cam girls holandesas, modelos exóticas de Colombia o Rumanía, o categorías específicas como MILF, Teen 18+ o BDSM: StartVagina lo tiene todo.\n\nSin registro, sin tarjeta de crédito, solo webcam sexo gratis cuando quieras." },
  it: { h1: "StartVagina — Webcam Sex Gratis &amp; Cam dal Vivo", intro: "StartVagina è il motore di ricerca definitivo per webcam sex gratis e cam dal vivo. Guarda migliaia di cam girl in diretta da Chaturbate, Stripchat, BongaCams e CAM4 senza registrazione.\n\nIl nostro motore di ricerca esplora le più grandi piattaforme webcam del mondo — tra cui Chaturbate, Stripchat, BongaCams e CAM4 — e riunisce tutti gli show cam dal vivo in un unico posto comodo. Che tu stia cercando cam girl olandesi, modelle esotiche dalla Colombia o dalla Romania, o categorie specifiche come MILF, Teen 18+ o BDSM: StartVagina ha tutto.\n\nNessuna registrazione necessaria, nessuna carta di credito, solo webcam sex gratis quando vuoi." },
};

// Simple pages (categories, countries, languages, new, top, blog)
const simplePages = {
  categories: {
    nl: { h1: "Webcamsex Categorieën", desc: "Bekijk alle webcamsex categorieën op StartVagina. Van teen tot mature, MILF tot BDSM, anal tot koppels — ontdek jouw favoriete categorie cam girls van Chaturbate, Stripchat, BongaCams en CAM4. Elke categorie toont live modellen die nu online zijn, zodat je direct kunt meekijken zonder registratie." },
    en: { h1: "Webcam Sex Categories", desc: "Browse all webcam sex categories on StartVagina. From teen to mature, MILF to BDSM, anal to couples — find your favourite category of cam girls from Chaturbate, Stripchat, BongaCams and CAM4. Each category shows live models currently online, so you can start watching instantly without signup." },
    fr: { h1: "Catégories Webcam Sexe", desc: "Parcourez toutes les catégories de webcam sexe sur StartVagina. De teen à mature, MILF à BDSM, anal à couples — trouvez votre catégorie préférée de cam girls de Chaturbate, Stripchat, BongaCams et CAM4. Chaque catégorie affiche les modèles en direct actuellement en ligne." },
    de: { h1: "Webcam Sex Kategorien", desc: "Durchsuche alle Webcam Sex Kategorien auf StartVagina. Von Teen bis Mature, MILF bis BDSM, Anal bis Paare — finde deine Lieblingskategorie Cam Girls von Chaturbate, Stripchat, BongaCams und CAM4. Jede Kategorie zeigt live Models die gerade online sind." },
    es: { h1: "Categorías Webcam Sexo", desc: "Explora todas las categorías de webcam sexo en StartVagina. De teen a mature, MILF a BDSM, anal a parejas — encuentra tu categoría favorita de cam girls de Chaturbate, Stripchat, BongaCams y CAM4. Cada categoría muestra modelos en vivo actualmente en línea." },
    it: { h1: "Categorie Webcam Sex", desc: "Sfoglia tutte le categorie di webcam sex su StartVagina. Da teen a mature, MILF a BDSM, anale a coppie — trova la tua categoria preferita di cam girl da Chaturbate, Stripchat, BongaCams e CAM4. Ogni categoria mostra modelle dal vivo attualmente online." },
  },
  countries: {
    nl: { h1: "Webcamsex per Land", desc: "Ontdek cam girls per land op StartVagina. Bekijk Nederlandse, Belgische, Colombiaanse, Roemeense en meer webcam modellen live op Chaturbate, Stripchat, BongaCams en CAM4. Filter op land en vind modellen uit meer dan 19 landen wereldwijd — gratis en zonder registratie." },
    en: { h1: "Webcam Sex by Country", desc: "Discover cam girls by country on StartVagina. Watch Dutch, Belgian, Colombian, Romanian and more webcam models live on Chaturbate, Stripchat, BongaCams and CAM4. Filter by country and find models from over 19 countries worldwide — free and without registration." },
    fr: { h1: "Webcam Sexe par Pays", desc: "Découvrez des cam girls par pays sur StartVagina. Regardez des modèles néerlandaises, belges, colombiennes, roumaines et plus en direct sur Chaturbate, Stripchat, BongaCams et CAM4. Filtrez par pays et trouvez des modèles de plus de 19 pays." },
    de: { h1: "Webcam Sex nach Land", desc: "Entdecke Cam Girls nach Land auf StartVagina. Schau dir niederländische, belgische, kolumbianische, rumänische und mehr Models live auf Chaturbate, Stripchat, BongaCams und CAM4 an. Filtere nach Land und finde Models aus über 19 Ländern weltweit." },
    es: { h1: "Webcam Sexo por País", desc: "Descubre cam girls por país en StartVagina. Mira modelos holandesas, belgas, colombianas, rumanas y más en vivo en Chaturbate, Stripchat, BongaCams y CAM4. Filtra por país y encuentra modelos de más de 19 países en todo el mundo." },
    it: { h1: "Webcam Sex per Paese", desc: "Scopri cam girl per paese su StartVagina. Guarda modelle olandesi, belghe, colombiane, rumene e altre dal vivo su Chaturbate, Stripchat, BongaCams e CAM4. Filtra per paese e trova modelle da oltre 19 paesi in tutto il mondo." },
  },
  languages: {
    nl: { h1: "Webcamsex per Taal", desc: "Vind cam girls die jouw taal spreken op StartVagina. Geniet van webcamsex in het Nederlands, Engels, Duits, Frans, Spaans, Italiaans en meer. Chat live met modellen die je begrijpen — in meer dan 10 talen beschikbaar, gratis en zonder registratie." },
    en: { h1: "Webcam Sex by Language", desc: "Find cam girls who speak your language on StartVagina. Enjoy webcam sex in English, Dutch, German, French, Spanish, Italian and more. Chat live with models who understand you — available in over 10 languages, free and without registration." },
    fr: { h1: "Webcam Sexe par Langue", desc: "Trouvez des cam girls qui parlent votre langue sur StartVagina. Profitez de webcam sexe en français, anglais, allemand, espagnol et plus. Chattez en direct avec des modèles qui vous comprennent — disponible en plus de 10 langues, gratuit et sans inscription." },
    de: { h1: "Webcam Sex nach Sprache", desc: "Finde Cam Girls die deine Sprache sprechen auf StartVagina. Genieße Webcam Sex auf Deutsch, Englisch, Französisch, Spanisch und mehr. Chatte live mit Models die dich verstehen — in über 10 Sprachen verfügbar, kostenlos und ohne Anmeldung." },
    es: { h1: "Webcam Sexo por Idioma", desc: "Encuentra cam girls que hablan tu idioma en StartVagina. Disfruta de webcam sexo en español, inglés, alemán, francés y más. Chatea en vivo con modelos que te entienden — disponible en más de 10 idiomas, gratis y sin registro." },
    it: { h1: "Webcam Sex per Lingua", desc: "Trova cam girl che parlano la tua lingua su StartVagina. Goditi webcam sex in italiano, inglese, tedesco, francese e più. Chatta dal vivo con modelle che ti capiscono — disponibile in oltre 10 lingue, gratis e senza registrazione." },
  },
  new: {
    nl: { h1: "Nieuwe Webcam Modellen", desc: "Ontdek de nieuwste cam modellen die net begonnen zijn met streamen op StartVagina. Verse gezichten en nieuwe erotische shows van Chaturbate, Stripchat, BongaCams en CAM4 — dagelijks bijgewerkt zodat je altijd de meest recente modellen vindt." },
    en: { h1: "New Webcam Models", desc: "Discover the newest webcam models who just started streaming on StartVagina. Fresh faces and exciting new erotic shows from Chaturbate, Stripchat, BongaCams and CAM4 — updated daily so you always find the most recent models." },
    fr: { h1: "Nouveaux Modèles Webcam", desc: "Découvrez les derniers modèles webcam qui viennent de commencer à streamer sur StartVagina. De nouveaux visages et des shows érotiques passionnants de Chaturbate, Stripchat, BongaCams et CAM4 — mis à jour quotidiennement." },
    de: { h1: "Neue Webcam Models", desc: "Entdecke die neuesten Webcam Models die gerade angefangen haben auf StartVagina zu streamen. Frische Gesichter und neue erotische Shows von Chaturbate, Stripchat, BongaCams und CAM4 — täglich aktualisiert." },
    es: { h1: "Nuevas Modelos Webcam", desc: "Descubre las modelos webcam más nuevas que acaban de empezar en StartVagina. Caras nuevas y shows eróticos emocionantes de Chaturbate, Stripchat, BongaCams y CAM4 — actualizados diariamente." },
    it: { h1: "Nuove Modelle Webcam", desc: "Scopri le modelle webcam più recenti che hanno appena iniziato su StartVagina. Volti nuovi e show erotici emozionanti da Chaturbate, Stripchat, BongaCams e CAM4 — aggiornati quotidianamente." },
  },
  top: {
    nl: { h1: "Top Cam Girls", desc: "De populairste en best bekeken cam girls live op webcam op StartVagina. Bekijk het dagelijks bijgewerkte overzicht van de top modellen van Chaturbate, Stripchat, BongaCams en CAM4 — gesorteerd op populariteit en aantal kijkers." },
    en: { h1: "Top Cam Girls", desc: "The most popular and most viewed cam girls live on webcam on StartVagina. Browse the daily updated ranking of top models from Chaturbate, Stripchat, BongaCams and CAM4 — sorted by popularity and viewer count." },
    fr: { h1: "Top Cam Girls", desc: "Les cam girls les plus populaires et les plus regardées en direct sur StartVagina. Parcourez le classement quotidien des top modèles de Chaturbate, Stripchat, BongaCams et CAM4 — triées par popularité et nombre de spectateurs." },
    de: { h1: "Top Cam Girls", desc: "Die beliebtesten und meistgesehenen Cam Girls live auf Webcam auf StartVagina. Entdecke das täglich aktualisierte Ranking der Top Models von Chaturbate, Stripchat, BongaCams und CAM4 — sortiert nach Beliebtheit und Zuschauerzahl." },
    es: { h1: "Top Cam Girls", desc: "Las cam girls más populares y más vistas en vivo por webcam en StartVagina. Explora el ranking diario de top modelos de Chaturbate, Stripchat, BongaCams y CAM4 — ordenadas por popularidad y número de espectadores." },
    it: { h1: "Top Cam Girl", desc: "Le cam girl più popolari e più viste in diretta su webcam su StartVagina. Scopri la classifica giornaliera delle top modelle da Chaturbate, Stripchat, BongaCams e CAM4 — ordinate per popolarità e numero di spettatori." },
  },
  blog: {
    nl: { h1: "Blog", desc: "Lees het laatste nieuws, tips en achtergronden over webcamsex en live cam shows op de StartVagina blog. Ontdek trends in de cam-industrie, uitgebreide reviews van platforms zoals Chaturbate en Stripchat, en praktische gidsen voor beginners." },
    en: { h1: "Blog", desc: "Read the latest news, tips and backgrounds about webcam sex and live cam shows on the StartVagina blog. Discover trends in the cam industry, in-depth reviews of platforms like Chaturbate and Stripchat, and practical guides for beginners." },
    fr: { h1: "Blog", desc: "Lisez les dernières nouvelles, conseils et articles sur le webcam sexe et les shows cam en direct sur le blog StartVagina. Découvrez les tendances de l'industrie cam, des avis détaillés sur les plateformes et des guides pratiques pour débutants." },
    de: { h1: "Blog", desc: "Lies die neuesten Nachrichten, Tipps und Hintergründe über Webcam Sex und Live Cam Shows auf dem StartVagina Blog. Entdecke Trends in der Cam-Branche, ausführliche Reviews von Plattformen und praktische Guides für Einsteiger." },
    es: { h1: "Blog", desc: "Lee las últimas noticias, consejos y artículos sobre webcam sexo y shows cam en vivo en el blog de StartVagina. Descubre tendencias en la industria cam, reseñas detalladas de plataformas y guías prácticas para principiantes." },
    it: { h1: "Blog", desc: "Leggi le ultime notizie, consigli e approfondimenti su webcam sex e show cam dal vivo sul blog di StartVagina. Scopri tendenze nell'industria cam, recensioni dettagliate di piattaforme e guide pratiche per principianti." },
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
    nl: { h1: "Webcamsex in het Nederlands", desc: "Nederlandstalige cam girls live op webcam op StartVagina. Geniet van gratis webcamsex met modellen die vloeiend Nederlands spreken. Chat in je eigen taal met cam girls uit Nederland en België — anoniem en zonder registratie op Chaturbate, Stripchat en CAM4." },
    en: { h1: "Dutch Speaking Cam Girls Live", desc: "Dutch speaking cam girls live on webcam on StartVagina. Enjoy free webcam sex with models who speak fluent Dutch. Chat in Dutch with cam girls from the Netherlands and Belgium — anonymous and without registration." },
    fr: { h1: "Cam Girls Néerlandophones en Direct", desc: "Cam girls néerlandophones en direct sur webcam sur StartVagina. Profitez de webcam sexe gratuit avec des modèles qui parlent néerlandais couramment. Chattez en direct anonymement et sans inscription." },
    de: { h1: "Niederländisch sprechende Cam Girls Live", desc: "Niederländisch sprechende Cam Girls live auf Webcam auf StartVagina. Genieße gratis Webcam Sex mit Models die fließend Niederländisch sprechen — anonym und ohne Anmeldung." },
    es: { h1: "Cam Girls de Habla Neerlandesa en Vivo", desc: "Cam girls de habla neerlandesa en vivo por webcam en StartVagina. Disfruta de webcam sexo gratis con modelos que hablan neerlandés con fluidez — anónimo y sin registro." },
    it: { h1: "Cam Girl di Lingua Olandese dal Vivo", desc: "Cam girl di lingua olandese in diretta su webcam su StartVagina. Goditi webcam sex gratis con modelle che parlano olandese fluentemente — anonimo e senza registrazione." },
  },
  "english-webcam-sex-chat": {
    nl: { h1: "Engelstalige Cam Girls Live", desc: "Engelstalige cam girls live op webcam op StartVagina. De grootste selectie cam girls die vloeiend Engels spreken van Chaturbate, Stripchat, BongaCams en CAM4. Chat gratis en anoniem zonder registratie." },
    en: { h1: "English Speaking Cam Girls Live", desc: "English speaking cam girls live on webcam on StartVagina. The largest selection of cam girls who speak fluent English from Chaturbate, Stripchat, BongaCams and CAM4. Chat for free, anonymously and without registration." },
    fr: { h1: "Cam Girls Anglophones en Direct", desc: "Cam girls anglophones en direct sur webcam sur StartVagina. La plus grande sélection de cam girls parlant anglais de Chaturbate, Stripchat, BongaCams et CAM4. Chattez gratuitement et anonymement." },
    de: { h1: "Englisch sprechende Cam Girls Live", desc: "Englisch sprechende Cam Girls live auf Webcam auf StartVagina. Die größte Auswahl an Cam Girls die fließend Englisch sprechen von Chaturbate, Stripchat, BongaCams und CAM4." },
    es: { h1: "Cam Girls de Habla Inglesa en Vivo", desc: "Cam girls de habla inglesa en vivo por webcam en StartVagina. La mayor selección de cam girls que hablan inglés con fluidez de Chaturbate, Stripchat, BongaCams y CAM4." },
    it: { h1: "Cam Girl di Lingua Inglese dal Vivo", desc: "Cam girl di lingua inglese in diretta su webcam su StartVagina. La più grande selezione di cam girl che parlano inglese fluentemente da Chaturbate, Stripchat, BongaCams e CAM4." },
  },
  "webcamsex-auf-deutsch": {
    nl: { h1: "Duitstalige Cam Girls Live", desc: "Duitstalige cam girls live op webcam op StartVagina. Chat gratis met cam girls die vloeiend Duits spreken van Chaturbate, Stripchat, BongaCams en CAM4 — anoniem en zonder registratie." },
    en: { h1: "German Speaking Cam Girls Live", desc: "German speaking cam girls live on webcam on StartVagina. Chat for free with cam girls who speak fluent German from Chaturbate, Stripchat, BongaCams and CAM4 — anonymous and without signup." },
    fr: { h1: "Cam Girls Germanophones en Direct", desc: "Cam girls germanophones en direct sur webcam sur StartVagina. Chattez gratuitement avec des cam girls qui parlent allemand de Chaturbate, Stripchat et BongaCams — anonyme et sans inscription." },
    de: { h1: "Deutschsprachige Cam Girls Live", desc: "Deutschsprachige Cam Girls live auf Webcam auf StartVagina. Chatte kostenlos mit Cam Girls die fließend Deutsch sprechen von Chaturbate, Stripchat, BongaCams und CAM4 — anonym und ohne Anmeldung." },
    es: { h1: "Cam Girls de Habla Alemana en Vivo", desc: "Cam girls de habla alemana en vivo por webcam en StartVagina. Chatea gratis con cam girls que hablan alemán con fluidez de Chaturbate, Stripchat y BongaCams — anónimo y sin registro." },
    it: { h1: "Cam Girl di Lingua Tedesca dal Vivo", desc: "Cam girl di lingua tedesca in diretta su webcam su StartVagina. Chatta gratis con cam girl che parlano tedesco fluentemente da Chaturbate, Stripchat e BongaCams — anonimo e senza registrazione." },
  },
  "webcamsex-en-francais": {
    nl: { h1: "Franstalige Cam Girls Live", desc: "Franstalige cam girls live op webcam op StartVagina. Chat gratis met cam girls die vloeiend Frans spreken van Chaturbate, Stripchat, BongaCams en CAM4 — anoniem en zonder registratie." },
    en: { h1: "French Speaking Cam Girls Live", desc: "French speaking cam girls live on webcam on StartVagina. Chat for free with cam girls who speak fluent French from Chaturbate, Stripchat, BongaCams and CAM4 — anonymous and without signup." },
    fr: { h1: "Cam Girls Francophones en Direct", desc: "Cam girls francophones en direct sur webcam sur StartVagina. Chattez gratuitement avec des cam girls qui parlent français de Chaturbate, Stripchat et BongaCams — anonyme et sans inscription." },
    de: { h1: "Französisch sprechende Cam Girls Live", desc: "Französisch sprechende Cam Girls live auf Webcam auf StartVagina. Chatte kostenlos mit Cam Girls die fließend Französisch sprechen — anonym und ohne Anmeldung." },
    es: { h1: "Cam Girls de Habla Francesa en Vivo", desc: "Cam girls de habla francesa en vivo por webcam en StartVagina. Chatea gratis con cam girls que hablan francés con fluidez de Chaturbate, Stripchat y BongaCams — anónimo y sin registro." },
    it: { h1: "Cam Girl di Lingua Francese dal Vivo", desc: "Cam girl di lingua francese in diretta su webcam su StartVagina. Chatta gratis con cam girl che parlano francese fluentemente da Chaturbate, Stripchat e BongaCams — anonimo e senza registrazione." },
  },
  "webcamsex-en-espanol": {
    nl: { h1: "Spaanstalige Cam Girls Live", desc: "Spaanstalige cam girls live op webcam op StartVagina. Chat gratis met cam girls die vloeiend Spaans spreken van Chaturbate, Stripchat, BongaCams en CAM4 — anoniem en zonder registratie." },
    en: { h1: "Spanish Speaking Cam Girls Live", desc: "Spanish speaking cam girls live on webcam on StartVagina. Chat for free with cam girls who speak fluent Spanish from Chaturbate, Stripchat, BongaCams and CAM4 — anonymous and without signup." },
    fr: { h1: "Cam Girls Hispanophones en Direct", desc: "Cam girls hispanophones en direct sur webcam sur StartVagina. Chattez gratuitement avec des cam girls qui parlent espagnol de Chaturbate, Stripchat et BongaCams — anonyme et sans inscription." },
    de: { h1: "Spanisch sprechende Cam Girls Live", desc: "Spanisch sprechende Cam Girls live auf Webcam auf StartVagina. Chatte kostenlos mit Cam Girls die fließend Spanisch sprechen — anonym und ohne Anmeldung." },
    es: { h1: "Cam Girls de Habla Hispana en Vivo", desc: "Cam girls de habla hispana en vivo por webcam en StartVagina. Chatea gratis con cam girls que hablan español con fluidez de Chaturbate, Stripchat y BongaCams — anónimo y sin registro." },
    it: { h1: "Cam Girl di Lingua Spagnola dal Vivo", desc: "Cam girl di lingua spagnola in diretta su webcam su StartVagina. Chatta gratis con cam girl che parlano spagnolo fluentemente da Chaturbate, Stripchat e BongaCams — anonimo e senza registrazione." },
  },
  "webcamsex-in-italiano": {
    nl: { h1: "Italiaanstalige Cam Girls Live", desc: "Italiaanstalige cam girls live op webcam op StartVagina. Chat gratis met cam girls die vloeiend Italiaans spreken van Chaturbate, Stripchat, BongaCams en CAM4 — anoniem en zonder registratie." },
    en: { h1: "Italian Speaking Cam Girls Live", desc: "Italian speaking cam girls live on webcam on StartVagina. Chat for free with cam girls who speak fluent Italian from Chaturbate, Stripchat, BongaCams and CAM4 — anonymous and without signup." },
    fr: { h1: "Cam Girls Italophones en Direct", desc: "Cam girls italophones en direct sur webcam sur StartVagina. Chattez gratuitement avec des cam girls qui parlent italien de Chaturbate, Stripchat et BongaCams — anonyme et sans inscription." },
    de: { h1: "Italienisch sprechende Cam Girls Live", desc: "Italienisch sprechende Cam Girls live auf Webcam auf StartVagina. Chatte kostenlos mit Cam Girls die fließend Italienisch sprechen — anonym und ohne Anmeldung." },
    es: { h1: "Cam Girls de Habla Italiana en Vivo", desc: "Cam girls de habla italiana en vivo por webcam en StartVagina. Chatea gratis con cam girls que hablan italiano con fluidez de Chaturbate, Stripchat y BongaCams — anónimo y sin registro." },
    it: { h1: "Cam Girl di Lingua Italiana dal Vivo", desc: "Cam girl di lingua italiana in diretta su webcam su StartVagina. Chatta gratis con cam girl che parlano italiano fluentemente da Chaturbate, Stripchat e BongaCams — anonimo e senza registrazione." },
  },
  "webcamsex-em-portugues": {
    nl: { h1: "Portugeestalige Cam Girls Live", desc: "Portugeestalige cam girls live op webcam op StartVagina. Chat gratis met cam girls die vloeiend Portugees spreken van Chaturbate, Stripchat en BongaCams — anoniem en zonder registratie." },
    en: { h1: "Portuguese Speaking Cam Girls Live", desc: "Portuguese speaking cam girls live on webcam on StartVagina. Chat for free with cam girls who speak fluent Portuguese from Chaturbate, Stripchat and BongaCams — anonymous and without signup." },
    fr: { h1: "Cam Girls Lusophones en Direct", desc: "Cam girls lusophones en direct sur webcam sur StartVagina. Chattez gratuitement avec des cam girls qui parlent portugais de Chaturbate, Stripchat et BongaCams — anonyme et sans inscription." },
    de: { h1: "Portugiesisch sprechende Cam Girls Live", desc: "Portugiesisch sprechende Cam Girls live auf Webcam auf StartVagina. Chatte kostenlos mit Cam Girls die fließend Portugiesisch sprechen — anonym und ohne Anmeldung." },
    es: { h1: "Cam Girls de Habla Portuguesa en Vivo", desc: "Cam girls de habla portuguesa en vivo por webcam en StartVagina. Chatea gratis con cam girls que hablan portugués con fluidez de Chaturbate, Stripchat y BongaCams — anónimo y sin registro." },
    it: { h1: "Cam Girl di Lingua Portoghese dal Vivo", desc: "Cam girl di lingua portoghese in diretta su webcam su StartVagina. Chatta gratis con cam girl che parlano portoghese fluentemente da Chaturbate, Stripchat e BongaCams — anonimo e senza registrazione." },
  },
  "webcamsex-na-russkom": {
    nl: { h1: "Russischtalige Cam Girls Live", desc: "Russischtalige cam girls live op webcam op StartVagina. Chat gratis met cam girls die vloeiend Russisch spreken van Chaturbate, Stripchat en BongaCams — anoniem en zonder registratie." },
    en: { h1: "Russian Speaking Cam Girls Live", desc: "Russian speaking cam girls live on webcam on StartVagina. Chat for free with cam girls who speak fluent Russian from Chaturbate, Stripchat and BongaCams — anonymous and without signup." },
    fr: { h1: "Cam Girls Russophones en Direct", desc: "Cam girls russophones en direct sur webcam sur StartVagina. Chattez gratuitement avec des cam girls qui parlent russe de Chaturbate, Stripchat et BongaCams — anonyme et sans inscription." },
    de: { h1: "Russisch sprechende Cam Girls Live", desc: "Russisch sprechende Cam Girls live auf Webcam auf StartVagina. Chatte kostenlos mit Cam Girls die fließend Russisch sprechen — anonym und ohne Anmeldung." },
    es: { h1: "Cam Girls de Habla Rusa en Vivo", desc: "Cam girls de habla rusa en vivo por webcam en StartVagina. Chatea gratis con cam girls que hablan ruso con fluidez de Chaturbate, Stripchat y BongaCams — anónimo y sin registro." },
    it: { h1: "Cam Girl di Lingua Russa dal Vivo", desc: "Cam girl di lingua russa in diretta su webcam su StartVagina. Chatta gratis con cam girl che parlano russo fluentemente da Chaturbate, Stripchat e BongaCams — anonimo e senza registrazione." },
  },
  "japanese-webcam-sex": {
    nl: { h1: "Japanstalige Cam Girls Live", desc: "Japanstalige cam girls live op webcam op StartVagina. Chat gratis met cam girls die Japans spreken van Chaturbate, Stripchat en BongaCams — anoniem en zonder registratie." },
    en: { h1: "Japanese Speaking Cam Girls Live", desc: "Japanese speaking cam girls live on webcam on StartVagina. Chat for free with cam girls who speak Japanese from Chaturbate, Stripchat and BongaCams — anonymous and without signup." },
    fr: { h1: "Cam Girls Japonaises en Direct", desc: "Cam girls japonaises en direct sur webcam sur StartVagina. Chattez gratuitement avec des cam girls qui parlent japonais de Chaturbate, Stripchat et BongaCams — anonyme et sans inscription." },
    de: { h1: "Japanisch sprechende Cam Girls Live", desc: "Japanisch sprechende Cam Girls live auf Webcam auf StartVagina. Chatte kostenlos mit Cam Girls die Japanisch sprechen — anonym und ohne Anmeldung." },
    es: { h1: "Cam Girls Japonesas en Vivo", desc: "Cam girls japonesas en vivo por webcam en StartVagina. Chatea gratis con cam girls que hablan japonés de Chaturbate, Stripchat y BongaCams — anónimo y sin registro." },
    it: { h1: "Cam Girl Giapponesi dal Vivo", desc: "Cam girl giapponesi in diretta su webcam su StartVagina. Chatta gratis con cam girl che parlano giapponese da Chaturbate, Stripchat e BongaCams — anonimo e senza registrazione." },
  },
  "korean-webcam-sex": {
    nl: { h1: "Koreaanstalige Cam Girls Live", desc: "Koreaanstalige cam girls live op webcam op StartVagina. Chat gratis met cam girls die Koreaans spreken van Chaturbate, Stripchat en BongaCams — anoniem en zonder registratie." },
    en: { h1: "Korean Speaking Cam Girls Live", desc: "Korean speaking cam girls live on webcam on StartVagina. Chat for free with cam girls who speak Korean from Chaturbate, Stripchat and BongaCams — anonymous and without signup." },
    fr: { h1: "Cam Girls Coréennes en Direct", desc: "Cam girls coréennes en direct sur webcam sur StartVagina. Chattez gratuitement avec des cam girls qui parlent coréen de Chaturbate, Stripchat et BongaCams — anonyme et sans inscription." },
    de: { h1: "Koreanisch sprechende Cam Girls Live", desc: "Koreanisch sprechende Cam Girls live auf Webcam auf StartVagina. Chatte kostenlos mit Cam Girls die Koreanisch sprechen — anonym und ohne Anmeldung." },
    es: { h1: "Cam Girls Coreanas en Vivo", desc: "Cam girls coreanas en vivo por webcam en StartVagina. Chatea gratis con cam girls que hablan coreano de Chaturbate, Stripchat y BongaCams — anónimo y sin registro." },
    it: { h1: "Cam Girl Coreane dal Vivo", desc: "Cam girl coreane in diretta su webcam su StartVagina. Chatta gratis con cam girl che parlano coreano da Chaturbate, Stripchat e BongaCams — anonimo e senza registrazione." },
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
