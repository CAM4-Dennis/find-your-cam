import { readFileSync } from "fs";
import { join } from "path";

/**
 * Vercel Serverless Function — serves model pages with correct SEO meta tags.
 *
 * Model pages (/:platform/:username and /:lang/:platform/:username) need
 * unique canonical URLs, titles, and descriptions for Google to correctly
 * index them as separate pages. This function reads the pre-built SPA HTML
 * and injects model-specific meta tags based on URL parameters.
 */

const BASE = "https://www.startvagina.nl";
const PLATFORMS = new Set(["chaturbate", "bongacams", "cam4", "stripchat"]);

const PLATFORM_DISPLAY = {
  chaturbate: "Chaturbate",
  bongacams: "BongaCams",
  cam4: "CAM4",
  stripchat: "Stripchat",
};

// Translations matching src/i18n/translations.ts camTitle / camDesc
const T = {
  nl: {
    title: (n, p) => `${n} Live op ${p} — Gratis Webcamsex | StartVagina`,
    desc: (n, p) => `Bekijk ${n} gratis live op ${p}. Live webcamsex en sexchat op StartVagina — geen registratie nodig.`,
    h1: (n, p) => `${n} — Live Webcam op ${p}`,
    body: (n, p) => `Bekijk ${n} live op ${p} via StartVagina. Gratis webcamsex kijken zonder registratie. ${n} is een populair webcam model op ${p}. Klik en bekijk de gratis live show direct.`,
    nav: { cat: "Categorieën", countries: "Landen", new: "Nieuw", top: "Top" },
  },
  en: {
    title: (n, p) => `${n} Live on ${p} — Free Webcam Sex | StartVagina`,
    desc: (n, p) => `Watch ${n} for free live on ${p}. Live webcam sex and sex chat on StartVagina — no signup required.`,
    h1: (n, p) => `${n} — Live Webcam on ${p}`,
    body: (n, p) => `Watch ${n} live on ${p} via StartVagina. Free webcam sex without registration. ${n} is a popular webcam model on ${p}. Click to watch the free live show now.`,
    nav: { cat: "Categories", countries: "Countries", new: "New", top: "Top" },
  },
  fr: {
    title: (n, p) => `${n} en Direct sur ${p} — Webcam Sexe Gratuit | StartVagina`,
    desc: (n, p) => `Regardez ${n} gratuitement en direct sur ${p}. Webcam sexe et chat sexe en direct sur StartVagina — sans inscription.`,
    h1: (n, p) => `${n} — Webcam en Direct sur ${p}`,
    body: (n, p) => `Regardez ${n} en direct sur ${p} via StartVagina. Webcam sexe gratuit sans inscription. ${n} est un modèle webcam populaire sur ${p}. Cliquez pour regarder le show en direct gratuitement.`,
    nav: { cat: "Catégories", countries: "Pays", new: "Nouveau", top: "Top" },
  },
  de: {
    title: (n, p) => `${n} Live auf ${p} — Gratis Webcam Sex | StartVagina`,
    desc: (n, p) => `Schau dir ${n} gratis live auf ${p} an. Live Webcam Sex und Sexchat auf StartVagina — ohne Anmeldung.`,
    h1: (n, p) => `${n} — Live Webcam auf ${p}`,
    body: (n, p) => `Schau ${n} live auf ${p} über StartVagina. Gratis Webcam Sex ohne Registrierung. ${n} ist ein beliebtes Webcam Model auf ${p}. Klicke und schau die gratis Live Show jetzt an.`,
    nav: { cat: "Kategorien", countries: "Länder", new: "Neu", top: "Top" },
  },
  es: {
    title: (n, p) => `${n} en Vivo en ${p} — Webcam Sexo Gratis | StartVagina`,
    desc: (n, p) => `Mira a ${n} gratis en vivo en ${p}. Webcam sexo y chat sexual en vivo en StartVagina — sin registro.`,
    h1: (n, p) => `${n} — Webcam en Vivo en ${p}`,
    body: (n, p) => `Mira a ${n} en vivo en ${p} a través de StartVagina. Webcam sexo gratis sin registro. ${n} es un modelo webcam popular en ${p}. Haz clic para ver el show en vivo gratis ahora.`,
    nav: { cat: "Categorías", countries: "Países", new: "Nuevo", top: "Top" },
  },
  it: {
    title: (n, p) => `${n} dal Vivo su ${p} — Webcam Sex Gratis | StartVagina`,
    desc: (n, p) => `Guarda ${n} gratis in diretta su ${p}. Webcam sex e chat erotica dal vivo su StartVagina — senza registrazione.`,
    h1: (n, p) => `${n} — Webcam dal Vivo su ${p}`,
    body: (n, p) => `Guarda ${n} in diretta su ${p} su StartVagina. Webcam sex gratis senza registrazione. ${n} è un modello webcam popolare su ${p}. Clicca per guardare lo show dal vivo gratis ora.`,
    nav: { cat: "Categorie", countries: "Paesi", new: "Nuovo", top: "Top" },
  },
};

