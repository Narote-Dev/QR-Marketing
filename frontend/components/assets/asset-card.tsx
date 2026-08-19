"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PresetAsset } from "@/lib/assets/types";

type Props = {
  asset: PresetAsset;
  selected?: boolean;
  onSelect: (asset: PresetAsset) => void;
};

export function AssetCard({ asset, selected = false, onSelect }: Props) {
  // Step 1: Present one local preset asset as a selectable thumbnail.
  return (
    <button
      type="button"
      onClick={() => onSelect(asset)}
      aria-pressed={selected}
      title={asset.description}
      className={cn(
        "overflow-hidden rounded-xl border bg-white p-2 text-left transition hover:border-blue-400",
        selected ? "border-blue-600 ring-2 ring-blue-100" : "border-slate-200",
      )}
    >
      <div className="relative aspect-square rounded-lg bg-slate-50">
        <Image src={asset.path} alt="" fill className="object-contain p-2" sizes="96px" unoptimized />
      </div>
      <p className="mt-2 truncate text-xs font-medium text-slate-700">{asset.name}</p>
    </button>
  );
}
