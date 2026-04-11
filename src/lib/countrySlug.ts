/** Generate a URL-safe slug from a country name */
export function countryToSlug(country: string): string {
  return country
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Known country slug overrides (for SEO-friendly Dutch names) */
const knownSlugs: Record<string, string> = {
  Nederland: "nederland",
  België: "belgie",
  Duitsland: "duitsland",
  Colombia: "colombia",
  Roemenië: "roemenie",
  Italië: "italie",
  Spanje: "spanje",
  Frankrijk: "frankrijk",
  "Verenigd Koninkrijk": "verenigd-koninkrijk",
  "Verenigde Staten": "verenigde-staten",
  Rusland: "rusland",
  Oekraïne: "oekraine",
  Brazilië: "brazilie",
  Japan: "japan",
  Polen: "polen",
  Mexico: "mexico",
  Tsjechië: "tsjechie",
  Filipijnen: "filipijnen",
  Thailand: "thailand",
};

/** Get the full route slug for a country (webcamsex-{slug}) */
export function countryToFullSlug(country: string): string {
  const slug = knownSlugs[country] || countryToSlug(country);
  return `webcamsex-${slug}`;
}

/** Build a reverse map from slug → country name (populated at runtime) */
const reverseKnown: Record<string, string> = {};
for (const [country, slug] of Object.entries(knownSlugs)) {
  reverseKnown[`webcamsex-${slug}`] = country;
}

export function fullSlugToCountry(slug: string): string | null {
  return reverseKnown[slug] || null;
}
