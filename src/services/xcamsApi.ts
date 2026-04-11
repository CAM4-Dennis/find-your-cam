import type { CamModel } from "@/types/cam";
import { getCountryFlag, getCountryName } from "@/lib/countryFlags";

const COMFROM = "1045042";
// Direct API has no CORS headers, proxy through Vercel serverless function
const PROXY_URL = "/api/xcams-proxy";

export interface XCamsFilters {
  gender?: "F" | "M" | "P" | "S";
  limit?: number;
  page?: number;
  language?: string;
  hd?: boolean;
  new?: boolean;
}

interface XCamsCam {
  account: string;
  nickname: string;
  status: string;
  country: string;
  language: string;
  first_language: string;
  sex: string;
  audio: string;
  one2one: string;
  hd: string;
  new: string;
  priority: number;
  age?: number;
  origin?: string;
}

interface XCamsResponse {
  cams: Record<string, XCamsCam>;
  total: number;
  success: string;
  message: string | null;
}

function normalizeGender(sex: string): string {
  switch (sex) {
    case "F": return "female";
    case "M": return "male";
    case "P": return "couple";
    case "S": return "trans";
    default: return "female";
  }
}

function buildProfileUrl(nickname: string): string {
  return `https://www.webcamsex.com/profile/${nickname}/?comfrom=${COMFROM}&cf0=pc2&cfsa1=O180&cf2=Startvagina&cfsa2=&brand=y`;
}

function buildPaymentUrl(nickname: string): string {
  return `https://www.webcamsex.com/login/${nickname}/?comfrom=${COMFROM}&cf0=pc2&cfsa1=O180&cf2=Startvagina&cfsa2=&brand=y`;
}

function buildThumbnailUrl(account: string): string {
  return `https://cams.images-dnxlive.com/snapshots/${account}_webcam_320x180.jpg`;
}

function buildThumbnailFallbackUrl(account: string): string {
  return `https://cams.images-dnxlive.com/snapshots/${account}_webcam_200x150.jpg`;
}

function normalizeCam(cam: XCamsCam): CamModel {
  const country = cam.country?.toUpperCase() || "";

  return {
    id: `xcams-${cam.account}`,
    name: cam.nickname,
    age: cam.age || 0,
    viewers: 0, // API doesn't provide viewer count, use priority as proxy
    country: getCountryName(country) || country || "Onbekend",
    countryFlag: getCountryFlag(country) || "🌍",
    platform: "XCams",
    thumbnail: buildThumbnailUrl(cam.account),
    thumbnailFallback: buildThumbnailFallbackUrl(cam.account),
    tags: [],
    isOnline: cam.status === "ONLINE",
    gender: normalizeGender(cam.sex),
    link: buildProfileUrl(cam.nickname),
    isNew: cam.new === "Y",
    isHD: cam.hd === "Y",
    showType: cam.status?.toLowerCase() || "public",
    previewUrl: "",
    slug: `xcams/${cam.nickname}`,
    iframeEmbed: "", // XCams blocks iframe embeds via CSP (frame-ancestors restricted)
    paymentUrl: buildPaymentUrl(cam.nickname),
  };
}

export async function fetchXCamsRooms(filters: XCamsFilters = {}): Promise<CamModel[]> {
  const params = new URLSearchParams();
  params.set("action", "getCams");
  params.set("cams_per_page", String(filters.limit || 150));
  params.set("current_page", String(filters.page || 1));
  params.set("ip", "82.169.0.1"); // Dutch IP for geo-relevance
  params.set("status", "ONLINE");

  if (filters.gender) params.set("sex", filters.gender);
  if (filters.hd) params.set("hd", "Y");
  if (filters.new) params.set("new", "Y");
  if (filters.language) params.set("language", filters.language);

  // Request extra fields
  params.set("return_values", "account-nickname-status-country-language-sex-audio-one2one-hd-new-priority-first_language-age-origin");

  const response = await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data: XCamsResponse = await response.json();

  if (data.success !== "Y") {
    throw new Error(`XCams API failed: ${data.message}`);
  }

  return Object.values(data.cams || {}).map(normalizeCam);
}
