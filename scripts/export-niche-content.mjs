/**
 * Extract niche content data from the TypeScript source and write it as JSON
 * so the prerender script can use it without needing a TS compiler at build time.
 *
 * Runs: node scripts/export-niche-content.mjs
 * Output: scripts/.niche-content-cache.json
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcFile = join(__dirname, "..", "src", "data", "nicheContentData.ts");
const outFile = join(__dirname, ".niche-content-cache.json");

const source = readFileSync(srcFile, "utf-8");

// Extract the nicheContentOverrides object using a simple parser
// We find the block between "const nicheContentOverrides..." and the closing "};"
const overridesStart = source.indexOf("const nicheContentOverrides");
if (overridesStart === -1) {
  console.error("Could not find nicheContentOverrides in source");
  process.exit(1);
}

// Find the opening { of the Record
const firstBrace = source.indexOf("{", overridesStart);

// Track braces to find the matching close
let depth = 0;
let endIdx = -1;
for (let i = firstBrace; i < source.length; i++) {
  if (source[i] === "{") depth++;
  else if (source[i] === "}") {
    depth--;
    if (depth === 0) {
      endIdx = i;
      break;
    }
  }
}

if (endIdx === -1) {
  console.error("Could not find closing brace for nicheContentOverrides");
  process.exit(1);
}

const objectStr = source.slice(firstBrace, endIdx + 1);

// Convert to valid JSON-like structure by evaluating as JS
// The TS object literal is valid JS after removing type annotations
// We use Function constructor to safely evaluate the object
const evalCode = `return (${objectStr})`;
let data;
try {
  data = new Function(evalCode)();
} catch (e) {
  console.error("Failed to parse nicheContentOverrides:", e.message);
  process.exit(1);
}

writeFileSync(outFile, JSON.stringify(data, null, 2), "utf-8");
console.log(`✅ Exported niche content data to ${outFile} (${Object.keys(data).length} niches)`);
