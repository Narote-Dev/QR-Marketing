import { AdSenseScript } from "@/components/adsense-script";
import { siteUrl } from "@/lib/seo/site";
import "./globals.css";

// Change: Root layout stays locale-agnostic; language is set under app/[locale].
export const metadata = {
  metadataBase: siteUrl,
  robots: { index: true, follow: true },
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
