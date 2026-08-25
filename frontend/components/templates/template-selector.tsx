"use client";

import { useMemo, useState } from "react";
import { ChevronDown, LayoutTemplate } from "lucide-react";
import { formatMessage, useDictionary } from "@/components/i18n-provider";
import { TemplateGrid } from "@/components/templates/template-grid";
import { TemplatePreview } from "@/components/templates/template-preview";
import { getTemplatesByCategory, localizeTemplate, localizeTemplates, templates } from "@/lib/templates/catalog";
import { templateCategories, type QrTemplate, type TemplateCategory } from "@/lib/templates/types";
import { cn } from "@/lib/utils";

type Props = {
  selectedId?: string;
  initialCategory?: TemplateCategory;
  onSelect: (template: QrTemplate) => void;
  onClear?: () => void;
};

export function TemplateSelector({ selectedId, initialCategory = "restaurant", onSelect, onClear }: Props) {
  // Step 1: Resolve templates UI copy and category labels from the dictionary.
  const dictionary = useDictionary();
  const ui = dictionary.templatesUi;

  // Step 2: Track category filter and whether the template panel is expanded.
  const [category, setCategory] = useState<TemplateCategory>(initialCategory);
  const [open, setOpen] = useState(true);

  // Step 3: Localize category templates and the selected template for display.
  const categoryTemplates = useMemo(
    () => localizeTemplates(getTemplatesByCategory(category), dictionary),
    [category, dictionary],
  );
  const selected = localizeTemplate(templates.find((template) => template.id === selectedId), dictionary);
  const selectedLabel = selected ? selected.name : undefined;

  return (
    <section aria-labelledby="template-heading" className="mb-6 min-w-0 rounded-2xl border bg-slate-50/80 p-4 sm:p-5">
      {/* Change: Make the whole Templates panel collapsible. */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-start gap-2 rounded-xl text-left outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand-teal"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="template-panel"
        >
          <LayoutTemplate className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-dark" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 id="template-heading" className="font-bold text-slate-900">{ui.title}</h3>
              <ChevronDown className={cn("h-4 w-4 text-slate-500 transition", open ? "rotate-180" : "rotate-0")} aria-hidden="true" />
            </div>
            <p className="text-sm text-slate-600">
              {open
                ? ui.openHint
                : selectedLabel
                  ? formatMessage(ui.closedSelected, { name: selectedLabel })
                  : ui.closedNone}
            </p>
          </div>
        </button>
        {selectedId && onClear && (
          <button type="button" className="text-sm font-semibold text-brand-teal-dark underline" onClick={onClear}>
            {ui.clear}
          </button>
        )}
      </div>

      {open && (
        <div id="template-panel" className="mt-4 min-w-0">
          {/* Step 4: Category chips — labels from dictionary.categories. */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label={ui.categoriesAria}>
            {templateCategories.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => setCategory(item)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                  category === item ? "border-brand-teal bg-brand-teal text-white" : "border-slate-300 bg-white text-slate-700 hover:border-brand-teal",
                )}
              >
                {dictionary.categories[item]}
              </button>
            ))}
          </div>

          {/* Step 5: Localized template grid shrinks within narrow mobile cards. */}
          {/* Change: Prevent intrinsic card widths from expanding the document. */}
          <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_240px] [&>*]:min-w-0">
            <TemplateGrid templates={categoryTemplates} selectedId={selectedId} onSelect={onSelect} />
            <TemplatePreview template={selected} />
          </div>
        </div>
      )}
    </section>
  );
}
