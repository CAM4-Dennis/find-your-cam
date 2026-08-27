/**
 * Maps short English category slugs (used in platform-combo URLs like /chaturbate-cams/milf)
 * to the full Dutch category slugs used in categoryPages.ts
 */

import type { Language } from "@/i18n/translations";

export interface CategorySlugEntry {
  /** Short English slug for URL combos (e.g. "milf") */
  short: string;
  /** Full category slug in categoryPages.ts (e.g. "milf-webcamsex-ervaren-vrouwen") */
  full: string;
  /** Display label per language */
  label: Record<Language, string>;
  /** Tags to match cam models */
  matchTags: string[];
  /** Optional gender filter */
  matchGender?: string[];
  /** Optional HD flag match */
  matchHD?: boolean;
  /** Optional mobile flag match */
  matchMobile?: boolean;
}

export const categorySlugMap: CategorySlugEntry[] = [
  // Existing categories
  { short: "teen", full: "jonge-cam-girls-18-plus", label: { nl: "Teen 18+", en: "Teen 18+", fr: "Teen 18+", de: "Teen 18+", es: "Teen 18+", it: "Teen 18+" }, matchTags: ["teen", "18", "young", "18+", "teenager"] },
  { short: "milf", full: "milf-webcamsex-ervaren-vrouwen", label: { nl: "MILF", en: "MILF", fr: "MILF", de: "MILF", es: "MILF", it: "MILF" }, matchTags: ["milf"] },
  { short: "mature", full: "mature-webcamsex-oudere-vrouwen", label: { nl: "Mature", en: "Mature", fr: "Mature", de: "Mature", es: "Mature", it: "Mature" }, matchTags: ["mature", "granny", "old", "oma", "grandma"] },
  { short: "asian", full: "aziatische-cam-girls-live", label: { nl: "Aziatisch", en: "Asian", fr: "Asiatique", de: "Asiatisch", es: "Asiática", it: "Asiatica" }, matchTags: ["asian", "japanese", "chinese", "korean", "thai", "filipina"] },
  { short: "latina", full: "latina-cam-girls-live", label: { nl: "Latina", en: "Latina", fr: "Latina", de: "Latina", es: "Latina", it: "Latina" }, matchTags: ["latina", "latino", "colombian", "brazilian", "mexican"] },
  { short: "ebony", full: "ebony-cam-girls-live", label: { nl: "Ebony", en: "Ebony", fr: "Ébène", de: "Ebony", es: "Ébano", it: "Ebony" }, matchTags: ["ebony", "black", "african", "dark"] },
  { short: "bigtits", full: "cam-girls-grote-borsten", label: { nl: "Grote Borsten", en: "Big Tits", fr: "Gros Seins", de: "Große Brüste", es: "Tetas Grandes", it: "Tette Grandi" }, matchTags: ["bigtits", "bigboobs", "busty", "huge tits", "big tits", "big boobs"] },
  { short: "petite", full: "petite-cam-girls-kleine-borsten", label: { nl: "Petite", en: "Petite", fr: "Petite", de: "Petite", es: "Petite", it: "Petite" }, matchTags: ["petite", "small", "tiny", "skinny"] },
  { short: "anal", full: "anale-cam-shows-live", label: { nl: "Anaal", en: "Anal", fr: "Anal", de: "Anal", es: "Anal", it: "Anale" }, matchTags: ["anal", "ass", "butt plug", "anal play"] },
  { short: "couple", full: "cam-koppels-live-sex", label: { nl: "Koppels", en: "Couples", fr: "Couples", de: "Paare", es: "Parejas", it: "Coppie" }, matchTags: ["couple"], matchGender: ["couple"] },
  { short: "squirt", full: "squirt-cam-shows-live", label: { nl: "Squirt", en: "Squirt", fr: "Squirt", de: "Squirt", es: "Squirt", it: "Squirt" }, matchTags: ["squirt", "squirting"] },
  { short: "bdsm", full: "bdsm-bondage-cam-shows", label: { nl: "BDSM", en: "BDSM", fr: "BDSM", de: "BDSM", es: "BDSM", it: "BDSM" }, matchTags: ["bdsm", "bondage", "domination", "submission", "fetish", "mistress", "slave", "dom", "sub"] },
  { short: "tattoo", full: "getatoeeerde-cam-girls", label: { nl: "Tattoo", en: "Tattoo", fr: "Tatouage", de: "Tattoo", es: "Tatuaje", it: "Tatuaggio" }, matchTags: ["tattoo", "tattooed", "inked"] },
  { short: "hairy", full: "behaarde-cam-girls-natural", label: { nl: "Behaard", en: "Hairy", fr: "Poilue", de: "Behaart", es: "Peluda", it: "Pelosa" }, matchTags: ["hairy", "bush", "unshaved", "natural", "hairy pussy"] },
  { short: "feet", full: "voeten-fetish-cam-shows", label: { nl: "Voeten", en: "Feet", fr: "Pieds", de: "Füße", es: "Pies", it: "Piedi" }, matchTags: ["feet", "foot", "toes", "soles", "foot fetish"] },
  { short: "outdoor", full: "outdoor-cam-shows-buiten", label: { nl: "Outdoor", en: "Outdoor", fr: "Extérieur", de: "Outdoor", es: "Exterior", it: "Outdoor" }, matchTags: ["outdoor", "outside", "public", "exhib", "voyeur"] },
  { short: "mobile", full: "mobiele-cam-shows-live", label: { nl: "Mobiel", en: "Mobile", fr: "Mobile", de: "Mobil", es: "Móvil", it: "Mobile" }, matchTags: ["mobile"], matchMobile: true },

  // NEW categories
  { short: "blonde", full: "blonde-cam-girls", label: { nl: "Blond", en: "Blonde", fr: "Blonde", de: "Blond", es: "Rubia", it: "Bionda" }, matchTags: ["blonde", "blond"] },
  { short: "brunette", full: "brunette-cam-girls", label: { nl: "Brunette", en: "Brunette", fr: "Brune", de: "Brünett", es: "Morena", it: "Bruna" }, matchTags: ["brunette", "brown hair", "dark hair"] },
  { short: "redhead", full: "roodharige-cam-girls", label: { nl: "Roodharig", en: "Redhead", fr: "Rousse", de: "Rothaarig", es: "Pelirroja", it: "Rossa" }, matchTags: ["redhead", "ginger", "red hair"] },
  { short: "curvy", full: "curvy-cam-girls-bbw", label: { nl: "Curvy / BBW", en: "Curvy / BBW", fr: "Ronde / BBW", de: "Kurvig / BBW", es: "Curvy / BBW", it: "Formosa / BBW" }, matchTags: ["curvy", "bbw", "chubby", "thick", "voluptuous", "plump"] },
  { short: "slim", full: "slanke-cam-girls", label: { nl: "Slank", en: "Slim", fr: "Mince", de: "Schlank", es: "Delgada", it: "Snella" }, matchTags: ["slim", "skinny", "thin", "slender", "fit"] },
  { short: "lovense", full: "lovense-cam-shows", label: { nl: "Lovense / Interactief", en: "Lovense / Interactive", fr: "Lovense / Interactif", de: "Lovense / Interaktiv", es: "Lovense / Interactivo", it: "Lovense / Interattivo" }, matchTags: ["lovense", "lush", "domi", "ohmibod", "interactive", "toy", "vibrate"] },
  { short: "bigass", full: "cam-girls-grote-kont", label: { nl: "Grote Kont", en: "Big Ass", fr: "Gros Cul", de: "Großer Hintern", es: "Culo Grande", it: "Culo Grande" }, matchTags: ["bigass", "big ass", "big butt", "booty", "phat ass", "twerk"] },
  { short: "striptease", full: "striptease-cam-shows", label: { nl: "Striptease", en: "Striptease", fr: "Striptease", de: "Striptease", es: "Striptease", it: "Striptease" }, matchTags: ["striptease", "strip", "dance", "tease", "stripping"] },
  { short: "dildo", full: "dildo-cam-shows", label: { nl: "Dildo", en: "Dildo", fr: "Gode", de: "Dildo", es: "Consolador", it: "Dildo" }, matchTags: ["dildo", "toy", "toys", "vibrator", "fuck machine"] },
  { short: "cosplay", full: "cosplay-cam-shows", label: { nl: "Cosplay", en: "Cosplay", fr: "Cosplay", de: "Cosplay", es: "Cosplay", it: "Cosplay" }, matchTags: ["cosplay", "costume", "anime", "roleplay", "role play", "schoolgirl", "nurse"] },
  { short: "smoking", full: "rokende-cam-girls", label: { nl: "Roken", en: "Smoking", fr: "Fumeuse", de: "Rauchen", es: "Fumando", it: "Fumatrice" }, matchTags: ["smoking", "smoke", "cigarette", "420", "weed"] },
  { short: "pregnant", full: "zwangere-cam-girls", label: { nl: "Zwanger", en: "Pregnant", fr: "Enceinte", de: "Schwanger", es: "Embarazada", it: "Incinta" }, matchTags: ["pregnant", "preggo", "belly"] },
  { short: "muscle", full: "gespierde-cam-modellen", label: { nl: "Gespierd", en: "Muscle", fr: "Musclé", de: "Muskulös", es: "Musculoso", it: "Muscoloso" }, matchTags: ["muscle", "muscular", "athletic", "fit", "bodybuilder", "abs"] },
];

