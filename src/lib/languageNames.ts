/** Map language codes to full names, localized per display language */
const languageNames: Record<string, Record<string, string>> = {
  nl: {
    nl: "Nederlands", en: "Engels", de: "Duits", fr: "Frans", es: "Spaans", it: "Italiaans",
    pt: "Portugees", ru: "Russisch", pl: "Pools", cs: "Tsjechisch", ro: "Roemeens",
    hu: "Hongaars", sv: "Zweeds", da: "Deens", no: "Noors", fi: "Fins",
    el: "Grieks", tr: "Turks", ar: "Arabisch", ja: "Japans", ko: "Koreaans",
    zh: "Chinees", th: "Thais", vi: "Vietnamees", hi: "Hindi", uk: "Oekraïens",
    bg: "Bulgaars", hr: "Kroatisch", sk: "Slowaaks", lt: "Litouws", lv: "Lets",
    et: "Ests", sr: "Servisch", sl: "Sloveens", ca: "Catalaans", id: "Indonesisch",
    ms: "Maleis", tl: "Tagalog", he: "Hebreeuws", fa: "Perzisch",
    nederlandstalig: "Nederlands", english: "Engels", german: "Duits", french: "Frans",
    spanish: "Spaans", italian: "Italiaans", portuguese: "Portugees", russian: "Russisch",
    polish: "Pools", czech: "Tsjechisch", romanian: "Roemeens", hungarian: "Hongaars",
    swedish: "Zweeds", danish: "Deens", norwegian: "Noors", finnish: "Fins",
    greek: "Grieks", turkish: "Turks", arabic: "Arabisch", japanese: "Japans",
    korean: "Koreaans", chinese: "Chinees", thai: "Thais", vietnamese: "Vietnamees",
    hindi: "Hindi", ukrainian: "Oekraïens", dutch: "Nederlands",
  },
  en: {
    nl: "Dutch", en: "English", de: "German", fr: "French", es: "Spanish", it: "Italian",
    pt: "Portuguese", ru: "Russian", pl: "Polish", cs: "Czech", ro: "Romanian",
    hu: "Hungarian", sv: "Swedish", da: "Danish", no: "Norwegian", fi: "Finnish",
    el: "Greek", tr: "Turkish", ar: "Arabic", ja: "Japanese", ko: "Korean",
    zh: "Chinese", th: "Thai", vi: "Vietnamese", hi: "Hindi", uk: "Ukrainian",
    bg: "Bulgarian", hr: "Croatian", sk: "Slovak", lt: "Lithuanian", lv: "Latvian",
    et: "Estonian", sr: "Serbian", sl: "Slovenian", ca: "Catalan", id: "Indonesian",
    ms: "Malay", tl: "Tagalog", he: "Hebrew", fa: "Persian",
    nederlandstalig: "Dutch", english: "English", german: "German", french: "French",
    spanish: "Spanish", italian: "Italian", portuguese: "Portuguese", russian: "Russian",
    polish: "Polish", czech: "Czech", romanian: "Romanian", hungarian: "Hungarian",
    swedish: "Swedish", danish: "Danish", norwegian: "Norwegian", finnish: "Finnish",
    greek: "Greek", turkish: "Turkish", arabic: "Arabic", japanese: "Japanese",
    korean: "Korean", chinese: "Chinese", thai: "Thai", vietnamese: "Vietnamese",
    hindi: "Hindi", ukrainian: "Ukrainian", dutch: "Dutch",
  },
  fr: {
    nl: "Néerlandais", en: "Anglais", de: "Allemand", fr: "Français", es: "Espagnol", it: "Italien",
    pt: "Portugais", ru: "Russe", pl: "Polonais", cs: "Tchèque", ro: "Roumain",
    hu: "Hongrois", sv: "Suédois", da: "Danois", no: "Norvégien", fi: "Finnois",
    el: "Grec", tr: "Turc", ar: "Arabe", ja: "Japonais", ko: "Coréen",
    zh: "Chinois", th: "Thaï", vi: "Vietnamien", hi: "Hindi", uk: "Ukrainien",
    nederlandstalig: "Néerlandais", english: "Anglais", german: "Allemand", french: "Français",
    spanish: "Espagnol", italian: "Italien", russian: "Russe", dutch: "Néerlandais",
  },
  de: {
    nl: "Niederländisch", en: "Englisch", de: "Deutsch", fr: "Französisch", es: "Spanisch", it: "Italienisch",
    pt: "Portugiesisch", ru: "Russisch", pl: "Polnisch", cs: "Tschechisch", ro: "Rumänisch",
    hu: "Ungarisch", sv: "Schwedisch", da: "Dänisch", no: "Norwegisch", fi: "Finnisch",
    el: "Griechisch", tr: "Türkisch", ar: "Arabisch", ja: "Japanisch", ko: "Koreanisch",
    zh: "Chinesisch", th: "Thailändisch", vi: "Vietnamesisch", hi: "Hindi", uk: "Ukrainisch",
    nederlandstalig: "Niederländisch", english: "Englisch", german: "Deutsch", french: "Französisch",
    spanish: "Spanisch", italian: "Italienisch", russian: "Russisch", dutch: "Niederländisch",
  },
  es: {
    nl: "Neerlandés", en: "Inglés", de: "Alemán", fr: "Francés", es: "Español", it: "Italiano",
    pt: "Portugués", ru: "Ruso", pl: "Polaco", cs: "Checo", ro: "Rumano",
    hu: "Húngaro", sv: "Sueco", da: "Danés", no: "Noruego", fi: "Finlandés",
    el: "Griego", tr: "Turco", ar: "Árabe", ja: "Japonés", ko: "Coreano",
    zh: "Chino", th: "Tailandés", vi: "Vietnamita", hi: "Hindi", uk: "Ucraniano",
    nederlandstalig: "Neerlandés", english: "Inglés", german: "Alemán", french: "Francés",
    spanish: "Español", italian: "Italiano", russian: "Ruso", dutch: "Neerlandés",
  },
  it: {
    nl: "Olandese", en: "Inglese", de: "Tedesco", fr: "Francese", es: "Spagnolo", it: "Italiano",
    pt: "Portoghese", ru: "Russo", pl: "Polacco", cs: "Ceco", ro: "Rumeno",
    hu: "Ungherese", sv: "Svedese", da: "Danese", no: "Norvegese", fi: "Finlandese",
    el: "Greco", tr: "Turco", ar: "Arabo", ja: "Giapponese", ko: "Coreano",
    zh: "Cinese", th: "Tailandese", vi: "Vietnamita", hi: "Hindi", uk: "Ucraino",
    nederlandstalig: "Olandese", english: "Inglese", german: "Tedesco", french: "Francese",
    spanish: "Spagnolo", italian: "Italiano", russian: "Russo", dutch: "Olandese",
  },
};

/**
 * Convert a language code or name to its full localized name.
 * Falls back to capitalizing the input if no mapping is found.
 */
export function getLanguageName(code: string, displayLang: string = "nl"): string {
  const normalized = code.toLowerCase().trim();
  const map = languageNames[displayLang] || languageNames.en;
  return map[normalized] || languageNames.en[normalized] || code.charAt(0).toUpperCase() + code.slice(1);
}

/**
 * Convert an array of language codes/names to full localized names.
 */
export function getLanguageNames(codes: string[], displayLang: string = "nl"): string[] {
  return codes.map(c => getLanguageName(c, displayLang));
}
