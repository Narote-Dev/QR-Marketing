"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{copy.dashboardTitle}</h1>
        <p className="mt-2 text-sm text-slate-600">{copy.dashboardIntro}</p>
      </div>

      {quota && (
        <div className="rounded-2xl border border-brand-teal/30 bg-brand-cream/40 p-4 text-sm text-slate-700">
          <p className="font-semibold text-brand-teal-dark">{copy.quotaTitle}</p>
          <p className="mt-2">
            {copy.quotaDynamic}: {quota.dynamicQr.used}
            {quota.dynamicQr.unlimited ? "" : ` / ${quota.dynamicQr.limit}`}
          </p>
          <p>
            {copy.quotaScans}: {quota.scans.used}
            {quota.scans.unlimited ? "" : ` / ${quota.scans.limit}`} ({quota.scans.periodUnit})
          </p>
        </div>
      )}

      {busy && <p className="text-sm text-slate-500">{copy.loading}</p>}
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!busy && items.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600">
          {copy.emptyList}
        </p>
      )}

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.shortCode} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <p className="font-semibold text-slate-900">{item.label || item.shortCode}</p>
                <a
                  href={item.shortUrl}
                  className="block break-all text-sm text-brand-teal-dark underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.shortUrl}
                </a>
                <p className="text-xs text-slate-500">
                  {copy.scansLabel}: {item.totalScans} · {item.isActive ? copy.statusActive : copy.statusInactive}
                </p>
              </div>
              <Link
                href={localizedPath(locale, `/dynamic-qr/manage?code=${encodeURIComponent(item.shortCode)}`)}
                className="shrink-0 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                {copy.manageLink}
              </Link>
            </div>
          </li>
        ))}
      </ul>
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
