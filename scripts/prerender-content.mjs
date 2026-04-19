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

// Generic "How it works" + CTA block appended to every page for word count
const howItWorks = {
  nl: `<section><h2>Hoe werkt StartVagina?</h2><p>StartVagina is een gratis zoekmachine die de grootste webcam platforms ter wereld doorzoekt — waaronder Chaturbate, Stripchat, BongaCams en CAM4. We verzamelen alle live cam shows en tonen ze op één overzichtelijke pagina. Je kunt filteren op categorie, land, taal of platform om precies te vinden wat je zoekt.</p><p>Je hoeft je niet te registreren en hebt geen creditcard nodig. Klik gewoon op een model en je wordt doorgestuurd naar de live show op het oorspronkelijke platform. StartVagina verdient een kleine commissie als je je aanmeldt bij een platform — voor jou blijft alles volledig gratis.</p></section>`,
  en: `<section><h2>How does StartVagina work?</h2><p>StartVagina is a free search engine that crawls the world's biggest webcam platforms — including Chaturbate, Stripchat, BongaCams and CAM4. We collect all live cam shows and display them on one convenient page. You can filter by category, country, language or platform to find exactly what you're looking for.</p><p>You don't need to register and no credit card is required. Simply click on a model and you'll be redirected to the live show on the original platform. StartVagina earns a small commission if you sign up at a platform — for you everything remains completely free.</p></section>`,
  fr: `<section><h2>Comment fonctionne StartVagina ?</h2><p>StartVagina est un moteur de recherche gratuit qui explore les plus grandes plateformes webcam au monde — dont Chaturbate, Stripchat, BongaCams et CAM4. Nous rassemblons tous les shows cam en direct et les affichons sur une seule page. Vous pouvez filtrer par catégorie, pays, langue ou plateforme pour trouver exactement ce que vous cherchez.</p><p>Pas besoin de vous inscrire ni de carte de crédit. Cliquez simplement sur un modèle et vous serez redirigé vers le show en direct sur la plateforme d'origine. Tout reste entièrement gratuit pour vous.</p></section>`,
  de: `<section><h2>Wie funktioniert StartVagina?</h2><p>StartVagina ist eine kostenlose Suchmaschine die die größten Webcam-Plattformen der Welt durchsucht — darunter Chaturbate, Stripchat, BongaCams und CAM4. Wir sammeln alle Live-Cam-Shows und zeigen sie auf einer übersichtlichen Seite. Du kannst nach Kategorie, Land, Sprache oder Plattform filtern um genau das zu finden was du suchst.</p><p>Du musst dich nicht registrieren und keine Kreditkarte ist nötig. Klicke einfach auf ein Model und du wirst zur Live-Show auf der Original-Plattform weitergeleitet. Für dich bleibt alles komplett kostenlos.</p></section>`,
  es: `<section><h2>¿Cómo funciona StartVagina?</h2><p>StartVagina es un motor de búsqueda gratuito que rastrea las mayores plataformas webcam del mundo — incluyendo Chaturbate, Stripchat, BongaCams y CAM4. Reunimos todos los shows cam en vivo y los mostramos en una sola página. Puedes filtrar por categoría, país, idioma o plataforma para encontrar exactamente lo que buscas.</p><p>No necesitas registrarte ni tarjeta de crédito. Simplemente haz clic en una modelo y serás redirigido al show en vivo en la plataforma original. Todo permanece completamente gratis para ti.</p></section>`,
  it: `<section><h2>Come funziona StartVagina?</h2><p>StartVagina è un motore di ricerca gratuito che esplora le più grandi piattaforme webcam del mondo — tra cui Chaturbate, Stripchat, BongaCams e CAM4. Raccogliamo tutti gli show cam dal vivo e li mostriamo su un'unica pagina. Puoi filtrare per categoria, paese, lingua o piattaforma per trovare esattamente quello che cerchi.</p><p>Non devi registrarti e non serve una carta di credito. Clicca semplicemente su una modella e verrai reindirizzato allo show dal vivo sulla piattaforma originale. Per te tutto rimane completamente gratuito.</p></section>`,
};

