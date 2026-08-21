"use client";
import { useCallback, useEffect, useRef } from "react";
import { useDictionary } from "@/components/i18n-provider";
import { adSenseConfig, type AdPlacement } from "@/lib/adsense/config";
import { consentConfig } from "@/lib/consent/config";
import { CONSENT_CHANGE_EVENT, hasAdConsent } from "@/lib/consent/client";

type Props = { placement: AdPlacement; className?: string; minHeight?: number };
export function AdSlot({ placement, className = "", minHeight = 250 }: Props) {
  // Step 1: Localize the advertisement landmark label.
  const dictionary = useDictionary();
  const initialized = useRef(false);
  const slotId = adSenseConfig.slots[placement];

  // Step 2: Request the ad once advertising consent is granted (or consent gating is off).
  const requestAd = useCallback(() => {
    if (initialized.current) return;
    if (consentConfig.enabled && !hasAdConsent()) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      initialized.current = false;
    }
  }, []);

  useEffect(() => {
    if (!adSenseConfig.enabled || !slotId) return;
    // Step 3: Retry the request when the visitor updates their consent decision.
    requestAd();
    window.addEventListener(CONSENT_CHANGE_EVENT, requestAd);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, requestAd);
  }, [slotId, requestAd]);

  if (!adSenseConfig.enabled || !adSenseConfig.publisherId || !slotId) return null;
  return (
    <aside className={`my-8 w-full overflow-hidden ${className}`} aria-label={dictionary.chrome.advertisement} style={{ minHeight }}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight }}
        data-ad-client={adSenseConfig.publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
