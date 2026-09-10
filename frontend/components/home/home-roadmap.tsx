import { ChartLine, CodeXml, Layers, LayoutTemplate, QrCode, Users, Workflow, type LucideIcon } from "lucide-react";
import { HomeSection, StatusBadge } from "@/components/home/ui";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

type Props = { dictionary: Dictionary };

// Step 1: Positional icons mirror the dictionary roadmap order.
const icons: LucideIcon[] = [QrCode, Layers, LayoutTemplate, ChartLine, Users, CodeXml, Workflow];

export function HomeRoadmap({ dictionary }: Props) {
  const copy = dictionary.home.roadmap;
  const statusLabels = { available: dictionary.home.statusAvailable, planned: dictionary.home.statusPlanned };

  return (
    <HomeSection id="business" eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro}>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {copy.items.map((item, index) => {
          const Icon = icons[index] ?? QrCode;
          const available = item.status === "available";
          return (
            <li
              key={item.title}
              className={cn(
                "flex flex-col rounded-2xl border p-5",
                available ? "border-slate-200/80 bg-white shadow-sm" : "border-dashed border-slate-300 bg-white/60",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    available ? "bg-brand-teal/10 text-brand-teal-dark" : "bg-slate-100 text-slate-500",
                  )}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <StatusBadge status={item.status} labels={statusLabels} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
            </li>
          );
        })}
      </ul>
    </HomeSection>
  );
}
