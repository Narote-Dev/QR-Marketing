"use client";

import type { ChangeEvent, ReactNode } from "react";
import { ImagePlus, SlidersHorizontal } from "lucide-react";
import { PresetImageSelector } from "@/components/assets/preset-image-selector";
import { useDictionary } from "@/components/i18n-provider";
import type { QrDesign } from "@/lib/qr/design";

type Props = { design: QrDesign; onChange: (design: QrDesign) => void };
const selectStyle = "mt-1 min-w-0 w-full max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal-light/30";
function Label({ children }: { children: ReactNode }) { return <label className="block min-w-0 text-sm font-medium text-slate-700">{children}</label>; }

// Change: Keep the color row shrinkable on narrow mobile screens.
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const dictionary = useDictionary();
  return (
    <Label>
      {label}
      <span className="mt-1 flex min-w-0 gap-2">
        <input className="h-10 w-12 shrink-0 cursor-pointer rounded border border-slate-300 p-1" type="color" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
        <input className={`${selectStyle.replace("mt-1 ", "")} flex-1`} value={value} onChange={(event) => onChange(event.target.value)} aria-label={`${label} ${dictionary.designer.hexValue}`} />
      </span>
    </Label>
  );
}

export function QrDesigner({ design, onChange }: Props) {
  // Step 1: Resolve designer copy from the active locale dictionary.
  const dictionary = useDictionary();
  const d = dictionary.designer;

  // Step 2: Patch a single design field while preserving the rest of the state.
  const set = <K extends keyof QrDesign>(key: K, value: QrDesign[K]) => onChange({ ...design, [key]: value });

  // Step 3: Keep the existing file-upload path for custom logos.
  const uploadLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => set("logo", String(reader.result));
    reader.readAsDataURL(file);
  };

  // Step 4: Map frame option values to translated button labels (values stay none/border/label).
  const frameLabels = { none: d.frameNone, border: d.frameBorder, label: d.frameLabel } as const;

  return (
    <section aria-labelledby="designer-heading" className="mt-2 min-w-0 border-t pt-8">
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal size={20} className="text-brand-teal-dark" aria-hidden="true" />
        <div>
          <h3 id="designer-heading" className="font-bold">{d.heading}</h3>
          <p className="text-sm text-slate-600">{d.intro}</p>
        </div>
      </div>
      {/* Step 5: Let every designer grid item shrink below its intrinsic width. */}
      <div className="grid min-w-0 gap-5 sm:grid-cols-2 [&>*]:min-w-0">
        <ColorInput label={d.foregroundColor} value={design.foregroundColor} onChange={(value) => set("foregroundColor", value)} />
        <ColorInput label={d.backgroundColor} value={design.backgroundColor} onChange={(value) => set("backgroundColor", value)} />
        <Label>
          {d.dotStyle}
          <select className={selectStyle} value={design.dotStyle} onChange={(event) => set("dotStyle", event.target.value as QrDesign["dotStyle"])}>
            <option value="dots">{d.styleDots}</option>
            <option value="rounded">{d.styleRounded}</option>
            <option value="square">{d.styleSquare}</option>
            <option value="extra-rounded">{d.styleExtraRounded}</option>
            <option value="classy">{d.styleClassy}</option>
            <option value="classy-rounded">{d.styleClassyRounded}</option>
          </select>
        </Label>
        <Label>
          {d.outerEyeStyle}
          <select className={selectStyle} value={design.outerEyeStyle} onChange={(event) => set("outerEyeStyle", event.target.value as QrDesign["outerEyeStyle"])}>
            <option value="square">{d.styleSquare}</option>
            <option value="dot">{d.styleDot}</option>
            <option value="rounded">{d.styleRounded}</option>
            <option value="extra-rounded">{d.styleExtraRounded}</option>
          </select>
        </Label>
        <Label>
          {d.innerEyeStyle}
          <select className={selectStyle} value={design.innerEyeStyle} onChange={(event) => set("innerEyeStyle", event.target.value as QrDesign["innerEyeStyle"])}>
            <option value="dot">{d.styleDot}</option>
            <option value="square">{d.styleSquare}</option>
            <option value="rounded">{d.styleRounded}</option>
            <option value="extra-rounded">{d.styleExtraRounded}</option>
          </select>
        </Label>
        <Label>
          {d.errorCorrection}
          <select className={selectStyle} value={design.errorCorrectionLevel} onChange={(event) => set("errorCorrectionLevel", event.target.value as QrDesign["errorCorrectionLevel"])}>
            <option value="L">{d.errorLow}</option>
            <option value="M">{d.errorMedium}</option>
            <option value="Q">{d.errorQuartile}</option>
            <option value="H">{d.errorHigh}</option>
          </select>
        </Label>
        <Label>
          {d.qrSize} <output className="float-right text-slate-500">{design.size}px</output>
          <input className="mt-3 w-full accent-brand-teal" type="range" min="160" max="480" step="10" value={design.size} onChange={(event) => set("size", Number(event.target.value))} />
        </Label>
        <Label>
          {d.logoSize} <output className="float-right text-slate-500">{Math.round(design.logoSize * 100)}%</output>
          <input className="mt-3 w-full accent-brand-teal" type="range" min="0.1" max="0.4" step="0.05" value={design.logoSize} onChange={(event) => set("logoSize", Number(event.target.value))} disabled={!design.logo} />
        </Label>
      </div>

      {/* Change: Allow choosing a local preset logo in addition to uploading one. */}
      <div className="mt-5 space-y-3 rounded-xl border bg-slate-50 p-4">
        <Label>
          <span className="flex items-center justify-between">
            <span className="flex items-center gap-2"><ImagePlus size={17} aria-hidden="true" />{d.logo}</span>
            {design.logo && <button type="button" className="text-sm text-brand-teal-dark underline" onClick={() => set("logo", undefined)}>{d.remove}</button>}
          </span>
          <input className="mt-2 block min-w-0 max-w-full text-sm" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={uploadLogo} />
        </Label>
        <p className="text-xs text-slate-500">{d.logoHint}</p>
        <PresetImageSelector
          category="logos"
          label={d.presetLogos}
          selectedPath={design.logo?.startsWith("/presets/") ? design.logo : undefined}
          onSelect={(path) => set("logo", path)}
          onClear={() => set("logo", undefined)}
        />
      </div>

      {/* Change: Optional composed background image for template-style downloads. */}
      <div className="mt-5 rounded-xl border bg-slate-50 p-4">
        <PresetImageSelector
          category="backgrounds"
          label={d.presetBackgrounds}
          selectedPath={design.backgroundImage}
          onSelect={(path) => set("backgroundImage", path)}
          onClear={() => set("backgroundImage", undefined)}
        />
      </div>

      <div className="mt-5 rounded-xl border bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">{d.gradient}</h4>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4 accent-brand-teal" checked={design.gradientEnabled} onChange={(event) => set("gradientEnabled", event.target.checked)} />
            {d.enable}
          </label>
        </div>
        {design.gradientEnabled && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ColorInput label={d.endColor} value={design.gradientColor} onChange={(value) => set("gradientColor", value)} />
            <Label>
              {d.gradientType}
              <select className={selectStyle} value={design.gradientType} onChange={(event) => set("gradientType", event.target.value as QrDesign["gradientType"])}>
                <option value="linear">{d.gradientLinear}</option>
                <option value="radial">{d.gradientRadial}</option>
              </select>
            </Label>
          </div>
        )}
      </div>

      <div className="mt-5 rounded-xl border bg-slate-50 p-4">
        <h4 className="text-sm font-semibold">{d.frame}</h4>
        <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label={d.frameStyleAria}>
          {(["none", "border", "label"] as const).map((frame) => (
            <button key={frame} type="button" role="radio" aria-checked={design.frame === frame} onClick={() => set("frame", frame)} className={`rounded-lg border px-2 py-2 text-sm ${design.frame === frame ? "border-brand-teal bg-brand-teal text-white" : "bg-white"}`}>
              {frameLabels[frame]}
            </button>
          ))}
        </div>
        {design.frame !== "none" && (
          <Label>
            <span className="mt-4 block">{d.frameText}</span>
            <input className={selectStyle} value={design.frameText} maxLength={40} onChange={(event) => set("frameText", event.target.value)} placeholder={d.frameTextPlaceholder} />
          </Label>
        )}
      </div>
    </section>
  );
}
