"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  /** Bare path without locale prefix, e.g. "/bulk-qr-generator". */
  currentPath?: string;
};

type NavItem = {
  path: string;
  label: string;
};

function isActivePath(currentPath: string | undefined, itemPath: string): boolean {
  if (!currentPath) return false;
  if (itemPath === "/qr-code-generator") {
    return currentPath === "/" || currentPath === "/qr-code-generator" || currentPath.startsWith("/qr-code/");
  }
  if (itemPath === "/templates") {
    return currentPath === "/templates" || currentPath.startsWith("/templates/");
  }
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}

export function SiteHeader({ locale, dictionary, currentPath }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const chrome = dictionary.chrome;

  const items: NavItem[] = [
    { path: "/qr-code-generator", label: chrome.navGenerator },
    { path: "/bulk-qr-generator", label: chrome.bulkQrGenerator },
    { path: "/templates", label: chrome.allTemplates },
  ];

  return (
    <header className="mb-8 border-b border-slate-200/80 pb-4">
      <div className="flex items-center justify-between gap-3">
        <Link
          href={localizedPath(locale, "/qr-code-generator")}
          className="inline-flex items-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
        >
          <Image
            src="/brand/wordmark-transparent.png"
            alt={`${dictionary.site.name} — genmyQRCode.com`}
            width={730}
            height={245}
            priority
            className="h-auto w-[200px] max-w-[58vw] sm:w-[250px]"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop nav + utility grouping */}
          <div className="hidden items-center md:flex">
            <nav aria-label={chrome.navAria}>
              <ul className="flex items-center gap-1">
                {items.map((item) => {
                  const active = isActivePath(currentPath, item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        href={localizedPath(locale, item.path)}
                        aria-current={active ? "page" : undefined}
                        title={item.label}
                        className={cn(
                          "group relative inline-flex h-9 items-center px-3 text-sm transition-colors",
                          active
                            ? "font-semibold text-brand-teal-dark"
                            : "font-medium text-slate-600 hover:text-brand-coral",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "pointer-events-none absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-current transition-transform duration-200 ease-out",
                            active
                              ? "scale-x-100 text-brand-teal"
                              : "scale-x-0 text-brand-coral group-hover:scale-x-100",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <span
              aria-hidden="true"
              className="mx-3 h-4 w-px shrink-0 bg-slate-200"
            />

            <LanguageSelector locale={locale} label={chrome.language} />
          </div>

          {/* Mobile: language + menu toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSelector locale={locale} label={chrome.language} />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-teal-dark"
              aria-expanded={menuOpen}
              aria-controls="site-mobile-nav"
              aria-label={menuOpen ? chrome.navClose : chrome.navMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav id="site-mobile-nav" aria-label={chrome.navAria} className="mt-3 border-t border-slate-100 pt-3 md:hidden">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = isActivePath(currentPath, item.path);
              return (
                <li key={item.path}>
                  <Link
                    href={localizedPath(locale, item.path)}
                    aria-current={active ? "page" : undefined}
                    title={item.label}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-brand-cream font-semibold text-brand-teal-dark"
                        : "font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-coral",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
