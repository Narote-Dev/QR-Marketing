import type { Metadata } from "next";
import { AdSenseScript } from "@/components/adsense-script";
import { siteUrl } from "@/lib/seo/site";
import "./globals.css";
export const metadata: Metadata = { metadataBase: siteUrl, title: { default: "QR Marketing", template: "%s | QR Marketing" }, description: "Free static QR code generator and practical QR tools.", robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><AdSenseScript />{children}</body></html>; }
