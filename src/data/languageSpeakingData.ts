import type { Language } from "@/i18n/translations";

export interface LanguageSpeakingContent {
  title: string;
  h1: string;
  description: string;
  intro: string;
  content: string;
  faq: { q: string; a: string }[];
}

export interface LanguageSpeakingEntry {
  slug: string;
  /** ISO codes to match against model.languages */
  matchCodes: string[];
  label: Record<"nl" | "en", string>;
  flag: string;
}

export const languageSpeakingPages: LanguageSpeakingEntry[] = [
  { slug: "nederlands-sprekend", matchCodes: ["nl", "dutch", "nederlands", "flemish"], label: { nl: "Nederlandssprekend", en: "Dutch Speaking" }, flag: "🇳🇱" },
  { slug: "engels-sprekend", matchCodes: ["en", "english", "engels"], label: { nl: "Engelssprekend", en: "English Speaking" }, flag: "🇬🇧" },
  { slug: "duits-sprekend", matchCodes: ["de", "german", "deutsch", "duits"], label: { nl: "Duitssprekend", en: "German Speaking" }, flag: "🇩🇪" },
  { slug: "frans-sprekend", matchCodes: ["fr", "french", "français", "frans"], label: { nl: "Franssprekend", en: "French Speaking" }, flag: "🇫🇷" },
  { slug: "spaans-sprekend", matchCodes: ["es", "spanish", "español", "spaans"], label: { nl: "Spaanssprekend", en: "Spanish Speaking" }, flag: "🇪🇸" },
  { slug: "italiaans-sprekend", matchCodes: ["it", "italian", "italiano", "italiaans"], label: { nl: "Italiaanssprekend", en: "Italian Speaking" }, flag: "🇮🇹" },
  { slug: "portugees-sprekend", matchCodes: ["pt", "portuguese", "português", "portugees"], label: { nl: "Portugeessprekend", en: "Portuguese Speaking" }, flag: "🇵🇹" },
  { slug: "russisch-sprekend", matchCodes: ["ru", "russian", "русский", "russisch"], label: { nl: "Russischsprekend", en: "Russian Speaking" }, flag: "🇷🇺" },
  { slug: "pools-sprekend", matchCodes: ["pl", "polish", "polski", "pools"], label: { nl: "Poolssprekend", en: "Polish Speaking" }, flag: "🇵🇱" },
  { slug: "tsjechisch-sprekend", matchCodes: ["cs", "czech", "čeština", "tsjechisch"], label: { nl: "Tsjechischsprekend", en: "Czech Speaking" }, flag: "🇨🇿" },
  { slug: "roemeens-sprekend", matchCodes: ["ro", "romanian", "română", "roemeens"], label: { nl: "Roemeenssprekend", en: "Romanian Speaking" }, flag: "🇷🇴" },
  { slug: "hongaars-sprekend", matchCodes: ["hu", "hungarian", "magyar", "hongaars"], label: { nl: "Hongaarssprekend", en: "Hungarian Speaking" }, flag: "🇭🇺" },
  { slug: "turks-sprekend", matchCodes: ["tr", "turkish", "türkçe", "turks"], label: { nl: "Turkssprekend", en: "Turkish Speaking" }, flag: "🇹🇷" },
  { slug: "arabisch-sprekend", matchCodes: ["ar", "arabic", "العربية", "arabisch"], label: { nl: "Arabischsprekend", en: "Arabic Speaking" }, flag: "🌍" },
  { slug: "japans-sprekend", matchCodes: ["ja", "japanese", "日本語", "japans"], label: { nl: "Japanssprekend", en: "Japanese Speaking" }, flag: "🇯🇵" },
  { slug: "koreaans-sprekend", matchCodes: ["ko", "korean", "한국어", "koreaans"], label: { nl: "Koreaanssprekend", en: "Korean Speaking" }, flag: "🇰🇷" },
  { slug: "chinees-sprekend", matchCodes: ["zh", "chinese", "中文", "chinees", "mandarin", "cantonese"], label: { nl: "Chineessprekend", en: "Chinese Speaking" }, flag: "🇨🇳" },
  { slug: "thais-sprekend", matchCodes: ["th", "thai", "ไทย", "thais"], label: { nl: "Thaisprekend", en: "Thai Speaking" }, flag: "🇹🇭" },
  { slug: "hindi-sprekend", matchCodes: ["hi", "hindi", "हिन्दी"], label: { nl: "Hindisprekend", en: "Hindi Speaking" }, flag: "🇮🇳" },
  { slug: "oekraiens-sprekend", matchCodes: ["uk", "ukrainian", "українська", "oekraïens"], label: { nl: "Oekraïenssprekend", en: "Ukrainian Speaking" }, flag: "🇺🇦" },
  { slug: "fins-sprekend", matchCodes: ["fi", "finnish", "suomi", "fins"], label: { nl: "Finssprekend", en: "Finnish Speaking" }, flag: "🇫🇮" },
  { slug: "zweeds-sprekend", matchCodes: ["sv", "swedish", "svenska", "zweeds"], label: { nl: "Zweedssprekend", en: "Swedish Speaking" }, flag: "🇸🇪" },
  { slug: "noors-sprekend", matchCodes: ["no", "norwegian", "norsk", "noors"], label: { nl: "Noorssprekend", en: "Norwegian Speaking" }, flag: "🇳🇴" },
  { slug: "deens-sprekend", matchCodes: ["da", "danish", "dansk", "deens"], label: { nl: "Deenssprekend", en: "Danish Speaking" }, flag: "🇩🇰" },
  { slug: "grieks-sprekend", matchCodes: ["el", "greek", "ελληνικά", "grieks"], label: { nl: "Griekssprekend", en: "Greek Speaking" }, flag: "🇬🇷" },
  { slug: "servisch-sprekend", matchCodes: ["sr", "serbian", "српски", "servisch"], label: { nl: "Servischsprekend", en: "Serbian Speaking" }, flag: "🇷🇸" },
  { slug: "kroatisch-sprekend", matchCodes: ["hr", "croatian", "hrvatski", "kroatisch"], label: { nl: "Kroatischsprekend", en: "Croatian Speaking" }, flag: "🇭🇷" },
  { slug: "bulgaars-sprekend", matchCodes: ["bg", "bulgarian", "български", "bulgaars"], label: { nl: "Bulgaarssprekend", en: "Bulgarian Speaking" }, flag: "🇧🇬" },
  { slug: "indonesisch-sprekend", matchCodes: ["id", "indonesian", "bahasa indonesia", "indonesisch"], label: { nl: "Indonesischsprekend", en: "Indonesian Speaking" }, flag: "🇮🇩" },
  { slug: "vietnamees-sprekend", matchCodes: ["vi", "vietnamese", "tiếng việt", "vietnamees"], label: { nl: "Vietnameessprekend", en: "Vietnamese Speaking" }, flag: "🇻🇳" },
];

