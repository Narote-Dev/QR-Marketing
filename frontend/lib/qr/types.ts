// Change: Phase A/B static QR content types (generator); SEO only for Phase A slugs.
// Change: Expand Social networks + add Payment type for static deep links (no hosting).
export const qrTypes = [
  "url",
  "text",
  "wifi",
  "email",
  "phone",
  "sms",
  "vcard",
  "whatsapp",
  "line",
  "google-review",
  "location",
  "event",
  "telegram",
  "social",
  "payment",
] as const;
export type QrType = (typeof qrTypes)[number];

export const socialNetworks = [
  "facebook",
  "instagram",
  "x",
  "youtube",
  "tiktok",
  "linkedin",
  "snapchat",
  "reddit",
  "discord",
  "spotify",
  "soundcloud",
  "kakaotalk",
] as const;
export type SocialNetwork = (typeof socialNetworks)[number];

export const paymentProviders = ["paypal", "venmo", "etsy", "revolut", "amazon", "crypto"] as const;
export type PaymentProvider = (typeof paymentProviders)[number];

export type QrFormValues = {
  url: string;
  text: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: "WPA" | "WEP" | "nopass";
  email: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  smsPhone: string;
  smsMessage: string;
  vcardFirstName: string;
  vcardLastName: string;
  vcardOrganization: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardWebsite: string;
  whatsappPhone: string;
  whatsappMessage: string;
  lineId: string;
  googleReviewUrl: string;
  locationLatitude: string;
  locationLongitude: string;
  locationLabel: string;
  eventTitle: string;
  eventLocation: string;
  eventStart: string;
  eventEnd: string;
  telegramId: string;
  socialNetwork: SocialNetwork;
  socialHandleOrUrl: string;
  paymentProvider: PaymentProvider;
  paymentHandleOrUrl: string;
};

export const defaultQrValues: QrFormValues = {
  url: "https://example.com",
  text: "",
  wifiSsid: "",
  wifiPassword: "",
  wifiEncryption: "WPA",
  email: "",
  emailSubject: "",
  emailBody: "",
  phone: "",
  smsPhone: "",
  smsMessage: "",
  vcardFirstName: "",
  vcardLastName: "",
  vcardOrganization: "",
  vcardPhone: "",
  vcardEmail: "",
  vcardWebsite: "",
  whatsappPhone: "",
  whatsappMessage: "",
  lineId: "",
  googleReviewUrl: "",
  locationLatitude: "",
  locationLongitude: "",
  locationLabel: "",
  eventTitle: "",
  eventLocation: "",
  eventStart: "",
  eventEnd: "",
  telegramId: "",
  socialNetwork: "instagram",
  socialHandleOrUrl: "",
  paymentProvider: "paypal",
  paymentHandleOrUrl: "",
};

export const qrTypeLabels: Record<QrType, string> = {
  url: "URL",
  text: "Text",
  wifi: "WiFi",
  email: "Email",
  phone: "Phone",
  sms: "SMS",
  vcard: "vCard",
  whatsapp: "WhatsApp",
  line: "LINE",
  "google-review": "Google Review",
  location: "Location",
  event: "Event",
  telegram: "Telegram",
  social: "Social",
  payment: "Payment",
};
