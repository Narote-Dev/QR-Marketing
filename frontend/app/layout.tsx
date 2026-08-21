import { AdSenseScript } from "@/components/adsense-script";
import { ConsentModeScript } from "@/components/consent-mode-script";
import { GoogleAnalytics } from "@/components/google-analytics";
import { siteUrl } from "@/lib/seo/site";
import "./globals.css";

// Change: Root layout stays locale-agnostic; language is set under app/[locale].
export const metadata = {
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ConsentModeScript />
        <AdSenseScript />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
