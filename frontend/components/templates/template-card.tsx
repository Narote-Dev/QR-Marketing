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
  // Step 1: Compact thumbnail + name — description stays on the live preview path.
  return (
    <button
      type="button"
      onClick={() => onSelect(template)}
      aria-pressed={selected}
      className={cn(
        "flex w-[7.5rem] shrink-0 flex-col overflow-hidden rounded-xl border bg-white text-left transition",
        selected ? "border-brand-teal bg-brand-cream/40" : "border-slate-200 hover:border-brand-teal-light",
      )}
    >
      <div className="relative aspect-square bg-slate-50">
        <Image src={template.thumbnail} alt="" fill className="object-cover" sizes="120px" unoptimized />
      </div>
      <p className="truncate px-2.5 py-2 text-xs font-medium text-slate-800">{template.name}</p>
    </button>
  );
}
