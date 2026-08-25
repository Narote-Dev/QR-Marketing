"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, LayoutTemplate } from "lucide-react";
import { formatMessage, useDictionary } from "@/components/i18n-provider";
import { TemplateGrid } from "@/components/templates/template-grid";
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

  // Change: Keep the category chip in sync when a starter or landing page updates it.
  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  // Step 3: Localize category templates and the selected template for display.
  const categoryTemplates = useMemo(
    () => localizeTemplates(getTemplatesByCategory(category), dictionary),
    [category, dictionary],
  );
  const selected = localizeTemplate(templates.find((template) => template.id === selectedId), dictionary);
  const selectedLabel = selected ? selected.name : undefined;

  return (
    // Change: Flat template picker — no nested card, no duplicate preview pane.
    <section aria-labelledby="template-heading" className="mb-8 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg text-left outline-none transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-brand-teal"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="template-panel"
        >
          <LayoutTemplate className="h-4 w-4 shrink-0 text-brand-teal-dark" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 id="template-heading" className="text-base font-semibold text-slate-900">{ui.title}</h3>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition", open ? "rotate-180" : "rotate-0")} aria-hidden="true" />
            </div>
            <p className="text-sm text-slate-500">
              {open
                ? ui.openHint
                : selectedLabel
                  ? formatMessage(ui.closedSelected, { name: selectedLabel })
                  : ui.closedNone}
            </p>
          </div>
        </button>
        {selectedId && onClear && (
          <button type="button" className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-brand-teal-dark" onClick={onClear}>
            {ui.clear}
          </button>
        )}
      </div>

      {open && (
        <div id="template-panel" className="mt-4 min-w-0 space-y-4">
          {/* Step 4: Quiet category tabs — text + underline instead of filled pills. */}
          <div className="flex gap-1 overflow-x-auto border-b border-slate-200 pb-px" role="tablist" aria-label={ui.categoriesAria}>
            {templateCategories.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => setCategory(item)}
                className={cn(
                  "-mb-px shrink-0 border-b-2 px-3 py-2 text-sm transition",
                  category === item
                    ? "border-brand-teal font-medium text-brand-teal-dark"
                    : "border-transparent text-slate-500 hover:text-slate-800",
                )}
              >
                {dictionary.categories[item]}
              </button>
            ))}
          </div>

          {/* Step 5: Compact template strip; live QR preview already shows the applied look. */}
          <TemplateGrid templates={categoryTemplates} selectedId={selectedId} onSelect={onSelect} />
        </div>
      )}
    </section>
  );
}
