import type { CompanyDocument } from "@/lib/company/types";

// Change: Simplified Chinese company copy for About and Contact (Phase D trust).
export const companyZh: Record<CompanyDocument["slug"], CompanyDocument> = {
  about: {
    slug: "about",
    title: "关于我们",
    description:
      "关于 genmyQRCode.com — 由泰国的 Narote Nilsukhum 运营。免费、注重隐私的二维码生成器，适用于真实打印与菜单场景。",
    introduction:
      "genmyQRCode.com 是在浏览器中运行的免费二维码生成器，由泰国的 Narote Nilsukhum 运营，让任何人都能为菜单、WiFi、名片或推广活动创建干净易扫的二维码——静态码无需安装软件。",
    websiteLabel: "网站",
    operator: {
      name: "Narote Nilsukhum",
      role: "创始人与运营者",
      location: "泰国",
      nameLabel: "运营者",
      roleLabel: "角色",
      locationLabel: "地点",
    },
    email: { label: "支持邮箱", address: "support@genmyqrcode.com" },
    sections: [
      {
        title: "谁在运营本站",
        paragraphs: [
          "genmyQRCode.com 由 Narote Nilsukhum（泰国）构建并运营。产品背后是真实的人，而不只是品牌名——负责生成器、托管与支持邮箱。",
          "如有问题、错误报告或功能建议，请使用联系页面或发送邮件至 support@genmyqrcode.com。我们通常会在几个工作日内回复。",
        ],
      },
      {
        title: "我们的工作",
        paragraphs: [
          "我们提供 URL、纯文本、WiFi、电子邮件、电话、短信、vCard、WhatsApp、LINE、Google 评价等静态二维码。可自定义颜色、样式、标志与边框，并下载可打印的 PNG。",
          "静态二维码内容在你的设备上生成，不会上传到我们的服务器。动态二维码（启用并登录后）会保存短链，以便印刷后更改目标。",
        ],
      },
      {
        title: "隐私优先的做法",
        paragraphs: [
          "静态生成无需注册。下载静态 PNG 时我们不要求姓名或电子邮件。你为静态码输入的内容保留在浏览器中。",
        ],
        bullets: [
          "下载静态二维码无需账户",
          "静态二维码内容在客户端处理，不保存在我们的服务器",
          "我们不出售你的个人信息",
        ],
      },
      {
        title: "为什么核心工具免费",
        paragraphs: [
          "生成器免费，是因为我们希望尽可能多人都能使用。托管与维护可能通过部分页面上的不干扰广告来支持。法律与信任信息可在每个页面页脚轻松找到。",
        ],
      },
      {
        title: "政策",
        paragraphs: [
          "请阅读隐私政策与服务条款，了解我们如何处理数据与可接受的使用方式。两者均在每个页面的页脚提供链接。",
        ],
      },
    ],
  },
  contact: {
    slug: "contact",
    title: "联系我们",
    description:
      "通过 support@genmyqrcode.com 联系 Narote Nilsukhum / genmyQRCode.com 支持团队——发送反馈、错误报告或关于二维码生成器的问题。",
    introduction:
      "有问题、发现错误，或想建议功能？请发送邮件至 support@genmyqrcode.com，或使用下方表单。消息会送达 genmyQRCode.com 运营者 Narote Nilsukhum。",
    websiteLabel: "网站",
    email: { label: "直接给我们发邮件", address: "support@genmyqrcode.com" },
    form: {
      title: "发送消息",
      intro:
        "填写消息（以及可选的回复邮箱）。将打开邮件应用并预填至 support@genmyqrcode.com — 发送前可再检查。",
      emailLabel: "你的邮箱（可选）",
      emailPlaceholder: "you@example.com",
      messageLabel: "消息",
      messagePlaceholder: "发生了什么，或你需要什么帮助？",
      send: "打开邮件以发送",
      messageRequired: "发送前请输入消息。",
      mailtoHint: "将打开邮件应用并发送至 support@genmyqrcode.com。",
      mailSubject: "联系 genmyQRCode.com",
      replyLine: "回复至",
    },
    sections: [
      {
        title: "如何联系我们",
        paragraphs: [
          "最快方式是发送邮件至 support@genmyqrcode.com，或使用本页表单在邮件应用中打开预填草稿。请提供足够细节，以便我们无需反复沟通即可帮助你。",
        ],
      },
      {
        title: "需要包含的内容",
        paragraphs: ["为帮助我们更快回复，请提供："],
        bullets: [
          "你正在使用的页面或二维码类型",
          "如为报告错误，请说明浏览器和设备",
          "简要描述发生了什么，以及你期望的结果",
        ],
      },
      {
        title: "回复时间",
        paragraphs: [
          "我们通常会在几个工作日内回复。关于账户、账单或广告的问题可能需要稍长时间。",
        ],
      },
      {
        title: "法律信息",
        paragraphs: [
          "有关数据与使用规则，请查看页脚中的隐私政策与服务条款。",
        ],
      },
    ],
  },
};
