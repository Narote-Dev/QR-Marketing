import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/seo/site";
import type { TemplateCategory } from "@/lib/templates/types";

export type TemplateSeoPage = {
  slug: string;
  category?: TemplateCategory;
  title: string;
  description: string;
  h1: string;
  introduction: string;
  body: string[];
  howTo: string[];
  faqs: { question: string; answer: string }[];
  related: TemplateCategory[];
  recommendedQrType: "url" | "wifi" | "text";
};

/** Change: Curated template SEO pages only — avoid thin programmatic category pages. */
export const templateIndexPage: TemplateSeoPage = {
  slug: "templates",
  title: "QR Code Templates",
  description: "Browse curated QR code templates for restaurants, cafes, hotels, menus, WiFi sharing, and more. Preview a design, enter your content, and download a composite QR.",
  h1: "QR code templates for real-world use",
  introduction: "Start from a ready-made visual style instead of blank colors. Each template applies colors, frames, logos, and backgrounds you can still customize before downloading.",
  body: [
    "Templates are curated for common print and countertop moments: menus, guest WiFi, storefront signs, and review prompts.",
    "Selecting a template only changes the visual design. Your URL, WiFi details, or message stay under your control.",
    "All assets in this release are local demo placeholders so you can swap brand artwork later without changing the data model.",
  ],
  howTo: [
    "Open a category that matches your use case, or browse all templates on this page.",
    "Select a template to apply its design to the generator.",
    "Enter the QR content, adjust colors or logos if needed, then download the composite PNG.",
  ],
  faqs: [
    { question: "Are these templates free to use?", answer: "Yes. The generator creates static QR codes in your browser. Demo images are placeholders you can replace with your own assets." },
    { question: "Will choosing a template change my QR destination?", answer: "No. Templates only apply visual settings such as colors, frames, logos, and backgrounds." },
  ],
  related: ["restaurant", "cafe", "hotel", "menu", "wifi"],
  recommendedQrType: "url",
};

