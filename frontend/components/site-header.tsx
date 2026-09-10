"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DynamicQrAuthChrome } from "@/components/dynamic-qr-auth-chrome";
import { LanguageSelector } from "@/components/language-selector";
import { isDynamicQrEnabled } from "@/lib/dynamic-qr/config";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  /** Bare path without locale prefix, e.g. "/bulk-qr-generator". */
  currentPath?: string;
  className?: string;
  sticky?: boolean;
};

type NavItem = {
  path: string;
  label: string;
  /** Change: secondary items only join the desktop bar from xl (Thai labels overflow at lg). */
  desktopFromXl?: boolean;
};

const DYNAMIC_GUIDE_PATH = "/qr-code/dynamic";
// Change: Pricing is a homepage section, not a route, so it never counts as active.
const PRICING_PATH = "/qr-code-generator#pricing";

function isActivePath(currentPath: string | undefined, itemPath: string): boolean {
  if (!currentPath) return false;
  if (itemPath === PRICING_PATH) return false;
  if (itemPath === "/qr-code-generator") {
    // Change: The Dynamic QR guide has its own nav item, so exclude it from the generator group.
    return (
      currentPath === "/" ||
      currentPath === "/qr-code-generator" ||
      (currentPath.startsWith("/qr-code/") && currentPath !== DYNAMIC_GUIDE_PATH)
    );
  }
  if (itemPath === "/templates") {
    return currentPath === "/templates" || currentPath.startsWith("/templates/");
  }
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}

export function SiteHeader({ locale, dictionary, currentPath, className, sticky = true }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const chrome = dictionary.chrome;

  // Change: SaaS nav — Create QR, Dynamic QR, Templates, Bulk, Pricing (+ account when enabled).
  const items: NavItem[] = [
    { path: "/qr-code-generator", label: chrome.navGenerator },
    { path: DYNAMIC_GUIDE_PATH, label: chrome.navDynamicQr },
    { path: "/templates", label: chrome.templatesCrumb },
    { path: "/bulk-qr-generator", label: chrome.bulkQrGenerator, desktopFromXl: true },
    { path: PRICING_PATH, label: chrome.navPricing },
    ...(isDynamicQrEnabled() ? [{ path: "/my/dynamic-qr", label: chrome.navMyDynamicQr }] : []),
  ];
  const createCtaHref = localizedPath(locale, "/qr-code-generator#generator");

  return (
    <div
      className={cn(
        "w-full border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/75",
        sticky && "sticky top-0 z-40",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className={cn("py-2 sm:py-2.5", className)}>
          <div className="flex items-center justify-between gap-3">
        <Link
          href={localizedPath(locale, "/qr-code-generator")}
          className="inline-flex shrink-0 items-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
        >
          <Image
            src="/brand/wordmark-transparent.png"
            alt={`${dictionary.site.name} — genmyQRCode.com`}
            width={730}
            height={245}
            priority
            className="h-9 w-auto max-w-[140px] sm:h-10 sm:max-w-[175px] lg:max-w-[150px] xl:max-w-[175px]"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop nav + utility grouping. Change: collapse to the menu below lg so six items never overflow. */}
          <div className="hidden items-center lg:flex">
            <nav aria-label={chrome.navAria}>
              <ul className="flex items-center gap-0.5 xl:gap-1">
                {items.map((item) => {
                  const active = isActivePath(currentPath, item.path);
                  return (
                    <li key={item.path} className={item.desktopFromXl ? "hidden xl:block" : undefined}>
                      <Link
                        href={localizedPath(locale, item.path)}
                        aria-current={active ? "page" : undefined}
                        title={item.label}
                        className={cn(
                          "group relative inline-flex h-8 items-center whitespace-nowrap px-1.5 text-sm transition-colors xl:px-3",
                          active
                            ? "font-semibold text-brand-teal-dark"
                            : "font-medium text-slate-600 hover:text-brand-coral",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "pointer-events-none absolute inset-x-1.5 bottom-1 h-0.5 origin-left rounded-full bg-current transition-transform duration-200 ease-out xl:inset-x-3",
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

            <span aria-hidden="true" className="mx-2 hidden h-4 w-px shrink-0 bg-slate-200 xl:mx-3 xl:block" />

            {isDynamicQrEnabled() && (
              <>
                <DynamicQrAuthChrome
                  locale={locale}
                  signInLabel={chrome.navSignIn}
                  signUpLabel={chrome.navSignUp}
                  devAuthLabel={chrome.devAuthBadge}
                />
                <span aria-hidden="true" className="mx-2 hidden h-4 w-px shrink-0 bg-slate-200 xl:mx-3 xl:block" />
              </>
            )}

            <LanguageSelector locale={locale} label={chrome.language} />

            {/* Change: Primary SaaS CTA on wide screens only; the page body carries it elsewhere. */}
            <Link
              href={createCtaHref}
              className="ml-3 hidden h-9 items-center whitespace-nowrap rounded-xl bg-brand-teal px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-teal-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 xl:inline-flex"
            >
              {chrome.navCreateCta}
            </Link>
          </div>

          {/* Mobile/tablet: language + menu toggle */}
          <div className="flex items-center gap-1 lg:hidden">
            {isDynamicQrEnabled() && (
              <DynamicQrAuthChrome
                locale={locale}
                signInLabel={chrome.navSignIn}
                signUpLabel={chrome.navSignUp}
                devAuthLabel={chrome.devAuthBadge}
              />
            )}
            <LanguageSelector locale={locale} label={chrome.language} />
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-teal-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
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
        <nav id="site-mobile-nav" aria-label={chrome.navAria} className="mt-3 border-t border-slate-100 pt-3 lg:hidden">
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
          {/* Change: Keep the primary CTA reachable inside the collapsed menu. */}
          <Link
            href={createCtaHref}
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex min-h-11 items-center justify-center rounded-xl bg-brand-teal px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
          >
            {chrome.navCreateCta}
          </Link>
        </nav>
      )}
        </header>
      </div>
    </div>
  );
}
