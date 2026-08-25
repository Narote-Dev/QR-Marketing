import { useCaseMeta } from "@/lib/seo/use-cases/catalog";
import type { UseCaseCopy, UseCasePage, UseCaseSlug } from "@/lib/seo/use-cases/types";

const copy: Record<UseCaseSlug, UseCaseCopy> = {
  "thai-restaurant-menu": {
    title: "QR Code for Thai Restaurant Menus",
    description:
      "Create a free QR code for Thai restaurant menus. No signup. Link to a digital menu, customize the design, and download instantly.",
    h1: "QR Code for Thai Restaurant Menus",
    introduction:
      "Let guests open your Thai-language menu on their phone instead of flipping paper pages. Ideal for Thai restaurants that update dishes and prices often.",
    promise: "Free in the browser. No account. Works with Thai links and frame text.",
    body: [
      "A menu QR code lowers reprint costs and lets you refresh prices by updating the linked page.",
      "This page targets restaurant-menu intent and menu QR design needs instead of competing only on broad QR generator keywords.",
    ],
    examples: ["Google Sheet or website menu pages", "Menu PDFs hosted online", "Lunch-set and seasonal specials pages"],
    howTo: [
      "Prepare a mobile-friendly digital menu link",
      "Paste the URL and choose a menu template",
      "Set Thai frame text such as View menu, then test-scan before printing",
    ],
    faqs: [
      {
        question: "Do I need my own website?",
        answer: "No. You can link to Google Docs, Drive, or another digital menu host.",
      },
      {
        question: "Does it support Thai text?",
        answer: "Yes. Links and frame labels can be fully Thai.",
      },
      {
        question: "Is signup required?",
        answer: "No. Create and download immediately with no server-side save of your content.",
      },
    ],
    helperHint: "Paste your Thai digital menu link and keep the frame label short.",
    frameText: "View menu",
    downloadFileName: "qr-menu-thai-restaurant.png",
  },
  "cafe-menu": {
    title: "Free Cafe Menu QR Code",
    description: "Create a free cafe menu QR code with no signup. Design a scannable menu QR for drinks, desserts, and counter promotions.",
    h1: "Free Cafe Menu QR Code",
    introduction:
      "Let customers open your drink and dessert menu from the table or counter. Apply a cafe-ready style and download a print-ready PNG.",
    promise: "Free, no signup, with cafe templates and live preview.",
    body: [
      "Cafes change seasonal drinks often. A QR code helps you switch the linked menu without reprinting every page.",
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
    title: "Hotel WiFi QR Code",
    description:
      "Create a hotel QR code for WiFi so guests can join room or lobby internet without asking the front desk.",
    h1: "Hotel WiFi QR Code",
    introduction:
      "Reduce front-desk questions and improve guest experience with WiFi QR codes on room cards, welcome packs, or lobby signs.",
    promise: "Hospitality-ready styling. Ready immediately. No signup.",
    body: [
      "Hotels often repeat WiFi instructions. A QR code lets guests connect themselves after check-in.",
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
    title: "LINE or Contact-Channel QR Code",
    description:
      "Create a QR code for LINE OA or other contact channels so customers can add you quickly from the storefront.",
    h1: "LINE or Contact-Channel QR Code",
    introduction:
      "Let customers scan to add your LINE Official Account or open your preferred contact channel without searching your shop name.",
    promise: "Built for shops that use LINE as a primary channel. No signup on this site.",
    body: [
      "Many Thai shops take orders on LINE. A direct add-friend QR removes search friction.",
      "You can also link to a hub page with LINE, phone, and maps if you need multiple channels.",
    ],
    examples: ["LINE OA add-friend links", "Contact hub pages", "Order or queue chat links"],
    howTo: [
      "Copy your LINE add-friend or contact URL",
      "Paste it here and set a short frame label",
      "Place the code at the counter or on receipts, then test-scan",
    ],
    faqs: [
      {
        question: "Can I use an official LINE OA link?",
        answer: "Yes. Paste the add-friend URL from LINE Official Account.",
      },
      {
        question: "How is this different from LINE’s built-in QR?",
        answer: "You can style the frame and template to match your shop and print materials.",
      },
    ],
    helperHint: "Paste your LINE OA add-friend link or a contact hub URL.",
    frameText: "Add LINE",
    downloadFileName: "qr-line-contact.png",
  },
  "restaurant-table-tent": {
    title: "Restaurant Table-Tent QR Code",
    description:
      "Create a QR code for restaurant table tents that opens a menu, WiFi, or review page from the table.",
    h1: "Restaurant Table-Tent QR Code",
    introduction:
      "Design a QR for acrylic stands or folded cards so guests can open the menu, join WiFi, or leave a review without calling staff.",
    promise: "Sized for small table cards with clear frame text. No signup.",
    body: [
      "Table tents are high-touch. One clear destination per card works better than packing many actions into one scan.",
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
