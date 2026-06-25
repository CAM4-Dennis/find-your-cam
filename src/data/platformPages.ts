import type { Language } from "@/i18n/translations";
import { cam4Data } from "./platforms/cam4";
import { chaturbateData } from "./platforms/chaturbate";
import { bongacamsData } from "./platforms/bongacams";
import { stripchatData } from "./platforms/stripchat";
import { xcamsData } from "./platforms/xcams";
import { jerkmateData } from "./platforms/jerkmate";
import { flirt4freeData } from "./platforms/flirt4free";
import { isliveData } from "./platforms/islive";

export interface PlatformConfig {
  slug: string;
  platformId: string;
  name: string;
  title: string;
  h1: string;
  description: string;
  keywords: string;
  content: string;
  faq: { q: string; a: string }[];
  faqTitle: string;
  aboutTitle: string;
  otherPlatforms: string;
  modelsOnlineLabel: string;
  // Review fields (optional for backward compat)
  rating?: number;
  pros?: string[];
  cons?: string[];
  contentSections?: { title: string; text: string }[];
  stats?: {
    modelsEstimate: string;
    freeToWatch: boolean;
    hdAvailable: boolean;
    mobileApp: boolean;
    interactiveToys: boolean;
    founded: string;
    vrAvailable?: boolean;
  };
  verdict?: string;
  prosTitle?: string;
  consTitle?: string;
  statsTitle?: string;
  verdictTitle?: string;
  reviewTitle?: string;
  popularTitle?: string;
  moreCamsTitle?: string;
}

type PlatformData = Record<string, Record<Language, PlatformConfig>>;

const ui = {
  faqTitle: { nl: "Veelgestelde vragen over", en: "Frequently asked questions about", fr: "Questions fréquentes sur", de: "Häufig gestellte Fragen über", es: "Preguntas frecuentes sobre", it: "Domande frequenti su" },
  aboutTitle: { nl: "Over", en: "About", fr: "À propos de", de: "Über", es: "Sobre", it: "Info su" },
  otherPlatforms: { nl: "Andere platforms op StartVagina", en: "Other platforms on StartVagina", fr: "Autres plateformes sur StartVagina", de: "Andere Plattformen auf StartVagina", es: "Otras plataformas en StartVagina", it: "Altre piattaforme su StartVagina" },
  modelsOnline: { nl: "modellen online", en: "models online", fr: "modèles en ligne", de: "Models online", es: "modelos en línea", it: "modelle online" },
  prosTitle: { nl: "Voordelen", en: "Pros", fr: "Avantages", de: "Vorteile", es: "Ventajas", it: "Vantaggi" },
  consTitle: { nl: "Nadelen", en: "Cons", fr: "Inconvénients", de: "Nachteile", es: "Desventajas", it: "Svantaggi" },
  statsTitle: { nl: "Platform Statistieken", en: "Platform Statistics", fr: "Statistiques", de: "Plattform-Statistiken", es: "Estadísticas", it: "Statistiche" },
  verdictTitle: { nl: "Ons Oordeel", en: "Our Verdict", fr: "Notre Verdict", de: "Unser Urteil", es: "Nuestro Veredicto", it: "Il Nostro Verdetto" },
  reviewTitle: { nl: "Review 2026", en: "Review 2026", fr: "Avis 2026", de: "Bewertung 2026", es: "Reseña 2026", it: "Recensione 2026" },
  popularTitle: { nl: "Populaire", en: "Popular", fr: "Populaires", de: "Beliebte", es: "Populares", it: "Popolari" },
  moreCamsTitle: { nl: "Meer", en: "More", fr: "Plus de", de: "Mehr", es: "Más", it: "Altre" },
  statLabels: {
    founded: { nl: "Opgericht", en: "Founded", fr: "Fondé", de: "Gegründet", es: "Fundado", it: "Fondato" },
    models: { nl: "Modellen", en: "Models", fr: "Modèles", de: "Models", es: "Modelos", it: "Modelle" },
    free: { nl: "Gratis kijken", en: "Free to watch", fr: "Gratuit", de: "Kostenlos", es: "Gratis", it: "Gratuito" },
    hd: { nl: "HD Kwaliteit", en: "HD Quality", fr: "Qualité HD", de: "HD-Qualität", es: "Calidad HD", it: "Qualità HD" },
    mobile: { nl: "Mobiel", en: "Mobile", fr: "Mobile", de: "Mobil", es: "Móvil", it: "Mobile" },
    toys: { nl: "Interactief speelgoed", en: "Interactive toys", fr: "Jouets interactifs", de: "Interaktive Toys", es: "Juguetes interactivos", it: "Giocattoli interattivi" },
    vr: { nl: "VR Ondersteuning", en: "VR Support", fr: "Support VR", de: "VR-Unterstützung", es: "Soporte VR", it: "Supporto VR" },
    yes: { nl: "Ja", en: "Yes", fr: "Oui", de: "Ja", es: "Sí", it: "Sì" },
    no: { nl: "Nee", en: "No", fr: "Non", de: "Nein", es: "No", it: "No" },
  },
};

