import type { CamModel } from "@/types/cam";
import { getCountryFlag, getCountryName } from "@/lib/countryFlags";

const BASE_URL = "https://performersext-api.pcvdaa.com/performers-ext";
const API_KEY = "58c7edb1434c213239f858f8db884e5b1255ad4f450e1115b67a42668d4a3526";
const TOKEN = "6ac87970-4a23-11f1-8ba8-f1cfe5a3748e";

export interface JerkmateFilters {
  gender?: "f" | "m" | "c" | "t";
  live?: boolean;
  size?: number;
  page?: number;
  sorting?: "score" | "relevance" | "mostRecent" | "alphabetical" | "topRated" | "random";
  tags?: string;
  ethnicities?: string;
  ages?: string;
  brands?: string;
}

interface JerkmateCharacteristic {
  age?: number;
  gender?: string;
  country?: string;
  languages?: string[];
  ethnicities?: string[];
  bodyTypes?: string[];
  bustSize?: string;
  hairColor?: string;
  eyeColor?: string;
  height?: string;
  genderCode?: string;
}

interface JerkmatePerformer {
  name: string;
  nameClean: string;
  itemId: string;
  thumbnailUrl: string;
  roomUrl: string;
  live: boolean;
  stars: number;
  systemSource: string;
  iframeFeedURL?: string;
  liveSnapshotURL?: string;
  characteristic?: JerkmateCharacteristic;
  characteristicsTags?: string[];
  autoTags?: string[];
  createdDate?: string;
}

interface JerkmateResponse {
  count: number;
  performers: JerkmatePerformer[];
}

function mapGender(genderCode: string | undefined): string {
  switch (genderCode) {
    case "f": return "female";
    case "m": return "male";
    case "c": return "couple";
    case "t": return "trans";
    default: return "female";
  }
}

function buildIframeEmbed(iframeFeedURL: string): string {
  return `<iframe src="${iframeFeedURL}" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"></iframe>`;
}

function normalizeJerkmatePerformer(performer: JerkmatePerformer): CamModel {
  const char = performer.characteristic || {};
  const countryCode = char.country || "";
  const allTags = [
    ...(performer.characteristicsTags || []),
    ...(performer.autoTags || []),
  ]
    .map((t) => t.toLowerCase().trim())
    .filter(Boolean)
    .slice(0, 5);

  const iframeEmbed = performer.iframeFeedURL
    ? buildIframeEmbed(performer.iframeFeedURL)
    : "";

  return {
    id: `jerkmate-${performer.itemId}`,
    name: performer.nameClean || performer.name,
    age: char.age || 0,
    viewers: 0,
    country: getCountryName(countryCode),
    countryFlag: getCountryFlag(countryCode),
    platform: "Jerkmate",
    thumbnail: performer.thumbnailUrl || "",
    thumbnailFallback: performer.liveSnapshotURL || performer.thumbnailUrl || "",
    tags: allTags,
    isOnline: performer.live,
    gender: mapGender(char.genderCode || char.gender),
    link: performer.roomUrl,
    isNew: false,
    isHD: false,
    showType: "public",
    previewUrl: "",
    slug: `jerkmate/${performer.nameClean || performer.name}`,
    iframeEmbed,
    isMobile: false,
    languages: (char.languages || []).map((l) => l.trim()).filter(Boolean),
  };
}

export async function fetchJerkmatePerformers(filters: JerkmateFilters = {}): Promise<CamModel[]> {
  const params = new URLSearchParams({ token: TOKEN });

  if (filters.gender !== undefined) params.set("gender", filters.gender);
  if (filters.live !== undefined) params.set("live", String(filters.live));
  if (filters.size !== undefined) params.set("size", String(filters.size));
  if (filters.page !== undefined) params.set("page", String(filters.page));
  if (filters.sorting) params.set("sorting", filters.sorting);
  if (filters.tags) params.set("tags", filters.tags);
  if (filters.ethnicities) params.set("ethnicities", filters.ethnicities);
  if (filters.ages) params.set("ages", filters.ages);
  if (filters.brands) params.set("brands", filters.brands);

  const url = `${BASE_URL}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
      // Note: User-Agent header cannot be set from browser fetch due to browser restrictions.
      // The API will receive the browser's own User-Agent, which is acceptable.
    },
  });

  if (!response.ok) {
    throw new Error(`Jerkmate API error: ${response.status}`);
  }

  const data: JerkmateResponse = await response.json();
  return (data.performers || []).map(normalizeJerkmatePerformer);
}
