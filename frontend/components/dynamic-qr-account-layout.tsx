import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  currentPath: string;
  children: React.ReactNode;
};

/** Full-width account shell for Dynamic QR pages. */
export function DynamicQrAccountLayout({ locale, dictionary, currentPath, children }: Props) {
  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} currentPath={currentPath} />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">{children}</main>
    </>
  );
}
