"use client";

import Image from "next/image";
import type { QrTemplate } from "@/lib/templates/types";

type Props = {
  template?: QrTemplate;
};

export function TemplatePreview({ template }: Props) {
  // Step 1: Show the selected template preview image, or an empty state.
  if (!template) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed bg-slate-50 px-4 text-center text-sm text-slate-500">
        Select a template to preview its look before entering QR content.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative aspect-[4/5] bg-slate-50 sm:aspect-square">
        <Image src={template.previewImage} alt={`${template.name} preview`} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 320px" unoptimized />
      </div>
      <div className="space-y-1 border-t p-4">
        <p className="text-sm font-semibold text-slate-900">{template.name}</p>
        <p className="text-sm text-slate-600">{template.description}</p>
      </div>
    </div>
  );
}
