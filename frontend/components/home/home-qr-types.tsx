import Link from "next/link";
import {
  ArrowUpRight,
  AtSign,
  Calendar,
  Contact,
  FileText,
  Link2,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  Share2,
  Star,
  Wallet,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { HomeSection } from "@/components/home/ui";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { qrTypes, type QrType } from "@/lib/qr/types";
import { qrSeoSlugs } from "@/lib/seo/qr-seo-seed";

type Props = { locale: Locale; dictionary: Dictionary };

const icons: Record<QrType, LucideIcon> = {
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
  telegram: Send,
  social: Share2,
  payment: Wallet,
};

const seoSlugSet = new Set<string>(qrSeoSlugs);

export function HomeQrTypes({ locale, dictionary }: Props) {
  const copy = dictionary.home.types;

  return (
    <HomeSection id="qr-types" eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro}>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {qrTypes.map((type) => {
          const Icon = icons[type];
          // Step 1: Link to the existing SEO hub when one exists; otherwise jump to the generator.
          const hasGuide = seoSlugSet.has(type);
          const href = hasGuide ? localizedPath(locale, `/qr-code/${type}`) : "#generator";
          return (
            <li key={type}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-teal hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cream text-brand-teal-dark transition-colors group-hover:bg-brand-teal group-hover:text-white">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="mt-3 font-semibold text-slate-900">{dictionary.types[type]}</span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                  {hasGuide ? copy.guideLabel : copy.openLabel}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </HomeSection>
  );
}
