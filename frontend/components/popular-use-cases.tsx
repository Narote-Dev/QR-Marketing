import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { getFeaturedUseCasePages, useCasePathForSlug } from "@/lib/seo/use-cases";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  limit?: number;
};

export function PopularUseCases({ locale, dictionary, limit = 6 }: Props) {
  // Step 1: Surface featured long-tail pages from hub pages for crawl depth.
  const pages = getFeaturedUseCasePages(locale, limit);

  return (
    <section className="mt-12" aria-labelledby="popular-use-cases-heading">
      <h2 id="popular-use-cases-heading" className="text-2xl font-bold tracking-tight">
        {dictionary.chrome.popularUseCases}
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={localizedPath(locale, useCasePathForSlug(page.slug))}
            className="rounded-xl border bg-white p-4 transition hover:border-brand-teal hover:shadow-sm"
          >
            <h3 className="font-semibold text-brand-teal-dark">{page.h1}</h3>
            <p className="mt-1 text-sm text-slate-600">{page.promise}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
