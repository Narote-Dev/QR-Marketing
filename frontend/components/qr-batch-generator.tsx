"use client";

import { useMemo, useRef, useState } from "react";
import { Download, FileUp } from "lucide-react";
import { useDictionary } from "@/components/i18n-provider";
import { QrDesigner } from "@/components/qr-designer";
import { QrPreview } from "@/components/qr-preview";
import { TemplateSelector } from "@/components/templates/template-selector";
import { buildMixedTypeSampleCsv, buildSampleCsvForType, bulkSampleFileName, parseBatchCsv } from "@/lib/qr/batch/csv";
import { BATCH_MAX_ROWS, BATCH_PREVIEW_ROWS, type BatchRowValidated } from "@/lib/qr/batch/types";
import { downloadBatchZip, exportBatchZip } from "@/lib/qr/batch/export-zip";
import { batchB1Types, batchRowSummary, batchTypeLabel, type BatchB1Type } from "@/lib/qr/batch/schema";
import { partitionBatchRows, validateBatchRows } from "@/lib/qr/batch/validate";
import { defaultQrDesign, type QrDesign } from "@/lib/qr/design";
import { downloadBlob } from "@/lib/qr/export";
import { applyTemplate, clearTemplateDesign } from "@/lib/templates/apply";
import { localizeTemplate } from "@/lib/templates/catalog";
import type { QrTemplate, TemplateCategory } from "@/lib/templates/types";

const SAMPLE_PREVIEW_URL = "https://example.com/menu";

