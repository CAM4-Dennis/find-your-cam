/**
 * Generate sitemap.xml with all routes and hreflang alternates.
 * Run: node scripts/generate-sitemap.mjs
 * Output: public/sitemap.xml
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = "https://www.startvagina.nl";
// All 6 languages indexed
const langs = ["nl", "en", "fr", "de", "es", "it"];
const prefixes = { nl: "", en: "/en", fr: "/fr", de: "/de", es: "/es", it: "/it" };

// All page slugs with their priority and changefreq
const pages = [
  // Core pages
  { slug: "", priority: "1.0", changefreq: "always" },
  { slug: "/categorieen", priority: "0.9", changefreq: "daily" },
  { slug: "/landen", priority: "0.8", changefreq: "daily" },
  { slug: "/talen", priority: "0.8", changefreq: "daily" },
  { slug: "/nieuwe-cam-girls", priority: "0.8", changefreq: "always" },
  { slug: "/populairste-cam-girls", priority: "0.8", changefreq: "always" },
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
  { slug: "/live-sex-cams-jerkmate", priority: "0.8", changefreq: "daily" },
  // { slug: "/live-sex-cams-xcams", priority: "0.7", changefreq: "daily" }, // temporarily disabled

  // Comparison landing pages
  { slug: "/chaturbate-vs-stripchat", priority: "0.7", changefreq: "monthly" },
  { slug: "/chaturbate-vs-bongacams", priority: "0.7", changefreq: "monthly" },
  { slug: "/chaturbate-vs-cam4", priority: "0.7", changefreq: "monthly" },
  { slug: "/chaturbate-vs-jerkmate", priority: "0.7", changefreq: "monthly" },
  { slug: "/stripchat-vs-bongacams", priority: "0.7", changefreq: "monthly" },
  { slug: "/stripchat-vs-cam4", priority: "0.7", changefreq: "monthly" },
  { slug: "/stripchat-vs-jerkmate", priority: "0.7", changefreq: "monthly" },
  { slug: "/cam4-vs-bongacams", priority: "0.7", changefreq: "monthly" },
  { slug: "/cam4-vs-jerkmate", priority: "0.7", changefreq: "monthly" },
  { slug: "/bongacams-vs-jerkmate", priority: "0.7", changefreq: "monthly" },

  // Category landing pages
  { slug: "/jonge-cam-girls-18-plus", priority: "0.8", changefreq: "daily" },
  { slug: "/milf-webcamsex-ervaren-vrouwen", priority: "0.8", changefreq: "daily" },
  { slug: "/mature-webcamsex-oudere-vrouwen", priority: "0.7", changefreq: "daily" },
  { slug: "/aziatische-cam-girls-live", priority: "0.8", changefreq: "daily" },
  { slug: "/latina-cam-girls-live", priority: "0.8", changefreq: "daily" },
  { slug: "/ebony-cam-girls-live", priority: "0.7", changefreq: "daily" },
  { slug: "/cam-girls-grote-borsten", priority: "0.8", changefreq: "daily" },
  { slug: "/petite-cam-girls-kleine-borsten", priority: "0.7", changefreq: "daily" },
  { slug: "/anale-cam-shows-live", priority: "0.7", changefreq: "daily" },
  { slug: "/cam-koppels-live-sex", priority: "0.8", changefreq: "daily" },
  { slug: "/squirt-cam-shows-live", priority: "0.7", changefreq: "daily" },
  { slug: "/bdsm-bondage-cam-shows", priority: "0.7", changefreq: "daily" },
  { slug: "/getatoeeerde-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/behaarde-cam-girls-natural", priority: "0.6", changefreq: "daily" },
  { slug: "/voeten-fetish-cam-shows", priority: "0.6", changefreq: "daily" },
  { slug: "/outdoor-cam-shows-buiten", priority: "0.6", changefreq: "daily" },
  { slug: "/mobiele-cam-shows-live", priority: "0.6", changefreq: "daily" },

  // Niche videos
  { slug: "/videos", priority: "0.8", changefreq: "daily" },

  // Language landing pages
  // restrictTo: only include under these lang prefixes (undefined = all)
  { slug: "/webcamsex-in-het-nederlands", priority: "0.8", changefreq: "daily", restrictTo: ["nl"] },
  { slug: "/english-webcam-sex-chat", priority: "0.7", changefreq: "daily", restrictTo: ["nl", "en"] },
  { slug: "/webcamsex-auf-deutsch", priority: "0.7", changefreq: "daily", restrictTo: ["nl"] },
  { slug: "/webcamsex-en-francais", priority: "0.7", changefreq: "daily", restrictTo: ["nl"] },
  { slug: "/webcamsex-en-espanol", priority: "0.7", changefreq: "daily", restrictTo: ["nl"] },
  { slug: "/webcamsex-in-italiano", priority: "0.7", changefreq: "daily", restrictTo: ["nl"] },
  { slug: "/webcamsex-em-portugues", priority: "0.6", changefreq: "daily" },
  { slug: "/webcamsex-na-russkom", priority: "0.6", changefreq: "daily" },
  { slug: "/japanese-webcam-sex", priority: "0.6", changefreq: "daily" },
  { slug: "/korean-webcam-sex", priority: "0.6", changefreq: "daily" },

  // Country landing pages
  { slug: "/nederlandse-cam-girls", priority: "0.8", changefreq: "daily" },
  { slug: "/belgische-cam-girls", priority: "0.7", changefreq: "daily" },
  { slug: "/duitse-cam-girls", priority: "0.7", changefreq: "daily" },
  { slug: "/colombiaanse-cam-girls", priority: "0.7", changefreq: "daily" },
  { slug: "/roemeense-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/italiaanse-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/spaanse-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/franse-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/britse-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/amerikaanse-cam-girls", priority: "0.7", changefreq: "daily" },
  { slug: "/russische-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/oekraiense-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/braziliaanse-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/japanse-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/poolse-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/mexicaanse-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/tsjechische-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/filipijnse-cam-girls", priority: "0.6", changefreq: "daily" },
  { slug: "/thaise-cam-girls", priority: "0.6", changefreq: "daily" },
];

function buildUrl(slug, langPrefix) {
  return `${BASE}${langPrefix}${slug}`;
}

function buildHreflangLinks(slug, restrictTo) {
  const activeLangs = restrictTo ? langs.filter((l) => restrictTo.includes(l)) : langs;
  return activeLangs
    .map((lang) => {
      const href = buildUrl(slug, prefixes[lang]);
      return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`;
    })
    .concat([`    <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(slug, "")}" />`])
    .join("\n");
}

function buildUrlEntry(slug, langPrefix, priority, changefreq, restrictTo) {
  const loc = buildUrl(slug, langPrefix);
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${buildHreflangLinks(slug, restrictTo)}
  </url>`;
}

// Fetch niche slugs from CAM4 API at build time
async function fetchNicheSlugs() {
  try {
    const res = await fetch("https://api.cam4.com/rest/v1.0/niches?size=50&sortStrategy=MOST_POPULAR&gender=female");
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    let allNiches = [...data.content];
    // Fetch remaining pages
    for (let page = 1; page < data.totalPages; page++) {
      const res2 = await fetch(`https://api.cam4.com/rest/v1.0/niches?size=50&sortStrategy=MOST_POPULAR&gender=female&page=${page}`);
      if (res2.ok) {
        const d2 = await res2.json();
        allNiches.push(...d2.content);
      }
    }
    return allNiches.filter(n => n.stats.postsCount > 0).map(n => n.slug);
  } catch (e) {
    console.warn(`⚠️  Could not fetch niche slugs: ${e.message}. Skipping niche pages in sitemap.`);
    return [];
  }
}

const nicheSlugs = await fetchNicheSlugs();
console.log(`📦 Fetched ${nicheSlugs.length} niche slugs from CAM4 API`);

// Add niche detail pages dynamically
for (const slug of nicheSlugs) {
  pages.push({ slug: `/videos/${slug}`, priority: "0.6", changefreq: "daily" });
}

// Generate all URL entries (only indexable languages: NL + EN)
// FR/DE/ES/IT pages are noindexed in the app, so exclude them from sitemap
const sitemapLangs = ["nl", "en"];
const entries = [];
for (const page of pages) {
  for (const lang of sitemapLangs) {
    // Skip if this page is restricted to specific lang prefixes
    if (page.restrictTo && !page.restrictTo.includes(lang)) continue;
    entries.push(buildUrlEntry(page.slug, prefixes[lang], page.priority, page.changefreq, page.restrictTo));
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
