import { useState } from "react";

interface FilterGroup {
  title: string;
  options: string[];
}

const filterGroups: FilterGroup[] = [
  {
    title: "Geslacht",
    options: ["Vrouw", "Koppel", "Shemale", "Man"],
  },
  {
    title: "Leeftijd",
    options: ["18-19", "20-30", "31-40", "40+"],
  },
  {
    title: "Categorie",
    options: ["Asian", "BDSM/Fetish", "Big Boobs", "Ebony", "Hairy", "Latina", "Mature", "MILF", "Small Tits", "Tattoo", "Teen"],
  },
  {
    title: "Haarkleur",
    options: ["Blond", "Brunette", "Rood", "Zwart"],
  },
  {
    title: "Lichaam",
    options: ["Slank", "Petite", "Curvy", "Mollig"],
  },
];

const FilterSidebar = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const toggleFilter = (group: string, option: string) => {
    setActiveFilters((prev) => {
      const current = prev[group] || [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [group]: updated };
    });
  };

  const isActive = (group: string, option: string) =>
    (activeFilters[group] || []).includes(option);

  return (
    <aside className="space-y-6" aria-label="Filters">
      {/* Quick links */}
      <div className="space-y-2">
        <QuickLink label="🔥 Alle Cams" />
        <QuickLink label="🌍 Wereldkaart" />
        <QuickLink label="🕑 Bekeken" />
        <QuickLink label="🔒 Privé Shows" />
        <QuickLink label="📂 Categorieën" />
      </div>

      {filterGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            {group.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {group.options.map((option) => (
              <button
                key={option}
                onClick={() => toggleFilter(group.title, option)}
                className={`filter-chip ${isActive(group.title, option) ? "filter-chip-active" : ""}`}
                aria-pressed={isActive(group.title, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Platform logos placeholder */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Cam Sites
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          {["Chaturbate", "Stripchat", "Cams.com", "BongaCams", "Streamate"].map((site) => (
            <button key={site} className="block w-full text-left px-3 py-2 rounded-md bg-secondary hover:bg-surface-hover transition-colors">
              {site}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

const QuickLink = ({ label }: { label: string }) => (
  <button className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-secondary-foreground bg-secondary hover:bg-surface-hover transition-colors">
    {label}
  </button>
);

export default FilterSidebar;
