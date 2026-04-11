import { useState, useMemo, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CamGrid from "@/components/CamGrid";
import { Helmet } from "react-helmet-async";
import { useAllCams } from "@/hooks/useAllCams";

/** Display name → matching aliases (same as filterModels.ts) */
const languageAliases: Record<string, string[]> = {
  Nederlands: ["dutch", "nl", "nederlands", "nederlandstalig"],
  English: ["english", "en", "eng"],
  Deutsch: ["german", "de", "deutsch"],
  Français: ["french", "fr", "français", "francais"],
  Español: ["spanish", "es", "español", "espanol"],
  Italiano: ["italian", "it", "italiano"],
  Português: ["portuguese", "pt", "português", "portugues"],
  Русский: ["russian", "ru", "русский"],
  日本語: ["japanese", "ja", "jp", "日本語"],
  한국어: ["korean", "ko", "kr", "한국어"],
  Čeština: ["czech", "cs", "čeština", "cestina"],
  Polski: ["polish", "pl", "polski"],
  Română: ["romanian", "ro", "română", "romana"],
  Türkçe: ["turkish", "tr", "türkçe", "turkce"],
  العربية: ["arabic", "ar", "العربية"],
  ไทย: ["thai", "th", "ไทย"],
  中文: ["chinese", "zh", "中文", "mandarin"],
  Hindi: ["hindi", "hi"],
  Svenska: ["swedish", "sv", "svenska"],
  Norsk: ["norwegian", "no", "norsk"],
  Dansk: ["danish", "da", "dansk"],
  Suomi: ["finnish", "fi", "suomi"],
  Magyar: ["hungarian", "hu", "magyar"],
  Ελληνικά: ["greek", "el", "ελληνικά"],
  Filipino: ["filipino", "tagalog", "tl"],
  "Tiếng Việt": ["vietnamese", "vi", "tiếng việt"],
};

const languageEmojis: Record<string, string> = {
  Nederlands: "🇳🇱", English: "🇬🇧", Deutsch: "🇩🇪", Français: "🇫🇷",
  Español: "🇪🇸", Italiano: "🇮🇹", Português: "🇵🇹", Русский: "🇷🇺",
  "日本語": "🇯🇵", "한국어": "🇰🇷", Čeština: "🇨🇿", Polski: "🇵🇱",
  Română: "🇷🇴", Türkçe: "🇹🇷", العربية: "🌍", ไทย: "🇹🇭",
  "中文": "🇨🇳", Hindi: "🇮🇳", Svenska: "🇸🇪", Norsk: "🇳🇴",
  Dansk: "🇩🇰", Suomi: "🇫🇮", Magyar: "🇭🇺", Ελληνικά: "🇬🇷",
  Filipino: "🇵🇭", "Tiếng Việt": "🇻🇳",
};

function modelMatchesLanguage(modelLanguages: string[], langName: string): boolean {
  const aliases = languageAliases[langName] || [langName.toLowerCase()];
  return modelLanguages.some((ml) => {
    const lower = ml.toLowerCase();
    return aliases.some((alias) => lower.includes(alias) || alias.includes(lower));
  });
}

const Languages = () => {
  const { allCams, isLoading } = useAllCams();
  const [selected, setSelected] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Build language list with counts
  const languageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const langName of Object.keys(languageAliases)) {
      let count = 0;
      for (const m of allCams) {
        if (m.languages?.length > 0 && modelMatchesLanguage(m.languages, langName)) {
          count++;
        }
      }
      if (count > 0) counts[langName] = count;
    }

    // Also count unknown/other languages from the raw data
    return Object.entries(counts)
      .map(([lang, count]) => ({ lang, emoji: languageEmojis[lang] || "🗣️", count }))
      .sort((a, b) => {
        // Nederlands always first
        if (a.lang === "Nederlands") return -1;
        if (b.lang === "Nederlands") return 1;
        if (a.lang === "English") return -1;
        if (b.lang === "English") return 1;
        return b.count - a.count;
      });
  }, [allCams]);

  const filteredCams = useMemo(() => {
    if (!selected) return null;
    return allCams
      .filter((m) => m.languages?.length > 0 && modelMatchesLanguage(m.languages, selected))
      .sort(() => Math.random() - 0.5);
  }, [allCams, selected]);

  // Scroll to results
  const handleSelect = (lang: string) => {
    setSelected(selected === lang ? null : lang);
    setTimeout(() => {
      if (lang !== selected && resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Webcamsex per Taal — Cam Girls in Jouw Taal | StartVagina</title>
          <meta
            name="description"
            content="Vind cam girls die jouw taal spreken. Filter webcamsex op Nederlands, Engels, Duits, Frans, Spaans en meer. Webcam modellen in elke taal op StartVagina."
          />
          <meta name="keywords" content="webcamsex per taal, nederlandstalige cam girls, cam girls taal, webcamsex nederlands, webcam talen" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://startvagina.nl/languages" />
        </Helmet>

        <Header />

        <main className="container flex-1 py-6">
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
            {selected ? `🗣️ Webcamsex in het ${selected}` : "Webcamsex per Taal"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            {selected
              ? `Bekijk alle live cam modellen die ${selected} spreken. Geen taalbarrière — chat direct in jouw taal.`
              : "Kies een taal en ontdek cam modellen die jouw taal spreken. Van Nederlandstalige cam girls tot Spaanstalige modellen — eindelijk webcamsex zonder taalbarrière."
            }
          </p>

          {/* Language chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {languageCounts.map(({ lang, emoji, count }) => (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
                  selected === lang
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:bg-accent hover:border-accent"
                }`}
              >
                <span>{emoji}</span>
                <span>{lang}</span>
                <span
                  className={`text-xs ml-1 ${
                    selected === lang ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  ({count})
                </span>
              </button>
            ))}
          </div>

          {/* Results */}
          <div ref={resultsRef} />
          {selected && filteredCams ? (
            <CamGrid
              title={`🗣️ ${selected} — ${filteredCams.length} modellen online`}
              models={filteredCams}
              totalOnline={filteredCams.length}
              isLoading={isLoading}
            />
          ) : (
            !selected && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">🗣️ Kies een taal om cam modellen te bekijken</p>
              </div>
            )
          )}
        </main>

        <Footer />
      </div>
    </AgeGate>
  );
};

export default Languages;