/** Platform slugs for combo URLs */
export const platformSlugMap: Record<string, { name: string; platformId: string }> = {
  "chaturbate": { name: "Chaturbate", platformId: "Chaturbate" },
  "stripchat": { name: "Stripchat", platformId: "Stripchat" },
  "bongacams": { name: "BongaCams", platformId: "BongaCams" },
  "cam4": { name: "CAM4", platformId: "Cam4" },
  "jerkmate": { name: "Jerkmate", platformId: "Jerkmate" },
  "xcams": { name: "XCams", platformId: "XCams" },
  "flirt4free": { name: "Flirt4Free", platformId: "Flirt4Free" },
  "islive": { name: "Islive", platformId: "Islive" },
};

/** Get a category entry by short slug */
export function getCategoryByShort(shortSlug: string): CategorySlugEntry | undefined {
  return categorySlugMap.find((c) => c.short === shortSlug);
}

/** Get a category entry by full slug */
export function getCategoryByFull(fullSlug: string): CategorySlugEntry | undefined {
  return categorySlugMap.find((c) => c.full === fullSlug);
}

/** All short category slugs (for sitemap/route generation) */
export function allCategorySlugs(): string[] {
  return categorySlugMap.map((c) => c.short);
}

/** All platform slugs (for sitemap/route generation) */
export function allPlatformSlugs(): string[] {
  return Object.keys(platformSlugMap);
}
