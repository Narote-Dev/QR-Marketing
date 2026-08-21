import { redirect } from "next/navigation";

// Change: Bare root is handled by middleware; keep a safe English fallback for static builds.
export default function RootPage() {
  redirect("/en/qr-code-generator");
}
