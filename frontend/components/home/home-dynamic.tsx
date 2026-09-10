import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { HomeSection, StatusBadge, homeUi } from "@/components/home/ui";
import { isDynamicQrEnabled } from "@/lib/dynamic-qr/config";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

type Props = { locale: Locale; dictionary: Dictionary };

function ComparisonCard({
  title,
  points,
  highlighted,
}: {
  title: string;
  points: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6",
        highlighted ? "border-brand-teal/40 bg-brand-cream/60 shadow-sm" : "border-slate-200/80 bg-white",
      )}
    >
      <h3 className={cn("text-lg font-bold", highlighted ? "text-brand-teal-dark" : "text-slate-900")}>{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
        {points.map((point, index) => {
          // Step 1: The last static point is a limitation; render it neutrally instead of as a benefit.
          const limitation = !highlighted && index === points.length - 1;
          return (
            <li key={point} className="flex items-start gap-2">
              {limitation ? (
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              ) : (
                <Check className={cn("mt-0.5 h-4 w-4 shrink-0", highlighted ? "text-brand-teal" : "text-slate-500")} aria-hidden="true" />
              )}
              <span className={cn(limitation && "text-slate-500")}>{point}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function HomeDynamic({ locale, dictionary }: Props) {
  const copy = dictionary.home.dynamic;
  const statusLabels = { available: dictionary.home.statusAvailable, planned: dictionary.home.statusPlanned };
  const dynamicEnabled = isDynamicQrEnabled();
  const guidePath = localizedPath(locale, "/qr-code/dynamic");

  return (
    <HomeSection id="dynamic-qr" eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} tone="white">
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <ComparisonCard title={copy.staticTitle} points={copy.staticPoints} />
        <ComparisonCard title={copy.dynamicTitle} points={copy.dynamicPoints} highlighted />
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.benefits.map((benefit) => (
          <li key={benefit.title} className={homeUi.card}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
              <StatusBadge status={benefit.status} labels={statusLabels} />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {/* Step 2: When Dynamic QR is live, the guide page opens the generator in Dynamic mode. */}
        {dynamicEnabled ? (
          <>
            <Link href={guidePath} className={homeUi.buttonPrimary}>
              {copy.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={localizedPath(locale, "/my/dynamic-qr")} className={homeUi.buttonSecondary}>
              {dictionary.chrome.navMyDynamicQr}
            </Link>
          </>
        ) : (
          <Link href={guidePath} className={homeUi.buttonPrimary}>
            {copy.secondaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </HomeSection>
  );
}

export function HomeAnalytics({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.home.analytics;
  const statusLabels = { available: dictionary.home.statusAvailable, planned: dictionary.home.statusPlanned };

  return (
    <HomeSection id="analytics" eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro}>
      <div className="mt-10 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <p className="text-sm font-semibold text-slate-800">{dictionary.dynamicQr.dashboardTitle}</p>
          </div>
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-200/80">
            {copy.sampleBadge}
          </span>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.metrics.map((metric) => (
            <li
              key={metric.label}
              className={cn(
                "rounded-2xl border p-5",
                metric.status === "available" ? "border-slate-200/80 bg-white" : "border-dashed border-slate-300 bg-slate-50/60",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                <StatusBadge status={metric.status} labels={statusLabels} />
              </div>
              <p className={cn("mt-2 text-2xl font-bold tracking-tight", metric.status === "available" ? "text-slate-900" : "text-slate-500")}>
                {metric.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{metric.hint}</p>
              {metric.status === "available" && (
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                  <div className="h-full w-2/3 rounded-full bg-brand-teal" />
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs leading-5 text-slate-500">{copy.plannedNote}</p>
      </div>
    </HomeSection>
  );
}
