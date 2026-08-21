import type { CompanyDocument } from "@/lib/company/types";

// Change: Simplified Chinese company copy for the About and Contact pages.
export const companyZh: Record<CompanyDocument["slug"], CompanyDocument> = {
  about: {
    slug: "about",
    title: "关于我们",
    description:
      "认识 genmyQRCode.com 背后的团队，一个为实际使用而打造、免费且注重隐私的二维码生成器。",
    introduction:
      "genmyQRCode.com 是一个完全在浏览器中运行的免费二维码生成器。我们打造它，是为了让任何人都能为菜单、WiFi 网络、名片或推广活动创建干净易扫的二维码，而无需安装软件或注册账户。",
    websiteLabel: "网站",
    sections: [
      {
        title: "我们的工作",
        paragraphs: [
          "我们提供 URL、纯文本、WiFi、电子邮件、电话号码和短信的静态二维码。你可以自定义颜色、码点与眼睛样式，添加标志或边框，并下载可直接打印的 PNG。",
          "所有内容都在你的设备上生成。你的二维码内容绝不会被上传或存储到我们的服务器。",
        ],
      },
      {
        title: "隐私优先的做法",
        paragraphs: [
          "我们不需要注册，也不要求你提供姓名、电子邮件或账户即可使用生成器。你输入的内容保留在你的浏览器中，仅在本地处理。",
        ],
        bullets: [
          "无需账户或登录",
          "二维码内容在客户端处理，绝不保存",
          "不售卖或分享你的个人信息",
        ],
      },
      {
        title: "为什么核心工具免费",
        paragraphs: [
          "生成器之所以免费，是因为它的运行成本几乎为零，我们希望它能惠及尽可能多的人。为覆盖托管和维护成本，网站可能会在支持页面上展示不干扰的广告，但二维码创建器本身保持无广告。",
        ],
      },
      {
        title: "联系我们",
        paragraphs: [
          "我们欢迎反馈、错误报告和功能建议。请使用联系页面与我们联系，我们会尽快回复。",
        ],
      },
    ],
  },
  contact: {
    slug: "contact",
    title: "联系我们",
    description: "就二维码生成器的问题，与 genmyQRCode.com 团队联系以获取支持、反馈或提问。",
    introduction: "有问题、发现错误，或想建议新功能？我们会阅读每一条消息，并尽快回复。",
    websiteLabel: "网站",
    email: { label: "给我们发邮件", address: "support@genmyqrcode.com" },
    sections: [
      {
        title: "如何联系我们",
        paragraphs: [
          "最快的联系方式是电子邮件。请将消息发送到上方地址，并提供足够详细信息，以便我们在无需反复沟通的情况下帮助你。",
        ],
      },
      {
        title: "需要包含的内容",
        paragraphs: ["为帮助我们更快回复，请提供："],
        bullets: [
          "你正在使用的页面或二维码类型",
          "如为报告错误，请说明你的浏览器和设备",
          "简要描述发生了什么，以及你期望的结果",
        ],
      },
      {
        title: "回复时间",
        paragraphs: [
          "我们通常会在几个工作日内回复。关于账户、账单或广告问题的支持可能需要稍长的时间。",
        ],
      },
    ],
  },
};
