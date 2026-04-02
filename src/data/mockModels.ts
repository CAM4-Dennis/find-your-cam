import type { CamModel } from "@/components/CamCard";

const platforms = ["Chaturbate", "Stripchat", "Cams.com", "BongaCams", "Streamate"];
const countries = [
  { name: "Nederland", flag: "🇳🇱" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Roemenië", flag: "🇷🇴" },
  { name: "VS", flag: "🇺🇸" },
  { name: "Duitsland", flag: "🇩🇪" },
  { name: "Rusland", flag: "🇷🇺" },
  { name: "Italië", flag: "🇮🇹" },
  { name: "Spanje", flag: "🇪🇸" },
];

const names = [
  "SweetAnna", "CurvyMila", "HotBella", "SexyLuna", "NaughtyEva",
  "WildSophie", "LovelyRosa", "DreamyJade", "SpicyMaya", "PlayfulZoe",
  "GlamourLisa", "PrettyAria", "CuteNina", "DarlingIvy", "FieryRuby",
  "SilkyLeia", "VelvetKira", "MysticNova", "CherryAmi", "BlossomLily",
];

const tags = ["bigboobs", "teen", "milf", "asian", "latina", "hairy", "tattoo", "petite", "curvy", "blonde"];

// Generate placeholder image URLs using colored placeholders
const generateThumbnail = (index: number): string => {
  const colors = ["e91e63", "9c27b0", "673ab7", "3f51b5", "00bcd4", "ff5722", "795548", "607d8b", "f44336", "4caf50"];
  const color = colors[index % colors.length];
  return `https://placehold.co/320x180/${color}/ffffff?text=LIVE`;
};

export const generateMockModels = (count: number, startId = 0): CamModel[] => {
  return Array.from({ length: count }, (_, i) => {
    const idx = startId + i;
    const country = countries[idx % countries.length];
    return {
      id: `model-${idx}`,
      name: names[idx % names.length],
      age: 18 + (idx % 25),
      viewers: Math.floor(Math.random() * 5000) + 100,
      country: country.name,
      countryFlag: country.flag,
      platform: platforms[idx % platforms.length],
      thumbnail: generateThumbnail(idx),
      tags: [tags[idx % tags.length], tags[(idx + 3) % tags.length]],
      isOnline: true,
    };
  });
};

export const featuredModels = generateMockModels(10, 0);
export const topModels = generateMockModels(10, 10);
export const newModels = generateMockModels(5, 20);
