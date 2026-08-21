import Script from "next/script";
import { consentConfig } from "@/lib/consent/config";

export function ConsentModeScript() {
  // Step 1: Skip when consent gating is not enabled.
  if (!consentConfig.enabled) return null;
  // Step 2: Deny all storage until the visitor makes a choice, buffering tags via wait_for_update.
  const defaults = JSON.stringify({
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  return (
    <Script id="consent-mode-defaults" strategy="beforeInteractive">
      {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('consent', 'default', ${defaults});`}
    </Script>
  );
}
