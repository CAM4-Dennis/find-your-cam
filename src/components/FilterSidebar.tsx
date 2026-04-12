import { Switch } from "@/components/ui/switch";
import type { CamFilters } from "@/types/filters";
import { useLanguage } from "@/i18n/LanguageContext";

interface FilterSidebarProps {
  filters: CamFilters;
  onChange: (filters: CamFilters) => void;
}

const ageOptions = ["18-19", "20-30", "31-40", "40+"];
const platforms = ["Cam4", "Chaturbate", "BongaCams", "Stripchat", "XCams"];
const tagOptions = ["Asian", "BDSM", "Big Boobs", "Ebony", "Hairy", "Latina", "Mature", "MILF", "Small Tits", "Tattoo", "Teen", "Anal", "Squirt", "Feet"];
const languageOptions = ["Nederlands", "English", "Deutsch", "Français", "Español", "Italiano", "Português", "Русский", "日本語", "한국어"];

const FilterSidebar = ({ filters, onChange }: FilterSidebarProps) => {
  const { t } = useLanguage();

  const genderOptions = [
    { value: "Vrouw", label: t.genderFemale },
    { value: "Koppel", label: t.genderCouple },
    { value: "Shemale", label: t.genderShemale },
    { value: "Man", label: t.genderMale },
  ];

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
      languages: [],
    });
  };

  const hasActiveFilters =
    filters.gender.length > 0 ||
    filters.platforms.length > 0 ||
    filters.tags.length > 0 ||
    filters.hd === true ||
    filters.ageRange !== null ||
    filters.languages.length > 0;

  return (
    <aside className="space-y-5" aria-label="Filters">
      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="text-xs text-primary hover:underline font-medium"
        >
          {t.filterClearAll}
        </button>
      )}

      {/* HD toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t.filterHDOnly}
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
          {t.filterAge}
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

      {/* Gender */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
          {t.filterGender}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {genderOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleArrayFilter("gender", option.value)}
              className={`filter-chip ${isActive("gender", option.value) ? "filter-chip-active" : ""}`}
              aria-pressed={isActive("gender", option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category / Tags */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
          {t.filterCategory}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {tagOptions.map((option) => (
            <button
              key={option}
              onClick={() => toggleArrayFilter("tags", option)}
              className={`filter-chip ${isActive("tags", option) ? "filter-chip-active" : ""}`}
              aria-pressed={isActive("tags", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Language filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
          {t.filterLanguage}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {languageOptions.map((option) => (
            <button
              key={option}
              onClick={() => toggleArrayFilter("languages", option)}
              className={`filter-chip ${isActive("languages", option) ? "filter-chip-active" : ""}`}
              aria-pressed={isActive("languages", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Platform filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          {t.filterCamSites}
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
