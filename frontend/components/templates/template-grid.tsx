"use client";

import { TemplateCard } from "@/components/templates/template-card";
import type { QrTemplate } from "@/lib/templates/types";

type Props = {
  templates: QrTemplate[];
  selectedId?: string;
  onSelect: (template: QrTemplate) => void;
};

export function TemplateGrid({ templates, selectedId, onSelect }: Props) {
  // Step 1: Render a responsive grid of selectable template cards.
  if (templates.length === 0) {
    return <p className="rounded-xl border border-dashed bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No templates in this category yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} selected={template.id === selectedId} onSelect={onSelect} />
      ))}
    </div>
  );
}
