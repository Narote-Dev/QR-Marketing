"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { useDictionary } from "@/components/i18n-provider";
import { parseStoredDesign } from "@/lib/dynamic-qr/design-storage";
import { downloadBlob, withDownloadExtension } from "@/lib/qr/export";
import { renderQrBlob } from "@/lib/qr/render";
import type { QrDesign } from "@/lib/qr/design";

type Props = {
  shortUrl: string;
  design?: unknown;
  fileBaseName?: string;
  compact?: boolean;
};

export function DynamicQrDownloadActions({ shortUrl, design, fileBaseName = "qr-dynamic", compact = false }: Props) {
  const dictionary = useDictionary();
  const copy = dictionary.dynamicQr;
  const [busy, setBusy] = useState<"png" | "svg" | false>(false);
  const [error, setError] = useState<string>();

  const resolvedDesign: QrDesign = parseStoredDesign(design);

  const handleDownload = async (format: "png" | "svg") => {
    setBusy(format);
    setError(undefined);
    try {
      const blob = await renderQrBlob(shortUrl, resolvedDesign, format, {
        composite: format === "png",
      });
      downloadBlob(blob, withDownloadExtension(fileBaseName, format));
    } catch (err) {
      setError(err instanceof Error ? err.message : dictionary.export.downloadFailed);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {!compact && !design && (
        <p className="text-xs text-slate-500">{copy.designFallbackHint}</p>
      )}
      <div className={`grid gap-2 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <button
          type="button"
          onClick={() => handleDownload("png")}
          disabled={Boolean(busy)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-teal px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal-dark disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {busy === "png" ? copy.downloadingPng : copy.downloadPngAgain}
        </button>
        <button
          type="button"
          onClick={() => handleDownload("svg")}
          disabled={Boolean(busy)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {busy === "svg" ? copy.downloadingSvg : copy.downloadSvgAgain}
        </button>
      </div>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
