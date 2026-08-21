import Script from "next/script";
import { analyticsConfig } from "@/lib/analytics/config";

export function GoogleAnalytics() {
  // Step 1: Skip when analytics is not enabled or lacks a measurement ID.
  if (!analyticsConfig.enabled || !analyticsConfig.measurementId) return null;
  const measurementId = analyticsConfig.measurementId;
  return (
    <>
      <Script
        id="ga4-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
