import type { CompanyDocument } from "@/lib/company/types";

// Change: English company copy for the About and Contact pages.
export const companyEn: Record<CompanyDocument["slug"], CompanyDocument> = {
  about: {
    slug: "about",
    title: "About Us",
    description:
      "Meet the team behind genmyQRCode.com, a free and private QR code generator built for real-world use.",
    introduction:
      "genmyQRCode.com is a free QR code generator that runs entirely in your browser. We built it so anyone can create a clean, scannable QR code for a menu, WiFi network, contact card, or promotion without installing software or creating an account.",
    websiteLabel: "Website",
    sections: [
      {
        title: "What we do",
        paragraphs: [
          "We provide static QR codes for URLs, plain text, WiFi access, email, phone numbers, and SMS. You can customize colors, dot and eye styles, add a logo or frame, and download a ready-to-print PNG.",
          "Everything is generated on your device. Your QR content is never uploaded to or stored on our servers.",
        ],
      },
      {
        title: "Our privacy-first approach",
        paragraphs: [
          "We do not require sign-up, and we do not ask for your name, email, or account to use the generator. The content you enter stays in your browser and is processed locally.",
        ],
        bullets: [
          "No account or sign-in required",
          "QR content is processed client-side and never saved",
          "No selling or sharing of your personal information",
        ],
      },
      {
        title: "Why the core tool is free",
        paragraphs: [
          "The generator is free because it costs almost nothing to run and we want it to stay useful to as many people as possible. To cover hosting and maintenance, the website may display unobtrusive advertising on supporting pages. The QR creator itself stays ad-free.",
        ],
      },
      {
        title: "Get in touch",
        paragraphs: [
          "We welcome feedback, bug reports, and feature ideas. Use the contact page to reach us, and we will do our best to reply promptly.",
        ],
      },
    ],
  },
  contact: {
    slug: "contact",
    title: "Contact Us",
    description:
      "Get in touch with the genmyQRCode.com team for support, feedback, or questions about the QR code generator.",
    introduction:
      "Have a question, found a bug, or want to suggest a feature? We read every message and aim to respond as quickly as we can.",
    websiteLabel: "Website",
    email: { label: "Email us", address: "support@genmyqrcode.com" },
    sections: [
      {
        title: "How to reach us",
        paragraphs: [
          "The fastest way to reach us is by email. Send your message to the address above and include enough detail so we can help you without a long back-and-forth.",
        ],
      },
      {
        title: "What to include",
        paragraphs: ["To help us respond faster, please include:"],
        bullets: [
          "The page or QR type you were using",
          "Your browser and device, if reporting a bug",
          "A short description of what happened and what you expected",
        ],
      },
      {
        title: "Response time",
        paragraphs: [
          "We typically reply within a few business days. Support for account, billing, or advertising questions may take a little longer.",
        ],
      },
    ],
  },
};
