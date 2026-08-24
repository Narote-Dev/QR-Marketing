"use client";

import { useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import { useDictionary } from "@/components/i18n-provider";
import { QrForm } from "@/components/qr-form";
import { QrPreview, type QrPreviewHandle } from "@/components/qr-preview";
import { QrTypeSelector } from "@/components/qr-type-selector";
import { QrDesigner } from "@/components/qr-designer";
import { TemplateSelector } from "@/components/templates/template-selector";
import { buildQrContent } from "@/lib/qr/content";
import { defaultQrValues, type QrFormValues, type QrType } from "@/lib/qr/types";
import { defaultQrDesign, type QrDesign } from "@/lib/qr/design";
import { applyTemplate, clearTemplateDesign } from "@/lib/templates/apply";
import { getTemplateById, localizeTemplate } from "@/lib/templates/catalog";
import type { QrTemplate, TemplateCategory } from "@/lib/templates/types";

type Props = {
  initialType?: QrType;
  initialTemplateCategory?: TemplateCategory;
  // Change: Long-tail pages can preselect a template and frame label.
  initialTemplateId?: string;
  initialFrameText?: string;
  downloadFileName?: string;
  helperHint?: string;
};

export function QrGenerator({
  initialType = "url",
  initialTemplateCategory,
  initialTemplateId,
  initialFrameText,
  downloadFileName,
  helperHint,
}: Props) {
  const dictionary = useDictionary();

  // Step 1: Resolve an optional starter template for intent-matched landing pages.
  const starterTemplate = useMemo(() => {
    if (!initialTemplateId) return undefined;
    const template = getTemplateById(initialTemplateId);
    return localizeTemplate(template, dictionary) ?? template;
  }, [dictionary, initialTemplateId]);

  // Step 2: Own content, design, and selected template state in one place.
  const [type, setType] = useState<QrType>(initialType);
  const [values, setValues] = useState<QrFormValues>(defaultQrValues);
  const [design, setDesign] = useState<QrDesign>(() => {
    if (starterTemplate) {
      const next = applyTemplate(starterTemplate);
      return initialFrameText ? { ...next, frameText: initialFrameText } : next;
    }
    return { ...defaultQrDesign, frameText: initialFrameText ?? dictionary.preview.scanMe };
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>(starterTemplate?.id);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string>();
  const previewRef = useRef<QrPreviewHandle>(null);
  const result = useMemo(() => buildQrContent(type, values, dictionary), [type, values, dictionary]);

  // Step 3: Applying a template only updates design; QR content stays untouched.
  const handleSelectTemplate = (template: QrTemplate) => {
    const localized = localizeTemplate(template, dictionary) ?? template;
    setSelectedTemplateId(localized.id);
    setDesign(applyTemplate(localized));
  };

  const handleClearTemplate = () => {
    setSelectedTemplateId(undefined);
    setDesign({ ...clearTemplateDesign(), frameText: initialFrameText ?? dictionary.preview.scanMe });
  };

  // Step 4: Download a full composite PNG when the QR payload is valid.
  const handleDownload = async () => {
    if (!result.value || result.error) return;
    setDownloading(true);
    setDownloadError(undefined);
    try {
      await previewRef.current?.downloadPng(downloadFileName ?? `qr-${type}.png`);
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : dictionary.generator.downloadFailed);
    } finally {
      setDownloading(false);
    }
  };

  return (
    // Change: Reduce narrow-screen padding and allow nested grid columns to shrink.
    <section aria-labelledby="generator-heading" className="min-w-0 rounded-3xl border bg-white p-4 shadow-sm sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold text-brand-teal-dark">{dictionary.generator.eyebrow}</p>
        <h2 id="generator-heading" className="mt-1 text-2xl font-bold tracking-tight">
          {dictionary.generator.heading}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{dictionary.generator.intro}</p>
        {helperHint && <p className="mt-3 rounded-xl bg-brand-cream px-3 py-2 text-sm text-brand-ink">{helperHint}</p>}
      </div>

      <TemplateSelector
        selectedId={selectedTemplateId}
        initialCategory={initialTemplateCategory ?? starterTemplate?.category}
        onSelect={handleSelectTemplate}
        onClear={handleClearTemplate}
      />

      <QrTypeSelector type={type} onChange={setType} />

      <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <QrForm type={type} values={values} onChange={setValues} error={result.error} />
          <QrDesigner design={design} onChange={setDesign} />
        </div>
        <div className="min-w-0 space-y-3">
          <p className="text-sm font-semibold text-slate-700">{dictionary.generator.livePreview}</p>
          <QrPreview ref={previewRef} value={result.value} design={design} />
          <button
            type="button"
            onClick={handleDownload}
            disabled={!result.value || Boolean(result.error) || downloading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-teal-dark disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {downloading ? dictionary.generator.preparingDownload : dictionary.generator.downloadPng}
          </button>
          {downloadError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {downloadError}
            </p>
          )}
          <p className="text-xs text-slate-500">{dictionary.generator.downloadHint}</p>
        </div>
      </div>
    </section>
  );
}
