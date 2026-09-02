import { useCaseMeta } from "@/lib/seo/use-cases/catalog";
import type { UseCaseCopy, UseCasePage, UseCaseSlug } from "@/lib/seo/use-cases/types";

const copy: Record<UseCaseSlug, UseCaseCopy> = {
  "thai-restaurant-menu": {
    title: "QR Menu Design for Thai Restaurants",
    description:
      "Free QR menu design for Thai restaurants. Link a Google Sheet, PDF on Drive, or web menu—not an ordering system. Customize the frame and download a print-ready code.",
    h1: "QR menu design for Thai restaurants",
    introduction:
      "Design a scannable menu QR so guests open your Thai-language menu on their phone. This links to a digital menu page (Sheet, PDF, or website)—it does not take orders or replace POS systems like Yumzi or ThaiQROrder.",
    promise: "Free in the browser. No account. Sheet, Drive, and Thai frame labels supported.",
    body: [
      "Most Thai restaurants start with a Google Sheet, a PDF on Drive, or a simple menu page on their website. Paste that mobile-friendly link here, pick a menu template, and test-scan before laminating table cards.",
      "This QR opens a menu for guests to read—it is not a table-ordering system, kitchen ticket flow, or payment checkout. Use LINE or your existing POS for orders; use this code only to show the menu.",
      "QR menu design lowers reprint costs. Update prices on the linked Sheet or page first; download a new PNG only when the URL changes.",
      "For printed table tents, aim for a QR at least 30 mm (3 cm) square with 5 mm quiet space. Guests should scan comfortably from 25–40 cm while seated.",
      "Set short Thai frame labels guests understand: ดูเมนู, สแกนดูเมนู, เมนูออนไลน์, or English View menu. Pair with a LINE add-friend QR at the counter for chat orders.",
    ],
    examples: [
      "Google Sheet menus shared as a view link",
      "Menu PDFs on Google Drive or your website",
      "Bilingual Thai/English menu pages or lunch-set specials",
    ],
    howTo: [
      "Publish a mobile-friendly menu link (Google Sheet, Drive PDF, or web page)",
      "Paste the URL, choose a menu template, and set Thai frame text such as ดูเมนู",
      "Download the PNG at least 30 mm square and test-scan from a seated distance",
      "Laminate or print on table tents only after a successful scan test",
    ],
    faqs: [
      {
        question: "Is this a food ordering or POS system?",
        answer:
          "No. The QR only opens a digital menu link (Sheet, PDF, or web). It does not send orders to the kitchen or replace systems like Yumzi or ThaiQROrder.",
      },
      {
        question: "Do I need my own website?",
        answer: "No. Google Sheets, Drive PDFs, Notion, and other menu hosts work fine.",
      },
      {
        question: "What print size works on restaurant tables?",
        answer:
          "At least 30 mm (3 cm) for the QR with quiet space around it. On A6 tents (105 × 148 mm), place the code in the upper third.",
      },
      {
        question: "How far away should guests be able to scan?",
        answer: "Test from 25–40 cm at seated height before laminating or bulk printing.",
      },
      {
        question: "How do I update prices without reprinting?",
        answer: "Edit the Sheet or linked page. If the URL stays the same, the printed QR still works.",
      },
    ],
    helperHint: "Paste your Thai digital menu link and keep the frame label short.",
    frameText: "View menu",
    downloadFileName: "qr-menu-thai-restaurant.png",
    toolLinks: [
      { label: "URL QR code generator", barePath: "/qr-code/url" },
      { label: "Menu template gallery", barePath: "/templates/menu" },
      { label: "LINE contact QR for restaurants", barePath: "/use-cases/line-contact" },
    ],
  },
  "cafe-menu": {
    title: "Cafe QR Menu Design — Free",
    description:
      "Free cafe QR menu design with print sizes and frame labels. Link drinks and desserts, apply a cafe template, and download a print-ready PNG—no signup.",
    h1: "Free cafe QR menu design",
    introduction:
      "Design a cafe menu QR so customers open drinks and desserts from the table or counter. Board-style and mint cafe templates include readable frames for ดูเมนู or Cafe menu labels.",
    promise: "Free, no signup, with cafe templates, print-size guidance, and live preview.",
    body: [
      "Cafes change seasonal drinks often. A menu QR links to one page you can update without reprinting every sheet when the URL stays the same.",
      "Link to a mobile-friendly menu—not a full ordering app. For chat orders, pair a menu QR on the table with a LINE QR at the counter.",
      "For counter cards, keep the QR at least 25 mm square on a 50 mm sticker or A6 tent (105 × 148 mm). Test-scan from seated or standing distance before laminating.",
      "Use short frame text: Cafe menu, View drinks, or Thai เมนูเครื่องดื่ม. See the menu template gallery for Board Specials and Morning Brew styles.",
    ],
    examples: ["Drink and dessert web menus", "Google Sheet or Drive PDF drink lists", "Morning promo or member menu pages"],
    howTo: [
      "Prepare a cafe menu link that opens quickly on phones",
      "Choose a cafe or menu template and paste the URL",
      "Set a short frame label and download at least 25 mm square",
      "Test-scan on the table or counter, then print or laminate",
    ],
    faqs: [
      {
        question: "What print size works on cafe tables?",
        answer: "At least 25–30 mm for the QR on table stickers or A6 tents. Leave quiet space around the code.",
      },
      {
        question: "Can I use this for seasonal menus?",
        answer: "Yes. Update the linked page; download a new PNG only when the URL changes.",
      },
      {
        question: "Does this take orders?",
        answer: "No. It opens a menu link only. Use LINE or your POS for ordering.",
      },
      {
        question: "Do customers need an app?",
        answer: "No. Phone cameras and browsers are enough.",
      },
    ],
    helperHint: "Use a fast-loading cafe menu link so guests can browse drinks quickly.",
    frameText: "Cafe menu",
    downloadFileName: "qr-cafe-menu.png",
    toolLinks: [
      { label: "Menu template gallery", barePath: "/templates/menu" },
      { label: "Cafe template gallery", barePath: "/templates/cafe" },
      { label: "Cafe WiFi QR", barePath: "/use-cases/free-wifi-no-signup" },
    ],
  },
  "free-wifi-no-signup": {
    title: "Free WiFi QR Code — No Signup",
    description:
      "Create a free WiFi QR code for cafes and shops. Password processed in your browser only—never stored on our servers. No signup.",
    h1: "Free WiFi QR Code — No Signup",
    introduction:
      "Share cafe or shop guest WiFi with one scan instead of repeating the password. Network details are encoded locally in your browser—nothing is uploaded or saved on our servers.",
    promise: "No signup. Passwords stay in your browser. Nothing is saved on our servers.",
    body: [
      "A WiFi QR encodes the network name and password for guests who are allowed on the network. Share the printed code only in your shop.",
      "SSID, security type, and password are processed entirely in your browser. We do not upload, store, or log WiFi credentials.",
      "Cafes often print a 50 mm wide counter sticker or A6 card (105 × 148 mm). Keep the QR at least 25 mm square with quiet space around it.",
      "Enter the SSID exactly as phones list it. Test-scan near the router on both iPhone and Android before laminating—the steam and glare near espresso machines can hide QR edges.",
    ],
    examples: ["Cafe guest WiFi at the counter", "Small shop visitor WiFi", "Home guest network"],
    howTo: [
      "Enter the exact guest network name shown on devices",
      "Choose WPA security and the password (processed only in your browser)",
      "Pick a WiFi template, download, and test-scan at the counter",
      "Print a 50 mm sticker or A6 sign after a successful scan test",
    ],
    faqs: [
      {
        question: "Do you store my WiFi password?",
        answer: "No. Generation happens only in your browser. Nothing is sent to our servers.",
      },
      {
        question: "What size should a cafe counter sign be?",
        answer: "A 50 mm wide sticker or A6 card works well. Keep the QR at least 25 mm square.",
      },
      {
        question: "Do I need an account?",
        answer: "No. Create and download immediately.",
      },
      {
        question: "Can someone read the password from the QR?",
        answer: "Yes—the password is in the QR payload. Share the code only with trusted guests.",
      },
    ],
    helperHint: "Double-check the SSID and security type before downloading.",
    frameText: "Connect to WiFi",
    downloadFileName: "qr-wifi-free.png",
  },
  "hotel-wifi": {
    title: "Hotel QR Code for Guest WiFi",
    description:
      "Create a free hotel QR code for guest WiFi on room cards and lobby signs. Browser-only password handling. Separate guest network—no signup.",
    h1: "Hotel QR code for guest WiFi",
    introduction:
      "Use a hotel QR code on room cards, welcome packs, or lobby signs so guests connect to the guest network themselves—never the staff WiFi. Credentials are processed only in your browser.",
    promise: "Hospitality-ready styling. Guest network only. Ready immediately. No signup.",
    body: [
      "Hotel guests expect WiFi on room cards (often credit-card size, 85 × 55 mm) or A6 welcome inserts (105 × 148 mm). Keep the QR at least 25 mm square.",
      "Use a dedicated guest SSID—not the staff or back-office network. Anyone with the printed card can read the password from the QR payload.",
      "WiFi details are encoded locally in your browser. We do not upload or store hotel network credentials on our servers.",
      "Test-scan inside a real room on both Android and iOS before printing hundreds of room cards. Replace the QR when the guest password rotates.",
    ],
    examples: ["In-room WiFi cards on the desk", "Lobby standing signs", "Welcome booklet inserts"],
    howTo: [
      "Enter the guest network name and password (browser-only processing)",
      "Choose a hotel template and a short frame label such as Guest WiFi",
      "Download and test-scan inside a guest room",
      "Print on room cards or lobby signs after a successful scan test",
    ],
    faqs: [
      {
        question: "Should guests use the staff network?",
        answer: "No. Create a separate guest SSID and refresh the QR when that password changes.",
      },
      {
        question: "What size fits a room card?",
        answer: "Credit-card inserts (85 × 55 mm) or A6 cards work. QR at least 25 mm square with quiet space.",
      },
      {
        question: "Is the WiFi password stored on your servers?",
        answer: "No. Static WiFi QR creation happens entirely in the browser.",
      },
      {
        question: "Can I print one QR for every room?",
        answer: "Yes, if every room shares the same guest network. Use per-room URLs only when each room has a different portal.",
      },
    ],
    helperHint: "Use a dedicated guest network and test-scan in the room.",
    frameText: "Guest WiFi",
    downloadFileName: "qr-hotel-wifi.png",
  },
  "google-review-shop": {
    title: "Google Review QR Code for Shops",
    description:
      "Create a Google Review QR on your phone with a styled frame. Google's own QR has no custom label—build yours here for counter stickers. Free, no signup.",
    h1: "Google Review QR Code for Shops",
    introduction:
      "Google Business Profile gives you a review link customers scan with their phone in-store—but that default code has no branded frame. Here you paste the same link, add a Rate us label, and download a print-ready PNG from your mobile browser.",
    promise: "Mobile-friendly design. Framed review link. No signup.",
    body: [
      "The review link from Google Business Profile opens your public rating page when scanned with a phone camera—ideal for checkout counters and receipts.",
      "Google's built-in QR download is a plain code without your shop colors or a short call-to-action. This tool lets you style the frame, add Rate us or ให้คะแนนเรา, and download on your phone before printing.",
      "Counter stickers around 50 × 50 mm or small A6 tents work well. Keep the QR at least 25 mm square with quiet space.",
      "Place the code where customers finish paying. Test-scan at arm's length before bulk printing—glossy laminate can glare on the corners.",
    ],
    examples: ["Checkout counter stickers (50 × 50 mm)", "Thank-you cards on receipts", "Bag stickers after payment"],
    howTo: [
      "Copy the review link from Google Business Profile on your phone or desktop",
      "Paste it here, choose the Leave a Review template, and set a short frame label",
      "Download the PNG and print one sample sticker",
      "Test-scan before ordering hundreds of counter stickers",
    ],
    faqs: [
      {
        question: "How is this different from Google's own review QR?",
        answer:
          "Same review link, but you can add brand colors, a frame, and short text—and create or download it on your phone. Google's default file is a plain QR without a styled label.",
      },
      {
        question: "Where do I get the Google review link?",
        answer: "Google Business Profile → ask for reviews → copy the share link.",
      },
      {
        question: "What print size works at the counter?",
        answer: "50 × 50 mm stickers or A6 tent cards. QR at least 25 mm square. Test before laminating.",
      },
      {
        question: "Can I require a review?",
        answer: "No. Invite feedback after good service and follow Google policies.",
      },
    ],
    helperHint: "Use the official review link from your Google Business Profile.",
    frameText: "Rate us",
    downloadFileName: "qr-google-review.png",
  },
  "business-contact-card": {
    title: "Business Contact / Digital Business Card QR Code",
    description:
      "Create a free digital business-card QR code that opens your contact page, website, or company profile.",
    h1: "Business Contact / Digital Business Card QR Code",
    introduction:
      "Skip long URLs and phone numbers. Let partners scan once to open your contact page or company profile.",
    promise: "Great for events and sales meetings. No signup required.",
    body: [
      "A digital card QR is easier to update than reprinting paper cards every time a number changes.",
      "Link to an About page, Contact page, or a social hub with all channels.",
    ],
    examples: ["Printed business cards", "Email signatures and slides", "Trade-show booths"],
    howTo: [
      "Prepare your contact or profile URL",
      "Choose a business template and match brand colors",
      "Test-scan, then add it to cards or marketing materials",
    ],
    faqs: [
      {
        question: "Can one QR cover multiple channels?",
        answer: "Yes. Link to one page that lists phone, email, and social profiles.",
      },
      {
        question: "Do I need my own domain?",
        answer: "No. Any working profile or landing page URL is enough.",
      },
    ],
    helperHint: "Link to a page with complete contact options rather than packing long text into the QR.",
    frameText: "Contact us",
    downloadFileName: "qr-business-contact.png",
  },
  "storefront-promo": {
    title: "Storefront Promotion QR Code",
    description:
      "Create a free storefront promo QR code for coupons, discounts, or campaign pages that convert walk-by traffic.",
    h1: "Storefront Promotion QR Code",
    introduction:
      "Put a QR on windows, posters, or shelves so shoppers can open your offer or coupon page instantly.",
    promise: "Built for short campaigns. Bold styling and fast download.",
    body: [
      "Storefront offers convert better when the path is short. A QR avoids typed URLs or coupon codes.",
      "Show the end date on print materials and update the destination when the campaign ends.",
    ],
    examples: ["Discount coupon pages", "Gift-with-purchase signup", "Limited set menus"],
    howTo: [
      "Publish the promotion or coupon page",
      "Paste the link and choose a retail template",
      "Test-scan from the storefront distance, then print stickers",
    ],
    faqs: [
      {
        question: "Can I reuse one QR across campaigns?",
        answer: "Only if the destination URL can change content. Otherwise create a fresh QR per campaign.",
      },
      {
        question: "Where should I place it?",
        answer: "Where shoppers pause: windows, counters, and promo posters.",
      },
    ],
    helperHint: "Link to a fast promo page with a clear claim button.",
    frameText: "Get the offer",
    downloadFileName: "qr-storefront-promo.png",
  },
  "event-poster": {
    title: "Event Poster QR Code",
    description:
      "Create a free event-poster QR code for registration pages, schedules, or online tickets.",
    h1: "Event Poster QR Code",
    introduction:
      "Add a QR to posters, flyers, and banners so interested people can register or read full details on their phone.",
    promise: "Event-ready styling that stays clear in large prints. No signup.",
    body: [
      "Posters have limited space. A QR moves long details to a mobile page without crowding the design.",
      "After printing, test scans from one to two meters to confirm readability.",
    ],
    examples: ["Registration or ticket pages", "Maps and schedules", "Event group or page links"],
    howTo: [
      "Prepare the registration or details URL",
      "Choose an event template and a short frame label",
      "Test-scan at poster distance before bulk printing",
    ],
    faqs: [
      {
        question: "How large should the QR be on a poster?",
        answer: "Large enough to scan comfortably from normal viewing distance, with quiet space around it.",
      },
      {
        question: "Can I use it for online events?",
        answer: "Yes. Link to Zoom pages or online event hubs in slides and emails too.",
      },
    ],
    helperHint: "Keep frame text short, such as Register or See details.",
    frameText: "Register",
    downloadFileName: "qr-event-poster.png",
  },
  "line-contact": {
    title: "LINE OA QR Code for Shops and Restaurants",
    description:
      "Style a LINE add-friend QR from your OA link—counter stickers and tent cards. Does not replace LINE OA Manager; paste the URL you already copied.",
    h1: "LINE OA QR code for shops and restaurants",
    introduction:
      "Copy your add-friend URL from LINE Official Account Manager, paste it here, and download a styled QR for counters and receipts. This decorates your existing LINE link—it does not manage broadcasts, coupons, or OA settings.",
    promise: "Paste your OA add-friend link. Style the frame for print. No signup on this site.",
    body: [
      "LINE Official Account Manager still owns your OA, menus, and broadcasts. This page only turns the add-friend URL you copy there into a printable QR with your colors and frame text.",
      "Typical print sizes: 50 × 50 mm counter stickers, A6 tent cards (105 × 148 mm), or receipt footers. Keep the QR at least 25 mm square with quiet space.",
      "Set short frame labels: Add LINE, แอด LINE, or Chat with us. Test-scan with a phone that already has LINE installed.",
      "Many Thai restaurants pair a menu QR on the table with a LINE QR at the counter for orders and promotions.",
    ],
    examples: [
      "LINE OA add-friend links from Official Account Manager",
      "Contact hub pages with LINE, phone, and maps",
      "Order, booking, or queue chat links",
    ],
    howTo: [
      "Open LINE Official Account Manager and copy the add-friend URL",
      "Paste the link here, set a short frame label such as Add LINE or แอด LINE, and preview",
      "Download for a 50 mm sticker or A6 counter tent",
      "Test-scan before bulk printing on receipts or packaging",
    ],
    faqs: [
      {
        question: "Does this replace LINE Official Account Manager?",
        answer:
          "No. Manage your OA, broadcasts, and rich menus in LINE's tools. Here you only style and print the add-friend QR from the URL you copy.",
      },
      {
        question: "What sticker or counter sizes work?",
        answer: "50 × 50 mm stickers and A6 tents (105 × 148 mm) are common. QR at least 25 mm square.",
      },
      {
        question: "How is this different from LINE's built-in QR?",
        answer: "You can match brand colors, frame text, and templates to your shop print materials.",
      },
      {
        question: "Should restaurants use this with a menu QR?",
        answer: "Yes. Menu QR on the table, LINE QR at the counter for orders and promos.",
      },
      {
        question: "Does the scanner need the LINE app?",
        answer: "Yes. Opening a LINE add-friend page requires LINE on the scanning phone.",
      },
    ],
    helperHint: "Paste your LINE OA add-friend link or a contact hub URL.",
    frameText: "Add LINE",
    downloadFileName: "qr-line-contact.png",
    toolLinks: [
      { label: "LINE QR code generator", barePath: "/qr-code/line" },
      { label: "Thai restaurant menu QR design", barePath: "/use-cases/thai-restaurant-menu" },
      { label: "Restaurant template gallery", barePath: "/templates/restaurant" },
    ],
  },
  "restaurant-table-tent": {
    title: "Table Tent QR Menu Design",
    description:
      "Table-tent QR sizes in cm and mm—A6 tents, 30 mm QR minimum. Test-scan before laminating acrylic stands. Free, no signup.",
    h1: "Table tent QR menu design",
    introduction:
      "Design a table-tent QR for acrylic stands or folded A6 cards (105 × 148 mm). One clear destination per tent—menu, WiFi, or review—and always test-scan before laminating.",
    promise: "Print dimensions in mm. One link per tent. No signup.",
    body: [
      "Standard folded table tents use A6 (105 × 148 mm) or DL (99 × 210 mm). Place the QR in the upper third at least 30 mm square with 5 mm quiet space on all sides.",
      "Guests scan from roughly 25–40 cm while seated. Print one real-size sample, place it on the table, and scan before ordering bulk tents or laminating.",
      "One destination per tent is clearest: a menu link, guest WiFi, or Google review page. Use separate tents or a hub page if you need multiple actions.",
      "Glossy laminate and acrylic holders can add glare. Test after lamination—not just on plain paper.",
    ],
    examples: ["A6 acrylic menu stands", "Folded cards with a single menu URL", "Separate WiFi or review tents"],
    howTo: [
      "Choose one goal: menu, WiFi, or review link",
      "Create the QR with a restaurant template and a short label (ดูเมนู, Guest WiFi, Rate us)",
      "Print an A6 sample at full size and test-scan from a seated position",
      "Laminate or order bulk tents only after a successful scan test",
    ],
    faqs: [
      {
        question: "What size should a table tent QR be?",
        answer:
          "On an A6 tent (105 × 148 mm), make the QR at least 30 mm square with quiet space. Folded DL tents need similar proportions.",
      },
      {
        question: "Should I laminate before testing?",
        answer: "No. Print plain paper first, test-scan, then laminate or order acrylic holders.",
      },
      {
        question: "How many links should one tent include?",
        answer: "One destination is clearest. Use a hub page only when you truly need multiple options.",
      },
      {
        question: "What scanning distance should work?",
        answer: "Test from 25–40 cm at seated height—the typical reach from a restaurant chair.",
      },
    ],
    helperHint: "Pick one table-tent goal, such as menu or WiFi, so guests are not confused.",
    frameText: "Scan at the table",
    downloadFileName: "qr-table-tent.png",
  },
  "gmail-email": {
    title: "Free Gmail / Email QR Code",
    description:
      "Create a free Gmail or email QR code with no signup. Scanning opens a draft with recipient, subject, and message ready.",
    h1: "Free Gmail / Email QR Code",
    introduction:
      "Let customers or partners scan a code and open their email app with the recipient already filled in. Add an optional subject and message for business cards, posters, and store signs.",
    promise: "Opens a draft, does not send automatically. Works with Gmail and other mail apps. No signup.",
    body: [
      "Searches like mail QR code and Gmail to QR code usually want a scan that starts an email, not a website link.",
      "This tool builds a mailto QR with recipient, subject, and body, so Gmail on phones and other mail apps can open a ready draft.",
    ],
    examples: [
      "Business cards that open a sales inbox",
      "Hiring posters with a Resume subject line",
      "Store signs for product questions",
    ],
    howTo: [
      "Enter the recipient email address",
      "Add an optional subject and helper message",
      "Test-scan on a phone, confirm Gmail or the default mail app opens a draft, then download for print",
    ],
    faqs: [
      {
        question: "Does scanning send the email immediately?",
        answer: "No. It only opens a draft. The person still reviews and taps send.",
      },
      {
        question: "Does it work with Gmail?",
        answer: "Yes. If Gmail is the default mail app, the scan opens a Gmail compose screen.",
      },
      {
        question: "How is this different from a website QR?",
        answer: "An email QR opens the mail app with a recipient. It does not take people to a web page.",
      },
    ],
    helperHint: "Enter the recipient email, then add a short subject such as Service enquiry.",
    frameText: "Email us",
    downloadFileName: "qr-gmail-email.png",
  },
};

export const useCasesEn: Record<UseCaseSlug, UseCasePage> = Object.fromEntries(
  (Object.keys(copy) as UseCaseSlug[]).map((slug) => [slug, { ...useCaseMeta[slug], ...copy[slug] }]),
) as Record<UseCaseSlug, UseCasePage>;
