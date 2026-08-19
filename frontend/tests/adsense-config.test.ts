import assert from "node:assert/strict";
import test from "node:test";
import { getAdSenseConfig } from "../lib/adsense/config";

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
