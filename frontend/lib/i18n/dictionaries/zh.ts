import type { Dictionary } from "@/lib/i18n/types";

/** Change: Simplified Chinese dictionary — UI and SEO copy aligned with en.ts. */
export const zh: Dictionary = {
  site: {
    name: "Build Your QR",
    description: "免费静态二维码生成器，提供视觉模板、CSV 批量导出和实用二维码工具。",
  },
  chrome: {
    allQrTools: "全部二维码工具",
    allTemplates: "全部模板",
    howToCreate: "如何创建此二维码",
    featuredCollection: "本合集精选",
    aboutTemplates: "关于这些模板",
    howToUseTemplate: "如何使用此模板",
    relatedTemplates: "相关模板",
    browseCategory: "浏览此分类下的模板。",
    faqs: "常见问题",
    relatedTools: "相关二维码工具",
    home: "首页",
    breadcrumbsAria: "面包屑导航",
    qrCodeGeneratorCrumb: "二维码生成器",
    templatesCrumb: "模板",
    language: "语言",
    advertisement: "广告",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    about: "关于我们",
    contact: "联系我们",
    bulkQrGenerator: "批量生成二维码",
    footerNavAria: "页脚",
    footerRights: "保留所有权利。",
    popularUseCases: "热门专项用途",
    useCasesCrumb: "使用场景",
    howToUseCase: "如何创建此二维码",
    useCaseExamples: "适合这些场景",
    relatedUseCases: "相关专项二维码页面",
    whyThisWorks: "为什么此页匹配该搜索",
    trustNoSignup: "无需注册",
    trustBrowserOnly: "在您的浏览器中创建",
    trustLocalized: "支持本地语言内容",
  },
  relatedToolBlurbs: {
    url: "为网站链接创建二维码。",
    wifi: "为 WiFi 创建二维码。",
    email: "为电子邮件创建二维码。",
    phone: "为电话创建二维码。",
    sms: "为短信创建二维码。",
    vcard: "为电子名片创建二维码。",
    whatsapp: "创建可打开 WhatsApp 聊天的二维码。",
    line: "创建可打开 LINE 主页的二维码。",
    "google-review": "为 Google 评价链接创建二维码。",
    dynamic: "了解可在印刷后修改目标的动态二维码。",
    youtube: "为 YouTube 频道或视频创建二维码。",
    tiktok: "为 TikTok 主页创建二维码。",
    linkedin: "为 LinkedIn 主页创建二维码。",
    snapchat: "为 Snapchat 添加好友链接创建二维码。",
    reddit: "为 Reddit 用户或社区创建二维码。",
    discord: "为 Discord 邀请链接创建二维码。",
    spotify: "为 Spotify 主页或播放列表创建二维码。",
    soundcloud: "为 SoundCloud 主页创建二维码。",
    kakaotalk: "为 KakaoTalk Open Chat 创建二维码。",
    payment: "为 PayPal、Venmo、Etsy 等创建支付二维码。",
  },
  consent: {
    title: "我们重视您的隐私",
    message:
      "我们使用 Cookie 和类似技术来展示相关广告并衡量网站使用情况。您可以全部接受，或拒绝非必要的 Cookie。",
    acceptAll: "全部接受",
    rejectAll: "全部拒绝",
    privacyPolicy: "隐私政策",
  },
  generator: {
    eyebrow: "免费静态二维码生成器",
    heading: "几秒内创建二维码",
    intro: "可从常用场景开始，或自行选择类型并自定义外观后下载。不会保存任何内容。",
    startersTitle: "快速开始",
    startersHint: "一键套用类型、模板和边框文字。已填写的内容会保留。",
    startersAria: "快速开始预设",
    starterConfirm: "此快捷方案会切换二维码类型。当前填写的内容仍会保留，但表单会更换。",
    starterContinue: "使用此方案",
    starterCancel: "保持当前",
    starterLabels: {
      "restaurant-menu": "餐厅菜单",
      "hotel-wifi": "酒店 WiFi",
      "google-review": "Google 评价",
      line: "LINE",
      "business-card": "名片",
    },
    step1Title: "1. 添加内容",
    step2Title: "2. 自定义",
    step3Title: "3. 预览并下载",
    livePreview: "实时预览",
    downloadPng: "下载 PNG",
    downloadSvg: "下载 SVG",
    preparingDownload: "正在准备下载…",
    downloadFailed: "下载失败。",
    downloadHint:
      "PNG 在选择时包含边框、标签和背景。SVG 导出可缩放的二维码图形，便于印刷与编辑。",
    bulkPromo: "需要许多相同设计的网址二维码？",
    bulkPromoLink: "打开 CSV 批量生成器",
    modeStatic: "静态",
    modeDynamic: "动态",
    modeAria: "二维码模式",
    feedback: {
      button: "反馈",
      title: "发送反馈",
      intro: "告诉我们问题、想法或疑问。将打开邮件应用并预填给支持团队的草稿。",
      emailLabel: "您的邮箱（可选）",
      emailPlaceholder: "you@example.com",
      messageLabel: "留言",
      messagePlaceholder: "发生了什么，或您希望看到什么功能？",
      send: "打开邮件发送",
      cancel: "取消",
      close: "关闭反馈表单",
      messageRequired: "发送前请输入留言。",
      mailtoHint: "将打开邮件应用并发送至 support@genmyqrcode.com — 发送前可再检查。",
      mailSubject: "Build Your QR 反馈",
      replyLine: "回复至",
      pageLine: "页面",
      modeLine: "模式",
      typeLine: "二维码类型",
    },
  },
  bulkQr: {
    eyebrow: "批量二维码",
    heading: "一次创建多个网址二维码",
    intro:
      "上传 CSV，应用统一设计，下载 PNG 压缩包。全部在浏览器中完成，每批最多 50 个。",
    step1Title: "1. 上传 CSV",
    step2Title: "2. 自定义设计",
    step3Title: "3. 预览并下载 ZIP",
    csvHint:
      "CSV 需包含 url、filename 列，label 可选。每批最多 {max} 行。无效行不会包含在 ZIP 中。",
    csvUpload: "上传 CSV",
    csvSampleDownload: "下载示例 CSV",
    csvSampleFileName: "bulk-qr-sample.csv",
    csvEmpty: "CSV 中没有可用行。请至少添加一个 URL。",
    csvTooMany: "仅加载前 {max} 行。请将更大的列表拆成多批。",
    csvNoUrlColumn: "在 CSV 表头中找不到 url 列。",
    csvInvalidType: "请上传 .csv 文件。",
    csvLoaded: "已加载 {name}。",
    rowColumnUrl: "URL",
    rowColumnFile: "文件名",
    rowColumnLabel: "标签",
    rowColumnStatus: "状态",
    rowValid: "就绪",
    rowInvalid: "无效",
    rowsSummary: "{total} 行中有 {valid} 行可导出。",
    invalidRowsNote: "有 {count} 行存在错误，不会包含在 ZIP 中。",
    downloadZip: "下载 ZIP（{count} 个 PNG）",
    preparingZip: "正在准备 ZIP…",
    zipFailed: "ZIP 导出失败。请减少行数后重试。",
    zipHint:
      "PNG 包含所选边框、标签和背景。为节省内存，二维码会逐个渲染。",
    zipFileName: "bulk-qr-codes.zip",
    progressLabel: "正在渲染 {done} / {total}…",
    previewLimitNote: "显示前 {shown} 行，共 {total} 行。",
    guideLink: "阅读完整批量指南 ↓",
    livePreview: "实时设计预览",
    livePreviewSample: "当前为示例网址 — 上传 CSV 后可预览第一个就绪行。",
    livePreviewFromCsv: "正在预览第一个就绪行：{file}",
  },
  bulkQrGuide: {
    heading: "批量二维码指南 — 从 CSV 到 ZIP",
    overviewTitle: "这个工具做什么",
    overview: [
      "批量生成器将网站链接列表一次性转换为多个二维码。上传 CSV，应用统一视觉设计，然后下载包含 PNG 文件的 ZIP，可直接用于打印或数字分发。",
      "全部在浏览器中完成。我们不会在服务器上存储您的 URL、CSV 文件或导出的图片。无需注册账号。",
      "每批最多支持 50 个网址二维码，以便在普通笔记本和手机上快速稳定导出，包括约 4 GB 内存的设备。",
    ],
    csvTitle: "CSV 文件格式",
    csvIntro: "准备逗号分隔文件，每行一个二维码。建议使用表头行；若列按默认顺序排列，也可省略表头。",
    csvColumns: [
      {
        name: "url",
        description: "必填。要编码的完整网址，以 https:// 或 http:// 开头。",
      },
      {
        name: "filename",
        description: "可选但建议填写。用作 ZIP 内 PNG 文件名，无需 .png 后缀。",
      },
      {
        name: "label",
        description: "可选。当设计使用标签边框时，作为边框文字 — 适用于桌号、房间名或产品标题。",
      },
    ],
    csvExampleTitle: "CSV 示例",
    csvExample:
      "url,filename,label\nhttps://example.com/menu,table-01,Scan for menu\nhttps://example.com/promo,table-02,Today's special\nhttps://example.com/wifi,lobby-wifi,Free guest WiFi",
    csvNotes: [
      "可在 Excel、Google 表格等软件中创建，然后导出为 CSV（UTF-8）。",
      "若 URL 含逗号，请用双引号包裹单元格。",
      "没有有效 http 或 https URL 的行会标记为无效，不会包含在 ZIP 中。",
      "超过 50 行的列表会截取前 50 行 — 请将大任务拆成多批。",
    ],
    stepsTitle: "分步操作流程",
    steps: [
      {
        title: "准备并上传 CSV",
        body: "点击上传 CSV，或先下载示例文件。上传后，预览表会显示每行的 URL、文件名、标签及是否就绪。",
      },
      {
        title: "为整批选择一种设计",
        body: "选择模板或自定义颜色、点样式、徽标、边框和尺寸。同一设计应用于所有有效行。有 label 列时会覆盖默认边框文字。",
      },
      {
        title: "检查有效行",
        body: "查看右侧摘要。仅标记为“就绪”的行会包含在导出中。若需修正，请在表格中修改 URL 后重新上传。",
      },
      {
        title: "下载 ZIP",
        body: "点击下载 ZIP，系统会逐个渲染 PNG 并打包为 bulk-qr-codes.zip。PNG 包含所选边框、标签和背景。",
      },
      {
        title: "打印前测试",
        body: "从 ZIP 中打开几个 PNG，按计划打印尺寸用手机扫描，确认每个链接打开正确页面。",
      },
    ],
    useCasesTitle: "常见使用场景",
    useCases: [
      "餐厅桌牌 — 每桌一个菜单或促销链接，标签如“12 号桌”。",
      "酒店房间卡 — 每间房一个 WiFi 或欢迎页链接。",
      "零售货架标签 — 多个 SKU 的产品详情页，统一品牌风格。",
      "活动证件或海报 — 多个场次的注册或日程链接。",
      "营销传单 — 带 UTM 的活动 URL，文件名清晰易辨。",
    ],
    tipsTitle: "设计与打印建议",
    tips: [
      "添加徽标时使用 Q 或 H 级纠错，以保持可扫描性。",
      "确保二维码点与背景对比度足够。",
      "优先使用短而稳定的 URL — 字符越少越易扫描。",
      "文件名要清晰（table-01、room-305），方便印刷厂对应摆放。",
      "超过 50 个码时分批导出，每批保持相同设计设置。",
    ],
    troubleshootingTitle: "故障排除",
    troubleshooting: [
      {
        question: "某行显示无效 — 应检查什么？",
        answer:
          "确认 URL 以 http:// 或 https:// 开头、无多余空格且为完整网址。若特殊字符异常，请以 UTF-8 重新导出 CSV。",
      },
      {
        question: "为什么 ZIP 文件数少于 CSV 行数？",
        answer: "仅导出有效行。无效 URL、空行和超过 50 码限制的行会被排除。",
      },
      {
        question: "可以在 Windows 上用 Excel 吗？",
        answer:
          "可以。另存或导出为 CSV。若 Excel 使用分号分隔，请在文本编辑器中确认列为逗号分隔且存在 url 表头。",
      },
      {
        question: "label 列适用于所有边框样式吗？",
        answer: "使用标签边框时，label 会替换边框文字。其他边框样式忽略 label，但 QR 仍会正确导出。",
      },
      {
        question: "这些二维码会过期吗？",
        answer: "不会。只要目标网站仍可访问，静态网址二维码就会持续有效。更改链接需重新生成。",
      },
    ],
  },
  dynamicQr: {
    creatorTitle: "动态二维码",
    creatorIntro: "在 genmyqrcode.com 创建可稍后修改的短链。目标地址必须是 http 或 https。",
    destinationLabel: "目标 URL",
    destinationPlaceholder: "https://example.com/menu",
    labelField: "名称（可选）",
    labelPlaceholder: "5号桌菜单",
    createButton: "创建动态二维码",
    creating: "创建中…",
    createFailed: "无法创建动态二维码。",
    shortUrlLabel: "短链",
    tokenSavedHint: "管理令牌已保存在本浏览器。如需在其他设备编辑请自行备份——丢失后无法找回。",
    manageLink: "打开管理页",
    manageTitle: "管理动态二维码",
    manageIntro: "无需重印即可更改目标、暂停代码或查看扫描次数。",
    ownedCodes: "本浏览器中的代码",
    shortCodeLabel: "短码",
    manageTokenLabel: "管理令牌",
    manageTokenHint: "有本地存储时会自动加载；也可粘贴你备份的令牌。",
    loadButton: "加载",
    loadFailed: "无法加载此代码。",
    scansLabel: "扫描总数",
    statusLabel: "状态",
    statusActive: "启用",
    statusInactive: "已暂停",
    saveButton: "保存更改",
    saved: "已保存。",
    saveFailed: "无法保存。",
    activateButton: "启用",
    deactivateButton: "暂停",
    activated: "已启用。",
    deactivated: "已暂停。",
    manageFooterNote: "请妥善保管管理令牌。持有者可更改目标或暂停代码。",
  },
  form: {
    websiteAddress: "网站地址",
    websitePlaceholder: "https://example.com",
    text: "文本",
    textPlaceholder: "输入您的内容",
    wifiSsid: "网络名称（SSID）",
    wifiSsidPlaceholder: "我的 WiFi",
    wifiSecurity: "安全性",
    wifiWpa: "WPA/WPA2",
    wifiWep: "WEP",
    wifiNopass: "无密码",
    wifiPassword: "密码",
    wifiPasswordPlaceholder: "网络密码",
    showPassword: "显示密码",
    hidePassword: "隐藏密码",
    recipientEmail: "收件人邮箱",
    emailPlaceholder: "hello@example.com",
    emailSubject: "主题（可选）",
    emailSubjectPlaceholder: "你好",
    emailMessage: "正文（可选）",
    emailMessagePlaceholder: "您的消息",
    phoneNumber: "电话号码",
    phonePlaceholder: "+66 81 234 5678",
    smsPhone: "电话号码",
    smsPhonePlaceholder: "+66 81 234 5678",
    smsMessage: "短信内容（可选）",
    smsMessagePlaceholder: "您的短信内容",
    vcardFirstName: "名",
    vcardFirstNamePlaceholder: "Alex",
    vcardLastName: "姓",
    vcardLastNamePlaceholder: "Rivera",
    vcardOrganization: "组织（可选）",
    vcardOrganizationPlaceholder: "公司名称",
    vcardPhone: "电话（可选）",
    vcardPhonePlaceholder: "+66 81 234 5678",
    vcardEmail: "邮箱（可选）",
    vcardEmailPlaceholder: "hello@example.com",
    vcardWebsite: "网站（可选）",
    vcardWebsitePlaceholder: "https://example.com",
    whatsappPhone: "WhatsApp 号码",
    whatsappPhonePlaceholder: "+66 81 234 5678",
    whatsappMessage: "消息（可选）",
    whatsappMessagePlaceholder: "你好！我扫描了你的二维码。",
    lineId: "LINE ID 或主页链接",
    lineIdPlaceholder: "@yourshop 或 https://line.me/...",
    googleReviewUrl: "Google 评价或地图链接",
    googleReviewUrlPlaceholder: "https://g.page/r/...",
    locationLatitude: "纬度",
    locationLatitudePlaceholder: "13.7563",
    locationLongitude: "经度",
    locationLongitudePlaceholder: "100.5018",
    locationLabel: "地点名称（可选）",
    locationLabelPlaceholder: "曼谷办公室",
    eventTitle: "活动标题",
    eventTitlePlaceholder: "产品发布会",
    eventLocation: "地点（可选）",
    eventLocationPlaceholder: "主会场",
    eventStart: "开始",
    eventEnd: "结束（可选）",
    telegramId: "Telegram 用户名或链接",
    telegramIdPlaceholder: "@channel 或 https://t.me/...",
    socialNetwork: "社交网络",
    socialNetworks: {
      facebook: "Facebook",
      instagram: "Instagram",
      x: "X（Twitter）",
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
    socialHandleOrUrl: "用户名或主页链接",
    socialHandleOrUrlPlaceholder: "@brand 或 https://...",
    paymentProvider: "支付或店铺",
    paymentProviders: {
      paypal: "PayPal",
      venmo: "Venmo",
      etsy: "Etsy",
      revolut: "Revolut",
      amazon: "Amazon",
      crypto: "加密货币",
    },
    paymentHandleOrUrl: "用户名或支付链接",
    paymentHandleOrUrlPlaceholder: "paypal.me 用户名或 https://...",
  },
  designer: {
    heading: "二维码设计器",
    intro: "自定义预览外观，不会改变二维码内容。",
    foregroundColor: "前景色",
    backgroundColor: "背景色",
    hexValue: "十六进制值",
    dotStyle: "点样式",
    outerEyeStyle: "外定位点样式",
    innerEyeStyle: "内定位点样式",
    errorCorrection: "纠错级别",
    qrSize: "二维码尺寸",
    logoSize: "标志尺寸",
    logo: "标志",
    remove: "移除",
    logoHint: "请使用小尺寸方形图片。添加标志时建议使用较高纠错级别。",
    presetLogos: "预设标志",
    presetBackgrounds: "预设背景",
    clear: "清除",
    gradient: "渐变",
    enable: "启用",
    endColor: "结束颜色",
    gradientType: "渐变类型",
    frame: "边框",
    frameStyleAria: "二维码边框样式",
    frameText: "边框文字",
    frameTextPlaceholder: "扫码查看",
    styleDots: "点状",
    styleRounded: "圆角",
    styleSquare: "方形",
    styleExtraRounded: "超圆角",
    styleClassy: "典雅",
    styleClassyRounded: "典雅圆角",
    styleDot: "圆点",
    errorLow: "低（L）",
    errorMedium: "中（M）",
    errorQuartile: "四分位（Q）",
    errorHigh: "高（H）",
    gradientLinear: "线性",
    gradientRadial: "径向",
    frameNone: "无",
    frameBorder: "边框",
    frameLabel: "标签",
  },
  preview: {
    empty: "请填写必填项以预览二维码。",
    aria: "已生成的二维码预览",
    scanMe: "扫码查看",
  },
  typeSelector: {
    aria: "二维码类型",
    scrollPrev: "查看上一段类型",
    scrollNext: "查看更多类型",
  },
  types: {
    url: "网址",
    text: "文本",
    wifi: "WiFi",
    email: "邮件",
    phone: "电话",
    sms: "短信",
    vcard: "名片",
    whatsapp: "WhatsApp",
    line: "LINE",
    "google-review": "评价",
    location: "位置",
    event: "活动",
    telegram: "Telegram",
    social: "社交",
    payment: "支付",
  },
  errors: {
    urlInvalidProtocol: "请输入有效的 http 或 https 网址。",
    urlInvalid: "请输入有效的网址。",
    textRequired: "请输入要编码的文本。",
    wifiSsidRequired: "请输入 WiFi 网络名称。",
    wifiPasswordRequired: "请输入 WiFi 密码。",
    emailInvalid: "请输入有效的电子邮箱地址。",
    phoneInvalid: "请输入有效的电话号码。",
    vcardNameRequired: "请输入名或姓。",
    lineIdRequired: "请输入 LINE ID 或主页链接。",
    lineIdInvalid: "请输入有效的 LINE ID 或 https://line.me 链接。",
    locationCoordsInvalid: "请输入有效的纬度和经度。",
    eventTitleRequired: "请输入活动标题。",
    eventStartInvalid: "请输入有效的开始日期和时间。",
    eventEndInvalid: "请输入有效的结束日期和时间。",
    telegramIdRequired: "请输入 Telegram 用户名或链接。",
    telegramIdInvalid: "请输入有效的 Telegram 用户名或 https://t.me 链接。",
    socialHandleRequired: "请输入主页链接或用户名。",
    socialHandleInvalid: "请输入有效的用户名或 https 主页链接。",
    paymentHandleRequired: "请输入支付链接或用户名。",
    paymentHandleInvalid: "请输入有效的用户名或 https 支付链接。",
    paymentUrlRequired: "请粘贴完整的 http(s) 店铺或支付链接。",
  },
  export: {
    noContent: "下载前请先输入二维码内容。",
    renderFailed: "无法渲染二维码数据。",
    decodeFailed: "无法解码二维码图像数据。",
    canvasUnavailable: "当前浏览器无法使用 Canvas。",
    pngFailed: "无法创建 PNG 下载文件。",
    downloadFailed: "下载失败。",
  },
  templatesUi: {
    title: "模板",
    openHint: "选择预设后，右侧实时预览会立即更新。",
    closedSelected: "正在使用 {name}。打开可更换模板。",
    closedNone: "已收起。打开以选择视觉预设。",
    clear: "清除模板",
    categoriesAria: "模板分类",
    emptyGrid: "此分类暂无模板。",
    emptyPreview: "选择模板后可先预览外观，再输入二维码内容。",
    previewAlt: "{name} 预览",
  },
  categories: {
    restaurant: "餐厅",
    cafe: "咖啡馆",
    hotel: "酒店",
    retail: "零售",
    business: "商务",
    event: "活动",
    wifi: "WiFi",
    menu: "菜单",
    "google-review": "Google 评价",
  },
  templateCopy: {
    "restaurant-warm": {
      name: "暖色餐桌",
      description: "暖橙色用餐风格，适合桌牌与纸质菜单。",
      defaultFrameText: "扫码看菜单",
    },
    "cafe-mint": {
      name: "晨间咖啡",
      description: "清新薄荷绿咖啡馆风格，适合会员卡与吧台立牌。",
      defaultFrameText: "WiFi 与菜单",
    },
    "hotel-slate": {
      name: "大堂蓝",
      description: "沉稳酒店配色，适合房卡与大堂立牌。",
      defaultFrameText: "宾客 WiFi",
    },
    "retail-bold": {
      name: "橱窗店招",
      description: "高对比零售风格，适合橱窗贴纸与货架标签。",
      defaultFrameText: "立即选购",
    },
    "business-navy": {
      name: "办公名片",
      description: "专业藏青色名片风格，适合商务社交物料。",
      defaultFrameText: "立即连接",
    },
    "event-night": {
      name: "舞台之夜",
      description: "鲜活活动配色，适合海报、胸牌与门票。",
      defaultFrameText: "加入活动",
    },
    "wifi-signal": {
      name: "访客接入",
      description: "清晰的 WiFi 分享风格，适合咖啡馆、酒店与前台。",
      defaultFrameText: "连接 WiFi",
    },
    "menu-board": {
      name: "特惠菜牌",
      description: "易读的菜单板风格，适合跳转数字菜单链接。",
      defaultFrameText: "查看菜单",
    },
    "review-star": {
      name: "留下评价",
      description: "友好的评价引导风格，适合小票夹页与柜台。",
      defaultFrameText: "给我们评分",
    },
  },
  assetCopy: {
    "logo-restaurant": {
      name: "餐厅标志",
      description: "简约刀叉餐盘标志，用于餐饮模板。",
    },
    "logo-cafe": {
      name: "咖啡馆标志",
      description: "咖啡杯标志，用于咖啡馆模板。",
    },
    "logo-hotel": {
      name: "酒店标志",
      description: "建筑标志，用于酒店模板。",
    },
    "logo-retail": {
      name: "零售标志",
      description: "购物袋标志，用于店铺模板。",
    },
    "logo-business": {
      name: "商务标志",
      description: "公文包标志，用于专业模板。",
    },
    "logo-event": {
      name: "活动标志",
      description: "门票标志，用于活动模板。",
    },
    "logo-wifi": {
      name: "WiFi 标志",
      description: "信号标志，用于 WiFi 模板。",
    },
    "logo-menu": {
      name: "菜单标志",
      description: "列表标志，用于数字菜单模板。",
    },
    "logo-review": {
      name: "评价标志",
      description: "星标标志，用于评价模板。",
    },
    "icon-scan": {
      name: "扫码图标",
      description: "通用扫码示意图标。",
    },
    "icon-link": {
      name: "链接图标",
      description: "通用链接示意图标。",
    },
    "bg-warm": {
      name: "暖色纸张",
      description: "柔和暖色纸张背景。",
    },
    "bg-cool": {
      name: "冷灰石板",
      description: "冷色石板渐变背景。",
    },
    "bg-mint": {
      name: "薄荷绿晕",
      description: "浅薄荷绿晕染背景。",
    },
    "thumb-restaurant": {
      name: "餐厅缩略图",
      description: "餐厅模板缩略图。",
    },
    "thumb-cafe": {
      name: "咖啡馆缩略图",
      description: "咖啡馆模板缩略图。",
    },
    "thumb-hotel": {
      name: "酒店缩略图",
      description: "酒店模板缩略图。",
    },
    "thumb-retail": {
      name: "零售缩略图",
      description: "零售模板缩略图。",
    },
    "thumb-business": {
      name: "商务缩略图",
      description: "商务模板缩略图。",
    },
    "thumb-event": {
      name: "活动缩略图",
      description: "活动模板缩略图。",
    },
    "thumb-wifi": {
      name: "WiFi 缩略图",
      description: "WiFi 模板缩略图。",
    },
    "thumb-menu": {
      name: "菜单缩略图",
      description: "菜单模板缩略图。",
    },
    "thumb-review": {
      name: "评价缩略图",
      description: "评价模板缩略图。",
    },
  },
  seo: {
    generator: {
      title: "免费二维码生成器（无需注册）",
      description:
        "免费二维码生成器，无需注册。在浏览器中创建静态码，支持网址、WiFi、名片、WhatsApp、LINE、菜单等，自定义后即时下载。",
      h1: "免费二维码生成器，无需注册",
      introduction:
        "在浏览器中免费创建实用的静态二维码，无需账号。选择内容类型、填写详情、自定义视觉设计，并在分享前测试实时预览。",
      howTo: [
        "选择与扫码后操作匹配的二维码类型。",
        "填写必填信息并查看实时预览。",
        "自定义颜色、定位点、标志、边框、尺寸和纠错级别，然后试扫验证。",
      ],
      faqs: [
        {
          question: "创建静态二维码需要账号吗？",
          answer: "不需要。无需登录即可创建静态二维码，输入内容也不会被保存。",
        },
        {
          question: "可以编码哪些内容？",
          answer:
            "可为网址、纯文本、WiFi、电子邮件、电话、短信、vCard 名片、WhatsApp、LINE、Google 评价链接、位置、活动、Telegram 和社交主页创建二维码。如需一次创建多个网址码，请使用 CSV 批量生成器。",
        },
      ],
    },
    bulk: {
      title: "批量二维码生成器 — CSV 上传，最多 50 个",
      description:
        "从 CSV 一次创建多个网址二维码。应用统一设计、预览行，并在浏览器中下载 PNG 压缩包，无需注册。",
      h1: "从 CSV 批量生成二维码",
      introduction:
        "上传链接表格，一次自定义外观，最多导出五十个可打印的 PNG 二维码，打包为单个 ZIP 下载。",
      howTo: [
        "准备包含 url、filename 和可选 label 列的 CSV 并上传。",
        "为整批选择模板或自定义颜色、徽标、边框和尺寸。",
        "检查有效行，准备好后下载 ZIP。",
      ],
      faqs: [
        {
          question: "应使用什么 CSV 格式？",
          answer:
            "表头使用 url、filename 和可选 label。每行对应一个二维码。若设计使用标签边框，label 会成为边框文字。",
        },
        {
          question: "每批最多可以创建多少个？",
          answer:
            "每批最多支持 50 个网址二维码，以便在普通设备（包括约 4 GB 内存的笔记本和手机）上快速稳定导出。",
        },
        {
          question: "会存储我的 CSV 或二维码吗？",
          answer: "不会。解析、渲染和 ZIP 创建完全在浏览器中进行，批量导出不会上传到我们的服务器。",
        },
        {
          question: "能否对所有码使用相同设计？",
          answer: "可以。选择一种模板或自定义颜色、徽标和边框一次 — 设计应用于整批。用 label 列可为每行设置不同边框文字。",
        },
        {
          question: "导出是什么文件格式？",
          answer: "PNG 图片的 ZIP 压缩包。每个 PNG 会合成二维码及所选边框、标签和背景。",
        },
      ],
    },
    qr: {
      url: {
        title: "网址二维码生成器",
        description:
          "免费创建网址二维码，适用于网站、落地页、菜单或活动链接。即时自定义并预览。",
        h1: "为任意网址创建二维码",
        introduction:
          "将网址变成可扫描的二维码，让人们无需输入长链接即可打开页面。适用于海报、产品包装、名片、活动标识和纸质菜单。",
        howTo: [
          "粘贴完整网站地址，包含 https://。",
          "检查实时二维码预览，并按需调整外观。",
          "打印前用手机试扫确认。",
        ],
        faqs: [
          {
            question: "这个二维码会过期吗？",
            answer: "不会。只要目标网站仍可访问，静态网址二维码就会持续有效。",
          },
          {
            question: "之后还能更改跳转目标吗？",
            answer: "静态二维码打印后无法更改。若需要可编辑目标，请在生成器切换到 Dynamic 模式，或打开动态二维码指南。",
          },
        ],
      },
      wifi: {
        title: "WiFi 二维码生成器",
        description:
          "免费创建 WiFi 二维码，让访客无需输入密码即可加入网络。支持 WPA、WEP 和开放网络。",
        h1: "用二维码分享 WiFi 接入",
        introduction:
          "让访客通过扫描二维码连接无线网络，无需阅读或输入密码。尤其适合咖啡馆、家庭、酒店和前台。",
        howTo: [
          "按设备上显示的名称准确输入 WiFi 网络名称。",
          "选择匹配的安全类型，并在需要时输入密码。",
          "在靠近网络的位置用手机扫描，确认会出现连接提示。",
        ],
        faqs: [
          {
            question: "二维码会暴露我的 WiFi 密码吗？",
            answer: "密码编码在二维码数据中，因此仅与允许接入该网络的人分享。",
          },
          {
            question: "应选择哪种安全类型？",
            answer:
              "大多数现代网络使用 WPA 或 WPA2。仅对旧网络选择 WEP，开放网络则选择无密码。",
          },
        ],
      },
      email: {
        title: "电子邮件二维码生成器",
        description:
          "免费创建含收件人、可选主题和正文的电子邮件二维码，让印刷物料上的联系更快捷。",
        h1: "用二维码开始写邮件",
        introduction:
          "电子邮件二维码会打开扫码者的邮件应用并预填收件人。可添加建议主题或正文，便于咨询、售后和活动报名。",
        howTo: [
          "输入应接收邮件的地址。",
          "可选添加主题和简短起始正文。",
          "扫描预览，确认邮件应用按预期打开并填入信息。",
        ],
        faqs: [
          {
            question: "扫描后会自动发送邮件吗？",
            answer: "不会。只会打开已准备好的邮件草稿；访客审阅后再决定是否发送。",
          },
          {
            question: "可以附带正文吗？",
            answer: "可以。主题和正文均为可选，有助于引导对方联系你。",
          },
        ],
      },
      phone: {
        title: "电话号码二维码生成器",
        description:
          "免费创建电话二维码，扫描后打开拨号界面。适合门店、服务车辆和印刷宣传。",
        h1: "通过二维码拨打电话",
        introduction:
          "电话二维码会启动拨号器并填入你的号码，缩短从看到印刷信息到联系业务或服务团队的路径。",
        howTo: [
          "输入电话号码，建议包含国家/地区代码。",
          "更改号码或样式后查看实时预览。",
          "用手机扫描，确认拨号器显示正确号码。",
        ],
        faqs: [
          {
            question: "扫描后会立即拨出电话吗？",
            answer: "不会。手机会打开拨号界面，由访客确认后再拨打。",
          },
          {
            question: "需要使用国家/地区代码吗？",
            answer: "需要。加入国家/地区代码有助于国际访客可靠使用。",
          },
        ],
      },
      sms: {
        title: "短信二维码生成器",
        description:
          "免费创建含收件人和可选预填内容的短信二维码，帮助客户一扫即可开始短信沟通。",
        h1: "用二维码开始短信对话",
        introduction:
          "短信二维码会打开发给指定号码的短信草稿。可用于预约、简单下单、售后咨询，或轻松回复促销活动。",
        howTo: [
          "输入手机号码，必要时包含国家/地区代码。",
          "添加可选短信内容，访客发送前仍可编辑。",
          "扫描二维码，确认短信应用正确打开。",
        ],
        faqs: [
          {
            question: "二维码会自动发送短信吗？",
            answer: "不会。只会准备好消息，是否发送由访客决定。",
          },
          {
            question: "访客可以修改预填内容吗？",
            answer: "可以。短信在消息应用中仍可编辑。",
          },
        ],
      },
      vcard: {
        title: "vCard 二维码生成器",
        description:
          "免费创建可将姓名、电话、邮箱和网站保存到通讯录的 vCard 二维码。适合名片与社交场合。",
        h1: "用二维码分享电子名片",
        introduction:
          "vCard 二维码让对方一扫即可添加你的联系方式。印在名片、胸牌或展位标识上，无需反复输入电话和邮箱。",
        howTo: [
          "至少填写名或姓。",
          "按需添加组织、电话、邮箱和网站。",
          "扫描预览，确认手机会提示保存联系人。",
        ],
        faqs: [
          {
            question: "每部手机保存联系人的方式都一样吗？",
            answer: "大多数手机支持 vCard 3.0，但保存界面会因设备和相机应用而异。",
          },
          {
            question: "打印后还能更新信息吗？",
            answer: "不能。这是静态二维码。信息变更后请创建并重新印刷新码。",
          },
        ],
      },
      whatsapp: {
        title: "WhatsApp 二维码生成器",
        description:
          "免费创建可打开 WhatsApp 聊天并可选预填消息的二维码。适合客服台与店面。",
        h1: "用二维码开始 WhatsApp 聊天",
        introduction:
          "WhatsApp 二维码会打开 wa.me 并填入你的号码。可添加简短起始消息，方便顾客询问营业时间、订单或预约。",
        howTo: [
          "输入含国家/地区代码的 WhatsApp 号码。",
          "可选添加访客发送前可编辑的消息。",
          "扫描预览，确认 WhatsApp 打开目标聊天。",
        ],
        faqs: [
          {
            question: "扫描后会自动发送 WhatsApp 消息吗？",
            answer: "不会。只会打开聊天草稿，是否发送由访客决定。",
          },
          {
            question: "电话号码需要加号吗？",
            answer: "请包含国家/地区代码。生成 wa.me 链接前会自动去掉空格。",
          },
        ],
      },
      line: {
        title: "LINE 二维码生成器",
        description:
          "免费为 LINE ID、官方账号或主页链接创建 LINE 二维码，方便顾客从印刷物料添加好友。",
        h1: "用二维码打开 LINE 主页",
        introduction:
          "LINE 在泰国和东亚广泛使用。编码官方账号（@handle）、LINE ID 或完整 line.me 链接，让扫码者无需输入 ID 即可添加聊天。",
        howTo: [
          "输入 @官方账号、LINE ID，或粘贴完整 https://line.me 链接。",
          "更改 ID 或设计后查看实时预览。",
          "用已安装 LINE 的手机扫描，确认主页正确打开。",
        ],
        faqs: [
          {
            question: "官方账号应填写什么？",
            answer: "使用 @handle 格式，例如 @yourshop，或粘贴官方 LINE 邀请链接。",
          },
          {
            question: "扫码者需要安装 LINE 吗？",
            answer: "需要。打开 LINE 主页要求扫码设备已安装 LINE 应用。",
          },
        ],
      },
      "google-review": {
        title: "Google 评价二维码生成器",
        description:
          "用地图或评价分享链接免费创建 Google 评价二维码，方便顾客到店后留下反馈。",
        h1: "用二维码收集 Google 评价",
        introduction:
          "把评价二维码放在小票、桌牌或结账柜台。顾客扫码即可到达 Google 评价或地图页，无需搜索商家名称。",
        howTo: [
          "从 Google 商家资料复制评价或地图分享链接。",
          "将完整 https 链接粘贴到生成器。",
          "试扫确认评价页打开后再印刷。",
        ],
        faqs: [
          {
            question: "在哪里找到 Google 评价链接？",
            answer:
              "打开 Google 商家资料或 Google 地图，然后复制该地点的分享链接或“请求评价”链接。",
          },
          {
            question: "这是动态二维码吗？",
            answer: "不是。评价网址直接编码在静态二维码中。链接变更后请创建新码，或查看动态二维码页面了解可编辑目标。",
          },
        ],
      },
      dynamic: {
        title: "动态二维码生成器 — 印刷后可改目标",
        description:
          "在 genmyqrcode.com 创建动态二维码。印刷后可更改目标网址、暂停活动并查看扫描次数——免费，无需账号。",
        h1: "可稍后更新目标的动态二维码",
        introduction:
          "动态二维码指向 genmyqrcode.com 上的短链（例如 /r/yourCode）。扫码者会打开你当前的目标网址。你可以更改该网址、暂停代码或查看扫描次数，而无需重印海报、菜单或包装。静态二维码仍将内容直接编码在图像中，适合 WiFi、vCard 以及永不需要修改的永久链接。",
        howTo: [
          "打开二维码生成器，切换到 Dynamic 模式。",
          "输入 http 或 https 目标网址（可选名称便于日后识别），然后创建动态二维码。",
          "按需自定义设计，下载图片并印刷——二维码编码的是短链，不是最终网站 URL。",
          "稍后编辑时，使用管理令牌（已保存在本浏览器）打开管理页，更新目标、暂停或重新启用，并查看扫描次数。",
        ],
        faqs: [
          {
            question: "静态与动态二维码有何区别？",
            answer:
              "静态码把内容存在图像里；动态码在 genmyqrcode.com 存短链以便重定向，因此可在印刷后修改目标。WiFi、vCard 或永久链接用静态；活动与常改菜单用动态。",
          },
          {
            question: "需要注册账号吗？",
            answer:
              "不需要。所有权使用保存在浏览器中的管理令牌。如需在其他设备编辑请自行备份——丢失后无法找回。完整账号系统可能稍后推出。",
          },
          {
            question: "短链指向哪里？",
            answer:
              "印刷的动态码使用 https://genmyqrcode.com/r/{code}，并以 HTTP 302 重定向到当前目标。暂停后扫码会收到 gone，直到重新启用。",
          },
          {
            question: "二维码创建区是否仍然无广告？",
            answer: "是。广告可能出现在工具周围的 SEO 说明页，但二维码创建区本身保持无广告。",
          },
          {
            question: "动态二维码能编码 WiFi 或 vCard 吗？",
            answer: "不能通过 HTTP 重定向。动态模式仅支持 http/https 目标。WiFi、vCard、短信等请使用静态模式。",
          },
        ],
      },
      youtube: {
        title: "YouTube 二维码生成器 — 免费频道与视频链接",
        description: "免费创建 YouTube 频道或视频二维码。输入用户名或网址，自定义样式并在浏览器中下载静态码。",
        h1: "YouTube 二维码生成器",
        introduction: "用静态二维码把手机直接带到你的 YouTube 频道或视频。粘贴完整链接或输入 @用户名，在浏览器本地生成，不上传服务器。",
        howTo: [
          "打开本页并保持 Social → YouTube。",
          "输入 @用户名或粘贴 youtube.com / youtu.be 链接。",
          "按需调整颜色或边框，下载 PNG 或 SVG，印刷前先试扫。",
        ],
        faqs: [
          {
            question: "可以链接到单个视频吗？",
            answer: "可以。粘贴完整视频网址。用户名会映射到 youtube.com/@名称 频道页。",
          },
          {
            question: "这是动态二维码吗？",
            answer: "不是。链接写在图像里。若需印刷后改目标，请使用动态模式。",
          },
        ],
      },
      tiktok: {
        title: "TikTok 二维码生成器 — 免费主页链接",
        description: "免费创建 TikTok 主页二维码。输入用户名或网址，自定义后立即下载，无需注册。",
        h1: "TikTok 二维码生成器",
        introduction: "用静态二维码让人关注你的 TikTok。输入用户名或粘贴主页链接，内容编码在图像中。",
        howTo: [
          "保持 Social → TikTok。",
          "输入用户名（可带或不带 @）或粘贴 tiktok.com 主页链接。",
          "下载并试扫后再印刷贴纸或海报。",
        ],
        faqs: [
          {
            question: "会打开 TikTok 应用吗？",
            answer: "手机通常会从二维码中的 https 链接打开应用或移动网页。",
          },
          {
            question: "之后能改主页吗？",
            answer: "静态码不能改。请新建二维码，或使用动态模式。",
          },
        ],
      },
      linkedin: {
        title: "LinkedIn 二维码生成器 — 免费主页链接",
        description: "免费创建 LinkedIn 二维码，适合名片与活动。输入主页链接或个性网址并下载静态码。",
        h1: "LinkedIn 二维码生成器",
        introduction: "无需手打长链接即可分享 LinkedIn 主页。静态码适合名片、胸牌与展位物料。",
        howTo: [
          "保持 Social → LinkedIn。",
          "粘贴 LinkedIn 主页链接，或输入 /in/ 后的个性名称。",
          "下载 PNG 或 SVG，印名片前先试扫。",
        ],
        faqs: [
          {
            question: "只有主页链接该怎么填？",
            answer: "粘贴完整的 https://www.linkedin.com/in/... 链接最稳妥。",
          },
          {
            question: "支持公司主页吗？",
            answer: "支持——粘贴完整公司页链接。用户名快捷方式面向个人 /in/ 主页。",
          },
        ],
      },
      snapchat: {
        title: "Snapchat 二维码生成器 — 免费添加好友链接",
        description: "免费创建可打开添加好友链接的 Snapchat 二维码。输入用户名或网址并下载静态码。",
        h1: "Snapchat 二维码生成器",
        introduction: "让好友扫码添加 Snapchat。我们将 snapchat.com/add 链接编码为静态二维码。",
        howTo: [
          "保持 Social → Snapchat。",
          "输入 Snapchat 用户名或粘贴添加链接。",
          "按需自定义外观，下载并试扫。",
        ],
        faqs: [
          {
            question: "这和应用内 Snapcode 一样吗？",
            answer: "不一样。这是打开网页添加链接的标准二维码；黄色 Snapcode 是应用内格式。",
          },
          {
            question: "需要注册 Build Your QR 账号吗？",
            answer: "不需要。在浏览器本地生成，不上传内容。",
          },
        ],
      },
      reddit: {
        title: "Reddit 二维码生成器 — 免费用户或社区",
        description: "免费创建 Reddit 用户或社区二维码。输入 u/名称、r/社区或完整链接并立即下载。",
        h1: "Reddit 二维码生成器",
        introduction: "用静态二维码指向 Reddit 用户或社区。可用 r/subreddit、用户名或粘贴 reddit.com 链接。",
        howTo: [
          "保持 Social → Reddit。",
          "输入 r/社区、用户名或粘贴完整 Reddit 链接。",
          "下载并在印刷或幻灯片使用前试扫。",
        ],
        faqs: [
          {
            question: "如何链接到子版块？",
            answer: "输入 r/社区名（如 r/qrcode）或粘贴完整子版块链接。",
          },
          {
            question: "印刷后能改链接吗？",
            answer: "静态码不能。若需可编辑目标，请使用动态模式。",
          },
        ],
      },
      discord: {
        title: "Discord 二维码生成器 — 免费邀请链接",
        description: "免费创建 Discord 服务器邀请二维码。输入邀请码或 discord.gg 链接并下载静态码。",
        h1: "Discord 二维码生成器",
        introduction: "用可扫描邀请码壮大 Discord 社区。将 discord.gg 邀请编码为静态二维码，适合海报与活动胸牌。",
        howTo: [
          "保持 Social → Discord。",
          "粘贴 discord.gg / discord.com 邀请链接，或只输入邀请码。",
          "下载并试扫；轮换邀请时请重新生成二维码。",
        ],
        faqs: [
          {
            question: "邀请过期怎么办？",
            answer: "静态码仍指向旧邀请。请用新邀请生成二维码，或使用动态模式更新目标。",
          },
          {
            question: "可以编码 Discord 用户名吗？",
            answer: "本工具面向邀请链接。粘贴完整邀请 URL 最可靠。",
          },
        ],
      },
      spotify: {
        title: "Spotify 二维码生成器 — 免费主页与播放列表",
        description: "免费创建 Spotify 艺人、用户或播放列表二维码。粘贴 open.spotify.com 链接或输入用户名并下载。",
        h1: "Spotify 二维码生成器",
        introduction: "扫码分享音乐。粘贴任意 open.spotify.com 链接最准确，也可输入用户名生成主页链接。",
        howTo: [
          "保持 Social → Spotify。",
          "粘贴曲目、播放列表、艺人或主页链接（推荐），或输入用户名。",
          "下载 PNG 或 SVG，并在已安装 Spotify 的手机上试扫。",
        ],
        faqs: [
          {
            question: "应该粘贴完整 Spotify 链接吗？",
            answer: "尽量粘贴。完整 open.spotify.com 链接对播放列表和曲目最可靠。",
          },
          {
            question: "扫码需要 Spotify 应用吗？",
            answer: "二维码打开 https 链接。若已安装应用，手机可能跳转到 Spotify。",
          },
        ],
      },
      soundcloud: {
        title: "SoundCloud 二维码生成器 — 免费主页链接",
        description: "免费创建 SoundCloud 主页或曲目页二维码。粘贴链接或用户名并下载静态码。",
        h1: "SoundCloud 二维码生成器",
        introduction: "用传单或周边上的静态二维码把粉丝带到 SoundCloud。粘贴 soundcloud.com 链接或输入主页用户名。",
        howTo: [
          "保持 Social → SoundCloud。",
          "输入用户名或粘贴主页/曲目链接。",
          "按需自定义设计，下载并试扫。",
        ],
        faqs: [
          {
            question: "可以链接单曲吗？",
            answer: "可以——粘贴完整曲目链接。用户名快捷方式会生成主页链接。",
          },
          {
            question: "印刷后可编辑吗？",
            answer: "静态码不可。若需稍后改目标，请使用动态模式。",
          },
        ],
      },
      kakaotalk: {
        title: "KakaoTalk 二维码生成器 — 免费 Open Chat 链接",
        description: "免费创建 KakaoTalk Open Chat 或主页链接二维码。粘贴 Kakao 链接或输入 id 并下载。",
        h1: "KakaoTalk 二维码生成器",
        introduction: "让客户一扫即开 KakaoTalk。将 open.kakao.com 链接编码为静态码，适合与 LINE 一起用于面向韩国的物料。",
        howTo: [
          "保持 Social → KakaoTalk。",
          "粘贴 open.kakao.com 链接或输入 Open Chat id。",
          "下载并用已安装 KakaoTalk 的手机试扫。",
        ],
        faqs: [
          {
            question: "和 LINE 二维码一样吗？",
            answer: "不一样。LINE 请用 LINE 工具；KakaoTalk 链接请用本页。",
          },
          {
            question: "需要 Kakao 企业账号吗？",
            answer: "只需有效的 KakaoTalk 链接即可编码。Build Your QR 不会替你创建聊天。",
          },
        ],
      },
      payment: {
        title: "支付二维码生成器 — PayPal、Venmo、Etsy 等",
        description: "免费创建 PayPal、Venmo、Etsy、Revolut、Amazon 或加密货币链接的支付二维码。浏览器下载静态码，无需注册。",
        h1: "支付二维码生成器",
        introduction:
          "用静态二维码收款或引导到店铺。选择 PayPal、Venmo、Etsy、Revolut、Amazon 或 Crypto，然后输入用户名或粘贴完整支付链接。我们不处理付款——只编码你提供的链接。",
        howTo: [
          "在生成器中选择 Payment 并挑选服务商。",
          "输入用户名（PayPal.me、Venmo、Etsy 店铺、Revolut）或粘贴完整 https 支付/店铺链接。Amazon 与加密货币需完整 URL 或 bitcoin: 等 URI。",
          "下载二维码，用对应应用试扫，确认支付页正确后再印刷。",
        ],
        faqs: [
          {
            question: "Build Your QR 会收款吗？",
            answer: "不会。二维码只编码你提供的链接或支付 URI。结账在 PayPal、Venmo、店铺或钱包应用中完成。",
          },
          {
            question: "印刷后能改支付链接吗？",
            answer: "静态码不能。请新建码，或使用可稍后编辑的动态 https 目标。",
          },
          {
            question: "支持 UPI 或 PIX 吗？",
            answer: "可通过 Payment 粘贴完整 URL/URI，或使用 URL 类型。专用 UPI/PIX 构建器可能稍后推出。",
          },
        ],
      },
    },
    templatesIndex: {
      title: "二维码模板",
      description:
        "浏览精选二维码模板，覆盖餐厅、咖啡馆、酒店、菜单、WiFi 分享等场景。预览设计、填写内容并下载合成二维码。",
      h1: "面向真实场景的二维码模板",
      introduction:
        "从现成视觉风格开始，无需从空白配色起步。每个模板会应用颜色、边框、标志和背景，下载前仍可继续自定义。",
      body: [
        "模板针对常见印刷与柜台场景精选：菜单、访客 WiFi、店招与评价引导。",
        "选择模板仅改变视觉设计。网址、WiFi 详情或消息内容仍由你控制。",
        "本版本中的全部素材均为本地演示占位图，之后可替换品牌素材而无需改动数据模型。",
      ],
      howTo: [
        "打开匹配你场景的分类，或在本页浏览全部模板。",
        "选择模板，将其设计应用到生成器。",
        "输入二维码内容，按需调整颜色或标志，然后下载合成 PNG。",
      ],
      faqs: [
        {
          question: "这些模板可以免费使用吗？",
          answer:
            "可以。生成器在浏览器中创建静态二维码。演示图片为占位素材，可用你自己的资源替换。",
        },
        {
          question: "选择模板会改变二维码跳转目标吗？",
          answer: "不会。模板仅应用颜色、边框、标志和背景等视觉设置。",
        },
      ],
    },
    templates: {
      restaurant: {
        title: "餐厅二维码模板",
        description:
          "暖色餐厅二维码模板，适用于菜单、桌牌和预订链接。自定义颜色并下载可打印的静态二维码。",
        h1: "餐厅二维码模板",
        introduction:
          "为食客提供可扫描路径，直达菜单、预订页或今日特惠。这些模板使用暖色用餐配色与清晰边框标签，适合桌面印刷。",
        body: [
          "餐厅模板默认使用高对比暖色，在奶油色纸张上依然易读。",
          "将菜单网址与「暖色餐桌」模板搭配，打印前用品牌标志替换演示标志。",
          "保持目标网址稳定——静态二维码无法在日后重定向，除非重新印刷。",
        ],
        howTo: [
          "选择「暖色餐桌」餐厅模板。",
          "将二维码类型切换为网址，并粘贴菜单或预订链接。",
          "下载合成 PNG，送印前进行试扫。",
        ],
        faqs: [
          {
            question: "餐厅二维码应链接到哪里？",
            answer: "数字菜单、预订表单或今日特惠页面效果最好。",
          },
          {
            question: "边框文字可以保留为我的语言吗？",
            answer: "可以。应用模板后，在设计器中编辑边框文字即可。",
          },
        ],
      },
      cafe: {
        title: "咖啡馆二维码模板",
        description:
          "清新咖啡馆二维码模板，适用于会员链接、菜单和吧台 WiFi。即时预览并下载合成静态二维码。",
        h1: "咖啡馆二维码模板",
        introduction:
          "咖啡馆吧台需要友好且易扫的二维码。这些薄荷绿模板适用于会员注册、饮品菜单和访客 WiFi 卡片。",
        body: [
          "「晨间咖啡」使用青绿点缀与圆角点阵，风格轻松且不影响扫码可靠性。",
          "尽量使用简短的 HTTPS 落地页，而非冗长的社交链接。",
          "若添加标志，请将纠错级别设为高，以免杯具与柔光影响扫码。",
        ],
        howTo: [
          "选择「晨间咖啡」咖啡馆模板。",
          "输入会员或菜单网址。",
          "按需调整标志大小，然后下载并放置在收银处附近。",
        ],
        faqs: [
          {
            question: "同一模板可以用于 WiFi 吗？",
            answer: "可以。应用模板后，将二维码类型切换为 WiFi 并填写网络信息。",
          },
          {
            question: "咖啡馆模板包含真实咖啡照片吗？",
            answer: "不包含。本阶段提供可稍后替换的本地占位素材。",
          },
        ],
      },
      hotel: {
        title: "酒店二维码",
        description:
          "创建酒店二维码，用于访客 WiFi、礼宾链接和大堂立牌。应用酒店风格外观，下载可打印的静态码。",
        h1: "酒店二维码",
        introduction:
          "酒店常需精致的酒店二维码用于房卡和大堂前台。「大堂蓝」保持沉稳藏青配色，并在室内灯光下易于扫描。",
        body: [
          "酒店模板可用于访客 WiFi、楼内导航页，或水疗预约等增值体验。",
          "房卡适合使用标签边框，让宾客扫码前就清楚用途。",
          "大批量打印钥匙包前，务必用手机验证目标页面。",
        ],
        howTo: [
          "应用「大堂蓝」酒店模板。",
          "按宾客路径选择 WiFi 或网址。",
          "下载合成 PNG，并放入客房物料。",
        ],
        faqs: [
          {
            question: "酒店是否应在二维码中编码 WiFi 密码？",
            answer:
              "仅针对你打算分享的访客网络。持有印刷码的人可从二维码载荷读取密码。",
          },
          {
            question: "可以更换酒店标志吗？",
            answer: "可以。在设计器中用品牌标志替换预设标志。",
          },
        ],
      },
      menu: {
        title: "菜单二维码设计模板",
        description:
          "设计餐厅与咖啡馆的菜单二维码。应用易读菜牌风格，链接数字菜单网址，并下载可打印的静态码。",
        h1: "菜单二维码设计模板",
        introduction:
          "菜单二维码设计应在桌边清晰可读，且用途一目了然。「特惠菜牌」使用清晰边框与叶绿配色，适合纸质菜单。",
        body: [
          "链接到移动端友好、在蜂窝网络上也能快速加载的菜单页。",
          "不要把整份菜单文字放进二维码载荷——请改用网址。",
          "若覆膜印刷，请在码周围留出空白，避免反光遮挡边缘。",
        ],
        howTo: [
          "选择「特惠菜牌」菜单模板。",
          "粘贴数字菜单的 HTTPS 链接。",
          "下载 PNG，并放置在纸质菜单靠上位置。",
        ],
        faqs: [
          {
            question: "一个菜单二维码可以服务多语言吗？",
            answer: "可以。指向允许宾客选择语言的落地页即可。",
          },
          {
            question: "更新在线菜单会让二维码失效吗？",
            answer: "不会，只要网址保持不变。",
          },
        ],
      },
      wifi: {
        title: "WiFi 二维码模板",
        description:
          "访客 WiFi 二维码模板，适用于咖啡馆、酒店和办公场所。应用「访客接入」样式，填写网络信息并下载合成静态二维码。",
        h1: "WiFi 二维码模板",
        introduction:
          "用二维码分享 WiFi 可减少前台输错密码。「访客接入」搭配清晰信号标志与标签边框，明确提示扫码用途。",
        body: [
          "按设备列表中的显示准确输入 SSID，包括大小写和空格。",
          "现代网络优先使用 WPA/WPA2；开放网络应选择无密码选项。",
          "打印下载的合成图时留出足够空白，让边框与码体保持分明。",
        ],
        howTo: [
          "应用「访客接入」WiFi 模板。",
          "将二维码类型切换为 WiFi，并输入网络名称、安全类型和密码。",
          "下载 PNG，并在接入点附近用手机测试。",
        ],
        faqs: [
          {
            question: "WiFi 密码会保存在你们的服务器上吗？",
            answer: "不会。静态 WiFi 二维码在浏览器中创建，本应用不会保存。",
          },
          {
            question: "输入时可以隐藏密码吗？",
            answer: "可以。使用密码字段的显示/隐藏控件，准备好后再下载。",
          },
        ],
      },
    },
  },
};
