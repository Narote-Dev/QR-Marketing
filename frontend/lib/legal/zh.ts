import type { LegalDocuments } from "@/lib/legal/types";

// Change: 根据用户提供的政策文件制作简体中文法律文本。
export const legalZh: LegalDocuments = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "隐私政策",
    description: "了解 genmyQRCode.com 如何处理二维码内容、技术数据、Cookie、广告和隐私权。",
    introduction:
      "genmyQRCode.com（以下简称“我们”或“本网站”）重视您的隐私。本政策说明您使用二维码生成器时，我们如何处理相关信息。",
    websiteLabel: "网站",
    updatedLabel: "最后更新",
    updatedDate: "2026年8月21日",
    sections: [
      {
        title: "1. 用于生成二维码的输入内容",
        paragraphs: [
          "您输入的 URL、文本、WiFi 凭据、电子邮件地址、电话号码和短信内容仅在您的浏览器中处理（客户端处理）。我们不会将这些内容保存到服务器，也不会为无关目的发送给第三方。",
          "如果未来增加服务器端功能，例如带扫描统计的动态二维码，我们会在推出相关功能前更新本政策。",
        ],
      },
      {
        title: "2. 自动收集的信息",
        paragraphs: ["访问本网站时，我们及 Google 等服务提供商可能会自动接收有限的技术信息。"],
        bullets: [
          "大致 IP 地址及国家或地区",
          "浏览器和设备类型",
          "访问的页面及停留时间",
          "引荐网站或流量来源",
        ],
      },
      {
        title: "3. Cookie 与广告",
        paragraphs: [
          "本网站可能使用 Google AdSense。Google 及其合作伙伴可能通过 Cookie、网络信标或类似技术展示相关广告、衡量广告效果并防止无效流量。",
          "Google 可能根据您对本网站及其他网站的访问使用广告 Cookie。您可以通过 Google 广告设置管理个性化广告，也可以在浏览器中禁用 Cookie，但部分网站功能可能无法正常运行。",
        ],
        links: [
          { label: "Google 广告设置", href: "https://adssettings.google.com/" },
          { label: "Google 广告技术政策", href: "https://policies.google.com/technologies/ads" },
        ],
      },
      {
        title: "4. 网站分析",
        paragraphs: [
          "我们可能使用 Google Analytics 等分析服务了解网站的整体使用情况。分析信息旨在以汇总或匿名方式使用，不用于直接识别您的身份。",
        ],
      },
      {
        title: "5. 与第三方共享",
        paragraphs: [
          "我们不会为第三方营销出售、出租或交换您的个人信息。信息仅可能与网站运营所需的服务商共享，例如托管、广告和分析服务商，并受其各自隐私政策约束。",
        ],
      },
      {
        title: "6. 您的隐私权",
        paragraphs: [
          "根据适用于您的法律，包括泰国 PDPA 或欧盟 GDPR，您可能享有以下隐私权。",
        ],
        bullets: [
          "请求访问与您有关的信息",
          "请求更正或删除信息",
          "反对为广告目的处理信息",
          "在适用情况下撤回 Cookie 同意",
        ],
      },
      {
        title: "7. 数据安全",
        paragraphs: [
          "我们采用合理的技术措施（包括 HTTPS）保护传输中的信息。但任何互联网服务都无法保证绝对安全。",
        ],
      },
      {
        title: "8. 儿童隐私",
        paragraphs: ["本网站不面向 13 岁以下儿童，我们不会故意收集 13 岁以下儿童的个人信息。"],
      },
      {
        title: "9. 政策变更",
        paragraphs: ["我们可能不时更新本政策。变更在本页面发布并更新“最后更新”日期后生效。"],
      },
      {
        title: "10. 联系我们",
        paragraphs: ["如对本隐私政策有疑问，请联系："],
        links: [{ label: "support@genmyqrcode.com", href: "mailto:support@genmyqrcode.com" }],
      },
    ],
  },
  "terms-of-service": {
    slug: "terms-of-service",
    title: "服务条款",
    description: "使用 genmyQRCode.com 免费二维码生成器时适用的规则和责任。",
    introduction:
      "使用 genmyQRCode.com（以下简称“我们”或“本网站”）前，请阅读本服务条款。访问本网站即表示您同意这些条款。",
    websiteLabel: "网站",
    updatedLabel: "最后更新",
    updatedDate: "2026年8月21日",
    sections: [
      {
        title: "1. 服务说明",
        paragraphs: [
          "本网站免费提供静态二维码生成服务，支持 URL、文本、WiFi、电子邮件、电话号码和短信，无需注册或登录。",
        ],
      },
      {
        title: "2. 可接受的使用方式",
        paragraphs: ["您同意不将本服务用于："],
        bullets: [
          "创建指向违法、有害、欺骗、网络钓鱼或侵犯他人权利内容的二维码",
          "传播恶意软件、病毒或有害代码",
          "通过不当自动化或机器人流量给网站造成不合理负担",
          "违反您所在司法管辖区适用的法律",
        ],
      },
      {
        title: "3. 用户责任",
        paragraphs: [
          "您对二维码中编码内容的准确性、适当性和合法性承担全部责任。",
          "发布或实际使用前，您必须测试扫描每个二维码。菜单、支付和促销等商业用途仍由您负责核实。",
        ],
      },
      {
        title: "4. 知识产权",
        paragraphs: [
          "网站徽标、预设、背景、模板和设计元素归本网站或许可方所有，仅可在二维码工具允许的范围内使用。",
          "您可以自由使用由自己内容生成的二维码。上传徽标或图片时，您确认拥有合法使用权。",
        ],
      },
      {
        title: "5. 不作保证",
        paragraphs: ["本服务按“现状”提供，不作任何明示或默示保证。我们不保证："],
        bullets: [
          "所有二维码都能在每台设备或应用中扫描",
          "网站始终连续运行且没有错误",
          "二维码中的外部 URL 始终安全、正确或可访问",
        ],
      },
      {
        title: "6. 责任限制",
        paragraphs: [
          "在法律允许的最大范围内，对于因使用或无法使用本网站而产生的直接、间接、偶然、特殊或后果性损失，包括二维码失效或被滥用，我们不承担责任。",
        ],
      },
      {
        title: "7. 第三方广告",
        paragraphs: [
          "本网站可能展示 Google AdSense 广告。与第三方广告互动完全出于自愿，我们不对广告内容、产品或服务负责。",
        ],
      },
      {
        title: "8. 服务变更",
        paragraphs: ["在适用法律允许的范围内，我们可以随时改进、变更、暂停或终止全部或部分服务。"],
      },
      {
        title: "9. 条款变更",
        paragraphs: ["我们可能不时更新本条款。更新后的条款发布后继续使用网站，即表示您接受修订内容。"],
      },
      {
        title: "10. 适用法律",
        paragraphs: ["本条款受泰国法律管辖，不考虑法律冲突原则。"],
      },
      {
        title: "11. 联系我们",
        paragraphs: ["如对本服务条款有疑问，请联系："],
        links: [{ label: "support@genmyqrcode.com", href: "mailto:support@genmyqrcode.com" }],
      },
    ],
  },
};