export function QrBatchGenerator() {
  const dictionary = useDictionary();
  const copy = dictionary.bulkQr;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [design, setDesign] = useState<QrDesign>({ ...defaultQrDesign, frameText: dictionary.preview.scanMe });
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>();
  const [templateCategory, setTemplateCategory] = useState<TemplateCategory>("restaurant");
  const [rows, setRows] = useState<BatchRowValidated[]>([]);
  const [csvError, setCsvError] = useState<string>();
  const [csvTruncated, setCsvTruncated] = useState(false);
  const [fileName, setFileName] = useState<string>();
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<{ done: number; total: number }>();
  const [exportError, setExportError] = useState<string>();
  const [sampleType, setSampleType] = useState<BatchB1Type>("url");

  const { valid, invalid } = useMemo(() => partitionBatchRows(rows), [rows]);
  const previewRows = rows.slice(0, BATCH_PREVIEW_ROWS);

  // Step 1: Prefer the first ready CSV row for live preview; otherwise show a sample URL.
  const previewSource = valid[0];
  const previewValue = previewSource?.payload ?? SAMPLE_PREVIEW_URL;
  const previewDesign = useMemo(
    () => (previewSource?.label ? { ...design, frameText: previewSource.label } : design),
    [design, previewSource?.label],
  );

  const handleSelectTemplate = (template: QrTemplate) => {
    const localized = localizeTemplate(template, dictionary) ?? template;
    setSelectedTemplateId(localized.id);
    setTemplateCategory(localized.category);
    setDesign(applyTemplate(localized));
  };

  const handleClearTemplate = () => {
    setSelectedTemplateId(undefined);
    setDesign({ ...clearTemplateDesign(), frameText: dictionary.preview.scanMe });
  };

  const applyCsvText = (text: string, sourceName?: string) => {
    const parsed = parseBatchCsv(text, {
      empty: copy.csvEmpty,
      tooMany: copy.csvTooMany.replace("{max}", String(BATCH_MAX_ROWS)),
      noUrlColumn: copy.csvNoUrlColumn,
      unsupportedType: copy.csvUnsupportedType,
    });

    setCsvTruncated(Boolean(parsed.truncated));
    setCsvError(parsed.error);
    setFileName(sourceName);

    if (parsed.rows.length === 0) {
      setRows([]);
      return;
    }

    setRows(validateBatchRows(parsed.rows, dictionary));
  };

  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv") && file.type !== "text/csv") {
      setCsvError(copy.csvInvalidType);
      return;
    }
    const text = await file.text();
    applyCsvText(text, file.name);
  };

  const handleSampleDownload = () => {
    const blob = new Blob([buildSampleCsvForType(sampleType)], { type: "text/csv;charset=utf-8" });
    downloadBlob(blob, bulkSampleFileName(sampleType));
  };

  const handleExportZip = async () => {
    if (valid.length === 0) return;
    setExporting(true);
    setExportError(undefined);
    setExportProgress({ done: 0, total: valid.length });
    try {
      const zipBlob = await exportBatchZip(valid, design, (done, total) => {
        setExportProgress({ done, total });
      });
      downloadBatchZip(zipBlob, copy.zipFileName);
    } catch (error) {
      setExportError(error instanceof Error ? error.message : copy.zipFailed);
    } finally {
      setExporting(false);
      setExportProgress(undefined);
    }
  };

  return (
    <section aria-labelledby="bulk-generator-heading" className="min-w-0 rounded-3xl border bg-white p-4 shadow-sm sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold text-brand-teal-dark">{copy.eyebrow}</p>
        <h2 id="bulk-generator-heading" className="mt-1 text-2xl font-bold tracking-tight">
          {copy.heading}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{copy.intro}</p>
        <p className="mt-2 text-sm">
          <a href="#bulk-qr-guide" className="font-semibold text-brand-teal-dark hover:text-brand-coral hover:underline">
            {copy.guideLink}
          </a>
        </p>
      </div>

      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="min-w-0 space-y-10">
          <section aria-labelledby="bulk-step-1">
            <h3 id="bulk-step-1" className="mb-4 text-lg font-bold tracking-tight text-slate-900">
              {copy.step1Title}
            </h3>
            <p className="mb-4 text-sm text-slate-600">{copy.csvHint.replace("{max}", String(BATCH_MAX_ROWS))}</p>

            <div className="mb-4 space-y-2">
              <label htmlFor="bulk-sample-type" className="block text-sm font-semibold text-slate-800">
                {copy.sampleTypeLabel}
              </label>
              <p className="text-sm text-slate-600">{copy.sampleTypeHint}</p>
              <select
                id="bulk-sample-type"
                value={sampleType}
                onChange={(event) => setSampleType(event.target.value as BatchB1Type)}
                className="w-full max-w-md rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
              >
                {batchB1Types.map((type) => (
                  <option key={type} value={type}>
                    {dictionary.types[type]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal-dark"
              >
                <FileUp className="h-4 w-4" aria-hidden="true" />
                {copy.csvUpload}
              </button>
              <button
                type="button"
                onClick={handleSampleDownload}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {copy.csvSampleDownload}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={(event) => {
                void handleFileChange(event.target.files?.[0]);
                event.target.value = "";
              }}
            />

            {fileName && (
              <p className="mt-3 text-sm text-slate-600">
                {copy.csvLoaded.replace("{name}", fileName)}
              </p>
            )}

            {(csvError || csvTruncated) && (
              <p role="alert" className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
                {csvError}
              </p>
            )}

            {rows.length > 0 && (
              <div className="mt-6 overflow-x-auto rounded-xl border">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2">{copy.rowColumnType}</th>
                      <th className="px-3 py-2">{copy.rowColumnContent}</th>
                      <th className="px-3 py-2">{copy.rowColumnFile}</th>
                      <th className="px-3 py-2">{copy.rowColumnLabel}</th>
                      <th className="px-3 py-2">{copy.rowColumnStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row) => (
                      <tr key={row.id} className="border-t">
                        <td className="px-3 py-2 font-medium text-slate-800">{batchTypeLabel(row.type)}</td>
                        <td className="max-w-[12rem] truncate px-3 py-2 font-mono text-xs">
                          {batchRowSummary(row.type, row.fields)}
                        </td>
                        <td className="px-3 py-2">{row.label ?? "—"}</td>
                        <td className="px-3 py-2">
                          {row.payload ? (
                            <span className="text-green-700">{copy.rowValid}</span>
                          ) : (
                            <span className="text-red-700" title={row.error}>
                              {copy.rowInvalid}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rows.length > BATCH_PREVIEW_ROWS && (
                  <p className="border-t px-3 py-2 text-xs text-slate-500">
                    {copy.previewLimitNote.replace("{shown}", String(BATCH_PREVIEW_ROWS)).replace("{total}", String(rows.length))}
                  </p>
                )}
              </div>
            )}
          </section>

          <section aria-labelledby="bulk-step-2" className="border-t pt-10">
            <h3 id="bulk-step-2" className="mb-4 text-lg font-bold tracking-tight text-slate-900">
              {copy.step2Title}
            </h3>
            <TemplateSelector
              selectedId={selectedTemplateId}
              initialCategory={templateCategory}
              onSelect={handleSelectTemplate}
              onClear={handleClearTemplate}
            />
            <QrDesigner design={design} onChange={setDesign} />
          </section>
        </div>

        <section aria-labelledby="bulk-step-3" className="min-w-0 space-y-3 lg:sticky lg:top-6 lg:self-start">
          <h3 id="bulk-step-3" className="text-lg font-bold tracking-tight text-slate-900">
            {copy.step3Title}
          </h3>

          {/* Change: Live QR sample so template/design changes are visible before ZIP export. */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700">{copy.livePreview}</p>
            <QrPreview value={previewValue} design={previewDesign} />
            <p className="text-xs text-slate-500">
              {previewSource
                ? copy.livePreviewFromCsv.replace("{file}", previewSource.fileName)
                : copy.livePreviewSample}
            </p>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-4 text-sm text-slate-700">
            <p>{copy.rowsSummary.replace("{valid}", String(valid.length)).replace("{total}", String(rows.length))}</p>
            {invalid.length > 0 && (
              <p className="mt-2 text-amber-800">
                {copy.invalidRowsNote.replace("{count}", String(invalid.length))}
              </p>
            )}
          </div>

          {exportProgress && (
            <p className="text-sm font-medium text-brand-teal-dark">
              {copy.progressLabel
                .replace("{done}", String(exportProgress.done))
                .replace("{total}", String(exportProgress.total))}
            </p>
          )}

          <button
            type="button"
            onClick={() => void handleExportZip()}
            disabled={valid.length === 0 || exporting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-teal-dark disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {exporting ? copy.preparingZip : copy.downloadZip.replace("{count}", String(valid.length))}
          </button>

          {exportError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {exportError}
            </p>
          )}

          <p className="text-xs text-slate-500">{copy.zipHint}</p>
        </section>
      </div>
    </section>
  );
}
