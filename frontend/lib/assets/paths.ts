import type { AssetCategory } from "@/lib/assets/types";

const folderByCategory: Record<AssetCategory, string> = {
  logos: "logos",
  icons: "icons",
  backgrounds: "backgrounds",
  "template-thumbnails": "thumbnails",
};

/** Step 1: Build a stable public URL for a local preset asset file. */
export function presetAssetPath(category: AssetCategory, fileName: string): string {
  return `/presets/${folderByCategory[category]}/${fileName}`;
}

/** Step 2: Build a stable public URL for a template preview image. */
export function presetPreviewPath(fileName: string): string {
  return `/presets/previews/${fileName}`;
}
