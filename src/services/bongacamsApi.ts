import type { CamModel } from "@/types/cam";
import { getCountryFlag, getCountryName } from "@/lib/countryFlags";
const CAMPAIGN_ID = "714932";

export interface BongaCamsFilters {
  section?: "all" | "straight" | "couples" | "gay" | "transsexual" | "new";
  categories?: string[];
  tags?: string[];
  region?: "asia" | "cis" | "europe" | "latin_america" | "north_america" | "other";
  sort?: "display_name" | "languages" | "last_online" | "rank";
  limit?: number;
  offset?: number;
}

interface BongaCamsModel {
  username: string;
  display_name: string;
  display_age: number;
  profile_page_url: string;
  chat_url: string;
  chat_url_on_home_page: string;
  direct_chat_url: string;
  stream_feed_url: string;
  members_count: number;
  is_hd: boolean;
  gender: string;
  homecountry: string;
  region: string;
  primary_language: string;
  secondary_language: string;
  tags: Record<string, string>;
  profile_images: {
    profile_image: string;
    thumbnail_image_small: string;
    thumbnail_image_medium: string;
    thumbnail_image_big: string;
  };
  live_images: {
    thumbnail_image_medium: string;
    thumbnail_image_big: string;
  };
  online_time: number;
  ethnicity: string;
  hair_color: string;
  sexual_preference: string;
}

interface BongaCamsResponse {
  online_models: number;
  models: BongaCamsModel[];
}

function normalizeBongaModel(model: BongaCamsModel): CamModel {
  const tags = Object.values(model.tags || {}).slice(0, 5);

  return {
    id: `bonga-${model.username}`,
    name: model.display_name || model.username,
    age: model.display_age,
    viewers: model.members_count,
    country: getCountryName(model.homecountry) || model.homecountry || "Onbekend",
    countryFlag: getCountryFlag(model.homecountry) || "🌍",
    platform: "BongaCams",
    thumbnail: model.live_images?.thumbnail_image_big || model.profile_images?.thumbnail_image_big || model.profile_images?.profile_image,
    thumbnailFallback: model.profile_images?.thumbnail_image_medium || model.profile_images?.profile_image,
    tags,
    isOnline: true,
    gender: model.gender,
    link: `https://bongacash.com/model-ref?c=714936&model=${model.username}`,
    isNew: false,
    isHD: model.is_hd,
    showType: "public",
    previewUrl: "",
    slug: `bonga-${model.username}`,
    iframeEmbed: `<iframe src="${model.direct_chat_url || `https://bongacams.com/chat-popup/${model.username}`}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay"></iframe>`,
    isMobile: tags.includes("mobile-live"),
  };
}

export async function fetchBongaCamsRooms(filters: BongaCamsFilters = {}): Promise<CamModel[]> {
  const params = new URLSearchParams();
  params.set("platform", "bongacams");
  params.set("c", CAMPAIGN_ID);
  // client_ip is resolved server-side in the proxy

  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.offset) params.set("offset", String(filters.offset));
  if (filters.section) params.set("section", filters.section);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.region) params.set("region", filters.region);
  if (filters.categories) {
    filters.categories.forEach((cat) => params.append("categories[]", cat));
  }
  if (filters.tags) {
    filters.tags.forEach((tag) => params.append("tags[]", tag));
  }

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
    throw new Error(`BongaCams proxy error: ${response.status}`);
  }

  const result: BongaCamsResponse = await response.json();
  return (result.models || []).map(normalizeBongaModel);
}
