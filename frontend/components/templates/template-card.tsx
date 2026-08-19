"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { QrTemplate } from "@/lib/templates/types";

type Props = {
  template: QrTemplate;
  selected?: boolean;
  onSelect: (template: QrTemplate) => void;
};

export function TemplateCard({ template, selected = false, onSelect }: Props) {
  // Step 1: Apply the template immediately when the card is activated.
  return (
    <button
      type="button"
      onClick={() => onSelect(template)}
      aria-pressed={selected}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:border-blue-400 hover:shadow",
        selected ? "border-blue-600 ring-2 ring-blue-100" : "border-slate-200",
      )}
    >
      <div className="relative aspect-square bg-slate-50">
        <Image src={template.thumbnail} alt="" fill className="object-cover" sizes="160px" unoptimized />
      </div>
      <div className="space-y-1 p-3">
        <p className="text-sm font-semibold text-slate-900">{template.name}</p>
        <p className="line-clamp-2 text-xs text-slate-500">{template.description}</p>
      </div>
    </button>
  );
}
