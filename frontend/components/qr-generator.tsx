"use client";
import { useMemo, useState } from "react";
import { QrForm } from "@/components/qr-form";
import { QrPreview } from "@/components/qr-preview";
import { QrTypeSelector } from "@/components/qr-type-selector";
import { QrDesigner } from "@/components/qr-designer";
import { buildQrContent } from "@/lib/qr/content";
import { defaultQrValues, type QrFormValues, type QrType } from "@/lib/qr/types";
import { defaultQrDesign, type QrDesign } from "@/lib/qr/design";
export function QrGenerator({ initialType = "url" }: { initialType?: QrType }) {
  const [type, setType] = useState<QrType>(initialType); const [values, setValues] = useState<QrFormValues>(defaultQrValues); const [design, setDesign] = useState<QrDesign>(defaultQrDesign); const result = useMemo(() => buildQrContent(type, values), [type, values]);
  return <section aria-labelledby="generator-heading" className="rounded-3xl border bg-white p-5 shadow-sm sm:p-8"><div className="mb-7"><p className="text-sm font-semibold text-blue-700">Free static QR code generator</p><h2 id="generator-heading" className="mt-1 text-2xl font-bold tracking-tight">Create a QR code in seconds</h2><p className="mt-2 text-sm text-slate-600">Choose a type, enter your details, and scan the preview instantly. Nothing is saved.</p></div><QrTypeSelector type={type} onChange={setType} /><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"><div><QrForm type={type} values={values} onChange={setValues} error={result.error} /><QrDesigner design={design} onChange={setDesign} /></div><div><p className="mb-3 text-sm font-semibold text-slate-700">Live preview</p><QrPreview value={result.value} design={design} /></div></div></section>;
}
