import type { CamModel } from "@/types/cam";
import type { CamFilters } from "@/types/filters";

const genderMap: Record<string, string[]> = {
  Vrouw: ["female", "f"],
  Man: ["male", "m"],
  Koppel: ["couple", "c"],
  Shemale: ["trans", "shemale", "t"],
};

const ageRanges: Record<string, [number, number]> = {
  "18-19": [18, 19],
  "20-30": [20, 30],
  "31-40": [31, 40],
  "40+": [40, 999],
};

// Map filter tag names to possible variations across platforms
const tagAliases: Record<string, string[]> = {
  "asian": ["asian", "asiatic"],
  "bdsm": ["bdsm", "bondage", "domination", "fetish"],
  "big boobs": ["big boobs", "big tits", "bigboobs", "bigtits", "big-boobs", "busty", "huge boobs"],
  "ebony": ["ebony", "black"],
  "hairy": ["hairy", "hairy pussy", "hairypussy"],
  "latina": ["latina", "latino", "latin"],
  "mature": ["mature", "granny", "older"],
  "milf": ["milf"],
  "small tits": ["small tits", "smalltits", "small-tits", "petite", "tiny tits"],
  "tattoo": ["tattoo", "tattoos", "tattooed", "inked"],
  "teen": ["teen", "18", "young", "18+", "teenager"],
  "anal": ["anal", "ass", "anal play"],
  "squirt": ["squirt", "squirting"],
  "feet": ["feet", "foot", "foot fetish", "footjob"],
};

/** Map display language names to possible API values */
const languageAliases: Record<string, string[]> = {
  "Nederlands": ["dutch", "nl", "nederlands", "nederlandstalig"],
  "English": ["english", "en", "eng"],
  "Deutsch": ["german", "de", "deutsch"],
  "Français": ["french", "fr", "français", "francais"],
  "Español": ["spanish", "es", "español", "espanol"],
  "Italiano": ["italian", "it", "italiano"],
  "Português": ["portuguese", "pt", "português", "portugues"],
  "Русский": ["russian", "ru", "русский"],
  "日本語": ["japanese", "ja", "jp", "日本語"],
  "한국어": ["korean", "ko", "kr", "한국어"],
};

function modelMatchesLanguage(modelLanguages: string[], filterLang: string): boolean {
  const aliases = languageAliases[filterLang] || [filterLang.toLowerCase()];
  return modelLanguages.some((ml) => {
    const lower = ml.toLowerCase();
    return aliases.some((alias) => lower.includes(alias) || alias.includes(lower));
  });
}

function modelMatchesTag(modelTags: string[], filterTag: string): boolean {
  const normalizedFilter = filterTag.toLowerCase();
  const aliases = tagAliases[normalizedFilter] || [normalizedFilter];
  
  return modelTags.some((mt) => {
    const lower = mt.toLowerCase();
    return aliases.some((alias) => lower.includes(alias) || alias.includes(lower));
  });
}

export function applyFilters(models: CamModel[], filters: CamFilters): CamModel[] {
  return models.filter((m) => {
    // Gender filter
    if (filters.gender.length > 0) {
      const allowed = filters.gender.flatMap((g) => genderMap[g] || [g.toLowerCase()]);
      if (!allowed.includes(m.gender.toLowerCase())) return false;
    }

    // Platform filter
    if (filters.platforms.length > 0) {
      if (!filters.platforms.includes(m.platform)) return false;
    }

    // HD filter
    if (filters.hd === true && !m.isHD) return false;

    // Age range (skip models with age 0 = unknown)
    if (filters.ageRange && ageRanges[filters.ageRange]) {
      const [min, max] = ageRanges[filters.ageRange];
      if (m.age === 0) return true; // include models with unknown age
      if (m.age < min || m.age > max) return false;
    }

    // Tags / category filter with fuzzy matching
    if (filters.tags.length > 0) {
      const modelTags = m.tags || [];
      const hasMatch = filters.tags.some((t) => modelMatchesTag(modelTags, t));
      if (!hasMatch) return false;
    }

    // Language filter
    if (filters.languages && filters.languages.length > 0) {
      const modelLangs = m.languages || [];
      if (modelLangs.length === 0) return false;
      const hasLangMatch = filters.languages.some((l) => modelMatchesLanguage(modelLangs, l));
      if (!hasLangMatch) return false;
    }

    return true;
  });
}
