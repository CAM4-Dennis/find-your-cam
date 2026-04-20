const BASE_URL = "https://api.cam4.com/rest/v1.0";

/* ── Types ── */

export interface NicheMedia {
  mediaId: number;
  url: string;
  smallSizeImageUrl: string;
  mediumSizeImageUrl: string;
  transformations: { crop?: string } | null;
}

export interface NicheItem {
  slug: string;
  name: { translationKey: string; originalText: string };
  description: { translationKey: string; originalText: string };
  bannerMedia: NicheMedia;
  thumbnailMedia: NicheMedia;
  gender: string;
  stats: { membersCount: number; postsCount: number };
}

export interface NicheListResponse {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
  content: NicheItem[];
}

export interface PostMedia {
  id: number;
  mediaType: "VIDEO" | "IMAGE";
  approvalStatus: string;
  mediaUrl: string;
  thumbnailUrl: string;
  duration?: number; // ms, present for VIDEO
}

export interface NichePost {
  id: number;
  title: string;
  username: string;
  approvalStatus: string;
  visible: boolean;
  ownerInfo: {
    gender: string;
    avatarUrl: string;
    avatarSmallSizeUrl: string;
  };
  createdAt: number;
  text: string;
  visibility: string;
  commentsCount: number;
  type: string;
  reactionsCount: number;
  medias: PostMedia[];
  viewsCount: number;
  coverMediaId: number;
  coverThumbnailUrl: string;
  nicheSlug: string;
  nicheName: { translationKey: string; originalText: string };
}

export interface NicheFeedResponse {
  content: NichePost[];
  nextCursor?: string;
}

/* ── API calls ── */

export async function fetchNiches(params: {
  gender?: string;
  sortStrategy?: string;
  size?: number;
  page?: number;
} = {}): Promise<NicheListResponse> {
  const qs = new URLSearchParams();
  qs.set("size", String(params.size ?? 50));
  qs.set("sortStrategy", params.sortStrategy ?? "MOST_POPULAR");
  if (params.gender) qs.set("gender", params.gender);
  if (params.page !== undefined) qs.set("page", String(params.page));

  const res = await fetch(`${BASE_URL}/niches?${qs}`);
  if (!res.ok) throw new Error(`Niche API error: ${res.status}`);
  return res.json();
}

export async function fetchNicheFeed(
  nicheSlug: string,
  params: {
    mediaType?: "VIDEO" | "IMAGE";
    sortStrategy?: string;
    size?: number;
    cursor?: string;
    gender?: string;
  } = {},
): Promise<NicheFeedResponse> {
  const qs = new URLSearchParams();
  qs.set("size", String(params.size ?? 20));
  qs.set("sortStrategy", params.sortStrategy ?? "TRENDING");
  if (params.mediaType) qs.set("mediaType", params.mediaType);
  if (params.cursor) qs.set("cursor", params.cursor);
  if (params.gender) qs.set("gender", params.gender);

  const res = await fetch(`${BASE_URL}/niches/${encodeURIComponent(nicheSlug)}/feed?${qs}`);
  if (!res.ok) throw new Error(`Niche feed error: ${res.status}`);
  return res.json();
}
