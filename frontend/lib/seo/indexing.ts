import type { QrSeoSlug } from "@/lib/seo/qr-seo-seed";
import type { UseCaseSlug } from "@/lib/seo/use-cases/types";

/**
 * Phase A — QR SEO pages that stay reachable in the UI but must not be indexed.
 * Counts as URL × locale (en/th/zh), not type count alone.
 *
 * Social (9 types × 3 = 27 URLs) + thin cores email/phone/sms (9 URLs).
 * Keep indexed for Phase C thickening: url, wifi, line, google-review, vcard, whatsapp, payment, dynamic.
 * Never put templates/menu|wifi|review here — those have GSC impressions.
 */
export const noindexQrSeoSlugs = [
  "youtube",
  "tiktok",
  "linkedin",
  "snapchat",
  "reddit",
  "discord",
  "spotify",
  "soundcloud",
  "kakaotalk",
  "email",
  "phone",
  "sms",
] as const satisfies readonly QrSeoSlug[];

export type NoindexQrSeoSlug = (typeof noindexQrSeoSlugs)[number];

/** Phase A — thin use-case landings with no GSC-click priority; keep tool routes working. */
export const noindexUseCaseSlugs = ["event-poster", "gmail-email"] as const satisfies readonly UseCaseSlug[];

export type NoindexUseCaseSlug = (typeof noindexUseCaseSlugs)[number];

const noindexQrSet = new Set<string>(noindexQrSeoSlugs);
const noindexUseCaseSet = new Set<string>(noindexUseCaseSlugs);

/** Step 1: QR type SEO pages that remain in the sitemap and stay indexable. */
export function isQrSeoIndexed(slug: string): boolean {
  return !noindexQrSet.has(slug);
}

/** Step 2: Use-case landings that remain in the sitemap and stay indexable. */
export function isUseCaseIndexed(slug: string): boolean {
  return !noindexUseCaseSet.has(slug);
}

/**
 * Step 3: Whether AdSense (slots + Auto ads script) may run on this bare path.
 * Change: Noindex/thin QR type hubs never show ads; templates/bulk/indexed use-cases may.
 */
export function allowsAdsOnBarePath(barePath: string): boolean {
  const normalized = barePath.replace(/\/+$/, "") || "/";

  const qrMatch = normalized.match(/^\/qr-code\/([^/]+)$/);
  if (qrMatch) {
    // Change: All /qr-code/[type] pages are still thin until Phase C — block ads page-wide.
    return false;
  }

  const useCaseMatch = normalized.match(/^\/use-cases\/([^/]+)$/);
  if (useCaseMatch) {
    return isUseCaseIndexed(useCaseMatch[1]);
  }

  return true;
}

/** Step 4: Resolve bare path after locale prefix for middleware / layout ads gating. */
export function barePathFromLocalizedPathname(pathname: string): string {
  const match = pathname.match(/^\/(en|th|zh)(\/.*)?$/);
  if (!match) return pathname.split("?")[0] || "/";
  return match[2] && match[2].length > 0 ? match[2] : "/";
}
