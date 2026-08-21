import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type Props = { params: { locale: string } };

export default function LocaleHomePage({ params }: Props) {
  // Step 1: Locale home always lands on the generator for that language.
  const locale = isLocale(params.locale) ? params.locale : "en";
  redirect(localizedPath(locale, "/qr-code-generator"));
}
