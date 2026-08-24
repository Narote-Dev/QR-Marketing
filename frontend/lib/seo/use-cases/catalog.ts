import type { UseCaseMeta, UseCaseSlug } from "@/lib/seo/use-cases/types";

/** Change: Stable routing and tool defaults for each long-tail use-case page. */
export const useCaseMeta: Record<UseCaseSlug, UseCaseMeta> = {
  "thai-restaurant-menu": {
    slug: "thai-restaurant-menu",
    cluster: "food-menu",
    recommendedQrType: "url",
    templateCategory: "menu",
    templateId: "menu-board",
    related: ["cafe-menu", "restaurant-table-tent", "google-review-shop"],
  },
  "cafe-menu": {
    slug: "cafe-menu",
    cluster: "food-menu",
    recommendedQrType: "url",
    templateCategory: "cafe",
    templateId: "cafe-mint",
    related: ["thai-restaurant-menu", "free-wifi-no-signup", "restaurant-table-tent"],
  },
  "free-wifi-no-signup": {
    slug: "free-wifi-no-signup",
    cluster: "wifi",
    recommendedQrType: "wifi",
    templateCategory: "wifi",
    templateId: "wifi-signal",
    related: ["hotel-wifi", "cafe-menu", "business-contact-card"],
  },
  "hotel-wifi": {
    slug: "hotel-wifi",
    cluster: "wifi",
    recommendedQrType: "wifi",
    templateCategory: "hotel",
    templateId: "hotel-slate",
    related: ["free-wifi-no-signup", "business-contact-card", "event-poster"],
  },
  "google-review-shop": {
    slug: "google-review-shop",
    cluster: "local-business",
    recommendedQrType: "url",
    templateCategory: "google-review",
    templateId: "review-star",
    related: ["storefront-promo", "business-contact-card", "thai-restaurant-menu"],
  },
  "business-contact-card": {
    slug: "business-contact-card",
    cluster: "local-business",
    recommendedQrType: "url",
    templateCategory: "business",
    templateId: "business-navy",
    related: ["line-contact", "google-review-shop", "storefront-promo"],
  },
  "storefront-promo": {
    slug: "storefront-promo",
    cluster: "storefront-event",
    recommendedQrType: "url",
    templateCategory: "retail",
    templateId: "retail-bold",
    related: ["event-poster", "google-review-shop", "line-contact"],
  },
  "event-poster": {
    slug: "event-poster",
    cluster: "storefront-event",
    recommendedQrType: "url",
    templateCategory: "event",
    templateId: "event-night",
    related: ["storefront-promo", "line-contact", "business-contact-card"],
  },
  "line-contact": {
    slug: "line-contact",
    cluster: "local-business",
    recommendedQrType: "url",
    templateCategory: "business",
    templateId: "business-navy",
    related: ["business-contact-card", "storefront-promo", "google-review-shop"],
  },
  "restaurant-table-tent": {
    slug: "restaurant-table-tent",
    cluster: "food-menu",
    recommendedQrType: "url",
    templateCategory: "restaurant",
    templateId: "restaurant-warm",
    related: ["thai-restaurant-menu", "cafe-menu", "free-wifi-no-signup"],
  },
};

export function useCasePathForSlug(slug: UseCaseSlug): string {
  return `/use-cases/${slug}`;
}
