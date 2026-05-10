import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import EventTypeCard from "@/components/EventTypeCard";
import BlogCard from "@/components/BlogCard";
import { BRAND, EVENT_TYPES } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const previewTypes = EVENT_TYPES.filter((e) => e.key !== "other").slice(0, 4);

  return (
    <>
      <Hero />

      <Section bg="ivory">
        <div className="grid items-start gap-10 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">About</p>
            <h2 className="mt-3 font-serif text-3xl text-charcoal">Local DJ services planned around your event.</h2>
          </div>
          <div className="sm:col-span-2 sm:pt-2">
            <p className="text-base leading-relaxed text-graphite">
              {BRAND.name} is a local DJ serving showers, restaurants, private parties,
              and community events. Music planned around the room, the guest list, and the moment —
              not generic playlists. Clear communication before the day, professional setup, and a
              microphone ready when hosts need it.
            </p>
            <p className="mt-3 text-sm text-graphite">{BRAND.serviceAreaLine}</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">Event types</p>
            <h2 className="mt-2 font-serif text-3xl text-charcoal">A simple quote for any of these.</h2>
          </div>
          <Link href="/event-types" className="hidden text-sm font-medium text-charcoal hover:text-gold sm:inline">
            See all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {previewTypes.map((e) => (
            <EventTypeCard key={e.key} title={e.title} bestFor={e.bestFor} vibe={e.vibe} why={e.why} />
          ))}
        </div>
      </Section>

      <Section bg="mist">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Why book DJ Christina</p>
        <h2 className="mt-2 max-w-2xl font-serif text-3xl text-charcoal">A planning conversation, then a smooth day.</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {WHY.map((w) => (
            <li key={w.title} className="rounded-xl2 border border-mist/70 bg-ivory p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">{w.tag}</p>
              <h3 className="mt-2 font-serif text-lg text-charcoal">{w.title}</h3>
              <p className="mt-2 text-sm text-graphite">{w.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section bg="ivory">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">Planning tips</p>
            <h2 className="mt-2 font-serif text-3xl text-charcoal">Helpful reads before you book.</h2>
          </div>
          <Link href="/blog" className="hidden text-sm font-medium text-charcoal hover:text-gold sm:inline">
            All posts →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-xl2 border border-mist/70 bg-ivory p-8 text-center shadow-soft sm:p-14">
          <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">Tell us about your event.</h2>
          <p className="mx-auto mt-3 max-w-xl text-graphite">
            A simple quote form for showers, restaurants, private parties, and community events.
            You&apos;ll get an estimate on screen and a follow-up from DJ Christina.
          </p>
          <Link
            href="/quote"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-charcoal px-7 py-3 text-sm font-medium text-cream transition hover:bg-graphite"
          >
            Get a Quick Quote
          </Link>
        </div>
      </Section>
    </>
  );
}

const WHY = [
  {
    tag: "Planning",
    title: "Real conversations before the day",
    body: "Music vibe, must-plays, do-not-plays, room layout — covered before the date, not improvised at the event.",
  },
  {
    tag: "Setup",
    title: "Clean, professional gear",
    body: "Equipment that fits the venue without dominating it. No nightclub footprint, no tangled cables.",
  },
  {
    tag: "Communication",
    title: "Easy to reach, on time",
    body: "Clear emails, on-time arrival, and a microphone ready when hosts need it for announcements.",
  },
];
