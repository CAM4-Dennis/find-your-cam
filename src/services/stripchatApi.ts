import type { CamModel } from "@/types/cam";
import { getCountryFlag, getCountryName } from "@/lib/countryFlags";

interface StripchatModel {
  id: number;
  username: string;
  avatarUrl: string | null;
  popularSnapshotUrl: string;
  snapshotUrl: string;
  clickUrl: string;
  modelsCountry: string;
  gender: string;
  broadcastGender: string;
  previewUrlThumbSmall: string;
  tags: string[];
  favoritedCount: number;
  stream: {
    width: number;
    height: number;
    url: string;
    urls: Record<string, string>;
  };
  viewersCount: number;
  broadcastVR: boolean;
  broadcastHD: boolean;
  broadcastMobile?: boolean;
  geobans: {
    blockedCountries: string[];
    blockedRegions: Record<string, string[]>;
    blockedLanguages: string[];
  };
  status: string;
  isNew?: boolean;
  goalMessage?: string | null;
  neededForGoal?: number;
  earnedForGoal?: number;
  languages: string[];
  profileBirthDate?: string;
}

interface StripchatResponse {
  count: number;
  total: number;
  models: StripchatModel[];
}

export interface StripchatFilters {
  tag?: string; // "girls" | "men" | "couples" | "trans"
  limit?: number;
  status?: string;
}

function normalizeGender(gender: string, broadcastGender: string): string {
  const bg = broadcastGender.toLowerCase();
  if (bg === "female" || gender === "female") return "female";
  if (bg === "male" || gender === "male") return "male";
  if (bg === "group" || gender === "maleFemale" || gender === "females") return "couple";
  if (gender === "trans") return "trans";
  return gender;
}

function calcAge(birthDate?: string): number {
  if (!birthDate || birthDate.startsWith("0001")) return 0;
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return 0;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age >= 18 ? age : 0;
}

function normalizeStripchatModel(model: StripchatModel): CamModel {
  const cleanTags = (model.tags || [])
    .map((t) => t.replace(/^(girls|men|couples|trans)\//, ""))
    .filter((t) => t.length > 0 && t.length < 25)
    .slice(0, 5);

  const country = model.modelsCountry?.toUpperCase() || "";

  return {
    id: `stripchat-${model.id}`,
    name: model.username,
    age: calcAge(model.profileBirthDate),
    viewers: model.viewersCount,
    country: getCountryName(country) || country || "Onbekend",
    countryFlag: getCountryFlag(country) || "🌍",
    platform: "Stripchat",
    thumbnail: model.snapshotUrl || model.popularSnapshotUrl,
    thumbnailFallback: model.previewUrlThumbSmall || model.popularSnapshotUrl,
    tags: cleanTags,
    isOnline: model.status === "public",
    gender: normalizeGender(model.gender, model.broadcastGender),
    link: `https://stripchat.com/${model.username}`,
    isNew: model.isNew || false,
    isHD: model.broadcastHD,
    showType: model.status,
    previewUrl: "",
    slug: `stripchat-${model.username}`,
    iframeEmbed: `<iframe src="https://stripchat.com/${model.username}?embed=1" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay"></iframe>`,
  };
}

export async function fetchStripchatRooms(filters: StripchatFilters = {}): Promise<CamModel[]> {
  const params = new URLSearchParams();
  params.set("platform", "stripchat");
  if (filters.tag) params.set("tag", filters.tag);
  if (filters.limit) params.set("limit", String(filters.limit));
  params.set("status", filters.status || "public");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const url = `${supabaseUrl}/functions/v1/cam-proxy?${params.toString()}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${anonKey}`,
      "apikey": anonKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Stripchat proxy error: ${response.status}`);
  }

  const result: StripchatResponse = await response.json();
  return (result.models || []).map(normalizeStripchatModel);
}
