import Script from "next/script";
import { adSenseConfig } from "@/lib/adsense/config";

export function AdSenseScript() {
  if (!adSenseConfig.enabled || !adSenseConfig.publisherId) return null;
  return <Script id="adsense-script" async strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseConfig.publisherId}`} crossOrigin="anonymous" />;
}
