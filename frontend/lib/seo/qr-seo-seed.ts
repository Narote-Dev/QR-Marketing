import type { PaymentProvider, QrType, SocialNetwork } from "@/lib/qr/types";

/** SEO route slugs under `/qr-code/[type]` (includes social brand pages that seed Social type). */
export const qrSeoSlugs = [
  "url",
  "wifi",
  "email",
  "phone",
  "sms",
  "vcard",
  "whatsapp",
  "line",
  "google-review",
  "dynamic",
  "youtube",
  "tiktok",
  "linkedin",
  "snapchat",
  "reddit",
  "discord",
  "spotify",
  "soundcloud",
  "kakaotalk",
  "payment",
] as const;

export type QrSeoSlug = (typeof qrSeoSlugs)[number];

export type QrSeoGeneratorSeed = {
  initialType: QrType;
  initialSocialNetwork?: SocialNetwork;
  initialPaymentProvider?: PaymentProvider;
};

const socialSeoNetworks = [
  "youtube",
  "tiktok",
  "linkedin",
  "snapchat",
  "reddit",
  "discord",
  "spotify",
  "soundcloud",
  "kakaotalk",
] as const satisfies readonly SocialNetwork[];

function isSocialSeoSlug(slug: QrSeoSlug): slug is (typeof socialSeoNetworks)[number] {
  return (socialSeoNetworks as readonly string[]).includes(slug);
}

/** Step 1: Map an SEO page slug to generator type + optional Social/Payment defaults. */
export function getQrSeoGeneratorSeed(slug: QrSeoSlug): QrSeoGeneratorSeed {
  // Change: Dynamic SEO page opens the URL form; Dynamic mode is a separate toggle.
  if (slug === "dynamic") return { initialType: "url" };
  if (slug === "payment") return { initialType: "payment", initialPaymentProvider: "paypal" };
  if (isSocialSeoSlug(slug)) return { initialType: "social", initialSocialNetwork: slug };
  return { initialType: slug };
}
