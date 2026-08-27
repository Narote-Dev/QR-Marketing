import QRCodeStyling from "qr-code-styling";
import { createQrStylingOptions, type QrDesign } from "@/lib/qr/design";
import { composeQrPng } from "@/lib/qr/export";

type RenderOptions = {
  /** PNG only — when false, return the raw QR matrix without frame/background composite. */
  composite?: boolean;
};

/**
 * Step 1: Render a styled QR code to a Blob without mounting a preview in the DOM.
 * Step 2: Optionally composite PNG output with frame, label, and background.
 */
export async function renderQrBlob(
  data: string,
  design: QrDesign,
  format: "png" | "svg",
  options: RenderOptions = {},
): Promise<Blob> {
  const qr = new QRCodeStyling(createQrStylingOptions(data, design));
  const raw = await qr.getRawData(format);
  if (!raw || !(raw instanceof Blob)) {
    throw new Error("QR render failed.");
  }

  if (format === "svg") {
    return raw.type === "image/svg+xml"
      ? raw
      : new Blob([await raw.arrayBuffer()], { type: "image/svg+xml" });
  }

  if (options.composite === false) {
    return raw;
  }

  return composeQrPng(raw, design);
}