// ─── Content generation ──────────────────────────────────────────────────────

const contentTemplates: Record<"nl" | "en", {
  titleTpl: (lang: string) => string;
  h1Tpl: (lang: string) => string;
  descTpl: (lang: string) => string;
  introTpl: (lang: string, flag: string) => string;
  contentTpl: (lang: string) => string;
  faqTpl: (lang: string) => { q: string; a: string }[];
}> = {
  nl: {
    titleTpl: (l) => `${l} Cam Shows — ${l} Cam Modellen Live | StartVagina`,
    h1Tpl: (l) => `${l} Cam Shows — ${l} Cam Modellen Live`,
    descTpl: (l) => `Bekijk ${l.toLowerCase()} cam modellen live op webcam. Chat in het ${l.toLowerCase().replace('sprekend', '').trim()} met modellen van alle platforms.`,
    introTpl: (l, flag) => `${flag} Op zoek naar cam modellen die ${l.toLowerCase().replace('sprekend', '').trim()} spreken? Op StartVagina verzamelen we modellen van Chaturbate, Stripchat, BongaCams, CAM4 en meer die jouw taal spreken. Geen taalbarrière meer — chat direct in de taal die je het prettigst vindt.`,
    contentTpl: (l) => `Het vinden van een cam model dat jouw taal spreekt maakt de ervaring **veel persoonlijker**. In plaats van alleen kijken kun je echt communiceren, verzoeken doen, en een connectie opbouwen met het model.\n\n**Voordelen van ${l.toLowerCase()} cam shows:**\n- **Directe communicatie**: chat zonder taalbarrière in de chatroom\n- **Persoonlijker**: verzoeken en gesprekken gaan natuurlijker\n- **Alle platforms**: wij verzamelen ${l.toLowerCase()} modellen van elk groot platform\n- **Privéshows**: in een privéshow is de taal extra belangrijk voor de interactie\n\nGebruik de taalfilter op StartVagina om direct alle ${l.toLowerCase()} modellen te zien die nu live zijn. Je vindt ze op Chaturbate, Stripchat, BongaCams, CAM4, XCams, Jerkmate en Islive.`,
    faqTpl: (l) => [
      { q: `Hoeveel ${l.toLowerCase()} cam modellen zijn er online?`, a: `Het aantal varieert per moment van de dag. Op de grote platforms (Chaturbate, Stripchat, BongaCams) zijn er altijd ${l.toLowerCase()} modellen online. Via StartVagina zie je ze allemaal op één plek.` },
      { q: `Op welk platform vind ik de meeste ${l.toLowerCase()} modellen?`, a: `Chaturbate en Stripchat hebben het grootste totale aanbod. BongaCams is sterk in Europese talen. CAM4 is populair bij Nederlandse en Belgische modellen.` },
      { q: `Kan ik filteren op taal?`, a: `Ja! Op StartVagina kun je direct filteren op ${l.toLowerCase()} modellen. Op platforms zoals Stripchat kun je ook in de geavanceerde filters op taal zoeken.` },
      { q: `Zijn ${l.toLowerCase()} cam shows gratis?`, a: `Ja, alle openbare shows zijn gratis te bekijken en je kunt gratis chatten in de chatroom. Voor privéshows of tips heb je tokens nodig.` },
    ],
  },
  en: {
    titleTpl: (l) => `${l} Cams — ${l} Cam Models Live | StartVagina`,
    h1Tpl: (l) => `${l} Cams — ${l} Cam Models Live`,
    descTpl: (l) => `Watch ${l.toLowerCase()} cam models live. Chat in ${l.replace(' Speaking', '').toLowerCase()} with models from all platforms.`,
    introTpl: (l, flag) => `${flag} Looking for cam models who speak ${l.replace(' Speaking', '')}? On StartVagina we aggregate models from Chaturbate, Stripchat, BongaCams, CAM4 and more who speak your language. No language barrier — chat directly in the language you prefer.`,
    contentTpl: (l) => `Finding a cam model who speaks your language makes the experience **much more personal**. Instead of just watching, you can truly communicate, make requests, and build a connection with the model.\n\n**Benefits of ${l.toLowerCase()} cam shows:**\n- **Direct communication**: chat without language barriers in the chatroom\n- **More personal**: requests and conversations flow more naturally\n- **All platforms**: we aggregate ${l.toLowerCase()} models from every major platform\n- **Private shows**: language is especially important for private show interaction\n\nUse the language filter on StartVagina to see all ${l.toLowerCase()} models currently live. Find them on Chaturbate, Stripchat, BongaCams, CAM4, XCams, Jerkmate and Islive.`,
    faqTpl: (l) => [
      { q: `How many ${l.toLowerCase()} cam models are online?`, a: `The number varies by time of day. On major platforms (Chaturbate, Stripchat, BongaCams) there are always ${l.toLowerCase()} models online. Through StartVagina you can see them all in one place.` },
      { q: `Which platform has the most ${l.toLowerCase()} models?`, a: `Chaturbate and Stripchat have the largest total selection. BongaCams is strong in European languages. CAM4 is popular with Dutch and Belgian models.` },
      { q: `Can I filter by language?`, a: `Yes! On StartVagina you can filter directly for ${l.toLowerCase()} models. On platforms like Stripchat you can also search by language in the advanced filters.` },
      { q: `Are ${l.toLowerCase()} cam shows free?`, a: `Yes, all public shows are free to watch and you can chat for free in the chatroom. For private shows or tips you need tokens.` },
    ],
  },
};

export function getLanguageSpeakingContent(slug: string, lang: Language): LanguageSpeakingContent | null {
  // Only NL and EN are indexed
  if (lang !== "nl" && lang !== "en") return null;

  const entry = languageSpeakingPages.find((p) => p.slug === slug);
  if (!entry) return null;

  const l = lang === "nl" ? "nl" : "en";
  const tpl = contentTemplates[l];
  const label = entry.label[l];

  return {
    title: tpl.titleTpl(label),
    h1: tpl.h1Tpl(label),
    description: tpl.descTpl(label).slice(0, 160),
    intro: tpl.introTpl(label, entry.flag),
    content: tpl.contentTpl(label),
    faq: tpl.faqTpl(label),
  };
}

export function getLanguageSpeakingEntry(slug: string): LanguageSpeakingEntry | undefined {
  return languageSpeakingPages.find((p) => p.slug === slug);
}
