import type { Language } from "@/i18n/translations";

const BASE = "https://www.startvagina.nl";

/** Language prefix map */
const LANG_PREFIXES: Record<Language, string> = {
  nl: "",
  en: "/en",
  fr: "/fr",
  de: "/de",
  es: "/es",
  it: "/it",
};

/** All languages that should appear in hreflang (indexed ones only) */
const HREFLANG_LANGS: Language[] = ["nl", "en"];

/** Build the canonical URL for a page slug + current language */
export function canonicalUrl(slug: string, lang: Language): string {
  const prefix = LANG_PREFIXES[lang] || "";
  const path = slug ? `/${slug}` : "";
  return `${BASE}${prefix}${path}`;
}

/** Build hreflang link entries for a given slug */
export function hreflangEntries(slug: string): Array<{ lang: string; href: string }> {
  const path = slug ? `/${slug}` : "";
  const entries = HREFLANG_LANGS.map((l) => ({
    lang: l,
    href: `${BASE}${LANG_PREFIXES[l]}${path}`,
  }));
  // x-default points to NL (no prefix)
  entries.push({ lang: "x-default", href: `${BASE}${path}` });
  return entries;
}

/** Generate BreadcrumbList JSON-LD schema */
export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Generate FAQPage JSON-LD schema */
export function faqSchema(faq: Array<{ q: string; a: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
