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

  // Step 2: Render a responsive grid of selectable template cards.
  if (templates.length === 0) {
    return <p className="rounded-xl border border-dashed bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">{dictionary.templatesUi.emptyGrid}</p>;
  }

  return (
    // Change: Zero-minimum grid tracks keep template cards inside mobile containers.
    <div className="grid min-w-0 grid-cols-[repeat(2,minmax(0,1fr))] gap-3 sm:grid-cols-[repeat(3,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))]">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} selected={template.id === selectedId} onSelect={onSelect} />
      ))}
    </div>
  );
}
