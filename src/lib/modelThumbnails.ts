/**
 * Generate a thumbnail URL for a cam model based on platform and username.
 * These use known CDN patterns from each platform.
 */
export function getModelThumbnail(platform: string, username: string): string {
  switch (platform) {
    case "Chaturbate":
      return `https://roomimg.stream.highwebmedia.com/ri/${username}.jpg`;
    case "Stripchat":
      return `https://img.strpst.com/thumbs/0/${username}_webp`;
    case "BongaCams":
      return `https://tools.bongacams.com/thumb.php?useraccount=${username}&size=preview`;
    case "CAM4":
      return `https://snapshots.xcdnpro.com/thumbnails/${username}?s=480`;
    default:
      return "";
  }
}

export const FALLBACK_THUMB = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' fill='%231a1d27'%3E%3Crect width='320' height='180'/%3E%3Ctext x='160' y='95' text-anchor='middle' fill='%23555' font-size='14' font-family='sans-serif'%3EOffline%3C/text%3E%3C/svg%3E";
