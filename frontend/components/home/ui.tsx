import type { ReactNode } from "react";
import type { FeatureStatus } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

/**
 * Change: Small design-system primitives shared by homepage sections so
 * typography, spacing, radius, buttons, and cards stay consistent.
 * Server-safe (no client hooks).
 */

export const homeUi = {
  container: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
  eyebrow: "text-sm font-semibold uppercase tracking-wide text-brand-teal-dark",
  h2: "mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl",
  intro: "mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg",
  card: "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm",
  buttonPrimary:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-teal px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-teal-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2",
  buttonSecondary:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-teal hover:text-brand-teal-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2",
} as const;

type SectionProps = {
  id?: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  tone?: "default" | "white" | "ink";
  children: ReactNode;
  className?: string;
  headingLevel?: "h2" | "h3";
};

/** Step 1: Consistent section shell with an accessible heading and optional intro. */
export function HomeSection({ id, eyebrow, heading, intro, tone = "default", children, className, headingLevel = "h2" }: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  const Heading = headingLevel;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-[var(--header-height)] py-14 sm:py-20",
        tone === "white" && "border-y border-slate-200/70 bg-white",
        tone === "ink" && "bg-brand-ink text-white",
        className,
      )}
    >
      <div className={homeUi.container}>
        <div className="max-w-3xl">
          {eyebrow && <p className={cn(homeUi.eyebrow, tone === "ink" && "text-brand-teal-light")}>{eyebrow}</p>}
          <Heading id={headingId} className={cn(homeUi.h2, tone === "ink" && "text-white")}>
            {heading}
          </Heading>
          {intro && <p className={cn(homeUi.intro, tone === "ink" && "text-slate-200")}>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

type BadgeProps = {
  status: FeatureStatus;
  labels: { available: string; planned: string };
  className?: string;
};

/** Step 2: Availability badge so marketing never overclaims a planned feature. */
export function StatusBadge({ status, labels, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        status === "available"
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80"
          : "bg-slate-100 text-slate-600 ring-1 ring-slate-200/80",
        className,
      )}
    >
      {status === "available" ? labels.available : labels.planned}
    </span>
  );
}
