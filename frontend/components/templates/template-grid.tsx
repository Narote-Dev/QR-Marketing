"use client";

import { useDictionary } from "@/components/i18n-provider";
import { TemplateCard } from "@/components/templates/template-card";
import type { QrTemplate } from "@/lib/templates/types";

type Props = {
  templates: QrTemplate[];
  selectedId?: string;
  onSelect: (template: QrTemplate) => void;
};

export function TemplateGrid({ templates, selectedId, onSelect }: Props) {
  // Step 1: Resolve empty-grid copy from the dictionary.
  const dictionary = useDictionary();

  // Step 2: Render a compact horizontal strip of template thumbnails.
  if (templates.length === 0) {
    return <p className="py-4 text-sm text-slate-500">{dictionary.templatesUi.emptyGrid}</p>;
  }

  return (
    <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} selected={template.id === selectedId} onSelect={onSelect} />
      ))}
    </div>
  );
}
