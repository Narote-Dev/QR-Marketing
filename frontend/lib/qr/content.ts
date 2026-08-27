import type { PaymentProvider, QrFormValues, QrType, SocialNetwork } from "@/lib/qr/types";
import type { Dictionary } from "@/lib/i18n/types";

export type QrContentResult = { value: string; error?: never } | { value?: never; error: string };

const escapeWifi = (value: string) => value.replace(/([\\;,:"])/g, "\\$1");
const escapeVCard = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
const escapeICalText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
const validPhone = (value: string) => /^\+?[0-9().\-\s]{5,}$/.test(value.trim());
const normalizedPhone = (value: string) => value.trim().replace(/[().\-\s]/g, "");

function buildHttpsUrl(raw: string, errors?: Dictionary["errors"]): QrContentResult {
  try {
    const url = new URL(raw.trim());
    return url.protocol === "http:" || url.protocol === "https:"
      ? { value: url.toString() }
      : { error: errors?.urlInvalidProtocol ?? "Enter a valid http or https URL." };
  } catch {
    return { error: errors?.urlInvalid ?? "Enter a valid URL." };
  }
}

function parseCoordinate(raw: string, kind: "lat" | "lng"): number | null {
  const value = Number(raw.trim());
  if (!Number.isFinite(value)) return null;
  if (kind === "lat" && (value < -90 || value > 90)) return null;
  if (kind === "lng" && (value < -180 || value > 180)) return null;
  return value;
}

/** Step 1: Convert datetime-local / ISO-ish input into compact local ICS stamp (YYYYMMDDTHHMMSS). */
function toIcalLocalStamp(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const match = trimmed.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?$/,
  );
  if (!match) return null;
  const [, y, mo, d, h = "00", mi = "00", s = "00"] = match;
  return `${y}${mo}${d}T${h}${mi}${s}`;
}

function socialProfileUrl(network: SocialNetwork, handleOrUrl: string, errors?: Dictionary["errors"]): QrContentResult {
  // Step 1: Prefer a pasted https URL; otherwise map a username to a known profile base.
  const raw = handleOrUrl.trim();
  if (!raw) return { error: errors?.socialHandleRequired ?? "Enter a profile URL or username." };
  if (/^https?:\/\//i.test(raw)) return buildHttpsUrl(raw, errors);

  // Change: Reddit accepts r/subreddit as well as a user handle.
  if (network === "reddit") {
    const sub = raw.match(/^\/?r\/([A-Za-z0-9_]+)$/i);
    if (sub) return { value: `https://www.reddit.com/r/${sub[1]}` };
    const user = raw.replace(/^\/?u(ser)?\//i, "").replace(/^@/, "");
    if (!/^[A-Za-z0-9._-]+$/.test(user)) {
      return { error: errors?.socialHandleInvalid ?? "Enter a valid username or https profile URL." };
    }
    return { value: `https://www.reddit.com/user/${user}` };
  }

  // Change: Discord invite codes map to discord.gg; full URLs still win above.
  if (network === "discord") {
    const code = raw.replace(/^@/, "").replace(/^\/+/, "");
    if (!/^[A-Za-z0-9-]+$/.test(code)) {
      return { error: errors?.socialHandleInvalid ?? "Enter a valid username or https profile URL." };
    }
    return { value: `https://discord.gg/${code}` };
  }

  const handle = raw.replace(/^@/, "").replace(/^\/+/, "");
  if (!/^[A-Za-z0-9._-]+$/.test(handle)) {
    return { error: errors?.socialHandleInvalid ?? "Enter a valid username or https profile URL." };
  }
  const bases: Record<Exclude<SocialNetwork, "reddit" | "discord">, string> = {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    x: "https://x.com/",
    youtube: "https://www.youtube.com/@",
    tiktok: "https://www.tiktok.com/@",
    linkedin: "https://www.linkedin.com/in/",
    snapchat: "https://www.snapchat.com/add/",
    spotify: "https://open.spotify.com/user/",
    soundcloud: "https://soundcloud.com/",
    kakaotalk: "https://open.kakao.com/o/",
  };
  return { value: `${bases[network]}${handle}` };
}

function paymentLink(provider: PaymentProvider, handleOrUrl: string, errors?: Dictionary["errors"]): QrContentResult {
  // Step 1: Accept http(s) for every provider; Amazon/crypto also accept common payment URIs.
  const raw = handleOrUrl.trim();
  if (!raw) return { error: errors?.paymentHandleRequired ?? "Enter a payment link or username." };
  if (/^https?:\/\//i.test(raw)) return buildHttpsUrl(raw, errors);
  if (provider === "crypto" && /^(bitcoin|ethereum|litecoin|bitcoincash):/i.test(raw)) {
    return { value: raw };
  }
  if (provider === "amazon" || provider === "crypto") {
    return { error: errors?.paymentUrlRequired ?? "Paste a full http(s) payment or store URL." };
  }
  const handle = raw.replace(/^@/, "").replace(/^\/+/, "");
  if (!/^[A-Za-z0-9._-]+$/.test(handle)) {
    return { error: errors?.paymentHandleInvalid ?? "Enter a valid username or https payment URL." };
  }
  const bases: Record<Exclude<PaymentProvider, "amazon" | "crypto">, string> = {
    paypal: "https://paypal.me/",
    venmo: "https://venmo.com/",
    etsy: "https://www.etsy.com/shop/",
    revolut: "https://revolut.me/",
  };
  return { value: `${bases[provider]}${handle}` };
}

// Step 1: Build QR payloads while returning localized validation errors when a dictionary is provided.
export function buildQrContent(type: QrType, values: QrFormValues, dictionary?: Dictionary): QrContentResult {
  const errors = dictionary?.errors;
  switch (type) {
    case "url":
      return buildHttpsUrl(values.url, errors);
    case "text":
      return values.text.trim() ? { value: values.text } : { error: errors?.textRequired ?? "Enter text to encode." };
    case "wifi": {
      if (!values.wifiSsid.trim()) return { error: errors?.wifiSsidRequired ?? "Enter a WiFi network name." };
      if (values.wifiEncryption !== "nopass" && !values.wifiPassword) {
        return { error: errors?.wifiPasswordRequired ?? "Enter the WiFi password." };
      }
      const password = values.wifiEncryption === "nopass" ? "" : escapeWifi(values.wifiPassword);
      return { value: `WIFI:T:${values.wifiEncryption};S:${escapeWifi(values.wifiSsid)};P:${password};;` };
    }
    case "email": {
      const email = values.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: errors?.emailInvalid ?? "Enter a valid email address." };
      const params = new URLSearchParams();
      if (values.emailSubject) params.set("subject", values.emailSubject);
      if (values.emailBody) params.set("body", values.emailBody);
      const query = params.toString();
      return { value: `mailto:${email}${query ? `?${query}` : ""}` };
    }
    case "phone":
      return validPhone(values.phone)
        ? { value: `tel:${normalizedPhone(values.phone)}` }
        : { error: errors?.phoneInvalid ?? "Enter a valid phone number." };
    case "sms":
      if (!validPhone(values.smsPhone)) return { error: errors?.phoneInvalid ?? "Enter a valid phone number." };
      return { value: `SMSTO:${normalizedPhone(values.smsPhone)}:${values.smsMessage}` };
    case "vcard": {
      // Step 2: Require a display name; other contact fields stay optional.
      const first = values.vcardFirstName.trim();
      const last = values.vcardLastName.trim();
      const fullName = [first, last].filter(Boolean).join(" ").trim();
      if (!fullName) return { error: errors?.vcardNameRequired ?? "Enter a first or last name." };
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeVCard(last)};${escapeVCard(first)};;;`,
        `FN:${escapeVCard(fullName)}`,
      ];
      if (values.vcardOrganization.trim()) lines.push(`ORG:${escapeVCard(values.vcardOrganization.trim())}`);
      if (values.vcardPhone.trim()) {
        if (!validPhone(values.vcardPhone)) return { error: errors?.phoneInvalid ?? "Enter a valid phone number." };
        lines.push(`TEL;TYPE=CELL:${normalizedPhone(values.vcardPhone)}`);
      }
      if (values.vcardEmail.trim()) {
        const email = values.vcardEmail.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return { error: errors?.emailInvalid ?? "Enter a valid email address." };
        }
        lines.push(`EMAIL:${escapeVCard(email)}`);
      }
      if (values.vcardWebsite.trim()) {
        const site = buildHttpsUrl(values.vcardWebsite, errors);
        if (site.value === undefined) return { error: site.error ?? errors?.urlInvalid ?? "Enter a valid URL." };
        lines.push(`URL:${escapeVCard(site.value)}`);
      }
      lines.push("END:VCARD");
      return { value: lines.join("\n") };
    }
    case "whatsapp": {
      // Step 3: Build a wa.me deep link from phone digits and an optional prefilled message.
      if (!validPhone(values.whatsappPhone)) return { error: errors?.phoneInvalid ?? "Enter a valid phone number." };
      const digits = normalizedPhone(values.whatsappPhone).replace(/^\+/, "");
      const message = values.whatsappMessage.trim();
      const query = message ? `?text=${encodeURIComponent(message)}` : "";
      return { value: `https://wa.me/${digits}${query}` };
    }
    case "line": {
      // Step 4: Accept a full LINE URL or build a friends link from an ID / @OA handle.
      const raw = values.lineId.trim();
      if (!raw) return { error: errors?.lineIdRequired ?? "Enter a LINE ID or profile URL." };
      if (/^https?:\/\//i.test(raw)) return buildHttpsUrl(raw, errors);
      if (raw.startsWith("@")) {
        const handle = raw.slice(1);
        if (!/^[A-Za-z0-9._-]+$/.test(handle)) {
          return { error: errors?.lineIdInvalid ?? "Enter a valid LINE ID or https://line.me URL." };
        }
        return { value: `https://line.me/R/ti/p/@${handle}` };
      }
      if (!/^[A-Za-z0-9._-]+$/.test(raw)) {
        return { error: errors?.lineIdInvalid ?? "Enter a valid LINE ID or https://line.me URL." };
      }
      return { value: `https://line.me/ti/p/~${raw}` };
    }
    case "google-review":
      // Step 5: Encode a review / Maps share URL as a normal https link.
      return buildHttpsUrl(values.googleReviewUrl, errors);
    case "location": {
      // Step 6: Encode a geo URI; optional label becomes the q= query for map apps.
      const lat = parseCoordinate(values.locationLatitude, "lat");
      const lng = parseCoordinate(values.locationLongitude, "lng");
      if (lat === null || lng === null) {
        return { error: errors?.locationCoordsInvalid ?? "Enter valid latitude and longitude." };
      }
      const label = values.locationLabel.trim();
      const base = `geo:${lat},${lng}`;
      return { value: label ? `${base}?q=${encodeURIComponent(label)}` : base };
    }
    case "event": {
      // Step 7: Build a minimal VCALENDAR/VEVENT block for calendar apps.
      const title = values.eventTitle.trim();
      if (!title) return { error: errors?.eventTitleRequired ?? "Enter an event title." };
      const start = toIcalLocalStamp(values.eventStart);
      if (!start) return { error: errors?.eventStartInvalid ?? "Enter a valid start date and time." };
      const end = values.eventEnd.trim() ? toIcalLocalStamp(values.eventEnd) : null;
      if (values.eventEnd.trim() && !end) {
        return { error: errors?.eventEndInvalid ?? "Enter a valid end date and time." };
      }
      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `SUMMARY:${escapeICalText(title)}`,
        `DTSTART:${start}`,
      ];
      if (end) lines.push(`DTEND:${end}`);
      if (values.eventLocation.trim()) lines.push(`LOCATION:${escapeICalText(values.eventLocation.trim())}`);
      lines.push("END:VEVENT", "END:VCALENDAR");
      return { value: lines.join("\n") };
    }
    case "telegram": {
      // Step 8: Accept t.me URL or username and normalize to https://t.me/...
      const raw = values.telegramId.trim();
      if (!raw) return { error: errors?.telegramIdRequired ?? "Enter a Telegram username or URL." };
      if (/^https?:\/\//i.test(raw)) return buildHttpsUrl(raw, errors);
      const username = raw.replace(/^@/, "");
      if (!/^[A-Za-z0-9_]{5,}$/.test(username)) {
        return { error: errors?.telegramIdInvalid ?? "Enter a valid Telegram username or https://t.me URL." };
      }
      return { value: `https://t.me/${username}` };
    }
    case "social":
      // Step 9: Build a social profile URL from a handle or pasted link.
      return socialProfileUrl(values.socialNetwork, values.socialHandleOrUrl, errors);
    case "payment":
      // Step 10: Build a static payment or shop deep link (no hosted checkout).
      return paymentLink(values.paymentProvider, values.paymentHandleOrUrl, errors);
  }
}
