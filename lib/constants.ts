// One place to edit brand, contact, pricing, and service-area details.
// PLACEHOLDER values are flagged with "PLACEHOLDER" — search the file to find them.

export const BRAND = {
  name: "DJ Christina",
  tagline: "Music for the moments people remember.",
  publicEmail: "Coachchristinapybstrong@gmail.com",
  publicPhone: "(404) 931-7087",
  // PLACEHOLDER — replace with mom's Instagram handle (or remove the link in Footer)
  instagram: "@madisongoneham",
  serviceAreaLine:
    "Serving Lawrenceville, Suwanee, and nearby communities within about 25 miles.",
  serviceAreaShort: "Lawrenceville · Suwanee · 25-mile radius",
  cityFocus: ["Lawrenceville", "Suwanee", "Buford", "Duluth", "Sugar Hill", "Cumming"],
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/event-types", label: "Event Types" },
  { href: "/blog", label: "Planning Tips" },
  { href: "/quote", label: "Get a Quote" },
];

export const EVENT_TYPES = [
  {
    key: "restaurant",
    label: "Restaurant",
    title: "Restaurants & Hospitality",
    bestFor: "Steady background music, welcome hours, and special-night service.",
    vibe: "Conversation-friendly volume that lifts the room without competing with service.",
    why: "Music planned around your service rhythm — louder during peak, lower during quiet seatings, never overwhelming the kitchen pass.",
  },
  {
    key: "babyShower",
    label: "Baby shower",
    title: "Baby Showers",
    bestFor: "Welcome music, games, announcements, gift opening, and a little dancing if it's that kind of crowd.",
    vibe: "Warm, family-friendly, clean lyrics, easy to talk over.",
    why: "A microphone for hosts, playlists that respect the guest list, and the room read to keep grandma comfortable and the kids happy.",
  },
  {
    key: "birthdayParty",
    label: "Birthday party",
    title: "Birthday Parties",
    bestFor: "Kids' parties, sweet sixteens, milestone birthdays, backyard celebrations.",
    vibe: "Energy that matches the age range — fun without being chaotic.",
    why: "From the candle moment to the after-cake dance floor, the music follows the energy in the room.",
  },
  {
    key: "privateFamilyEvent",
    label: "Private party / family event",
    title: "Private Family Events",
    bestFor: "Anniversaries, retirements, graduations, family reunions, holiday gatherings.",
    vibe: "Warm, multigenerational, easy to host through.",
    why: "Cocktail hour, dinner, and dancing handled with smooth transitions and a do-not-play list that's actually respected.",
  },
  {
    key: "corporateCommunity",
    label: "Corporate / community event",
    title: "Corporate & Community Events",
    bestFor: "Company gatherings, nonprofit fundraisers, school events, neighborhood block parties.",
    vibe: "Professional, on-time, microphone-ready for announcements and emcee moments.",
    why: "Clear communication with planners, clean equipment setup, and music programming that fits a public audience.",
  },
  {
    key: "other",
    label: "Other / custom event",
    title: "Other & Custom Events",
    bestFor: "Anything not on this list — describe your event in the quote form.",
    vibe: "Built around what your event actually is.",
    why: "If it doesn't fit a category, just tell us what's happening and we'll plan from there.",
  },
] as const;

export type EventTypeKey = (typeof EVENT_TYPES)[number]["key"];

export const VENUE_TYPES = [
  "Restaurant",
  "Private home",
  "Backyard / outdoor",
  "Banquet hall / event venue",
  "Community center",
  "Office / corporate space",
  "Park / public space",
  "Other",
] as const;

// Pricing constants — single source of truth.
export const PRICING = {
  basePriceByEventType: {
    restaurant: 200,
    babyShower: 300,
    birthdayParty: 300,
    privateFamilyEvent: 350,
    corporateCommunity: 450,
    other: 350,
  } satisfies Record<EventTypeKey, number>,
  baseHoursIncluded: 2,
  perExtraHour: 75,
  guestTiers: [
    { maxGuests: 50, fee: 0 },
    { maxGuests: 100, fee: 50 },
    { maxGuests: 200, fee: 100 },
    { maxGuests: Infinity, fee: 175 },
  ],
  rushFee: 75,
  rushWindowDays: 7,
  defaultTravelFee: 0,
  highEstimateBufferPct: 0.2,
  // Floor on the spread between low and high so a tiny booking never reads as $200–$200.
  minimumSpread: 50,
};

export const QUOTE_DISCLAIMER =
  "This is an approximate quote. Final pricing depends on availability, event details, location, setup requirements, travel, and final agreement with DJ Christina.";

export const SITE_METADATA = {
  title: `${BRAND.name} — Local DJ for Showers, Restaurants, and Private Events`,
  description:
    "Warm, professional DJ services for baby showers, birthday parties, restaurants, private family events, and community gatherings near Lawrenceville and Suwanee, Georgia.",
};
