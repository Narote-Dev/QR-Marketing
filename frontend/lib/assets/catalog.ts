import { presetAssetPath } from "@/lib/assets/paths";
import type { AssetCategory, PresetAsset } from "@/lib/assets/types";

/** Change: Local demo assets only — replace SVG files under public/presets to swap visuals. */
export const presetAssets: PresetAsset[] = [
  { id: "logo-restaurant", name: "Restaurant mark", category: "logos", path: presetAssetPath("logos", "restaurant.svg"), description: "Simple fork-and-plate mark for dining templates." },
  { id: "logo-cafe", name: "Cafe mark", category: "logos", path: presetAssetPath("logos", "cafe.svg"), description: "Coffee-cup mark for cafe templates." },
  { id: "logo-hotel", name: "Hotel mark", category: "logos", path: presetAssetPath("logos", "hotel.svg"), description: "Building mark for hospitality templates." },
  { id: "logo-retail", name: "Retail mark", category: "logos", path: presetAssetPath("logos", "retail.svg"), description: "Bag mark for shop templates." },
  { id: "logo-business", name: "Business mark", category: "logos", path: presetAssetPath("logos", "business.svg"), description: "Briefcase mark for professional templates." },
  { id: "logo-event", name: "Event mark", category: "logos", path: presetAssetPath("logos", "event.svg"), description: "Ticket mark for event templates." },
  { id: "logo-wifi", name: "WiFi mark", category: "logos", path: presetAssetPath("logos", "wifi.svg"), description: "Signal mark for WiFi templates." },
  { id: "logo-menu", name: "Menu mark", category: "logos", path: presetAssetPath("logos", "menu.svg"), description: "List mark for digital menu templates." },
  { id: "logo-review", name: "Review mark", category: "logos", path: presetAssetPath("logos", "review.svg"), description: "Star mark for review templates." },
  { id: "icon-scan", name: "Scan icon", category: "icons", path: presetAssetPath("icons", "scan.svg"), description: "Generic scan affordance icon." },
  { id: "icon-link", name: "Link icon", category: "icons", path: presetAssetPath("icons", "link.svg"), description: "Generic link affordance icon." },
  { id: "bg-warm", name: "Warm paper", category: "backgrounds", path: presetAssetPath("backgrounds", "warm.svg"), description: "Soft warm paper background." },
  { id: "bg-cool", name: "Cool slate", category: "backgrounds", path: presetAssetPath("backgrounds", "cool.svg"), description: "Cool slate gradient background." },
  { id: "bg-mint", name: "Mint wash", category: "backgrounds", path: presetAssetPath("backgrounds", "mint.svg"), description: "Light mint wash background." },
  { id: "thumb-restaurant", name: "Restaurant thumb", category: "template-thumbnails", path: presetAssetPath("template-thumbnails", "restaurant.svg"), description: "Thumbnail for restaurant templates." },
  { id: "thumb-cafe", name: "Cafe thumb", category: "template-thumbnails", path: presetAssetPath("template-thumbnails", "cafe.svg"), description: "Thumbnail for cafe templates." },
  { id: "thumb-hotel", name: "Hotel thumb", category: "template-thumbnails", path: presetAssetPath("template-thumbnails", "hotel.svg"), description: "Thumbnail for hotel templates." },
  { id: "thumb-retail", name: "Retail thumb", category: "template-thumbnails", path: presetAssetPath("template-thumbnails", "retail.svg"), description: "Thumbnail for retail templates." },
  { id: "thumb-business", name: "Business thumb", category: "template-thumbnails", path: presetAssetPath("template-thumbnails", "business.svg"), description: "Thumbnail for business templates." },
  { id: "thumb-event", name: "Event thumb", category: "template-thumbnails", path: presetAssetPath("template-thumbnails", "event.svg"), description: "Thumbnail for event templates." },
  { id: "thumb-wifi", name: "WiFi thumb", category: "template-thumbnails", path: presetAssetPath("template-thumbnails", "wifi.svg"), description: "Thumbnail for WiFi templates." },
  { id: "thumb-menu", name: "Menu thumb", category: "template-thumbnails", path: presetAssetPath("template-thumbnails", "menu.svg"), description: "Thumbnail for menu templates." },
  { id: "thumb-review", name: "Review thumb", category: "template-thumbnails", path: presetAssetPath("template-thumbnails", "review.svg"), description: "Thumbnail for review templates." },
];

/** Step 1: Look up a preset asset by id. */
export function getAssetById(id: string): PresetAsset | undefined {
  return presetAssets.find((asset) => asset.id === id);
}

/** Step 2: List preset assets for one category. */
export function getAssetsByCategory(category: AssetCategory): PresetAsset[] {
  return presetAssets.filter((asset) => asset.category === category);
}

/** Step 3: Resolve a public path for a known asset id. */
export function getAssetPath(id: string): string | undefined {
  return getAssetById(id)?.path;
}

/** Step 4: Overlay translated asset labels for UI cards. */
export function localizeAsset(asset: PresetAsset, dictionary: import("@/lib/i18n/types").Dictionary): PresetAsset {
  const copy = dictionary.assetCopy[asset.id];
  if (!copy) return asset;
  return { ...asset, name: copy.name, description: copy.description };
}

export function localizeAssets(list: PresetAsset[], dictionary: import("@/lib/i18n/types").Dictionary): PresetAsset[] {
  return list.map((asset) => localizeAsset(asset, dictionary));
}
