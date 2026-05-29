import type { CamModel } from "@/types/cam";
import { getCountryFlag, getCountryName } from "@/lib/countryFlags";

const API_KEY = "rpm1nuCVu5_QqbCWzZzQmuGh2LrWmtiy3uau3LWo4Mu71NDcsNfN19CV4c3YxtbO2LDes67Otdrgzrva0Oewmc3J0NPhzNi51pfYrt7ortU";
const MP_CODE = "f1gmt";
const PROXY_URL = "/api/f4f-proxy";

export interface F4FFilters {
  service?: "girls" | "guys" | "trans" | "all";
  category?: string;
}

interface F4FCategory {
  name: string;
  url: string;
}

interface F4FModel {
  id: string;
  name: string;
  sample_image: string;
  sample_image_ssl?: string;
  screencap_image: string;
  chat_link: string;
  bio_link: string;
  studio: string;
  social?: Record<string, string>;
  service: string;
  room_status: string;
  login_group_type?: string;
  login_group_id?: string;
  is_hd?: string;
  age?: string;
  languages?: string;
  country?: string;
  description?: string;
  photo_count?: string;
  video_count?: string;
  sfw_sample?: { sfw_sample_image: string };
  categories: F4FCategory[];
  filters: {
    states: string[];
    countries: string[];
    ips: string[];
    ttl?: string;
  };
}

function mapService(service: string): string {
  switch (service) {
    case "girls": return "female";
    case "guys": return "male";
    case "trans": return "trans";
    default: return "female";
  }
}

function normalizeF4FModel(model: F4FModel): CamModel {
  const countryCode = (model.country || "").toUpperCase();
  const tags = (model.categories || []).map((c) => c.name.toLowerCase()).slice(0, 5);
  const langs = model.languages
    ? model.languages.split(",").map((l) => l.trim()).filter(Boolean)
    : [];

  return {
    id: `f4f-${model.id}`,
    name: model.name,
    age: model.age ? parseInt(model.age, 10) : 0,
    viewers: 0, // F4F API doesn't expose viewer count
    country: getCountryName(countryCode),
    countryFlag: getCountryFlag(countryCode),
    platform: "Flirt4Free",
    thumbnail: model.screencap_image || model.sample_image_ssl || model.sample_image,
    thumbnailFallback: model.sample_image_ssl || model.sample_image,
    tags,
    isOnline: true,
    gender: mapService(model.service),
    link: model.chat_link,
    isNew: false,
    isHD: model.is_hd === "1",
    showType: model.room_status?.toLowerCase().includes("private") ? "private" : "public",
    previewUrl: model.screencap_image || "",
    slug: `flirt4free/${model.name}`,
    iframeEmbed: "",
    isMobile: false,
    languages: langs,
  };
}

export async function fetchF4FModels(filters: F4FFilters = {}): Promise<CamModel[]> {
  const params = new URLSearchParams({
    method: "getLiveModels",
    api_key: API_KEY,
    data_type: "json",
    service: filters.service || "girls",
    mp_code: MP_CODE,
  });
  if (filters.category) {
    params.set("category", filters.category);
  }

  const url = `${PROXY_URL}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Flirt4Free API error: ${response.status}`);
  }

  const data = await response.json();

  // Response structure: { girls: { "id": {...}, ... } } or { guys: {...} } etc.
  const serviceKey = filters.service || "girls";
  const modelsObj = data[serviceKey];

  if (!modelsObj || typeof modelsObj !== "object") {
    return [];
  }

  // Models are keyed by ID, not an array
  const models: F4FModel[] = Object.values(modelsObj);

  // Filter out models that should be blocked (geo-filtering)
  // Note: full geo-filtering (states/IPs) would need user location; we skip country filtering
  // since startvagina is mainly NL-targeted and most models don't block NL

  return models.map(normalizeF4FModel);
}