export const templateCategoryPages = {
  restaurant: {
    slug: "restaurant",
    category: "restaurant",
    title: "Restaurant QR Code Templates",
    description: "Warm restaurant QR templates for menus, table tents, and reservation links. Customize colors and download a ready-to-print static code.",
    h1: "Restaurant QR templates",
    introduction: "Give diners a scannable path to your menu, booking page, or specials board. These templates use warm dining tones and clear frame labels suited to tabletop print.",
    body: [
      "Restaurant templates default to high-contrast warm colors that remain readable on cream paper stock.",
      "Pair a menu URL with the Warm Table template, then replace the demo logo with your brand mark before printing.",
      "Keep the destination URL stable — static QR codes cannot be redirected later without reprinting.",
    ],
    howTo: ["Choose the Warm Table restaurant template.", "Switch the QR type to URL and paste your menu or booking link.", "Download the composite PNG and test-scan it before sending to print."],
    faqs: [
      { question: "What should a restaurant QR link to?", answer: "A digital menu, reservation form, or today’s specials page works best." },
      { question: "Can I keep the frame text in my language?", answer: "Yes. Edit the frame text in the designer after applying the template." },
    ],
    related: ["menu", "cafe", "wifi"],
    recommendedQrType: "url",
  },
  cafe: {
    slug: "cafe",
    category: "cafe",
    title: "Cafe QR Code Templates",
    description: "Fresh cafe QR templates for loyalty links, menus, and countertop WiFi. Preview instantly and download a composite static QR code.",
    h1: "Cafe QR templates",
    introduction: "Cafe counters need codes that look friendly and scan quickly. These mint-toned templates work for loyalty sign-ups, drinks menus, and guest WiFi cards.",
    body: [
      "Morning Brew uses teal accents and rounded dots that feel informal without sacrificing scan reliability.",
      "Use a short HTTPS landing page rather than a long social URL when possible.",
      "If you add a logo, leave error correction on High so cups and soft lighting do not break scans.",
    ],
    howTo: ["Select the Morning Brew cafe template.", "Enter your loyalty or menu URL.", "Adjust the logo size if needed, then download and place the code near the register."],
    faqs: [
      { question: "Can I use the same template for WiFi?", answer: "Yes. Apply the template, switch the QR type to WiFi, and fill in network details." },
      { question: "Do cafe templates include real coffee photos?", answer: "No. This phase ships local placeholder artwork you can replace later." },
    ],
    related: ["restaurant", "wifi", "menu"],
    recommendedQrType: "url",
  },
  hotel: {
    slug: "hotel",
    category: "hotel",
    title: "Hotel QR Code Templates",
    description: "Hospitality QR templates for guest WiFi, concierge links, and lobby stands. Customize the Lobby Blue look and download a composite PNG.",
    h1: "Hotel QR templates",
    introduction: "Hotels often need polished codes for room cards and lobby desks. Lobby Blue keeps a calm navy palette while remaining easy to scan under indoor lighting.",
    body: [
      "Use hotel templates for guest WiFi, house directory pages, or upsell experiences such as spa bookings.",
      "Room cards benefit from the label frame so guests know what the code does before scanning.",
      "Always verify the destination on a phone before mass-printing key packets.",
    ],
    howTo: ["Apply the Lobby Blue hotel template.", "Choose WiFi or URL depending on the guest journey.", "Download the composite PNG and include it on room collateral."],
    faqs: [
      { question: "Should hotels encode WiFi passwords in QR codes?", answer: "Only for guest networks you intend to share. Anyone with the printed code can read the password from the QR payload." },
      { question: "Can I change the hotel logo?", answer: "Yes. Replace the preset logo with your brand mark in the designer." },
    ],
    related: ["wifi", "business", "cafe"],
    recommendedQrType: "wifi",
  },
  menu: {
    slug: "menu",
    category: "menu",
    title: "Menu QR Code Templates",
    description: "Digital menu QR templates for restaurants and cafes. Apply a readable board style, link your menu URL, and download a print-ready static code.",
    h1: "Menu QR templates",
    introduction: "Menu QR codes should be readable from a table edge and obvious in purpose. Board Specials uses a clear border and leafy green palette suited to printed menus.",
    body: [
      "Link to a mobile-friendly menu page that loads quickly on cellular networks.",
      "Avoid putting the entire menu text inside the QR payload — use a URL instead.",
      "If you laminate the print, leave quiet space around the code so reflections do not hide the edges.",
    ],
    howTo: ["Select the Board Specials menu template.", "Paste the HTTPS link to your digital menu.", "Download the PNG and place it near the top of the printed menu."],
    faqs: [
      { question: "Can one menu QR serve multiple languages?", answer: "Yes. Point it to a landing page that lets guests choose a language." },
      { question: "Will updating the online menu break the QR?", answer: "No, as long as the URL stays the same." },
    ],
    related: ["restaurant", "cafe", "wifi"],
    recommendedQrType: "url",
  },
  wifi: {
    slug: "wifi",
    category: "wifi",
    title: "WiFi QR Code Templates",
    description: "Guest WiFi QR templates for cafes, hotels, and offices. Apply Guest Access styling, enter network details, and download a composite static QR.",
    h1: "WiFi QR templates",
    introduction: "Sharing WiFi with a QR code removes password typos at the front desk. Guest Access pairs a clear signal mark with a label frame that says exactly what to scan.",
    body: [
      "Enter the SSID exactly as devices list it, including capitalization and spaces.",
      "Prefer WPA/WPA2 for modern networks; open networks should use the No password option.",
      "Print the downloaded composite with enough quiet space so the frame and code remain distinct.",
    ],
    howTo: ["Apply the Guest Access WiFi template.", "Switch the QR type to WiFi and enter network name, security, and password.", "Download the PNG and test it on a phone near the access point."],
    faqs: [
      { question: "Is the WiFi password stored on your servers?", answer: "No. Static WiFi QR creation happens in the browser and is not saved by this app." },
      { question: "Can I hide the password while typing?", answer: "Yes. Use the show/hide control on the password field, then download when ready." },
    ],
    related: ["hotel", "cafe", "business"],
    recommendedQrType: "wifi",
  },
} as const satisfies Record<string, TemplateSeoPage>;

export type TemplateSeoSlug = keyof typeof templateCategoryPages;
export const templateSeoSlugs = Object.keys(templateCategoryPages) as TemplateSeoSlug[];

export function getTemplatePagePath(page: TemplateSeoPage): string {
  return page.slug === "templates" ? "/templates" : `/templates/${page.slug}`;
}

export function getTemplatePageMetadata(page: TemplateSeoPage): Metadata {
  const path = getTemplatePagePath(page);
  const url = new URL(path, siteUrl).toString();
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { type: "website", url, siteName, title: page.title, description: page.description },
    twitter: { card: "summary", title: page.title, description: page.description },
  };
}
