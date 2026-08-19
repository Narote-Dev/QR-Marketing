"use client";

import { AssetSelector } from "@/components/assets/asset-selector";
import type { AssetCategory, PresetAsset } from "@/lib/assets/types";

type Props = {
  category: Extract<AssetCategory, "logos" | "backgrounds" | "icons">;
  selectedPath?: string;
  onSelect: (path: string) => void;
  onClear?: () => void;
  label: string;
};

/**
 * Change: Thin wrapper used by the QR designer for preset logos/backgrounds.
 * Step 1: Forward selection as a public asset path the design state can store.
 */
export function PresetImageSelector({ category, selectedPath, onSelect, onClear, label }: Props) {
  const handleSelect = (asset: PresetAsset) => onSelect(asset.path);

  return (
    <div className="rounded-xl border bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {selectedPath && onClear && (
          <button type="button" className="text-xs font-semibold text-blue-700 underline" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      <AssetSelector category={category} selectedPath={selectedPath} onSelect={handleSelect} />
    </div>
  );
}
