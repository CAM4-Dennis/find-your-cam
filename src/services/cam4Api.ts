import type { Cam4Model, CamModel } from "@/types/cam";
import { getCountryFlag, getCountryName } from "@/lib/countryFlags";

const BASE_URL = "https://api.pinklabel.com/api/v1";

export interface Cam4Filters {
  gender?: "female" | "male" | "couple" | "shemale";
  age?: string;       // e.g. "18-24"
  country?: string;   // ISO alpha-2
  body?: "athletic" | "bbw" | "curvy" | "petite";
  ethnicity?: "arab" | "asian" | "ebony" | "hispanic" | "caucasian";
  hair?: "bald" | "black" | "blonde" | "brown" | "grey" | "red" | "white";
  orientation?: "gay" | "bicurious" | "bisexual" | "straight";
  language?: string;
  tag?: string;
  limit?: number;
  page?: number;
}

function buildQueryString(filters: Cam4Filters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });
  return params.toString();
}

function normalizeCam4Model(model: Cam4Model): CamModel {
  return {
    id: `cam4-${model.id}`,
    name: model.nickname,
    age: model.age,
    viewers: model.viewers,
    country: getCountryName(model.country),
    countryFlag: getCountryFlag(model.country),
    platform: "Cam4",
    thumbnail: model.thumb,
    thumbnailFallback: model.thumb_error,
    tags: model.show_tags.length > 0 ? model.show_tags : [],
    isOnline: true,
    gender: model.gender,
    link: `https://offers.cam4tracking.com/aff_c?offer_id=278&aff_id=1961&aff_sub=startvagina&aff_sub2=${model.nickname}`,
    isNew: model.new_performer,
    isHD: model.hd_stream !== null,
    showType: model.show_type,
    previewUrl: model.preview_url,
    slug: `cam4/${model.nickname}`,
    isMobile: model.source === "mobile" || model.mobile,
    languages: (model.languages || []).map((l: string) => l.trim()).filter(Boolean),
    iframeEmbed: "", // Disabled: CAM4 embed shows repeated cookie consent bar; use HLS preview instead
  };
}

export async function fetchOnlineCams(filters: Cam4Filters = {}): Promise<CamModel[]> {
  const qs = buildQueryString({ limit: 50, ...filters });
  const url = `${BASE_URL}/cams/online.json${qs ? `?${qs}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CAM4 API error: ${response.status}`);
  }

  const data: Cam4Model[] = await response.json();
  return data.map(normalizeCam4Model);
}
