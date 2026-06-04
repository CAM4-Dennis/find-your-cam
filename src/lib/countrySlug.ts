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
  Nederland: "nederlandse-cam-girls",
  "België": "belgische-cam-girls",
  Duitsland: "duitse-cam-girls",
  Colombia: "colombiaanse-cam-girls",
  "Roemenië": "roemeense-cam-girls",
  "Italië": "italiaanse-cam-girls",
  Spanje: "spaanse-cam-girls",
  Frankrijk: "franse-cam-girls",
  "Verenigd Koninkrijk": "britse-cam-girls",
  "Verenigde Staten": "amerikaanse-cam-girls",
  Rusland: "russische-cam-girls",
  "Oekraïne": "oekraiense-cam-girls",
  "Brazilië": "braziliaanse-cam-girls",
  Japan: "japanse-cam-girls",
  Polen: "poolse-cam-girls",
  Mexico: "mexicaanse-cam-girls",
  "Tsjechië": "tsjechische-cam-girls",
  Filipijnen: "filipijnse-cam-girls",
  Thailand: "thaise-cam-girls",
};

/** Old slug to new slug redirect map */
const oldToNewSlug: Record<string, string> = {
  "webcamsex-nederland": "nederlandse-cam-girls",
  "webcamsex-belgie": "belgische-cam-girls",
  "webcamsex-duitsland": "duitse-cam-girls",
  "webcamsex-colombia": "colombiaanse-cam-girls",
  "webcamsex-roemenie": "roemeense-cam-girls",
  "webcamsex-italie": "italiaanse-cam-girls",
  "webcamsex-spanje": "spaanse-cam-girls",
  "webcamsex-frankrijk": "franse-cam-girls",
  "webcamsex-verenigd-koninkrijk": "britse-cam-girls",
  "webcamsex-verenigde-staten": "amerikaanse-cam-girls",
  "webcamsex-rusland": "russische-cam-girls",
  "webcamsex-oekraine": "oekraiense-cam-girls",
  "webcamsex-brazilie": "braziliaanse-cam-girls",
  "webcamsex-japan": "japanse-cam-girls",
  "webcamsex-polen": "poolse-cam-girls",
  "webcamsex-mexico": "mexicaanse-cam-girls",
  "webcamsex-tsjechie": "tsjechische-cam-girls",
  "webcamsex-filipijnen": "filipijnse-cam-girls",
  "webcamsex-thailand": "thaise-cam-girls",
};

/** Get the full route slug for a country */
export function countryToFullSlug(country: string): string {
  return knownSlugs[country] || countryToSlug(country);
}

/** Build a reverse map from new slug → country name */
const reverseKnown: Record<string, string> = {};
for (const [country, slug] of Object.entries(knownSlugs)) {
  reverseKnown[slug] = country;
}

export function fullSlugToCountry(slug: string): string | null {
  return reverseKnown[slug] || null;
}

/** Get new slug from old slug (for redirects) */
export function getNewCountrySlug(oldSlug: string): string | null {
  return oldToNewSlug[oldSlug] || null;
}
