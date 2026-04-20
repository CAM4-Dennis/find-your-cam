import type { Language } from "@/i18n/translations";

/** Languages whose prefixed pages should not be indexed */
const NOINDEX_LANGS: Language[] = ["fr", "it", "de", "es"];

/** Returns the appropriate robots meta content based on the current site language */
export function getRobotsContent(lang: Language): string {
  return NOINDEX_LANGS.includes(lang) ? "noindex, nofollow" : "index, follow";
}
