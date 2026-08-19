"use client";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import { createQrStylingOptions, type QrDesign } from "@/lib/qr/design";
export function QrPreview({ value, design }: { value?: string; design: QrDesign }) {
  const ref = useRef<HTMLDivElement>(null); const qrCode = useRef<QRCodeStyling>();
  useEffect(() => { if (!ref.current) return; if (!value) { ref.current.replaceChildren(); return; } const options = createQrStylingOptions(value, design); qrCode.current ??= new QRCodeStyling(options); qrCode.current.update(options); ref.current.replaceChildren(); qrCode.current.append(ref.current); }, [value, design]);
  const frameClass = design.frame === "label" ? "border-2 border-blue-700 bg-white p-4" : design.frame === "border" ? "border-8 border-slate-900 bg-white p-3" : "";
  return <div className="flex min-h-[304px] items-center justify-center rounded-2xl border border-dashed bg-slate-50 p-3"><div className={`max-w-full ${frameClass}`}><div ref={ref} aria-label={value ? "Generated QR code preview" : undefined} />{design.frame === "label" && value && <p className="mt-2 text-center text-sm font-semibold text-slate-800">{design.frameText || "Scan me"}</p>}</div>{!value && <p className="max-w-52 text-center text-sm text-slate-500">Complete the required fields to preview your QR code.</p>}</div>;
}
