import type { Metadata } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AdSenseScript } from "@/components/adsense-script";
import { AppProviders } from "@/components/app-providers";
import { ConsentModeScript } from "@/components/consent-mode-script";
import { GoogleAnalytics } from "@/components/google-analytics";
import { adSenseConfig, getAdSenseAccountMeta } from "@/lib/adsense/config";
import { defaultLocale, htmlLang, isLocale } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/seo/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Change: Root layout stays locale-agnostic; language is set under app/[locale].
export function generateMetadata(): Metadata {
  const adsenseMeta = getAdSenseAccountMeta(adSenseConfig.publisherId);
  return {
    metadataBase: siteUrl,
    robots: { index: true, follow: true },
    // Change: Serve square multi-size icons so Google Search can pick a favicon.
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/brand/icon-32.png", type: "image/png", sizes: "32x32" },
        { url: "/brand/icon-48.png", type: "image/png", sizes: "48x48" },
        { url: "/brand/icon-96.png", type: "image/png", sizes: "96x96" },
        { url: "/brand/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/favicon.ico",
      apple: "/brand/apple-touch-icon.png",
    },
    verification: { google: "t2hsInTVnL66_-4pnR4Qo9cLc5ccKqWiVqCqPhgFqko" },
    ...(adsenseMeta ? { other: adsenseMeta } : {}),
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Step 1: Resolve locale from middleware so crawlers get the correct html lang attribute.
  const headerStore = await headers();
  const requestedLocale = headerStore.get("x-locale") ?? defaultLocale;
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  // Change: Skip AdSense script entirely when middleware marks the page ads-off (Auto ads + slots).
  const allowAds = headerStore.get("x-allow-ads") !== "0";

  return (
    <html lang={htmlLang[locale]} suppressHydrationWarning className={plusJakartaSans.variable}>
      <body className="font-sans">
        <ConsentModeScript />
        {allowAds ? <AdSenseScript /> : null}
        <GoogleAnalytics />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
