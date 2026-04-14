/**
 * Pre-render script for StartVagina SEO
 *
 * After `vite build`, this script:
 * 1. Serves dist/ on a local HTTP server
 * 2. Uses Playwright (headless Chromium) to visit every route
 * 3. Captures the fully-rendered HTML (including react-helmet <head> tags)
 * 4. Writes each page as dist/<route>/index.html
 *
 * This ensures Google receives real HTML with correct meta tags,
 * canonical URLs, structured data, and page content.
 */

import { chromium } from "playwright";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// ---------- All routes to pre-render ----------

const basePages = [
  "/",
  "/categories",
  "/countries",
  "/languages",
  "/new",
  "/top",
  "/blog",
];

const keywordPages = [
  "/webcamsex",
  "/gratis-webcam-sex",
  "/sexchat",
  "/cam-girls",
  "/live-sex-cams",
];

const platformPages = [
  "/live-sex-cams-cam4",
  "/live-sex-cams-chaturbate",
  "/live-sex-cams-bongacams",
  "/live-sex-cams-stripchat",
  "/live-sex-cams-xcams",
];

const categoryPages = [
  "/webcamsex-teen-18-plus",
  "/webcamsex-milf",
  "/webcamsex-mature",
  "/webcamsex-asian",
  "/webcamsex-latina",
  "/webcamsex-ebony",
  "/webcamsex-grote-borsten",
  "/webcamsex-kleine-borsten",
  "/webcamsex-anal",
  "/webcamsex-koppels",
  "/webcamsex-squirt",
  "/webcamsex-bdsm",
  "/webcamsex-tattoo",
  "/webcamsex-hairy",
  "/webcamsex-voeten",
  "/webcamsex-outdoor",
  "/webcamsex-mobiel",
];

const languagePages = [
  "/webcamsex-in-het-nederlands",
  "/english-webcam-sex-chat",
  "/webcamsex-auf-deutsch",
  "/webcamsex-en-francais",
  "/webcamsex-en-espanol",
  "/webcamsex-in-italiano",
  "/webcamsex-em-portugues",
  "/webcamsex-na-russkom",
  "/japanese-webcam-sex",
  "/korean-webcam-sex",
];

const countryPages = [
  "/webcamsex-nederland",
  "/webcamsex-belgie",
  "/webcamsex-duitsland",
  "/webcamsex-colombia",
  "/webcamsex-roemenie",
  "/webcamsex-italie",
  "/webcamsex-spanje",
  "/webcamsex-frankrijk",
  "/webcamsex-verenigd-koninkrijk",
  "/webcamsex-verenigde-staten",
  "/webcamsex-rusland",
  "/webcamsex-oekraine",
  "/webcamsex-brazilie",
  "/webcamsex-japan",
  "/webcamsex-polen",
  "/webcamsex-mexico",
  "/webcamsex-tsjechie",
  "/webcamsex-filipijnen",
  "/webcamsex-thailand",
];

const langPrefixes = ["", "/en", "/fr", "/de", "/es", "/it"];

// Build full route list
const allRoutes = [];
const dutchOnlyPages = [...basePages, ...keywordPages, ...platformPages, ...categoryPages, ...languagePages, ...countryPages];

for (const prefix of langPrefixes) {
  for (const page of dutchOnlyPages) {
    const route = page === "/" ? (prefix || "/") : `${prefix}${page}`;
    allRoutes.push(route);
  }
}

// Deduplicate
const routes = [...new Set(allRoutes)];

// ---------- Simple static file server ----------

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, req.url === "/" ? "index.html" : req.url);

      // If no extension, serve index.html (SPA fallback)
      if (!extname(filePath)) {
        filePath = join(DIST, "index.html");
      }

      if (!existsSync(filePath)) {
        filePath = join(DIST, "index.html");
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end("Not Found");
      }
    });

    server.listen(PORT, () => {
      console.log(`  Static server running on ${BASE_URL}`);
      resolve(server);
    });
  });
}

// ---------- Pre-render logic ----------

async function prerender() {
  console.log(`\n🔍 Pre-rendering ${routes.length} routes for SEO...\n`);

  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: "nl-NL",
    extraHTTPHeaders: { "Accept-Language": "nl-NL,nl;q=0.9" },
  });

  let success = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const page = await context.newPage();
      const url = `${BASE_URL}${route}`;

      // Navigate and wait for the app to render
      await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });

      // Wait a bit extra for react-helmet to update <head>
      await page.waitForTimeout(1000);

      // Wait for the title to be set (not the default fallback)
      try {
        await page.waitForFunction(
          () => document.title && document.title !== "StartVagina",
          { timeout: 5000 }
        );
      } catch {
        // Some pages might keep the default title, that's OK
      }

      // Get the full rendered HTML
      const html = await page.content();

      // Determine output path
      let outPath;
      if (route === "/") {
        outPath = join(DIST, "index.html");
      } else {
        const dir = join(DIST, route.slice(1)); // remove leading /
        mkdirSync(dir, { recursive: true });
        outPath = join(dir, "index.html");
      }

      writeFileSync(outPath, html, "utf-8");
      success++;

      // Log progress every 10 pages
      if ((success + failed) % 10 === 0 || success + failed === routes.length) {
        console.log(`  Progress: ${success + failed}/${routes.length} (${success} OK, ${failed} failed)`);
      }

      await page.close();
    } catch (err) {
      failed++;
      console.error(`  ❌ Failed: ${route} — ${err.message}`);
    }
  }

  await browser.close();
  server.close();

  console.log(`\n✅ Pre-rendering complete: ${success} pages rendered, ${failed} failed`);
  console.log(`📁 Output: ${DIST}\n`);
}

prerender().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
