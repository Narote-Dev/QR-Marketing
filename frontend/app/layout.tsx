import type { Metadata } from "next";
import { AdSenseScript } from "@/components/adsense-script";
import { siteUrl } from "@/lib/seo/site";
import "./globals.css";
// Change: Publish all page titles under the Build Your QR brand.
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "Build Your QR", template: "%s | Build Your QR" },
  description: "Free static QR code generator, visual templates, and practical QR tools.",
  robots: { index: true, follow: true },
  // Change: Verify ownership for the Build Your QR Search Console property.
  verification: { google: "t2hsInTVnL66_-4pnR4Qo9cLc5ccKqWiVqCqPhgFqko" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><AdSenseScript />{children}</body></html>; }
