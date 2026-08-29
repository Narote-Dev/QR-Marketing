"use client";

import { useState } from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/components/i18n-provider";
import { DynamicQrAuthGate } from "@/lib/dynamic-qr/auth-client";
import { createDynamicQr, getDefaultDevAuthHeaders } from "@/lib/dynamic-qr/api";
import { prepareDesignForSave } from "@/lib/dynamic-qr/design-storage";
import { isClerkEnabled } from "@/lib/clerk/config";
import { localizedPath } from "@/lib/i18n/paths";
import { DynamicQrCreatorClerk } from "@/components/dynamic-qr-creator-clerk";
import type { QrDesign } from "@/lib/qr/design";

type Props = {
  design: QrDesign;
  onCreated: (shortUrl: string, shortCode: string) => void;
};

function DynamicQrCreatorDev({ design, onCreated }: Props) {
  const dictionary = useDictionary();
  const locale = useLocale();
  const copy = dictionary.dynamicQr;
  const [destinationUrl, setDestinationUrl] = useState("https://");
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const [created, setCreated] = useState<{ shortUrl: string; shortCode: string }>();

  const handleCreate = async () => {
    setBusy(true);
    setError(undefined);
    try {
      const authHeaders = await getDefaultDevAuthHeaders();
      const designSnapshot = prepareDesignForSave(design);
      const result = await createDynamicQr(
        { destinationUrl, label: label.trim() || undefined, design: designSnapshot },
        authHeaders,
      );
      setCreated({ shortUrl: result.shortUrl, shortCode: result.shortCode });
      onCreated(result.shortUrl, result.shortCode);
    } catch (err) {
      setError(
        err instanceof Error && err.message === "design.too_large"
          ? copy.designTooLarge
          : err instanceof Error
            ? err.message
            : copy.createFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-brand-teal/30 bg-brand-cream/40 p-4">
      <div>
        <p className="text-sm font-semibold text-brand-teal-dark">{copy.creatorTitle}</p>
        <p className="mt-1 text-sm text-slate-600">{copy.creatorIntro}</p>
      </div>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-800">{copy.destinationLabel}</span>
        <input
          type="url"
          value={destinationUrl}
          onChange={(event) => setDestinationUrl(event.target.value)}
          placeholder={copy.destinationPlaceholder}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-brand-teal focus:ring-2"
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-800">{copy.labelField}</span>
        <input
          type="text"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder={copy.labelPlaceholder}
          maxLength={100}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-brand-teal focus:ring-2"
        />
      </label>
      <button
        type="button"
        onClick={handleCreate}
        disabled={busy || destinationUrl.trim().length < 8}
        className="inline-flex w-full items-center justify-center rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal-dark disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {busy ? copy.creating : copy.createButton}
      </button>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      {created && (
        <div className="space-y-2 rounded-xl bg-white px-3 py-3 text-sm text-slate-700">
          <p>
            <span className="font-semibold">{copy.shortUrlLabel}: </span>
            <a href={created.shortUrl} className="break-all text-brand-teal-dark underline" target="_blank" rel="noreferrer">
              {created.shortUrl}
            </a>
          </p>
          <Link
            href={localizedPath(locale, "/my/dynamic-qr")}
            className="inline-flex font-semibold text-brand-teal-dark underline"
          >
            {copy.myCodesNav}
          </Link>
        </div>
      )}
    </div>
  );
}

export function DynamicQrCreator({ design, onCreated }: Props) {
  const copy = useDictionary().dynamicQr;

  if (isClerkEnabled()) {
    return (
      <DynamicQrAuthGate signInIntro={copy.signInIntro} signInLabel={copy.signInButton}>
        <DynamicQrCreatorClerk design={design} onCreated={onCreated} />
      </DynamicQrAuthGate>
    );
  }

  return (
    <DynamicQrAuthGate signInIntro={copy.signInIntro} signInLabel={copy.signInButton}>
      <DynamicQrCreatorDev design={design} onCreated={onCreated} />
    </DynamicQrAuthGate>
  );
}
