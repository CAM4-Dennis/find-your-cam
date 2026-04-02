import type { CamModel } from "@/types/cam";
import { getCountryFlag, getCountryName } from "@/lib/countryFlags";

const BASE_URL = "https://chaturbate.com/api/public/affiliates/onlinerooms/";
const WM = "nr6ku";

export interface ChaturbateFilters {
  gender?: "f" | "m" | "t" | "c";
  limit?: number;
  offset?: number;
  hd?: boolean;
  tag?: string;
  region?: string;
}

interface ChaturbateRoom {
  username: string;
  display_name: string;
  room_subject: string;
  is_hd: boolean;
  is_new: boolean;
  tags: string[];
  seconds_online: number;
  gender: string;
  current_show: string;
  chat_room_url: string;
  chat_room_url_revshare: string;
  image_url: string;
  image_url_360x270: string;
  iframe_embed: string;
  iframe_embed_revshare: string;
  num_users: number;
  num_followers: number;
  spoken_languages: string;
  birthday: string;
  age: number;
  location: string;
  country: string;
}

interface ChaturbateResponse {
  count: number;
  results: ChaturbateRoom[];
}

function normalizeGender(g: string): string {
  switch (g) {
    case "f": return "female";
    case "m": return "male";
    case "t": return "trans";
    case "c": return "couple";
    default: return g;
  }
}

function normalizeChaturbateRoom(room: ChaturbateRoom): CamModel {
  return {
    id: `cb-${room.username}`,
    name: room.display_name || room.username,
    age: room.age,
    viewers: room.num_users,
    country: room.country ? getCountryName(room.country) : room.location || "Onbekend",
    countryFlag: room.country ? getCountryFlag(room.country) : "🌍",
    platform: "Chaturbate",
    thumbnail: room.image_url_360x270 || room.image_url,
    thumbnailFallback: room.image_url,
    tags: room.tags?.slice(0, 5) || [],
    isOnline: true,
    gender: normalizeGender(room.gender),
    link: room.chat_room_url_revshare || room.chat_room_url,
    isNew: room.is_new,
    isHD: room.is_hd,
    showType: room.current_show,
    previewUrl: "", // Chaturbate doesn't provide HLS preview; we'll use iframe embed
    slug: `cb-${room.username}`,
    iframeEmbed: room.iframe_embed_revshare || room.iframe_embed,
  };
}

export async function fetchChaturbateRooms(filters: ChaturbateFilters = {}): Promise<CamModel[]> {
  const params = new URLSearchParams();
  params.set("wm", WM);
  params.set("client_ip", "request_ip");
  params.set("format", "json");

  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.offset) params.set("offset", String(filters.offset));
  if (filters.hd !== undefined) params.set("hd", String(filters.hd));
  if (filters.gender) params.append("gender", filters.gender);
  if (filters.tag) params.append("tag", filters.tag);
  if (filters.region) params.append("region", filters.region);

  const url = `${BASE_URL}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Chaturbate API error: ${response.status}`);
  }

  const data: ChaturbateResponse = await response.json();
  return data.results.map(normalizeChaturbateRoom);
}
