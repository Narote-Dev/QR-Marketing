"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import { localeCookieName, localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  label: string;
};

const localeShort: Record<Locale, string> = {
  en: "EN",
  th: "TH",
  zh: "ZH",
};

export function LanguageSelector({ locale, label }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Step 1: Persist the chosen locale and navigate to the matching prefixed path.
  const onSelect = (next: Locale) => {
    document.cookie = `${localeCookieName}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    setOpen(false);
    router.push(switchLocalePath(pathname || "/", next));
  };

  // Step 2: Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-flex items-center">
      <button
        type="button"
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium text-slate-600",
          "transition-colors hover:text-brand-teal-dark",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal",
        )}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="tracking-wide">{localeShort[locale]}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute right-0 top-full z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-xl border border-slate-200/90 bg-white py-1 shadow-lg shadow-slate-900/5"
        >
          {locales.map((item) => {
            const selected = item === locale;
            return (
              <li key={item} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors",
                    selected
                      ? "bg-brand-cream font-semibold text-brand-teal-dark"
                      : "font-medium text-slate-700 hover:bg-slate-50",
                  )}
                  onClick={() => onSelect(item)}
                >
                  <span>{localeLabels[item]}</span>
                  <span className="text-xs tracking-wide text-slate-400">{localeShort[item]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
