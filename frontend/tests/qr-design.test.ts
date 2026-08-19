import assert from "node:assert/strict";
import test from "node:test";
import { createQrStylingOptions, defaultQrDesign, type DotStyle, type ErrorCorrectionLevel, type EyeStyle, type FrameStyle, type GradientType } from "../lib/qr/design";

const dots: DotStyle[] = ["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"];
const eyes: EyeStyle[] = ["dot", "square", "rounded", "extra-rounded"];
const gradients: GradientType[] = ["linear", "radial"];
const corrections: ErrorCorrectionLevel[] = ["L", "M", "Q", "H"];
const frames: FrameStyle[] = ["none", "border", "label"];

test("maps every supported QR design combination to library options", () => {
  let checked = 0;
  for (const dotStyle of dots) for (const outerEyeStyle of eyes) for (const innerEyeStyle of eyes) for (const gradientType of gradients) for (const errorCorrectionLevel of corrections) for (const frame of frames) for (const logoSize of [0.1, 0.4]) {
    const options = createQrStylingOptions("https://example.com", { ...defaultQrDesign, dotStyle, outerEyeStyle, innerEyeStyle, gradientEnabled: true, gradientType, errorCorrectionLevel, frame, logo: "data:image/png;base64,AA==", logoSize, size: 320 });
    assert.equal(options.width, 320); assert.equal(options.height, 320); assert.equal(options.qrOptions?.errorCorrectionLevel, errorCorrectionLevel); assert.equal(options.dotsOptions?.type, dotStyle); assert.equal(options.cornersSquareOptions?.type, outerEyeStyle); assert.equal(options.cornersDotOptions?.type, innerEyeStyle); assert.equal(options.dotsOptions?.gradient?.type, gradientType); assert.equal(options.imageOptions?.imageSize, logoSize); checked++;
  }
  assert.equal(checked, 4608);
});

test("uses solid foreground color when gradients are disabled", () => {
  const options = createQrStylingOptions("hello", { ...defaultQrDesign, foregroundColor: "#123456", backgroundColor: "#abcdef", gradientEnabled: false });
  assert.equal(options.dotsOptions?.color, "#123456"); assert.equal(options.dotsOptions?.gradient, undefined); assert.equal(options.backgroundOptions?.color, "#abcdef");
});