// Cache the HTML templates in memory (warm across invocations on same lambda)
const htmlCache = {};

function getBaseHtml(lang) {
  if (htmlCache[lang]) return htmlCache[lang];
  try {
    // In Vercel serverless, dist/ files are at the project root
    const dir = lang === "nl" ? "" : `/${lang}`;
    const filePath = join(process.cwd(), `dist${dir}`, "index.html");
    htmlCache[lang] = readFileSync(filePath, "utf-8");
  } catch {
    // Fallback to root index.html
    try {
      htmlCache[lang] = readFileSync(join(process.cwd(), "dist", "index.html"), "utf-8");
    } catch {
      htmlCache[lang] = null;
    }
  }
  return htmlCache[lang];
}

function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function handler(req, res) {
  const { lang, platform, username } = req.query;

  if (!platform || !username || !PLATFORMS.has(platform)) {
    // Pass through to SPA fallback
    res.status(404).send("Not found");
    return;
  }

  const langKey = lang && T[lang] ? lang : "nl";
  const t = T[langKey];
  const platformDisplay = PLATFORM_DISPLAY[platform] || platform;
  const displayName = capitalize(username);
  const langPrefix = langKey === "nl" ? "" : `/${langKey}`;
  const canonicalUrl = `${BASE}${langPrefix}/${platform}/${username}`;

  const title = esc(t.title(displayName, platformDisplay));
  const description = esc(t.desc(displayName, platformDisplay));
  const h1 = esc(t.h1(displayName, platformDisplay));
  const bodyText = esc(t.body(displayName, platformDisplay));
  const keywords = esc(
    `${displayName}, ${platformDisplay}, ${displayName} webcam, ${displayName} live, ${platformDisplay} cam, webcam sex, live cam`
  );

  // hreflang links for all language variants
  const hreflangs = [
    `<link rel="alternate" hreflang="nl" href="${BASE}/${platform}/${username}">`,
    ...["en", "fr", "de", "es", "it"].map(
      (l) => `<link rel="alternate" hreflang="${l}" href="${BASE}/${l}/${platform}/${username}">`
    ),
    `<link rel="alternate" hreflang="x-default" href="${BASE}/${platform}/${username}">`,
  ].join("\n    ");

  // JSON-LD structured data
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: displayName,
    },
    description: t.desc(displayName, platformDisplay),
    url: canonicalUrl,
  });

  let html = getBaseHtml(langKey);

  if (!html) {
    // If we somehow can't read the template, return a minimal HTML page
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(`<!DOCTYPE html>
<html lang="${langKey}">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
  ${hreflangs}
</head>
<body>
  <h1>${h1}</h1>
  <p>${bodyText}</p>
</body>
</html>`);
    return;
  }

  // Set correct lang attribute on <html>
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${langKey}"`);

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${description}">`
  );

  // Replace meta keywords
  html = html.replace(
    /<meta name="keywords" content="[^"]*">/,
    `<meta name="keywords" content="${keywords}">`
  );

  // Replace robots — ensure index, follow
  html = html.replace(
    /<meta name="robots" content="[^"]*">/,
    `<meta name="robots" content="index, follow">`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${canonicalUrl}">`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${title}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${description}">`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${canonicalUrl}">`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${title}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${description}">`
  );

  // Replace hreflang links (match all consecutive alternate hreflang links)
  html = html.replace(
    /(<link rel="alternate" hreflang="[^"]*" href="[^"]*">\s*)+/g,
    hreflangs + "\n    "
  );

  // Replace JSON-LD structured data
  html = html.replace(
    /<script type="application\/ld\+json">[^<]*<\/script>/,
    `<script type="application/ld+json">${jsonLd}</script>`
  );

  // Replace the pre-rendered body content with model-specific SEO content
  // The React SPA will take over and render the full interactive UI on top
  html = html.replace(
    /(<div id="root">)([\s\S]*?)(<\/div>\s*<\/body>)/,
    `$1<nav aria-label="Main"><a href="${langPrefix}/categories">${t.nav.cat}</a> | <a href="${langPrefix}/countries">${t.nav.countries}</a> | <a href="${langPrefix}/new">${t.nav.new}</a> | <a href="${langPrefix}/top">${t.nav.top}</a></nav><main><h1>${h1}</h1><p>${bodyText}</p></main><footer><p>© 2026 StartVagina.nl</p></footer>$3`
  );

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Cache for 1 hour at edge, serve stale for 24h while revalidating
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(html);
}
