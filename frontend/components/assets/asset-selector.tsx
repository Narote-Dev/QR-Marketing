"use client";

import { AssetCard } from "@/components/assets/asset-card";
import { useDictionary } from "@/components/i18n-provider";
import { getAssetsByCategory, localizeAssets } from "@/lib/assets/catalog";
import type { AssetCategory, PresetAsset } from "@/lib/assets/types";

type Props = {
  category: AssetCategory;
  selectedPath?: string;
  onSelect: (asset: PresetAsset) => void;
  label?: string;
};

export function AssetSelector({ category, selectedPath, onSelect, label }: Props) {
  // Step 1: Load and localize assets for the requested category.
  const dictionary = useDictionary();
  const assets = localizeAssets(getAssetsByCategory(category), dictionary);

  return (
    <div>
      {label && <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>}
      {/* Change: Zero-minimum tracks prevent localized asset cards from widening mobile layouts. */}
      <div className="grid min-w-0 grid-cols-[repeat(3,minmax(0,1fr))] gap-2 sm:grid-cols-[repeat(4,minmax(0,1fr))] md:grid-cols-[repeat(5,minmax(0,1fr))]">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} selected={asset.path === selectedPath} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
