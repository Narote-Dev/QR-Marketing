"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Download, Layers } from "lucide-react";
import { useDictionary, useLocale } from "@/components/i18n-provider";
import { DynamicQrCreator } from "@/components/dynamic-qr-creator";
import { GeneratorFeedback } from "@/components/generator-feedback";
import { QrForm } from "@/components/qr-form";
import { QrPreview, type QrPreviewHandle } from "@/components/qr-preview";
import { QrStarterStrip } from "@/components/qr-starter-strip";
import { QrTypeSelector } from "@/components/qr-type-selector";
import { QrDesigner } from "@/components/qr-designer";
import { TemplateSelector } from "@/components/templates/template-selector";
import { isDynamicQrEnabled } from "@/lib/dynamic-qr/config";
import { buildQrContent } from "@/lib/qr/content";
import { defaultQrValues, type PaymentProvider, type QrFormValues, type QrType, type SocialNetwork } from "@/lib/qr/types";
import { defaultQrDesign, type QrDesign } from "@/lib/qr/design";
import {
  applyStarterSelection,
  getStarterConfig,
  starterIds,
  starterNeedsConfirm,
  type StarterId,
} from "@/lib/qr/starters";
import { applyTemplate, clearTemplateDesign } from "@/lib/templates/apply";
import { getTemplateById, localizeTemplate } from "@/lib/templates/catalog";
import { localizedPath } from "@/lib/i18n/paths";
import type { QrTemplate, TemplateCategory } from "@/lib/templates/types";

type Props = {
  initialType?: QrType;
  initialSocialNetwork?: SocialNetwork;
  initialPaymentProvider?: PaymentProvider;
  initialTemplateCategory?: TemplateCategory;
  // Change: Long-tail pages can preselect a template and frame label.
  initialTemplateId?: string;
  initialFrameText?: string;
  downloadFileName?: string;
  helperHint?: string;
};

type GeneratorMode = "static" | "dynamic";

