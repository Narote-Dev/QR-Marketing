import assert from "node:assert/strict";
import test from "node:test";
import { getAnalyticsConfig } from "../lib/analytics/config";
import { getConsentConfig } from "../lib/consent/config";

test("analytics stays disabled without an explicit flag and measurement ID", () => {
  assert.equal(getAnalyticsConfig({ NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-123" }).enabled, false);
  assert.equal(getAnalyticsConfig({ NEXT_PUBLIC_ENABLE_ANALYTICS: "true" }).enabled, false);
});

test("analytics enables only with flag and a trimmed measurement ID", () => {
  const config = getAnalyticsConfig({ NEXT_PUBLIC_ENABLE_ANALYTICS: "true", NEXT_PUBLIC_GA_MEASUREMENT_ID: " G-123 " });
  assert.equal(config.enabled, true);
  assert.equal(config.measurementId, "G-123");
});

test("consent gating requires an explicit flag", () => {
  assert.equal(getConsentConfig({}).enabled, false);
  assert.equal(getConsentConfig({ NEXT_PUBLIC_ENABLE_CONSENT: "false" }).enabled, false);
  assert.equal(getConsentConfig({ NEXT_PUBLIC_ENABLE_CONSENT: "true" }).enabled, true);
});
