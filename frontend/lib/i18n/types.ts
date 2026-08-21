/** Change: Shared Dictionary shape so en/th/zh stay structurally aligned. */

export type SeoPageCopy = {
  title: string;
  description: string;
  h1: string;
  introduction: string;
  howTo: string[];
  faqs: { question: string; answer: string }[];
};

export type TemplateSeoCopy = SeoPageCopy & {
  body: string[];
};

export type Dictionary = {
  site: {
    name: string;
    description: string;
  };
  chrome: {
    allQrTools: string;
    allTemplates: string;
    howToCreate: string;
    featuredCollection: string;
    aboutTemplates: string;
    howToUseTemplate: string;
    relatedTemplates: string;
    browseCategory: string;
    faqs: string;
    relatedTools: string;
    home: string;
    breadcrumbsAria: string;
    qrCodeGeneratorCrumb: string;
    templatesCrumb: string;
    language: string;
    advertisement: string;
    privacyPolicy: string;
    termsOfService: string;
    footerRights: string;
  };
  relatedToolBlurbs: Record<"url" | "wifi" | "email" | "phone" | "sms", string>;
  generator: {
    eyebrow: string;
    heading: string;
    intro: string;
    livePreview: string;
    downloadPng: string;
    preparingDownload: string;
    downloadFailed: string;
    downloadHint: string;
  };
  form: {
    websiteAddress: string;
    websitePlaceholder: string;
    text: string;
    textPlaceholder: string;
    wifiSsid: string;
    wifiSsidPlaceholder: string;
    wifiSecurity: string;
    wifiWpa: string;
    wifiWep: string;
    wifiNopass: string;
    wifiPassword: string;
    wifiPasswordPlaceholder: string;
    showPassword: string;
    hidePassword: string;
    recipientEmail: string;
    emailPlaceholder: string;
    emailSubject: string;
    emailSubjectPlaceholder: string;
    emailMessage: string;
    emailMessagePlaceholder: string;
    phoneNumber: string;
    phonePlaceholder: string;
    smsPhone: string;
    smsPhonePlaceholder: string;
    smsMessage: string;
    smsMessagePlaceholder: string;
  };
  designer: {
    heading: string;
    intro: string;
    foregroundColor: string;
    backgroundColor: string;
    hexValue: string;
    dotStyle: string;
    outerEyeStyle: string;
    innerEyeStyle: string;
    errorCorrection: string;
    qrSize: string;
    logoSize: string;
    logo: string;
    remove: string;
    logoHint: string;
    presetLogos: string;
    presetBackgrounds: string;
    clear: string;
    gradient: string;
    enable: string;
    endColor: string;
    gradientType: string;
    frame: string;
    frameStyleAria: string;
    frameText: string;
    frameTextPlaceholder: string;
    styleDots: string;
    styleRounded: string;
    styleSquare: string;
    styleExtraRounded: string;
    styleClassy: string;
    styleClassyRounded: string;
    styleDot: string;
    errorLow: string;
    errorMedium: string;
    errorQuartile: string;
    errorHigh: string;
    gradientLinear: string;
    gradientRadial: string;
    frameNone: string;
    frameBorder: string;
    frameLabel: string;
  };
  preview: {
    empty: string;
    aria: string;
    scanMe: string;
  };
  typeSelector: {
    aria: string;
  };
  types: Record<"url" | "text" | "wifi" | "email" | "phone" | "sms", string>;
  errors: {
    urlInvalidProtocol: string;
    urlInvalid: string;
    textRequired: string;
    wifiSsidRequired: string;
    wifiPasswordRequired: string;
    emailInvalid: string;
    phoneInvalid: string;
  };
  export: {
    noContent: string;
    renderFailed: string;
    decodeFailed: string;
    canvasUnavailable: string;
    pngFailed: string;
    downloadFailed: string;
  };
  templatesUi: {
    title: string;
    openHint: string;
    closedSelected: string;
    closedNone: string;
    clear: string;
    categoriesAria: string;
    emptyGrid: string;
    emptyPreview: string;
    previewAlt: string;
  };
  categories: Record<
    | "restaurant"
    | "cafe"
    | "hotel"
    | "retail"
    | "business"
    | "event"
    | "wifi"
    | "menu"
    | "google-review",
    string
  >;
  templateCopy: Record<string, { name: string; description: string; defaultFrameText: string }>;
  assetCopy: Record<string, { name: string; description: string }>;
  seo: {
    generator: SeoPageCopy;
    qr: Record<"url" | "wifi" | "email" | "phone" | "sms", SeoPageCopy>;
    templatesIndex: TemplateSeoCopy;
    templates: Record<"restaurant" | "cafe" | "hotel" | "menu" | "wifi", TemplateSeoCopy>;
  };
};
