"use client";

import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import { createQrStylingOptions, defaultQrDesign, type QrDesign } from "@/lib/qr/design";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  design?: Partial<QrDesign>;
  size: number;
  className?: string;
  /** Accessible name; decorative art should pass an empty string. */
  label?: string;
};

/**
 * Change: Real QR artwork for marketing sections using the same renderer as the generator
 * (`qr-code-styling` is already in the page bundle). The box reserves its size to avoid CLS.
 */
export function QrArt({ value, design, size, className, label = "" }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Step 1: Merge the requested look over the generator defaults and render at the requested size.
    const merged: QrDesign = { ...defaultQrDesign, ...design, size };
    const qr = new QRCodeStyling(createQrStylingOptions(value, merged));
    host.replaceChildren();
    qr.append(host);
    return () => {
      host.replaceChildren();
    };
    // Step 2: Marketing designs are static objects; re-render only when the value or size changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, size]);

  return (
    <div
      ref={hostRef}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn("shrink-0 [&_svg]:block [&_svg]:h-full [&_svg]:w-full", className)}
      style={{ width: size, height: size }}
    />
  );
}