type PlatformLangInput = Omit<PlatformConfig, "slug"|"platformId"|"name"|"faqTitle"|"aboutTitle"|"otherPlatforms"|"modelsOnlineLabel"|"prosTitle"|"consTitle"|"statsTitle"|"verdictTitle"|"reviewTitle"|"popularTitle"|"moreCamsTitle">;

function p(slug: string, platformId: string, name: string, nl: PlatformLangInput, en: PlatformLangInput, fr: PlatformLangInput, de: PlatformLangInput, es: PlatformLangInput, it: PlatformLangInput): Record<Language, PlatformConfig> {
  const wrap = (lang: Language, d: PlatformLangInput): PlatformConfig => ({
    slug, platformId, name, ...d,
    faqTitle: `${ui.faqTitle[lang]} ${name}`,
    aboutTitle: `${ui.aboutTitle[lang]} ${name}`,
    otherPlatforms: ui.otherPlatforms[lang],
    modelsOnlineLabel: ui.modelsOnline[lang],
    prosTitle: ui.prosTitle[lang],
    consTitle: ui.consTitle[lang],
    statsTitle: ui.statsTitle[lang],
    verdictTitle: ui.verdictTitle[lang],
    reviewTitle: `${name} ${ui.reviewTitle[lang]}`,
    popularTitle: `🔥 ${ui.popularTitle[lang]} ${name} Models`,
    moreCamsTitle: `✨ ${ui.moreCamsTitle[lang]} ${name} Cams`,
  });
  return { nl: wrap("nl", nl), en: wrap("en", en), fr: wrap("fr", fr), de: wrap("de", de), es: wrap("es", es), it: wrap("it", it) };
}

export const platformPages: PlatformData = {
  "live-sex-cams-cam4": p("live-sex-cams-cam4", "cam4", "CAM4", cam4Data.nl, cam4Data.en, cam4Data.fr, cam4Data.de, cam4Data.es, cam4Data.it),
  "live-sex-cams-chaturbate": p("live-sex-cams-chaturbate", "chaturbate", "Chaturbate", chaturbateData.nl, chaturbateData.en, chaturbateData.fr, chaturbateData.de, chaturbateData.es, chaturbateData.it),
  "live-sex-cams-bongacams": p("live-sex-cams-bongacams", "bongacams", "BongaCams", bongacamsData.nl, bongacamsData.en, bongacamsData.fr, bongacamsData.de, bongacamsData.es, bongacamsData.it),
  "live-sex-cams-stripchat": p("live-sex-cams-stripchat", "stripchat", "Stripchat", stripchatData.nl, stripchatData.en, stripchatData.fr, stripchatData.de, stripchatData.es, stripchatData.it),
  "live-sex-cams-xcams": p("live-sex-cams-xcams", "xcams", "XCams", xcamsData.nl, xcamsData.en, xcamsData.fr, xcamsData.de, xcamsData.es, xcamsData.it),
  "live-sex-cams-jerkmate": p("live-sex-cams-jerkmate", "jerkmate", "Jerkmate", jerkmateData.nl, jerkmateData.en, jerkmateData.fr, jerkmateData.de, jerkmateData.es, jerkmateData.it),
  "live-sex-cams-flirt4free": p("live-sex-cams-flirt4free", "flirt4free", "Flirt4Free", flirt4freeData.nl, flirt4freeData.en, flirt4freeData.fr, flirt4freeData.de, flirt4freeData.es, flirt4freeData.it),
  "live-sex-cams-islive": p("live-sex-cams-islive", "islive", "Islive", isliveData.nl, isliveData.en, isliveData.fr, isliveData.de, isliveData.es, isliveData.it),
};

/** Get translated platform page config */
export function getPlatformConfig(slug: string, lang: Language): PlatformConfig | null {
  const page = platformPages[slug];
  if (!page) return null;
  return page[lang] || page.nl;
}
