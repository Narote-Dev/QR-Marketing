import assert from "node:assert/strict";
import test from "node:test";
import { getRedirectUnavailableCopy, parseRedirectUnavailableReason } from "@/lib/redirect-unavailable/copy";

test("redirect unavailable defaults paused reason", () => {
  assert.equal(parseRedirectUnavailableReason(undefined), "paused");
  assert.equal(parseRedirectUnavailableReason("paused"), "paused");
});

test("redirect unavailable maps notfound reason", () => {
  assert.equal(parseRedirectUnavailableReason("notfound"), "notfound");
});

test("redirect unavailable copy includes thai paused heading", () => {
  assert.match(getRedirectUnavailableCopy("th").pausedHeading, /พัก/);
});
