export interface CamFilters {
  gender: string[];
  platforms: string[];
  tags: string[];
  hd: boolean | null; // null = no filter, true = HD only
  ageRange: string | null;
  bodyType: string[];
  hairColor: string[];
}

export const defaultFilters: CamFilters = {
  gender: [],
  platforms: [],
  tags: [],
  hd: null,
  ageRange: null,
  bodyType: [],
  hairColor: [],
};
