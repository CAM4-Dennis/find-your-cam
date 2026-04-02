export interface Cam4Model {
  id: number;
  nickname: string;
  gender: string;
  thumb: string;
  thumb_big: string;
  thumb_error: string;
  profile_thumb: string;
  profile_thumb_sfw: string;
  country: string;
  sex_preference: string;
  link: string;
  status: string;
  viewers: number;
  preview_url: string;
  daily_award: boolean;
  monthly_award: boolean;
  hd_stream: string | null;
  show_type: string;
  source: string;
  private_room: boolean;
  new_performer: boolean;
  languages: string[];
  has_shop_content: boolean;
  kiiroo: boolean;
  mobile: boolean;
  goal: number;
  goal_balance: number;
  age: number;
  show_tags: string[];
  broadcast_type: string;
}

// Normalized model used by the UI
export interface CamModel {
  id: string;
  name: string;
  age: number;
  viewers: number;
  country: string;
  countryFlag: string;
  platform: string;
  thumbnail: string;
  thumbnailFallback: string;
  tags: string[];
  isOnline: boolean;
  gender: string;
  link: string;
  isNew: boolean;
  isHD: boolean;
  showType: string;
  previewUrl: string;
  slug: string;
}
