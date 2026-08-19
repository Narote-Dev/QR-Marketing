import type { DotStyle, EyeStyle, FrameStyle } from "@/lib/qr/design";

export const templateCategories = [
  "restaurant",
  "cafe",
  "hotel",
  "retail",
  "business",
  "event",
  "wifi",
  "menu",
  "google-review",
] as const;

export type TemplateCategory = (typeof templateCategories)[number];

export const templateCategoryLabels: Record<TemplateCategory, string> = {
  restaurant: "Restaurant",
  cafe: "Cafe",
  hotel: "Hotel",
  retail: "Retail",
  business: "Business",
  event: "Event",
  wifi: "WiFi",
  menu: "Menu",
  "google-review": "Google Review",
};

export type QrTemplate = {
  id: string;
  name: string;
  slug: string;
  category: TemplateCategory;
  thumbnail: string;
  previewImage: string;
  defaultForegroundColor: string;
  defaultBackgroundColor: string;
  defaultDotStyle: DotStyle;
  defaultEyeStyle: EyeStyle;
  defaultFrame: FrameStyle;
  defaultFrameText: string;
  logo?: string;
  backgroundImage?: string;
  description: string;
};
