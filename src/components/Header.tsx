import { Search, Menu, X, Eye, EyeOff, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSfwMode } from "@/hooks/useSfwMode";
import { useLanguage } from "@/i18n/LanguageContext";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, type Language } from "@/i18n/translations";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { sfwMode, toggleSfw } = useSfwMode();
  const { t, lang, localePath, switchLanguage } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: t.navHome, href: localePath("/") },
    { label: t.navCategories, href: localePath("/categories") },
    { label: t.navCountries, href: localePath("/countries") },
    { label: t.navLanguages, href: localePath("/languages") },
    { label: t.navNew, href: localePath("/new") },
    { label: t.navTopCams, href: localePath("/top") },
    { label: t.navBlog, href: localePath("/blog") },
  ];

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      {/* Top bar */}
      <div className="container flex items-center justify-between h-14">
        {/* Logo */}
        <a href={localePath("/")} className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-bold font-display tracking-tight">
            <span className="text-primary">Start</span>
            <span className="text-foreground">Vagina</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Hoofdnavigatie">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Search, Language & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-md border border-border bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t.langSwitcherLabel}
            >
              <Globe size={14} />
              <span className="hidden sm:inline">{lang.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-md shadow-lg py-1 z-50 min-w-[140px]">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l}
                    onClick={() => { switchLanguage(l as Language); setLangOpen(false); }}
                    className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors ${
                      l === lang ? "text-primary font-medium" : "text-foreground"
                    }`}
                  >
                    {LANGUAGE_LABELS[l as Language]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={toggleSfw}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border transition-colors ${
              sfwMode
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
            aria-label={sfwMode ? "NSFW modus inschakelen" : "SFW modus inschakelen"}
            title={sfwMode ? "Thumbnails zijn verborgen — klik om te tonen" : "Klik om thumbnails te verbergen (SFW)"}
          >
            {sfwMode ? <EyeOff size={14} /> : <Eye size={14} />}
            <span className="hidden sm:inline">{sfwMode ? t.sfwLabel : t.nsfwLabel}</span>
          </button>
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                type="search"
                placeholder={t.searchPlaceholder}
                className="bg-secondary border border-border rounded-md px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-48 md:w-64"
                autoFocus
                aria-label={t.searchPlaceholder}
              />
              <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Sluiten">
                <X size={18} />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-foreground" aria-label={t.searchPlaceholder}>
              <Search size={20} />
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-card py-3 px-4 space-y-2" aria-label="Mobiele navigatie">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="block nav-link py-2">
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
