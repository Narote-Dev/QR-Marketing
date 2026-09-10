import type { Dictionary } from "@/lib/i18n/types";

/** Change: Thai dictionary — UI and SEO copy aligned with en.ts. */
export const th: Dictionary = {
  site: {
    name: "Build Your QR",
    description: "เครื่องมือสร้างคิวอาร์โค้ดแบบสแตติกฟรี เทมเพลตภาพ ส่งออก CSV เป็นชุด และเครื่องมือ QR ที่ใช้งานได้จริง",
  },
  chrome: {
    allQrTools: "เครื่องมือ QR ทั้งหมด",
    allTemplates: "เทมเพลตทั้งหมด",
    howToCreate: "วิธีสร้างคิวอาร์โค้ดนี้",
    featuredCollection: "แนะนำในคอลเลกชันนี้",
    aboutTemplates: "เกี่ยวกับเทมเพลตเหล่านี้",
    howToUseTemplate: "วิธีใช้เทมเพลตนี้",
    aboutThisTool: "เกี่ยวกับเครื่องมือคิวอาร์นี้",
    relatedTemplates: "เทมเพลตที่เกี่ยวข้อง",
    browseCategory: "เรียกดูเทมเพลตในหมวดนี้",
    faqs: "คำถามที่พบบ่อย",
    relatedTools: "เครื่องมือ QR ที่เกี่ยวข้อง",
    home: "หน้าแรก",
    breadcrumbsAria: "เส้นทางนำทาง",
    qrCodeGeneratorCrumb: "เครื่องมือสร้างคิวอาร์โค้ด",
    templatesCrumb: "เทมเพลต",
    language: "ภาษา",
    advertisement: "โฆษณา",
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
    termsOfService: "ข้อกำหนดการให้บริการ",
    about: "เกี่ยวกับเรา",
    contact: "ติดต่อเรา",
    bulkQrGenerator: "สร้างคิวอาร์โค้ดเป็นชุด",
    navGenerator: "สร้างคิวอาร์โค้ด",
    navMenu: "เปิดเมนู",
    navClose: "ปิดเมนู",
    navAria: "เมนูหลัก",
    navMyDynamicQr: "Dynamic QR ของฉัน",
    navSignIn: "เข้าสู่ระบบ",
    navSignUp: "สมัครสมาชิก",
    devAuthBadge: "บัญชี dev",
    footerNavAria: "ส่วนท้าย",
    footerRights: "สงวนลิขสิทธิ์",
    popularUseCases: "เคสเฉพาะทางยอดนิยม",
    useCasesCrumb: "เคสการใช้งาน",
    howToUseCase: "วิธีสร้างคิวอาร์โค้ดนี้",
    useCaseExamples: "เหมาะกับสถานการณ์เหล่านี้",
    relatedUseCases: "หน้าคิวอาร์เฉพาะทางที่เกี่ยวข้อง",
    whyThisWorks: "ทำไมหน้านี้ตรงกับสิ่งที่ค้นหา",
    trustNoSignup: "ไม่ต้องสมัครสมาชิก",
    trustBrowserOnly: "สร้างในเบราว์เซอร์ของคุณ",
    trustLocalized: "รองรับเนื้อหาภาษาท้องถิ่น",
    navDynamicQr: "Dynamic QR",
    navPricing: "แพ็กเกจ",
    navCreateCta: "สร้างคิวอาร์โค้ด",
    footerProduct: "ผลิตภัณฑ์",
    footerCompany: "บริษัท",
    footerTagline: "เครื่องมือสร้างคิวอาร์โค้ดฟรี พร้อม Dynamic QR ที่แก้ปลายทางหลังพิมพ์ได้",
  },
  home: {
    hero: {
      eyebrow: "ทำคิวอาร์โค้ดฟรี · โค้ดสแตติกไม่ต้องสมัคร",
      subheadline:
        "สร้างคิวอาร์โค้ดแบบปรับแต่งได้สำหรับเว็บไซต์ WiFi นามบัตร WhatsApp LINE โซเชียล การชำระเงิน และอื่น ๆ ดูตัวอย่างสด ดาวน์โหลด PNG หรือ SVG และอัปเกรดเป็น Dynamic QR เมื่อต้องการเปลี่ยนปลายทางหลังพิมพ์",
      primaryCta: "สร้างคิวอาร์โค้ด",
      secondaryCta: "ดู Dynamic QR",
      bullets: ["โค้ดสแตติกฟรี ไม่ต้องมีบัญชี", "ทำงานในเบราว์เซอร์ ไม่อัปโหลดข้อมูล", "Dynamic QR พร้อมนับจำนวนสแกน"],
      mockup: {
        title: "ตัวแก้ไข QR",
        typeChips: ["URL", "WiFi", "vCard", "WhatsApp"],
        inputLabel: "ที่อยู่เว็บไซต์",
        inputValue: "https://genmyqrcode.com",
        colorsLabel: "สีและสไตล์",
        previewLabel: "ตัวอย่างสด",
        downloadLabel: "ดาวน์โหลด PNG",
        frameText: "สแกนเลย",
      },
    },
    valueStrip: [
      { title: "ทำคิวอาร์โค้ดฟรี", description: "โค้ดสแตติกฟรีไม่จำกัด" },
      { title: "สแตติกไม่ต้องสมัคร", description: "เปิดหน้าเว็บแล้วดาวน์โหลดได้เลย" },
      { title: "ปรับแต่งดีไซน์ได้", description: "สี โลโก้ กรอบ และลวดลาย" },
      { title: "ไฟล์ความละเอียดสูง", description: "PNG สำหรับพิมพ์ SVG สำหรับแก้ไข" },
      { title: "มี Dynamic QR", description: "แก้ปลายทางได้หลังพิมพ์" },
    ],
    generatorSection: {
      eyebrow: "เริ่มที่นี่",
      heading: "สร้างคิวอาร์โค้ดของคุณ",
      flow: ["เลือกประเภท", "กรอกเนื้อหา", "ปรับแต่ง", "ดูตัวอย่าง", "ดาวน์โหลด"],
    },
    types: {
      eyebrow: "ประเภทคิวอาร์โค้ด",
      heading: "ตัวสร้างเดียว ครอบคลุมทุกการใช้งาน",
      intro: "เลือกประเภทเนื้อหาให้ตรงกับสิ่งที่ผู้สแกนควรทำ ทุกประเภทด้านล่างใช้ได้ฟรีในตัวสร้าง",
      guideLabel: "คู่มือและตัวสร้าง",
      openLabel: "เปิดในตัวสร้าง",
    },
    dynamic: {
      eyebrow: "สแตติก vs Dynamic",
      heading: "Dynamic QR ที่แก้ไขได้หลังพิมพ์",
      intro:
        "คิวอาร์โค้ดแบบสแตติกเก็บเนื้อหาไว้ในภาพถาวร ส่วน Dynamic QR เก็บลิงก์สั้นบน genmyqrcode.com ทำให้โค้ดที่พิมพ์ไปแล้วคงเดิม แต่คุณเปลี่ยนปลายทางได้ตลอด",
      staticTitle: "Static QR",
      staticPoints: [
        "เนื้อหาถูกเข้ารหัสในภาพโดยตรง",
        "ฟรี ไม่จำกัด ไม่ต้องมีบัญชี",
        "เหมาะกับ WiFi นามบัตร และลิงก์ถาวร",
        "แก้ไขหรือติดตามหลังพิมพ์ไม่ได้",
      ],
      dynamicTitle: "Dynamic QR",
      dynamicPoints: [
        "เข้ารหัสลิงก์สั้น เช่น genmyqrcode.com/r/yourCode",
        "เปลี่ยน URL ปลายทางได้ทุกเมื่อ",
        "หยุดชั่วคราวและเปิดใช้ใหม่ได้โดยไม่ต้องพิมพ์ซ้ำ",
        "ดูจำนวนสแกนในแดชบอร์ด",
      ],
      benefits: [
        { title: "เปลี่ยนปลายทางโดยไม่ต้องพิมพ์ใหม่", description: "อัปเดตเมนู แคมเปญ และลิงก์บนบรรจุภัณฑ์ได้ในไม่กี่วินาที", status: "available" },
        { title: "นับจำนวนสแกน", description: "ยอดสแกนรวมต่อโค้ด พร้อมการใช้งานตามแพ็กเกจ", status: "available" },
        { title: "จัดการคิวอาร์โค้ด", description: "ตั้งชื่อ แก้ไข และดาวน์โหลดซ้ำจากแดชบอร์ดเดียว", status: "available" },
        { title: "เปิด/ปิดโค้ด", description: "หยุดโค้ดชั่วคราว ผู้สแกนจะเห็นหน้าแจ้งว่าไม่พร้อมใช้งาน", status: "available" },
        { title: "รายละเอียดสถิติสแกน", description: "แยกตามอุปกรณ์ ประเทศ และช่วงเวลา", status: "planned" },
        { title: "จัดการแคมเปญ", description: "จัดกลุ่มโค้ดตามแคมเปญและเปรียบเทียบผล", status: "planned" },
      ],
      primaryCta: "สร้าง Dynamic QR",
      secondaryCta: "เรียนรู้ Dynamic QR",
    },
    analytics: {
      eyebrow: "ข้อมูลการสแกน",
      heading: "รู้ว่าคิวอาร์โค้ดของคุณทำงานได้ดีแค่ไหน",
      intro:
        "ทุกการสแกน Dynamic QR ถูกนับบนเซิร์ฟเวอร์ของเรา แดชบอร์ดแสดงยอดรวมต่อโค้ดและการใช้งานตามแพ็กเกจ ส่วนรายละเอียดเชิงลึกอยู่ในแผนพัฒนา",
      sampleBadge: "ข้อมูลตัวอย่าง",
      metrics: [
        { label: "สแกนทั้งหมด", value: "1,284", hint: "ต่อ Dynamic QR หนึ่งโค้ด", status: "available" },
        { label: "โค้ดที่ใช้งาน", value: "4 / 6", hint: "โควตาแพ็กเกจฟรี", status: "available" },
        { label: "สแกนในรอบนี้", value: "2,930", hint: "เทียบกับลิมิตแพ็กเกจ", status: "available" },
        { label: "อุปกรณ์", value: "iOS · Android", hint: "แยกตามประเภทอุปกรณ์", status: "planned" },
        { label: "ประเทศ", value: "TH · US · JP", hint: "สแกนจากที่ไหน", status: "planned" },
        { label: "สแกนตามช่วงเวลา", value: "กราฟรายวัน", hint: "แนวโน้มและช่วงพีค", status: "planned" },
      ],
      plannedNote: "รายการที่ระบุว่า “ในแผน” ยังไม่พร้อมใช้งาน ตัวเลขที่แสดงเป็นตัวอย่าง ไม่ใช่ข้อมูลจริง",
    },
    customization: {
      eyebrow: "ปรับแต่ง",
      heading: "ให้คิวอาร์โค้ดเข้ากับแบรนด์ของคุณ",
      intro: "ทุกอย่างในขั้นตอนปรับแต่งใช้ได้ทั้งโค้ดสแตติกและ Dynamic และเรนเดอร์ในเบราว์เซอร์ของคุณ",
      features: [
        { title: "สีและไล่ระดับ", description: "สีพื้นหน้า พื้นหลัง และไล่ระดับแบบเส้นตรงหรือรัศมี" },
        { title: "โลโก้", description: "อัปโหลดโลโก้หรือเลือกจากพรีเซ็ต พร้อมเว้นพื้นที่อัตโนมัติ" },
        { title: "กรอบและป้าย", description: "กรอบเส้นหรือกรอบป้ายพร้อมข้อความเรียกสแกนของคุณ" },
        { title: "ลวดลายจุดและตา", description: "มุมโค้ง จุด คลาสสี สี่เหลี่ยม และอื่น ๆ" },
        { title: "พื้นหลังพรีเซ็ต", description: "พื้นหลังสำเร็จรูปและเทมเพลตตามประเภทธุรกิจ" },
        { title: "การแก้ไขข้อผิดพลาดและขนาด", description: "เลือกระดับ L/M/Q/H และขนาดไฟล์ส่งออก" },
      ],
      variants: ["เขียวแบรนด์", "ไล่ระดับคอรัล", "คลาสสิกพร้อมป้าย"],
      cta: "เปิดขั้นตอนปรับแต่ง",
    },
    roadmap: {
      eyebrow: "สร้างมาเพื่อธุรกิจ",
      heading: "จากคิวอาร์โค้ดเดียว สู่แพลตฟอร์ม QR",
      intro: "GenMyQRCode เริ่มต้นฟรีและเติบโตไปกับคุณ นี่คือสิ่งที่ใช้ได้วันนี้และสิ่งที่เรากำลังพัฒนา",
      items: [
        { title: "จัดการ Dynamic QR", description: "สร้าง แก้ไข หยุดชั่วคราว และดาวน์โหลดโค้ดจากบัญชีของคุณ", status: "available" },
        { title: "สร้างคิวอาร์โค้ดเป็นชุด", description: "สูงสุด 50 โค้ดสแตติกจาก CSV เดียวด้วยดีไซน์ร่วมกัน", status: "available" },
        { title: "เทมเพลต QR", description: "พรีเซ็ตร้านอาหาร คาเฟ่ โรงแรม ค้าปลีก อีเวนต์ และรีวิว", status: "available" },
        { title: "สถิติการสแกน", description: "แยกตามอุปกรณ์ ประเทศ และช่วงเวลาสำหรับ Dynamic QR", status: "planned" },
        { title: "จัดการทีม", description: "แชร์โค้ดและกำหนดสิทธิ์ภายในองค์กร", status: "planned" },
        { title: "API", description: "สร้างและจัดการ Dynamic QR ผ่านโปรแกรม", status: "planned" },
        { title: "เชื่อมต่อ D365FO / ERP", description: "สร้างและติดตามคิวอาร์โค้ดจาก Dynamics 365 Finance & Operations", status: "planned" },
      ],
    },
    pricing: {
      eyebrow: "แพ็กเกจ",
      heading: "เริ่มฟรี อัปเกรดเมื่อเติบโต",
      intro: "คิวอาร์โค้ดสแตติกฟรีตลอดไป Dynamic QR เริ่มได้ในแพ็กเกจฟรี ส่วนแพ็กเกจแบบชำระเงินอยู่ระหว่างสรุป",
      comingSoon: "เร็ว ๆ นี้",
      freePrice: "ฟรี",
      perMonth: "/เดือน",
      dynamicQrFeature: "Dynamic QR ที่ใช้งานได้ {count} โค้ด",
      scansPerYearFeature: "สแกน {count} ครั้งต่อปี",
      scansPerMonthFeature: "สแกน {count} ครั้งต่อเดือน",
      apiFeature: "เข้าถึง API",
      plans: {
        free: {
          name: "Free",
          tagline: "สำหรับใช้ส่วนตัวและธุรกิจขนาดเล็ก",
          extras: ["คิวอาร์โค้ดสแตติกไม่จำกัด", "เทมเพลตและการปรับแต่ง", "ส่งออกเป็นชุดจาก CSV"],
          cta: "เริ่มใช้ฟรี",
        },
        pro: {
          name: "Pro",
          tagline: "สำหรับนักการตลาดที่ทำแคมเปญ",
          extras: ["ทุกอย่างในแพ็กเกจ Free", "ซัพพอร์ตแบบเร่งด่วน"],
          cta: "แจ้งเตือนเมื่อเปิด",
        },
        business: {
          name: "Business",
          tagline: "สำหรับทีม งานจำนวนมาก และการเชื่อมต่อระบบ",
          extras: ["ทุกอย่างในแพ็กเกจ Pro", "จัดการทีม (ในแผน)", "เชื่อมต่อ ERP (ในแผน)"],
          cta: "ติดต่อเรา",
        },
      },
      note: "ลิมิตของแพ็กเกจเป็นค่าโดยประมาณและอาจเปลี่ยนก่อนเปิดแพ็กเกจแบบชำระเงิน ปัจจุบันยังไม่มีการเก็บเงิน",
    },
    statusAvailable: "ใช้งานได้",
    statusPlanned: "ในแผน",
    finalCta: {
      heading: "สร้างคิวอาร์โค้ดของคุณในไม่กี่วินาที",
      subheading: "โค้ดสแตติกฟรี ไม่ต้องมีบัญชี เข้าสู่ระบบเฉพาะเมื่อต้องการ Dynamic QR",
      primaryCta: "สร้างคิวอาร์โค้ดฟรี",
      secondaryCta: "ดู Dynamic QR",
    },
  },
  relatedToolBlurbs: {
    url: "สร้างคิวอาร์โค้ดสำหรับลิงก์เว็บไซต์",
    wifi: "สร้างคิวอาร์โค้ดสำหรับ WiFi",
    email: "สร้างคิวอาร์โค้ดสำหรับอีเมล",
    phone: "สร้างคิวอาร์โค้ดสำหรับโทรศัพท์",
    sms: "สร้างคิวอาร์โค้ดสำหรับ SMS",
    vcard: "สร้างคิวอาร์โค้ดนามบัตรดิจิทัล",
    whatsapp: "สร้างคิวอาร์โค้ดเปิดแชท WhatsApp",
    line: "สร้างคิวอาร์โค้ดเปิดโปรไฟล์ LINE",
    "google-review": "สร้างคิวอาร์โค้ดลิงก์รีวิว Google",
    dynamic: "เรียนรู้คิวอาร์ไดนามิกที่แก้ลิงก์หลังพิมพ์ได้",
    youtube: "สร้างคิวอาร์โค้ดช่องหรือวิดีโอ YouTube",
    tiktok: "สร้างคิวอาร์โค้ดโปรไฟล์ TikTok",
    linkedin: "สร้างคิวอาร์โค้ดโปรไฟล์ LinkedIn",
    snapchat: "สร้างคิวอาร์โค้ดลิงก์เพิ่มเพื่อน Snapchat",
    reddit: "สร้างคิวอาร์โค้ดโปรไฟล์หรือชุมชน Reddit",
    discord: "สร้างคิวอาร์โค้ดลิงก์เชิญ Discord",
    spotify: "สร้างคิวอาร์โค้ดโปรไฟล์หรือเพลย์ลิสต์ Spotify",
    soundcloud: "สร้างคิวอาร์โค้ดโปรไฟล์ SoundCloud",
    kakaotalk: "สร้างคิวอาร์โค้ด Open Chat ของ KakaoTalk",
    payment: "สร้างคิวอาร์โค้ด PayPal, Venmo, Etsy และอื่นๆ",
  },
  consent: {
    title: "เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ",
    message:
      "เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อแสดงโฆษณาที่เกี่ยวข้องและวัดการใช้งานเว็บไซต์ คุณยอมรับทั้งหมด หรือปฏิเสธคุกกี้ที่ไม่จำเป็นก็ได้",
    acceptAll: "ยอมรับทั้งหมด",
    rejectAll: "ปฏิเสธทั้งหมด",
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
  },
  generator: {
    eyebrow: "เครื่องมือสร้างคิวอาร์โค้ดแบบสแตติกฟรี",
    heading: "สร้างคิวอาร์โค้ดได้ในไม่กี่วินาที",
    intro:
      "เริ่มจากตัวอย่างพร้อมใช้ หรือเลือกประเภท ปรับดีไซน์ แล้วดาวน์โหลด ไม่มีการบันทึกข้อมูลใดๆ",
    startersTitle: "เริ่มจากตัวอย่าง",
    startersHint: "แตะครั้งเดียวเพื่อตั้งประเภท เทมเพลต และข้อความกรอบ รายละเอียดที่กรอกไว้ยังอยู่",
    startersAria: "ชุดเริ่มต้นพร้อมใช้",
    starterConfirm: "ชุดนี้ใช้คนละประเภทคิวอาร์ รายละเอียดที่กรอกไว้ยังอยู่ แต่ฟอร์มจะเปลี่ยน",
    starterContinue: "ใช้ชุดนี้",
    starterCancel: "คงของเดิม",
    starterLabels: {
      "restaurant-menu": "เมนูร้าน",
      "hotel-wifi": "WiFi โรงแรม",
      "google-review": "รีวิว Google",
      line: "LINE",
      "business-card": "นามบัตร",
    },
    step1Title: "1. ใส่เนื้อหา",
    step2Title: "2. ปรับแต่ง",
    step2Optional: "ไม่บังคับ",
    step2Hint: "ขยายเฉพาะเมื่ออยากเลือกเทมเพลต สี หรือโลโก้",
    step3Title: "3. ดูตัวอย่างและดาวน์โหลด",
    livePreview: "ตัวอย่างแบบสด",
    downloadPng: "ดาวน์โหลด PNG",
    downloadSvg: "ดาวน์โหลด SVG",
    preparingDownload: "กำลังเตรียมดาวน์โหลด…",
    downloadFailed: "ดาวน์โหลดไม่สำเร็จ",
    downloadHint:
      "PNG รวมกรอบ ป้าย และพื้นหลังเมื่อเลือกไว้ SVG คือคิวอาร์โค้ดแบบเวกเตอร์สำหรับพิมพ์และแก้ไข",
    bulkPromo: "ต้องการคิวอาร์โค้ด URL หลายอันดีไซน์เดียวกัน?",
    bulkPromoLink: "เปิดเครื่องมือสร้างคิวอาร์โค้ดจาก CSV",
    modeStatic: "สแตติก",
    modeDynamic: "ไดนามิก",
    modeAria: "โหมด QR",
    feedback: {
      button: "ส่งความคิดเห็น",
      title: "ส่งความคิดเห็น",
      intro: "แจ้งบั๊ก ไอเดีย หรือคำถาม แอปอีเมลจะเปิดฉบับร่างถึงทีมซัพพอร์ต",
      emailLabel: "อีเมลของคุณ (ไม่บังคับ)",
      emailPlaceholder: "you@example.com",
      messageLabel: "ข้อความ",
      messagePlaceholder: "เกิดอะไรขึ้น หรืออยากให้มีฟีเจอร์อะไร?",
      send: "เปิดอีเมลเพื่อส่ง",
      cancel: "ยกเลิก",
      close: "ปิดฟอร์มความคิดเห็น",
      messageRequired: "กรอกข้อความก่อนส่ง",
      mailtoHint: "การส่งจะเปิดแอปอีเมลไปที่ support@genmyqrcode.com — ตรวจสอบก่อนกดส่งได้",
      mailSubject: "ความคิดเห็น Build Your QR",
      replyLine: "ตอบกลับที่",
      pageLine: "หน้า",
      modeLine: "โหมด",
      typeLine: "ชนิด QR",
    },
  },
  bulkQr: {
    eyebrow: "เครื่องมือสร้างคิวอาร์โค้ดเป็นชุด",
    heading: "สร้างคิวอาร์โค้ดหลายอันพร้อมกัน",
    intro:
      "อัปโหลด CSV ที่มีแถว URL, WiFi, LINE, WhatsApp หรือ vCard ใช้ดีไซน์เดียวกัน แล้วดาวน์โหลด ZIP — สูงสุด 50 โค้ดต่อครั้ง ทำงานในเบราว์เซอร์",
    step1Title: "1. อัปโหลด CSV",
    step2Title: "2. ปรับแต่งดีไซน์",
    step3Title: "3. ดูตัวอย่างและดาวน์โหลด ZIP",
    csvHint:
      "เลือกประเภท QR ดาวน์โหลด sample ที่ตรง type กรอกแถว แล้วอัปโหลด รวมหลายไฟล์ type ลง batch เดียวได้ สูงสุด {max} แถวต่อครั้ง",
    csvUpload: "อัปโหลด CSV",
    csvSampleDownload: "ดาวน์โหลด CSV ตัวอย่าง",
    sampleTypeLabel: "คุณจะสร้าง QR ประเภทไหน?",
    sampleTypeHint: "เลือก type ก่อน — ไฟล์ตัวอย่างจะมีเฉพาะคอลัมน์ที่ใช้กับประเภทนั้น",
    csvSampleFileName: "bulk-qr-sample.csv",
    csvEmpty: "ไฟล์ CSV ไม่มีแถวที่ใช้งานได้ กรุณาเพิ่มแถวที่ถูกต้องอย่างน้อย 1 แถว",
    csvTooMany: "โหลดเฉพาะ {max} แถวแรก กรุณาแบ่งรายการใหญ่เป็นหลายชุด",
    csvNoUrlColumn: "ไม่พบคอลัมน์ url ใน header ของ CSV",
    csvUnsupportedType: "ไม่รองรับ type \"{type}\" ใช้ url, wifi, line, whatsapp หรือ vcard",
    csvInvalidType: "กรุณาอัปโหลดไฟล์ .csv",
    csvLoaded: "โหลด {name} แล้ว",
    rowColumnType: "ประเภท",
    rowColumnContent: "เนื้อหา",
    rowColumnFile: "ชื่อไฟล์",
    rowColumnLabel: "ป้ายกรอบ",
    rowColumnStatus: "สถานะ",
    rowValid: "พร้อม",
    rowInvalid: "ไม่ถูกต้อง",
    rowsSummary: "พร้อมส่งออก {valid} จาก {total} แถว",
    invalidRowsNote: "มี {count} แถวที่มีข้อผิดพลาดและจะไม่ถูกใส่ใน ZIP",
    downloadZip: "ดาวน์โหลด ZIP ({count} PNG)",
    preparingZip: "กำลังเตรียม ZIP…",
    zipFailed: "ส่งออก ZIP ไม่สำเร็จ ลองลดจำนวนแถวแล้วลองใหม่",
    zipHint:
      "ไฟล์ PNG รวมกรอบ ป้าย และพื้นหลังที่เลือกไว้ ระบบเรนเดอร์ทีละโค้ดเพื่อใช้ RAM น้อย",
    zipFileName: "bulk-qr-codes.zip",
    progressLabel: "กำลังเรนเดอร์ {done} จาก {total}…",
    previewLimitNote: "แสดง {shown} แถวแรกจากทั้งหมด {total} แถว",
    guideLink: "อ่านคู่มือสร้างคิวอาร์โค้ดเป็นชุด ↓",
    livePreview: "ตัวอย่างดีไซน์แบบสด",
    livePreviewSample: "ใช้ URL ตัวอย่าง — อัปโหลด CSV เพื่อดูตัวอย่างจากแถวแรกที่พร้อม",
    livePreviewFromCsv: "กำลังแสดงแถวแรกที่พร้อม: {file}",
  },
  bulkQrGuide: {
    heading: "คู่มือสร้างคิวอาร์โค้ดเป็นชุด — จาก CSV เป็น ZIP",
    overviewTitle: "เครื่องมือนี้ทำอะไร",
    overview: [
      "ตัวสร้างแบบ bulk เปลี่ยน CSV เป็นคิวอาร์โค้ดหลายอันในครั้งเดียว รองรับ URL, WiFi, LINE, WhatsApp และ vCard เลือกดีไซน์เดียวกันแล้วดาวน์โหลด ZIP ไฟล์ PNG",
      "ทุกอย่างทำงานในเบราว์เซอร์ เราไม่เก็บ CSV หรือภาพที่ส่งออกบนเซิร์ฟเวอร์ ไม่ต้องสมัครสมาชิก",
      "แต่ละชุดรองรับสูงสุด 50 โค้ด เพื่อให้ส่งออกเร็วบนแล็ปท็อปและมือถือทั่วไป รวมเครื่อง RAM ~4 GB",
    ],
    csvTitle: "รูปแบบไฟล์ CSV",
    csvIntro:
      "เลือกประเภท QR จาก dropdown ด้านบนปุ่มอัปโหลด แล้วดาวน์โหลด sample ที่ตรงกัน (เช่น bulk-qr-sample-wifi.csv) ไฟล์จะมีเฉพาะคอลัมน์ที่ใช้ CSV แบบ url อย่างเดียวยังใช้ได้",
    csvColumns: [
      { name: "type", description: "จำเป็นสำหรับชุดผสม: url, wifi, line, whatsapp หรือ vcard" },
      { name: "filename", description: "ไม่บังคับแต่แนะนำ ชื่อไฟล์ PNG ใน ZIP" },
      { name: "label", description: "ไม่บังคับ ข้อความบนกรอบเมื่อใช้กรอบแบบมีป้าย" },
      { name: "url", description: "สำหรับ type url ที่อยู่ https:// หรือ http://" },
      { name: "wifiSsid / wifiPassword / wifiEncryption", description: "สำหรับ type wifi ค่า encryption: WPA, WEP หรือ nopass" },
      { name: "lineId", description: "สำหรับ type line — LINE ID, @OA หรือ URL line.me" },
      { name: "whatsappPhone / whatsappMessage", description: "สำหรับ type whatsapp เบอร์แบบสากล ข้อความไม่บังคับ" },
      { name: "vcardFirstName / vcardLastName / …", description: "สำหรับ type vcard ต้องมีชื่อหรือนามสกุลอย่างน้อยหนึ่งค่า" },
    ],
    csvExampleTitle: "ตัวอย่าง CSV: QR เมนู 10 โต๊ะ",
    csvExample:
      "type,filename,label,url\nurl,table-01,โต๊ะ 1,https://example.com/menu?table=1\nurl,table-02,โต๊ะ 2,https://example.com/menu?table=2\nurl,table-03,โต๊ะ 3,https://example.com/menu?table=3\nurl,table-04,โต๊ะ 4,https://example.com/menu?table=4\nurl,table-05,โต๊ะ 5,https://example.com/menu?table=5\nurl,table-06,โต๊ะ 6,https://example.com/menu?table=6\nurl,table-07,โต๊ะ 7,https://example.com/menu?table=7\nurl,table-08,โต๊ะ 8,https://example.com/menu?table=8\nurl,table-09,โต๊ะ 9,https://example.com/menu?table=9\nurl,table-10,โต๊ะ 10,https://example.com/menu?table=10",
    csvExtraExamples: [
      {
        title: "ตัวอย่าง CSV: สติกเกอร์ LINE 10 ใบ (เคาน์เตอร์/โต๊ะ)",
        csv:
          "type,filename,label,lineId\nline,line-01,เพิ่มเพื่อน LINE,@YourShop\nline,line-02,สั่งผ่าน LINE,@YourShop\nline,line-03,แชทกับเรา,@YourShop\nline,line-04,LINE ร้าน,@YourShop\nline,line-05,Add LINE,@YourShop\nline,line-06,สั่งอาหาร LINE,@YourShop\nline,line-07,ติดต่อ LINE,@YourShop\nline,line-08,LINE OA,@YourShop\nline,line-09,สแกนเพิ่มเพื่อน,@YourShop\nline,line-10,LINE ที่นี่,@YourShop",
      },
      {
        title: "ตัวอย่าง CSV: WiFi ทีละห้อง (โรงแรม 10 ห้อง)",
        csv:
          "type,filename,label,wifiSsid,wifiPassword,wifiEncryption\nwifi,room-101,ห้อง 101,Room101Net,guest001,WPA\nwifi,room-102,ห้อง 102,Room102Net,guest002,WPA\nwifi,room-103,ห้อง 103,Room103Net,guest003,WPA\nwifi,room-104,ห้อง 104,Room104Net,guest004,WPA\nwifi,room-105,ห้อง 105,Room105Net,guest005,WPA\nwifi,room-106,ห้อง 106,Room106Net,guest006,WPA\nwifi,room-107,ห้อง 107,Room107Net,guest007,WPA\nwifi,room-108,ห้อง 108,Room108Net,guest008,WPA\nwifi,room-109,ห้อง 109,Room109Net,guest009,WPA\nwifi,room-110,ห้อง 110,Room110Net,guest010,WPA",
      },
    ],
    csvNotes: [
      "เลือก type ใน dropdown แล้วดาวน์โหลด bulk-qr-sample-url.csv, bulk-qr-sample-wifi.csv ตามประเภทที่ต้องการ",
      "ตัวอย่างด้านบนแสดง 10 แถวจริง — คัดลอกรูปแบบ filename (table-01, line-05, room-305) ให้โรงพิมพ์จัดเรียงถูก",
      "รวมหลาย type ใน ZIP เดียวได้โดยต่อแถวเข้าไฟล์เดียว (ใช้ header ชุดแรก) หรือ export แยกชุดแล้วรวม ZIP ทีหลัง",
      "สร้างไฟล์ใน Excel, Google Sheets แล้ว Export เป็น CSV (UTF-8)",
      "ถ้าเซลล์มีเครื่องหมายจุลภาค ให้ครอบด้วยเครื่องหมายคำพูด \"",
      "แถวที่ field ไม่ครบหรือค่าไม่ถูกต้องจะแสดง Invalid และไม่ถูกใส่ใน ZIP",
      "รายการเกิน 50 แถวจะถูกตัดเหลือ 50 แถวแรก — แบ่งงานใหญ่เป็นหลายชุด",
    ],
    stepsTitle: "ขั้นตอนการใช้งาน",
    steps: [
      {
        title: "เตรียมและอัปโหลด CSV",
        body:
          "เลือกประเภท QR จาก dropdown ดาวน์โหลด sample ที่ตรงกัน กรอกแถว แล้วกด Upload CSV หลังอัปโหลด ตาราง preview จะแสดงประเภท เนื้อหา ชื่อไฟล์ ป้ายกรอบ และสถานะ Ready/Invalid",
      },
      {
        title: "เลือกดีไซน์เดียวกันทั้งชุด",
        body:
          "เลือกเทมเพลตหรือปรับสี สไตล์จุด โลโก้ กรอบ และขนาด ดีไซน์เดียวกันใช้กับทุกแถวที่ valid คอลัมน์ label จะแทนที่ข้อความกรอบเมื่อมีค่า",
      },
      {
        title: "ตรวจแถวที่พร้อมส่งออก",
        body:
          "ดูสรุปด้านขวา มีเฉพาะแถว Ready เท่านั้นที่จะอยู่ใน ZIP แก้ข้อมูลในไฟล์แล้วอัปโหลดใหม่ถ้าจำเป็น",
      },
      {
        title: "ดาวน์โหลด ZIP",
        body:
          "กด Download ZIP ระบบจะเรนเดอร์ PNG ทีละไฟล์แล้วรวมเป็น bulk-qr-codes.zip ไฟล์ PNG รวมกรอบ ป้าย และพื้นหลังที่เลือกไว้",
      },
      {
        title: "ทดสอบก่อนพิมพ์",
        body:
          "เปิด PNG จาก ZIP แล้วสแกนด้วยมือถือในขนาดที่จะพิมพ์ ตรวจ WiFi เข้าได้ LINE/WhatsApp เปิดถูก vCard บันทึกได้",
      },
    ],
    useCasesTitle: "ตัวอย่างการใช้งาน",
    useCases: [
      "ร้านอาหารไทย — QR เมนู 10 โต๊ะ (table-01 … table-10) ลิงก์ Google Sheet หรือ PDF ใน ZIP เดียว",
      "ร้านค้า/คาเฟ่ — สติกเกอร์ LINE 10 ใบ (line-01 … line-10) ป้ายเดียวกันทุกจุด เปลี่ยนแค่ label บนกรอบ",
      "โรงแรม — WiFi ทีละห้อง 10 ห้อง (room-101 … room-110) ชื่อไฟล์ตรงหมายเลขห้อง",
      "ร้านอาหาร — รวมเมนู URL + แถว WiFi + แถว LINE ในไฟล์ CSV เดียว ดีไซน์กรอบเดียวกัน",
      "อีเวนต์ — WhatsApp สายด่วน + URL ลงทะเบียนหลาย session",
    ],
    tipsTitle: "เคล็ดลับดีไซน์และการพิมพ์",
    tips: [
      "ใช้ระดับ error correction Q หรือ H เมื่อใส่โลโก้ เพื่อให้สแกนได้ง่าย",
      "ให้ contrast ระหว่างจุด QR กับพื้นหลังชัดเจน",
      "ใช้ URL สั้นและคงที่ — ตัวอักษรน้อยช่วยให้สแกนง่ายขึ้น",
      "ตั้งชื่อไฟล์ให้ชัด (table-01, room-305) เพื่อให้โรงพิมพ์จัดเรียงถูก",
      "ถ้ามากกว่า 50 โค้ด ให้ส่งออกเป็นหลายชุด โดยใช้ดีไซน์เดิมทุกครั้ง",
    ],
    troubleshootingTitle: "แก้ปัญหา",
    troubleshooting: [
      {
        question: "แถวแสดง Invalid — ควรตรวจอะไร?",
        answer:
          "ตรวจ type และ field ที่จำเป็น: url ต้อง https://; wifi ต้องมี ssid และรหัส (ยกเว้น nopass); line ต้องมี ID หรือ URL line.me; whatsapp ต้องมีเบอร์ + รหัสประเทศ; vcard ต้องมีชื่อหรือนามสกุลอย่างน้อยหนึ่งค่า ถ้าตัวอักษรไทย/จีนผิด ให้ export CSV เป็น UTF-8",
      },
      {
        question: "ทำไม ZIP มีไฟล์น้อยกว่าแถวใน CSV?",
        answer:
          "ส่งออกเฉพาะแถว valid เท่านั้น แถว Invalid ว่าง type ไม่รองรับ และเกิน 50 จะไม่ถูกใส่",
      },
      {
        question: "ใช้ Excel บน Windows ได้ไหม?",
        answer:
          "ได้ บันทึกหรือ export เป็น CSV ถ้า Excel ใช้ semicolon แทน comma ให้เปิดไฟล์ในตัวแก้ข้อความแล้วตรวจว่ามี header url และคั่นด้วย comma",
      },
      {
        question: "คอลัมน์ label ใช้ได้กับทุกกรอบไหม?",
        answer:
          "label จะแทนที่ข้อความกรอบเมื่อใช้กรอบแบบ label กรอบแบบอื่นจะไม่ใช้ label แต่คิวอาร์โค้ดยังส่งออกถูกต้อง",
      },
      {
        question: "คิวอาร์โค้ดหมดอายุไหม?",
        answer:
          "ไม่หมดอายุ คิวอาร์โค้ด URL แบบ static ใช้ได้ตราบเว็บปลายทางยังเปิดอยู่ ถ้าเปลี่ยนลิงก์ต้องสร้างโค้ดใหม่",
      },
    ],
  },
  dynamicQr: {
    creatorTitle: "Dynamic QR",
    creatorIntro: "สร้างลิงก์สั้นบน genmyqrcode.com ที่แก้ปลายทางทีหลังได้ ปลายทางต้องเป็น http หรือ https",
    destinationLabel: "URL ปลายทาง",
    destinationPlaceholder: "https://example.com/menu",
    labelField: "ชื่อเรียก (ไม่บังคับ)",
    labelPlaceholder: "เมนูโต๊ะ 5",
    createButton: "สร้าง Dynamic QR",
    creating: "กำลังสร้าง…",
    createFailed: "สร้าง Dynamic QR ไม่สำเร็จ",
    shortUrlLabel: "ลิงก์สั้น",
    tokenSavedHint:
      "บันทึก manage token ไว้ในเบราว์เซอร์นี้แล้ว คัดลอกเก็บไว้ถ้าต้องแก้จากเครื่องอื่น—กู้คืน token ที่หายไม่ได้",
    manageLink: "เปิดหน้าจัดการ",
    manageTitle: "จัดการ Dynamic QR",
    manageIntro: "เปลี่ยนปลายทาง พักโค้ด หรือดูยอดสแกนได้โดยไม่ต้องพิมพ์ใหม่",
    ownedCodes: "โค้ดในเบราว์เซอร์นี้",
    shortCodeLabel: "รหัสสั้น",
    manageTokenLabel: "Manage token",
    manageTokenHint: "โหลดจากที่เก็บในเบราว์เซอร์นี้เมื่อมี หรือวาง token ที่คุณสำรองไว้",
    loadButton: "โหลด",
    loadFailed: "โหลดโค้ดนี้ไม่สำเร็จ",
    scansLabel: "ยอดสแกน",
    statusLabel: "สถานะ",
    statusActive: "ใช้งาน",
    statusInactive: "พักไว้",
    saveButton: "บันทึก",
    saved: "บันทึกแล้ว",
    saveFailed: "บันทึกไม่สำเร็จ",
    activateButton: "เปิดใช้",
    deactivateButton: "พักโค้ด",
    activated: "เปิดใช้แล้ว",
    deactivated: "พักโค้ดแล้ว",
    manageFooterNote: "บัญชีของคุณเป็นเจ้าของโค้ดเหล่านี้ การพักโค้ดจะแสดงหน้าแจ้งว่าลิงก์ไม่พร้อมใช้งานแก่ผู้สแกน แทนการ redirect",
    signInIntro: "เข้าสู่ระบบเพื่อสร้างและจัดการ Dynamic QR ที่ผูกกับบัญชีของคุณ",
    signInButton: "เข้าสู่ระบบ",
    myCodesNav: "Dynamic QR ของฉัน",
    backToDashboard: "กลับไปหน้า Dashboard",
    dashboardTitle: "Dynamic QR ของฉัน",
    dashboardIntro: "แก้ปลายทาง พักโค้ด และดูการใช้โควต้าสำหรับบัญชีของคุณ",
    quotaTitle: "การใช้ตามแผน",
    quotaDynamic: "โค้ดที่ใช้งาน",
    quotaScans: "สแกนที่บันทึก",
    emptyList: "ยังไม่มี Dynamic QR — สร้างจากโหมด Dynamic ในตัวสร้าง",
    createQrButton: "สร้าง Dynamic QR",
    yourCodesTitle: "โค้ดของคุณ",
    planLabel: "แผนปัจจุบัน",
    loading: "กำลังโหลด…",
    downloadPngAgain: "ดาวน์โหลด PNG อีกครั้ง",
    downloadSvgAgain: "ดาวน์โหลด SVG อีกครั้ง",
    downloadingPng: "กำลังเตรียม PNG…",
    downloadingSvg: "กำลังเตรียม SVG…",
    downloadAgainTitle: "ดาวน์โหลดรูปคิวอาร์",
    downloadAgainIntro: "ดาวน์โหลด PNG หรือ SVG ใหม่จากดีไซน์ที่บันทึกตอนสร้างโค้ด",
    designFallbackHint: "โค้ดนี้ไม่มีดีไซน์ที่บันทึกไว้ — ใช้สไตล์เริ่มต้น",
    designTooLarge:
      "โลโก้ที่อัปโหลดทำให้ดีไซน์ใหญ่เกินไป ใช้รูปที่เล็กลงหรือโลโก้จาก preset แล้วสร้างใหม่",
  },
  form: {
    websiteAddress: "ที่อยู่เว็บไซต์",
    websitePlaceholder: "https://example.com",
    text: "ข้อความ",
    textPlaceholder: "เขียนข้อความของคุณ",
    wifiSsid: "ชื่อเครือข่าย (SSID)",
    wifiSsidPlaceholder: "WiFi ของฉัน",
    wifiSecurity: "ความปลอดภัย",
    wifiWpa: "WPA/WPA2",
    wifiWep: "WEP",
    wifiNopass: "ไม่มีรหัสผ่าน",
    wifiPassword: "รหัสผ่าน",
    wifiPasswordPlaceholder: "รหัสผ่านเครือข่าย",
    showPassword: "แสดงรหัสผ่าน",
    hidePassword: "ซ่อนรหัสผ่าน",
    recipientEmail: "อีเมลผู้รับ",
    emailPlaceholder: "hello@example.com",
    emailSubject: "หัวข้อ (ไม่บังคับ)",
    emailSubjectPlaceholder: "สวัสดี",
    emailMessage: "ข้อความ (ไม่บังคับ)",
    emailMessagePlaceholder: "ข้อความของคุณ",
    phoneNumber: "หมายเลขโทรศัพท์",
    phonePlaceholder: "+66 81 234 5678",
    smsPhone: "หมายเลขโทรศัพท์",
    smsPhonePlaceholder: "+66 81 234 5678",
    smsMessage: "ข้อความ (ไม่บังคับ)",
    smsMessagePlaceholder: "ข้อความ SMS ของคุณ",
    vcardFirstName: "ชื่อ",
    vcardFirstNamePlaceholder: "สมชาย",
    vcardLastName: "นามสกุล",
    vcardLastNamePlaceholder: "ใจดี",
    vcardOrganization: "องค์กร (ไม่บังคับ)",
    vcardOrganizationPlaceholder: "ชื่อบริษัท",
    vcardPhone: "โทรศัพท์ (ไม่บังคับ)",
    vcardPhonePlaceholder: "+66 81 234 5678",
    vcardEmail: "อีเมล (ไม่บังคับ)",
    vcardEmailPlaceholder: "hello@example.com",
    vcardWebsite: "เว็บไซต์ (ไม่บังคับ)",
    vcardWebsitePlaceholder: "https://example.com",
    whatsappPhone: "หมายเลข WhatsApp",
    whatsappPhonePlaceholder: "+66 81 234 5678",
    whatsappMessage: "ข้อความ (ไม่บังคับ)",
    whatsappMessagePlaceholder: "สวัสดี! สแกนคิวอาร์โค้ดของคุณครับ",
    lineId: "LINE ID หรือ URL โปรไฟล์",
    lineIdPlaceholder: "@yourshop หรือ https://line.me/...",
    googleReviewUrl: "URL รีวิวหรือ Maps ของ Google",
    googleReviewUrlPlaceholder: "https://g.page/r/...",
    locationLatitude: "ละติจูด",
    locationLatitudePlaceholder: "13.7563",
    locationLongitude: "ลองจิจูด",
    locationLongitudePlaceholder: "100.5018",
    locationLabel: "ชื่อสถานที่ (ไม่บังคับ)",
    locationLabelPlaceholder: "สำนักงานกรุงเทพ",
    eventTitle: "ชื่องาน",
    eventTitlePlaceholder: "เปิดตัวสินค้า",
    eventLocation: "สถานที่ (ไม่บังคับ)",
    eventLocationPlaceholder: "หอประชุมใหญ่",
    eventStart: "เริ่ม",
    eventEnd: "สิ้นสุด (ไม่บังคับ)",
    telegramId: "ชื่อผู้ใช้หรือ URL Telegram",
    telegramIdPlaceholder: "@channel หรือ https://t.me/...",
    socialNetwork: "เครือข่าย",
    socialNetworks: {
      facebook: "Facebook",
      instagram: "Instagram",
      x: "X (Twitter)",
      youtube: "YouTube",
      tiktok: "TikTok",
      linkedin: "LinkedIn",
      snapchat: "Snapchat",
      reddit: "Reddit",
      discord: "Discord",
      spotify: "Spotify",
      soundcloud: "SoundCloud",
      kakaotalk: "KakaoTalk",
    },
    socialHandleOrUrl: "ชื่อผู้ใช้หรือ URL โปรไฟล์",
    socialHandleOrUrlPlaceholder: "@brand หรือ https://...",
    paymentProvider: "ชำระเงินหรือร้านค้า",
    paymentProviders: {
      paypal: "PayPal",
      venmo: "Venmo",
      etsy: "Etsy",
      revolut: "Revolut",
      amazon: "Amazon",
      crypto: "Crypto",
    },
    paymentHandleOrUrl: "ชื่อผู้ใช้หรือลิงก์ชำระเงิน",
    paymentHandleOrUrlPlaceholder: "ชื่อ paypal.me หรือ https://...",
  },
  designer: {
    heading: "ตัวออกแบบ QR",
    intro: "ปรับแต่งตัวอย่างโดยไม่เปลี่ยนเนื้อหาในคิวอาร์โค้ด",
    foregroundColor: "สีพื้นหน้า",
    backgroundColor: "สีพื้นหลัง",
    hexValue: "ค่า hex",
    dotStyle: "สไตล์จุด",
    outerEyeStyle: "สไตล์ตาด้านนอก",
    innerEyeStyle: "สไตล์ตาด้านใน",
    errorCorrection: "การแก้ไขข้อผิดพลาด",
    qrSize: "ขนาด QR",
    logoSize: "ขนาดโลโก้",
    logo: "โลโก้",
    remove: "ลบ",
    logoHint: "ใช้ภาพสี่เหลี่ยมเล็กๆ แนะนำให้ใช้การแก้ไขข้อผิดพลาดระดับสูงเมื่อมีโลโก้",
    presetLogos: "โลโก้สำเร็จรูป",
    presetBackgrounds: "พื้นหลังสำเร็จรูป",
    clear: "ล้าง",
    gradient: "ไล่สี",
    enable: "เปิดใช้",
    endColor: "สีปลายทาง",
    gradientType: "ประเภทการไล่สี",
    frame: "กรอบ",
    frameStyleAria: "สไตล์กรอบ QR",
    frameText: "ข้อความบนกรอบ",
    frameTextPlaceholder: "สแกนเลย",
    styleDots: "จุด",
    styleRounded: "มุมโค้ง",
    styleSquare: "สี่เหลี่ยม",
    styleExtraRounded: "โค้งพิเศษ",
    styleClassy: "คลาสสิก",
    styleClassyRounded: "คลาสสิกโค้ง",
    styleDot: "จุดเดี่ยว",
    errorLow: "ต่ำ (L)",
    errorMedium: "กลาง (M)",
    errorQuartile: "ควอร์ไทล์ (Q)",
    errorHigh: "สูง (H)",
    gradientLinear: "เส้นตรง",
    gradientRadial: "รัศมี",
    frameNone: "ไม่มี",
    frameBorder: "ขอบ",
    frameLabel: "ป้ายข้อความ",
  },
  preview: {
    empty: "กรอกช่องที่จำเป็นเพื่อดูตัวอย่างคิวอาร์โค้ด",
    aria: "ตัวอย่างคิวอาร์โค้ดที่สร้างแล้ว",
    scanMe: "สแกนเลย",
  },
  typeSelector: {
    aria: "ประเภทคิวอาร์โค้ด",
    scrollPrev: "ดูประเภทก่อนหน้า",
    scrollNext: "ดูประเภทเพิ่มเติม",
  },
  types: {
    url: "URL",
    text: "ข้อความ",
    wifi: "WiFi",
    email: "อีเมล",
    phone: "โทรศัพท์",
    sms: "SMS",
    vcard: "vCard",
    whatsapp: "WhatsApp",
    line: "LINE",
    "google-review": "รีวิว",
    location: "พิกัด",
    event: "อีเวนต์",
    telegram: "Telegram",
    social: "โซเชียล",
    payment: "ชำระเงิน",
  },
  errors: {
    urlInvalidProtocol: "กรอก URL ที่เป็น http หรือ https ให้ถูกต้อง",
    urlInvalid: "กรอก URL ให้ถูกต้อง",
    textRequired: "กรอกข้อความที่จะเข้ารหัส",
    wifiSsidRequired: "กรอกชื่อเครือข่าย WiFi",
    wifiPasswordRequired: "กรอกรหัสผ่าน WiFi",
    emailInvalid: "กรอกที่อยู่อีเมลให้ถูกต้อง",
    phoneInvalid: "กรอกหมายเลขโทรศัพท์ให้ถูกต้อง",
    vcardNameRequired: "กรอกชื่อหรือนามสกุล",
    lineIdRequired: "กรอก LINE ID หรือ URL โปรไฟล์",
    lineIdInvalid: "กรอก LINE ID หรือ URL https://line.me ให้ถูกต้อง",
    locationCoordsInvalid: "กรอกละติจูดและลองจิจูดให้ถูกต้อง",
    eventTitleRequired: "กรอกชื่องาน",
    eventStartInvalid: "กรอกวันและเวลาเริ่มให้ถูกต้อง",
    eventEndInvalid: "กรอกวันและเวลาสิ้นสุดให้ถูกต้อง",
    telegramIdRequired: "กรอกชื่อผู้ใช้หรือ URL Telegram",
    telegramIdInvalid: "กรอกชื่อผู้ใช้ Telegram หรือ URL https://t.me ให้ถูกต้อง",
    socialHandleRequired: "กรอก URL โปรไฟล์หรือชื่อผู้ใช้",
    socialHandleInvalid: "กรอกชื่อผู้ใช้หรือ URL โปรไฟล์ให้ถูกต้อง",
    paymentHandleRequired: "กรอกลิงก์ชำระเงินหรือชื่อผู้ใช้",
    paymentHandleInvalid: "กรอกชื่อผู้ใช้หรือ URL ชำระเงินให้ถูกต้อง",
    paymentUrlRequired: "วางลิงก์ http(s) ของร้านหรือชำระเงินแบบเต็ม",
  },
  export: {
    noContent: "กรอกเนื้อหา QR ก่อนดาวน์โหลด",
    renderFailed: "สร้างข้อมูล QR ไม่สำเร็จ",
    decodeFailed: "ถอดรหัสข้อมูลภาพ QR ไม่สำเร็จ",
    canvasUnavailable: "เบราว์เซอร์นี้ไม่รองรับ Canvas",
    pngFailed: "สร้างไฟล์ PNG สำหรับดาวน์โหลดไม่สำเร็จ",
    downloadFailed: "ดาวน์โหลดไม่สำเร็จ",
  },
  templatesUi: {
    title: "เทมเพลต",
    openHint: "เลือกพรีเซ็ต — ดูผลที่ตัวอย่างด้านขวาได้ทันที",
    closedSelected: "กำลังใช้ {name} เปิดเพื่อเปลี่ยนเทมเพลต",
    closedNone: "ปิดอยู่ เปิดเพื่อเลือกพรีเซ็ตภาพ",
    clear: "ล้างเทมเพลต",
    categoriesAria: "หมวดหมู่เทมเพลต",
    emptyGrid: "ยังไม่มีเทมเพลตในหมวดนี้",
    emptyPreview: "เลือกเทมเพลตเพื่อดูตัวอย่างก่อนกรอกเนื้อหา QR",
    previewAlt: "ตัวอย่าง {name}",
  },
  categories: {
    restaurant: "ร้านอาหาร",
    cafe: "คาเฟ่",
    hotel: "โรงแรม",
    retail: "ร้านค้า",
    business: "ธุรกิจ",
    event: "อีเวนต์",
    wifi: "WiFi",
    menu: "เมนู",
    "google-review": "รีวิว Google",
  },
  templateCopy: {
    "restaurant-warm": {
      name: "โต๊ะอุ่นๆ",
      description: "โทนส้มอบอุ่นสำหรับป้ายตั้งโต๊ะและเมนูพิมพ์",
      defaultFrameText: "สแกนดูเมนู",
    },
    "cafe-mint": {
      name: "กาแฟยามเช้า",
      description: "สไตล์คาเฟ่โทนมิ้นต์สดชื่นสำหรับบัตรสะสมแต้มและป้ายเคาน์เตอร์",
      defaultFrameText: "WiFi และเมนู",
    },
    "hotel-slate": {
      name: "ล็อบบี้บลู",
      description: "โทนโรงแรมสงบสำหรับบัตรห้องและป้ายล็อบบี้",
      defaultFrameText: "WiFi สำหรับแขก",
    },
    "retail-bold": {
      name: "หน้าร้าน",
      description: "สไตล์ร้านค้าคอนทราสต์สูงสำหรับสติกเกอร์กระจกและป้ายชั้นวาง",
      defaultFrameText: "ช้อปเลย",
    },
    "business-navy": {
      name: "นามบัตรออฟฟิศ",
      description: "สไตล์นามบัตรโทนกรมท่าสำหรับแจกในงานเน็ตเวิร์ก",
      defaultFrameText: "เชื่อมต่อ",
    },
    "event-night": {
      name: "ไนท์สเตจ",
      description: "โทนอีเวนต์สดใสสำหรับโปสเตอร์ ป้ายชื่อ และบัตรเข้างาน",
      defaultFrameText: "ร่วมงาน",
    },
    "wifi-signal": {
      name: "เข้าถึงสำหรับแขก",
      description: "สไตล์แชร์ WiFi ชัดเจนสำหรับคาเฟ่ โรงแรม และโต๊ะต้อนรับ",
      defaultFrameText: "เชื่อมต่อ WiFi",
    },
    "menu-board": {
      name: "บอร์ดเมนูพิเศษ",
      description: "สไตล์บอร์ดเมนูอ่านง่ายสำหรับลิงก์ไปเมนูดิจิทัล",
      defaultFrameText: "ดูเมนู",
    },
    "review-star": {
      name: "ให้รีวิว",
      description: "สไตล์เชิญชวนรีวิวเป็นมิตรสำหรับใบเสร็จและเคาน์เตอร์",
      defaultFrameText: "ให้คะแนนเรา",
    },
  },
  assetCopy: {
    "logo-restaurant": {
      name: "เครื่องหมายร้านอาหาร",
      description: "เครื่องหมายส้อมกับจานเรียบง่ายสำหรับเทมเพลตร้านอาหาร",
    },
    "logo-cafe": {
      name: "เครื่องหมายคาเฟ่",
      description: "เครื่องหมายถ้วยกาแฟสำหรับเทมเพลตคาเฟ่",
    },
    "logo-hotel": {
      name: "เครื่องหมายโรงแรม",
      description: "เครื่องหมายอาคารสำหรับเทมเพลตโรงแรม",
    },
    "logo-retail": {
      name: "เครื่องหมายร้านค้า",
      description: "เครื่องหมายถุงช้อปสำหรับเทมเพลตร้านค้า",
    },
    "logo-business": {
      name: "เครื่องหมายธุรกิจ",
      description: "เครื่องหมายกระเป๋าเอกสารสำหรับเทมเพลตมืออาชีพ",
    },
    "logo-event": {
      name: "เครื่องหมายอีเวนต์",
      description: "เครื่องหมายบัตรเข้างานสำหรับเทมเพลตอีเวนต์",
    },
    "logo-wifi": {
      name: "เครื่องหมาย WiFi",
      description: "เครื่องหมายสัญญาณสำหรับเทมเพลต WiFi",
    },
    "logo-menu": {
      name: "เครื่องหมายเมนู",
      description: "เครื่องหมายรายการสำหรับเทมเพลตเมนูดิจิทัล",
    },
    "logo-review": {
      name: "เครื่องหมายรีวิว",
      description: "เครื่องหมายดาวสำหรับเทมเพลตรีวิว",
    },
    "icon-scan": {
      name: "ไอคอนสแกน",
      description: "ไอคอนสแกนทั่วไป",
    },
    "icon-link": {
      name: "ไอคอนลิงก์",
      description: "ไอคอนลิงก์ทั่วไป",
    },
    "bg-warm": {
      name: "กระดาษโทนอุ่น",
      description: "พื้นหลังกระดาษโทนอุ่นนุ่มนวล",
    },
    "bg-cool": {
      name: "สเลทเย็น",
      description: "พื้นหลังไล่สีสเลทโทนเย็น",
    },
    "bg-mint": {
      name: "มิ้นต์อ่อน",
      description: "พื้นหลังโทนมิ้นต์อ่อน",
    },
    "thumb-restaurant": {
      name: "ภาพย่อร้านอาหาร",
      description: "ภาพย่อสำหรับเทมเพลตร้านอาหาร",
    },
    "thumb-cafe": {
      name: "ภาพย่อคาเฟ่",
      description: "ภาพย่อสำหรับเทมเพลตคาเฟ่",
    },
    "thumb-hotel": {
      name: "ภาพย่อโรงแรม",
      description: "ภาพย่อสำหรับเทมเพลตโรงแรม",
    },
    "thumb-retail": {
      name: "ภาพย่อร้านค้า",
      description: "ภาพย่อสำหรับเทมเพลตร้านค้า",
    },
    "thumb-business": {
      name: "ภาพย่อธุรกิจ",
      description: "ภาพย่อสำหรับเทมเพลตธุรกิจ",
    },
    "thumb-event": {
      name: "ภาพย่ออีเวนต์",
      description: "ภาพย่อสำหรับเทมเพลตอีเวนต์",
    },
    "thumb-wifi": {
      name: "ภาพย่อ WiFi",
      description: "ภาพย่อสำหรับเทมเพลต WiFi",
    },
    "thumb-menu": {
      name: "ภาพย่อเมนู",
      description: "ภาพย่อสำหรับเทมเพลตเมนู",
    },
    "thumb-review": {
      name: "ภาพย่อรีวิว",
      description: "ภาพย่อสำหรับเทมเพลตรีวิว",
    },
  },
  seo: {
    generator: {
      title: "ทำคิวอาร์โค้ดฟรี ไม่ต้องสมัคร",
      description:
        "ทำคิวอาร์โค้ดฟรี ไม่ต้องสมัครสำหรับโค้ดแบบสแตติก สร้าง URL WiFi vCard WhatsApp LINE หรือเข้าสู่ระบบเพื่อ Dynamic QR ที่แก้ปลายทางหลังพิมพ์ได้ ปรับแต่ง ดาวน์โหลด สร้างเป็นชุดจาก CSV หรือเทมเพลต",
      // Change: Homepage hero H1 keeps the primary keyword and adds the SaaS promise.
      h1: "ทำคิวอาร์โค้ดฟรี — สร้างคิวอาร์โค้ดง่าย เร็ว และฟรี",
      introduction:
        "ทำคิวอาร์โค้ดแบบสแตติกฟรีในเบราว์เซอร์ ไม่ต้องสมัครสมาชิก เลือกประเภทเนื้อหา กรอกรายละเอียด ปรับดีไซน์ และทดสอบตัวอย่างสดก่อนแชร์ ต้องการลิงก์ที่แก้หลังพิมพ์ได้ สลับโหมด Dynamic หรือเปิดคู่มือ Dynamic QR ถ้าต้องการหลายลิงก์พร้อมกัน ใช้สร้างเป็นชุดจาก CSV หรือเริ่มจากเทมเพลต",
      body: [
        "GenMyQRCode คือเครื่องมือสร้างคิวอาร์โค้ดฟรีที่ทำงานทั้งหมดในเบราว์เซอร์ของคุณ คิวอาร์โค้ดสแตติกสำหรับ URL WiFi นามบัตร vCard WhatsApp LINE รีวิว Google การชำระเงิน และโปรไฟล์โซเชียล ถูกสร้างบนอุปกรณ์ของคุณเอง ข้อมูลที่กรอกจึงไม่ถูกอัปโหลดหรือบันทึก คุณปรับสี ลวดลาย โลโก้ และกรอบได้ แล้วดาวน์โหลดเป็น PNG พร้อมพิมพ์หรือ SVG แบบเวกเตอร์",
        "เมื่อต้องการคิวอาร์โค้ดที่ยังใช้งานได้แม้ปลายทางเปลี่ยน ให้สร้าง Dynamic QR ซึ่งเข้ารหัสลิงก์สั้นบน genmyqrcode.com ที่เปลี่ยนเส้นทางไปยัง URL ปัจจุบันของคุณ จึงอัปเดตเมนู หน้าแคมเปญ หรือลิงก์บนบรรจุภัณฑ์ได้โดยไม่ต้องพิมพ์ใหม่ Dynamic QR ต้องใช้บัญชีฟรีเพื่อจัดการ หยุดชั่วคราว และดูจำนวนสแกน",
        "เครื่องมือปรับแต่งดีไซน์ชุดเดียวกันใช้ได้ทั้งสองโหมด และการส่งออกเป็นชุดจาก CSV ช่วยสร้างโค้ดสแตติกได้สูงสุด 50 โค้ดด้วยดีไซน์เดียว ดูคู่มือด้านล่างสำหรับเคล็ดลับเฉพาะประเภท เช่น WiFi vCard รีวิว Google LINE และการชำระเงิน",
      ],
      howTo: [
        "เลือกประเภท QR ที่ตรงกับสิ่งที่ผู้คนควรทำหลังสแกน",
        "กรอกรายละเอียดที่จำเป็นแล้วตรวจสอบตัวอย่างสด",
        "ปรับสี ตา โลโก้ กรอบ ขนาด และการแก้ไขข้อผิดพลาด จากนั้นทดสอบสแกน",
        "ดาวน์โหลด PNG สำหรับพิมพ์หรือ SVG สำหรับแก้ไข หากต้องการลิงก์ที่แก้ได้ สลับโหมด Dynamic แล้วเข้าสู่ระบบ",
      ],
      faqs: [
        {
          question: "GenMyQRCode ฟรีหรือไม่?",
          answer:
            "ฟรี คิวอาร์โค้ดสแตติกใช้ได้ไม่จำกัด ไม่มีลายน้ำ และไม่ต้องมีบัญชี Dynamic QR รวมอยู่ในแพ็กเกจฟรีโดยมีโควตาโค้ดที่ใช้งานและจำนวนสแกน แพ็กเกจแบบชำระเงินสำหรับลิมิตที่สูงขึ้นจะเปิดเร็ว ๆ นี้",
        },
        {
          question: "ต้องมีบัญชีเพื่อสร้างคิวอาร์โค้ดแบบสแตติกหรือไม่?",
          answer:
            "ไม่ต้อง การสร้างคิวอาร์โค้ดแบบสแตติกใช้งานได้โดยไม่ต้องเข้าสู่ระบบ และเนื้อหาที่กรอกจะไม่ถูกบันทึก",
        },
        {
          question: "คิวอาร์โค้ดหมดอายุหรือไม่?",
          answer:
            "คิวอาร์โค้ดสแตติกไม่หมดอายุ เพราะเนื้อหาอยู่ในภาพ ส่วน Dynamic QR จะเปลี่ยนเส้นทางต่อไปตราบที่โค้ดยังเปิดใช้งานในบัญชีของคุณ และคุณหยุดชั่วคราวหรือเปิดใช้ใหม่ได้ทุกเมื่อ",
        },
        {
          question: "สแตติกกับ Dynamic QR ต่างกันอย่างไร?",
          answer:
            "สแตติกเก็บข้อมูลไว้ในภาพและแก้ไขหลังพิมพ์ไม่ได้ Dynamic QR เข้ารหัสลิงก์สั้นบน genmyqrcode.com ทำให้เปลี่ยนปลายทาง หยุดโค้ด และดูจำนวนสแกนได้ เข้าสู่ระบบแล้วสลับโหมด Dynamic ในตัวสร้าง หรืออ่านคู่มือ Dynamic QR",
        },
        {
          question: "ปรับแต่งคิวอาร์โค้ดได้ไหม?",
          answer:
            "ได้ เปลี่ยนสีพื้นหน้าและพื้นหลัง เพิ่มไล่ระดับสี อัปโหลดโลโก้หรือเลือกพรีเซ็ต เลือกลวดลายจุดและตา เพิ่มกรอบเส้นหรือกรอบป้าย เลือกพื้นหลังและเทมเพลต และตั้งค่าการแก้ไขข้อผิดพลาดกับขนาดไฟล์",
        },
        {
          question: "ใช้คิวอาร์โค้ดเชิงพาณิชย์ได้หรือไม่?",
          answer:
            "ได้ คิวอาร์โค้ดที่สร้างที่นี่ใช้กับธุรกิจ งานพิมพ์ บรรจุภัณฑ์ และการตลาดได้ คุณรับผิดชอบเนื้อหาที่ลิงก์ไปและการปฏิบัติตามข้อกำหนดของบริการภายนอก",
        },
        {
          question: "เข้ารหัสอะไรได้บ้าง?",
          answer:
            "สร้างโค้ดสำหรับ URL ข้อความ WiFi อีเมล โทรศัพท์ SMS นามบัตร vCard WhatsApp LINE ลิงก์รีวิว Google พิกัด อีเวนต์ Telegram โปรไฟล์โซเชียล และลิงก์ชำระเงินได้ ถ้าต้องการคิวอาร์โค้ด URL หลายอันพร้อมกัน ใช้เครื่องมือสร้างคิวอาร์โค้ดจาก CSV หากอยากได้ดีไซน์พร้อมใช้ ดูที่เทมเพลต",
        },
      ],
    },
    bulk: {
      title: "สร้างคิวอาร์โค้ดเป็นชุด — อัปโหลด CSV สูงสุด 50 รายการ",
      description:
        "สร้างคิวอาร์โค้ด URL หลายอันจากไฟล์ CSV ใช้ดีไซน์จากเทมเพลตหรือปรับเอง ตรวจแถว และดาวน์โหลด ZIP ไฟล์ PNG ไม่ต้องสมัคร",
      h1: "สร้างคิวอาร์โค้ดเป็นชุดจาก CSV",
      introduction:
        "อัปโหลดรายการลิงก์ ปรับดีไซน์ครั้งเดียวหรือเริ่มจากเทมเพลต แล้วส่งออกคิวอาร์โค้ดพร้อมพิมพ์ได้สูงสุดห้าสิบไฟล์ PNG ใน ZIP เดียว หากต้องการโค้ดเดียว ใช้เครื่องมือสร้างคิวอาร์โค้ดฟรี",
      howTo: [
        "เตรียม CSV ที่มีคอลัมน์ url, filename และ label (ไม่บังคับ) แล้วอัปโหลด",
        "เลือกเทมเพลตหรือปรับสี โลโก้ กรอบ และขนาดให้ทั้งชุด",
        "ตรวจแถวที่ถูกต้องแล้วดาวน์โหลด ZIP เมื่อพร้อม",
      ],
      faqs: [
        {
          question: "ควรใช้ CSV รูปแบบไหน?",
          answer:
            "ใส่ header เป็น url, filename และ label (ไม่บังคับ) แต่ละแถวคือหนึ่งคิวอาร์โค้ด label จะกลายเป็นข้อความบนกรอบเมื่อใช้กรอบแบบมีป้าย",
        },
        {
          question: "สร้างได้กี่รายการต่อครั้ง?",
          answer:
            "แต่ละชุดรองรับคิวอาร์โค้ด URL สูงสุด 50 รายการ เพื่อให้ส่งออกเร็วและเสถียรบนอุปกรณ์ทั่วไป รวมถึงเครื่องที่มี RAM ประมาณ 4 GB",
        },
        {
          question: "เก็บ CSV หรือคิวอาร์โค้ดของฉันไว้ไหม?",
          answer:
            "ไม่เก็บ การ parse, render และสร้าง ZIP ทำงานในเบราว์เซอร์เท่านั้น ไม่มีการอัปโหลดขึ้นเซิร์ฟเวอร์สำหรับ bulk export",
        },
        {
          question: "ใช้ดีไซน์เดียวกันทั้งชุดได้ไหม?",
          answer:
            "ได้ เลือกเทมเพลตหรือปรับสี โลโก้ และกรอบครั้งเดียว ดีไซน์จะใช้กับทั้งชุด ใช้คอลัมน์ label เพื่อเปลี่ยนข้อความกรอบต่อแถว",
        },
        {
          question: "ได้ไฟล์รูปแบบอะไร?",
          answer:
            "ไฟล์ ZIP ของ PNG แต่ละ PNG รวมคิวอาร์โค้ดกับกรอบ ป้าย และพื้นหลังที่เลือกไว้",
        },
      ],
    },
    qr: {
      url: {
        title: "เครื่องมือสร้างคิวอาร์โค้ด URL — พร้อมพิมพ์",
        description:
          "สร้างคิวอาร์โค้ด URL ฟรีสำหรับเมนู แคมเปญ และโปสเตอร์ ขนาดพิมพ์ เคล็ดลับสแกน สแตติก vs Dynamic ดาวน์โหลดในเบราว์เซอร์ — ไม่ต้องสมัคร",
        h1: "สร้างคิวอาร์โค้ดสำหรับ URL ใดก็ได้",
        introduction:
          "เปลี่ยนที่อยู่เว็บให้เป็นคิวอาร์โค้ดที่สแกนได้ โดยไม่ต้องพิมพ์ลิงก์ยาว ใช้บนโปสเตอร์ บรรจุภัณฑ์ นามบัตร ป้ายอีเวนต์ และเมนูพิมพ์ — ทดสอบสแกนก่อนสั่งพิมพ์",
        body: [
          "วางที่อยู่ https:// ที่มือถือเปิดได้เร็ว URL สั้นและคงที่สแกนง่ายกว่าลิงก์ติดตามยาวๆ ที่มีพารามิเตอร์เยอะ",
          "สื่อพิมพ์ควรมี QR อย่างน้อย 25–30 มม. (ประมาณ 2.5–3 ซม.) พร้อมพื้นที่ว่างรอบโค้ด 5 มม. เพื่อให้กล้องจับโค้ดได้",
          "ทดสอบสแกนจากระยะจริง — โปสเตอร์มัก 50–100 ซม. ป้ายโต๊ะ 25–40 ซม. ถ้าสแกนยาก ให้ขยายโค้ดหรือเพิ่ม error correction ก่อนพิมพ์จำนวนมาก",
          "โค้ด URL แบบสแตติกเข้ารหัสลิงก์โดยตรง ไม่หมดอายุฝั่งเรา แต่เปลี่ยนหลังพิมพ์ไม่ได้ ถ้า URL เปลี่ยน ให้ดาวน์โหลด PNG ใหม่ หรือใช้ Dynamic QR เมื่อต้องแก้หลังพิมพ์",
          "ตั้งข้อความกรอบสั้นๆ เช่น Visit website, Scan for menu หรือภาษาไทย ดูเว็บ / สแกนดูเมนู ให้รู้ว่าหลังสแกนจะเกิดอะไร",
          "โค้ดสแตติกทำงานในเบราว์เซอร์ของคุณ เราไม่เก็บ URL ที่พิมพ์ ใช้ contrast สูง (จุดเข้มบนพื้นอ่อน) เมื่อพิมพ์บนกระดาษมัน",
        ],
        howTo: [
          "วางที่อยู่เว็บไซต์ให้ครบ รวมถึง https://",
          "ปรับสี ข้อความกรอบ และขนาด ให้ contrast ชัดสำหรับพิมพ์",
          "ดาวน์โหลด PNG แล้วทดสอบสแกนในขนาดและระยะที่จะใช้จริง",
          "พิมพ์หรือเคลือบหลังสแกนด้วยมือถือสำเร็จเท่านั้น",
        ],
        faqs: [
          {
            question: "คิวอาร์โค้ดนี้หมดอายุหรือไม่?",
            answer:
              "ไม่หมดอายุ คิวอาร์โค้ด URL แบบสแตติกใช้งานได้ตราบใดที่เว็บไซต์ปลายทางยังเข้าถึงได้ที่อยู่เดิม",
          },
          {
            question: "เปลี่ยนปลายทางทีหลังได้หรือไม่?",
            answer:
              "โค้ดสแตติกหลังพิมพ์แล้วเปลี่ยนไม่ได้ หากต้องการแก้ลิงก์ได้ สลับเป็นโหมด Dynamic ในเครื่องมือ หรือเปิดหน้าคู่มือ Dynamic QR",
          },
          {
            question: "ควรพิมพ์ขนาดเท่าไหร่?",
            answer:
              "ใบปลิวและการ์ดใช้ QR อย่างน้อย 25–30 มม. โปสเตอร์ใหญ่ควรขยายโค้ดตามระยะที่คนยืนสแกน",
          },
          {
            question: "คุณเก็บ URL ที่กรอกหรือไม่?",
            answer:
              "ไม่เก็บสำหรับโค้ด URL แบบสแตติก สร้างและดาวน์โหลดในเบราว์เซอร์ Dynamic QR ต่างออกไป — เก็บ short link เพื่อให้แก้ปลายทางหลังเข้าสู่ระบบได้",
          },
        ],
      },
      wifi: {
        title: "เครื่องมือสร้างคิวอาร์โค้ด WiFi — ป้ายเครือข่ายแขก",
        description:
          "สร้างคิวอาร์โค้ด WiFi ฟรีสำหรับคาเฟ่และโรงแรม รหัสผ่านในเบราว์เซอร์เท่านั้น ขนาดพิมพ์ เคล็ดลับ WPA และเครือข่ายแขก vs พนักงาน — ไม่ต้องสมัคร",
        h1: "แชร์การเข้าถึง WiFi ด้วยคิวอาร์โค้ด",
        introduction:
          "ให้แขกเชื่อมต่อด้วยการสแกนแทนการพิมพ์รหัสผ่าน เหมาะเคาน์เตอร์คาเฟ่ การ์ดห้องพัก และโต๊ะต้อนรับ — ข้อมูลเครือข่ายประมวลผลในเบราว์เซอร์สำหรับโค้ดสแตติก",
        body: [
          "กรอก SSID ให้ตรงกับที่โทรศัพท์แสดง รวมตัวพิมพ์ใหญ่-เล็กและช่องว่าง Cafe_Guest ไม่เหมือน cafe_guest — ความไม่ตรงนี้เป็นสาเหตุหลักที่ QR WiFi ใช้ไม่ได้",
          "เลือก WPA/WPA2 สำหรับเราเตอร์สมัยใหม่ ใช้ไม่มีรหัสผ่านเฉพาะเครือข่ายที่ตั้งใจเปิด รหัสผ่านถูกเข้ารหัสใน QR จึงถือว่าโค้ดพิมพ์เท่ากับความลับที่แชร์ได้",
          "การสร้าง WiFi แบบสแตติกทำงานในเบราว์เซอร์เท่านั้น เราไม่อัปโหลด ไม่เก็บ และไม่บันทึกชื่อเครือข่ายหรือรหัสผ่านบนเซิร์ฟเวอร์",
          "สติกเกอร์เคาน์เตอร์กว้างประมาณ 50 มม. หรือการ์ด A6 (105 × 148 มม.) ใช้ได้ดี QR อย่างน้อย 25 มม. พร้อมพื้นที่ว่าง ทดสอบสแกนขณะยืนที่เคาน์เตอร์ก่อนเคลือบ",
          "ควรใช้ SSID แขกแยกสำหรับโค้ดพิมพ์ อย่าวางรหัสพนักงานหรือแอดมินบนป้ายสาธารณะ",
          "ไอน้ำ แสงสะท้อน และกระจกใกล้เครื่องชงอาจบังมุม QR — พิมพ์ด้านด้านเมื่อเป็นไปได้ แล้วทดสอบหลังติดป้ายจริง",
        ],
        howTo: [
          "กรอกชื่อเครือข่าย WiFi ให้ตรงกับที่แสดงบนโทรศัพท์ที่เชื่อมต่อได้แล้ว",
          "เลือก WPA (หรือประเภทที่ตรงกัน) แล้วกรอกรหัสผ่านแขกหากจำเป็น",
          "ตั้งข้อความกรอบสั้นๆ เช่น Connect to WiFi หรือ เชื่อมต่อ WiFi",
          "ดาวน์โหลด พิมพ์ตัวอย่างขนาดเคาน์เตอร์ แล้วยืนยันทั้ง iPhone และ Android เข้าเครือข่ายได้",
        ],
        faqs: [
          {
            question: "คิวอาร์โค้ดเปิดเผยรหัสผ่าน WiFi หรือไม่?",
            answer:
              "ใช่ — ผู้ที่สแกนหรือถ่ายภาพโค้ดอ่านรหัสผ่านจากข้อมูล QR ได้ แชร์โค้ดพิมพ์เฉพาะกับผู้ที่อนุญาตให้เข้าเครือข่าย",
          },
          {
            question: "คุณเก็บรหัสผ่าน WiFi หรือไม่?",
            answer:
              "ไม่เก็บ การสร้าง QR WiFi แบบสแตติกเกิดในเบราว์เซอร์เท่านั้น แอปนี้ไม่บันทึกหรือส่งรหัสผ่านไปเซิร์ฟเวอร์",
          },
          {
            question: "ควรเลือกประเภทความปลอดภัยแบบใด?",
            answer:
              "เครือข่ายแขกส่วนใหญ่ใช้ WPA หรือ WPA2 เลือก WEP เฉพาะเราเตอร์เก่า หรือไม่มีรหัสผ่านสำหรับเครือข่ายที่ตั้งใจเปิด",
          },
          {
            question: "ป้ายเคาน์เตอร์คาเฟ่ควรขนาดเท่าไหร่?",
            answer:
              "สติกเกอร์ 50 มม. หรือการ์ด A6 พอสำหรับเคาน์เตอร์ส่วนใหญ่ QR อย่างน้อย 25 มม. และทดสอบก่อนเคลือบ",
          },
        ],
      },
      email: {
        title: "เครื่องมือสร้างคิวอาร์โค้ดอีเมล",
        description:
          "สร้างคิวอาร์โค้ดอีเมลฟรีพร้อมผู้รับ หัวข้อและข้อความแบบไม่บังคับ ทำให้ติดต่อธุรกิจจากสื่อพิมพ์ได้เร็วขึ้น",
        h1: "เริ่มอีเมลด้วยคิวอาร์โค้ด",
        introduction:
          "คิวอาร์โค้ดอีเมลจะเปิดแอปอีเมลของผู้สแกนพร้อมกรอกผู้รับไว้แล้ว เพิ่มหัวข้อหรือข้อความแนะนำเพื่อให้การสอบถาม การขอความช่วยเหลือ และการตอบรับอีเวนต์ง่ายขึ้น",
        howTo: [
          "กรอกที่อยู่อีเมลที่ควรรับข้อความ",
          "เพิ่มหัวข้อและข้อความเริ่มต้นสั้นๆ ได้ตามต้องการ",
          "สแกนตัวอย่างและยืนยันว่าแอปอีเมลเปิดพร้อมรายละเอียดที่ต้องการ",
        ],
        faqs: [
          {
            question: "การสแกนจะส่งอีเมลอัตโนมัติหรือไม่?",
            answer:
              "ไม่ส่ง แค่เปิดร่างอีเมลที่เตรียมไว้ ผู้เยี่ยมชมตรวจทานแล้วเลือกส่งเอง",
          },
          {
            question: "ใส่ข้อความได้หรือไม่?",
            answer:
              "ได้ หัวข้อและข้อความเป็นตัวเลือกเสริมและช่วยชี้นำผู้ที่ติดต่อคุณ",
          },
        ],
      },
      phone: {
        title: "เครื่องมือสร้างคิวอาร์โค้ดหมายเลขโทรศัพท์",
        description:
          "สร้างคิวอาร์โค้ดโทรศัพท์ฟรีที่เปิดหน้าจอโทรเมื่อสแกน เหมาะกับหน้าร้าน รถบริการ และสื่อโปรโมตพิมพ์",
        h1: "โทรออกจากคิวอาร์โค้ด",
        introduction:
          "คิวอาร์โค้ดโทรศัพท์เปิดหน้าจอโทรพร้อมหมายเลขของคุณ ช่วยย่นระยะระหว่างการเห็นข้อความพิมพ์กับการคุยกับธุรกิจหรือทีมบริการ",
        howTo: [
          "กรอกหมายเลขโทรศัพท์ โดยแนะนำให้ใส่รหัสประเทศ",
          "ตรวจดูตัวอย่างสดหลังเปลี่ยนหมายเลขหรือสไตล์",
          "สแกนด้วยโทรศัพท์เพื่อตรวจว่าหมายเลขถูกต้องปรากฏในหน้าจอโทร",
        ],
        faqs: [
          {
            question: "การสแกนจะโทรทันทีหรือไม่?",
            answer: "ไม่โทร โทรศัพท์เปิดหน้าจอโทรและผู้เยี่ยมชมยืนยันการโทรเอง",
          },
          {
            question: "ควรใส่รหัสประเทศหรือไม่?",
            answer:
              "ควรใส่ รหัสประเทศช่วยให้โค้ดใช้งานได้เชื่อถือได้สำหรับผู้เยี่ยมชมต่างประเทศ",
          },
        ],
      },
      sms: {
        title: "เครื่องมือสร้างคิวอาร์โค้ด SMS",
        description:
          "สร้างคิวอาร์โค้ด SMS ฟรีพร้อมผู้รับและข้อความกรอกล่วงหน้าแบบไม่บังคับ ช่วยลูกค้าเริ่มแชทข้อความด้วยการสแกนครั้งเดียว",
        h1: "เริ่มข้อความ SMS ด้วยคิวอาร์โค้ด",
        introduction:
          "คิวอาร์โค้ด SMS เปิดร่างข้อความถึงหมายเลขที่คุณเลือก ใช้สำหรับนัดหมาย ออเดอร์ง่ายๆ คำถามซัพพอร์ต หรือวิธีตอบโปรโมชันที่ง่าย",
        howTo: [
          "กรอกหมายเลขมือถือ รวมรหัสประเทศเมื่อเหมาะสม",
          "เพิ่มข้อความไม่บังคับที่ผู้เยี่ยมชมแก้ไขได้ก่อนส่ง",
          "สแกนคิวอาร์โค้ดเพื่อตรวจสอบว่าแอปข้อความเปิดถูกต้อง",
        ],
        faqs: [
          {
            question: "คิวอาร์โค้ดจะส่งข้อความอัตโนมัติหรือไม่?",
            answer: "ไม่ส่ง แค่เตรียมข้อความ ผู้เยี่ยมชมตัดสินใจส่งเอง",
          },
          {
            question: "ผู้เยี่ยมชมเปลี่ยนข้อความที่กรอกล่วงหน้าได้หรือไม่?",
            answer: "ได้ ข้อความยังแก้ไขได้ในแอปข้อความ",
          },
        ],
      },
      vcard: {
        title: "เครื่องมือสร้างคิวอาร์โค้ด vCard — นามบัตรดิจิทัล",
        description:
          "สร้างคิวอาร์โค้ด vCard ฟรีสำหรับชื่อ โทรศัพท์ อีเมล และเว็บไซต์ ขนาดพิมพ์บนนามบัตรและป้ายชื่อ เคล็ดลับบันทึกผู้ติดต่อ ดาวน์โหลดในเบราว์เซอร์",
        h1: "แชร์นามบัตรดิจิทัลด้วยคิวอาร์โค้ด",
        introduction:
          "คิวอาร์โค้ด vCard ให้บันทึกรายละเอียดติดต่อด้วยการสแกนครั้งเดียว ใส่บนนามบัตร ป้ายชื่อ หรือป้ายบูธ เพื่อเก็บเบอร์และอีเมลโดยไม่ต้องพิมพ์ซ้ำ",
        body: [
          "กรอกอย่างน้อยชื่อหรือนามสกุล เพิ่มองค์กร โทรศัพท์ อีเมล และเว็บไซต์เฉพาะที่ต้องการบันทึก — การ์ดสั้นมักสแกนง่ายกว่าบนมือถือรุ่นเก่า",
          "อุปกรณ์ส่วนใหญ่เข้าใจ vCard 3.0 แต่หน้าจอบันทึกต่างกันตามแอปกล้องและระบบ ทดสอบทั้ง iPhone และ Android ก่อนสั่งพิมพ์นามบัตร",
          "บนนามบัตร QR อย่างน้อย 20–25 มม. พร้อมพื้นที่ว่าง ป้ายชื่อและโปสเตอร์บูธใช้ 30 มม. ขึ้นไปปลอดภัยกว่าระยะแขน",
          "นี่คือโค้ดสแตติก: ถ้าเบอร์หรืออีเมลเปลี่ยน ต้องสร้างและพิมพ์ PNG ใหม่ Dynamic QR ใช้กับลิงก์เว็บที่แก้ได้ ไม่ใช่แก้ข้อมูล vCard หลังพิมพ์",
          "ตั้งข้อความกรอบสั้นๆ เช่น Save contact, Add me หรือภาษาไทย บันทึกเบอร์ / นามบัตร ให้รู้ว่าสแกนแล้วเพิ่มผู้ติดต่อ ไม่ใช่เปิดเว็บ",
          "การสร้างทำงานในเบราว์เซอร์ เราไม่เก็บฟิลด์ติดต่อที่คุณพิมพ์สำหรับดาวน์โหลด vCard แบบสแตติก",
        ],
        howTo: [
          "กรอกอย่างน้อยชื่อหรือนามสกุลสำหรับนามบัตร",
          "เพิ่มองค์กร โทรศัพท์ อีเมล และเว็บไซต์ได้ตามต้องการ",
          "ตั้งข้อความกรอบสั้นๆ แล้วดาวน์โหลด PNG ตามขนาดนามบัตรหรือป้ายชื่อ",
          "ทดสอบสแกนบน iPhone และ Android ยืนยันว่าโทรศัพท์เสนอให้บันทึกผู้ติดต่อ",
        ],
        faqs: [
          {
            question: "ทุกโทรศัพท์บันทึกผู้ติดต่อแบบเดียวกันหรือไม่?",
            answer:
              "โทรศัพท์ส่วนใหญ่เข้าใจ vCard 3.0 แต่หน้าจอบันทึกอาจต่างกันตามอุปกรณ์และแอปกล้อง ทดสอบบนมือถือที่ลูกค้าใช้จริง",
          },
          {
            question: "อัปเดตรายละเอียดหลังพิมพ์ได้หรือไม่?",
            answer:
              "ไม่ได้ นี่คือคิวอาร์โค้ดแบบสแตติก หากข้อมูลเปลี่ยน ให้สร้างและพิมพ์โค้ดใหม่",
          },
          {
            question: "QR บนนามบัตรควรใหญ่เท่าไหร่?",
            answer:
              "อย่างน้อย 20–25 มม. พร้อมพื้นที่ว่างรอบโค้ด โค้ดเล็กเกินไปมักสแกนยากใต้แสงในอาคาร",
          },
          {
            question: "คุณเก็บเบอร์หรืออีเมลของฉันหรือไม่?",
            answer:
              "ไม่เก็บสำหรับโค้ด vCard แบบสแตติก ข้อมูลอยู่ในเบราว์เซอร์จนกว่าคุณจะดาวน์โหลดภาพ",
          },
        ],
      },
      whatsapp: {
        title: "เครื่องมือสร้างคิวอาร์โค้ด WhatsApp",
        description:
          "สร้างคิวอาร์โค้ด WhatsApp ฟรีที่เปิดแชทพร้อมหมายเลขและข้อความเริ่มต้นแบบไม่บังคับ เหมาะกับเคาน์เตอร์ซัพพอร์ตและหน้าร้าน",
        h1: "เริ่มแชท WhatsApp จากคิวอาร์โค้ด",
        introduction:
          "คิวอาร์โค้ด WhatsApp เปิด wa.me พร้อมหมายเลขของคุณ เพิ่มข้อความสั้นๆ เพื่อให้ลูกค้าถามเวลา ออเดอร์ หรือการจองได้โดยไม่ต้องหาแชทเอง",
        howTo: [
          "กรอกหมายเลข WhatsApp พร้อมรหัสประเทศ",
          "เพิ่มข้อความที่ผู้เยี่ยมชมแก้ไขได้ก่อนส่ง (ไม่บังคับ)",
          "สแกนตัวอย่างและยืนยันว่า WhatsApp เปิดแชทที่ต้องการ",
        ],
        faqs: [
          {
            question: "การสแกนจะส่งข้อความ WhatsApp อัตโนมัติหรือไม่?",
            answer: "ไม่ส่ง แค่เปิดร่างแชท ผู้เยี่ยมชมเลือกส่งเอง",
          },
          {
            question: "ต้องใส่เครื่องหมายบวกในหมายเลขหรือไม่?",
            answer:
              "ใส่รหัสประเทศได้ ระบบจะตัดช่องว่างออกก่อนสร้างลิงก์ wa.me",
          },
        ],
      },
      line: {
        title: "เครื่องมือสร้างคิวอาร์โค้ด LINE — ป้ายบัญชีทางการ",
        description:
          "สร้างคิวอาร์โค้ด LINE ฟรีจาก @OA, LINE ID หรือ URL line.me ขนาดสติกเกอร์และเคาน์เตอร์ เคล็ดลับแอดเพื่อน — แต่งป้าย ไม่แทน LINE OA Manager",
        h1: "เปิดโปรไฟล์ LINE ด้วยคิวอาร์โค้ด",
        introduction:
          "LINE ใช้กันกว้างในไทยและเอเชียตะวันออก เข้ารหัสบัญชีทางการ (@handle) LINE ID หรือลิงก์ line.me เพื่อแอดแชทโดยไม่พิมพ์ ID — แล้วแต่งป้ายพิมพ์สำหรับเคาน์เตอร์",
        body: [
          "วางลิงก์เพิ่มเพื่อนหรือ @บัญชีทางการที่คัดลอกจาก LINE OA Manager แล้ว เครื่องมือนี้แต่ง QR พิมพ์จากลิงก์นั้น ไม่แทน OA Manager หรือระบบวิเคราะห์ของ LINE",
          "ขนาดพิมพ์ทั่วไป: สติกเกอร์ 50 × 50 มม. ป้าย A6 (105 × 148 มม.) หรือท้ายใบเสร็จ QR อย่างน้อย 25 มม. พร้อมพื้นที่ว่างรอบโค้ด",
          "ตั้งข้อความกรอบที่ลูกค้าเข้าใจ: Add LINE, แอด LINE, สั่งผ่าน LINE หรือ Chat with us ทดสอบสแกนด้วยมือถือที่มี LINE อยู่แล้ว",
          "การเปิดโปรไฟล์ LINE ต้องมีแอป LINE บนเครื่องที่สแกน หากไม่มี LINE การสแกนอาจได้แค่หน้าเว็บสำรองตามอุปกรณ์",
          "จับคู่สติกเกอร์ LINE ที่เคาน์เตอร์กับ QR เมนูหรือ WiFi แยกเมื่อจำเป็น — หนึ่งงานต่อหนึ่งโค้ดพิมพ์ สแกนง่ายกว่าป้ายที่แน่นเกินไป",
          "โค้ด LINE แบบสแตติกสร้างในเบราว์เซอร์ หากเปลี่ยน URL เชิญ OA ทีหลัง ให้ดาวน์โหลดและพิมพ์ PNG ใหม่",
        ],
        howTo: [
          "กรอก @บัญชีทางการ, LINE ID หรือวาง URL https://line.me จาก OA Manager",
          "เลือกเทมเพลตหรือสี แล้วตั้งข้อความกรอบสั้นๆ ไทยหรืออังกฤษ",
          "ดาวน์โหลด PNG สำหรับสติกเกอร์ 50 มม. หรือป้ายเคาน์เตอร์ A6",
          "ทดสอบสแกนเมื่อมี LINE ติดตั้งแล้ว พิมพ์หรือเคลือบหลังแอดเพื่อนสำเร็จ",
        ],
        faqs: [
          {
            question: "ควรกรอกอะไรสำหรับบัญชีทางการ?",
            answer: "ใช้รูปแบบ @handle เช่น @yourshop หรือวาง URL เชิญจาก OA Manager",
          },
          {
            question: "ผู้สแกนต้องมีแอป LINE หรือไม่?",
            answer:
              "ต้องมี การเปิดโปรไฟล์หรือหน้าเพิ่มเพื่อน LINE ต้องใช้แอป LINE บนอุปกรณ์ที่สแกน",
          },
          {
            question: "แทน LINE OA Manager หรือไม่?",
            answer:
              "ไม่แทน สร้างและจัดการบัญชีทางการในเครื่องมือของ LINE แล้วนำลิงก์เพิ่มเพื่อนมาแต่งป้าย QR พิมพ์ที่นี่เท่านั้น",
          },
          {
            question: "สติกเกอร์เคาน์เตอร์ควรขนาดเท่าไหร่?",
            answer:
              "สติกเกอร์ 50 × 50 มม. และป้าย A6 (105 × 148 มม.) ใช้บ่อย QR อย่างน้อย 25 มม. ทดสอบก่อนเคลือบ",
          },
        ],
      },
      "google-review": {
        title: "เครื่องมือสร้างคิวอาร์โค้ดรีวิว Google — มือถือ + กรอบ",
        description:
          "สร้างคิวอาร์รีวิว Google ฟรีบนมือถือพร้อมกรอบ QR ของ Google เองเป็นโค้ดเปล่า — ใส่ป้าย ให้คะแนนเรา และพิมพ์สติกเกอร์เคาน์เตอร์ที่นี่",
        h1: "เก็บรีวิว Google ด้วยคิวอาร์โค้ด",
        introduction:
          "วางคิวอาร์รีวิวบนใบเสร็จ ป้ายโต๊ะ หรือเคาน์เตอร์ชำระเงิน ลูกค้าสแกนแล้วเปิดหน้ารีวิว Google — พร้อมสีร้านและข้อความ ให้คะแนนเรา / Rate us จากเบราว์เซอร์มือถือ",
        body: [
          "คัดลอกลิงก์รีวิวสั้นหรือ “ขอรีวิว” จาก Google Business Profile แล้ววาง https:// ทั้งก้อนที่นี่ QR จะเปิดหน้าให้คะแนนสาธารณะในครั้งเดียว",
          "QR ที่ดาวน์โหลดจาก Google มักเป็นโค้ดเปล่าไม่มีสีร้านหรือข้อความเรียกให้รีวิว ที่นี่ใส่กรอบ ข้อความ ให้คะแนนเรา หรือ Rate us แล้วดาวน์โหลดบนมือถือก่อนพิมพ์",
          "สติกเกอร์เคาน์เตอร์ประมาณ 50 × 50 มม. หรือป้าย A6 เล็กๆ ใช้ได้ดี QR อย่างน้อย 25 มม. วางตำแหน่งที่ไม่ถูกใบเสร็จหรือเครื่องปรุงบังมุม",
          "เข้ารหัส URL รีวิวแบบสแตติก หาก Google เปลี่ยนลิงก์แชร์ ให้สร้าง PNG ใหม่ — หรือใช้ Dynamic QR เมื่อต้องแก้ปลายทางหลังพิมพ์",
          "ทดสอบสแกนที่เคาน์เตอร์ด้วยกล้องมือถือที่ลูกค้าใช้จริง แสงนุ่มและการเคลือบสะท้อนอาจลดโอกาสสแกนถ้าโค้ดเล็กเกินไป",
          "การสร้างแบบสแตติกอยู่ในเบราว์เซอร์ ไม่ต้องล็อกอิน Google — คุณแค่วางลิงก์รีวิวสาธารณะที่เป็นของคุณอยู่แล้ว",
        ],
        howTo: [
          "คัดลอก URL รีวิวหรือแชร์ Maps จาก Google Business Profile",
          "วางลิงก์ https ทั้งก้อน แล้วเลือกสีกับข้อความกรอบ ให้คะแนนเรา",
          "ดาวน์โหลดบนมือถือและทดสอบสแกนระยะเคาน์เตอร์",
          "พิมพ์สติกเกอร์หรือป้ายหลังหน้ารีวิวเปิดถูกต้องเท่านั้น",
        ],
        faqs: [
          {
            question: "หาลิงก์รีวิว Google ได้จากไหน?",
            answer:
              "เปิด Google Business Profile หรือ Google Maps แล้วคัดลอกลิงก์แชร์หรือ “ขอรีวิว” ของสถานที่คุณ",
          },
          {
            question: "ต่างจาก QR ของ Google เองอย่างไร?",
            answer:
              "ปลายทางลิงก์รีวิวเดียวกัน แต่ใส่สีแบรนด์ กรอบ และข้อความสั้นได้ และสร้างหรือดาวน์โหลดบนมือถือได้ ไฟล์เริ่มต้นของ Google เป็น QR เปล่าไม่มีป้าย",
          },
          {
            question: "นี่คือคิวอาร์โค้ดแบบไดนามิกหรือไม่?",
            answer:
              "ไม่ใช่ URL รีวิวถูกเข้ารหัสในคิวอาร์โค้ดแบบสแตติก หากลิงก์เปลี่ยน ให้สร้างโค้ดใหม่ หรือดูหน้า Dynamic QR สำหรับปลายทางที่แก้ได้",
          },
          {
            question: "ขนาดบนเคาน์เตอร์ชำระเงินเท่าไหร่ดี?",
            answer:
              "สติกเกอร์ 50 × 50 มม. หรือป้าย A6 QR อย่างน้อย 25 มม. ทดสอบก่อนเคลือบ",
          },
        ],
      },
      dynamic: {
        title: "เครื่องมือ Dynamic QR — แก้ลิงก์หลังพิมพ์",
        description:
          "สร้าง Dynamic QR บน genmyqrcode.com ด้วยบัญชีฟรี เปลี่ยน URL ปลายทางหลังพิมพ์ พักแคมเปญ และดูยอดสแกน",
        h1: "Dynamic QR ที่อัปเดตปลายทางทีหลังได้",
        introduction:
          "Dynamic QR ชี้ไปลิงก์สั้นบน genmyqrcode.com (เช่น /r/yourCode) ผู้สแกนจะเปิด URL ปลายทางปัจจุบันของคุณ คุณเปลี่ยน URL นั้น พักโค้ด หรือดูยอดสแกนได้โดยไม่ต้องพิมพ์โปสเตอร์ เมนู หรือบรรจุภัณฑ์ใหม่ ส่วน Static QR ยังเข้ารหัสเนื้อหาในภาพโดยตรง เหมาะกับ WiFi, vCard และลิงก์ถาวรที่ไม่ต้องแก้",
        howTo: [
          "เข้าสู่ระบบ เปิดเครื่องมือสร้าง QR แล้วสลับเป็นโหมด Dynamic",
          "ใส่ URL ปลายทางแบบ http หรือ https (ใส่ชื่อเรียกได้ถ้าต้องการจำโค้ดง่ายขึ้น) แล้วสร้าง Dynamic QR",
          "ปรับดีไซน์ตามต้องการ ดาวน์โหลดภาพ แล้วพิมพ์—คิวอาร์เข้ารหัสลิงก์สั้น ไม่ใช่ URL เว็บสุดท้าย",
          "ถ้าจะแก้ทีหลัง เปิด Dynamic QR ของฉันในบัญชี เพื่ออัปเดตปลายทาง พักหรือเปิดใช้ใหม่ และดูยอดสแกน",
        ],
        faqs: [
          {
            question: "Static กับ Dynamic ต่างกันอย่างไร?",
            answer:
              "Static เก็บ payload ในภาพ Dynamic เก็บลิงก์สั้นบน genmyqrcode.com สำหรับ redirect จึงแก้ปลายทางหลังพิมพ์ได้ ใช้ Static สำหรับ WiFi, vCard หรือลิงก์ถาวร และใช้ Dynamic สำหรับแคมเปญกับเมนูที่เปลี่ยนบ่อย",
          },
          {
            question: "ต้องสมัครบัญชีไหม?",
            answer:
              "ต้อง เข้าสู่ระบบด้วยอีเมลหรือ Google เพื่อสร้างและจัดการ Dynamic QR โค้ดของคุณจะผูกกับบัญชีและใช้ได้บนอุปกรณ์ที่ลงชื่อเข้าใช้",
          },
          {
            question: "ลิงก์สั้นชี้ไปที่ไหน?",
            answer:
              "โค้ด Dynamic ที่พิมพ์ใช้ https://genmyqrcode.com/r/{code} แล้ว redirect (HTTP 302) ไปปลายทางปัจจุบัน หากพักโค้ด ผู้สแกนจะเห็นหน้าแจ้งว่าลิงก์ถูกปิดใช้งาน จนกว่าจะเปิดใช้อีกครั้ง",
          },
          {
            question: "ตัวสร้าง QR ยังไม่มีโฆษณาใช่ไหม?",
            answer:
              "ใช่ โฆษณาอาจอยู่บนหน้า SEO รอบเครื่องมือ แต่พื้นผิวตัวสร้าง QR ยังไม่มีโฆษณา",
          },
          {
            question: "Dynamic เข้ารหัส WiFi หรือ vCard ได้ไหม?",
            answer:
              "ผ่าน HTTP redirect ไม่ได้ Dynamic รองรับปลายทาง http/https เท่านั้น ใช้โหมด Static สำหรับ WiFi, vCard, SMS และ payload คล้ายกัน",
          },
        ],
      },
      youtube: {
        title: "เครื่องมือ YouTube QR — ลิงก์ช่องและวิดีโอฟรี",
        description:
          "สร้าง YouTube QR ฟรีสำหรับช่องหรือวิดีโอ ใส่แฮนเดิลหรือ URL ปรับดีไซน์ แล้วดาวน์โหลดคิวอาร์แบบสแตติกในเบราว์เซอร์",
        h1: "เครื่องมือสร้าง YouTube QR",
        introduction:
          "พาสแกนไปช่องหรือวิดีโอ YouTube ด้วยคิวอาร์แบบสแตติก วาง URL หรือใส่ @handle — สร้างในเบราว์เซอร์โดยไม่บันทึกบนเซิร์ฟเวอร์",
        howTo: [
          "เปิดหน้านี้และเลือก Social → YouTube ในเครื่องมือ",
          "ใส่ @handle หรือวาง URL youtube.com / youtu.be",
          "ปรับสีหรือกรอบได้ แล้วดาวน์โหลด PNG หรือ SVG และทดสอบสแกนก่อนพิมพ์",
        ],
        faqs: [
          {
            question: "ลิงก์วิดีโอเฉพาะได้ไหม?",
            answer: "ได้ วาง URL วิดีโอเต็ม แฮนเดิลจะชี้ไปหน้าช่อง youtube.com/@ชื่อ",
          },
          {
            question: "นี่คือ Dynamic QR ไหม?",
            answer: "ไม่ใช่ ลิงก์อยู่ในภาพ หากต้องการแก้ปลายทางโดยไม่พิมพ์ใหม่ ใช้โหมด Dynamic",
          },
        ],
      },
      tiktok: {
        title: "เครื่องมือ TikTok QR — ลิงก์โปรไฟล์ฟรี",
        description: "สร้าง TikTok QR ฟรีสำหรับโปรไฟล์ ใส่ชื่อผู้ใช้หรือ URL ปรับสไตล์ แล้วดาวน์โหลดทันที ไม่ต้องสมัคร",
        h1: "เครื่องมือสร้าง TikTok QR",
        introduction: "ให้คนติดตาม TikTok ด้วยคิวอาร์สแตติก ใส่ชื่อผู้ใช้หรือวาง URL โปรไฟล์ payload อยู่ในภาพ",
        howTo: [
          "เลือก Social → TikTok",
          "ใส่ชื่อผู้ใช้ (มีหรือไม่มี @) หรือวาง URL โปรไฟล์ tiktok.com",
          "ดาวน์โหลดแล้วทดสอบสแกนก่อนพิมพ์สติกเกอร์หรือโปสเตอร์",
        ],
        faqs: [
          {
            question: "QR เปิดแอป TikTok ไหม?",
            answer: "โทรศัพท์มักเปิดแอปหรือเว็บมือถือจากลิงก์ https ในคิวอาร์",
          },
          {
            question: "เปลี่ยนโปรไฟล์ทีหลังได้ไหม?",
            answer: "คิวอาร์สแตติกเปลี่ยนไม่ได้ สร้างใหม่ หรือใช้โหมด Dynamic",
          },
        ],
      },
      linkedin: {
        title: "เครื่องมือ LinkedIn QR — ลิงก์โปรไฟล์ฟรี",
        description: "สร้าง LinkedIn QR ฟรีสำหรับนามบัตรและงานอีเวนต์ ใส่ URL หรือชื่อ vanity แล้วดาวน์โหลดคิวอาร์สแตติก",
        h1: "เครื่องมือสร้าง LinkedIn QR",
        introduction: "แชร์โปรไฟล์ LinkedIn โดยไม่พิมพ์ URL ยาว เหมาะกับนามบัตร ป้าย และบูธ",
        howTo: [
          "เลือก Social → LinkedIn",
          "วาง URL โปรไฟล์ หรือใส่ชื่อหลัง /in/",
          "ดาวน์โหลด PNG หรือ SVG แล้วทดสอบสแกนก่อนพิมพ์นามบัตร",
        ],
        faqs: [
          {
            question: "มีแค่ URL โปรไฟล์ต้องใส่อย่างไร?",
            answer: "วางลิงก์ https://www.linkedin.com/in/... ทั้งก้อน น่าเชื่อถือที่สุด",
          },
          {
            question: "รองรับหน้าบริษัทไหม?",
            answer: "รองรับ — วาง URL หน้าบริษัทเต็ม ชอร์ตคัทชื่อผู้ใช้ใช้กับโปรไฟล์ /in/",
          },
        ],
      },
      snapchat: {
        title: "เครื่องมือ Snapchat QR — ลิงก์เพิ่มเพื่อนฟรี",
        description: "สร้าง Snapchat QR ฟรีที่เปิดลิงก์เพิ่มเพื่อน ใส่ชื่อผู้ใช้หรือ URL แล้วดาวน์โหลดคิวอาร์สแตติก",
        h1: "เครื่องมือสร้าง Snapchat QR",
        introduction: "ให้เพื่อนเพิ่ม Snapchat ด้วยคิวอาร์ที่พิมพ์หรือโชว์บนจอ เราเข้ารหัสลิงก์ snapchat.com/add แบบสแตติก",
        howTo: [
          "เลือก Social → Snapchat",
          "ใส่ชื่อผู้ใช้ Snapchat หรือวาง URL เพิ่มเพื่อน",
          "ปรับดีไซน์ได้ แล้วดาวน์โหลดและทดสอบสแกน",
        ],
        faqs: [
          {
            question: "เหมือน Snapcode ในแอปไหม?",
            answer: "ไม่ใช่ นี่คือคิวอาร์มาตรฐานที่เปิดลิงก์เว็บ Snapcode สีเหลืองเป็นฟอร์แมตในแอป",
          },
          {
            question: "ต้องสมัครบัญชีบน Build Your QR ไหม?",
            answer: "ไม่ต้อง สร้างในเบราว์เซอร์และไม่อัปโหลดอะไร",
          },
        ],
      },
      reddit: {
        title: "เครื่องมือ Reddit QR — โปรไฟล์หรือชุมชนฟรี",
        description: "สร้าง Reddit QR ฟรีสำหรับโปรไฟล์หรือซับเรดดิต ใส่ u/name, r/community หรือ URL แล้วดาวน์โหลดทันที",
        h1: "เครื่องมือสร้าง Reddit QR",
        introduction: "พาสแกนไปโปรไฟล์หรือชุมชน Reddit ด้วยคิวอาร์สแตติก ใช้ r/subreddit ชื่อผู้ใช้ หรือวาง URL reddit.com",
        howTo: [
          "เลือก Social → Reddit",
          "ใส่ r/ชุมชน ชื่อผู้ใช้ หรือวาง URL Reddit เต็ม",
          "ดาวน์โหลดแล้วทดสอบสแกนก่อนใส่ในสื่อพิมพ์",
        ],
        faqs: [
          {
            question: "ลิงก์ซับเรดดิตอย่างไร?",
            answer: "พิมพ์ r/ชื่อชุมชน เช่น r/qrcode หรือวาง URL ซับเรดดิตเต็ม",
          },
          {
            question: "เปลี่ยนลิงก์หลังพิมพ์ได้ไหม?",
            answer: "สแตติกเปลี่ยนไม่ได้ ใช้โหมด Dynamic ถ้าต้องการแก้ปลายทาง",
          },
        ],
      },
      discord: {
        title: "เครื่องมือ Discord QR — ลิงก์เชิญฟรี",
        description: "สร้าง Discord QR ฟรีสำหรับลิงก์เชิญเซิร์ฟเวอร์ ใส่โค้ดเชิญหรือ URL discord.gg แล้วดาวน์โหลดคิวอาร์สแตติก",
        h1: "เครื่องมือสร้าง Discord QR",
        introduction: "ขยายชุมชน Discord ด้วยคิวอาร์เชิญ เข้ารหัส discord.gg เป็นสแตติกสำหรับโปสเตอร์หรืองานอีเวนต์",
        howTo: [
          "เลือก Social → Discord",
          "วาง URL discord.gg / discord.com หรือใส่เฉพาะโค้ดเชิญ",
          "ดาวน์โหลดและทดสอบสแกน สร้างใหม่ถ้าหมุนลิงก์เชิญ",
        ],
        faqs: [
          {
            question: "ถ้าลิงก์เชิญหมดอายุ?",
            answer: "คิวอาร์สแตติกยังชี้ลิงก์เก่า สร้าง QR ใหม่ หรือใช้ Dynamic เพื่ออัปเดตโดยไม่พิมพ์ใหม่",
          },
          {
            question: "ใส่ชื่อผู้ใช้ Discord ได้ไหม?",
            answer: "เครื่องมือนี้เน้นลิงก์เชิญ วาง URL เชิญเต็มจะชัวร์ที่สุด",
          },
        ],
      },
      spotify: {
        title: "เครื่องมือ Spotify QR — โปรไฟล์และเพลย์ลิสต์ฟรี",
        description: "สร้าง Spotify QR ฟรีสำหรับศิลปิน ผู้ใช้ หรือเพลย์ลิสต์ วางลิงก์ open.spotify.com หรือใส่ชื่อผู้ใช้แล้วดาวน์โหลด",
        h1: "เครื่องมือสร้าง Spotify QR",
        introduction: "แชร์เพลงด้วยการสแกน วางลิงก์ open.spotify.com จะแม่นที่สุด หรือใส่ชื่อผู้ใช้เพื่อสร้าง URL โปรไฟล์",
        howTo: [
          "เลือก Social → Spotify",
          "วาง URL เพลง เพลย์ลิสต์ ศิลปิน หรือโปรไฟล์ (แนะนำ) หรือใส่ชื่อผู้ใช้",
          "ดาวน์โหลด PNG หรือ SVG แล้วทดสอบสแกนบนมือถือที่มี Spotify",
        ],
        faqs: [
          {
            question: "ควรวางลิงก์ Spotify เต็มไหม?",
            answer: "ควร เมื่อเป็นเพลย์ลิสต์หรือแทร็ก URL เต็มน่าเชื่อถือกว่า",
          },
          {
            question: "ต้องมีแอป Spotify ไหม?",
            answer: "QR เปิดลิงก์ https มือถืออาจส่งต่อไปแอปถ้าติดตั้งไว้",
          },
        ],
      },
      soundcloud: {
        title: "เครื่องมือ SoundCloud QR — ลิงก์โปรไฟล์ฟรี",
        description: "สร้าง SoundCloud QR ฟรีสำหรับโปรไฟล์หรือหน้าแทร็ก วาง URL หรือชื่อผู้ใช้แล้วดาวน์โหลดคิวอาร์สแตติก",
        h1: "เครื่องมือสร้าง SoundCloud QR",
        introduction: "พาแฟนไป SoundCloud ด้วยคิวอาร์บนใบปลิวหรือสินค้า วาง URL soundcloud.com หรือใส่ชื่อผู้ใช้โปรไฟล์",
        howTo: [
          "เลือก Social → SoundCloud",
          "ใส่ชื่อผู้ใช้ หรือวาง URL โปรไฟล์/แทร็ก",
          "ปรับดีไซน์ได้ แล้วดาวน์โหลดและทดสอบสแกน",
        ],
        faqs: [
          {
            question: "ลิงก์แทร็กเดียวได้ไหม?",
            answer: "ได้ — วาง URL แทร็กเต็ม ชอร์ตคัทชื่อผู้ใช้สร้าง URL โปรไฟล์",
          },
          {
            question: "แก้หลังพิมพ์ได้ไหม?",
            answer: "สแตติกไม่ได้ ใช้โหมด Dynamic ถ้าต้องการเปลี่ยนปลายทาง",
          },
        ],
      },
      kakaotalk: {
        title: "เครื่องมือ KakaoTalk QR — ลิงก์ Open Chat ฟรี",
        description: "สร้าง KakaoTalk QR ฟรีสำหรับ Open Chat หรือลิงก์โปรไฟล์ วาง URL Kakao หรือใส่ id แล้วดาวน์โหลด",
        h1: "เครื่องมือสร้าง KakaoTalk QR",
        introduction: "ให้ลูกค้าเปิด KakaoTalk ด้วยการสแกน เข้ารหัส open.kakao.com เป็นสแตติก — ใช้คู่กับ LINE สำหรับสื่อที่เน้นเกาหลี",
        howTo: [
          "เลือก Social → KakaoTalk",
          "วาง URL open.kakao.com หรือใส่ส่วน id ของ Open Chat",
          "ดาวน์โหลดแล้วทดสอบสแกนด้วยมือถือที่มี KakaoTalk",
        ],
        faqs: [
          {
            question: "เหมือน LINE QR ไหม?",
            answer: "ไม่ใช่ ใช้เครื่องมือ LINE สำหรับ LINE และหน้านี้สำหรับลิงก์ KakaoTalk",
          },
          {
            question: "ต้องมีบัญชีธุรกิจ Kakao ไหม?",
            answer: "มีลิงก์ KakaoTalk ที่ถูกต้องก็เข้ารหัสได้ Build Your QR ไม่สร้างแชทให้",
          },
        ],
      },
      payment: {
        title: "เครื่องมือ Payment QR — PayPal, Venmo, Etsy และอื่นๆ",
        description:
          "สร้าง Payment QR ฟรีสำหรับ PayPal, Venmo, Etsy, Revolut, Amazon หรือลิงก์คริปโต คิวอาร์สแตติกดาวน์โหลดในเบราว์เซอร์ ไม่ต้องสมัคร",
        h1: "เครื่องมือสร้าง Payment QR",
        introduction:
          "รับชำระหรือพาไปหน้าร้านด้วยคิวอาร์สแตติก เลือก PayPal, Venmo, Etsy, Revolut, Amazon หรือ Crypto แล้วใส่ชื่อผู้ใช้หรือวาง URL ชำระเงิน เราไม่ประมวลผลเงิน — แค่เข้ารหัสลิงก์ที่คุณให้",
        howTo: [
          "เลือก Payment ในเครื่องมือแล้วเลือกผู้ให้บริการ",
          "ใส่ชื่อผู้ใช้ (PayPal.me, Venmo, ร้าน Etsy, Revolut) หรือวาง URL ชำระ/ร้านแบบเต็ม Amazon และคริปโตต้องใช้ URL เต็มหรือ URI เช่น bitcoin:",
          "ดาวน์โหลด QR ทดสอบสแกนด้วยแอปที่ตรงกัน แล้วค่อยพิมพ์เมื่อหน้าชำระเปิดถูกต้อง",
        ],
        faqs: [
          {
            question: "Build Your QR รับเงินให้ไหม?",
            answer: "ไม่ เข้ารหัสเฉพาะลิงก์หรือ URI ที่คุณใส่ การชำระเกิดบน PayPal, Venmo, ร้าน หรือวอลเล็ต",
          },
          {
            question: "เปลี่ยนลิงก์หลังพิมพ์ได้ไหม?",
            answer: "สแตติกไม่ได้ สร้างโค้ดใหม่ หรือใช้ Dynamic กับปลายทาง https ที่แก้ทีหลังได้",
          },
          {
            question: "รองรับ UPI หรือ PIX ไหม?",
            answer: "วาง URL/URI เต็มผ่าน Payment หรือชนิด URL ได้ ตัวช่วย UPI/PIX เฉพาะอาจมาทีหลัง",
          },
        ],
      },
    },
    templatesIndex: {
      title: "เทมเพลตคิวอาร์โค้ด",
      description:
        "เรียกดูเทมเพลตคิวอาร์โค้ดที่คัดสรรสำหรับร้านอาหาร คาเฟ่ โรงแรม เมนู การแชร์ WiFi และอื่นๆ ดูตัวอย่างดีไซน์ กรอกเนื้อหา แล้วดาวน์โหลด QR รวม",
      h1: "เทมเพลตคิวอาร์โค้ดสำหรับการใช้งานจริง",
      introduction:
        "เริ่มจากสไตล์ภาพพร้อมใช้แทนการเลือกสีเปล่าๆ แต่ละเทมเพลตใส่สี กรอบ โลโก้ และพื้นหลังที่ยังปรับแต่งก่อนดาวน์โหลดได้",
      body: [
        "เทมเพลตคัดสรรสำหรับช่วงเวลาพิมพ์และเคาน์เตอร์ทั่วไป เช่น เมนู WiFi สำหรับแขก ป้ายหน้าร้าน และคำเชิญรีวิว",
        "การเลือกเทมเพลตเปลี่ยนเฉพาะดีไซน์ภาพ URL รายละเอียด WiFi หรือข้อความของคุณยังควบคุมได้เอง",
        "แอสเซ็ตทั้งหมดในรุ่นนี้เป็นตัวยึดตำแหน่งเดโมในเครื่อง เพื่อให้เปลี่ยนงานแบรนด์ทีหลังได้โดยไม่เปลี่ยนโมเดลข้อมูล",
      ],
      howTo: [
        "เปิดหมวดที่ตรงกับกรณีใช้งาน หรือเรียกดูเทมเพลตทั้งหมดในหน้านี้",
        "เลือกเทมเพลตเพื่อนำดีไซน์ไปใช้ในเครื่องมือสร้าง",
        "กรอกเนื้อหา QR ปรับสีหรือโลโก้หากต้องการ แล้วดาวน์โหลด PNG รวม",
      ],
      faqs: [
        {
          question: "เทมเพลตเหล่านี้ใช้ฟรีหรือไม่?",
          answer:
            "ใช่ เครื่องมือสร้างคิวอาร์โค้ดแบบสแตติกในเบราว์เซอร์ ภาพเดโมเป็นตัวยึดตำแหน่งที่คุณแทนที่ด้วยแอสเซ็ตของตนเองได้",
        },
        {
          question: "การเลือกเทมเพลตจะเปลี่ยนปลายทาง QR หรือไม่?",
          answer:
            "ไม่เปลี่ยน เทมเพลตใช้เฉพาะการตั้งค่าภาพ เช่น สี กรอบ โลโก้ และพื้นหลัง",
        },
      ],
    },
    templates: {
      restaurant: {
        title: "เทมเพลตคิวอาร์โค้ดร้านอาหาร",
        description:
          "เทมเพลต QR ร้านอาหารโทนอุ่นสำหรับเมนู ป้ายตั้งโต๊ะ และลิงก์จอง ปรับสีและดาวน์โหลดโค้ดสแตติกพร้อมพิมพ์",
        h1: "เทมเพลต QR ร้านอาหาร",
        introduction:
          "ให้ผู้ทานอาหารมีทางสแกนไปยังเมนู หน้าจอง หรือบอร์ดเมนูพิเศษ เทมเพลตเหล่านี้ใช้โทนร้านอาหารอบอุ่นและป้ายกรอบชัดเจนเหมาะกับงานพิมพ์บนโต๊ะ",
        body: [
          "เทมเพลตร้านอาหารใช้สีโทนอุ่นคอนทราสต์สูงที่อ่านง่ายบนกระดาษครีม",
          "จับคู่ URL เมนูกับเทมเพลตโต๊ะอุ่นๆ แล้วแทนที่โลโก้เดโมด้วยเครื่องหมายแบรนด์ก่อนพิมพ์",
          "รักษา URL ปลายทางให้คงที่ — คิวอาร์โค้ดแบบสแตติกเปลี่ยนเส้นทางทีหลังไม่ได้โดยไม่พิมพ์ใหม่",
        ],
        howTo: [
          "เลือกเทมเพลตร้านอาหารโต๊ะอุ่นๆ",
          "เปลี่ยนประเภท QR เป็น URL แล้ววางลิงก์เมนูหรือการจอง",
          "ดาวน์โหลด PNG รวมและทดสอบสแกนก่อนส่งพิมพ์",
        ],
        faqs: [
          {
            question: "คิวอาร์ร้านอาหารควรลิงก์ไปที่ใด?",
            answer: "เมนูดิจิทัล แบบฟอร์มจอง หรือหน้าเมนูพิเศษวันนี้เหมาะที่สุด",
          },
          {
            question: "เก็บข้อความบนกรอบเป็นภาษาของฉันได้หรือไม่?",
            answer: "ได้ แก้ไขข้อความบนกรอบในตัวออกแบบหลังใช้เทมเพลต",
          },
        ],
      },
      cafe: {
        title: "เทมเพลตคิวอาร์โค้ดคาเฟ่",
        description:
          "เทมเพลต QR คาเฟ่โทนสดชื่นสำหรับลิงก์สะสมแต้ม เมนู และ WiFi บนเคาน์เตอร์ ดูตัวอย่างทันทีและดาวน์โหลดคิวอาร์สแตติกรวม",
        h1: "เทมเพลต QR คาเฟ่",
        introduction:
          "เคาน์เตอร์คาเฟ่ต้องการโค้ดที่ดูเป็นมิตรและสแกนเร็ว เทมเพลตโทนมิ้นต์เหล่านี้เหมาะสำหรับสมัครสะสมแต้ม เมนูเครื่องดื่ม และบัตร WiFi สำหรับแขก",
        body: [
          "กาแฟยามเช้าใช้โทนเขียวอมฟ้าและจุดมุมโค้งที่ดูสบายๆ โดยไม่ลดความน่าเชื่อถือในการสแกน",
          "ใช้หน้าแลนดิง HTTPS สั้นๆ แทน URL โซเชียลยาวเมื่อเป็นไปได้",
          "หากเพิ่มโลโก้ ให้ตั้งการแก้ไขข้อผิดพลาดเป็นสูง เพื่อไม่ให้ถ้วยและแสงนุ่มทำให้สแกนไม่ได้",
        ],
        howTo: [
          "เลือกเทมเพลตคาเฟ่กาแฟยามเช้า",
          "กรอก URL สะสมแต้มหรือเมนู",
          "ปรับขนาดโลโก้หากต้องการ แล้วดาวน์โหลดและวางโค้ดใกล้เครื่องคิดเงิน",
        ],
        faqs: [
          {
            question: "ใช้เทมเพลตเดียวกันสำหรับ WiFi ได้หรือไม่?",
            answer: "ได้ ใช้เทมเพลต แล้วเปลี่ยนประเภท QR เป็น WiFi และกรอกรายละเอียดเครือข่าย",
          },
          {
            question: "เทมเพลตคาเฟ่มีรูปกาแฟจริงหรือไม่?",
            answer: "ไม่มี เฟสนี้ส่งงานศิลป์ตัวยึดตำแหน่งในเครื่องที่แทนที่ได้ภายหลัง",
          },
        ],
      },
      hotel: {
        title: "คิวอาร์โค้ดโรงแรม",
        description:
          "สร้างคิวอาร์โค้ดโรงแรมสำหรับ WiFi แขก ลิงก์คอนเซียร์จ และป้ายล็อบบี้ ปรับสไตล์โรงแรมแล้วดาวน์โหลดโค้ดสแตติกพร้อมพิมพ์",
        h1: "คิวอาร์โค้ดโรงแรม",
        introduction:
          "โรงแรมมักต้องการคิวอาร์โค้ดโรงแรมที่ดูหรูสำหรับบัตรห้องและโต๊ะล็อบบี้ ล็อบบี้บลูคงโทนกรมท่าสงบขณะสแกนง่ายภายใต้แสงในอาคาร",
        body: [
          "ใช้เทมเพลตโรงแรมสำหรับ WiFi แขก หน้าไดเรกทอรีในโรงแรม หรือประสบการณ์อัปเซล เช่น จองสปา",
          "บัตรห้องได้ประโยชน์จากกรอบป้ายข้อความ เพื่อให้แขกทราบว่าโค้ดทำอะไรก่อนสแกน",
          "ตรวจสอบปลายทางบนโทรศัพท์เสมอ ก่อนพิมพ์แพ็กเกจกุญแจจำนวนมาก",
        ],
        howTo: [
          "ใช้เทมเพลตโรงแรมล็อบบี้บลู",
          "เลือก WiFi หรือ URL ตามเส้นทางของแขก",
          "ดาวน์โหลด PNG รวมและใส่ในสื่อของห้องพัก",
        ],
        faqs: [
          {
            question: "โรงแรมควรเข้ารหัสรหัสผ่าน WiFi ในคิวอาร์โค้ดหรือไม่?",
            answer:
              "เฉพาะเครือข่ายแขกที่ตั้งใจแชร์ ผู้ที่มีโค้ดพิมพ์สามารถอ่านรหัสผ่านจากเพย์โหลด QR ได้",
          },
          {
            question: "เปลี่ยนโลโก้โรงแรมได้หรือไม่?",
            answer: "ได้ แทนที่โลโก้สำเร็จรูปด้วยเครื่องหมายแบรนด์ในตัวออกแบบ",
          },
        ],
      },
      menu: {
        title: "เทมเพลตออกแบบคิวอาร์โค้ดเมนู",
        description:
          "ออกแบบคิวอาร์โค้ดเมนูสำหรับร้านอาหารและคาเฟ่ ขนาดพิมพ์ ระยะสแกน ตัวอย่างกรอบไทย พรีวิวบอร์ดเมนูพิเศษ และดาวน์โหลด PNG พร้อมพิมพ์",
        h1: "เทมเพลตออกแบบคิวอาร์โค้ดเมนู",
        introduction:
          "การออกแบบคิวอาร์โค้ดเมนูควรอ่านได้จากขอบโต๊ะและสื่อเจตนาชัด บอร์ดเมนูพิเศษใช้ขอบชัดและโทนเขียวใบไม้ เหมาะกับเมนูพิมพ์ ป้ายโต๊ะ และการ์ดเคลือบ",
        body: [
          "ลิงก์ไปหน้าเมนูที่เหมาะกับมือถือและโหลดเร็วบน 4G — Google Sheet, PDF บน Drive หรือเว็บร้านใช้ได้",
          "สำหรับป้ายโต๊ะหรือการ์ดเคลือบ ให้ QR อย่างน้อย 30 มม. (3 ซม.) พร้อมพื้นที่ว่างรอบโค้ดอย่างน้อย 5 มม.",
          "แขกควรสแกนได้จากระยะประมาณ 25–40 ซม. ขณะนั่ง — ทดสอบก่อนเคลือบหรือสั่งพิมพ์จำนวนมาก",
          "ตั้งข้อความกรอบสั้นๆ ที่เข้าใจทันที เช่น ดูเมนู, สแกนดูเมนู, เมนูออนไลน์ หรือภาษาอังกฤษ View menu",
          "อย่าใส่ข้อความเมนูทั้งหมดใน QR — ใช้ URL แทน เพื่ออัปเดตราคาได้โดยไม่ต้องพิมพ์ใหม่เมื่อลิงก์เดิม",
          "บอร์ดเมนูพิเศษเหมาะกับร้านอาหารและคาเฟ่ แทนที่โลโก้ตัวอย่างด้วยโลโก้ร้านก่อนส่งไฟล์ไปโรงพิมพ์",
        ],
        howTo: [
          "เลือกเทมเพลตบอร์ดเมนูพิเศษและดูภาพตัวอย่างด้านบน",
          "วางลิงก์ HTTPS ไปยังเมนูดิจิทัล (Sheet, PDF หรือเว็บ)",
          "ตั้งข้อความกรอบสั้นๆ ภาษาไทยหรืออังกฤษ บอกว่าหลังสแกนจะเห็นอะไร",
          "ดาวน์โหลด PNG พิมพ์อย่างน้อย 30 มม. และทดสอบสแกนจากท่านั่งก่อนเคลือบ",
        ],
        faqs: [
          {
            question: "ขนาดพิมพ์บนโต๊ะร้านอาหารเท่าไหร่ดี?",
            answer:
              "QR อย่างน้อย 30 มม. (3 ซม.) พร้อมพื้นที่ว่างรอบโค้ด บนป้าย A6 (105 × 148 มม.) วางโค้ดส่วนบนเพื่อไม่ให้ถูกเครื่องปรุงบัง",
          },
          {
            question: "ควรสแกนได้จากระยะเท่าไหร่?",
            answer:
              "ทดสอบจาก 25–40 ซม. ระยะทั่วไปเมื่อนั่งโต๊ะ ถ้าสแกนยาก ให้ขยาย QR หรือเพิ่มระดับ error correction ก่อนพิมพ์ใหม่",
          },
          {
            question: "คิวอาร์เมนูเดียวรองรับหลายภาษาได้หรือไม่?",
            answer: "ได้ ชี้ไปหน้าแลนดิงที่ให้แขกเลือกไทย อังกฤษ หรือภาษาอื่น",
          },
          {
            question: "อัปเดตเมนูออนไลน์จะทำให้ QR พังหรือไม่?",
            answer: "ไม่พัง ตราบใดที่ URL ยังเหมือนเดิม แก้ราคาบนหน้าเมนูก่อน ดาวน์โหลด PNG ใหม่เมื่อ URL เปลี่ยนเท่านั้น",
          },
        ],
      },
      wifi: {
        title: "เทมเพลตคิวอาร์โค้ด WiFi สำหรับคาเฟ่",
        description:
          "เทมเพลต QR WiFi สำหรับเคาน์เตอร์คาเฟ่ รหัสผ่านประมวลผลในเบราว์เซอร์เท่านั้น ขนาดพิมพ์ และสไตล์เข้าถึงสำหรับแขก",
        h1: "เทมเพลต QR WiFi สำหรับคาเฟ่และเคาน์เตอร์",
        introduction:
          "ร้านกาแฟใช้ QR WiFi เพื่อไม่ต้องบอกรหัสซ้ำทั้งวัน เทมเพลตเข้าถึงสำหรับแขกมีกรอบป้ายชัด — และชื่อเครือข่ายกับรหัสผ่านถูกประมวลผลในเบราว์เซอร์ของคุณเท่านั้น เราไม่เก็บบนเซิร์ฟเวอร์",
        body: [
          "กรอกชื่อเครือข่ายแขกและรหัสผ่านครั้งเดียว แล้วพิมพ์ป้ายเล็กๆ ข้างเครื่องชงหรือบนที่เสียบการ์ดเคาน์เตอร์",
          "SSID ประเภทความปลอดภัย และรหัสผ่านถูกสร้างในเบราว์เซอร์ของคุณ แอปนี้ไม่อัปโหลด ไม่เก็บ และไม่บันทึกรหัส WiFi",
          "กรอก SSID ให้ตรงกับที่โทรศัพท์แสดง รวมตัวพิมพ์ใหญ่-เล็กและช่องว่าง — Cafe_Guest ไม่เหมือน cafe_guest",
          "สำหรับป้ายเคาน์เตอร์ สติกเกอร์กว้าง 50 มม. หรือป้าย A6 (105 × 148 มม.) ใช้ได้ดี ให้ QR อย่างน้อย 25 มม. พร้อมพื้นที่ว่างรอบโค้ด",
          "ใช้ WPA/WPA2 สำหรับเราเตอร์สมัยใหม่ เลือกไม่มีรหัสผ่านเฉพาะเครือข่ายแขกที่ตั้งใจเปิด",
          "ทดสอบสแกนขณะยืนที่เคาน์เตอร์ก่อนเคลือบ ไอน้ำ แก้ว และแสงสะท้อนใกล้เครื่องชงอาจบังมุม QR บนกระดาษมัน",
        ],
        howTo: [
          "เลือกเทมเพลต WiFi เข้าถึงสำหรับแขกและดูภาพตัวอย่างด้านบน",
          "เปลี่ยนประเภท QR เป็น WiFi แล้วกรอกชื่อเครือข่ายแขก WPA และรหัสผ่าน",
          "ตั้งข้อความกรอบสั้นๆ เช่น เชื่อมต่อ WiFi หรือ Connect to WiFi",
          "ดาวน์โหลด PNG พิมพ์ขนาดเคาน์เตอร์ และทดสอบบน iPhone และ Android ใกล้เราเตอร์",
        ],
        faqs: [
          {
            question: "รหัสผ่าน WiFi ถูกเก็บบนเซิร์ฟเวอร์ของคุณหรือไม่?",
            answer:
              "ไม่เก็บ การสร้าง QR WiFi แบบสแตติกเกิดขึ้นในเบราว์เซอร์ของคุณเท่านั้น แอปนี้ไม่บันทึกหรือส่งข้อมูลไปเซิร์ฟเวอร์",
          },
          {
            question: "ทำไม QR WiFi คาเฟ่ถึงเชื่อมต่อไม่ได้?",
            answer:
              "สาเหตุหลักคือชื่อเครือข่ายหรือประเภทความปลอดภัยไม่ตรง คัดลอกชื่อจากโทรศัพท์ที่เชื่อมต่อได้แล้วดาวน์โหลดใหม่",
          },
          {
            question: "ป้าย WiFi เคาน์เตอร์ควรพิมพ์ขนาดเท่าไหร่?",
            answer:
              "สติกเกอร์กว้าง 50 มม. หรือการ์ด A6 เพียงพอสำหรับเคาน์เตอร์ส่วนใหญ่ ให้ QR อย่างน้อย 25 มม. และทดสอบก่อนเคลือบ",
          },
          {
            question: "ซ่อนรหัสผ่านขณะพิมพ์ได้หรือไม่?",
            answer:
              "ได้ ใช้ปุ่มแสดง/ซ่อนบนช่องรหัสผ่าน แล้วดาวน์โหลดเมื่อพร้อม",
          },
        ],
      },
      review: {
        title: "เทมเพลตคิวอาร์โค้ดรีวิว Google",
        description:
          "เทมเพลตให้คะแนนเรา สำหรับร้านค้าและร้านอาหาร ใส่กรอบให้ลิงก์รีวิว Google ดาวน์โหลดบนมือถือ และพิมพ์สติกเกอร์เคาน์เตอร์",
        h1: "เทมเพลตคิวอาร์โค้ดรีวิว Google",
        introduction:
          "เทมเพลตให้คะแนนเราเปลี่ยนลิงก์รีวิวจาก Google Business Profile เป็น QR มีกรอบ พร้อมพิมพ์สำหรับเคาน์เตอร์ ใบเสร็จ และการ์ดขอบคุณ — ออกแบบบนมือถือได้ทันที",
        body: [
          "คัดลอกลิงก์รีวิวสั้นจาก Google Business Profile แล้ววางที่นี่ QR จะเปิดหน้าให้คะแนนสาธารณะในครั้งเดียว",
          "ต่างจากภาพหน้าจอธรรมดา คุณใส่สีแบรนด์ กรอบสไตล์ดาว และข้อความสั้นๆ เช่น ให้คะแนนเรา หรือ Rate us ก่อนดาวน์โหลด",
          "สติกเกอร์เคาน์เตอร์ประมาณ 50 × 50 มม. หรือป้าย A6 ใช้ได้ดี ให้ QR อย่างน้อย 25 มม. พร้อมพื้นที่ว่างรอบโค้ด",
          "วางโค้ดจุดที่ลูกค้าจ่ายเงินเสร็จ — หลังใบเสร็จ สติกเกอร์ถุง หรือป้ายอะคริลิกข้างเครื่องรูดบัตร",
          "ทดสอบสแกนด้วยมือถือจริงในระยะแขนก่อนสั่งพิมพ์จำนวนมาก การเคลือบมันอาจสะท้อนแสงบังมุมโค้ด",
          "ถ้าย้ายสาขาหรือเปลี่ยนชื่อธุรกิจบน Google ให้สร้างโค้ดใหม่จากลิงก์รีวิวที่อัปเดต",
        ],
        howTo: [
          "เลือกเทมเพลตให้คะแนนเราและดูภาพตัวอย่างด้านบน",
          "วางลิงก์รีวิว Google หรือเลือกประเภท QR รีวิว Google ในตัวสร้าง",
          "ตั้งข้อความกรอบสั้นๆ ที่ลูกค้าเข้าใจก่อนสแกน",
          "ดาวน์โหลด PNG พิมพ์ตัวอย่าง และทดสอบสแกนก่อนสั่งสติกเกอร์หรือป้ายโต๊ะ",
        ],
        faqs: [
          {
            question: "หาลิงก์รีวิว Google ได้จากไหน?",
            answer:
              "เปิด Google Business Profile → ขอรีวิว → คัดลอกลิงก์แชร์ แล้ววางที่นี่",
          },
          {
            question: "สร้างบนมือถือได้หรือไม่?",
            answer:
              "ได้ ตัวสร้างทำงานในเบราว์เซอร์มือถือ ออกแบบ ดูตัวอย่าง และดาวน์โหลดได้ทันที",
          },
          {
            question: "ขนาดพิมพ์ที่เคาน์เตอร์เหมาะเท่าไหร่?",
            answer:
              "สติกเกอร์ 50 × 50 มม. หรือป้าย A6 ใช้บ่อย ให้ QR อย่างน้อย 25 มม. และทดสอบก่อนเคลือบ",
          },
          {
            question: "อัปเดตข้อมูล Google แล้ว QR จะพังหรือไม่?",
            answer:
              "โดยทั่วไปไม่พังถ้าลิงก์รีวิวเดิม ถ้า Google ออกลิงก์ใหม่หลังเปลี่ยนชื่อ ให้ดาวน์โหลด PNG ใหม่",
          },
        ],
      },
    },
  },
};
