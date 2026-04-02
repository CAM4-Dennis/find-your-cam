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

    // Age range
    if (filters.ageRange && ageRanges[filters.ageRange]) {
      const [min, max] = ageRanges[filters.ageRange];
      if (m.age < min || m.age > max) return false;
    }

    // Tags / category filter
    if (filters.tags.length > 0) {
      const modelTags = m.tags.map((t) => t.toLowerCase());
      const hasMatch = filters.tags.some((t) => modelTags.includes(t.toLowerCase()));
      if (!hasMatch) return false;
    }

    return true;
  });
}
