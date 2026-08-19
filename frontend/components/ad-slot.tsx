"use client";
import { useEffect, useRef } from "react";
import { adSenseConfig, type AdPlacement } from "@/lib/adsense/config";

type Props = { placement: AdPlacement; className?: string; minHeight?: number };
export function AdSlot({ placement, className = "", minHeight = 250 }: Props) {
  const initialized = useRef(false);
  const slotId = adSenseConfig.slots[placement];
  useEffect(() => { if (!adSenseConfig.enabled || !slotId || initialized.current) return; initialized.current = true; try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { initialized.current = false; } }, [slotId]);
  if (!adSenseConfig.enabled || !adSenseConfig.publisherId || !slotId) return null;
  return <aside className={`my-8 w-full overflow-hidden ${className}`} aria-label="Advertisement" style={{ minHeight }}><ins className="adsbygoogle block" style={{ display: "block", minHeight }} data-ad-client={adSenseConfig.publisherId} data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true" /></aside>;
}
