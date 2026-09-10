import Link from "next/link";
import { ArrowRight, Frame, Image as ImageIcon, LayoutTemplate, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { QrArt } from "@/components/home/qr-art";
import { HomeSection, homeUi } from "@/components/home/ui";
import type { Dictionary } from "@/lib/i18n/types";
import type { QrDesign } from "@/lib/qr/design";
import { siteUrl } from "@/lib/seo/site";

type Props = { dictionary: Dictionary };

// Step 1: Positional icons keep the copy array translation-only.
const featureIcons = [Palette, ImageIcon, Frame, Sparkles, LayoutTemplate, ShieldCheck];

// Step 2: Three real designs the generator can produce (colors, gradient, frame).
const variants: Partial<QrDesign>[] = [
  { foregroundColor: "#19847D", dotStyle: "rounded", outerEyeStyle: "extra-rounded", innerEyeStyle: "dot" },
  {
    foregroundColor: "#E76F61",
    gradientEnabled: true,
    gradientColor: "#F3C63D",
    gradientType: "linear",
    dotStyle: "dots",
    outerEyeStyle: "dot",
    innerEyeStyle: "dot",
  },
  { foregroundColor: "#16363A", dotStyle: "square", outerEyeStyle: "square", innerEyeStyle: "square" },
];

export function HomeCustomization({ dictionary }: Props) {
  const copy = dictionary.home.customization;
  const value = siteUrl.toString();

  return (
    <HomeSection id="customization" eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} tone="white">
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <ul className="grid gap-4 sm:grid-cols-2">
          {copy.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Sparkles;
            return (
              <li key={feature.title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal-dark">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{feature.description}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-6">
          <ul className="grid grid-cols-3 gap-3 sm:gap-4">
            {variants.map((design, index) => {
              const label = copy.variants[index] ?? "";
              const labelFrame = index === 2;
              return (
                <li key={label} className="flex flex-col items-center text-center">
                  <div className={labelFrame ? "rounded-xl border-2 border-brand-ink bg-white p-2" : "rounded-xl bg-white p-2 shadow-sm"}>
                    <QrArt value={value} size={96} design={design} />
                    {labelFrame && <p className="mt-1 text-[10px] font-semibold text-slate-800">{dictionary.preview.scanMe}</p>}
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-600">{label}</p>
                </li>
              );
            })}
          </ul>
          <Link href="#generator" className={`${homeUi.buttonSecondary} mt-6 w-full`}>
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </HomeSection>
  );
}
