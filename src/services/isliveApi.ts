import type { CamModel } from "@/types/cam";
import { getCountryFlag, getCountryName } from "@/lib/countryFlags";

const BASE_URL = "/api/islive-proxy";
const AFFILIATE_ID = "12058";

export interface IsliveFilters {
  gender?: "v" | "m" | "s" | "t";
  limit?: number;
  page?: number;
}

interface IsliveModel {
  modelnaam: string;
  leeftijd: number;
  geslacht: string;
  online: boolean;
  waardering: number | null;
  land: string | null;
  uiterlijk: string | null;
  taal0: string | null;
  taal1: string | null;
  taal2: string | null;
  snapshot: string | null;
  nonude: string | null;
  cover: string | null;
  coverVideo: string | null;
  decency: string | null;
  available_contact: boolean;
  woonplaats: string | null;
}

interface IsliveResponse {
  result: IsliveModel[];
  total_pages: number;
  current_page: number;
}

function normalizeGender(g: string): string {
  switch (g) {
    case "v": case "f": return "female";
    case "m": return "male";
    case "s": return "trans";
    case "t": return "trans";
    default: return "female";
  }
}

function normalizeIsliveModel(model: IsliveModel): CamModel {
  const languages = [model.taal0, model.taal1, model.taal2]
    .filter((l): l is string => !!l)
    .map((l) => l.trim());

  return {
    id: `islive-${model.modelnaam}`,
    name: model.modelnaam,
    age: model.leeftijd,
    viewers: 0,
    country: model.land ? getCountryName(model.land) : model.woonplaats || "Onbekend",
    countryFlag: model.land ? getCountryFlag(model.land) : "🌍",
    platform: "Islive",
    thumbnail: model.nonude || model.snapshot || model.cover || "",
    thumbnailFallback: model.snapshot || model.nonude || "",
    tags: model.uiterlijk ? [model.uiterlijk] : [],
    isOnline: true,
    gender: normalizeGender(model.geslacht),
    link: `https://cams.vagina.nl/profile/${model.modelnaam}?p=${AFFILIATE_ID}`,
    isNew: false,
    isHD: false,
    showType: "public",
    previewUrl: model.coverVideo || "",
    slug: `islive/${model.modelnaam}`,
    languages,
    iframeEmbed: "",
  };
}

export async function fetchIsliveModels(filters: IsliveFilters = {}): Promise<CamModel[]> {
  const params = new URLSearchParams();
  params.set("fetch", "minimal");
  params.set("where[online]", "1");

  if (filters.gender) params.set("where[geslacht]", filters.gender);
  if (filters.limit) params.set("limit", String(Math.min(filters.limit, 60)));
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));

  // Include all needed fields for display
  params.set("select", "modelnaam,geslacht,leeftijd,online,waardering,land,woonplaats,uiterlijk,taal0,taal1,taal2,snapshot,nonude,cover,coverVideo,decency,available_contact");

  const url = `${BASE_URL}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Islive API error: ${response.status}`);
  }

  const data: IsliveResponse = await response.json();
  return (data.result || []).map(normalizeIsliveModel);
}
