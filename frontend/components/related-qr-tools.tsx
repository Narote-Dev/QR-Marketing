import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { getBulkPage, getQrPages, type QrSeoSlug } from "@/lib/seo/site";

type Props = {
  slugs: string[];
  locale: Locale;
  dictionary: Dictionary;
};

export function RelatedQrTools({ slugs, locale, dictionary }: Props) {
  // Step 1: Resolve related tools from the active locale dictionary.
  const pages = getQrPages(dictionary);
  const bulkPage = getBulkPage(dictionary);

  return (
    <section className="mt-12" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-bold tracking-tight">
        {dictionary.chrome.relatedTools}
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {slugs.map((slug) => {
          if (slug === "bulk-qr-generator") {
            return (
              <Link
                key={slug}
                href={localizedPath(locale, "/bulk-qr-generator")}
                className="rounded-xl border bg-white p-4 transition hover:border-brand-teal hover:shadow-sm"
              >
                <h3 className="font-semibold text-brand-teal-dark">{bulkPage.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{dictionary.seo.bulk.description}</p>
              </Link>
            );
          }

          const page = pages[slug as QrSeoSlug];
          if (!page) return null;
          const blurb = dictionary.relatedToolBlurbs[slug as keyof Dictionary["relatedToolBlurbs"]];
          return (
            <Link
              key={slug}
              href={localizedPath(locale, `/qr-code/${page.slug}`)}
              className="rounded-xl border bg-white p-4 transition hover:border-brand-teal hover:shadow-sm"
            >
              <h3 className="font-semibold text-brand-teal-dark">{page.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{blurb}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