export function QrGenerator({
  initialType = "url",
  initialSocialNetwork,
  initialPaymentProvider,
  initialTemplateCategory,
  initialTemplateId,
  initialFrameText,
  downloadFileName,
  helperHint,
}: Props) {
  const dictionary = useDictionary();
  const locale = useLocale();
  const dynamicEnabled = isDynamicQrEnabled();

  // Step 1: Resolve an optional starter template for intent-matched landing pages.
  const starterTemplate = useMemo(() => {
    if (!initialTemplateId) return undefined;
    const template = getTemplateById(initialTemplateId);
    return localizeTemplate(template, dictionary) ?? template;
  }, [dictionary, initialTemplateId]);

  // Step 2: Own content, design, and selected template state in one place.
  const [type, setType] = useState<QrType>(initialType);
  const [values, setValues] = useState<QrFormValues>(() => ({
    ...defaultQrValues,
    ...(initialSocialNetwork ? { socialNetwork: initialSocialNetwork } : {}),
    ...(initialPaymentProvider ? { paymentProvider: initialPaymentProvider } : {}),
  }));
  const [design, setDesign] = useState<QrDesign>(() => {
    if (starterTemplate) {
      const next = applyTemplate(starterTemplate);
      return initialFrameText ? { ...next, frameText: initialFrameText } : next;
    }
    return { ...defaultQrDesign, frameText: initialFrameText ?? dictionary.preview.scanMe };
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>(starterTemplate?.id);
  const [templateCategory, setTemplateCategory] = useState<TemplateCategory>(
    initialTemplateCategory ?? starterTemplate?.category ?? "restaurant",
  );
  const [pendingStarterId, setPendingStarterId] = useState<StarterId>();
  const [starterHint, setStarterHint] = useState<string>();
  const [starterDownloadName, setStarterDownloadName] = useState<string>();
  const [downloading, setDownloading] = useState<"png" | "svg" | false>(false);
  const [downloadError, setDownloadError] = useState<string>();
  const [mode, setMode] = useState<GeneratorMode>("static");
  const [dynamicShortUrl, setDynamicShortUrl] = useState<string>();
  const previewRef = useRef<QrPreviewHandle>(null);
  const result = useMemo(() => buildQrContent(type, values, dictionary), [type, values, dictionary]);
  // Change: Dynamic mode encodes the short URL returned by the API, not the destination.
  const previewValue = mode === "dynamic" ? dynamicShortUrl : result.value;
  const previewError = mode === "dynamic" ? undefined : result.error;
  // Change: Hide starters on use-case landings that already apply a template.
  const showStarters = !initialTemplateId && mode === "static";

  const selectedStarterId = useMemo(() => {
    if (!showStarters || !selectedTemplateId) return undefined;
    return starterIds.find((id) => {
      const config = getStarterConfig(id, locale);
      return config.type === type && config.templateId === selectedTemplateId;
    });
  }, [locale, selectedTemplateId, showStarters, type]);

  // Step 3: Applying a template only updates design; QR content stays untouched.
  const handleSelectTemplate = (template: QrTemplate) => {
    const localized = localizeTemplate(template, dictionary) ?? template;
    setSelectedTemplateId(localized.id);
    setTemplateCategory(localized.category);
    setDesign(applyTemplate(localized));
    setPendingStarterId(undefined);
  };

  const handleClearTemplate = () => {
    setSelectedTemplateId(undefined);
    setDesign({ ...clearTemplateDesign(), frameText: initialFrameText ?? dictionary.preview.scanMe });
    setPendingStarterId(undefined);
  };

  const applyStarter = (id: StarterId) => {
    const config = getStarterConfig(id, locale);
    const template = getTemplateById(config.templateId);
    if (!template) return;
    const localized = localizeTemplate(template, dictionary) ?? template;
    const next = applyStarterSelection(values, localized, config);
    setType(next.type);
    setSelectedTemplateId(next.selectedTemplateId);
    setTemplateCategory(next.templateCategory);
    setDesign(next.design);
    setStarterHint(config.helperHint);
    setStarterDownloadName(config.downloadFileName);
    setPendingStarterId(undefined);
  };

  const handleSelectStarter = (id: StarterId) => {
    if (pendingStarterId === id) {
      applyStarter(id);
      return;
    }
    const config = getStarterConfig(id, locale);
    if (starterNeedsConfirm(type, values, config.type)) {
      setPendingStarterId(id);
      return;
    }
    applyStarter(id);
  };

  const handleTypeChange = (nextType: QrType) => {
    setType(nextType);
    setPendingStarterId(undefined);
  };

  const handleModeChange = (nextMode: GeneratorMode) => {
    setMode(nextMode);
    setPendingStarterId(undefined);
    if (nextMode === "static") {
      setDynamicShortUrl(undefined);
    }
  };

  // Step 4: Download PNG (composite) or SVG (vector QR) when the payload is valid.
  const handleDownload = async (format: "png" | "svg") => {
    if (!previewValue || previewError) return;
    setDownloading(format);
    setDownloadError(undefined);
    try {
      const baseName = starterDownloadName ?? downloadFileName ?? (mode === "dynamic" ? "qr-dynamic" : `qr-${type}`);
      if (format === "png") {
        await previewRef.current?.downloadPng(baseName);
      } else {
        await previewRef.current?.downloadSvg(baseName);
      }
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
        {/* Change: Always surface bulk CSV export entry inside the generator card. */}
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-brand-teal/30 bg-brand-cream/50 p-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-700">{dictionary.generator.bulkPromo}</p>
          <Link
            href={localizedPath(locale, "/bulk-qr-generator")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal-dark"
          >
            <Layers className="h-4 w-4" aria-hidden="true" />
            {dictionary.chrome.bulkQrGenerator}
          </Link>
        </div>
        {(helperHint || starterHint) && (
          <p className="mt-3 rounded-xl bg-brand-cream px-3 py-2 text-sm text-brand-ink">{helperHint ?? starterHint}</p>
        )}
      </div>

      {dynamicEnabled && (
        <div
          role="group"
          aria-label={dictionary.generator.modeAria}
          className="mb-6 inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1"
        >
          <button
            type="button"
            onClick={() => handleModeChange("static")}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              mode === "static" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
            }`}
          >
            {dictionary.generator.modeStatic}
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("dynamic")}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              mode === "dynamic" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
            }`}
          >
            {dictionary.generator.modeDynamic}
          </button>
        </div>
      )}

      {showStarters && (
        <QrStarterStrip
          selectedId={selectedStarterId}
          pendingId={pendingStarterId}
          onSelect={handleSelectStarter}
          onConfirm={() => pendingStarterId && applyStarter(pendingStarterId)}
          onCancel={() => setPendingStarterId(undefined)}
        />
      )}

      {/* Change: ME-QR-style sequence — 1 content, 2 customize (templates+designer), 3 sticky preview. */}
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="min-w-0 space-y-10">
          <section aria-labelledby="generator-step-1" className="min-w-0">
            <h3 id="generator-step-1" className="mb-4 text-lg font-bold tracking-tight text-slate-900">
              {dictionary.generator.step1Title}
            </h3>
            {mode === "dynamic" && dynamicEnabled ? (
              <DynamicQrCreator
                onCreated={(shortUrl) => {
                  setDynamicShortUrl(shortUrl);
                }}
              />
            ) : (
              <>
                <QrTypeSelector type={type} onChange={handleTypeChange} />
                <div className="mt-6">
                  <QrForm type={type} values={values} onChange={setValues} error={result.error} />
                </div>
              </>
            )}
          </section>

          <section aria-labelledby="generator-step-2" className="min-w-0 border-t pt-10">
            <h3 id="generator-step-2" className="mb-4 text-lg font-bold tracking-tight text-slate-900">
              {dictionary.generator.step2Title}
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

        <section
          aria-labelledby="generator-step-3"
          className="min-w-0 space-y-3 lg:sticky lg:top-6 lg:self-start"
        >
          <h3 id="generator-step-3" className="text-lg font-bold tracking-tight text-slate-900">
            {dictionary.generator.step3Title}
          </h3>
          <p className="text-sm font-semibold text-slate-700">{dictionary.generator.livePreview}</p>
          <QrPreview ref={previewRef} value={previewValue} design={design} />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleDownload("png")}
              disabled={!previewValue || Boolean(previewError) || Boolean(downloading)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-teal-dark disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {downloading === "png" ? dictionary.generator.preparingDownload : dictionary.generator.downloadPng}
            </button>
            <button
              type="button"
              onClick={() => handleDownload("svg")}
              disabled={!previewValue || Boolean(previewError) || Boolean(downloading)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-teal bg-white px-4 py-3 text-sm font-semibold text-brand-teal-dark transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {downloading === "svg" ? dictionary.generator.preparingDownload : dictionary.generator.downloadSvg}
            </button>
          </div>
          {downloadError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {downloadError}
            </p>
          )}
          <p className="text-xs text-slate-500">{dictionary.generator.downloadHint}</p>
          <GeneratorFeedback qrMode={mode} qrType={mode === "dynamic" ? "dynamic" : type} />
        </section>
      </div>
    </section>
  );
}
