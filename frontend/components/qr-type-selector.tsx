"use client";

import { useEffect, useRef } from "react";
import {
  AtSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Contact,
  FileText,
  Link2,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Share2,
  Star,
  Wifi,
} from "lucide-react";
import { useDictionary } from "@/components/i18n-provider";
import { qrTypes, type QrType } from "@/lib/qr/types";

const icons: Record<QrType, typeof Link2> = {
  url: Link2,
  text: FileText,
  wifi: Wifi,
  email: AtSign,
  phone: Phone,
  sms: MessageSquare,
  vcard: Contact,
  whatsapp: MessageCircle,
  line: MessageCircle,
  "google-review": Star,
  location: MapPin,
  event: Calendar,
  telegram: MessageCircle,
  social: Share2,
};

export function QrTypeSelector({ type, onChange }: { type: QrType; onChange: (type: QrType) => void }) {
  const dictionary = useDictionary();
  // Step 1: Keep a ref to the horizontal scroller and each type button.
  const scrollerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Partial<Record<QrType, HTMLButtonElement | null>>>({});

  // Step 2: When the selected type changes, keep that chip visible in the strip.
  useEffect(() => {
    buttonRefs.current[type]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [type]);

  // Step 3: Nudge the strip sideways with optional chevron controls.
  const scrollByAmount = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * Math.max(180, scroller.clientWidth * 0.55), behavior: "smooth" });
  };

  return (
    // Change: Compact horizontal type strip instead of a multi-row grid.
    <div className="relative min-w-0">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-10" aria-hidden="true" />

      <button
        type="button"
        className="absolute left-0 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-sm transition hover:border-brand-teal hover:text-brand-teal-dark sm:inline-flex"
        onClick={() => scrollByAmount(-1)}
        aria-label={dictionary.typeSelector.scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="absolute right-0 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-sm transition hover:border-brand-teal hover:text-brand-teal-dark sm:inline-flex"
        onClick={() => scrollByAmount(1)}
        aria-label={dictionary.typeSelector.scrollNext}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>

      <div
        ref={scrollerRef}
        role="tablist"
        aria-label={dictionary.typeSelector.aria}
        className="flex min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {qrTypes.map((item) => {
          const Icon = icons[item];
          const selected = item === type;
          return (
            <button
              key={item}
              ref={(node) => {
                buttonRefs.current[item] = node;
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(item)}
              className={`flex w-[5.75rem] shrink-0 snap-start flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition sm:w-24 sm:text-sm ${selected ? "border-brand-teal bg-brand-teal text-white" : "bg-white text-slate-600 hover:border-brand-teal-light hover:bg-brand-cream"}`}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="max-w-full truncate">{dictionary.types[item]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
