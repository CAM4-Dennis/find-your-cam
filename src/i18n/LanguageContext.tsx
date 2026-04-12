import { createContext, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { translations, SUPPORTED_LANGUAGES, type Language } from "./translations";

interface LanguageContextType {
  lang: Language;
  t: typeof translations["nl"];
  langPrefix: string; // "" for nl, "/en" for en, etc.
  localePath: (path: string) => string; // prepend lang prefix to a path
  /** The current pathname with the language prefix stripped (e.g. /fr/categories → /categories) */
  basePath: string;
  switchLanguage: (newLang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const NON_NL_LANGS: Language[] = ["en", "fr", "it", "de", "es"];

function detectLangFromPath(pathname: string): Language {
  const match = pathname.match(/^\/(en|fr|it|de|es)(\/|$)/);
  if (match && NON_NL_LANGS.includes(match[1] as Language)) {
    return match[1] as Language;
  }
  return "nl";
}

/** Strip the lang prefix from a pathname, returning the inner path */
function stripLangPrefix(pathname: string): string {
  const match = pathname.match(/^\/(en|fr|it|de|es)(\/.*|$)/);
  if (match) {
    return match[2] || "/";
  }
  return pathname;
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useMemo(() => detectLangFromPath(location.pathname), [location.pathname]);

  const t = translations[lang];
  const langPrefix = lang === "nl" ? "" : `/${lang}`;
  const basePath = stripLangPrefix(location.pathname);

  const localePath = (path: string): string => {
    if (lang === "nl") return path;
    if (path.startsWith("/")) return `/${lang}${path}`;
    return `/${lang}/${path}`;
  };

  const switchLanguage = (newLang: Language) => {
    const currentPath = stripLangPrefix(location.pathname);
    
    // Save choice so LanguageDetector respects it
    localStorage.setItem("sv_lang_detected", newLang);
    
    if (newLang === "nl") {
      navigate(currentPath + location.search);
    } else {
      navigate(`/${newLang}${currentPath === "/" ? "" : currentPath}${location.search}`);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, t, langPrefix, localePath, basePath, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
