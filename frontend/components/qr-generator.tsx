"use client";

import { useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import { QrForm } from "@/components/qr-form";
import { QrPreview, type QrPreviewHandle } from "@/components/qr-preview";
import { QrTypeSelector } from "@/components/qr-type-selector";
import { QrDesigner } from "@/components/qr-designer";
import { TemplateSelector } from "@/components/templates/template-selector";
import { buildQrContent } from "@/lib/qr/content";
import { defaultQrValues, type QrFormValues, type QrType } from "@/lib/qr/types";
import { defaultQrDesign, type QrDesign } from "@/lib/qr/design";
import { applyTemplate, clearTemplateDesign } from "@/lib/templates/apply";
import type { QrTemplate, TemplateCategory } from "@/lib/templates/types";

type Props = {
  initialType?: QrType;
  initialTemplateCategory?: TemplateCategory;
};

export function QrGenerator({ initialType = "url", initialTemplateCategory }: Props) {
  // Step 1: Own content, design, and selected template state in one place.
  const [type, setType] = useState<QrType>(initialType);
  const [values, setValues] = useState<QrFormValues>(defaultQrValues);
  const [design, setDesign] = useState<QrDesign>(defaultQrDesign);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>();
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string>();
  const previewRef = useRef<QrPreviewHandle>(null);
  const result = useMemo(() => buildQrContent(type, values), [type, values]);

  // Step 2: Applying a template only updates design; QR content stays untouched.
  const handleSelectTemplate = (template: QrTemplate) => {
    setSelectedTemplateId(template.id);
    setDesign(applyTemplate(template));
  };

  const handleClearTemplate = () => {
    setSelectedTemplateId(undefined);
    setDesign(clearTemplateDesign());
  };

  // Step 3: Download a full composite PNG when the QR payload is valid.
  const handleDownload = async () => {
    if (!result.value || result.error) return;
    setDownloading(true);
    setDownloadError(undefined);
    try {
      await previewRef.current?.downloadPng(`qr-${type}.png`);
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : "Download failed.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section aria-labelledby="generator-heading" className="rounded-3xl border bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold text-blue-700">Free static QR code generator</p>
        <h2 id="generator-heading" className="mt-1 text-2xl font-bold tracking-tight">Create a QR code in seconds</h2>
        <p className="mt-2 text-sm text-slate-600">Choose a template, enter your details, customize the design, and download a composite preview. Nothing is saved.</p>
      </div>

      <TemplateSelector
        selectedId={selectedTemplateId}
        initialCategory={initialTemplateCategory}
        onSelect={handleSelectTemplate}
        onClear={handleClearTemplate}
      />

      <QrTypeSelector type={type} onChange={setType} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <QrForm type={type} values={values} onChange={setValues} error={result.error} />
          <QrDesigner design={design} onChange={setDesign} />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-700">Live preview</p>
          <QrPreview ref={previewRef} value={result.value} design={design} />
          <button
            type="button"
            onClick={handleDownload}
            disabled={!result.value || Boolean(result.error) || downloading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {downloading ? "Preparing download…" : "Download PNG"}
          </button>
          {downloadError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{downloadError}</p>}
          <p className="text-xs text-slate-500">Downloads include the QR code plus frame, label text, and background when selected.</p>
        </div>
      </div>
    </section>
  );
}
