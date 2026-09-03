import type { CompanyDocument } from "@/lib/company/types";

// Change: English company copy for the About and Contact pages (Phase D trust).
export const companyEn: Record<CompanyDocument["slug"], CompanyDocument> = {
  about: {
    slug: "about",
    title: "About Us",
    description:
      "About genmyQRCode.com — operated by Narote Nilsukhum in Thailand. A free, privacy-first QR code generator for real-world print and menus.",
    introduction:
      "genmyQRCode.com is a free QR code generator that runs in your browser. It is operated by Narote Nilsukhum in Thailand so anyone can create a clean, scannable QR code for a menu, WiFi network, contact card, or promotion — without installing software for static codes.",
    websiteLabel: "Website",
    operator: {
      name: "Narote Nilsukhum",
      role: "Founder and operator",
      location: "Thailand",
      nameLabel: "Operator",
      roleLabel: "Role",
      locationLabel: "Location",
    },
    email: { label: "Support email", address: "support@genmyqrcode.com" },
    sections: [
      {
        title: "Who runs this site",
        paragraphs: [
          "genmyQRCode.com is built and operated by Narote Nilsukhum (Thailand). There is a real person behind the product — not only a brand name — who maintains the generator, hosting, and support inbox.",
          "For questions, bug reports, or feature ideas, use the Contact page or email support@genmyqrcode.com. We aim to reply within a few business days.",
        ],
      },
      {
        title: "What we do",
        paragraphs: [
          "We provide static QR codes for URLs, plain text, WiFi access, email, phone numbers, SMS, vCard, WhatsApp, LINE, Google reviews, and more. You can customize colors, styles, logos, and frames, then download a ready-to-print PNG.",
          "Static QR content is generated on your device and is not uploaded to our servers. Dynamic QR (when enabled with an account) stores short links so destinations can change after printing.",
        ],
      },
      {
        title: "Our privacy-first approach",
        paragraphs: [
          "Static generation does not require sign-up. We do not ask for your name or email to download a static PNG. Content you type for static codes stays in your browser.",
        ],
        bullets: [
          "No account required for static QR downloads",
          "Static QR content is processed client-side and not saved on our servers",
          "We do not sell your personal information",
        ],
      },
      {
        title: "Why the core tool is free",
        paragraphs: [
          "The generator is free because we want it useful for as many people as possible. Hosting and maintenance may be supported by unobtrusive advertising on selected pages. Legal pages and trust information stay easy to find in the site footer.",
        ],
      },
      {
        title: "Policies",
        paragraphs: [
          "Please read our Privacy Policy and Terms of Service for how we handle data and acceptable use. Both are linked in the footer on every page.",
        ],
      },
    ],
  },
  contact: {
    slug: "contact",
    title: "Contact Us",
    description:
      "Contact Narote Nilsukhum / genmyQRCode.com support at support@genmyqrcode.com — send feedback, bug reports, or questions about the QR generator.",
    introduction:
      "Have a question, found a bug, or want to suggest a feature? Email support@genmyqrcode.com or use the form below. Messages go to the operator of genmyQRCode.com, Narote Nilsukhum.",
    websiteLabel: "Website",
    email: { label: "Email us directly", address: "support@genmyqrcode.com" },
    form: {
      title: "Send a message",
      intro:
        "Fill in your message (and optional reply email). Your email app opens with a draft to support@genmyqrcode.com — review it before sending.",
      emailLabel: "Your email (optional)",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message",
      messagePlaceholder: "What happened, or what would you like help with?",
      send: "Open email to send",
      messageRequired: "Enter a message before sending.",
      mailtoHint: "Sending opens your email app addressed to support@genmyqrcode.com.",
      mailSubject: "genmyQRCode.com contact",
      replyLine: "Reply to",
    },
    sections: [
      {
        title: "How to reach us",
        paragraphs: [
          "The fastest way is email to support@genmyqrcode.com, or the form on this page which opens a pre-filled draft in your mail app. Include enough detail so we can help without a long back-and-forth.",
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
          "We typically reply within a few business days. Questions about accounts, billing, or advertising may take a little longer.",
        ],
      },
      {
        title: "Legal",
        paragraphs: [
          "For data practices and site rules, see the Privacy Policy and Terms of Service linked in the footer.",
        ],
      },
    ],
  },
};
