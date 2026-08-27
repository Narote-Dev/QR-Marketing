"use client";

import QRCodeStyling from "qr-code-styling";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDictionary } from "@/components/i18n-provider";
import { createQrStylingOptions, type QrDesign } from "@/lib/qr/design";
import { downloadBlob, withDownloadExtension } from "@/lib/qr/export";
import { renderQrBlob } from "@/lib/qr/render";

export type QrPreviewHandle = {
  downloadPng: (fileName?: string) => Promise<void>;
  // Change: Expose scalable SVG download of the styled QR (no composite frame/background).
  downloadSvg: (fileName?: string) => Promise<void>;
};

type Props = {
  value?: string;
  design: QrDesign;
};

export const QrPreview = forwardRef<QrPreviewHandle, Props>(function QrPreview({ value, design }, ref) {
  const dictionary = useDictionary();
  const hostRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();
  const [exportError, setExportError] = useState<string>();

  // Step 1: Keep the live QR preview in sync with content and design.
  useEffect(() => {
    if (!hostRef.current) return;
    setExportError(undefined);
    if (!value) {
      hostRef.current.replaceChildren();
      return;
    }
    const options = createQrStylingOptions(value, design);
    qrCode.current ??= new QRCodeStyling(options);
    qrCode.current.update(options);
    hostRef.current.replaceChildren();
    qrCode.current.append(hostRef.current);
  }, [value, design]);

  // Step 2: Expose PNG (composite) and SVG (vector QR) downloads.
  useImperativeHandle(ref, () => ({
    async downloadPng(fileName = "qr-code.png") {
      if (!value || !qrCode.current) throw new Error(dictionary.export.noContent);
      try {
        const composed = await renderQrBlob(value, design, "png");
        downloadBlob(composed, withDownloadExtension(fileName, "png"));
        setExportError(undefined);
      } catch (error) {
        const message = error instanceof Error ? error.message : dictionary.export.downloadFailed;
        setExportError(message);
        throw error;
      }
    },
    async downloadSvg(fileName = "qr-code.svg") {
      if (!value || !qrCode.current) throw new Error(dictionary.export.noContent);
      try {
        const svgBlob = await renderQrBlob(value, design, "svg", { composite: false });
        downloadBlob(svgBlob, withDownloadExtension(fileName, "svg"));
        setExportError(undefined);
      } catch (error) {
        const message = error instanceof Error ? error.message : dictionary.export.downloadFailed;
        setExportError(message);
        throw error;
      }
    },
  }));

  const frameClass =
    design.frame === "label"
      ? "border-2 border-brand-teal-dark bg-white p-4"
      : design.frame === "border"
        ? "border-8 border-slate-900 bg-white p-3"
        : "bg-white p-3";

  return (
    <div className="space-y-3">
      <div
        className="relative flex min-h-[304px] items-center justify-center overflow-hidden rounded-2xl border border-dashed bg-slate-50 p-3"
        style={design.backgroundImage ? { backgroundImage: `url(${design.backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <div className={`relative z-10 max-w-full rounded-xl shadow-sm ${frameClass}`}>
          <div ref={hostRef} aria-label={value ? dictionary.preview.aria : undefined} />
          {design.frame === "label" && value && (
            <p className="mt-2 text-center text-sm font-semibold text-slate-800">{design.frameText || dictionary.preview.scanMe}</p>
          )}
        </div>
        {!value && <p className="relative z-10 max-w-52 text-center text-sm text-slate-500">{dictionary.preview.empty}</p>}
      </div>
      {exportError && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {exportError}
        </p>
      )}
    </div>
  );
});
