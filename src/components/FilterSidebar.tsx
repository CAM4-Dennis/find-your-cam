import { Switch } from "@/components/ui/switch";
import type { CamFilters } from "@/types/filters";

interface FilterSidebarProps {
  filters: CamFilters;
  onChange: (filters: CamFilters) => void;
}

interface FilterGroup {
  key: keyof Pick<CamFilters, "gender" | "tags" | "bodyType" | "hairColor">;
  title: string;
  options: string[];
}

const filterGroups: FilterGroup[] = [
  {
    key: "gender",
    title: "Geslacht",
    options: ["Vrouw", "Koppel", "Shemale", "Man"],
  },
  {
    key: "tags",
    title: "Categorie",
    options: ["Asian", "BDSM", "Big Boobs", "Ebony", "Hairy", "Latina", "Mature", "MILF", "Small Tits", "Tattoo", "Teen", "Anal", "Squirt", "Feet"],
  },
];

const ageOptions = ["18-19", "20-30", "31-40", "40+"];

const platforms = ["Cam4", "Chaturbate", "BongaCams", "Stripchat", "XCams"];

const FilterSidebar = ({ filters, onChange }: FilterSidebarProps) => {
  const toggleArrayFilter = (key: keyof CamFilters, value: string) => {
    const current = (filters[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const isActive = (key: keyof CamFilters, value: string) =>
    ((filters[key] as string[]) || []).includes(value);

  const clearAll = () => {
    onChange({
      gender: [],
      platforms: [],
      tags: [],
      hd: null,
      ageRange: null,
      bodyType: [],
      hairColor: [],
    });
  };

  const hasActiveFilters =
    filters.gender.length > 0 ||
    filters.platforms.length > 0 ||
    filters.tags.length > 0 ||
    filters.hd === true ||
    filters.ageRange !== null;

  return (
    <aside className="space-y-5" aria-label="Filters">
      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="text-xs text-primary hover:underline font-medium"
        >
          ✕ Wis alle filters
        </button>
      )}

      {/* HD toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Alleen HD
        </span>
        <Switch
          checked={filters.hd === true}
          onCheckedChange={(checked) =>
            onChange({ ...filters, hd: checked ? true : null })
          }
        />
      </div>

      {/* Age range */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Leeftijd
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {ageOptions.map((opt) => (
            <button
              key={opt}
              onClick={() =>
                onChange({
                  ...filters,
                  ageRange: filters.ageRange === opt ? null : opt,
                })
              }
              className={`filter-chip ${filters.ageRange === opt ? "filter-chip-active" : ""}`}
              aria-pressed={filters.ageRange === opt}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic filter groups */}
      {filterGroups.map((group) => (
        <div key={group.key}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            {group.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {group.options.map((option) => (
              <button
                key={option}
                onClick={() => toggleArrayFilter(group.key, option)}
                className={`filter-chip ${isActive(group.key, option) ? "filter-chip-active" : ""}`}
                aria-pressed={isActive(group.key, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Platform filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Cam Sites
        </h3>
        <div className="space-y-1.5">
          {platforms.map((site) => (
            <button
              key={site}
              onClick={() => toggleArrayFilter("platforms", site)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                isActive("platforms", site)
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {site}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
