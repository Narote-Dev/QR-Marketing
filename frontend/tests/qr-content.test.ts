import assert from "node:assert/strict";
import test from "node:test";
import { buildQrContent } from "../lib/qr/content";
import { defaultQrValues } from "../lib/qr/types";
test("builds URL QR content", () => assert.equal(buildQrContent("url", { ...defaultQrValues, url: "https://example.com/path" }).value, "https://example.com/path"));
test("builds text QR content", () => assert.equal(buildQrContent("text", { ...defaultQrValues, text: "Hello QR" }).value, "Hello QR"));
test("builds WiFi QR content", () => assert.equal(buildQrContent("wifi", { ...defaultQrValues, wifiSsid: "Cafe;Net", wifiPassword: "pass" }).value, "WIFI:T:WPA;S:Cafe\\;Net;P:pass;;"));
test("builds email QR content", () => assert.equal(buildQrContent("email", { ...defaultQrValues, email: "hello@example.com", emailSubject: "Hi" }).value, "mailto:hello@example.com?subject=Hi"));
test("builds phone QR content", () => assert.equal(buildQrContent("phone", { ...defaultQrValues, phone: "+66 81 234 5678" }).value, "tel:+66812345678"));
test("builds SMS QR content", () => assert.equal(buildQrContent("sms", { ...defaultQrValues, smsPhone: "+66 81 234 5678", smsMessage: "Hello" }).value, "SMSTO:+66812345678:Hello"));
test("builds vCard QR content", () => {
  const value = buildQrContent("vcard", {
    ...defaultQrValues,
    vcardFirstName: "Alex",
    vcardLastName: "Rivera",
    vcardOrganization: "Acme",
    vcardPhone: "+66 81 234 5678",
    vcardEmail: "alex@example.com",
    vcardWebsite: "https://example.com",
  }).value;
  assert.ok(value?.includes("BEGIN:VCARD"));
  assert.ok(value?.includes("FN:Alex Rivera"));
  assert.ok(value?.includes("TEL;TYPE=CELL:+66812345678"));
  assert.ok(value?.includes("EMAIL:alex@example.com"));
  assert.ok(value?.includes("END:VCARD"));
});
test("builds WhatsApp QR content", () =>
  assert.equal(
    buildQrContent("whatsapp", { ...defaultQrValues, whatsappPhone: "+66 81 234 5678", whatsappMessage: "Hi there" }).value,
    "https://wa.me/66812345678?text=Hi%20there",
  ));
test("builds LINE Official Account QR content", () =>
  assert.equal(buildQrContent("line", { ...defaultQrValues, lineId: "@myshop" }).value, "https://line.me/R/ti/p/@myshop"));
test("builds LINE ID QR content", () =>
  assert.equal(buildQrContent("line", { ...defaultQrValues, lineId: "myshop" }).value, "https://line.me/ti/p/~myshop"));
test("builds Google Review QR content", () =>
  assert.equal(
    buildQrContent("google-review", { ...defaultQrValues, googleReviewUrl: "https://g.page/r/example" }).value,
    "https://g.page/r/example",
  ));
test("builds location QR content", () =>
  assert.equal(
    buildQrContent("location", {
      ...defaultQrValues,
      locationLatitude: "13.7563",
      locationLongitude: "100.5018",
      locationLabel: "Bangkok",
    }).value,
    "geo:13.7563,100.5018?q=Bangkok",
  ));
test("builds event QR content", () => {
  const value = buildQrContent("event", {
    ...defaultQrValues,
    eventTitle: "Launch",
    eventLocation: "Hall A",
    eventStart: "2026-08-25T10:00",
    eventEnd: "2026-08-25T11:30",
  }).value;
  assert.ok(value?.includes("BEGIN:VCALENDAR"));
  assert.ok(value?.includes("SUMMARY:Launch"));
  assert.ok(value?.includes("DTSTART:20260825T100000"));
  assert.ok(value?.includes("DTEND:20260825T113000"));
  assert.ok(value?.includes("LOCATION:Hall A"));
  assert.ok(value?.includes("END:VCALENDAR"));
});
test("builds Telegram QR content", () =>
  assert.equal(buildQrContent("telegram", { ...defaultQrValues, telegramId: "@mychannel" }).value, "https://t.me/mychannel"));
test("builds social Instagram QR content", () =>
  assert.equal(
    buildQrContent("social", { ...defaultQrValues, socialNetwork: "instagram", socialHandleOrUrl: "@brand" }).value,
    "https://www.instagram.com/brand",
  ));
test("builds social X QR content from URL", () =>
  assert.equal(
    buildQrContent("social", {
      ...defaultQrValues,
      socialNetwork: "x",
      socialHandleOrUrl: "https://x.com/brand",
    }).value,
    "https://x.com/brand",
  ));
test("rejects invalid required input", () => assert.ok(buildQrContent("url", { ...defaultQrValues, url: "not-a-url" }).error));
test("rejects empty vCard name", () => assert.ok(buildQrContent("vcard", { ...defaultQrValues }).error));
test("rejects empty LINE id", () => assert.ok(buildQrContent("line", { ...defaultQrValues, lineId: "" }).error));
test("rejects invalid location coordinates", () =>
  assert.ok(buildQrContent("location", { ...defaultQrValues, locationLatitude: "999", locationLongitude: "0" }).error));
test("rejects event without title", () => assert.ok(buildQrContent("event", { ...defaultQrValues, eventStart: "2026-08-25T10:00" }).error));
