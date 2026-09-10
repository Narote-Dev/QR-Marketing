import Link from "next/link";
import { Check } from "lucide-react";
import { HomeSection, homeUi } from "@/components/home/ui";
import { htmlLang, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { formatPlanFeature, formatPlanPrice, pricingPlans } from "@/lib/pricing/plans";
import { cn } from "@/lib/utils";

type Props = { locale: Locale; dictionary: Dictionary };

export function HomePricing({ locale, dictionary }: Props) {
  const copy = dictionary.home.pricing;
  const intlLocale = htmlLang[locale];
  const contactPath = localizedPath(locale, "/contact");

  return (
    <HomeSection id="pricing" eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} tone="white">
      <ul className="mt-10 grid gap-4 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const planCopy = copy.plans[plan.code];
          const price = formatPlanPrice(plan, intlLocale);
          // Step 1: Build the feature list from config so limits never drift from the backend seed.
          const features = [
            formatPlanFeature(copy.dynamicQrFeature, plan.dynamicQrLimit, intlLocale),
            formatPlanFeature(
              plan.scanPeriod === "year" ? copy.scansPerYearFeature : copy.scansPerMonthFeature,
              plan.scanLimit,
              intlLocale,
            ),
            ...(plan.apiAccess ? [copy.apiFeature] : []),
            ...planCopy.extras,
          ];
          // Step 2: Only the Free plan can be started today; paid plans route to contact.
          const ctaHref = plan.available ? "#generator" : contactPath;

          return (
            <li
              key={plan.code}
              className={cn(
                "flex flex-col rounded-3xl border p-6 sm:p-7",
                plan.highlighted ? "border-brand-teal/50 bg-brand-cream/50 shadow-md" : "border-slate-200/80 bg-white shadow-sm",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-slate-900">{planCopy.name}</h3>
                {!plan.available && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200/80">
                    {copy.comingSoon}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-600">{planCopy.tagline}</p>
              <p className="mt-5 flex items-baseline gap-1">
                {price === null ? (
                  <span className="text-2xl font-bold text-slate-500">{copy.comingSoon}</span>
                ) : price === "0" ? (
                  <span className="text-4xl font-bold tracking-tight text-slate-900">{copy.freePrice}</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold tracking-tight text-slate-900">{price}</span>
                    <span className="text-sm text-slate-500">{copy.perMonth}</span>
                  </>
                )}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-700">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={ctaHref}
                className={cn("mt-7 w-full", plan.highlighted || plan.available ? homeUi.buttonPrimary : homeUi.buttonSecondary)}
              >
                {planCopy.cta}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-xs leading-5 text-slate-500">{copy.note}</p>
    </HomeSection>
  );
}
