import assert from "node:assert/strict";
import test from "node:test";
import {
  allowsAdsOnBarePath,
  barePathFromLocalizedPathname,
  isQrSeoIndexed,
  isQrSeoThick,
  isUseCaseIndexed,
  noindexQrSeoSlugs,
  noindexUseCaseSlugs,
  thickQrSeoSlugs,
} from "../lib/seo/indexing";
import { qrSeoSlugs } from "../lib/seo/qr-seo-seed";

test("Phase A noindex QR list covers social hubs plus thin email/phone/sms", () => {
  assert.equal(noindexQrSeoSlugs.length, 12);
  for (const slug of ["youtube", "tiktok", "email", "phone", "sms"] as const) {
    assert.equal(isQrSeoIndexed(slug), false);
  }
  for (const slug of ["url", "wifi", "line", "google-review", "vcard", "whatsapp", "payment", "dynamic"] as const) {
    assert.equal(isQrSeoIndexed(slug), true);
  }
  assert.equal(
    qrSeoSlugs.filter((slug) => isQrSeoIndexed(slug)).length,
    qrSeoSlugs.length - noindexQrSeoSlugs.length,
  );
});

test("Phase A noindex use-cases exclude event-poster and gmail-email only", () => {
  assert.deepEqual([...noindexUseCaseSlugs].sort(), ["event-poster", "gmail-email"]);
  assert.equal(isUseCaseIndexed("thai-restaurant-menu"), true);
  assert.equal(isUseCaseIndexed("event-poster"), false);
});

test("Phase C thick QR hubs allow ads; thin/noindex hubs stay blocked", () => {
  assert.deepEqual([...thickQrSeoSlugs], ["url", "wifi", "line", "google-review", "vcard"]);
  for (const slug of thickQrSeoSlugs) {
    assert.equal(isQrSeoThick(slug), true);
    assert.equal(allowsAdsOnBarePath(`/qr-code/${slug}`), true);
  }
  assert.equal(allowsAdsOnBarePath("/qr-code/tiktok"), false);
  assert.equal(allowsAdsOnBarePath("/qr-code/whatsapp"), false);
  assert.equal(allowsAdsOnBarePath("/qr-code/email"), false);
  assert.equal(allowsAdsOnBarePath("/use-cases/event-poster"), false);
  assert.equal(allowsAdsOnBarePath("/use-cases/gmail-email"), false);
  assert.equal(allowsAdsOnBarePath("/use-cases/thai-restaurant-menu"), true);
  assert.equal(allowsAdsOnBarePath("/templates/menu"), true);
  assert.equal(allowsAdsOnBarePath("/bulk-qr-generator"), true);
  assert.equal(allowsAdsOnBarePath("/qr-code-generator"), true);
});

test("barePathFromLocalizedPathname strips locale prefix", () => {
  assert.equal(barePathFromLocalizedPathname("/th/qr-code/wifi"), "/qr-code/wifi");
  assert.equal(barePathFromLocalizedPathname("/en/templates/menu"), "/templates/menu");
  assert.equal(barePathFromLocalizedPathname("/zh"), "/");
});
