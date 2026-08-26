import Script from "next/script";
import { adSenseConfig } from "@/lib/adsense/config";

export function AdSenseScript() {
  if (!adSenseConfig.enabled || !adSenseConfig.publisherId) return null;
  // Change: beforeInteractive injects into <head> for AdSense site verification.
  return (
    <Script
      id="adsense-script"
      async
      strategy="beforeInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseConfig.publisherId}`}
      crossOrigin="anonymous"
    />
  );
}
