"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDictionary, useLocale } from "@/components/i18n-provider";
import { localizedPath } from "@/lib/i18n/paths";
import { consentConfig } from "@/lib/consent/config";
import { applyConsent, readConsent, type ConsentValue } from "@/lib/consent/client";

export function ConsentBanner() {
  const dictionary = useDictionary();
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Step 1: Skip entirely when consent gating is not configured.
    if (!consentConfig.enabled) return;
    // Step 2: Reapply a saved decision, otherwise reveal the banner.
    const saved = readConsent();
    if (saved) {
      applyConsent(saved);
    } else {
      setVisible(true);
    }
  }, []);

  function choose(value: ConsentValue) {
    // Step 3: Persist the choice and broadcast it to ad/analytics consumers.
    applyConsent(value);
    setVisible(false);
  }

  if (!consentConfig.enabled || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={dictionary.consent.title}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-base font-bold text-slate-900">{dictionary.consent.title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {dictionary.consent.message}{" "}
            <Link
              href={localizedPath(locale, "/privacy-policy")}
              className="font-semibold text-brand-teal-dark underline underline-offset-2 hover:text-brand-coral"
            >
              {dictionary.consent.privacyPolicy}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {dictionary.consent.rejectAll}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-xl bg-brand-teal-dark px-4 py-2 text-sm font-semibold text-white hover:bg-brand-teal"
          >
            {dictionary.consent.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
