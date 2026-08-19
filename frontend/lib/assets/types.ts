export type AssetCategory = "logos" | "icons" | "backgrounds" | "template-thumbnails";

export type PresetAsset = {
  id: string;
  name: string;
  category: AssetCategory;
  /** Public path under /presets/... — replace the file to swap the demo asset. */
  path: string;
  description: string;
};

export const assetCategories: AssetCategory[] = ["logos", "icons", "backgrounds", "template-thumbnails"];
