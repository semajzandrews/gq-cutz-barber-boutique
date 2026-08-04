import { formatPhone, telHref, smsHref } from "@/lib/phone";

/** The one place the shop's number is written down. Digits only. */
const PHONE_DIGITS = "3476055614";

/**
 * The boutique voice: unhurried, a little ceremonial. A client with a picture
 * on his phone is the most common lead a barbershop gets, so the text branch
 * invites it outright.
 */
export const SMS_BODY =
  "Hey GQ Cutz, sent a picture of the style I'm after. Can you do it, and what chair times are open this week?";

export const BIZ = {
  name: "GQ Cutz",
  full: "GQ Cutz Barber Boutique",
  tagline: "It is not just a haircut, it is a lifestyle.",
  phoneDigits: PHONE_DIGITS,
  phoneDisplay: formatPhone(PHONE_DIGITS),
  phoneTel: telHref(PHONE_DIGITS),
  smsHref: smsHref(PHONE_DIGITS, SMS_BODY),
  smsBody: SMS_BODY,
  address: "4 Sloan St",
  city: "South Orange",
  state: "NJ",
  zip: "07079",
  rating: "4.9",
  reviewCount: "150+",
  barber: "Gareth Green",
  book: "https://booksy.com/en-us/473487_gq-cutz-llc_barber-shop_118492_south-orange-village",
  instagram: "https://instagram.com/gq_thestylist",
  instagramHandle: "@gq_thestylist",
  mapsEmbed:
    "https://www.google.com/maps?q=4+Sloan+St,+South+Orange,+NJ+07079&output=embed",
};

export const NAV_LINKS = [
  { href: "#ritual", label: "The Ritual" },
  { href: "#work", label: "The Work" },
  { href: "#services", label: "The Index" },
  { href: "#visit", label: "Visit" },
];

/* The boutique add-ons, shot as an editorial sequence (not a menu list). */
export const RITUALS = [
  {
    n: "I",
    kicker: "The Wrap",
    name: "Hot Towel",
    img: "/images/hot-towel.jpg",
    alt: "A client reclined in the chair with a warm towel draped over his face during the hot towel service",
    copy: "It starts before the first pass. A towel, steamed and laid across the face, opens the skin and slows the room down. By the time it lifts, you are already somewhere else.",
    add: "Add the hot towel",
  },
  {
    n: "II",
    kicker: "The Reset",
    name: "Scalp Massage",
    img: "/images/massage.jpg",
    alt: "A barber giving a client a scalp and towel massage in the chair",
    copy: "Worked in by hand, temple to crown. It is the part regulars come back for and the part first timers do not expect. A few minutes that change how the whole cut feels.",
    add: "Add the scalp massage",
  },
  {
    n: "III",
    kicker: "The Finish",
    name: "Skin Exfoliation",
    img: "/images/finish.jpg",
    alt: "A barber finishing a client's grooming with a warm towel, the client relaxed with eyes closed",
    copy: "A clean exfoliation lifts the dull and the dead so the line work reads sharper and the skin sits brighter. The detail nobody sees and everybody feels.",
    add: "Add skin exfoliation",
  },
  {
    n: "IV",
    kicker: "The Shape",
    name: "Beard Sculpt",
    img: "/images/beard.jpg",
    alt: "A barber sculpting and detailing an older client's beard with precision",
    copy: "Mapped to your jaw, not a template. Cheek line, neckline, and a finish that grows in clean instead of growing out wrong. The beard is half the face. We treat it that way.",
    add: "Add the beard sculpt",
  },
];

export const COVER_LINES_LEFT = [
  { html: "<b>4.9 stars</b> across 150+ reviews on Booksy" },
  { html: "Cut, beard and the full ritual, <b>$60</b>" },
];
export const COVER_LINES_RIGHT = [
  { html: "Hot towel. Scalp massage. Skin exfoliation." },
  { html: "Every texture, every fade, shaped by hand" },
];

export const LOOKBOOK = [
  {
    img: "/images/clippers.jpg",
    alt: "A barber smiling while detailing an older client's beard with clippers in the boutique",
    t: "The lineup",
    n: "01",
    cls: "feature",
  },
  {
    img: "/images/wrap.jpg",
    alt: "A barber wrapping a warm towel around a client's head, smiling, in the shop",
    t: "The wrap",
    n: "02",
    cls: "tall",
  },
  {
    img: "/images/scissor.jpg",
    alt: "Close detail of scissor and comb work on the back of a client's head, warm light behind",
    t: "Scissor over comb",
    n: "03",
    cls: "tall",
  },
  {
    img: "/images/kids.jpg",
    alt: "A barber giving a young boy a clipper cut in the chair",
    t: "First chairs",
    n: "04",
    cls: "tall",
  },
];

export const SERVICES = [
  {
    name: "Cut and Beard Trim",
    desc: "The full sit-down. Skin or scissor cut, sharp line, and the beard shaped in the same chair.",
    price: "$60",
  },
  {
    name: "Men Hair Cut",
    desc: "Fade, taper, or scissor work, finished with a clean lineup. Beard trim not included.",
    price: "from $50",
  },
  {
    name: "Cut and Beard Dye",
    desc: "Full cut with a color match to gray out the beard or deepen it back to even.",
    price: "$65",
  },
  {
    name: "Full Shape Up",
    desc: "Edges and lineup pulled crisp, for when the length is fine and the frame needs it.",
    price: "$40",
  },
  {
    name: "Beard Trim",
    desc: "Cheek line, neckline, and a tidy finish mapped to your jaw.",
    price: "$30",
  },
  {
    name: "Hair Line",
    desc: "A clean edge-up on its own. Beard trim not included.",
    price: "$30",
  },
  {
    name: "Women Hair Cut",
    desc: "Tailored to your texture and the shape you are after.",
    price: "from $50",
  },
  {
    name: "Teenagers Cut",
    desc: "School-ready or weekend-ready, cut to how they actually wear it.",
    price: "from $45",
  },
  {
    name: "Kids Hair Cut",
    desc: "Ages 0 to 12. Patient hands and a first chair done right.",
    price: "$35",
  },
  {
    name: "House Call",
    desc: "We come to you. Two and a half hours, your space, the full boutique service.",
    price: "$200",
  },
];

export const REVIEWS = [
  { q: "Always a great haircut, every time.", by: "Justin", when: "May 2026" },
  { q: "I always leave feeling beautiful.", by: "Carol", when: "March 2026" },
  {
    q: "Best barber. Absolutely love his work.",
    by: "Ashley",
    when: "December 2025",
  },
  { q: "Best in the business.", by: "Neville", when: "July 2025" },
];