function buildPage(lang, h1, bodyHtml, faq) {
  const nav = buildNav(lang);
  const faqHtml = buildFaq(faq, lang);
  const footer = buildFooter(lang);
  const howHtml = howItWorks[lang] || "";
  return `${nav}<main><h1>${h1}</h1>${bodyHtml}${howHtml}</main>${faqHtml}${footer}`;
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

// ─── SEO outro content blocks ────────────────────────────────
// Extra paragraphs appended to thin pages for word count

const seoOutro = {
  categories: {
    nl: "<h2>Waarom webcamsex categorieën gebruiken?</h2><p>Met categorieën vind je sneller precies wat je zoekt. Of je nu fan bent van jonge cam girls (18+), ervaren MILF modellen, exotische Aziatische schoonheden of stoute BDSM shows — elke categorie toont alleen live modellen die op dit moment online zijn. StartVagina doorzoekt automatisch Chaturbate, Stripchat, BongaCams en CAM4 zodat je nooit een show hoeft te missen.</p><p>Populaire categorieën zijn onder andere Teen 18+, MILF, Mature, Asian, Latina, Ebony, Grote Borsten, Anaal en Koppels. Elke categorie heeft een eigen pagina met filters, uitleg en de best bekeken modellen van het moment.</p>",
    en: "<h2>Why use webcam sex categories?</h2><p>Categories help you find exactly what you're looking for faster. Whether you're a fan of young cam girls (18+), experienced MILF models, exotic Asian beauties or naughty BDSM shows — each category shows only live models currently online. StartVagina automatically searches Chaturbate, Stripchat, BongaCams and CAM4 so you never miss a show.</p><p>Popular categories include Teen 18+, MILF, Mature, Asian, Latina, Ebony, Big Boobs, Anal and Couples. Each category has its own page with filters, descriptions and the most-watched models of the moment.</p>",
    fr: "<h2>Pourquoi utiliser les catégories webcam sexe ?</h2><p>Les catégories vous aident à trouver exactement ce que vous cherchez plus rapidement. Que vous soyez fan de jeunes cam girls (18+), de modèles MILF expérimentées, de beautés asiatiques ou de shows BDSM — chaque catégorie affiche uniquement les modèles en direct. StartVagina recherche automatiquement sur Chaturbate, Stripchat, BongaCams et CAM4.</p><p>Les catégories populaires incluent Teen 18+, MILF, Mature, Asian, Latina, Ebony, Gros Seins, Anal et Couples. Chaque catégorie dispose de sa propre page avec filtres et descriptions.</p>",
    de: "<h2>Warum Webcam Sex Kategorien nutzen?</h2><p>Kategorien helfen dir schneller genau das zu finden was du suchst. Ob du Fan von jungen Cam Girls (18+), erfahrenen MILF Models, exotischen asiatischen Schönheiten oder frechen BDSM Shows bist — jede Kategorie zeigt nur live Models die gerade online sind. StartVagina durchsucht automatisch Chaturbate, Stripchat, BongaCams und CAM4.</p><p>Beliebte Kategorien sind Teen 18+, MILF, Mature, Asian, Latina, Ebony, Große Brüste, Anal und Paare. Jede Kategorie hat eine eigene Seite mit Filtern und Beschreibungen.</p>",
    es: "<h2>¿Por qué usar categorías de webcam sexo?</h2><p>Las categorías te ayudan a encontrar exactamente lo que buscas más rápido. Ya seas fan de cam girls jóvenes (18+), modelos MILF experimentadas, bellezas asiáticas o shows BDSM — cada categoría muestra solo modelos en vivo actualmente online. StartVagina busca automáticamente en Chaturbate, Stripchat, BongaCams y CAM4.</p><p>Las categorías populares incluyen Teen 18+, MILF, Mature, Asian, Latina, Ebony, Tetas Grandes, Anal y Parejas.</p>",
    it: "<h2>Perché usare le categorie webcam sex?</h2><p>Le categorie ti aiutano a trovare esattamente quello che cerchi più velocemente. Che tu sia fan di giovani cam girl (18+), modelle MILF esperte, bellezze asiatiche o show BDSM — ogni categoria mostra solo modelle dal vivo attualmente online. StartVagina cerca automaticamente su Chaturbate, Stripchat, BongaCams e CAM4.</p><p>Le categorie popolari includono Teen 18+, MILF, Mature, Asian, Latina, Ebony, Tette Grandi, Anale e Coppie.</p>",
  },
  countries: {
    nl: "<h2>Webcam modellen per land ontdekken</h2><p>Op StartVagina kun je cam girls filteren op land van herkomst. Of je nu houdt van Nederlandse en Belgische modellen dichtbij huis, of liever exotische cam girls uit Colombia, Roemenië of de Filipijnen bekijkt — we hebben modellen uit meer dan 19 landen. Elk land heeft een eigen pagina met live modellen die nu online zijn op Chaturbate, Stripchat, BongaCams en CAM4.</p><p>De populairste landen zijn Nederland, België, Colombia, Roemenië, de Verenigde Staten en het Verenigd Koninkrijk. Ontdek modellen met verschillende achtergronden en culturen, allemaal gratis en zonder registratie.</p>",
    en: "<h2>Discover webcam models by country</h2><p>On StartVagina you can filter cam girls by country of origin. Whether you love Dutch and Belgian models close to home, or prefer exotic cam girls from Colombia, Romania or the Philippines — we have models from over 19 countries. Each country has its own page with live models currently online on Chaturbate, Stripchat, BongaCams and CAM4.</p><p>The most popular countries include the Netherlands, Belgium, Colombia, Romania, the United States and the United Kingdom. Discover models with different backgrounds and cultures, all free and without registration.</p>",
    fr: "<h2>Découvrir les modèles webcam par pays</h2><p>Sur StartVagina vous pouvez filtrer les cam girls par pays d'origine. Que vous aimiez les modèles néerlandaises et belges proches de chez vous, ou préfériez les cam girls exotiques de Colombie, de Roumanie ou des Philippines — nous avons des modèles de plus de 19 pays. Chaque pays a sa propre page avec des modèles en direct.</p><p>Les pays les plus populaires incluent les Pays-Bas, la Belgique, la Colombie, la Roumanie, les États-Unis et le Royaume-Uni.</p>",
    de: "<h2>Webcam Models nach Land entdecken</h2><p>Auf StartVagina kannst du Cam Girls nach Herkunftsland filtern. Ob du niederländische und belgische Models in der Nähe bevorzugst oder exotische Cam Girls aus Kolumbien, Rumänien oder den Philippinen — wir haben Models aus über 19 Ländern. Jedes Land hat eine eigene Seite mit live Models auf Chaturbate, Stripchat, BongaCams und CAM4.</p><p>Die beliebtesten Länder sind die Niederlande, Belgien, Kolumbien, Rumänien, die USA und Großbritannien.</p>",
    es: "<h2>Descubrir modelos webcam por país</h2><p>En StartVagina puedes filtrar cam girls por país de origen. Ya sea que prefieras modelos holandesas y belgas cerca de casa, o cam girls exóticas de Colombia, Rumanía o Filipinas — tenemos modelos de más de 19 países. Cada país tiene su propia página con modelos en vivo en Chaturbate, Stripchat, BongaCams y CAM4.</p><p>Los países más populares incluyen Países Bajos, Bélgica, Colombia, Rumanía, Estados Unidos y Reino Unido.</p>",
    it: "<h2>Scoprire modelle webcam per paese</h2><p>Su StartVagina puoi filtrare le cam girl per paese di origine. Che tu preferisca modelle olandesi e belghe vicino a casa, o cam girl esotiche dalla Colombia, Romania o Filippine — abbiamo modelle da oltre 19 paesi. Ogni paese ha la sua pagina con modelle dal vivo su Chaturbate, Stripchat, BongaCams e CAM4.</p><p>I paesi più popolari includono Paesi Bassi, Belgio, Colombia, Romania, Stati Uniti e Regno Unito.</p>",
  },
  languages: {
    nl: "<h2>Chat met cam girls in jouw taal</h2><p>Taal maakt het verschil bij webcamsex. Op StartVagina kun je cam girls vinden die jouw taal spreken — van Nederlands en Engels tot Duits, Frans, Spaans, Italiaans, Portugees, Russisch, Japans en Koreaans. Chat live met modellen die je echt begrijpen voor een veel persoonlijkere ervaring.</p><p>Elke taalpagina toont live modellen die op dit moment online zijn en die taal spreken. Ideaal als je houdt van dirty talk in je eigen taal of gewoon een gezellig gesprek wilt voeren met een cam model.</p>",
    en: "<h2>Chat with cam girls in your language</h2><p>Language makes all the difference in webcam sex. On StartVagina you can find cam girls who speak your language — from English and Dutch to German, French, Spanish, Italian, Portuguese, Russian, Japanese and Korean. Chat live with models who truly understand you for a much more personal experience.</p><p>Each language page shows live models currently online who speak that language. Perfect if you enjoy dirty talk in your own language or simply want a genuine conversation with a cam model.</p>",
    fr: "<h2>Chattez avec des cam girls dans votre langue</h2><p>La langue fait toute la différence dans le webcam sexe. Sur StartVagina vous pouvez trouver des cam girls qui parlent votre langue — du français et anglais à l'allemand, espagnol, italien, portugais, russe, japonais et coréen. Chattez en direct avec des modèles qui vous comprennent vraiment.</p><p>Chaque page de langue affiche les modèles en direct qui parlent cette langue. Parfait si vous aimez le dirty talk dans votre propre langue.</p>",
    de: "<h2>Chatte mit Cam Girls in deiner Sprache</h2><p>Sprache macht den Unterschied beim Webcam Sex. Auf StartVagina findest du Cam Girls die deine Sprache sprechen — von Deutsch und Englisch bis Französisch, Spanisch, Italienisch, Portugiesisch, Russisch, Japanisch und Koreanisch. Chatte live mit Models die dich wirklich verstehen.</p><p>Jede Sprachseite zeigt live Models die gerade online sind und diese Sprache sprechen. Perfekt wenn du Dirty Talk in deiner eigenen Sprache genießt.</p>",
    es: "<h2>Chatea con cam girls en tu idioma</h2><p>El idioma marca la diferencia en el webcam sexo. En StartVagina puedes encontrar cam girls que hablan tu idioma — desde español e inglés hasta alemán, francés, italiano, portugués, ruso, japonés y coreano. Chatea en vivo con modelos que realmente te entienden.</p><p>Cada página de idioma muestra modelos en vivo que hablan ese idioma. Perfecto si disfrutas del dirty talk en tu propio idioma.</p>",
    it: "<h2>Chatta con cam girl nella tua lingua</h2><p>La lingua fa la differenza nel webcam sex. Su StartVagina puoi trovare cam girl che parlano la tua lingua — dall'italiano e inglese al tedesco, francese, spagnolo, portoghese, russo, giapponese e coreano. Chatta dal vivo con modelle che ti capiscono davvero.</p><p>Ogni pagina lingua mostra modelle dal vivo che parlano quella lingua. Perfetto se ti piace il dirty talk nella tua lingua.</p>",
  },
  new: {
    nl: "<h2>Waarom nieuwe cam modellen bekijken?</h2><p>Nieuwe cam modellen brengen frisheid en opwinding. Ze zijn vaak extra enthousiast en interactief omdat ze net begonnen zijn. Op StartVagina vind je de nieuwste gezichten van Chaturbate, Stripchat, BongaCams en CAM4 — dagelijks bijgewerkt zodat je altijd de meest recente modellen ontdekt.</p><p>Nieuwe modellen proberen vaak meer uit en zijn extra aandachtig naar hun kijkers. Mis ze niet voordat ze populair worden! Bekijk ze gratis en zonder registratie.</p>",
    en: "<h2>Why watch new cam models?</h2><p>New cam models bring freshness and excitement. They're often extra enthusiastic and interactive because they just started. On StartVagina you'll find the newest faces from Chaturbate, Stripchat, BongaCams and CAM4 — updated daily so you always discover the most recent models.</p><p>New models often try more things and pay extra attention to their viewers. Don't miss them before they get popular! Watch them for free and without registration.</p>",
    fr: "<h2>Pourquoi regarder les nouveaux modèles cam ?</h2><p>Les nouveaux modèles cam apportent fraîcheur et excitation. Elles sont souvent extra enthousiastes et interactives car elles viennent de commencer. Sur StartVagina retrouvez les nouveaux visages de Chaturbate, Stripchat, BongaCams et CAM4 — mis à jour quotidiennement.</p><p>Les nouveaux modèles essaient souvent plus de choses et accordent une attention particulière à leurs spectateurs. Ne les manquez pas !</p>",
    de: "<h2>Warum neue Cam Models ansehen?</h2><p>Neue Cam Models bringen Frische und Aufregung. Sie sind oft besonders enthusiastisch und interaktiv weil sie gerade angefangen haben. Auf StartVagina findest du die neuesten Gesichter von Chaturbate, Stripchat, BongaCams und CAM4 — täglich aktualisiert.</p><p>Neue Models probieren oft mehr aus und schenken ihren Zuschauern besondere Aufmerksamkeit. Verpasse sie nicht bevor sie beliebt werden!</p>",
    es: "<h2>¿Por qué ver nuevas modelos cam?</h2><p>Las nuevas modelos cam traen frescura y emoción. Suelen ser más entusiastas e interactivas porque acaban de empezar. En StartVagina encontrarás las caras más nuevas de Chaturbate, Stripchat, BongaCams y CAM4 — actualizadas diariamente.</p><p>Las nuevas modelos suelen probar más cosas y prestar más atención a sus espectadores. ¡No te las pierdas!</p>",
    it: "<h2>Perché guardare nuove modelle cam?</h2><p>Le nuove modelle cam portano freschezza ed emozione. Sono spesso più entusiaste e interattive perché hanno appena iniziato. Su StartVagina troverai i volti più nuovi da Chaturbate, Stripchat, BongaCams e CAM4 — aggiornati quotidianamente.</p><p>Le nuove modelle provano spesso più cose e prestano più attenzione ai loro spettatori. Non perderle!</p>",
  },
  top: {
    nl: "<h2>De populairste cam girls van dit moment</h2><p>Onze top cam girls ranglijst wordt dagelijks bijgewerkt en toont de meest bekeken en populairste modellen van Chaturbate, Stripchat, BongaCams en CAM4. Deze modellen trekken de meeste kijkers en bieden de beste shows — van sensuele striptease tot interactieve vibrator shows en meer.</p><p>Ontdek waarom deze cam girls zo populair zijn. Bekijk hun profiel, start een gratis chat of geniet van hun live show. De ranglijst verandert voortdurend, dus check regelmatig terug voor nieuwe toppers.</p>",
    en: "<h2>The most popular cam girls right now</h2><p>Our top cam girls ranking is updated daily and shows the most viewed and popular models from Chaturbate, Stripchat, BongaCams and CAM4. These models attract the most viewers and deliver the best shows — from sensual striptease to interactive vibrator shows and more.</p><p>Discover why these cam girls are so popular. View their profile, start a free chat or enjoy their live show. The ranking changes constantly, so check back regularly for new top performers.</p>",
    fr: "<h2>Les cam girls les plus populaires en ce moment</h2><p>Notre classement des top cam girls est mis à jour quotidiennement et affiche les modèles les plus regardées de Chaturbate, Stripchat, BongaCams et CAM4. Ces modèles attirent le plus de spectateurs et offrent les meilleurs shows.</p><p>Découvrez pourquoi ces cam girls sont si populaires. Consultez leur profil, démarrez un chat gratuit ou profitez de leur show en direct.</p>",
    de: "<h2>Die beliebtesten Cam Girls gerade jetzt</h2><p>Unser Top Cam Girls Ranking wird täglich aktualisiert und zeigt die meistgesehenen und beliebtesten Models von Chaturbate, Stripchat, BongaCams und CAM4. Diese Models ziehen die meisten Zuschauer an und bieten die besten Shows.</p><p>Entdecke warum diese Cam Girls so beliebt sind. Schau dir ihr Profil an, starte einen kostenlosen Chat oder genieße ihre Live Show.</p>",
    es: "<h2>Las cam girls más populares ahora mismo</h2><p>Nuestro ranking de top cam girls se actualiza diariamente y muestra las modelos más vistas y populares de Chaturbate, Stripchat, BongaCams y CAM4. Estas modelos atraen más espectadores y ofrecen los mejores shows.</p><p>Descubre por qué estas cam girls son tan populares. Mira su perfil, inicia un chat gratis o disfruta de su show en vivo.</p>",
    it: "<h2>Le cam girl più popolari in questo momento</h2><p>La nostra classifica delle top cam girl viene aggiornata quotidianamente e mostra le modelle più viste e popolari di Chaturbate, Stripchat, BongaCams e CAM4. Queste modelle attirano più spettatori e offrono i migliori show.</p><p>Scopri perché queste cam girl sono così popolari. Guarda il loro profilo, inizia una chat gratuita o goditi il loro show dal vivo.</p>",
  },
  blog: {
    nl: "<h2>Het laatste nieuws over webcamsex</h2><p>Op de StartVagina blog lees je alles over de wereld van webcamsex. Van reviews van populaire cam platforms zoals Chaturbate en Stripchat, tot tips voor beginners die voor het eerst een live cam show bekijken. We schrijven ook over trends in de cam-industrie, veilig online surfen en hoe je het meeste uit je webcamsex ervaring haalt.</p><p>Onze artikelen zijn geschreven voor zowel nieuwkomers als ervaren cam-kijkers. Regelmatig nieuwe content, dus bookmark deze pagina en kom terug voor het laatste nieuws.</p>",
    en: "<h2>The latest news about webcam sex</h2><p>On the StartVagina blog you'll find everything about the world of webcam sex. From reviews of popular cam platforms like Chaturbate and Stripchat, to tips for beginners watching a live cam show for the first time. We also write about trends in the cam industry, safe online browsing and how to get the most out of your webcam sex experience.</p><p>Our articles are written for both newcomers and experienced cam viewers. Regular new content, so bookmark this page and come back for the latest news.</p>",
    fr: "<h2>Les dernières nouvelles sur le webcam sexe</h2><p>Sur le blog StartVagina retrouvez tout sur le monde du webcam sexe. Des avis sur les plateformes cam populaires comme Chaturbate et Stripchat, aux conseils pour les débutants qui regardent un show cam en direct pour la première fois. Nous écrivons aussi sur les tendances et la navigation sûre en ligne.</p><p>Nos articles sont écrits pour les débutants comme pour les spectateurs expérimentés. Nouveau contenu régulier.</p>",
    de: "<h2>Die neuesten Nachrichten über Webcam Sex</h2><p>Auf dem StartVagina Blog findest du alles über die Welt des Webcam Sex. Von Reviews beliebter Cam-Plattformen wie Chaturbate und Stripchat bis zu Tipps für Einsteiger. Wir schreiben auch über Trends in der Cam-Branche und sicheres Online-Surfen.</p><p>Unsere Artikel sind sowohl für Neulinge als auch für erfahrene Cam-Zuschauer geschrieben. Regelmäßig neuer Content.</p>",
    es: "<h2>Las últimas noticias sobre webcam sexo</h2><p>En el blog de StartVagina encontrarás todo sobre el mundo del webcam sexo. Desde reseñas de plataformas cam populares como Chaturbate y Stripchat, hasta consejos para principiantes que ven un show cam en vivo por primera vez. También escribimos sobre tendencias y navegación segura.</p><p>Nuestros artículos están escritos para principiantes y espectadores experimentados. Contenido nuevo regularmente.</p>",
    it: "<h2>Le ultime notizie sul webcam sex</h2><p>Sul blog di StartVagina troverai tutto sul mondo del webcam sex. Dalle recensioni di piattaforme cam popolari come Chaturbate e Stripchat, ai consigli per principianti che guardano uno show cam dal vivo per la prima volta. Scriviamo anche di tendenze e navigazione sicura.</p><p>I nostri articoli sono scritti per principianti e spettatori esperti. Contenuti nuovi regolarmente.</p>",
  },
};

// Generic outro for language landing pages
const langOutroTemplate = {
  nl: (langName) => `<h2>Gratis webcamsex met ${langName} modellen</h2><p>Op StartVagina vind je een ruime selectie ${langName} cam girls van de grootste platforms ter wereld. Of je nu op zoek bent naar een gezellige chat, een sensuele striptease of een interactieve show — er is altijd een model online die jouw taal spreekt. Alle shows zijn gratis te bekijken zonder registratie of creditcard.</p><p>Filter op platform (Chaturbate, Stripchat, BongaCams, CAM4) of blader door de live modellen. De selectie wordt continu bijgewerkt zodat je altijd verse content vindt. Probeer het uit en ontdek de voordelen van webcamsex in je eigen taal!</p>`,
  en: (langName) => `<h2>Free webcam sex with ${langName} models</h2><p>On StartVagina you'll find a wide selection of ${langName} cam girls from the world's biggest platforms. Whether you're looking for a friendly chat, a sensual striptease or an interactive show — there's always a model online who speaks your language. All shows are free to watch without registration or credit card.</p><p>Filter by platform (Chaturbate, Stripchat, BongaCams, CAM4) or browse the live models. The selection is continuously updated so you always find fresh content. Try it out and discover the benefits of webcam sex in your own language!</p>`,
  fr: (langName) => `<h2>Webcam sexe gratuit avec des modèles ${langName}</h2><p>Sur StartVagina retrouvez une large sélection de cam girls ${langName} des plus grandes plateformes au monde. Que vous cherchiez un chat amical, un striptease sensuel ou un show interactif — il y a toujours un modèle en ligne qui parle votre langue. Tous les shows sont gratuits sans inscription ni carte de crédit.</p><p>Filtrez par plateforme (Chaturbate, Stripchat, BongaCams, CAM4) ou parcourez les modèles en direct. La sélection est mise à jour en continu.</p>`,
  de: (langName) => `<h2>Gratis Webcam Sex mit ${langName} Models</h2><p>Auf StartVagina findest du eine große Auswahl an ${langName} Cam Girls von den größten Plattformen der Welt. Ob du einen freundlichen Chat, einen sinnlichen Striptease oder eine interaktive Show suchst — es ist immer ein Model online das deine Sprache spricht. Alle Shows sind kostenlos ohne Registrierung oder Kreditkarte.</p><p>Filtere nach Plattform (Chaturbate, Stripchat, BongaCams, CAM4) oder durchsuche die live Models. Die Auswahl wird ständig aktualisiert.</p>`,
  es: (langName) => `<h2>Webcam sexo gratis con modelos ${langName}</h2><p>En StartVagina encontrarás una amplia selección de cam girls ${langName} de las mayores plataformas del mundo. Ya sea que busques un chat amigable, un striptease sensual o un show interactivo — siempre hay una modelo en línea que habla tu idioma. Todos los shows son gratis sin registro ni tarjeta de crédito.</p><p>Filtra por plataforma (Chaturbate, Stripchat, BongaCams, CAM4) o navega por las modelos en vivo.</p>`,
  it: (langName) => `<h2>Webcam sex gratis con modelle ${langName}</h2><p>Su StartVagina troverai un'ampia selezione di cam girl ${langName} dalle più grandi piattaforme del mondo. Che tu cerchi una chat amichevole, uno striptease sensuale o uno show interattivo — c'è sempre una modella online che parla la tua lingua. Tutti gli show sono gratis senza registrazione o carta di credito.</p><p>Filtra per piattaforma (Chaturbate, Stripchat, BongaCams, CAM4) o sfoglia le modelle dal vivo.</p>`,
};

const langOutroNames = {
  "webcamsex-in-het-nederlands": { nl: "Nederlandstalige", en: "Dutch-speaking", fr: "néerlandophones", de: "niederländischsprachigen", es: "de habla neerlandesa", it: "di lingua olandese" },
  "english-webcam-sex-chat": { nl: "Engelstalige", en: "English-speaking", fr: "anglophones", de: "englischsprachigen", es: "de habla inglesa", it: "di lingua inglese" },
  "webcamsex-auf-deutsch": { nl: "Duitstalige", en: "German-speaking", fr: "germanophones", de: "deutschsprachigen", es: "de habla alemana", it: "di lingua tedesca" },
  "webcamsex-en-francais": { nl: "Franstalige", en: "French-speaking", fr: "francophones", de: "französischsprachigen", es: "de habla francesa", it: "di lingua francese" },
  "webcamsex-en-espanol": { nl: "Spaanstalige", en: "Spanish-speaking", fr: "hispanophones", de: "spanischsprachigen", es: "de habla hispana", it: "di lingua spagnola" },
  "webcamsex-in-italiano": { nl: "Italiaanstalige", en: "Italian-speaking", fr: "italophones", de: "italienischsprachigen", es: "de habla italiana", it: "di lingua italiana" },
  "webcamsex-em-portugues": { nl: "Portugeestalige", en: "Portuguese-speaking", fr: "lusophones", de: "portugiesischsprachigen", es: "de habla portuguesa", it: "di lingua portoghese" },
  "webcamsex-na-russkom": { nl: "Russischtalige", en: "Russian-speaking", fr: "russophones", de: "russischsprachigen", es: "de habla rusa", it: "di lingua russa" },
  "japanese-webcam-sex": { nl: "Japanstalige", en: "Japanese-speaking", fr: "japonaises", de: "japanischsprachigen", es: "japonesas", it: "giapponesi" },
  "korean-webcam-sex": { nl: "Koreaanstalige", en: "Korean-speaking", fr: "coréennes", de: "koreanischsprachigen", es: "coreanas", it: "coreane" },
};

// Generic outro for country pages
const countryOutroTemplate = {
  nl: (adj, country) => `<h2>${adj} cam girls live bekijken</h2><p>Op StartVagina vind je een uitgebreide selectie ${adj.toLowerCase()} cam girls die nu live online zijn. Onze zoekmachine doorzoekt automatisch Chaturbate, Stripchat, BongaCams en CAM4 om alle webcam modellen uit ${country} te verzamelen op één overzichtelijke pagina. Bekijk hun profiel, start een gratis chat of geniet van hun erotische live show — zonder registratie en zonder creditcard.</p><p>De selectie wordt continu bijgewerkt zodat je altijd de nieuwste ${adj.toLowerCase()} modellen vindt. Of je nu fan bent van specifieke looks, accenten of culturele achtergronden — webcamsex met ${adj.toLowerCase()} modellen biedt een unieke ervaring die je niet wilt missen.</p>`,
  en: (adj, country) => `<h2>Watch ${adj} cam girls live</h2><p>On StartVagina you'll find an extensive selection of ${adj} cam girls currently live online. Our search engine automatically crawls Chaturbate, Stripchat, BongaCams and CAM4 to collect all webcam models from ${country} on one convenient page. View their profile, start a free chat or enjoy their erotic live show — without registration and without credit card.</p><p>The selection is continuously updated so you always find the newest ${adj} models. Whether you're a fan of specific looks, accents or cultural backgrounds — webcam sex with ${adj} models offers a unique experience you won't want to miss.</p>`,
  fr: (adj, country) => `<h2>Regarder des cam girls ${adj} en direct</h2><p>Sur StartVagina retrouvez une sélection étendue de cam girls ${adj} actuellement en direct. Notre moteur de recherche parcourt automatiquement Chaturbate, Stripchat, BongaCams et CAM4 pour rassembler tous les modèles webcam de ${country} sur une seule page. Consultez leur profil, démarrez un chat gratuit ou profitez de leur show érotique — sans inscription et sans carte de crédit.</p>`,
  de: (adj, country) => `<h2>${adj} Cam Girls live ansehen</h2><p>Auf StartVagina findest du eine umfangreiche Auswahl an ${adj.toLowerCase()} Cam Girls die gerade live online sind. Unsere Suchmaschine durchsucht automatisch Chaturbate, Stripchat, BongaCams und CAM4 um alle Webcam Models aus ${country} auf einer übersichtlichen Seite zu sammeln. Schau dir ihr Profil an, starte einen kostenlosen Chat oder genieße ihre erotische Live Show — ohne Anmeldung und ohne Kreditkarte.</p>`,
  es: (adj, country) => `<h2>Ver cam girls ${adj} en vivo</h2><p>En StartVagina encontrarás una amplia selección de cam girls ${adj} actualmente en vivo. Nuestro motor de búsqueda rastrea automáticamente Chaturbate, Stripchat, BongaCams y CAM4 para reunir todas las modelos webcam de ${country} en una sola página. Mira su perfil, inicia un chat gratis o disfruta de su show erótico — sin registro y sin tarjeta de crédito.</p>`,
  it: (adj, country) => `<h2>Guardare cam girl ${adj} dal vivo</h2><p>Su StartVagina troverai un'ampia selezione di cam girl ${adj} attualmente in diretta. Il nostro motore di ricerca esplora automaticamente Chaturbate, Stripchat, BongaCams e CAM4 per raccogliere tutte le modelle webcam da ${country} su un'unica pagina. Guarda il loro profilo, inizia una chat gratuita o goditi il loro show erotico — senza registrazione e senza carta di credito.</p>`,
};

// Country adjective/name data for outro generation
const countryOutroData = {
  "webcamsex-nederland": { nl: ["Nederlandse", "Nederland"], en: ["Dutch", "the Netherlands"], fr: ["néerlandaises", "les Pays-Bas"], de: ["Niederländische", "den Niederlanden"], es: ["holandesas", "los Países Bajos"], it: ["olandesi", "i Paesi Bassi"] },
  "webcamsex-belgie": { nl: ["Belgische", "België"], en: ["Belgian", "Belgium"], fr: ["belges", "la Belgique"], de: ["Belgische", "Belgien"], es: ["belgas", "Bélgica"], it: ["belghe", "il Belgio"] },
  "webcamsex-duitsland": { nl: ["Duitse", "Duitsland"], en: ["German", "Germany"], fr: ["allemandes", "l'Allemagne"], de: ["Deutsche", "Deutschland"], es: ["alemanas", "Alemania"], it: ["tedesche", "la Germania"] },
  "webcamsex-colombia": { nl: ["Colombiaanse", "Colombia"], en: ["Colombian", "Colombia"], fr: ["colombiennes", "la Colombie"], de: ["Kolumbianische", "Kolumbien"], es: ["colombianas", "Colombia"], it: ["colombiane", "la Colombia"] },
  "webcamsex-roemenie": { nl: ["Roemeense", "Roemenië"], en: ["Romanian", "Romania"], fr: ["roumaines", "la Roumanie"], de: ["Rumänische", "Rumänien"], es: ["rumanas", "Rumanía"], it: ["rumene", "la Romania"] },
  "webcamsex-italie": { nl: ["Italiaanse", "Italië"], en: ["Italian", "Italy"], fr: ["italiennes", "l'Italie"], de: ["Italienische", "Italien"], es: ["italianas", "Italia"], it: ["italiane", "l'Italia"] },
  "webcamsex-spanje": { nl: ["Spaanse", "Spanje"], en: ["Spanish", "Spain"], fr: ["espagnoles", "l'Espagne"], de: ["Spanische", "Spanien"], es: ["españolas", "España"], it: ["spagnole", "la Spagna"] },
  "webcamsex-frankrijk": { nl: ["Franse", "Frankrijk"], en: ["French", "France"], fr: ["françaises", "la France"], de: ["Französische", "Frankreich"], es: ["francesas", "Francia"], it: ["francesi", "la Francia"] },
  "webcamsex-verenigd-koninkrijk": { nl: ["Britse", "het Verenigd Koninkrijk"], en: ["British", "the United Kingdom"], fr: ["britanniques", "le Royaume-Uni"], de: ["Britische", "dem Vereinigten Königreich"], es: ["británicas", "el Reino Unido"], it: ["britanniche", "il Regno Unito"] },
  "webcamsex-verenigde-staten": { nl: ["Amerikaanse", "de Verenigde Staten"], en: ["American", "the United States"], fr: ["américaines", "les États-Unis"], de: ["Amerikanische", "den USA"], es: ["americanas", "los Estados Unidos"], it: ["americane", "gli Stati Uniti"] },
  "webcamsex-rusland": { nl: ["Russische", "Rusland"], en: ["Russian", "Russia"], fr: ["russes", "la Russie"], de: ["Russische", "Russland"], es: ["rusas", "Rusia"], it: ["russe", "la Russia"] },
  "webcamsex-oekraine": { nl: ["Oekraïense", "Oekraïne"], en: ["Ukrainian", "Ukraine"], fr: ["ukrainiennes", "l'Ukraine"], de: ["Ukrainische", "der Ukraine"], es: ["ucranianas", "Ucrania"], it: ["ucraine", "l'Ucraina"] },
  "webcamsex-brazilie": { nl: ["Braziliaanse", "Brazilië"], en: ["Brazilian", "Brazil"], fr: ["brésiliennes", "le Brésil"], de: ["Brasilianische", "Brasilien"], es: ["brasileñas", "Brasil"], it: ["brasiliane", "il Brasile"] },
  "webcamsex-japan": { nl: ["Japanse", "Japan"], en: ["Japanese", "Japan"], fr: ["japonaises", "le Japon"], de: ["Japanische", "Japan"], es: ["japonesas", "Japón"], it: ["giapponesi", "il Giappone"] },
  "webcamsex-polen": { nl: ["Poolse", "Polen"], en: ["Polish", "Poland"], fr: ["polonaises", "la Pologne"], de: ["Polnische", "Polen"], es: ["polacas", "Polonia"], it: ["polacche", "la Polonia"] },
  "webcamsex-mexico": { nl: ["Mexicaanse", "Mexico"], en: ["Mexican", "Mexico"], fr: ["mexicaines", "le Mexique"], de: ["Mexikanische", "Mexiko"], es: ["mexicanas", "México"], it: ["messicane", "il Messico"] },
  "webcamsex-tsjechie": { nl: ["Tsjechische", "Tsjechië"], en: ["Czech", "the Czech Republic"], fr: ["tchèques", "la République tchèque"], de: ["Tschechische", "Tschechien"], es: ["checas", "la República Checa"], it: ["ceche", "la Repubblica Ceca"] },
  "webcamsex-filipijnen": { nl: ["Filipijnse", "de Filipijnen"], en: ["Filipina", "the Philippines"], fr: ["philippines", "les Philippines"], de: ["Philippinische", "den Philippinen"], es: ["filipinas", "las Filipinas"], it: ["filippine", "le Filippine"] },
  "webcamsex-thailand": { nl: ["Thaise", "Thailand"], en: ["Thai", "Thailand"], fr: ["thaïlandaises", "la Thaïlande"], de: ["Thailändische", "Thailand"], es: ["tailandesas", "Tailandia"], it: ["thailandesi", "la Thailandia"] },
};

// Generic outro for category pages
const categoryOutroTemplate = {
  nl: (catName) => `<h2>Meer over ${catName} webcamsex</h2><p>De ${catName} categorie is een van de populairste op StartVagina. Hier vind je live cam modellen van Chaturbate, Stripchat, BongaCams en CAM4 die nu online zijn in deze categorie. Alle shows zijn gratis te bekijken — geen registratie of creditcard nodig.</p><p>Onze selectie wordt automatisch bijgewerkt zodat je altijd de nieuwste en meest actieve modellen vindt. Gebruik de filters om te sorteren op platform, populariteit of nieuw. Ontdek waarom ${catName} webcamsex zo populair is en vind jouw favoriete model.</p>`,
  en: (catName) => `<h2>More about ${catName} webcam sex</h2><p>The ${catName} category is one of the most popular on StartVagina. Here you'll find live cam models from Chaturbate, Stripchat, BongaCams and CAM4 currently online in this category. All shows are free to watch — no registration or credit card needed.</p><p>Our selection is automatically updated so you always find the newest and most active models. Use the filters to sort by platform, popularity or new. Discover why ${catName} webcam sex is so popular and find your favourite model.</p>`,
  fr: (catName) => `<h2>En savoir plus sur le webcam sexe ${catName}</h2><p>La catégorie ${catName} est l'une des plus populaires sur StartVagina. Retrouvez des modèles cam en direct de Chaturbate, Stripchat, BongaCams et CAM4 actuellement dans cette catégorie. Tous les shows sont gratuits — aucune inscription ni carte de crédit nécessaire.</p><p>Notre sélection est automatiquement mise à jour pour que vous trouviez toujours les modèles les plus récentes et actives.</p>`,
  de: (catName) => `<h2>Mehr über ${catName} Webcam Sex</h2><p>Die ${catName} Kategorie ist eine der beliebtesten auf StartVagina. Hier findest du live Cam Models von Chaturbate, Stripchat, BongaCams und CAM4 die gerade in dieser Kategorie online sind. Alle Shows sind kostenlos — keine Registrierung oder Kreditkarte nötig.</p><p>Unsere Auswahl wird automatisch aktualisiert damit du immer die neuesten und aktivsten Models findest.</p>`,
  es: (catName) => `<h2>Más sobre webcam sexo ${catName}</h2><p>La categoría ${catName} es una de las más populares en StartVagina. Aquí encontrarás modelos cam en vivo de Chaturbate, Stripchat, BongaCams y CAM4 actualmente en esta categoría. Todos los shows son gratis — sin registro ni tarjeta de crédito.</p><p>Nuestra selección se actualiza automáticamente para que siempre encuentres las modelos más nuevas y activas.</p>`,
  it: (catName) => `<h2>Di più sul webcam sex ${catName}</h2><p>La categoria ${catName} è una delle più popolari su StartVagina. Qui troverai modelle cam dal vivo di Chaturbate, Stripchat, BongaCams e CAM4 attualmente in questa categoria. Tutti gli show sono gratis — nessuna registrazione o carta di credito necessaria.</p><p>La nostra selezione viene aggiornata automaticamente per farti trovare sempre le modelle più nuove e attive.</p>`,
};

// Category name mapping for outro
const categoryOutroNames = {
  "webcamsex-teen-18-plus": { nl: "Teen 18+", en: "Teen 18+", fr: "Teen 18+", de: "Teen 18+", es: "Teen 18+", it: "Teen 18+" },
  "webcamsex-milf": { nl: "MILF", en: "MILF", fr: "MILF", de: "MILF", es: "MILF", it: "MILF" },
  "webcamsex-mature": { nl: "Mature", en: "Mature", fr: "Mature", de: "Mature", es: "Mature", it: "Mature" },
  "webcamsex-asian": { nl: "Aziatisch", en: "Asian", fr: "Asiatique", de: "Asiatisch", es: "Asiáticas", it: "Asiatiche" },
  "webcamsex-latina": { nl: "Latina", en: "Latina", fr: "Latina", de: "Latina", es: "Latina", it: "Latina" },
  "webcamsex-ebony": { nl: "Ebony", en: "Ebony", fr: "Ebony", de: "Ebony", es: "Ebony", it: "Ebony" },
  "webcamsex-grote-borsten": { nl: "Grote Borsten", en: "Big Boobs", fr: "Gros Seins", de: "Große Brüste", es: "Tetas Grandes", it: "Tette Grandi" },
  "webcamsex-kleine-borsten": { nl: "Kleine Borsten", en: "Small Tits", fr: "Petits Seins", de: "Kleine Brüste", es: "Tetas Pequeñas", it: "Tette Piccole" },
  "webcamsex-anal": { nl: "Anal", en: "Anal", fr: "Anal", de: "Anal", es: "Anal", it: "Anale" },
  "webcamsex-koppels": { nl: "Koppels", en: "Couples", fr: "Couples", de: "Paare", es: "Parejas", it: "Coppie" },
  "webcamsex-squirt": { nl: "Squirt", en: "Squirt", fr: "Squirt", de: "Squirt", es: "Squirt", it: "Squirt" },
  "webcamsex-bdsm": { nl: "BDSM", en: "BDSM", fr: "BDSM", de: "BDSM", es: "BDSM", it: "BDSM" },
  "webcamsex-tattoo": { nl: "Tattoo", en: "Tattoo", fr: "Tatouage", de: "Tattoo", es: "Tatuaje", it: "Tatuaggio" },
  "webcamsex-hairy": { nl: "Hairy", en: "Hairy", fr: "Poilu", de: "Behaart", es: "Peluda", it: "Pelosa" },
  "webcamsex-voeten": { nl: "Voeten", en: "Feet", fr: "Pieds", de: "Füße", es: "Pies", it: "Piedi" },
  "webcamsex-outdoor": { nl: "Outdoor", en: "Outdoor", fr: "Extérieur", de: "Outdoor", es: "Exterior", it: "Outdoor" },
  "webcamsex-mobiel": { nl: "Mobiel", en: "Mobile", fr: "Mobile", de: "Mobil", es: "Móvil", it: "Mobile" },
};

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

// 2. Simple pages (with outro)
for (const [pageSlug, pageLangs] of Object.entries(simplePages)) {
  for (const lang of langs) {
    const prefix = langPrefixes[lang];
    const fullSlug = prefix ? `${prefix.slice(1)}/${pageSlug}` : pageSlug;
    const meta = pageLangs[lang];
    const outro = seoOutro[pageSlug] && seoOutro[pageSlug][lang] ? seoOutro[pageSlug][lang] : "";
    const bodyHtml = `<p>${esc(meta.desc)}</p>${outro}`;
    if (processPage(fullSlug, lang, esc(meta.h1), bodyHtml, null)) count++;
  }
}

// Keyword outro content
const keywordOutro = {
  webcamsex: {
    nl: "<p>StartVagina doorzoekt de grootste webcamsex platforms ter wereld en toont alle live modellen op één overzichtelijke pagina. Of je nu fan bent van Chaturbate, Stripchat, BongaCams of CAM4 — hier vind je duizenden cam girls die nu live aan het streamen zijn. Gebruik de filters om te zoeken op categorie, land of platform en ontdek dagelijks nieuwe modellen.</p>",
    en: "<p>StartVagina searches the world's biggest webcam sex platforms and shows all live models on one convenient page. Whether you prefer Chaturbate, Stripchat, BongaCams or CAM4 — you'll find thousands of cam girls currently streaming live. Use the filters to search by category, country or platform and discover new models every day.</p>",
    fr: "<p>StartVagina recherche les plus grandes plateformes de webcam sexe au monde et affiche tous les modèles en direct sur une seule page. Que vous préfériez Chaturbate, Stripchat, BongaCams ou CAM4 — retrouvez des milliers de cam girls en streaming live. Utilisez les filtres pour chercher par catégorie, pays ou plateforme.</p>",
    de: "<p>StartVagina durchsucht die größten Webcam Sex Plattformen der Welt und zeigt alle live Models auf einer übersichtlichen Seite. Ob du Chaturbate, Stripchat, BongaCams oder CAM4 bevorzugst — finde tausende Cam Girls die gerade live streamen. Nutze die Filter um nach Kategorie, Land oder Plattform zu suchen.</p>",
    es: "<p>StartVagina busca en las mayores plataformas de webcam sexo del mundo y muestra todas las modelos en vivo en una sola página. Ya prefieras Chaturbate, Stripchat, BongaCams o CAM4 — encontrarás miles de cam girls en streaming en vivo. Usa los filtros para buscar por categoría, país o plataforma.</p>",
    it: "<p>StartVagina cerca nelle più grandi piattaforme di webcam sex del mondo e mostra tutte le modelle dal vivo su un'unica pagina. Che tu preferisca Chaturbate, Stripchat, BongaCams o CAM4 — troverai migliaia di cam girl in streaming live. Usa i filtri per cercare per categoria, paese o piattaforma.</p>",
  },
  "gratis-webcam-sex": {
    nl: "<p>Gratis webcam sex is makkelijker dan je denkt. Op StartVagina hoef je je niet te registreren of je creditcard te gebruiken. Gewoon een model kiezen en meteen meekijken. We verzamelen de beste gratis cam shows van Chaturbate, Stripchat, BongaCams en CAM4 zodat jij altijd iets vindt dat je leuk vindt.</p>",
    en: "<p>Free webcam sex is easier than you think. On StartVagina you don't need to register or use a credit card. Simply choose a model and start watching immediately. We collect the best free cam shows from Chaturbate, Stripchat, BongaCams and CAM4 so you always find something you like.</p>",
    fr: "<p>Le webcam sexe gratuit est plus facile que vous ne le pensez. Sur StartVagina pas besoin de vous inscrire ni d'utiliser une carte de crédit. Choisissez simplement un modèle et commencez à regarder immédiatement. Nous rassemblons les meilleurs shows cam gratuits de Chaturbate, Stripchat, BongaCams et CAM4.</p>",
    de: "<p>Gratis Webcam Sex ist einfacher als du denkst. Auf StartVagina musst du dich nicht registrieren oder eine Kreditkarte benutzen. Wähle einfach ein Model und schau sofort zu. Wir sammeln die besten kostenlosen Cam Shows von Chaturbate, Stripchat, BongaCams und CAM4.</p>",
    es: "<p>El webcam sexo gratis es más fácil de lo que piensas. En StartVagina no necesitas registrarte ni usar tarjeta de crédito. Simplemente elige una modelo y empieza a ver inmediatamente. Reunimos los mejores shows cam gratuitos de Chaturbate, Stripchat, BongaCams y CAM4.</p>",
    it: "<p>Il webcam sex gratis è più facile di quanto pensi. Su StartVagina non devi registrarti né usare una carta di credito. Scegli semplicemente una modella e inizia a guardare subito. Raccogliamo i migliori show cam gratuiti da Chaturbate, Stripchat, BongaCams e CAM4.</p>",
  },
  sexchat: {
    nl: "<p>Een sexchat met een cam girl is veel persoonlijker dan gewoon kijken. Je kunt direct communiceren, verzoekjes doen en een echte connectie opbouwen. Op StartVagina vind je duizenden modellen die klaarstaan om met je te chatten op Chaturbate, Stripchat, BongaCams en CAM4 — helemaal gratis en anoniem.</p>",
    en: "<p>A sex chat with a cam girl is much more personal than just watching. You can communicate directly, make requests and build a real connection. On StartVagina you'll find thousands of models ready to chat with you on Chaturbate, Stripchat, BongaCams and CAM4 — completely free and anonymous.</p>",
    fr: "<p>Un chat sexe avec une cam girl est bien plus personnel que simplement regarder. Vous pouvez communiquer directement, faire des demandes et créer une vraie connexion. Sur StartVagina retrouvez des milliers de modèles prêtes à chatter avec vous sur Chaturbate, Stripchat, BongaCams et CAM4 — gratuit et anonyme.</p>",
    de: "<p>Ein Sexchat mit einem Cam Girl ist viel persönlicher als nur zuschauen. Du kannst direkt kommunizieren, Wünsche äußern und eine echte Verbindung aufbauen. Auf StartVagina findest du tausende Models die bereit sind mit dir zu chatten auf Chaturbate, Stripchat, BongaCams und CAM4 — kostenlos und anonym.</p>",
    es: "<p>Un chat sexual con una cam girl es mucho más personal que solo mirar. Puedes comunicarte directamente, hacer peticiones y crear una conexión real. En StartVagina encontrarás miles de modelos listas para chatear contigo en Chaturbate, Stripchat, BongaCams y CAM4 — gratis y anónimo.</p>",
    it: "<p>Una chat erotica con una cam girl è molto più personale che guardare e basta. Puoi comunicare direttamente, fare richieste e creare una vera connessione. Su StartVagina troverai migliaia di modelle pronte a chattare con te su Chaturbate, Stripchat, BongaCams e CAM4 — gratis e anonimo.</p>",
  },
  "cam-girls": {
    nl: "<p>Bij StartVagina vind je cam girls van alle leeftijden, lichaamstypes en achtergronden. Van Nederlandse meisjes van de buren tot exotische schoonheden uit Colombia of Roemenië. Elke cam girl biedt een unieke ervaring — sommigen zijn speels en interactief, anderen sensueel en mysterieus. Blader door ons uitgebreide aanbod en vind jouw favoriete model.</p>",
    en: "<p>On StartVagina you'll find cam girls of all ages, body types and backgrounds. From the girl next door to exotic beauties from Colombia or Romania. Each cam girl offers a unique experience — some are playful and interactive, others sensual and mysterious. Browse our extensive selection and find your favourite model.</p>",
    fr: "<p>Sur StartVagina retrouvez des cam girls de tous âges, morphologies et origines. De la fille d'à côté aux beautés exotiques de Colombie ou de Roumanie. Chaque cam girl offre une expérience unique — certaines sont joueuses et interactives, d'autres sensuelles et mystérieuses. Parcourez notre vaste sélection.</p>",
    de: "<p>Auf StartVagina findest du Cam Girls aller Altersgruppen, Körpertypen und Hintergründe. Vom Mädchen von nebenan bis zu exotischen Schönheiten aus Kolumbien oder Rumänien. Jedes Cam Girl bietet eine einzigartige Erfahrung — manche sind verspielt und interaktiv, andere sinnlich und geheimnisvoll. Durchsuche unsere umfangreiche Auswahl.</p>",
    es: "<p>En StartVagina encontrarás cam girls de todas las edades, tipos de cuerpo y orígenes. Desde la chica de al lado hasta bellezas exóticas de Colombia o Rumanía. Cada cam girl ofrece una experiencia única — algunas son juguetonas e interactivas, otras sensuales y misteriosas. Explora nuestra amplia selección.</p>",
    it: "<p>Su StartVagina troverai cam girl di tutte le età, tipi di corpo e origini. Dalla ragazza della porta accanto a bellezze esotiche dalla Colombia o Romania. Ogni cam girl offre un'esperienza unica — alcune sono giocose e interattive, altre sensuali e misteriose. Sfoglia la nostra ampia selezione.</p>",
  },
  "live-sex-cams": {
    nl: "<p>Live sex cams bieden de ultieme erotische ervaring. In tegenstelling tot opgenomen video's zijn live cam shows echt en onvoorspelbaar — je weet nooit wat er gaat gebeuren. Op StartVagina vind je live shows van alle grote platforms, gefilterd en gesorteerd zodat je snel de perfecte show vindt. Bekijk ze gratis, zonder registratie.</p>",
    en: "<p>Live sex cams offer the ultimate erotic experience. Unlike recorded videos, live cam shows are real and unpredictable — you never know what's going to happen. On StartVagina you'll find live shows from all major platforms, filtered and sorted so you quickly find the perfect show. Watch them for free, without registration.</p>",
    fr: "<p>Les cams en direct offrent l'expérience érotique ultime. Contrairement aux vidéos enregistrées, les shows cam en direct sont réels et imprévisibles. Sur StartVagina retrouvez des shows en direct de toutes les grandes plateformes, filtrés et triés pour trouver rapidement le show parfait. Regardez-les gratuitement.</p>",
    de: "<p>Live Sex Cams bieten das ultimative erotische Erlebnis. Im Gegensatz zu aufgezeichneten Videos sind live Cam Shows echt und unvorhersehbar. Auf StartVagina findest du Live Shows von allen großen Plattformen, gefiltert und sortiert damit du schnell die perfekte Show findest. Schau sie dir kostenlos an.</p>",
    es: "<p>Las cams en vivo ofrecen la experiencia erótica definitiva. A diferencia de los videos grabados, los shows cam en vivo son reales e impredecibles. En StartVagina encontrarás shows en vivo de todas las grandes plataformas, filtrados y ordenados para encontrar rápidamente el show perfecto. Míralos gratis.</p>",
    it: "<p>Le cam dal vivo offrono l'esperienza erotica definitiva. A differenza dei video registrati, gli show cam dal vivo sono reali e imprevedibili. Su StartVagina troverai show dal vivo da tutte le grandi piattaforme, filtrati e ordinati per trovare rapidamente lo show perfetto. Guardali gratis.</p>",
  },
};

// 3. Keyword landing pages (with outro)
if (keywordPages) {
  for (const [slug, langData] of Object.entries(keywordPages)) {
    for (const lang of langs) {
      const config = langData[lang];
      if (!config) continue;
      const prefix = langPrefixes[lang];
      const fullSlug = prefix ? `${prefix.slice(1)}/${slug}` : slug;
      const outro = keywordOutro[slug] && keywordOutro[slug][lang] ? keywordOutro[slug][lang] : "";
      const bodyHtml = `<p>${esc(config.intro)}</p>${outro}`;
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

// 5. Category landing pages (with outro)
if (categoryPages) {
  for (const [slug, langData] of Object.entries(categoryPages)) {
    for (const lang of langs) {
      const config = langData[lang];
      if (!config) continue;
      const prefix = langPrefixes[lang];
      const fullSlug = prefix ? `${prefix.slice(1)}/${slug}` : slug;
      const catNames = categoryOutroNames[slug];
      const outro = catNames && categoryOutroTemplate[lang] ? categoryOutroTemplate[lang](catNames[lang]) : "";
      const bodyHtml = `<p>${renderContent(config.content)}</p>${outro}`;
      const faq = config.faq || [];
      if (processPage(fullSlug, lang, esc(config.h1), bodyHtml, faq)) count++;
    }
  }
}

// 6. Country landing pages (with outro)
if (countryPagesI18n) {
  for (const [slug, langData] of Object.entries(countryPagesI18n)) {
    for (const lang of langs) {
      const config = langData[lang];
      if (!config) continue;
      const prefix = langPrefixes[lang];
      const fullSlug = prefix ? `${prefix.slice(1)}/${slug}` : slug;
      const cData = countryOutroData[slug];
      const outro = cData && countryOutroTemplate[lang] ? countryOutroTemplate[lang](cData[lang][0], cData[lang][1]) : "";
      const bodyHtml = `<p>${renderContent(config.content)}</p>${outro}`;
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
    const outroNames = langOutroNames[slug];
    const outro = outroNames && langOutroTemplate[lang] ? langOutroTemplate[lang](outroNames[lang]) : "";
    const bodyHtml = `<p>${esc(meta.desc)}</p>${outro}`;
    if (processPage(fullSlug, lang, esc(meta.h1), bodyHtml, null)) count++;
  }
}

console.log(`✅ Pre-rendered body content for ${count} pages`);
console.log(`📁 Output: ${DIST}\n`);
