export type DotStyle = "dots" | "rounded" | "classy" | "classy-rounded" | "square" | "extra-rounded";
export type EyeStyle = "dot" | "square" | "rounded" | "extra-rounded";
export type FrameStyle = "none" | "border" | "label";
export type GradientType = "linear" | "radial";
import type QRCodeStyling from "qr-code-styling";

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
// Change: Add optional composed background image for template presets (not passed to qr-code-styling).
export type QrDesign = { foregroundColor: string; backgroundColor: string; dotStyle: DotStyle; innerEyeStyle: EyeStyle; outerEyeStyle: EyeStyle; logo?: string; logoSize: number; frame: FrameStyle; frameText: string; gradientEnabled: boolean; gradientColor: string; gradientType: GradientType; errorCorrectionLevel: ErrorCorrectionLevel; size: number; backgroundImage?: string };
export const defaultQrDesign: QrDesign = { foregroundColor: "#0f172a", backgroundColor: "#ffffff", dotStyle: "rounded", innerEyeStyle: "dot", outerEyeStyle: "square", logoSize: 0.25, frame: "none", frameText: "Scan me", gradientEnabled: false, gradientColor: "#2563eb", gradientType: "linear", errorCorrectionLevel: "M", size: 280 };

// Change: The constructor parameter is optional, but this helper always returns a full options object.
type StylingOptions = NonNullable<ConstructorParameters<typeof QRCodeStyling>[0]>;
export function createQrStylingOptions(data: string, design: QrDesign): StylingOptions {
  const gradient = design.gradientEnabled ? { type: design.gradientType, rotation: 0, colorStops: [{ offset: 0, color: design.foregroundColor }, { offset: 1, color: design.gradientColor }] } : undefined;
  return {
    width: design.size, height: design.size, type: "svg", margin: 12, data, image: design.logo,
    qrOptions: { errorCorrectionLevel: design.errorCorrectionLevel },
    imageOptions: { hideBackgroundDots: true, imageSize: design.logoSize, margin: 4, crossOrigin: "anonymous" },
    dotsOptions: { color: design.foregroundColor, type: design.dotStyle, gradient },
    cornersSquareOptions: { color: design.foregroundColor, type: design.outerEyeStyle, gradient },
    cornersDotOptions: { color: design.foregroundColor, type: design.innerEyeStyle, gradient },
    backgroundOptions: { color: design.backgroundColor }
  };
}
