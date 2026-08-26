import assert from "node:assert/strict";
import test from "node:test";
import { getAdSenseAccountMeta, getAdSenseConfig, toAdsTxtPublisherId } from "../lib/adsense/config";

test("AdSense remains disabled without an explicit production flag", () => {
  const config = getAdSenseConfig({ NEXT_PUBLIC_ADSENSE_PUBLISHER_ID: "ca-pub-example", NEXT_PUBLIC_ADSENSE_SLOT_SEO_AFTER_TOOL: "123" });
  assert.equal(config.enabled, false);
});

test("AdSense remains disabled without a publisher ID", () => {
  const config = getAdSenseConfig({ NEXT_PUBLIC_ENABLE_ADSENSE: "true", NEXT_PUBLIC_ADSENSE_SLOT_SEO_AFTER_TOOL: "123" });
  assert.equal(config.enabled, false);
});

test("AdSense maps only configured placement IDs", () => {
  const config = getAdSenseConfig({ NEXT_PUBLIC_ENABLE_ADSENSE: "true", NEXT_PUBLIC_ADSENSE_PUBLISHER_ID: "ca-pub-example", NEXT_PUBLIC_ADSENSE_SLOT_SEO_AFTER_TOOL: "123", NEXT_PUBLIC_ADSENSE_SLOT_SEO_SIDEBAR: "456" });
  assert.equal(config.enabled, true);
  assert.equal(config.publisherId, "ca-pub-example");
  assert.equal(config.slots["seo-after-tool"], "123");
  assert.equal(config.slots["seo-sidebar"], "456");
  assert.equal(config.slots["blog-inline"], undefined);
});

test("ads.txt publisher ID strips the script-only ca- prefix", () => {
  assert.equal(toAdsTxtPublisherId("ca-pub-2803737087012959"), "pub-2803737087012959");
  assert.equal(toAdsTxtPublisherId("pub-2803737087012959"), "pub-2803737087012959");
});

test("AdSense account meta is emitted when a publisher ID is configured", () => {
  assert.deepEqual(getAdSenseAccountMeta("ca-pub-2803737087012959"), {
    "google-adsense-account": "ca-pub-2803737087012959",
  });
  assert.equal(getAdSenseAccountMeta(undefined), undefined);
});
