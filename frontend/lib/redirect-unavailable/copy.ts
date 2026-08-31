import type { Locale } from "@/lib/i18n/config";

export type RedirectUnavailableReason = "paused" | "notfound";

type RedirectUnavailableCopy = {
  title: string;
  pausedHeading: string;
  pausedBody: string;
  notFoundHeading: string;
  notFoundBody: string;
  homeLink: string;
  generatorLink: string;
};

const copy: Record<Locale, RedirectUnavailableCopy> = {
  en: {
    title: "Link unavailable",
    pausedHeading: "This QR link is paused",
    pausedBody:
      "The owner temporarily disabled this short link. If you expected a menu, promotion, or website, check back later or contact the business directly.",
    notFoundHeading: "This QR link is not available",
    notFoundBody:
      "We could not find an active destination for this code. It may have been removed or never existed.",
    homeLink: "Create your own QR code",
    generatorLink: "Open QR generator",
  },
  th: {
    title: "ลิงก์ไม่พร้อมใช้งาน",
    pausedHeading: "ลิงก์ QR นี้ถูกพักไว้",
    pausedBody:
      "เจ้าของโค้ดปิดใช้งานลิงก์สั้นนี้ชั่วคราว หากคุณคาดว่าจะเห็นเมนู โปรโมชัน หรือเว็บไซต์ ลองกลับมาใหม่ภายหลังหรือติดต่อร้านโดยตรง",
    notFoundHeading: "ไม่พบลิงก์ QR นี้",
    notFoundBody: "เราไม่พบปลายทางที่ใช้งานได้สำหรับโค้ดนี้ อาจถูกลบหรือไม่เคยมีอยู่",
    homeLink: "สร้าง QR Code ของคุณเอง",
    generatorLink: "เปิดเครื่องมือสร้าง QR",
  },
  zh: {
    title: "链接不可用",
    pausedHeading: "此二维码链接已暂停",
    pausedBody:
      "所有者已暂时停用此短链接。若您原本想打开菜单、活动或网站，请稍后再试或直接联系商家。",
    notFoundHeading: "无法找到此二维码链接",
    notFoundBody: "我们找不到此代码的有效目标，可能已被删除或从未存在。",
    homeLink: "创建您自己的二维码",
    generatorLink: "打开二维码生成器",
  },
};

export function getRedirectUnavailableCopy(locale: Locale): RedirectUnavailableCopy {
  return copy[locale];
}

export function parseRedirectUnavailableReason(value?: string | null): RedirectUnavailableReason {
  return value === "notfound" ? "notfound" : "paused";
}
