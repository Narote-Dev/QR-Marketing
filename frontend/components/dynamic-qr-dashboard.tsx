"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Plus, QrCode } from "lucide-react";
import { useDictionary, useLocale } from "@/components/i18n-provider";
import { DynamicQrAuthGate, useClerkDynamicQrAuth } from "@/lib/dynamic-qr/auth-client";
import {
  getDefaultDevAuthHeaders,
  getQuotaSummary,
  listDynamicQrs,
  type DynamicQrListItem,
  type QuotaSummary,
} from "@/lib/dynamic-qr/api";
import { isClerkEnabled } from "@/lib/clerk/config";
import { localizedPath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

function UsageMeter({
  label,
  used,
  limit,
  unlimited,
  suffix,
}: {
  label: string;
  used: number;
  limit: number | null;
  unlimited: boolean;
  suffix?: string;
}) {
  const pct =
    unlimited || !limit || limit <= 0 ? 0 : Math.min(100, Math.round((used / limit) * 100));

  return (
    <div className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm ring-1 ring-slate-200/70">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {used.toLocaleString()}
        {unlimited ? (
          <span className="ml-2 text-base font-semibold text-brand-teal-dark">∞</span>
        ) : (
          <span className="text-lg font-semibold text-slate-400"> / {limit?.toLocaleString()}</span>
        )}
      </p>
      {suffix && <p className="mt-1 text-xs text-slate-500">{suffix}</p>}
      {!unlimited && limit !== null && limit > 0 && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              pct >= 90 ? "bg-amber-500" : "bg-brand-teal",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

function CreateQrLink({ className }: { className?: string }) {
  const copy = useDictionary().dynamicQr;
  const locale = useLocale();

  return (
    <Link
      href={localizedPath(locale, "/qr-code-generator")}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-teal px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-teal-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2",
        className,
      )}
    >
      <Plus className="h-4 w-4" aria-hidden="true" />
      {copy.createQrButton}
    </Link>
  );
}

function DynamicQrDashboardBody({
  getAuthHeaders,
}: {
  getAuthHeaders: () => Promise<Record<string, string>>;
}) {
  const copy = useDictionary().dynamicQr;
  const locale = useLocale();
  const [items, setItems] = useState<DynamicQrListItem[]>([]);
  const [quota, setQuota] = useState<QuotaSummary>();
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setBusy(true);
      setError(undefined);
      try {
        const authHeaders = await getAuthHeaders();
        const [list, summary] = await Promise.all([
          listDynamicQrs(authHeaders),
          getQuotaSummary(authHeaders),
        ]);
        if (!cancelled) {
          setItems(list);
          setQuota(summary);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : copy.loadFailed);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [copy.loadFailed, getAuthHeaders]);

  return (
    <div className="space-y-8 lg:space-y-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{copy.dashboardTitle}</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{copy.dashboardIntro}</p>
        </div>
        <CreateQrLink className="w-full sm:w-auto" />
      </div>

      {quota && (
        <section aria-labelledby="quota-heading" className="space-y-4">
          <h2 id="quota-heading" className="text-sm font-semibold uppercase tracking-wide text-brand-teal-dark">
            {copy.quotaTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <UsageMeter
              label={copy.quotaDynamic}
              used={quota.dynamicQr.used}
              limit={quota.dynamicQr.limit}
              unlimited={quota.dynamicQr.unlimited}
            />
            <UsageMeter
              label={copy.quotaScans}
              used={quota.scans.used}
              limit={quota.scans.limit}
              unlimited={quota.scans.unlimited}
              suffix={quota.scans.periodUnit}
            />
            <div className="rounded-2xl border border-brand-teal/20 bg-gradient-to-br from-brand-cream/80 to-white p-5 shadow-sm ring-1 ring-brand-teal/10 sm:col-span-2 xl:col-span-1">
              <p className="text-sm font-medium text-slate-600">{copy.planLabel}</p>
              <p className="mt-2 text-2xl font-bold capitalize text-brand-teal-dark">{quota.planCode}</p>
            </div>
          </div>
        </section>
      )}

      {busy && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label={copy.loading}>
          {[0, 1, 2].map((key) => (
            <div
              key={key}
              className="h-36 animate-pulse rounded-2xl border border-slate-200/80 bg-white/70 shadow-sm"
            />
          ))}
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {!busy && items.length === 0 && !error && (
        <div className="rounded-3xl border border-dashed border-brand-teal/35 bg-white/70 px-6 py-12 text-center shadow-sm sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal-dark">
            <QrCode className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-600">{copy.emptyList}</p>
          <CreateQrLink className="mt-6" />
        </div>
      )}

      {!busy && items.length > 0 && (
        <section aria-labelledby="codes-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="codes-heading" className="text-lg font-semibold text-slate-900 sm:text-xl">
              {copy.yourCodesTitle}
            </h2>
            <p className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              {items.length}
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.shortCode}
                className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-slate-900">{item.label || item.shortCode}</p>
                    <span
                      className={cn(
                        "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        item.isActive
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80"
                          : "bg-slate-100 text-slate-600 ring-1 ring-slate-200/80",
                      )}
                    >
                      {item.isActive ? copy.statusActive : copy.statusInactive}
                    </span>
                  </div>
                  <a
                    href={item.shortUrl}
                    className="group inline-flex max-w-full items-start gap-1 break-all text-sm text-brand-teal-dark underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="min-w-0">{item.shortUrl}</span>
                    <ExternalLink
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                  <p className="text-xs text-slate-500">
                    {copy.scansLabel}: {item.totalScans.toLocaleString()}
                  </p>
                </div>
                <Link
                  href={localizedPath(locale, `/dynamic-qr/manage?code=${encodeURIComponent(item.shortCode)}`)}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-teal/40 hover:bg-brand-cream/50 sm:w-auto sm:self-start"
                >
                  {copy.manageLink}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function DynamicQrDashboardClerk() {
  const { getAuthHeaders } = useClerkDynamicQrAuth();
  return <DynamicQrDashboardBody getAuthHeaders={getAuthHeaders} />;
}

function DynamicQrDashboardDev() {
  return <DynamicQrDashboardBody getAuthHeaders={getDefaultDevAuthHeaders} />;
}

export function DynamicQrDashboard() {
  const copy = useDictionary().dynamicQr;
  const body = isClerkEnabled() ? <DynamicQrDashboardClerk /> : <DynamicQrDashboardDev />;
  return (
    <DynamicQrAuthGate signInIntro={copy.signInIntro} signInLabel={copy.signInButton}>
      {body}
    </DynamicQrAuthGate>
  );
}
