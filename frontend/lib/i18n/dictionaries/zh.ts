import type { Dictionary } from "@/lib/i18n/types";

/** Change: Simplified Chinese dictionary — UI and SEO copy aligned with en.ts. */
export const zh: Dictionary = {
  site: {
    name: "Build Your QR",
    description: "免费静态二维码生成器，提供视觉模板和实用二维码工具。",
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
  },
  relatedToolBlurbs: {
    url: "为网站链接创建二维码。",
    wifi: "为 WiFi 创建二维码。",
    email: "为电子邮件创建二维码。",
    phone: "为电话创建二维码。",
    sms: "为短信创建二维码。",
  },
  generator: {
    eyebrow: "免费静态二维码生成器",
    heading: "几秒内创建二维码",
    intro: "选择模板、填写信息、自定义设计，然后下载合成预览。不会保存任何内容。",
    livePreview: "实时预览",
    downloadPng: "下载 PNG",
    preparingDownload: "正在准备下载…",
    downloadFailed: "下载失败。",
    downloadHint: "下载内容包含二维码，以及所选的边框、标签文字和背景。",
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
  },
  types: {
    url: "网址",
    text: "文本",
    wifi: "WiFi",
    email: "邮件",
    phone: "电话",
    sms: "短信",
  },
  errors: {
    urlInvalidProtocol: "请输入有效的 http 或 https 网址。",
    urlInvalid: "请输入有效的网址。",
    textRequired: "请输入要编码的文本。",
    wifiSsidRequired: "请输入 WiFi 网络名称。",
    wifiPasswordRequired: "请输入 WiFi 密码。",
    emailInvalid: "请输入有效的电子邮箱地址。",
    phoneInvalid: "请输入有效的电话号码。",
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
    openHint: "选择视觉预设，然后输入二维码内容并继续自定义。",
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
      title: "免费二维码生成器",
      description:
        "免费创建静态二维码，支持网址、文本、WiFi、电子邮件、电话号码和短信。自定义样式并即时预览。",
      h1: "免费二维码生成器",
      introduction:
        "在浏览器中创建实用的静态二维码。选择内容类型、填写详情、自定义视觉设计，并在分享前测试实时预览。",
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
          answer: "可为网址、纯文本、WiFi 网络接入、电子邮件、电话拨号和短信消息创建二维码。",
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
            answer: "静态二维码打印后无法更改。若网址变更，请创建新的二维码。",
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
        title: "酒店二维码模板",
        description:
          "酒店二维码模板，适用于访客 WiFi、礼宾链接和大堂立牌。自定义「大堂蓝」外观并下载合成 PNG。",
        h1: "酒店二维码模板",
        introduction:
          "酒店常需精致二维码用于房卡和大堂前台。「大堂蓝」保持沉稳藏青配色，并在室内灯光下易于扫描。",
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
        title: "菜单二维码模板",
        description:
          "面向餐厅和咖啡馆的数字菜单二维码模板。应用易读菜牌风格，链接菜单网址，并下载可打印的静态二维码。",
        h1: "菜单二维码模板",
        introduction:
          "菜单二维码应在桌边清晰可读，且用途一目了然。「特惠菜牌」使用清晰边框与叶绿配色，适合纸质菜单。",
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
