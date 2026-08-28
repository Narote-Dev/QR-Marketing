"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/components/i18n-provider";
import { DynamicQrAuthGate, useClerkDynamicQrAuth } from "@/lib/dynamic-qr/auth-client";
import {
  getDefaultDevAuthHeaders,
  getDynamicQr,
  getDynamicQrStats,
  listDynamicQrs,
  updateDynamicQr,
  type DynamicQrDetails,
} from "@/lib/dynamic-qr/api";
import { isClerkEnabled } from "@/lib/clerk/config";
import { localizedPath } from "@/lib/i18n/paths";

type Props = { initialCode?: string };

function ManageFormBody({
  initialCode,
  getAuthHeaders,
}: {
  initialCode: string;
  getAuthHeaders: () => Promise<Record<string, string>>;
}) {
  const copy = useDictionary().dynamicQr;
  const locale = useLocale();
  const [owned, setOwned] = useState<string[]>([]);
  const [shortCode, setShortCode] = useState(initialCode);
  const [details, setDetails] = useState<DynamicQrDetails>();
  const [totalScans, setTotalScans] = useState<number>();
  const [destinationUrl, setDestinationUrl] = useState("");
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();

  const loadDetails = useCallback(
    async (code: string) => {
      const trimmed = code.trim();
      if (!trimmed) return;
      setBusy(true);
      setError(undefined);
      setMessage(undefined);
      try {
        const authHeaders = await getAuthHeaders();
        const [nextDetails, stats] = await Promise.all([
          getDynamicQr(trimmed, authHeaders),
          getDynamicQrStats(trimmed, authHeaders),
        ]);
        setDetails(nextDetails);
        setDestinationUrl(nextDetails.destinationUrl);
        setLabel(nextDetails.label ?? "");
        setTotalScans(stats.totalScans);
      } catch (err) {
        setDetails(undefined);
        setError(err instanceof Error ? err.message : copy.loadFailed);
      } finally {
        setBusy(false);
      }
    },
    [copy.loadFailed, getAuthHeaders],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const authHeaders = await getAuthHeaders();
        try {
          const list = await listDynamicQrs(authHeaders);
          if (cancelled) return;
          setOwned(list.map((x) => x.shortCode));
        } catch {
          /* list optional on first paint */
        }
        const code = initialCode.trim();
        if (!code || cancelled) return;
        setShortCode(code);
        await loadDetails(code);
      } catch {
        /* auth optional until sign-in completes */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getAuthHeaders, initialCode, loadDetails]);

  const load = () => loadDetails(shortCode);

  const save = async () => {
    if (!details) return;
    setBusy(true);
    setError(undefined);
    setMessage(undefined);
    try {
      const authHeaders = await getAuthHeaders();
      const updated = await updateDynamicQr(details.shortCode, authHeaders, {
        destinationUrl,
        label: label.trim() || null,
      });
      setDetails(updated);
      setMessage(copy.saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.saveFailed);
    } finally {
      setBusy(false);
    }
  };

  const toggleActive = async () => {
    if (!details) return;
    setBusy(true);
    setError(undefined);
    setMessage(undefined);
    try {
      const authHeaders = await getAuthHeaders();
      const updated = await updateDynamicQr(details.shortCode, authHeaders, {
        isActive: !details.isActive,
      });
      setDetails(updated);
      setMessage(updated.isActive ? copy.activated : copy.deactivated);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.saveFailed);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-5 rounded-3xl border bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{copy.manageTitle}</h1>
        <p className="mt-2 text-sm text-slate-600">{copy.manageIntro}</p>
        <Link href={localizedPath(locale, "/my/dynamic-qr")} className="mt-2 inline-flex text-sm font-semibold text-brand-teal-dark underline">
          {copy.myCodesNav}
        </Link>
      </div>

      {owned.length > 0 && (
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-800">{copy.ownedCodes}</span>
          <select
            value={shortCode}
            onChange={(event) => setShortCode(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            {owned.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-800">{copy.shortCodeLabel}</span>
        <input
          value={shortCode}
          onChange={(event) => setShortCode(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
      </label>

      <button
        type="button"
        onClick={load}
        disabled={busy || !shortCode.trim()}
        className="inline-flex rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-teal-dark disabled:bg-slate-300"
      >
        {copy.loadButton}
      </button>

      {details && (
        <div className="space-y-4 border-t pt-5">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">{copy.shortUrlLabel}: </span>
            <a href={details.shortUrl} className="break-all text-brand-teal-dark underline" target="_blank" rel="noreferrer">
              {details.shortUrl}
            </a>
          </p>
          <p className="text-sm text-slate-700">
            <span className="font-semibold">{copy.scansLabel}: </span>
            {totalScans ?? "—"}
          </p>
          <p className="text-sm text-slate-700">
            <span className="font-semibold">{copy.statusLabel}: </span>
            {details.isActive ? copy.statusActive : copy.statusInactive}
          </p>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-800">{copy.destinationLabel}</span>
            <input
              type="url"
              value={destinationUrl}
              onChange={(event) => setDestinationUrl(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-800">{copy.labelField}</span>
            <input
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              maxLength={100}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={save}
              disabled={busy}
              className="rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-teal-dark disabled:bg-slate-300"
            >
              {copy.saveButton}
            </button>
            <button
              type="button"
              onClick={toggleActive}
              disabled={busy}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:text-slate-400"
            >
              {details.isActive ? copy.deactivateButton : copy.activateButton}
            </button>
          </div>
        </div>
      )}

      {message && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</p>}
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function ManageFormClerk({ initialCode }: Props) {
  const { getAuthHeaders } = useClerkDynamicQrAuth();
  return <ManageFormBody initialCode={initialCode ?? ""} getAuthHeaders={getAuthHeaders} />;
}

function ManageFormDev({ initialCode }: Props) {
  return <ManageFormBody initialCode={initialCode ?? ""} getAuthHeaders={getDefaultDevAuthHeaders} />;
}

export function DynamicQrManageForm({ initialCode = "" }: Props) {
  const copy = useDictionary().dynamicQr;
  const body = isClerkEnabled() ? <ManageFormClerk initialCode={initialCode} /> : <ManageFormDev initialCode={initialCode} />;
  return (
    <DynamicQrAuthGate signInIntro={copy.signInIntro} signInLabel={copy.signInButton}>
      {body}
    </DynamicQrAuthGate>
  );
}
