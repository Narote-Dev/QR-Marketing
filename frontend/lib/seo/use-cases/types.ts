import type { QrType } from "@/lib/qr/types";
import type { TemplateCategory } from "@/lib/templates/types";

/** Change: First-wave long-tail use-case slugs for specialized SEO landing pages. */
export const useCaseSlugs = [
  "thai-restaurant-menu",
  "cafe-menu",
  "free-wifi-no-signup",
  "hotel-wifi",
  "google-review-shop",
  "business-contact-card",
  "storefront-promo",
  "event-poster",
  "line-contact",
  "restaurant-table-tent",
] as const;

export type UseCaseSlug = (typeof useCaseSlugs)[number];

export const useCaseClusters = ["food-menu", "wifi", "local-business", "storefront-event"] as const;
export type UseCaseCluster = (typeof useCaseClusters)[number];

export type UseCaseCopy = {
  title: string;
  description: string;
  h1: string;
  introduction: string;
  promise: string;
  body: string[];
  examples: string[];
  howTo: string[];
  faqs: { question: string; answer: string }[];
  helperHint: string;
  frameText: string;
  downloadFileName: string;
};

export type UseCaseMeta = {
  slug: UseCaseSlug;
  cluster: UseCaseCluster;
  recommendedQrType: QrType;
  templateCategory: TemplateCategory;
  templateId: string;
  related: UseCaseSlug[];
};

export type UseCasePage = UseCaseMeta & UseCaseCopy;

export function isUseCaseSlug(value: string): value is UseCaseSlug {
  return useCaseSlugs.includes(value as UseCaseSlug);
}
