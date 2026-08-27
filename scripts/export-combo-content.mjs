/**
 * Export combo page content from TypeScript data files to JSON cache.
 * This runs BEFORE prerender.mjs / prerender-content.mjs so they can
 * read the content without needing tsx at runtime.
 *
 * Exports:
 *   - Gender × Category (4 genders × 30 categories × NL/EN)
 *   - Platform × Category (8 platforms × 30 categories × NL/EN)
 *   - Language-speaking pages (all entries × NL/EN)
 */

import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectDir = join(__dirname, "..");
const outPath = join(__dirname, ".combo-content-cache.json");

function loadTsData(expr) {
  const script = `
    const path = require("path");
    const Module = require("module");
    const origResolve = Module._resolveFilename;
    Module._resolveFilename = function(request, parent, ...rest) {
      if (request.startsWith("@/")) {
        request = path.resolve("${projectDir.replace(/\\/g, "\\\\")}/src", request.slice(2));
      }
      return origResolve.call(this, request, parent, ...rest);
    };
    ${expr}
  `;
  try {
    const result = execSync(`npx tsx -e '${script.replace(/'/g, "'\\''")}'`, {
      cwd: projectDir,
      encoding: "utf-8",
      timeout: 60000,
      maxBuffer: 50 * 1024 * 1024,
    });
    return JSON.parse(result.trim());
  } catch (e) {
    console.error("Failed to load TS data:", e.message);
    return null;
  }
}

console.log("\n📦 Exporting combo page content...");

// ── Gender × Category ────────────────────────────────────────────────────────
console.log("  → Gender × Category...");
const genderCategoryData = loadTsData(`
  const { getGenderCategoryContent, genderConfigs, GENDER_CATEGORY_SHORT_SLUGS } = require("./src/data/genderCategoryData");
  const result = {};
  for (const g of genderConfigs) {
    for (const cat of GENDER_CATEGORY_SHORT_SLUGS) {
      for (const lang of ["nl", "en"]) {
        const content = getGenderCategoryContent(g.slug, cat, lang);
        if (content) {
          const key = g.slug + "/" + cat;
          if (!result[key]) result[key] = {};
          result[key][lang] = content;
        }
      }
    }
  }
  console.log(JSON.stringify(result));
`);

// ── Platform × Category ─────────────────────────────────────────────────────
console.log("  → Platform × Category...");
const platformCategoryData = loadTsData(`
  const { getPlatformCategoryContent, PLATFORM_SLUGS, CATEGORY_SHORT_SLUGS } = require("./src/data/platformCategoryData");
  const result = {};
  for (const p of PLATFORM_SLUGS) {
    for (const cat of CATEGORY_SHORT_SLUGS) {
      for (const lang of ["nl", "en"]) {
        const content = getPlatformCategoryContent(p, cat, lang);
        if (content) {
          const key = p + "/" + cat;
          if (!result[key]) result[key] = {};
          result[key][lang] = content;
        }
      }
    }
  }
  console.log(JSON.stringify(result));
`);

// ── Language-speaking pages ──────────────────────────────────────────────────
console.log("  → Language-speaking pages...");
const languageSpeakingData = loadTsData(`
  const { getLanguageSpeakingContent, languageSpeakingPages } = require("./src/data/languageSpeakingData");
  const result = {};
  for (const p of languageSpeakingPages) {
    for (const lang of ["nl", "en"]) {
      const content = getLanguageSpeakingContent(p.slug, lang);
      if (content) {
        if (!result[p.slug]) result[p.slug] = {};
        result[p.slug][lang] = content;
      }
    }
  }
  console.log(JSON.stringify(result));
`);

// ── Write cache ──────────────────────────────────────────────────────────────
const cache = {
  genderCategory: genderCategoryData || {},
  platformCategory: platformCategoryData || {},
  languageSpeaking: languageSpeakingData || {},
};

const gcCount = Object.keys(cache.genderCategory).length;
const pcCount = Object.keys(cache.platformCategory).length;
const lsCount = Object.keys(cache.languageSpeaking).length;

writeFileSync(outPath, JSON.stringify(cache), "utf-8");
console.log(`✅ Exported combo content: ${gcCount} gender×cat, ${pcCount} platform×cat, ${lsCount} language-speaking`);
console.log(`📁 Cache: ${outPath}\n`);
