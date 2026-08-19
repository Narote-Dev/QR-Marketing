import { getAssetPath } from "@/lib/assets/catalog";
import { presetPreviewPath } from "@/lib/assets/paths";
import type { QrTemplate, TemplateCategory } from "@/lib/templates/types";

function requireAsset(id: string): string {
  const path = getAssetPath(id);
  if (!path) throw new Error(`Missing preset asset: ${id}`);
  return path;
}

/** Change: Curated demo templates — one starter design per category for Phase 3.5. */
export const templates: QrTemplate[] = [
  {
    id: "restaurant-warm",
    name: "Warm Table",
    slug: "warm-table",
    category: "restaurant",
    thumbnail: requireAsset("thumb-restaurant"),
    previewImage: presetPreviewPath("restaurant.svg"),
    defaultForegroundColor: "#7c2d12",
    defaultBackgroundColor: "#fff7ed",
    defaultDotStyle: "rounded",
    defaultEyeStyle: "extra-rounded",
    defaultFrame: "label",
    defaultFrameText: "Scan for menu",
    logo: requireAsset("logo-restaurant"),
    backgroundImage: requireAsset("bg-warm"),
    description: "Warm orange dining look for table tents and printed menus.",
  },
  {
    id: "cafe-mint",
    name: "Morning Brew",
    slug: "morning-brew",
    category: "cafe",
    thumbnail: requireAsset("thumb-cafe"),
    previewImage: presetPreviewPath("cafe.svg"),
    defaultForegroundColor: "#0f766e",
    defaultBackgroundColor: "#ecfdf5",
    defaultDotStyle: "dots",
    defaultEyeStyle: "rounded",
    defaultFrame: "border",
    defaultFrameText: "WiFi & menu",
    logo: requireAsset("logo-cafe"),
    backgroundImage: requireAsset("bg-mint"),
    description: "Fresh mint cafe style for loyalty cards and counter signs.",
  },
  {
    id: "hotel-slate",
    name: "Lobby Blue",
    slug: "lobby-blue",
    category: "hotel",
    thumbnail: requireAsset("thumb-hotel"),
    previewImage: presetPreviewPath("hotel.svg"),
    defaultForegroundColor: "#1e3a8a",
    defaultBackgroundColor: "#eff6ff",
    defaultDotStyle: "classy",
    defaultEyeStyle: "square",
    defaultFrame: "label",
    defaultFrameText: "Guest WiFi",
    logo: requireAsset("logo-hotel"),
    backgroundImage: requireAsset("bg-cool"),
    description: "Calm hospitality palette for room cards and lobby stands.",
  },
  {
    id: "retail-bold",
    name: "Shop Window",
    slug: "shop-window",
    category: "retail",
    thumbnail: requireAsset("thumb-retail"),
    previewImage: presetPreviewPath("retail.svg"),
    defaultForegroundColor: "#9f1239",
    defaultBackgroundColor: "#fff1f2",
    defaultDotStyle: "square",
    defaultEyeStyle: "square",
    defaultFrame: "border",
    defaultFrameText: "Shop now",
    logo: requireAsset("logo-retail"),
    backgroundImage: requireAsset("bg-warm"),
    description: "High-contrast retail look for window stickers and shelf tags.",
  },
  {
    id: "business-navy",
    name: "Office Card",
    slug: "office-card",
    category: "business",
    thumbnail: requireAsset("thumb-business"),
    previewImage: presetPreviewPath("business.svg"),
    defaultForegroundColor: "#0f172a",
    defaultBackgroundColor: "#f8fafc",
    defaultDotStyle: "classy-rounded",
    defaultEyeStyle: "rounded",
    defaultFrame: "label",
    defaultFrameText: "Connect",
    logo: requireAsset("logo-business"),
    backgroundImage: requireAsset("bg-cool"),
    description: "Professional navy card style for networking handouts.",
  },
  {
    id: "event-night",
    name: "Stage Night",
    slug: "stage-night",
    category: "event",
    thumbnail: requireAsset("thumb-event"),
    previewImage: presetPreviewPath("event.svg"),
    defaultForegroundColor: "#4c1d95",
    defaultBackgroundColor: "#f5f3ff",
    defaultDotStyle: "extra-rounded",
    defaultEyeStyle: "extra-rounded",
    defaultFrame: "label",
    defaultFrameText: "Join the event",
    logo: requireAsset("logo-event"),
    backgroundImage: requireAsset("bg-cool"),
    description: "Vibrant event palette for posters, badges, and tickets.",
  },
  {
    id: "wifi-signal",
    name: "Guest Access",
    slug: "guest-access",
    category: "wifi",
    thumbnail: requireAsset("thumb-wifi"),
    previewImage: presetPreviewPath("wifi.svg"),
    defaultForegroundColor: "#0369a1",
    defaultBackgroundColor: "#f0f9ff",
    defaultDotStyle: "rounded",
    defaultEyeStyle: "dot",
    defaultFrame: "label",
    defaultFrameText: "Connect to WiFi",
    logo: requireAsset("logo-wifi"),
    backgroundImage: requireAsset("bg-mint"),
    description: "Clear WiFi share style for cafes, hotels, and reception desks.",
  },
  {
    id: "menu-board",
    name: "Board Specials",
    slug: "board-specials",
    category: "menu",
    thumbnail: requireAsset("thumb-menu"),
    previewImage: presetPreviewPath("menu.svg"),
    defaultForegroundColor: "#365314",
    defaultBackgroundColor: "#f7fee7",
    defaultDotStyle: "classy",
    defaultEyeStyle: "rounded",
    defaultFrame: "border",
    defaultFrameText: "View menu",
    logo: requireAsset("logo-menu"),
    backgroundImage: requireAsset("bg-warm"),
    description: "Readable menu-board look for QR links to digital menus.",
  },
  {
    id: "review-star",
    name: "Leave a Review",
    slug: "leave-a-review",
    category: "google-review",
    thumbnail: requireAsset("thumb-review"),
    previewImage: presetPreviewPath("review.svg"),
    defaultForegroundColor: "#a16207",
    defaultBackgroundColor: "#fefce8",
    defaultDotStyle: "dots",
    defaultEyeStyle: "square",
    defaultFrame: "label",
    defaultFrameText: "Rate us",
    logo: requireAsset("logo-review"),
    backgroundImage: requireAsset("bg-warm"),
    description: "Friendly review prompt style for receipt inserts and counters.",
  },
];

/** Step 1: Find a template by id. */
export function getTemplateById(id: string): QrTemplate | undefined {
  return templates.find((template) => template.id === id);
}

/** Step 2: Find a template by category + slug. */
export function getTemplateBySlug(category: TemplateCategory, slug: string): QrTemplate | undefined {
  return templates.find((template) => template.category === category && template.slug === slug);
}

/** Step 3: List templates in one category. */
export function getTemplatesByCategory(category: TemplateCategory): QrTemplate[] {
  return templates.filter((template) => template.category === category);
}

/** Step 4: Related templates for SEO pages (same category first, then fillers). */
export function getRelatedTemplates(category: TemplateCategory, limit = 3): QrTemplate[] {
  const same = getTemplatesByCategory(category);
  if (same.length >= limit) return same.slice(0, limit);
  const others = templates.filter((template) => template.category !== category);
  return [...same, ...others].slice(0, limit);
}
