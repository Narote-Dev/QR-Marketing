"use client";

export const CONSENT_STORAGE_KEY = "byq_consent";
export const CONSENT_CHANGE_EVENT = "byq-consent-changed";
export type ConsentValue = "granted" | "denied";

function dataLayer(): unknown[] {
  // Step 1: Reuse the global data layer initialized by the consent defaults script.
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function readConsent(): ConsentValue | null {
  // Step 2: Read a previously saved decision, validating the stored value.
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function hasAdConsent(): boolean {
  return readConsent() === "granted";
}

export function applyConsent(value: ConsentValue): void {
  // Step 3: Persist the decision and update Consent Mode before broadcasting to consumers.
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  const granted = value === "granted";
  dataLayer().push([
    "consent",
    "update",
    {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    },
  ]);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}
