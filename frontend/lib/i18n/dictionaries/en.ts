import type { Dictionary } from "@/lib/i18n/types";

/** Change: Source-language dictionary — all current English UI and SEO copy. */
export const en: Dictionary = {
  site: {
    name: "Build Your QR",
    description: "Free static QR code generator, visual templates, bulk CSV export, and practical QR tools.",
  },
  chrome: {
    allQrTools: "All QR tools",
    allTemplates: "All templates",
    howToCreate: "How to create this QR code",
    featuredCollection: "Featured in this collection",
    aboutTemplates: "About these templates",
    howToUseTemplate: "How to use this template",
    relatedTemplates: "Related templates",
    browseCategory: "Browse templates in this category.",
    faqs: "Frequently asked questions",
    relatedTools: "Related QR tools",
    home: "Home",
    breadcrumbsAria: "Breadcrumb",
    qrCodeGeneratorCrumb: "QR code generator",
    templatesCrumb: "Templates",
    language: "Language",
    advertisement: "Advertisement",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    about: "About",
    contact: "Contact",
    bulkQrGenerator: "Bulk QR generator",
    footerNavAria: "Footer",
    footerRights: "All rights reserved.",
    popularUseCases: "Popular specialized use cases",
    useCasesCrumb: "Use cases",
    howToUseCase: "How to create this QR code",
    useCaseExamples: "Good fits for this use case",
    relatedUseCases: "Related specialized QR pages",
    whyThisWorks: "Why this page fits the search",
    trustNoSignup: "No signup required",
    trustBrowserOnly: "Created in your browser",
    trustLocalized: "Works with local language content",
  },
  relatedToolBlurbs: {
    url: "Create a QR code for a website link.",
    wifi: "Create a QR code for WiFi.",
    email: "Create a QR code for email.",
    phone: "Create a QR code for phone.",
    sms: "Create a QR code for SMS.",
    vcard: "Create a QR code for a digital contact card.",
    whatsapp: "Create a QR code that opens WhatsApp chat.",
    line: "Create a QR code that opens a LINE profile.",
    "google-review": "Create a QR code for a Google review link.",
    dynamic: "Learn how editable Dynamic QR codes work.",
    youtube: "Create a QR code for a YouTube channel or video.",
    tiktok: "Create a QR code for a TikTok profile.",
    linkedin: "Create a QR code for a LinkedIn profile.",
    snapchat: "Create a QR code for a Snapchat add link.",
    reddit: "Create a QR code for a Reddit user or community.",
    discord: "Create a QR code for a Discord invite.",
    spotify: "Create a QR code for a Spotify profile or playlist.",
    soundcloud: "Create a QR code for a SoundCloud profile.",
    kakaotalk: "Create a QR code for a KakaoTalk open chat.",
    payment: "Create a QR code for PayPal, Venmo, Etsy, and more.",
  },
  consent: {
    title: "We value your privacy",
    message:
      "We use cookies and similar technologies to show relevant ads and measure how the site is used. You can accept all, or reject non-essential cookies.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    privacyPolicy: "Privacy Policy",
  },
  generator: {
    eyebrow: "Free static QR code generator",
    heading: "Create a QR code in seconds",
    intro:
      "Start from a common use, or choose a type, customize the look, and download. Nothing is saved.",
    startersTitle: "Quick start",
    startersHint: "One tap sets the QR type, template, and frame label. Your details stay in the form.",
    startersAria: "Quick-start presets",
    starterConfirm:
      "This starter uses a different QR type. Your current details stay saved, but the form will switch.",
    starterContinue: "Use this starter",
    starterCancel: "Keep current",
    starterLabels: {
      "restaurant-menu": "Restaurant menu",
      "hotel-wifi": "Hotel WiFi",
      "google-review": "Google Review",
      line: "LINE",
      "business-card": "Business card",
    },
    step1Title: "1. Add content",
    step2Title: "2. Customize",
    step3Title: "3. Preview & download",
    livePreview: "Live preview",
    downloadPng: "Download PNG",
    downloadSvg: "Download SVG",
    preparingDownload: "Preparing download…",
    downloadFailed: "Download failed.",
    downloadHint:
      "PNG includes the frame, label, and background when selected. SVG exports the scalable QR artwork for print and editing.",
    bulkPromo: "Need many URL QR codes with the same design?",
    bulkPromoLink: "Open the bulk CSV generator",
    modeStatic: "Static",
    modeDynamic: "Dynamic",
    modeAria: "QR mode",
    feedback: {
      button: "Feedback",
      title: "Send feedback",
      intro: "Tell us about a bug, idea, or question. Your email app opens with a draft to our support team.",
      emailLabel: "Your email (optional)",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message",
      messagePlaceholder: "What happened or what would you like to see?",
      send: "Open email to send",
      cancel: "Cancel",
      close: "Close feedback form",
      messageRequired: "Enter a message before sending.",
      mailtoHint: "Sending opens your email app addressed to support@genmyqrcode.com — you can review before sending.",
      mailSubject: "Build Your QR feedback",
      replyLine: "Reply to",
      pageLine: "Page",
      modeLine: "Mode",
      typeLine: "QR type",
    },
  },
  bulkQr: {
    eyebrow: "Bulk QR generator",
    heading: "Create many URL QR codes at once",
    intro:
      "Upload a CSV, apply one shared design, and download a ZIP of PNG files. Everything runs in your browser — up to 50 codes per batch.",
    step1Title: "1. Upload CSV",
    step2Title: "2. Customize design",
    step3Title: "3. Download ZIP",
    csvHint:
      "Use a CSV with columns url, filename, and optional label. Maximum {max} rows per batch. Invalid rows are skipped from the ZIP.",
    csvUpload: "Upload CSV",
    csvSampleDownload: "Download sample CSV",
    csvSampleFileName: "bulk-qr-sample.csv",
    csvEmpty: "The CSV file has no usable rows. Add at least one URL.",
    csvTooMany: "Only the first {max} rows were loaded. Split larger lists into multiple batches.",
    csvNoUrlColumn: "Could not find a url column in the CSV header.",
    csvInvalidType: "Please upload a .csv file.",
    csvLoaded: "Loaded {name}.",
    rowColumnUrl: "URL",
    rowColumnFile: "Filename",
    rowColumnLabel: "Label",
    rowColumnStatus: "Status",
    rowValid: "Ready",
    rowInvalid: "Invalid",
    rowsSummary: "{valid} of {total} rows are ready to export.",
    invalidRowsNote: "{count} row(s) have errors and will not be included in the ZIP.",
    downloadZip: "Download ZIP ({count} PNGs)",
    preparingZip: "Preparing ZIP…",
    zipFailed: "ZIP export failed. Try again with fewer rows.",
    zipHint:
      "PNG files include your selected frame, label, and background. Codes are rendered one at a time to stay light on memory.",
    zipFileName: "bulk-qr-codes.zip",
    progressLabel: "Rendering {done} of {total}…",
    previewLimitNote: "Showing first {shown} of {total} rows.",
    guideLink: "Read the full bulk QR guide ↓",
  },
  bulkQrGuide: {
    heading: "Bulk QR code guide — CSV to ZIP",
    overviewTitle: "What this tool does",
    overview: [
      "The bulk generator turns a list of website links into many matching QR codes in one run. You upload a CSV, apply one visual design to every code, and download a ZIP folder of PNG files ready for print or digital use.",
      "Everything happens in your browser. We do not store your URLs, CSV file, or exported images on a server. No account is required.",
      "Each batch supports up to 50 URL QR codes so export stays fast and reliable on everyday laptops and phones — including devices with about 4 GB of RAM.",
    ],
    csvTitle: "CSV file format",
    csvIntro:
      "Prepare a comma-separated file with one QR code per row. A header row is recommended but not required when columns appear in the default order.",
    csvColumns: [
      {
        name: "url",
        description: "Required. The full website address to encode, starting with https:// or http://.",
      },
      {
        name: "filename",
        description: "Optional but recommended. Used as the PNG file name inside the ZIP, without the .png extension.",
      },
      {
        name: "label",
        description:
          "Optional. Becomes the frame text when your design uses a label frame — useful for table numbers, room names, or product titles.",
      },
    ],
    csvExampleTitle: "Example CSV",
    csvExample:
      "url,filename,label\nhttps://example.com/menu,table-01,Scan for menu\nhttps://example.com/promo,table-02,Today's special\nhttps://example.com/wifi,lobby-wifi,Free guest WiFi",
    csvNotes: [
      "You can create the file in Excel, Google Sheets, or any spreadsheet app, then export as CSV (UTF-8).",
      "If a URL contains commas, wrap the cell in double quotes.",
      "Rows without a valid http or https URL are marked Invalid and skipped from the ZIP.",
      "Lists longer than 50 rows are trimmed to the first 50 — split very large jobs into multiple batches.",
    ],
    stepsTitle: "Step-by-step workflow",
    steps: [
      {
        title: "Prepare and upload your CSV",
        body:
          "Click Upload CSV or download the sample file first. After upload, the preview table shows each row, its filename, label, and whether the URL is ready.",
      },
      {
        title: "Choose one design for the whole batch",
        body:
          "Pick a template or customize colors, dot style, logo, frame, and size. The same design applies to every valid row. Per-row labels override the default frame text when a label column is present.",
      },
      {
        title: "Review valid rows",
        body:
          "Check the summary panel on the right. Only rows marked Ready are included in the export. Fix invalid URLs in your spreadsheet and re-upload if needed.",
      },
      {
        title: "Download the ZIP",
        body:
          "Click Download ZIP to render each PNG one at a time and pack them into bulk-qr-codes.zip. PNG files include your frame, label, and background when selected.",
      },
      {
        title: "Test before printing",
        body:
          "Open a few PNG files from the ZIP and scan them with your phone at the size you plan to print. Confirm each link opens the correct page.",
      },
    ],
    useCasesTitle: "Common use cases",
    useCases: [
      "Restaurant table tents — one menu or promo link per table with a matching label such as Table 12.",
      "Hotel room cards — WiFi info pages or welcome links per room number.",
      "Retail shelf tags — product detail pages for many SKUs with consistent branding.",
      "Event badges or posters — registration or schedule links for multiple sessions.",
      "Marketing flyers — UTM-tagged campaign URLs exported with readable file names.",
    ],
    tipsTitle: "Design and print tips",
    tips: [
      "Use error correction level Q or H when adding a logo so codes remain scannable.",
      "Keep contrast strong between QR dots and the background.",
      "Prefer short, stable URLs — fewer characters produce easier-to-scan codes.",
      "Name files clearly (table-01, room-305) so print shops know which PNG goes where.",
      "For more than 50 codes, export in batches and keep the same design settings each time.",
    ],
    troubleshootingTitle: "Troubleshooting",
    troubleshooting: [
      {
        question: "A row shows Invalid — what should I check?",
        answer:
          "Make sure the URL starts with http:// or https://, has no stray spaces, and is a complete web address. Re-export the CSV as UTF-8 if special characters look wrong.",
      },
      {
        question: "Why is my ZIP smaller than the number of CSV rows?",
        answer:
          "Only valid rows are exported. Invalid URLs, empty rows, and rows beyond the 50-code limit are excluded.",
      },
      {
        question: "Can I use Excel on Windows?",
        answer:
          "Yes. Save or export as CSV. If Excel adds a BOM or semicolon separators, open the file in a text editor and confirm commas separate columns and the url header is present.",
      },
      {
        question: "Does the label column work with every frame style?",
        answer:
          "The label replaces frame text when your design uses the label frame. Other frame styles ignore the label column but still export the QR correctly.",
      },
      {
        question: "Will these QR codes expire?",
        answer:
          "No. Static URL QR codes keep working as long as the destination website stays online. Changing a link later requires generating a new code.",
      },
    ],
  },
  dynamicQr: {
    creatorTitle: "Dynamic QR",
    creatorIntro:
      "Create a short link on genmyqrcode.com that you can edit later. Destination must be http or https.",
    destinationLabel: "Destination URL",
    destinationPlaceholder: "https://example.com/menu",
    labelField: "Label (optional)",
    labelPlaceholder: "Menu table 5",
    createButton: "Create dynamic QR",
    creating: "Creating…",
    createFailed: "Could not create dynamic QR.",
    shortUrlLabel: "Short URL",
    tokenSavedHint:
      "Manage token saved in this browser. Copy it if you need to edit from another device—we cannot recover a lost token.",
    manageLink: "Open manage page",
    manageTitle: "Manage dynamic QR",
    manageIntro: "Update the destination, pause a code, or check scan counts—without reprinting.",
    ownedCodes: "Codes in this browser",
    shortCodeLabel: "Short code",
    manageTokenLabel: "Manage token",
    manageTokenHint: "Loaded from this browser’s storage when available. Paste a token if you saved one elsewhere.",
    loadButton: "Load",
    loadFailed: "Could not load this code.",
    scansLabel: "Total scans",
    statusLabel: "Status",
    statusActive: "Active",
    statusInactive: "Paused",
    saveButton: "Save changes",
    saved: "Saved.",
    saveFailed: "Could not save changes.",
    activateButton: "Activate",
    deactivateButton: "Pause",
    activated: "Code activated.",
    deactivated: "Code paused.",
    manageFooterNote:
      "Keep your manage token private. Anyone with it can change the destination or pause the code.",
  },
  form: {
    websiteAddress: "Website address",
    websitePlaceholder: "https://example.com",
    text: "Text",
    textPlaceholder: "Write your message",
    wifiSsid: "Network name (SSID)",
    wifiSsidPlaceholder: "My WiFi",
    wifiSecurity: "Security",
    wifiWpa: "WPA/WPA2",
    wifiWep: "WEP",
    wifiNopass: "No password",
    wifiPassword: "Password",
    wifiPasswordPlaceholder: "Network password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    recipientEmail: "Recipient email",
    emailPlaceholder: "hello@example.com",
    emailSubject: "Subject (optional)",
    emailSubjectPlaceholder: "Hello",
    emailMessage: "Message (optional)",
    emailMessagePlaceholder: "Your message",
    phoneNumber: "Phone number",
    phonePlaceholder: "+66 81 234 5678",
    smsPhone: "Phone number",
    smsPhonePlaceholder: "+66 81 234 5678",
    smsMessage: "Message (optional)",
    smsMessagePlaceholder: "Your SMS message",
    vcardFirstName: "First name",
    vcardFirstNamePlaceholder: "Alex",
    vcardLastName: "Last name",
    vcardLastNamePlaceholder: "Rivera",
    vcardOrganization: "Organization (optional)",
    vcardOrganizationPlaceholder: "Company name",
    vcardPhone: "Phone (optional)",
    vcardPhonePlaceholder: "+66 81 234 5678",
    vcardEmail: "Email (optional)",
    vcardEmailPlaceholder: "hello@example.com",
    vcardWebsite: "Website (optional)",
    vcardWebsitePlaceholder: "https://example.com",
    whatsappPhone: "WhatsApp number",
    whatsappPhonePlaceholder: "+66 81 234 5678",
    whatsappMessage: "Message (optional)",
    whatsappMessagePlaceholder: "Hi! I scanned your QR code.",
    lineId: "LINE ID or profile URL",
    lineIdPlaceholder: "@yourshop or https://line.me/...",
    googleReviewUrl: "Google review or Maps URL",
    googleReviewUrlPlaceholder: "https://g.page/r/...",
    locationLatitude: "Latitude",
    locationLatitudePlaceholder: "13.7563",
    locationLongitude: "Longitude",
    locationLongitudePlaceholder: "100.5018",
    locationLabel: "Place name (optional)",
    locationLabelPlaceholder: "Bangkok office",
    eventTitle: "Event title",
    eventTitlePlaceholder: "Product launch",
    eventLocation: "Location (optional)",
    eventLocationPlaceholder: "Main hall",
    eventStart: "Start",
    eventEnd: "End (optional)",
    telegramId: "Telegram username or URL",
    telegramIdPlaceholder: "@channel or https://t.me/...",
    socialNetwork: "Network",
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
    socialHandleOrUrl: "Username or profile URL",
    socialHandleOrUrlPlaceholder: "@brand or https://...",
    paymentProvider: "Payment or shop",
    paymentProviders: {
      paypal: "PayPal",
      venmo: "Venmo",
      etsy: "Etsy",
      revolut: "Revolut",
      amazon: "Amazon",
      crypto: "Crypto",
    },
    paymentHandleOrUrl: "Username or payment URL",
    paymentHandleOrUrlPlaceholder: "paypal.me name or https://...",
  },
  designer: {
    heading: "QR designer",
    intro: "Customize the preview without changing your QR content.",
    foregroundColor: "Foreground color",
    backgroundColor: "Background color",
    hexValue: "hex value",
    dotStyle: "Dot style",
    outerEyeStyle: "Outer eye style",
    innerEyeStyle: "Inner eye style",
    errorCorrection: "Error correction",
    qrSize: "QR size",
    logoSize: "Logo size",
    logo: "Logo",
    remove: "Remove",
    logoHint: "Use a small square image. Higher error correction is recommended with logos.",
    presetLogos: "Preset logos",
    presetBackgrounds: "Preset backgrounds",
    clear: "Clear",
    gradient: "Gradient",
    enable: "Enable",
    endColor: "End color",
    gradientType: "Gradient type",
    frame: "Frame",
    frameStyleAria: "QR frame style",
    frameText: "Frame text",
    frameTextPlaceholder: "Scan me",
    styleDots: "Dots",
    styleRounded: "Rounded",
    styleSquare: "Square",
    styleExtraRounded: "Extra rounded",
    styleClassy: "Classy",
    styleClassyRounded: "Classy rounded",
    styleDot: "Dot",
    errorLow: "Low (L)",
    errorMedium: "Medium (M)",
    errorQuartile: "Quartile (Q)",
    errorHigh: "High (H)",
    gradientLinear: "Linear",
    gradientRadial: "Radial",
    frameNone: "None",
    frameBorder: "Border",
    frameLabel: "Label",
  },
  preview: {
    empty: "Complete the required fields to preview your QR code.",
    aria: "Generated QR code preview",
    scanMe: "Scan me",
  },
  typeSelector: {
    aria: "QR code type",
    scrollPrev: "Show previous QR types",
    scrollNext: "Show more QR types",
  },
  types: {
    url: "URL",
    text: "Text",
    wifi: "WiFi",
    email: "Email",
    phone: "Phone",
    sms: "SMS",
    vcard: "vCard",
    whatsapp: "WhatsApp",
    line: "LINE",
    "google-review": "Review",
    location: "Location",
    event: "Event",
    telegram: "Telegram",
    social: "Social",
    payment: "Payment",
  },
  errors: {
    urlInvalidProtocol: "Enter a valid http or https URL.",
    urlInvalid: "Enter a valid URL.",
    textRequired: "Enter text to encode.",
    wifiSsidRequired: "Enter a WiFi network name.",
    wifiPasswordRequired: "Enter the WiFi password.",
    emailInvalid: "Enter a valid email address.",
    phoneInvalid: "Enter a valid phone number.",
    vcardNameRequired: "Enter a first or last name.",
    lineIdRequired: "Enter a LINE ID or profile URL.",
    lineIdInvalid: "Enter a valid LINE ID or https://line.me URL.",
    locationCoordsInvalid: "Enter valid latitude and longitude.",
    eventTitleRequired: "Enter an event title.",
    eventStartInvalid: "Enter a valid start date and time.",
    eventEndInvalid: "Enter a valid end date and time.",
    telegramIdRequired: "Enter a Telegram username or URL.",
    telegramIdInvalid: "Enter a valid Telegram username or https://t.me URL.",
    socialHandleRequired: "Enter a profile URL or username.",
    socialHandleInvalid: "Enter a valid username or https profile URL.",
    paymentHandleRequired: "Enter a payment link or username.",
    paymentHandleInvalid: "Enter a valid username or https payment URL.",
    paymentUrlRequired: "Paste a full http(s) payment or store URL.",
  },
  export: {
    noContent: "Enter QR content before downloading.",
    renderFailed: "Could not render QR data.",
    decodeFailed: "Failed to decode QR image data.",
    canvasUnavailable: "Canvas is unavailable in this browser.",
    pngFailed: "Could not create PNG download.",
    downloadFailed: "Download failed.",
  },
  templatesUi: {
    title: "Templates",
    openHint: "Pick a preset — the live preview updates instantly.",
    closedSelected: "Using {name}. Open to change templates.",
    closedNone: "Closed. Open to pick a visual preset.",
    clear: "Clear template",
    categoriesAria: "Template categories",
    emptyGrid: "No templates in this category yet.",
    emptyPreview: "Select a template to preview its look before entering QR content.",
    previewAlt: "{name} preview",
  },
  categories: {
    restaurant: "Restaurant",
    cafe: "Cafe",
    hotel: "Hotel",
    retail: "Retail",
    business: "Business",
    event: "Event",
    wifi: "WiFi",
    menu: "Menu",
    "google-review": "Google Review",
  },
  templateCopy: {
    "restaurant-warm": {
      name: "Warm Table",
      description: "Warm orange dining look for table tents and printed menus.",
      defaultFrameText: "Scan for menu",
    },
    "cafe-mint": {
      name: "Morning Brew",
      description: "Fresh mint cafe style for loyalty cards and counter signs.",
      defaultFrameText: "WiFi & menu",
    },
    "hotel-slate": {
      name: "Lobby Blue",
      description: "Calm hospitality palette for room cards and lobby stands.",
      defaultFrameText: "Guest WiFi",
    },
    "retail-bold": {
      name: "Shop Window",
      description: "High-contrast retail look for window stickers and shelf tags.",
      defaultFrameText: "Shop now",
    },
    "business-navy": {
      name: "Office Card",
      description: "Professional navy card style for networking handouts.",
      defaultFrameText: "Connect",
    },
    "event-night": {
      name: "Stage Night",
      description: "Vibrant event palette for posters, badges, and tickets.",
      defaultFrameText: "Join the event",
    },
    "wifi-signal": {
      name: "Guest Access",
      description: "Clear WiFi share style for cafes, hotels, and reception desks.",
      defaultFrameText: "Connect to WiFi",
    },
    "menu-board": {
      name: "Board Specials",
      description: "Readable menu-board look for QR links to digital menus.",
      defaultFrameText: "View menu",
    },
    "review-star": {
      name: "Leave a Review",
      description: "Friendly review prompt style for receipt inserts and counters.",
      defaultFrameText: "Rate us",
    },
  },
  assetCopy: {
    "logo-restaurant": {
      name: "Restaurant mark",
      description: "Simple fork-and-plate mark for dining templates.",
    },
    "logo-cafe": {
      name: "Cafe mark",
      description: "Coffee-cup mark for cafe templates.",
    },
    "logo-hotel": {
      name: "Hotel mark",
      description: "Building mark for hospitality templates.",
    },
    "logo-retail": {
      name: "Retail mark",
      description: "Bag mark for shop templates.",
    },
    "logo-business": {
      name: "Business mark",
      description: "Briefcase mark for professional templates.",
    },
    "logo-event": {
      name: "Event mark",
      description: "Ticket mark for event templates.",
    },
    "logo-wifi": {
      name: "WiFi mark",
      description: "Signal mark for WiFi templates.",
    },
    "logo-menu": {
      name: "Menu mark",
      description: "List mark for digital menu templates.",
    },
    "logo-review": {
      name: "Review mark",
      description: "Star mark for review templates.",
    },
    "icon-scan": {
      name: "Scan icon",
      description: "Generic scan affordance icon.",
    },
    "icon-link": {
      name: "Link icon",
      description: "Generic link affordance icon.",
    },
    "bg-warm": {
      name: "Warm paper",
      description: "Soft warm paper background.",
    },
    "bg-cool": {
      name: "Cool slate",
      description: "Cool slate gradient background.",
    },
    "bg-mint": {
      name: "Mint wash",
      description: "Light mint wash background.",
    },
    "thumb-restaurant": {
      name: "Restaurant thumb",
      description: "Thumbnail for restaurant templates.",
    },
    "thumb-cafe": {
      name: "Cafe thumb",
      description: "Thumbnail for cafe templates.",
    },
    "thumb-hotel": {
      name: "Hotel thumb",
      description: "Thumbnail for hotel templates.",
    },
    "thumb-retail": {
      name: "Retail thumb",
      description: "Thumbnail for retail templates.",
    },
    "thumb-business": {
      name: "Business thumb",
      description: "Thumbnail for business templates.",
    },
    "thumb-event": {
      name: "Event thumb",
      description: "Thumbnail for event templates.",
    },
    "thumb-wifi": {
      name: "WiFi thumb",
      description: "Thumbnail for WiFi templates.",
    },
    "thumb-menu": {
      name: "Menu thumb",
      description: "Thumbnail for menu templates.",
    },
    "thumb-review": {
      name: "Review thumb",
      description: "Thumbnail for review templates.",
    },
  },
  seo: {
    generator: {
      title: "Free QR Code Generator — No Signup",
      description:
        "Free QR code generator in your browser—no signup. Create static codes for URLs, WiFi, vCard, WhatsApp, LINE, menus, and more, then customize and download instantly.",
      h1: "Free QR code generator — no signup",
      introduction:
        "Create a practical, static QR code in your browser for free. Choose the content type, enter the details, customize the visual design, and test the live preview before sharing it.",
      howTo: [
        "Choose the QR type that matches what people should do after scanning.",
        "Enter the required details and review the live preview.",
        "Customize colors, eyes, logo, frame, size, and error correction, then test-scan it.",
      ],
      faqs: [
        {
          question: "Do I need an account to create a static QR code?",
          answer:
            "No. Static QR code creation is available without signing in and the entered content is not saved.",
        },
        {
          question: "What can I encode?",
          answer:
            "You can create codes for URLs, plain text, WiFi, email, phone, SMS, vCard contacts, WhatsApp, LINE, Google review links, locations, events, Telegram, and social profiles. For many URL codes at once, use the bulk CSV generator.",
        },
      ],
    },
    bulk: {
      title: "Bulk QR Code Generator — CSV Upload, Up to 50 Codes",
      description:
        "Create many URL QR codes at once from a CSV file. Apply one design, preview rows, and download a ZIP of PNG files in your browser — no signup.",
      h1: "Bulk QR code generator from CSV",
      introduction:
        "Upload a spreadsheet of links, customize the visual design once, and export up to fifty ready-to-print QR codes as PNG files in a single ZIP download.",
      howTo: [
        "Prepare a CSV with url, filename, and optional label columns, then upload it.",
        "Pick a template or customize colors, logo, frame, and size for the whole batch.",
        "Review valid rows and download the ZIP when you are ready to print or share.",
      ],
      faqs: [
        {
          question: "What CSV format should I use?",
          answer:
            "Use a header row with url, filename, and optional label. Each row becomes one QR code. The label becomes the frame text when your design uses a label frame.",
        },
        {
          question: "Is there a limit on how many codes I can create?",
          answer:
            "Each batch supports up to 50 URL QR codes so export stays fast and reliable on everyday devices, including phones and laptops with about 4 GB of RAM.",
        },
        {
          question: "Do you store my CSV or QR codes?",
          answer:
            "No. Parsing, rendering, and ZIP creation run entirely in your browser. Nothing is uploaded to our servers for bulk export.",
        },
        {
          question: "Can I use the same design for every code?",
          answer:
            "Yes. Pick one template or customize colors, logo, and frame once — the design applies to the entire batch. Use the label column to vary frame text per row.",
        },
        {
          question: "What file format do I get?",
          answer:
            "A ZIP archive of PNG images. Each PNG composites the QR code with your selected frame, label, and background when enabled.",
        },
      ],
    },
    qr: {
      url: {
        title: "URL QR Code Generator",
        description:
          "Create a free URL QR code for a website, landing page, menu, or campaign link. Customize it and preview it instantly.",
        h1: "Create a QR code for any URL",
        introduction:
          "Turn a web address into a scannable QR code that helps people reach a page without typing a long link. It is useful for posters, product packaging, business cards, event signs, and printed menus.",
        howTo: [
          "Paste a complete website address, including https://.",
          "Check the live QR preview and adjust its appearance if needed.",
          "Test-scan the code with a phone before using it in print.",
        ],
        faqs: [
          {
            question: "Will this QR code expire?",
            answer:
              "No. A static URL QR code continues to work as long as the linked website remains available.",
          },
          {
            question: "Can I change the destination later?",
            answer:
              "A static QR code cannot be changed after it is printed. If you need an editable destination, switch to Dynamic mode in the generator or open our Dynamic QR guide.",
          },
        ],
      },
      wifi: {
        title: "WiFi QR Code Generator",
        description:
          "Create a free WiFi QR code so guests can join your network without typing the password. Supports WPA, WEP, and open networks.",
        h1: "Share WiFi access with a QR code",
        introduction:
          "Let guests connect to a wireless network by scanning a code instead of reading or entering a password. This is especially helpful for cafés, homes, hotels, and reception desks.",
        howTo: [
          "Enter the WiFi network name exactly as it appears on a device.",
          "Select the matching security type and enter the password, if one is required.",
          "Scan it on a phone near the network to confirm the connection prompt.",
        ],
        faqs: [
          {
            question: "Does the QR code reveal my WiFi password?",
            answer:
              "The password is encoded in the QR data, so only share the code with people who may access the network.",
          },
          {
            question: "Which security type should I choose?",
            answer:
              "Most modern networks use WPA or WPA2. Choose WEP only for older networks, or No password for open networks.",
          },
        ],
      },
      email: {
        title: "Email QR Code Generator",
        description:
          "Create a free email QR code with a recipient, optional subject, and message. Make contacting your business faster from print materials.",
        h1: "Start an email with a QR code",
        introduction:
          "An email QR code opens the scanner’s email app with the recipient already filled in. Add a suggested subject or message to make enquiries, support requests, and event RSVPs easier to send.",
        howTo: [
          "Enter the email address that should receive messages.",
          "Optionally add a subject and a short starter message.",
          "Scan the preview and confirm that the mail app opens with the intended details.",
        ],
        faqs: [
          {
            question: "Will scanning send an email automatically?",
            answer:
              "No. It only opens a prepared email draft; the visitor reviews it and chooses whether to send.",
          },
          {
            question: "Can I include a message?",
            answer:
              "Yes. A subject and message are optional and can help guide the person contacting you.",
          },
        ],
      },
      phone: {
        title: "Phone Number QR Code Generator",
        description:
          "Create a free phone QR code that opens a call prompt when scanned. Ideal for storefronts, service vehicles, and printed promotions.",
        h1: "Make a phone call from a QR code",
        introduction:
          "A phone QR code launches the dialer with your number ready to call. It shortens the path between seeing a printed message and speaking with your business or service team.",
        howTo: [
          "Enter the phone number, preferably with its country code.",
          "Review the live preview after changing the number or styling.",
          "Scan with a phone to check that the correct number appears in the dialer.",
        ],
        faqs: [
          {
            question: "Does scanning call the number immediately?",
            answer: "No. The phone opens a call screen and the visitor confirms the call.",
          },
          {
            question: "Should I use a country code?",
            answer:
              "Yes. Including a country code helps the code work reliably for international visitors.",
          },
        ],
      },
      sms: {
        title: "SMS QR Code Generator",
        description:
          "Create a free SMS QR code with a recipient and optional prefilled message. Help customers start a text conversation with one scan.",
        h1: "Start an SMS message with a QR code",
        introduction:
          "An SMS QR code opens a text-message draft addressed to your chosen number. Use it for appointment requests, simple orders, support questions, or an easy way to reply to a promotion.",
        howTo: [
          "Enter the mobile number, including the country code where appropriate.",
          "Add an optional message that visitors can edit before sending.",
          "Scan the QR code to verify that the message app opens correctly.",
        ],
        faqs: [
          {
            question: "Will the QR code send a text automatically?",
            answer: "No. It prepares a message; the visitor decides whether to send it.",
          },
          {
            question: "Can visitors change the prefilled message?",
            answer: "Yes. The text remains editable in the messaging app.",
          },
        ],
      },
      vcard: {
        title: "vCard QR Code Generator",
        description:
          "Create a free vCard QR code that saves your name, phone, email, and website to a phone contact list. Ideal for business cards and networking events.",
        h1: "Share a digital contact card with a QR code",
        introduction:
          "A vCard QR code lets someone add your contact details with one scan. Put it on a business card, badge, or booth sign so people save the right phone number and email without retyping.",
        howTo: [
          "Enter at least a first or last name for the contact card.",
          "Add optional organization, phone, email, and website details.",
          "Scan the preview and confirm the phone offers to save the contact.",
        ],
        faqs: [
          {
            question: "Will every phone save the contact the same way?",
            answer:
              "Most phones understand vCard 3.0, but the save screen can differ by device and camera app.",
          },
          {
            question: "Can I update the details after printing?",
            answer:
              "No. This is a static QR code. If your details change, create and print a new code.",
          },
        ],
      },
      whatsapp: {
        title: "WhatsApp QR Code Generator",
        description:
          "Create a free WhatsApp QR code that opens a chat with your number and an optional prefilled message. Great for support desks and storefronts.",
        h1: "Start a WhatsApp chat from a QR code",
        introduction:
          "A WhatsApp QR code opens wa.me with your number ready. Add a short starter message so customers can ask about hours, orders, or bookings without hunting for your chat handle.",
        howTo: [
          "Enter the WhatsApp number with country code.",
          "Optionally add a message visitors can edit before sending.",
          "Scan the preview and confirm WhatsApp opens the intended chat.",
        ],
        faqs: [
          {
            question: "Does scanning send a WhatsApp message automatically?",
            answer: "No. It opens a chat draft; the visitor chooses whether to send.",
          },
          {
            question: "Do I need the plus sign in the phone number?",
            answer:
              "Include the country code. Formatting spaces are removed automatically before building the wa.me link.",
          },
        ],
      },
      line: {
        title: "LINE QR Code Generator",
        description:
          "Create a free LINE QR code for a LINE ID, Official Account, or profile URL. Help customers add you on LINE from print materials.",
        h1: "Open a LINE profile with a QR code",
        introduction:
          "LINE is widely used across Thailand and East Asia. Encode an Official Account (@handle), LINE ID, or full line.me link so scanners can add your chat without typing the ID.",
        howTo: [
          "Enter an @Official Account, LINE ID, or paste a full https://line.me URL.",
          "Check the live preview after changing the ID or design.",
          "Scan with a phone that has LINE installed to confirm the profile opens.",
        ],
        faqs: [
          {
            question: "What should I enter for an Official Account?",
            answer: "Use the @handle format, for example @yourshop, or paste the official LINE invite URL.",
          },
          {
            question: "Does the scanner need the LINE app?",
            answer:
              "Yes. Opening a LINE profile requires the LINE app on the device that scans the code.",
          },
        ],
      },
      "google-review": {
        title: "Google Review QR Code Generator",
        description:
          "Create a free Google review QR code from your Maps or review share link. Make it easy for customers to leave feedback after a visit.",
        h1: "Collect Google reviews with a QR code",
        introduction:
          "Place a review QR code on receipts, table tents, or checkout counters. Customers scan and land on your Google review or Maps page without searching for your business name.",
        howTo: [
          "Copy your Google review or Maps share URL from Google Business Profile.",
          "Paste the full https link into the generator.",
          "Test-scan the code and confirm the review page opens before printing.",
        ],
        faqs: [
          {
            question: "Where do I find my Google review link?",
            answer:
              "Open Google Business Profile or Google Maps, then copy the share or “Ask for reviews” link provided for your location.",
          },
          {
            question: "Is this a dynamic QR code?",
            answer:
              "No. The review URL is encoded directly in a static QR code. If the link changes, create a new code or see our Dynamic QR page for editable destinations.",
          },
        ],
      },
      dynamic: {
        title: "Dynamic QR Code Generator — Edit After Print",
        description:
          "Create Dynamic QR codes on genmyqrcode.com. Change the destination URL after printing, pause campaigns, and view scan counts—free, no account required.",
        h1: "Dynamic QR codes you can update later",
        introduction:
          "A Dynamic QR code points to a short link on genmyqrcode.com (for example /r/yourCode). Scanners open your current destination URL. You can change that URL, pause the code, or check scan counts without reprinting posters, menus, or packaging. Static QR codes still encode content directly in the image and stay ideal for WiFi, vCard, and forever links that never need editing.",
        howTo: [
          "Open the QR generator and switch to Dynamic mode.",
          "Enter an http or https destination URL (optional label helps you recognize the code later), then create the Dynamic QR.",
          "Customize the design if you like, download the image, and print it—the QR encodes the short link, not the final website URL.",
          "To edit later, open the manage page with your manage token (saved in this browser). Update the destination, pause or reactivate, and review scan counts.",
        ],
        faqs: [
          {
            question: "What is the difference between static and Dynamic QR?",
            answer:
              "Static QR stores the payload inside the image. Dynamic QR stores a short redirect URL on genmyqrcode.com so you can edit the destination after printing. Use static for WiFi, vCard, or permanent links; use Dynamic for campaigns and menus that change.",
          },
          {
            question: "Do I need an account?",
            answer:
              "No. Ownership uses a manage token stored in your browser. Copy and keep that token if you may edit from another device—we cannot recover a lost token. A full account system may arrive later.",
          },
          {
            question: "Where does the short link go?",
            answer:
              "Printed Dynamic codes use https://genmyqrcode.com/r/{code}. That path redirects (HTTP 302) to your current destination. If you pause a code, scanners receive a gone response until you activate it again.",
          },
          {
            question: "Is the QR creator still ad-free?",
            answer:
              "Yes. Ads may appear on educational SEO pages around the tool, but the QR creator surface itself stays ad-free.",
          },
          {
            question: "Can Dynamic QR encode WiFi or vCard?",
            answer:
              "Not via HTTP redirect. Dynamic mode supports http and https destinations only. Use static mode for WiFi, vCard, SMS, and similar payloads.",
          },
        ],
      },
      youtube: {
        title: "YouTube QR Code Generator — Free Channel & Video Link",
        description:
          "Create a free YouTube QR code for your channel or video. Enter a handle or URL, customize the design, and download a static QR in your browser.",
        h1: "YouTube QR code generator",
        introduction:
          "Point phones straight to your YouTube channel or video with a static QR code. Paste a full YouTube URL or enter a @handle—we build the link in your browser with nothing saved on a server.",
        howTo: [
          "Open this page and keep Social → YouTube selected in the generator.",
          "Enter your @handle or paste a youtube.com / youtu.be URL.",
          "Customize colors or a frame if you like, then download PNG or SVG and test-scan before printing.",
        ],
        faqs: [
          {
            question: "Can I link a specific video?",
            answer: "Yes. Paste the full video URL. Handles map to youtube.com/@yourname channel pages.",
          },
          {
            question: "Is this a Dynamic QR?",
            answer:
              "No. The YouTube link is stored in the image. To change the destination later without reprinting, use Dynamic mode with an https URL.",
          },
        ],
      },
      tiktok: {
        title: "TikTok QR Code Generator — Free Profile Link",
        description:
          "Make a free TikTok QR code for your profile. Enter a username or URL, style the code, and download instantly—no signup.",
        h1: "TikTok QR code generator",
        introduction:
          "Help people follow you on TikTok by scanning a static QR. Use a username or paste a full TikTok profile URL; the payload stays in the image.",
        howTo: [
          "Keep Social → TikTok selected.",
          "Enter your username (with or without @) or paste a tiktok.com profile URL.",
          "Download and test-scan the code before you print stickers or posters.",
        ],
        faqs: [
          {
            question: "Does the QR open the TikTok app?",
            answer: "Phones usually open the TikTok app or the mobile site from the https profile link encoded in the QR.",
          },
          {
            question: "Can I change the profile later?",
            answer: "Not with a static code. Create a new QR, or use Dynamic mode if you need an editable redirect.",
          },
        ],
      },
      linkedin: {
        title: "LinkedIn QR Code Generator — Free Profile Link",
        description:
          "Create a free LinkedIn QR code for networking cards and events. Enter a profile URL or vanity name and download a static QR.",
        h1: "LinkedIn QR code generator",
        introduction:
          "Share your LinkedIn profile without typing a long URL. Static QR codes work well on business cards, badges, and booth materials.",
        howTo: [
          "Keep Social → LinkedIn selected.",
          "Paste your LinkedIn profile URL or enter the vanity path name after /in/.",
          "Download PNG or SVG and test-scan before printing business cards.",
        ],
        faqs: [
          {
            question: "What should I enter if I only have a profile URL?",
            answer: "Paste the full https://www.linkedin.com/in/... link. That is the most reliable option.",
          },
          {
            question: "Is company page supported?",
            answer: "Yes—paste the full company page URL. Username shortcuts target personal /in/ profiles.",
          },
        ],
      },
      snapchat: {
        title: "Snapchat QR Code Generator — Free Add Link",
        description:
          "Create a free Snapchat QR code that opens an add link. Enter a username or URL and download a static code in your browser.",
        h1: "Snapchat QR code generator",
        introduction:
          "Let friends add you on Snapchat by scanning a printed or on-screen QR. We encode a snapchat.com/add link as a static payload.",
        howTo: [
          "Keep Social → Snapchat selected.",
          "Enter your Snapchat username or paste an add URL.",
          "Customize the look if needed, then download and test-scan.",
        ],
        faqs: [
          {
            question: "Is this the same as Snapchat’s in-app Snapcode?",
            answer:
              "No. This creates a standard QR that opens a web add link. Snapchat’s yellow Snapcode is a different format from inside the app.",
          },
          {
            question: "Do I need an account on Build Your QR?",
            answer: "No. Generation stays in your browser and nothing is uploaded.",
          },
        ],
      },
      reddit: {
        title: "Reddit QR Code Generator — Free Profile or Community",
        description:
          "Create a free Reddit QR code for a user profile or subreddit. Enter u/name, r/community, or a full URL and download instantly.",
        h1: "Reddit QR code generator",
        introduction:
          "Send scanners to a Reddit profile or community with a static QR. Use r/subreddit, a username, or paste any reddit.com URL.",
        howTo: [
          "Keep Social → Reddit selected.",
          "Enter r/community, a username, or paste a full Reddit URL.",
          "Download the QR and test-scan before sharing on print or slides.",
        ],
        faqs: [
          {
            question: "How do I link a subreddit?",
            answer: "Type r/yourcommunity (for example r/qrcode) or paste the full subreddit URL.",
          },
          {
            question: "Can the link change after printing?",
            answer: "Static codes cannot change. Use Dynamic mode if you need an editable destination.",
          },
        ],
      },
      discord: {
        title: "Discord QR Code Generator — Free Invite Link",
        description:
          "Create a free Discord QR code for server invites. Enter an invite code or discord.gg URL and download a static QR.",
        h1: "Discord QR code generator",
        introduction:
          "Grow your Discord community with a scannable invite. Encode a discord.gg invite as a static QR for posters, Twitch panels, or event badges.",
        howTo: [
          "Keep Social → Discord selected.",
          "Paste a discord.gg / discord.com invite URL, or enter the invite code only.",
          "Download and test-scan; replace the QR if you rotate invite links.",
        ],
        faqs: [
          {
            question: "What if my invite expires?",
            answer:
              "Static QR codes keep the old invite. Create a new QR with a fresh invite, or use Dynamic mode to update the destination without reprinting.",
          },
          {
            question: "Can I encode a Discord username?",
            answer: "This tool targets invite links. Paste a full invite URL for the most reliable result.",
          },
        ],
      },
      spotify: {
        title: "Spotify QR Code Generator — Free Profile & Playlist",
        description:
          "Create a free Spotify QR code for an artist, user, or playlist. Paste an open.spotify.com link or enter a username and download.",
        h1: "Spotify QR code generator",
        introduction:
          "Share music with a scan. Paste any open.spotify.com link for the most accurate result, or enter a username to build a profile URL.",
        howTo: [
          "Keep Social → Spotify selected.",
          "Paste a Spotify track, playlist, artist, or profile URL (recommended), or enter a username.",
          "Download PNG or SVG and test-scan on a phone with Spotify installed.",
        ],
        faqs: [
          {
            question: "Should I paste the full Spotify link?",
            answer: "Yes when possible. Full open.spotify.com URLs are the most reliable for playlists and tracks.",
          },
          {
            question: "Does scanning require the Spotify app?",
            answer: "The QR opens an https link. Phones may hand off to the Spotify app when it is installed.",
          },
        ],
      },
      soundcloud: {
        title: "SoundCloud QR Code Generator — Free Profile Link",
        description:
          "Create a free SoundCloud QR code for your profile or track page. Paste a URL or username and download a static QR.",
        h1: "SoundCloud QR code generator",
        introduction:
          "Point fans to your SoundCloud with a static QR on flyers or merch. Paste a full soundcloud.com URL or enter a profile username.",
        howTo: [
          "Keep Social → SoundCloud selected.",
          "Enter your username or paste a SoundCloud profile or track URL.",
          "Customize design if you like, then download and test-scan.",
        ],
        faqs: [
          {
            question: "Can I link a single track?",
            answer: "Yes—paste the full track URL. Username shortcuts build a profile URL.",
          },
          {
            question: "Is the QR editable after print?",
            answer: "No for static codes. Use Dynamic mode if you need to change the destination later.",
          },
        ],
      },
      kakaotalk: {
        title: "KakaoTalk QR Code Generator — Free Open Chat Link",
        description:
          "Create a free KakaoTalk QR code for Open Chat or profile links. Paste a Kakao URL or enter an open chat id and download.",
        h1: "KakaoTalk QR code generator",
        introduction:
          "Help customers open KakaoTalk with one scan. Encode an open.kakao.com link as a static QR—ideal alongside LINE for Korea-focused materials.",
        howTo: [
          "Keep Social → KakaoTalk selected.",
          "Paste an open.kakao.com URL or enter the open chat id segment.",
          "Download and test-scan with a phone that has KakaoTalk installed.",
        ],
        faqs: [
          {
            question: "Is this the same as LINE QR?",
            answer: "No. Use the LINE tool for LINE IDs, and this page for KakaoTalk open links.",
          },
          {
            question: "Do I need a Kakao business account?",
            answer: "You only need a valid KakaoTalk link to encode. Build Your QR does not create Kakao chats for you.",
          },
        ],
      },
      payment: {
        title: "Payment QR Code Generator — PayPal, Venmo, Etsy & More",
        description:
          "Create a free payment QR code for PayPal, Venmo, Etsy, Revolut, Amazon, or crypto links. Static codes download in your browser—no signup.",
        h1: "Payment QR code generator",
        introduction:
          "Accept payments or send shoppers to a storefront with a static QR. Choose PayPal, Venmo, Etsy, Revolut, Amazon, or Crypto, then enter a username or paste a full payment URL. We do not process payments—only encode the link you provide.",
        howTo: [
          "Select Payment in the generator and pick a provider.",
          "Enter a username (PayPal.me, Venmo, Etsy shop, Revolut) or paste a full https payment/store URL. Amazon and crypto need a full URL or bitcoin: URI.",
          "Download the QR, test-scan with the matching app, and print only after the payment page opens correctly.",
        ],
        faqs: [
          {
            question: "Does Build Your QR take payments?",
            answer:
              "No. The QR only encodes a link or payment URI you supply. Checkout happens on PayPal, Venmo, the store, or the wallet app.",
          },
          {
            question: "Can I change the payment link after printing?",
            answer:
              "Not with a static QR. Create a new code, or use Dynamic mode with an https destination you can edit later.",
          },
          {
            question: "Is UPI or PIX supported?",
            answer:
              "Paste a full payment URL or URI via Payment → Crypto/Amazon-style full link, or use the URL type. Dedicated UPI/PIX builders may come later.",
          },
        ],
      },
    },
    templatesIndex: {
      title: "QR Code Templates",
      description:
        "Browse curated QR code templates for restaurants, cafes, hotels, menus, WiFi sharing, and more. Preview a design, enter your content, and download a composite QR.",
      h1: "QR code templates for real-world use",
      introduction:
        "Start from a ready-made visual style instead of blank colors. Each template applies colors, frames, logos, and backgrounds you can still customize before downloading.",
      body: [
        "Templates are curated for common print and countertop moments: menus, guest WiFi, storefront signs, and review prompts.",
        "Selecting a template only changes the visual design. Your URL, WiFi details, or message stay under your control.",
        "All assets in this release are local demo placeholders so you can swap brand artwork later without changing the data model.",
      ],
      howTo: [
        "Open a category that matches your use case, or browse all templates on this page.",
        "Select a template to apply its design to the generator.",
        "Enter the QR content, adjust colors or logos if needed, then download the composite PNG.",
      ],
      faqs: [
        {
          question: "Are these templates free to use?",
          answer:
            "Yes. The generator creates static QR codes in your browser. Demo images are placeholders you can replace with your own assets.",
        },
        {
          question: "Will choosing a template change my QR destination?",
          answer:
            "No. Templates only apply visual settings such as colors, frames, logos, and backgrounds.",
        },
      ],
    },
    templates: {
      restaurant: {
        title: "Restaurant QR Code Templates",
        description:
          "Warm restaurant QR templates for menus, table tents, and reservation links. Customize colors and download a ready-to-print static code.",
        h1: "Restaurant QR templates",
        introduction:
          "Give diners a scannable path to your menu, booking page, or specials board. These templates use warm dining tones and clear frame labels suited to tabletop print.",
        body: [
          "Restaurant templates default to high-contrast warm colors that remain readable on cream paper stock.",
          "Pair a menu URL with the Warm Table template, then replace the demo logo with your brand mark before printing.",
          "Keep the destination URL stable — static QR codes cannot be redirected later without reprinting.",
        ],
        howTo: [
          "Choose the Warm Table restaurant template.",
          "Switch the QR type to URL and paste your menu or booking link.",
          "Download the composite PNG and test-scan it before sending to print.",
        ],
        faqs: [
          {
            question: "What should a restaurant QR link to?",
            answer: "A digital menu, reservation form, or today’s specials page works best.",
          },
          {
            question: "Can I keep the frame text in my language?",
            answer: "Yes. Edit the frame text in the designer after applying the template.",
          },
        ],
      },
      cafe: {
        title: "Cafe QR Code Templates",
        description:
          "Fresh cafe QR templates for loyalty links, menus, and countertop WiFi. Preview instantly and download a composite static QR code.",
        h1: "Cafe QR templates",
        introduction:
          "Cafe counters need codes that look friendly and scan quickly. These mint-toned templates work for loyalty sign-ups, drinks menus, and guest WiFi cards.",
        body: [
          "Morning Brew uses teal accents and rounded dots that feel informal without sacrificing scan reliability.",
          "Use a short HTTPS landing page rather than a long social URL when possible.",
          "If you add a logo, leave error correction on High so cups and soft lighting do not break scans.",
        ],
        howTo: [
          "Select the Morning Brew cafe template.",
          "Enter your loyalty or menu URL.",
          "Adjust the logo size if needed, then download and place the code near the register.",
        ],
        faqs: [
          {
            question: "Can I use the same template for WiFi?",
            answer: "Yes. Apply the template, switch the QR type to WiFi, and fill in network details.",
          },
          {
            question: "Do cafe templates include real coffee photos?",
            answer: "No. This phase ships local placeholder artwork you can replace later.",
          },
        ],
      },
      hotel: {
        title: "Hotel QR Code",
        description:
          "Create a hotel QR code for guest WiFi, concierge links, and lobby stands. Apply a hospitality-ready look and download a print-ready static code.",
        h1: "Hotel QR codes",
        introduction:
          "Hotels often need polished hotel QR codes for room cards and lobby desks. Lobby Blue keeps a calm navy palette while remaining easy to scan under indoor lighting.",
        body: [
          "Use hotel templates for guest WiFi, house directory pages, or upsell experiences such as spa bookings.",
          "Room cards benefit from the label frame so guests know what the code does before scanning.",
          "Always verify the destination on a phone before mass-printing key packets.",
        ],
        howTo: [
          "Apply the Lobby Blue hotel template.",
          "Choose WiFi or URL depending on the guest journey.",
          "Download the composite PNG and include it on room collateral.",
        ],
        faqs: [
          {
            question: "Should hotels encode WiFi passwords in QR codes?",
            answer:
              "Only for guest networks you intend to share. Anyone with the printed code can read the password from the QR payload.",
          },
          {
            question: "Can I change the hotel logo?",
            answer: "Yes. Replace the preset logo with your brand mark in the designer.",
          },
        ],
      },
      menu: {
        title: "QR Menu Design Templates",
        description:
          "Design a menu QR code for restaurants and cafes. Apply a readable board style, link your digital menu URL, and download a print-ready static code.",
        h1: "QR menu design templates",
        introduction:
          "Menu QR design should stay readable from a table edge and obvious in purpose. Board Specials uses a clear border and leafy green palette suited to printed menus.",
        body: [
          "Link to a mobile-friendly menu page that loads quickly on cellular networks.",
          "Avoid putting the entire menu text inside the QR payload — use a URL instead.",
          "If you laminate the print, leave quiet space around the code so reflections do not hide the edges.",
        ],
        howTo: [
          "Select the Board Specials menu template.",
          "Paste the HTTPS link to your digital menu.",
          "Download the PNG and place it near the top of the printed menu.",
        ],
        faqs: [
          {
            question: "Can one menu QR serve multiple languages?",
            answer: "Yes. Point it to a landing page that lets guests choose a language.",
          },
          {
            question: "Will updating the online menu break the QR?",
            answer: "No, as long as the URL stays the same.",
          },
        ],
      },
      wifi: {
        title: "WiFi QR Code Templates",
        description:
          "Guest WiFi QR templates for cafes, hotels, and offices. Apply Guest Access styling, enter network details, and download a composite static QR.",
        h1: "WiFi QR templates",
        introduction:
          "Sharing WiFi with a QR code removes password typos at the front desk. Guest Access pairs a clear signal mark with a label frame that says exactly what to scan.",
        body: [
          "Enter the SSID exactly as devices list it, including capitalization and spaces.",
          "Prefer WPA/WPA2 for modern networks; open networks should use the No password option.",
          "Print the downloaded composite with enough quiet space so the frame and code remain distinct.",
        ],
        howTo: [
          "Apply the Guest Access WiFi template.",
          "Switch the QR type to WiFi and enter network name, security, and password.",
          "Download the PNG and test it on a phone near the access point.",
        ],
        faqs: [
          {
            question: "Is the WiFi password stored on your servers?",
            answer:
              "No. Static WiFi QR creation happens in the browser and is not saved by this app.",
          },
          {
            question: "Can I hide the password while typing?",
            answer:
              "Yes. Use the show/hide control on the password field, then download when ready.",
          },
        ],
      },
    },
  },
};
