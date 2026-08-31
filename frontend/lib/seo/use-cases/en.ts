import { useCaseMeta } from "@/lib/seo/use-cases/catalog";
import type { UseCaseCopy, UseCasePage, UseCaseSlug } from "@/lib/seo/use-cases/types";

const copy: Record<UseCaseSlug, UseCaseCopy> = {
  "thai-restaurant-menu": {
    title: "QR Menu Design for Thai Restaurants",
    description:
      "Free QR menu design for Thai restaurants. Link a Google Sheet, PDF, or web menu, customize the look, and download a print-ready code—no signup.",
    h1: "QR menu design for Thai restaurants",
    introduction:
      "Design a scannable menu QR so guests open your Thai-language menu on their phone instead of flipping paper pages. Ideal for Thai restaurants that update dishes, lunch sets, and seasonal prices often.",
    promise: "Free in the browser. No account. Works with Thai links and frame text.",
    body: [
      "QR menu design lowers reprint costs and lets you refresh prices by updating the linked page, then printing a new code only when the URL changes.",
      "This page targets restaurant-menu and QR menu design searches instead of competing only on broad QR generator keywords.",
      "Most Thai restaurants start with a Google Sheet, PDF on Drive, or a simple menu page on their website. Paste that mobile-friendly link here, pick a menu template, and test-scan before laminating table cards.",
      "For bilingual service, link to a Thai/English menu page or separate lunch and dinner URLs. Pair this with a LINE add-friend QR on the counter if guests order through chat.",
    ],
    examples: [
      "Google Sheet or website menu pages",
      "Menu PDFs hosted on Drive or your site",
      "Lunch-set, seasonal specials, or bilingual menu pages",
    ],
    howTo: [
      "Prepare a mobile-friendly digital menu link that loads quickly on 4G",
      "Paste the URL, choose a menu template, and set Thai frame text such as View menu",
      "Test-scan from seated distance, then print on table tents or laminated cards",
    ],
    faqs: [
      {
        question: "Do I need my own website?",
        answer: "No. You can link to Google Docs, Drive, Notion, or another digital menu host.",
      },
      {
        question: "Does it support Thai text?",
        answer: "Yes. Links and frame labels can be fully Thai.",
      },
      {
        question: "How do I update prices without reprinting everything?",
        answer: "Edit the linked menu page first. If the URL stays the same, the printed QR still works. If the URL changes, download a new PNG.",
      },
      {
        question: "What print size works on restaurant tables?",
        answer: "Make the QR large enough to scan from a seated guest, with quiet space around it and a short Thai label under the code.",
      },
      {
        question: "Is signup required?",
        answer: "No. Create and download immediately with no server-side save of your content.",
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
      "Free cafe QR menu design with no signup. Build a scannable menu QR for drinks, desserts, and counter promotions.",
    h1: "Free cafe QR menu design",
    introduction:
      "Design a cafe menu QR so customers open drinks and desserts from the table or counter. Apply a cafe-ready style and download a print-ready PNG.",
    promise: "Free, no signup, with cafe templates and live preview.",
    body: [
      "Cafes change seasonal drinks often. A menu QR design helps you switch the linked page without reprinting every sheet.",
      "Use separate campaign links for morning deals or member menus when needed.",
    ],
    examples: ["Drink and dessert web menus", "Morning promo pages", "Preorder or table-booking links"],
    howTo: [
      "Prepare a cafe menu link that opens well on phones",
      "Choose a cafe template and paste the URL",
      "Test-scan, then place the code on tables or the counter",
    ],
    faqs: [
      {
        question: "Can I use this for seasonal menus?",
        answer: "Yes. Update the destination page or create a new QR when the URL changes.",
      },
      {
        question: "Do customers need an app?",
        answer: "No. Phone cameras and browsers are enough.",
      },
    ],
    helperHint: "Use a fast-loading cafe menu link so guests can order quickly.",
    frameText: "Cafe menu",
    downloadFileName: "qr-cafe-menu.png",
  },
  "free-wifi-no-signup": {
    title: "Free WiFi QR Code — No Signup",
    description:
      "Create a free WiFi QR code with no signup. Guests join your network without typing the password. Supports WPA and open networks.",
    h1: "Free WiFi QR Code — No Signup",
    introduction:
      "Share WiFi with one scan instead of repeating the password. Ideal for cafes, offices, and shops that want faster guest access.",
    promise: "No signup. Passwords stay in your browser. Nothing is saved on our servers.",
    body: [
      "A WiFi QR encodes the network name and password. Share it only with people allowed on the network.",
      "This page matches people searching for a free WiFi QR without creating an account.",
    ],
    examples: ["Cafe guest WiFi", "Office visitor WiFi", "Home guest access"],
    howTo: [
      "Enter the exact network name shown on devices",
      "Choose the security type and password if required",
      "Test-scan near the router, then download for your counter",
    ],
    faqs: [
      {
        question: "Do you store my WiFi password?",
        answer: "No. Generation happens only in your browser.",
      },
      {
        question: "Do I need an account?",
        answer: "No. Create and download immediately.",
      },
      {
        question: "Can someone read the password from the QR?",
        answer: "The password is inside the QR payload, so share the code only with trusted guests.",
      },
    ],
    helperHint: "Double-check the SSID and security type before downloading.",
    frameText: "Connect to WiFi",
    downloadFileName: "qr-wifi-free.png",
  },
  "hotel-wifi": {
    title: "Hotel QR Code for Guest WiFi",
    description:
      "Create a free hotel QR code for guest WiFi so visitors join room or lobby internet without asking the front desk. No signup.",
    h1: "Hotel QR code for guest WiFi",
    introduction:
      "Use a hotel QR code on room cards, welcome packs, or lobby signs so guests connect themselves and front-desk WiFi questions drop.",
    promise: "Hospitality-ready styling. Ready immediately. No signup.",
    body: [
      "Hotel QR code searches often mean guest WiFi, room cards, and lobby signs—not a generic generator page.",
      "Use a guest network and test Android and iOS scans before large print runs.",
    ],
    examples: ["In-room WiFi cards", "Lobby signs", "Welcome booklet inserts"],
    howTo: [
      "Use the guest network name and password",
      "Choose a hotel template and a short frame label",
      "Test in a real room before printing",
    ],
    faqs: [
      {
        question: "Should guests use the staff network?",
        answer: "No. Use a separate guest network and refresh the QR when the password changes.",
      },
      {
        question: "Can I print these for every room?",
        answer: "Yes. Download the PNG and place it on room cards or stickers.",
      },
    ],
    helperHint: "Use a dedicated guest network and test-scan in the room.",
    frameText: "Guest WiFi",
    downloadFileName: "qr-hotel-wifi.png",
  },
  "google-review-shop": {
    title: "Google Review QR Code for Shops",
    description:
      "Create a free Google Review QR code for your shop. Link customers straight to your rating page after checkout.",
    h1: "Google Review QR Code for Shops",
    introduction:
      "Place a QR near the cashier or on receipts so happy customers can open your Google review page in one scan.",
    promise: "Direct review links, customizable design, no signup.",
    body: [
      "Local shops benefit from real reviews. A QR removes the friction of searching for your business.",
      "Use the short review link from Google Business Profile and recreate the code if you move locations.",
    ],
    examples: ["Checkout counter stickers", "Thank-you cards", "Receipts and packaging"],
    howTo: [
      "Copy the review link from Google Business Profile",
      "Paste it here and choose a review template",
      "Test-scan and place it where customers finish paying",
    ],
    faqs: [
      {
        question: "Where do I get the Google review link?",
        answer: "From your Google Business Profile share options for ratings.",
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
      "Create a free LINE Official Account QR code for Thai shops. Paste your add-friend URL, style the frame, and download for counters, receipts, and menus.",
    h1: "LINE OA QR code for shops and restaurants",
    introduction:
      "Let customers scan to add your LINE Official Account without searching your shop name. Built for Thai stores that take orders, bookings, and promotions through LINE.",
    promise: "Built for LINE-first shops. No signup on this site. Style the frame to match your print materials.",
    body: [
      "Many Thai shops take orders on LINE. A direct add-friend QR removes search friction at the counter, on receipts, and beside menu cards.",
      "Copy the add-friend URL from LINE Official Account Manager, paste it below, and test-scan with a phone that already has LINE installed.",
      "Need more than LINE alone? Link to a contact hub page with phone, maps, and chat options, or pair this code with a Thai restaurant menu QR on the table.",
      "For @handles, you can also use the dedicated LINE QR generator page if you prefer entering an Official Account ID instead of a full URL.",
    ],
    examples: [
      "LINE OA add-friend links from Official Account Manager",
      "Contact hub pages with LINE, phone, and maps",
      "Order, booking, or queue chat links",
    ],
    howTo: [
      "Open LINE Official Account Manager and copy the add-friend URL",
      "Paste the link here, set a short frame label such as Add LINE, and preview the design",
      "Print for the counter, receipt footer, or packaging, then test-scan before bulk printing",
    ],
    faqs: [
      {
        question: "Can I use an official LINE OA link?",
        answer: "Yes. Paste the add-friend URL from LINE Official Account Manager into the link field.",
      },
      {
        question: "How is this different from LINE’s built-in QR?",
        answer: "You can style the frame, colors, and template to match your shop and combine it with other print materials.",
      },
      {
        question: "Should restaurants use this with a menu QR?",
        answer: "Yes. Many Thai restaurants keep a menu QR on the table and a LINE QR at the counter for orders and promotions.",
      },
      {
        question: "Can I enter an @handle instead of a URL?",
        answer: "Yes. Use the LINE QR generator page if you want to type an @Official Account or LINE ID directly.",
      },
      {
        question: "Does the scanner need the LINE app?",
        answer: "Yes. Opening a LINE profile or add-friend page requires LINE on the scanning phone.",
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
      "Create table-tent QR menu design for restaurants. Open a menu, WiFi, or review page from the table—free, no signup.",
    h1: "Table tent QR menu design",
    introduction:
      "Design a table-tent QR for acrylic stands or folded cards so guests can open the menu, join WiFi, or leave a review without calling staff.",
    promise: "Sized for small table cards with clear frame text. No signup.",
    body: [
      "Table-tent QR menu design works best with one clear destination per card instead of packing many actions into one scan.",
      "Restaurants can separate menu and review cards, or use a hub page when multiple actions are required.",
    ],
    examples: ["Acrylic menu stands", "Folded cards with menu and WiFi", "Thank-you cards with review links"],
    howTo: [
      "Choose whether the tent should open a menu, WiFi, or review page",
      "Create the QR with a restaurant template and short label",
      "Print a real-size sample on the table before bulk ordering",
    ],
    faqs: [
      {
        question: "How many links should one tent include?",
        answer: "One destination is clearest. Use a hub page if you need several options.",
      },
      {
        question: "What size works on a table tent?",
        answer: "Large enough to scan from a seated position, with short text under the code.",
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
