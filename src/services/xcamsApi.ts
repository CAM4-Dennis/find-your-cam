import type { CamModel } from "@/types/cam";
import { getCountryFlag, getCountryName } from "@/lib/countryFlags";

const GATEWAY_URL = "https://cams.dnxlive.com/gateway/gatewayPost.php";
const COMFROM = "1045042";

export interface XCamsFilters {
  gender?: "woman" | "man" | "couple" | "trans";
  limit?: number;
  offset?: number;
  orderBy?: "viewers" | "rating" | "random";
  hd?: boolean;
  language?: string;
  category?: string;
}

interface XCamsModel {
  nickname: string;
  age: number;
  sex: string;
  country: string;
  language: string;
  thumbnail: string;
  nbViewers: number;
  isHD: boolean;
  isNew: boolean;
  tags: string[];
  status: string;
  streamUrl: string;
  categories: string[];
}

interface XCamsResponse {
  status: string;
  data: {
    models: XCamsModel[];
    total: number;
  };
}

function normalizeXCamsGender(sex: string): string {
  switch (sex?.toLowerCase()) {
    case "woman": return "female";
    case "man": return "male";
    case "trans": return "trans";
    case "couple": return "couple";
    default: return sex || "female";
  }
}

function buildProfileUrl(nickname: string): string {
  return `https://www.xcams.com/profile/${nickname}/?comfrom=${COMFROM}&cf0=pc2&cfsa1=O180&cf2=Startvagina&cfsa2=&brand=y`;
}

function buildPaymentUrl(nickname: string): string {
  return `https://www.xcams.com/login/${nickname}/?comfrom=${COMFROM}&cf0=pc2&cfsa1=O180&cf2=Startvagina&cfsa2=&brand=y`;
}

function normalizeXCamsModel(model: XCamsModel): CamModel {
  const tags = (model.tags || model.categories || []).slice(0, 5);

  return {
    id: `xcams-${model.nickname}`,
    name: model.nickname,
    age: model.age || 0,
    viewers: model.nbViewers || 0,
    country: model.country ? getCountryName(model.country) : "Onbekend",
    countryFlag: model.country ? getCountryFlag(model.country) : "🌍",
    platform: "XCams",
    thumbnail: model.thumbnail || "",
    thumbnailFallback: model.thumbnail || "",
    tags,
    isOnline: true,
    gender: normalizeXCamsGender(model.sex),
    link: buildProfileUrl(model.nickname),
    isNew: model.isNew || false,
    isHD: model.isHD || false,
    showType: model.status || "public",
    previewUrl: model.streamUrl || "",
    slug: `xcams-${model.nickname}`,
    iframeEmbed: "",
    paymentUrl: buildPaymentUrl(model.nickname),
  };
}

export async function fetchXCamsRooms(filters: XCamsFilters = {}): Promise<CamModel[]> {
  const body: Record<string, string | number | boolean> = {
    method: "getCams",
    comfrom: COMFROM,
    cf0: "pc2",
    cfsa1: "O180",
    cf2: "Startvagina",
    brand: "y",
  };

  if (filters.gender) body.sex = filters.gender;
  if (filters.limit) body.limit = filters.limit;
  if (filters.offset) body.offset = filters.offset;
  if (filters.orderBy) body.orderBy = filters.orderBy;
  if (filters.hd) body.hd = 1;
  if (filters.language) body.language = filters.language;
  if (filters.category) body.category = filters.category;

  const formData = new URLSearchParams();
  for (const [key, val] of Object.entries(body)) {
    formData.set(key, String(val));
  }

  const response = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  });

  if (!response.ok) {
    throw new Error(`XCams API error: ${response.status}`);
  }

  const data: XCamsResponse = await response.json();
  return (data.data?.models || []).map(normalizeXCamsModel);
}
