import { AdSenseScript } from "@/components/adsense-script";
import { siteUrl } from "@/lib/seo/site";
import "./globals.css";

// Change: Root layout stays locale-agnostic; language is set under app/[locale].
export const metadata = {
  metadataBase: siteUrl,
  robots: { index: true, follow: true },
  // Change: Use the supplied square logo across browser and mobile icons.
  icons: {
    icon: "/brand/icon.png",
    shortcut: "/brand/icon.png",
    apple: "/brand/icon.png",
  },
  verification: { google: "t2hsInTVnL66_-4pnR4Qo9cLc5ccKqWiVqCqPhgFqko" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
