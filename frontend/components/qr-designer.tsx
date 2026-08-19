"use client";

import type { ChangeEvent, ReactNode } from "react";
import { ImagePlus, SlidersHorizontal } from "lucide-react";
import { PresetImageSelector } from "@/components/assets/preset-image-selector";
import type { QrDesign } from "@/lib/qr/design";

type Props = { design: QrDesign; onChange: (design: QrDesign) => void };
const selectStyle = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
function Label({ children }: { children: ReactNode }) { return <label className="block text-sm font-medium text-slate-700">{children}</label>; }
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <Label>{label}<span className="mt-1 flex gap-2"><input className="h-10 w-12 cursor-pointer rounded border border-slate-300 p-1" type="color" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} /><input className={selectStyle.replace("mt-1 ", "")} value={value} onChange={(event) => onChange(event.target.value)} aria-label={`${label} hex value`} /></span></Label>; }

export function QrDesigner({ design, onChange }: Props) {
  // Step 1: Patch a single design field while preserving the rest of the state.
  const set = <K extends keyof QrDesign>(key: K, value: QrDesign[K]) => onChange({ ...design, [key]: value });

  // Step 2: Keep the existing file-upload path for custom logos.
  const uploadLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => set("logo", String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <section aria-labelledby="designer-heading" className="mt-8 border-t pt-8">
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal size={20} className="text-blue-700" aria-hidden="true" />
        <div>
          <h3 id="designer-heading" className="font-bold">QR designer</h3>
          <p className="text-sm text-slate-600">Customize the preview without changing your QR content.</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <ColorInput label="Foreground color" value={design.foregroundColor} onChange={(value) => set("foregroundColor", value)} />
        <ColorInput label="Background color" value={design.backgroundColor} onChange={(value) => set("backgroundColor", value)} />
        <Label>Dot style<select className={selectStyle} value={design.dotStyle} onChange={(event) => set("dotStyle", event.target.value as QrDesign["dotStyle"])}><option value="dots">Dots</option><option value="rounded">Rounded</option><option value="square">Square</option><option value="extra-rounded">Extra rounded</option><option value="classy">Classy</option><option value="classy-rounded">Classy rounded</option></select></Label>
        <Label>Outer eye style<select className={selectStyle} value={design.outerEyeStyle} onChange={(event) => set("outerEyeStyle", event.target.value as QrDesign["outerEyeStyle"])}><option value="square">Square</option><option value="dot">Dot</option><option value="rounded">Rounded</option><option value="extra-rounded">Extra rounded</option></select></Label>
        <Label>Inner eye style<select className={selectStyle} value={design.innerEyeStyle} onChange={(event) => set("innerEyeStyle", event.target.value as QrDesign["innerEyeStyle"])}><option value="dot">Dot</option><option value="square">Square</option><option value="rounded">Rounded</option><option value="extra-rounded">Extra rounded</option></select></Label>
        <Label>Error correction<select className={selectStyle} value={design.errorCorrectionLevel} onChange={(event) => set("errorCorrectionLevel", event.target.value as QrDesign["errorCorrectionLevel"])}><option value="L">Low (L)</option><option value="M">Medium (M)</option><option value="Q">Quartile (Q)</option><option value="H">High (H)</option></select></Label>
        <Label>QR size <output className="float-right text-slate-500">{design.size}px</output><input className="mt-3 w-full accent-blue-600" type="range" min="160" max="480" step="10" value={design.size} onChange={(event) => set("size", Number(event.target.value))} /></Label>
        <Label>Logo size <output className="float-right text-slate-500">{Math.round(design.logoSize * 100)}%</output><input className="mt-3 w-full accent-blue-600" type="range" min="0.1" max="0.4" step="0.05" value={design.logoSize} onChange={(event) => set("logoSize", Number(event.target.value))} disabled={!design.logo} /></Label>
      </div>

      {/* Change: Allow choosing a local preset logo in addition to uploading one. */}
      <div className="mt-5 space-y-3 rounded-xl border bg-slate-50 p-4">
        <Label>
          <span className="flex items-center justify-between">
            <span className="flex items-center gap-2"><ImagePlus size={17} aria-hidden="true" />Logo</span>
            {design.logo && <button type="button" className="text-sm text-blue-700 underline" onClick={() => set("logo", undefined)}>Remove</button>}
          </span>
          <input className="mt-2 block w-full text-sm" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={uploadLogo} />
        </Label>
        <p className="text-xs text-slate-500">Use a small square image. Higher error correction is recommended with logos.</p>
        <PresetImageSelector
          category="logos"
          label="Preset logos"
          selectedPath={design.logo?.startsWith("/presets/") ? design.logo : undefined}
          onSelect={(path) => set("logo", path)}
          onClear={() => set("logo", undefined)}
        />
      </div>

      {/* Change: Optional composed background image for template-style downloads. */}
      <div className="mt-5 rounded-xl border bg-slate-50 p-4">
        <PresetImageSelector
          category="backgrounds"
          label="Preset backgrounds"
          selectedPath={design.backgroundImage}
          onSelect={(path) => set("backgroundImage", path)}
          onClear={() => set("backgroundImage", undefined)}
        />
      </div>

      <div className="mt-5 rounded-xl border bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Gradient</h4>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4 accent-blue-600" checked={design.gradientEnabled} onChange={(event) => set("gradientEnabled", event.target.checked)} />
            Enable
          </label>
        </div>
        {design.gradientEnabled && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ColorInput label="End color" value={design.gradientColor} onChange={(value) => set("gradientColor", value)} />
            <Label>Gradient type<select className={selectStyle} value={design.gradientType} onChange={(event) => set("gradientType", event.target.value as QrDesign["gradientType"])}><option value="linear">Linear</option><option value="radial">Radial</option></select></Label>
          </div>
        )}
      </div>

      <div className="mt-5 rounded-xl border bg-slate-50 p-4">
        <h4 className="text-sm font-semibold">Frame</h4>
        <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="QR frame style">
          {(["none", "border", "label"] as const).map((frame) => (
            <button key={frame} type="button" role="radio" aria-checked={design.frame === frame} onClick={() => set("frame", frame)} className={`rounded-lg border px-2 py-2 text-sm capitalize ${design.frame === frame ? "border-blue-600 bg-blue-600 text-white" : "bg-white"}`}>
              {frame}
            </button>
          ))}
        </div>
        {design.frame !== "none" && (
          <Label>
            <span className="mt-4 block">Frame text</span>
            <input className={selectStyle} value={design.frameText} maxLength={40} onChange={(event) => set("frameText", event.target.value)} placeholder="Scan me" />
          </Label>
        )}
      </div>
    </section>
  );
}
