import type { LegalDocuments } from "@/lib/legal/types";

// Change: English legal copy translated from the supplied policy documents.
export const legalEn: LegalDocuments = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How genmyQRCode.com handles QR content, technical data, cookies, advertising, and privacy rights.",
    introduction:
      'genmyQRCode.com ("we", "us", or "this website") respects your privacy. This policy explains how information is handled when you use our QR code generator.',
    websiteLabel: "Website",
    updatedLabel: "Last updated",
    updatedDate: "August 21, 2026",
    sections: [
      {
        title: "1. Information entered to create QR codes",
        paragraphs: [
          "Content you enter to create a QR code, including URLs, text, WiFi credentials, email addresses, phone numbers, and SMS messages, is processed only in your browser (client-side). We do not save this content on our servers or send it to third parties for unrelated purposes.",
          "If server-side features are added later, such as dynamic QR codes with scan analytics, we will update this policy before those features are introduced.",
        ],
      },
      {
        title: "2. Information collected automatically",
        paragraphs: [
          "When you visit the website, we and service providers such as Google may automatically receive limited technical information.",
        ],
        bullets: [
          "Approximate IP address and country or region",
          "Browser and device type",
          "Pages visited and time spent",
          "Referring website or traffic source",
        ],
      },
      {
        title: "3. Cookies and advertising",
        paragraphs: [
          "This website may use Google AdSense. Google and its partners may use cookies, web beacons, or similar technologies to show relevant ads, measure ad performance, and prevent invalid traffic.",
          "Google may use advertising cookies based on visits to this and other websites. You can manage personalized advertising through Google Ads Settings. You can also disable cookies in your browser, although some website features may not work as expected.",
        ],
        links: [
          { label: "Google Ads Settings", href: "https://adssettings.google.com/" },
          { label: "Google advertising technologies policy", href: "https://policies.google.com/technologies/ads" },
        ],
      },
      {
        title: "4. Analytics",
        paragraphs: [
          "We may use analytics services such as Google Analytics to understand aggregate website usage. Analytics information is intended to be aggregated or anonymized and not used to identify you directly.",
        ],
      },
      {
        title: "5. Sharing with third parties",
        paragraphs: [
          "We do not sell, rent, or trade your personal information for third-party marketing. Information may be shared only with providers needed to operate the website, such as hosting, advertising, and analytics providers, under their respective privacy policies.",
        ],
      },
      {
        title: "6. Your privacy rights",
        paragraphs: [
          "Depending on the law that applies to you, including Thailand's PDPA or the EU GDPR, you may have privacy rights.",
        ],
        bullets: [
          "Request access to information related to you",
          "Request correction or deletion",
          "Object to processing for advertising",
          "Withdraw cookie consent where applicable",
        ],
      },
      {
        title: "7. Data security",
        paragraphs: [
          "We use reasonable technical measures, including HTTPS, to protect information in transit. No internet service is completely secure, so absolute security cannot be guaranteed.",
        ],
      },
      {
        title: "8. Children's privacy",
        paragraphs: [
          "This website is not intended for children under 13, and we do not knowingly collect personal information from children under 13.",
        ],
      },
      {
        title: "9. Policy changes",
        paragraphs: [
          "We may update this policy from time to time. Changes take effect when posted on this page together with a revised last-updated date.",
        ],
      },
      {
        title: "10. Contact us",
        paragraphs: ["Questions about this Privacy Policy can be sent to:"],
        links: [{ label: "support@genmyqrcode.com", href: "mailto:support@genmyqrcode.com" }],
      },
    ],
  },
  "terms-of-service": {
    slug: "terms-of-service",
    title: "Terms of Service",
    description: "The rules and responsibilities that apply when using the free genmyQRCode.com QR code generator.",
    introduction:
      'Please read these Terms of Service before using genmyQRCode.com ("we", "us", or "the website"). By accessing the website, you agree to these terms.',
    websiteLabel: "Website",
    updatedLabel: "Last updated",
    updatedDate: "August 21, 2026",
    sections: [
      {
        title: "1. Service description",
        paragraphs: [
          "The website provides a free static QR code generator for URLs, text, WiFi, email, phone numbers, and SMS. No account or sign-in is required.",
        ],
      },
      {
        title: "2. Acceptable use",
        paragraphs: ["You agree not to use the service to:"],
        bullets: [
          "Create QR codes that lead to illegal, harmful, deceptive, phishing, or rights-infringing content",
          "Distribute malware, viruses, or harmful code",
          "Place unreasonable automated or bot traffic on the website",
          "Violate laws that apply in your jurisdiction",
        ],
      },
      {
        title: "3. User responsibility",
        paragraphs: [
          "You are solely responsible for the accuracy, suitability, and legality of content encoded in your QR codes.",
          "You must test-scan every QR code before publishing or using it. Business uses, including menus, payments, and promotions, remain your responsibility.",
        ],
      },
      {
        title: "4. Intellectual property",
        paragraphs: [
          "Website logos, presets, backgrounds, templates, and design elements belong to the website or their licensors and may be used only as permitted by the QR tool.",
          "You may freely use QR codes generated from your own content. If you upload a logo or image, you confirm that you have the right to use it.",
        ],
      },
      {
        title: "5. No warranty",
        paragraphs: ['The service is provided "as is" without express or implied warranties. We do not guarantee that:'],
        bullets: [
          "Every QR code will scan on every device or application",
          "The website will always be uninterrupted or error-free",
          "External URLs encoded in a QR code will remain safe, correct, or available",
        ],
      },
      {
        title: "6. Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, we are not liable for direct, indirect, incidental, special, or consequential damage arising from use of, or inability to use, the website, including QR codes that fail or are misused.",
        ],
      },
      {
        title: "7. Third-party advertising",
        paragraphs: [
          "The website may display Google AdSense advertisements. Interaction with third-party ads is voluntary, and we are not responsible for the advertised content, products, or services.",
        ],
      },
      {
        title: "8. Service changes",
        paragraphs: [
          "We may improve, change, suspend, or discontinue any part of the service at any time, subject to applicable law.",
        ],
      },
      {
        title: "9. Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. Continued use after updated terms are posted means you accept the revised terms.",
        ],
      },
      {
        title: "10. Governing law",
        paragraphs: [
          "These terms are governed by the laws of Thailand, without regard to conflict-of-law principles.",
        ],
      },
      {
        title: "11. Contact us",
        paragraphs: ["Questions about these Terms of Service can be sent to:"],
        links: [{ label: "support@genmyqrcode.com", href: "mailto:support@genmyqrcode.com" }],
      },
    ],
  },
};
