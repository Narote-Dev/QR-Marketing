import type { Locale } from "@/lib/i18n/config";
import { defaultQrValues, type QrFormValues, type QrType } from "@/lib/qr/types";
import { applyTemplate } from "@/lib/templates/apply";
import type { QrTemplate, TemplateCategory } from "@/lib/templates/types";
import { getUseCasePage, useCaseMeta, type UseCaseSlug } from "@/lib/seo/use-cases";

/** Change: Phase D one-click starters reuse existing use-case type/template/frame defaults. */
export const starterIds = [
  "restaurant-menu",
  "hotel-wifi",
  "google-review",
  "line",
  "business-card",
] as const;
export type StarterId = (typeof starterIds)[number];

export type QrStarter = {
  id: StarterId;
  useCaseSlug: UseCaseSlug;
};

export const starters: QrStarter[] = [
  { id: "restaurant-menu", useCaseSlug: "thai-restaurant-menu" },
  { id: "hotel-wifi", useCaseSlug: "hotel-wifi" },
  { id: "google-review", useCaseSlug: "google-review-shop" },
  { id: "line", useCaseSlug: "line-contact" },
  { id: "business-card", useCaseSlug: "business-contact-card" },
];

export type StarterConfig = {
  id: StarterId;
  useCaseSlug: UseCaseSlug;
  type: QrType;
  templateId: string;
  templateCategory: TemplateCategory;
  frameText: string;
  helperHint: string;
  downloadFileName: string;
};

const qrTypeContentKeys: Record<QrType, readonly (keyof QrFormValues)[]> = {
  url: ["url"],
  text: ["text"],
  wifi: ["wifiSsid", "wifiPassword", "wifiEncryption"],
  email: ["email", "emailSubject", "emailBody"],
  phone: ["phone"],
  sms: ["smsPhone", "smsMessage"],
  vcard: ["vcardFirstName", "vcardLastName", "vcardOrganization", "vcardPhone", "vcardEmail", "vcardWebsite"],
  whatsapp: ["whatsappPhone", "whatsappMessage"],
  line: ["lineId"],
  "google-review": ["googleReviewUrl"],
  location: ["locationLatitude", "locationLongitude", "locationLabel"],
  event: ["eventTitle", "eventLocation", "eventStart", "eventEnd"],
  telegram: ["telegramId"],
  social: ["socialNetwork", "socialHandleOrUrl"],
  payment: ["paymentProvider", "paymentHandleOrUrl"],
};

/** Step 1: Treat only the visible type's fields as user-entered content. */
export function isQrTypeContentDirty(type: QrType, values: QrFormValues): boolean {
  return qrTypeContentKeys[type].some((key) => values[key] !== defaultQrValues[key]);
}

/** Step 2: Confirm when a starter would hide dirty fields by switching type. Values are never reset. */
export function starterNeedsConfirm(currentType: QrType, values: QrFormValues, nextType: QrType): boolean {
  return nextType !== currentType && isQrTypeContentDirty(currentType, values);
}

/** Step 3: Resolve locale-specific frame text and the shared use-case template/type. */
export function getStarterConfig(id: StarterId, locale: Locale): StarterConfig {
  const starter = starters.find((item) => item.id === id);
  if (!starter) throw new Error(`Unknown starter: ${id}`);
  const meta = useCaseMeta[starter.useCaseSlug];
  const page = getUseCasePage(locale, starter.useCaseSlug);
  return {
    id,
    useCaseSlug: starter.useCaseSlug,
    type: meta.recommendedQrType,
    templateId: meta.templateId,
    templateCategory: meta.templateCategory,
    frameText: page.frameText,
    helperHint: page.helperHint,
    downloadFileName: page.downloadFileName,
  };
}

export function isStarterId(value: string): value is StarterId {
  return starterIds.includes(value as StarterId);
}

/** Step 4: Apply type/template/frame from a starter without wiping form values. */
export function applyStarterSelection(values: QrFormValues, template: QrTemplate, config: StarterConfig) {
  return {
    type: config.type,
    values,
    design: { ...applyTemplate(template), frameText: config.frameText },
    selectedTemplateId: template.id,
    templateCategory: config.templateCategory,
  };
}
