import { createContext, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { translations, SUPPORTED_LANGUAGES, type Language } from "./translations";

interface LanguageContextType {
  lang: Language;
  t: typeof translations["nl"];
  langPrefix: string; // "" for nl, "/en" for en, etc.
  localePath: (path: string) => string; // prepend lang prefix to a path
  switchLanguage: (newLang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { lang: langParam } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const lang: Language = useMemo(() => {
    if (langParam && SUPPORTED_LANGUAGES.includes(langParam as Language) && langParam !== "nl") {
      return langParam as Language;
    }
    return "nl";
  }, [langParam]);

  const t = translations[lang];
  const langPrefix = lang === "nl" ? "" : `/${lang}`;

  const localePath = (path: string): string => {
    if (lang === "nl") return path;
    // If path starts with /, prepend lang prefix
    if (path.startsWith("/")) return `/${lang}${path}`;
    return `/${lang}/${path}`;
  };

  const switchLanguage = (newLang: Language) => {
    // Get current path without lang prefix
    let currentPath = location.pathname;
    // Remove existing lang prefix if present
    const currentLangMatch = currentPath.match(/^\/(en|fr|it|de|es)(\/|$)/);
    if (currentLangMatch) {
      currentPath = currentPath.slice(currentLangMatch[1].length + 1) || "/";
    }
    
    if (newLang === "nl") {
      navigate(currentPath + location.search);
    } else {
      navigate(`/${newLang}${currentPath === "/" ? "" : currentPath}${location.search}`);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, t, langPrefix, localePath, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
