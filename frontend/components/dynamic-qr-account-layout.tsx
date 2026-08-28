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
    <main className="min-h-screen w-full">
      <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SiteHeader
            locale={locale}
            dictionary={dictionary}
            currentPath={currentPath}
            sticky={false}
            className="mb-0 border-b-0 pb-4 pt-4 sm:pb-5 sm:pt-5"
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">{children}</div>
    </main>
  );
}
