import { Search, Menu, X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSfwMode } from "@/hooks/useSfwMode";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Categorieën", href: "/categories" },
  { label: "Landen", href: "/countries" },
  { label: "Nieuw", href: "/new" },
  { label: "Top Cams", href: "/top" },
  { label: "Blog", href: "/blog" },
];

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { sfwMode, toggleSfw } = useSfwMode();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      {/* Top bar */}
      <div className="container flex items-center justify-between h-14">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
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

        {/* Search & Mobile Menu */}
        <div className="flex items-center gap-3">
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
            <span className="hidden sm:inline">{sfwMode ? "SFW" : "NSFW"}</span>
          </button>
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                type="search"
                placeholder="Zoek model of categorie..."
                className="bg-secondary border border-border rounded-md px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-48 md:w-64"
                autoFocus
                aria-label="Zoeken"
              />
              <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Sluiten">
                <X size={18} />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-foreground" aria-label="Zoeken">
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
