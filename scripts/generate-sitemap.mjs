/**
 * Generate sitemap.xml with all routes and hreflang alternates.
 * Run: node scripts/generate-sitemap.mjs
 * Output: public/sitemap.xml
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = "https://startvagina.nl";
const langs = ["nl", "en", "fr", "it", "de", "es"];
const prefixes = { nl: "", en: "/en", fr: "/fr", it: "/it", de: "/de", es: "/es" };

// All page slugs with their priority and changefreq
const pages = [
  // Core pages
  { slug: "", priority: "1.0", changefreq: "always" },
  { slug: "/categories", priority: "0.9", changefreq: "daily" },
  { slug: "/countries", priority: "0.8", changefreq: "daily" },
  { slug: "/languages", priority: "0.8", changefreq: "daily" },
  { slug: "/new", priority: "0.8", changefreq: "always" },
  { slug: "/top", priority: "0.8", changefreq: "always" },
  { slug: "/blog", priority: "0.7", changefreq: "weekly" },

  // Keyword landing pages
  { slug: "/webcamsex", priority: "0.9", changefreq: "daily" },
  { slug: "/gratis-webcam-sex", priority: "0.9", changefreq: "daily" },
  { slug: "/sexchat", priority: "0.8", changefreq: "daily" },
  { slug: "/cam-girls", priority: "0.8", changefreq: "daily" },
  { slug: "/live-sex-cams", priority: "0.8", changefreq: "daily" },

  // Platform landing pages
  { slug: "/live-sex-cams-cam4", priority: "0.8", changefreq: "daily" },
  { slug: "/live-sex-cams-chaturbate", priority: "0.8", changefreq: "daily" },
  { slug: "/live-sex-cams-bongacams", priority: "0.8", changefreq: "daily" },
  { slug: "/live-sex-cams-stripchat", priority: "0.8", changefreq: "daily" },
  { slug: "/live-sex-cams-xcams", priority: "0.7", changefreq: "daily" },

  // Category landing pages
  { slug: "/webcamsex-teen-18-plus", priority: "0.8", changefreq: "daily" },
  { slug: "/webcamsex-milf", priority: "0.8", changefreq: "daily" },
  { slug: "/webcamsex-mature", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-asian", priority: "0.8", changefreq: "daily" },
  { slug: "/webcamsex-latina", priority: "0.8", changefreq: "daily" },
  { slug: "/webcamsex-ebony", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-grote-borsten", priority: "0.8", changefreq: "daily" },
  { slug: "/webcamsex-kleine-borsten", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-anal", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-koppels", priority: "0.8", changefreq: "daily" },
  { slug: "/webcamsex-squirt", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-bdsm", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-tattoo", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-hairy", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-voeten", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-outdoor", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-mobiel", priority: "0.6", changefreq: "daily" },

  // Language landing pages
  { slug: "/webcamsex-in-het-nederlands", priority: "0.8", changefreq: "daily" },
  { slug: "/english-webcam-sex-chat", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-auf-deutsch", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-en-francais", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-en-espanol", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-in-italiano", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-em-portugues", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-na-russkom", priority: "0.6", changefreq: "daily" },
  { slug: "/japanese-webcam-sex", priority: "0.6", changefreq: "daily" },
  { slug: "/korean-webcam-sex", priority: "0.6", changefreq: "daily" },

  // Country landing pages
  { slug: "/webcamsex-nederland", priority: "0.8", changefreq: "daily" },
  { slug: "/webcamsex-belgie", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-duitsland", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-colombia", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-roemenie", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-italie", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-spanje", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-frankrijk", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-verenigd-koninkrijk", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-verenigde-staten", priority: "0.7", changefreq: "daily" },
  { slug: "/webcamsex-rusland", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-oekraine", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-brazilie", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-japan", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-polen", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-mexico", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-tsjechie", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-filipijnen", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-thailand", priority: "0.6", changefreq: "daily" },
];

function buildUrl(slug, langPrefix) {
  return `${BASE}${langPrefix}${slug}`;
}

function buildHreflangLinks(slug) {
  return langs
    .map((lang) => {
      const href = buildUrl(slug, prefixes[lang]);
      return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`;
    })
    .concat([`    <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(slug, "")}" />`])
    .join("\n");
}

function buildUrlEntry(slug, langPrefix, priority, changefreq) {
  const loc = buildUrl(slug, langPrefix);
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${buildHreflangLinks(slug)}
  </url>`;
}

// Generate all URL entries
const entries = [];
for (const page of pages) {
  for (const lang of langs) {
    entries.push(buildUrlEntry(page.slug, prefixes[lang], page.priority, page.changefreq));
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

const outPath = join(__dirname, "..", "public", "sitemap.xml");
writeFileSync(outPath, sitemap, "utf-8");

const totalUrls = entries.length;
const totalPages = pages.length;
console.log(`✅ Sitemap generated: ${totalUrls} URLs (${totalPages} pages × ${langs.length} languages)`);
console.log(`📁 Output: ${outPath}`);
