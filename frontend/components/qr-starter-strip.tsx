"use client";

import { Contact, MessageCircle, Star, UtensilsCrossed, Wifi } from "lucide-react";
import { useDictionary } from "@/components/i18n-provider";
import { starterIds, type StarterId } from "@/lib/qr/starters";
import { cn } from "@/lib/utils";

const icons: Record<StarterId, typeof Wifi> = {
  "restaurant-menu": UtensilsCrossed,
  "hotel-wifi": Wifi,
  "google-review": Star,
  line: MessageCircle,
  "business-card": Contact,
};

type Props = {
  selectedId?: StarterId;
  pendingId?: StarterId;
  onSelect: (id: StarterId) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export function QrStarterStrip({ selectedId, pendingId, onSelect, onConfirm, onCancel }: Props) {
  const dictionary = useDictionary();
  const copy = dictionary.generator;

  return (
    <section aria-labelledby="starter-heading" className="mb-8 border-b pb-8">
      <h3 id="starter-heading" className="text-lg font-bold tracking-tight text-slate-900">
        {copy.startersTitle}
      </h3>
      <p className="mt-1 text-sm text-slate-600">{copy.startersHint}</p>

      <div
        role="group"
        aria-label={copy.startersAria}
        className="mt-4 flex min-w-0 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {starterIds.map((id) => {
          const Icon = icons[id];
          const selected = id === selectedId;
          const pending = id === pendingId;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition",
                selected
                  ? "border-brand-teal bg-brand-teal text-white"
                  : pending
                    ? "border-brand-teal bg-brand-cream text-brand-ink"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand-teal-light hover:bg-brand-cream",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {copy.starterLabels[id]}
            </button>
          );
        })}
      </div>

      {pendingId && (
        <div className="mt-4 rounded-xl bg-brand-cream px-4 py-3" role="status">
          <p className="text-sm text-brand-ink">{copy.starterConfirm}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-xl bg-brand-teal px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-teal-dark"
            >
              {copy.starterContinue}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-teal"
            >
              {copy.starterCancel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
