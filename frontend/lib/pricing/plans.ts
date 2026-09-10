/**
 * Change: Config-driven pricing teaser for the homepage.
 *
 * Plan limits mirror the backend seed in
 * `backend/QrMarketing.Api/Data/Seed/SubscriptionSeed.cs` (plans free/pro/business).
 * Prices are intentionally `null` until the owner decides them; the UI renders
 * "Coming soon" for any plan without a price. No billing exists yet — keep
 * `available: false` for paid plans until checkout ships.
 */

export type PricingPlanCode = "free" | "pro" | "business";

export type PricingPlan = {
  code: PricingPlanCode;
  /** Monthly price in `currency`, or null when not yet decided. */
  monthlyPrice: number | null;
  currency: "USD";
  /** Max simultaneously active Dynamic QR codes. */
  dynamicQrLimit: number;
  /** Scan quota per `scanPeriod`. */
  scanLimit: number;
  scanPeriod: "year" | "month";
  apiAccess: boolean;
  /** True when a user can actually be on this plan today. */
  available: boolean;
  highlighted?: boolean;
};

export const pricingPlans: readonly PricingPlan[] = [
  {
    code: "free",
    monthlyPrice: 0,
    currency: "USD",
    dynamicQrLimit: 6,
    scanLimit: 7_000,
    scanPeriod: "year",
    apiAccess: false,
    available: true,
  },
  {
    code: "pro",
    monthlyPrice: null,
    currency: "USD",
    dynamicQrLimit: 25,
    scanLimit: 100_000,
    scanPeriod: "month",
    apiAccess: true,
    available: false,
    highlighted: true,
  },
  {
    code: "business",
    monthlyPrice: null,
    currency: "USD",
    dynamicQrLimit: 100,
    scanLimit: 500_000,
    scanPeriod: "month",
    apiAccess: true,
    available: false,
  },
] as const;

/** Step 1: Replace a `{count}` token with a locale-formatted number. */
export function formatPlanFeature(template: string, count: number, locale: string): string {
  return template.replace("{count}", new Intl.NumberFormat(locale).format(count));
}

/** Step 2: Format a plan price or return null so the UI can show a "coming soon" label. */
export function formatPlanPrice(plan: PricingPlan, locale: string): string | null {
  if (plan.monthlyPrice === null) return null;
  if (plan.monthlyPrice === 0) return "0";
  return new Intl.NumberFormat(locale, { style: "currency", currency: plan.currency, maximumFractionDigits: 0 }).format(
    plan.monthlyPrice,
  );
}
