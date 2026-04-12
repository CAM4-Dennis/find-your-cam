import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SUPPORTED_LANGUAGES, type Language } from "@/i18n/translations";

const STORAGE_KEY = "sv_lang_detected";

/**
 * Detects the user's browser language on first visit and redirects
 * to the matching language version. Only triggers once (stored in localStorage).
 * Only redirects from the root Dutch version — if someone arrives at /fr/ directly,
 * we respect that choice.
 */
const LanguageDetector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only auto-detect on the root (Dutch) version
    const isOnRootLang = !location.pathname.match(/^\/(en|fr|it|de|es)(\/|$)/);
    if (!isOnRootLang) return;

    // Don't detect if already detected before
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Get browser languages (e.g. ["nl-NL", "nl", "en-US", "en"])
    const browserLangs = navigator.languages || [navigator.language];
    
    // Find the first supported language that isn't Dutch
    let detectedLang: Language | null = null;
    for (const bl of browserLangs) {
      const code = bl.toLowerCase().split("-")[0]; // "en-US" → "en"
      if (code === "nl") {
        // Browser is Dutch — no redirect needed
        detectedLang = null;
        break;
      }
      if (SUPPORTED_LANGUAGES.includes(code as Language) && code !== "nl") {
        detectedLang = code as Language;
        break;
      }
    }

    // Mark as detected so we don't do this again
    localStorage.setItem(STORAGE_KEY, detectedLang || "nl");

    // Redirect if we found a non-Dutch language
    if (detectedLang) {
      const targetPath = `/${detectedLang}${location.pathname === "/" ? "" : location.pathname}${location.search}`;
      navigate(targetPath, { replace: true });
    }
  }, [location.pathname, location.search, navigate]);

  return null;
};

export default LanguageDetector;
