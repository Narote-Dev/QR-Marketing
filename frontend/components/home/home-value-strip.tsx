import { BadgeCheck, Gift, ImageDown, Palette, RefreshCw } from "lucide-react";
import { homeUi } from "@/components/home/ui";
import type { Dictionary } from "@/lib/i18n/types";

type Props = { dictionary: Dictionary };

// Step 1: Icons are positional to keep copy arrays translation-only.
const icons = [Gift, BadgeCheck, Palette, ImageDown, RefreshCw];

export function HomeValueStrip({ dictionary }: Props) {
  const items = dictionary.home.valueStrip;

  return (
    <div className="border-y border-slate-200/70 bg-white/70">
      <div className={homeUi.container}>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:py-7">
          {items.map((item, index) => {
            const Icon = icons[index] ?? BadgeCheck;
            return (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal-dark">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-600">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
