import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeUi } from "@/components/home/ui";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";

type Props = { locale: Locale; dictionary: Dictionary };

export function HomeFinalCta({ locale, dictionary }: Props) {
  const copy = dictionary.home.finalCta;

  return (
    <section aria-labelledby="final-cta-heading" className="pb-2 pt-14 sm:pb-4 sm:pt-20">
      <div className={homeUi.container}>
        <div className="rounded-3xl bg-brand-ink px-6 py-12 text-center text-white shadow-lg sm:px-12 sm:py-16">
          <h2 id="final-cta-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            {copy.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">{copy.subheading}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#generator" className={homeUi.buttonPrimary}>
              {copy.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={localizedPath(locale, "/qr-code/dynamic")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
            >
              {copy.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
