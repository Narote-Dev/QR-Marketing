"use client";

import { useMemo, useState } from "react";
import { ChevronDown, LayoutTemplate } from "lucide-react";
import { TemplateGrid } from "@/components/templates/template-grid";
import { TemplatePreview } from "@/components/templates/template-preview";
import { getTemplatesByCategory, templates } from "@/lib/templates/catalog";
import { templateCategories, templateCategoryLabels, type QrTemplate, type TemplateCategory } from "@/lib/templates/types";
import { cn } from "@/lib/utils";

type Props = {
  selectedId?: string;
  initialCategory?: TemplateCategory;
  onSelect: (template: QrTemplate) => void;
  onClear?: () => void;
};

export function TemplateSelector({ selectedId, initialCategory = "restaurant", onSelect, onClear }: Props) {
  // Step 1: Track category filter and whether the template panel is expanded.
  const [category, setCategory] = useState<TemplateCategory>(initialCategory);
  const [open, setOpen] = useState(true);
  const categoryTemplates = useMemo(() => getTemplatesByCategory(category), [category]);
  const selected = templates.find((template) => template.id === selectedId);
  const selectedLabel = selected ? selected.name : undefined;

  return (
    <section aria-labelledby="template-heading" className="mb-8 rounded-2xl border bg-slate-50/80 p-4 sm:p-5">
      {/* Change: Make the whole Templates panel collapsible. */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-start gap-2 rounded-xl text-left outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-600"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="template-panel"
        >
          <LayoutTemplate className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 id="template-heading" className="font-bold text-slate-900">Templates</h3>
              <ChevronDown className={cn("h-4 w-4 text-slate-500 transition", open ? "rotate-180" : "rotate-0")} aria-hidden="true" />
            </div>
            <p className="text-sm text-slate-600">
              {open
                ? "Pick a visual preset, then enter your QR content and customize further."
                : selectedLabel
                  ? `Using ${selectedLabel}. Open to change templates.`
                  : "Closed. Open to pick a visual preset."}
            </p>
          </div>
        </button>
        {selectedId && onClear && (
          <button type="button" className="text-sm font-semibold text-blue-700 underline" onClick={onClear}>
            Clear template
          </button>
        )}
      </div>

      {open && (
        <div id="template-panel" className="mt-4">
          {/* Step 2: Category chips — responsive wrap for mobile. */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Template categories">
            {templateCategories.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => setCategory(item)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                  category === item ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-blue-400",
                )}
              >
                {templateCategoryLabels[item]}
              </button>
            ))}
          </div>

          {/* Step 3: Template grid + live static preview of the selected card. */}
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
            <TemplateGrid templates={categoryTemplates} selectedId={selectedId} onSelect={onSelect} />
            <TemplatePreview template={selected} />
          </div>
        </div>
      )}
    </section>
  );
}
