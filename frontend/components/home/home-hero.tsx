import Link from "next/link";
import { ArrowRight, Check, Download } from "lucide-react";
import { QrArt } from "@/components/home/qr-art";
import { homeUi } from "@/components/home/ui";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { siteUrl } from "@/lib/seo/site";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  /** SEO H1 from the generator hub copy (keeps the primary keyword). */
  h1: string;
  /** SEO introduction paragraph rendered below the fold copy for crawlers. */
  introduction: string;
};

/** Step 1: Original editor mockup built from the site's own UI vocabulary (no third-party assets). */
function EditorMockup({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.home.hero.mockup;
  const swatches = ["#19847D", "#146B67", "#E76F61", "#F3C63D", "#16363A"];

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md select-none lg:max-w-none">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-teal-light/25 via-transparent to-brand-yellow/25 blur-2xl" />
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="ml-2 text-xs font-semibold text-slate-500">{copy.title}</span>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_11rem]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {copy.typeChips.map((chip, index) => (
                <span
                  key={chip}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 text-xs font-semibold",
                    index === 0 ? "border-brand-teal bg-brand-teal text-white" : "border-slate-200 bg-white text-slate-600",
                  )}
                >
                  {chip}
                </span>
              ))}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{copy.inputLabel}</p>
              <div className="mt-1.5 flex h-10 items-center rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 ring-2 ring-brand-teal/20">
                {copy.inputValue}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{copy.colorsLabel}</p>
              <div className="mt-1.5 flex items-center gap-2">
                {swatches.map((swatch, index) => (
                  <span
                    key={swatch}
                    className={cn("h-7 w-7 rounded-full border-2", index === 0 ? "border-brand-ink" : "border-white shadow")}
                    style={{ backgroundColor: swatch }}
                  />
                ))}
                <span className="ml-1 h-7 flex-1 rounded-lg bg-slate-100" />
              </div>
            </div>
            <div className="space-y-2 pt-1">
              <span className="block h-2 w-3/4 rounded-full bg-slate-100" />
              <span className="block h-2 w-1/2 rounded-full bg-slate-100" />
            </div>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3">
            <p className="self-start text-[11px] font-semibold uppercase tracking-wide text-slate-500">{copy.previewLabel}</p>
            <div className="mt-2 rounded-xl border-2 border-brand-teal-dark bg-white p-2">
              <QrArt value={siteUrl.toString()} size={128} design={{ foregroundColor: "#146B67", dotStyle: "rounded", outerEyeStyle: "extra-rounded", innerEyeStyle: "dot" }} />
              <p className="mt-1.5 text-center text-xs font-semibold text-slate-800">{copy.frameText}</p>
            </div>
            <span className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-teal px-3 py-2 text-xs font-semibold text-white">
              <Download className="h-3.5 w-3.5" />
              {copy.downloadLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeHero({ locale, dictionary, h1, introduction }: Props) {
  const copy = dictionary.home.hero;

  return (
    <section className="relative overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-16" aria-labelledby="hero-heading">
      <div className={cn(homeUi.container, "grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14")}>
        <div className="max-w-2xl">
          <p className={homeUi.eyebrow}>{copy.eyebrow}</p>
          <h1 id="hero-heading" className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            {h1}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{copy.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#generator" className={homeUi.buttonPrimary}>
              {copy.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={localizedPath(locale, "/qr-code/dynamic")} className={homeUi.buttonSecondary}>
              {copy.secondaryCta}
            </Link>
          </div>
          <ul className="mt-7 flex flex-col gap-2 text-sm text-slate-700 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {copy.bullets.map((bullet) => (
              <li key={bullet} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
          {/* Step 2: Keep the long-standing SEO introduction in the HTML, visually secondary. */}
          <p className="mt-6 max-w-xl text-sm leading-6 text-slate-500">{introduction}</p>
        </div>
        <div className="hidden lg:block">
          <EditorMockup dictionary={dictionary} />
        </div>
      </div>
    </section>
  );
}
