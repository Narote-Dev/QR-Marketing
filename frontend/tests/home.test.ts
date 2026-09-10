import assert from "node:assert/strict";
import test from "node:test";
import { locales } from "../lib/i18n/config";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { formatPlanFeature, formatPlanPrice, pricingPlans } from "../lib/pricing/plans";

test("homepage copy stays structurally aligned across locales", async () => {
  const en = await getDictionary("en");
  for (const locale of locales) {
    const dictionary = await getDictionary(locale);
    const home = dictionary.home;
    assert.equal(home.valueStrip.length, en.home.valueStrip.length, `${locale} valueStrip`);
    assert.equal(home.generatorSection.flow.length, 5, `${locale} flow steps`);
    assert.equal(home.hero.mockup.typeChips.length, en.home.hero.mockup.typeChips.length, `${locale} chips`);
    assert.equal(home.dynamic.benefits.length, en.home.dynamic.benefits.length, `${locale} benefits`);
    assert.equal(home.analytics.metrics.length, en.home.analytics.metrics.length, `${locale} metrics`);
    assert.equal(home.customization.features.length, en.home.customization.features.length, `${locale} features`);
    assert.equal(home.customization.variants.length, 3, `${locale} variants`);
    assert.equal(home.roadmap.items.length, en.home.roadmap.items.length, `${locale} roadmap`);

    // Step 1: Availability statuses must match the English source so no locale overclaims a feature.
    const statusLists = [
      [home.dynamic.benefits, en.home.dynamic.benefits],
      [home.analytics.metrics, en.home.analytics.metrics],
      [home.roadmap.items, en.home.roadmap.items],
    ] as const;
    for (const [localized, source] of statusLists) {
      assert.deepEqual(
        localized.map((item) => item.status),
        source.map((item) => item.status),
        `${locale} status order`,
      );
    }

    // Step 2: Pricing templates keep the {count} token used by formatPlanFeature.
    for (const template of [home.pricing.dynamicQrFeature, home.pricing.scansPerYearFeature, home.pricing.scansPerMonthFeature]) {
      assert.match(template, /\{count\}/, `${locale} pricing template`);
    }
    for (const code of ["free", "pro", "business"] as const) {
      assert.ok(home.pricing.plans[code].name, `${locale} plan ${code}`);
      assert.ok(home.pricing.plans[code].cta, `${locale} plan cta ${code}`);
    }

    assert.ok(dictionary.chrome.navDynamicQr && dictionary.chrome.navPricing && dictionary.chrome.navCreateCta, `${locale} nav copy`);
    assert.ok((dictionary.seo.generator.body?.length ?? 0) >= 3, `${locale} generator body`);
    assert.ok(dictionary.seo.generator.faqs.length >= 6, `${locale} generator faqs`);
  }
});

test("pricing config mirrors backend plan codes and hides undecided prices", () => {
  assert.deepEqual(
    pricingPlans.map((plan) => plan.code),
    ["free", "pro", "business"],
  );
  const free = pricingPlans[0];
  assert.equal(free.available, true);
  assert.equal(free.dynamicQrLimit, 6);
  assert.equal(free.scanLimit, 7000);
  assert.equal(free.scanPeriod, "year");
  assert.equal(formatPlanPrice(free, "en"), "0");
  for (const plan of pricingPlans.slice(1)) {
    assert.equal(plan.available, false, `${plan.code} must stay unavailable until billing ships`);
    assert.equal(formatPlanPrice(plan, "en"), null, `${plan.code} price undecided`);
  }
  assert.equal(formatPlanFeature("{count} scans per month", 100_000, "en"), "100,000 scans per month");
});
