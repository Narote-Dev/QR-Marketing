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

/**
 * Phase C — QR hubs thickened to menu-template depth (body + howTo + FAQs).
 * Ads may run only on these indexed thick type pages among /qr-code/[type].
 */
export const thickQrSeoSlugs = [
  "url",
  "wifi",
  "line",
  "google-review",
  "vcard",
] as const satisfies readonly QrSeoSlug[];

export type ThickQrSeoSlug = (typeof thickQrSeoSlugs)[number];

const noindexQrSet = new Set<string>(noindexQrSeoSlugs);
const noindexUseCaseSet = new Set<string>(noindexUseCaseSlugs);
const thickQrSet = new Set<string>(thickQrSeoSlugs);

/** Step 1: QR type SEO pages that remain in the sitemap and stay indexable. */
export function isQrSeoIndexed(slug: string): boolean {
  return !noindexQrSet.has(slug);
}

/** Step 2: Use-case landings that remain in the sitemap and stay indexable. */
export function isUseCaseIndexed(slug: string): boolean {
  return !noindexUseCaseSet.has(slug);
}

/** Step 3: QR type hubs that reached Phase C content depth. */
export function isQrSeoThick(slug: string): boolean {
  return thickQrSet.has(slug);
}

/**
 * Step 4: Whether AdSense (slots + Auto ads script) may run on this bare path.
 * Change: Noindex/thin QR type hubs never show ads; Phase C thick hubs may.
 */
export function allowsAdsOnBarePath(barePath: string): boolean {
  const normalized = barePath.replace(/\/+$/, "") || "/";

  const qrMatch = normalized.match(/^\/qr-code\/([^/]+)$/);
  if (qrMatch) {
    return isQrSeoThick(qrMatch[1]);
  }

  const useCaseMatch = normalized.match(/^\/use-cases\/([^/]+)$/);
  if (useCaseMatch) {
    return isUseCaseIndexed(useCaseMatch[1]);
  }

  return true;
}

/** Step 5: Resolve bare path after locale prefix for middleware / layout ads gating. */
export function barePathFromLocalizedPathname(pathname: string): string {
  const match = pathname.match(/^\/(en|th|zh)(\/.*)?$/);
  if (!match) return pathname.split("?")[0] || "/";
  return match[2] && match[2].length > 0 ? match[2] : "/";
}
