"use client";

import { AssetCard } from "@/components/assets/asset-card";
import { getAssetsByCategory } from "@/lib/assets/catalog";
import type { AssetCategory, PresetAsset } from "@/lib/assets/types";

type Props = {
  category: AssetCategory;
  selectedPath?: string;
  onSelect: (asset: PresetAsset) => void;
  label?: string;
};

export function AssetSelector({ category, selectedPath, onSelect, label }: Props) {
  // Step 1: Load local assets for the requested category.
  const assets = getAssetsByCategory(category);

  return (
    <div>
      {label && <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} selected={asset.path === selectedPath} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
