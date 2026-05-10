export type BlogPost = {
  slug: string;
  title: string;
  date: string; // PLACEHOLDER dates — replace with real publish dates
  excerpt: string;
  content: string[]; // paragraphs
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-the-right-dj-for-a-baby-shower",
    title: "How to Choose the Right DJ for a Baby Shower",
    date: "2025-09-12",
    excerpt:
      "A shower is half hosting, half hangout. The right DJ supports both — readable announcements, clean lyrics, and volume that lets people actually talk.",
    content: [
      "A baby shower is a different room than a wedding or a birthday. Guests range from a great-aunt who wants to chat to a four-year-old who wants to dance. Your DJ has to read both sides of that room without drowning either one out.",
      "The first thing to ask: can they handle a microphone gracefully? Most of a shower runs on small announcements — games, gift opening, a toast from a sister. A good DJ keeps the music ducked under the host's voice automatically, instead of cutting tracks awkwardly or shouting over them.",
      "The second thing: do they take a do-not-play list seriously? Showers tend to have specific sensitivities — explicit lyrics, songs tied to a particular ex, a cousin's wedding song that the family has heard a hundred times. Ask how the DJ collects those notes and how they handle requests during the event that conflict with them.",
      "The third thing: volume control by zone. If grandma is at one end of the room and the dance corner is at the other, the speakers shouldn't blast both equally. A planning conversation about room layout — even a quick one — usually solves this before the day arrives.",
      "If you're booking through a quote form, look for one that asks about must-plays, do-not-plays, guest count, and venue type up front. That's a sign the DJ actually plans the event, instead of showing up with a generic playlist.",
    ],
  },
  {
    slug: "what-to-ask-before-booking-a-dj-for-a-restaurant-event",
    title: "What to Ask Before Booking a DJ for a Restaurant Event",
    date: "2025-10-03",
    excerpt:
      "Restaurant gigs aren't dance floors. The questions that matter are about volume, equipment footprint, and how the DJ communicates with your service team.",
    content: [
      "Restaurant DJ work is closer to a hospitality job than a stage job. The goal is to lift the room without making servers shout orders or guests lean across the table to hear each other. The questions you ask up front will shape whether the night feels effortless or overworked.",
      "Start with footprint. How much space does their setup actually need? A two-top of equipment is reasonable; a wall of subwoofers is not. Ask whether they bring stands or use a table you provide, whether they need wall power or a dedicated outlet, and whether their cabling can be run cleanly along baseboards.",
      "Then ask about volume curves. A DJ who has worked restaurants will talk about pulling levels down during the first seating, lifting through the middle of service, and easing off during dessert. If you get a blank look, that's information.",
      "Genre flexibility is the next question. Bossa, soul, low-tempo house, indie folk, R&B — the right mix depends on your concept and your guests, and a DJ should be able to sketch a direction in plain language without you needing a music degree.",
      "Finally, ask how they communicate during service. Are they reachable by a quick wave from the host stand? Do they take requests through the staff or directly from guests? Small operating agreements like these prevent friction on a busy Saturday.",
    ],
  },
  {
    slug: "how-music-changes-the-energy-of-a-private-event",
    title: "How Music Changes the Energy of a Private Event",
    date: "2025-10-21",
    excerpt:
      "An event has phases. Music either helps those phases land or fights them. Here's how to think about each one.",
    content: [
      "Most private events follow a predictable arc — arrival, mingling, dinner or program, peak, and wind-down — and the music for each phase is doing a different job. Treating it as one long playlist usually flattens the night.",
      "Arrival music sets the social temperature. It should be warm enough that the first guests don't feel like they're standing in a quiet room, but quiet enough that the host can greet people. Familiar instrumentals, soul, or a lighter pop catalog usually works.",
      "Through dinner or programming, music sits underneath conversation. The test is whether two people across a six-foot table can talk in normal voices. If they're leaning in, the music is too loud or the song selection is too busy.",
      "The peak — toasts, cake, dancing, whatever the central moment is — is where the music drives. The lift in volume and tempo here should feel like the natural next thing, not a surprise. A good DJ telegraphs it through the previous twenty minutes.",
      "Wind-down is the part most people forget to plan. Songs that thanked the room and let people leave gracefully are different from songs that told them to dance. Ten minutes of softer, slower selections at the end gives guests a moment to find their coats and say goodbye.",
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
