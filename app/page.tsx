import Link from "next/link";
import Hero from "@/components/Hero";
import EventTypeCard from "@/components/EventTypeCard";
import BlogCard from "@/components/BlogCard";
import FadingVideo from "@/components/FadingVideo";
import EqBars from "@/components/EqBars";
import SoundwaveDivider from "@/components/SoundwaveDivider";
import RecordIcon from "@/components/RecordIcon";
import { BRAND, EVENT_TYPES } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

// PLACEHOLDER — swap for a DJ-relevant clip (lit dance floor, candle-lit
// reception, hands at a controller). Currently a stock loop from the original
// style prompt while we validate the FadingVideo + glass card layout.
const CAPS_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const previewTypes = EVENT_TYPES.filter((e) => e.key !== "other").slice(0, 4);

  return (
    <>
      <Hero />

      {/* Communities — service-area band; the content sits inside a
          liquid-glass card so it reads as a deliberate "frosted" panel
          rather than a flat label on black. */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        {/* Warm gold bleed from the hero's orb above — reads as ambient
            light dripping down past the section boundary. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-64 bg-gradient-to-b from-gold/20 via-gold/8 to-transparent blur-2xl"
        />
        {/* Soft horizontal halo behind the glass card so the translucency
            picks up warmth through the blur. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 mx-auto h-72 max-w-3xl -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:py-20 lg:py-24">
          <div className="liquid-glass mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[1.75rem] px-6 py-10 md:px-12 md:py-12">
            <span className="liquid-glass rounded-full px-3.5 py-1 font-body text-[13px] font-medium text-white">
              Serving nearby communities
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10 lg:gap-x-14">
              {BRAND.cityFocus.map((c) => (
                <span
                  key={c}
                  className="font-heading text-2xl italic tracking-tight text-white md:text-3xl"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities — dark cinematic section, three glass cards */}
      <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
        <FadingVideo
          src={CAPS_VIDEO_SRC}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="relative z-10 flex min-h-screen flex-col px-6 pb-12 pt-24 md:px-16 lg:px-20">
          <div className="mb-auto">
            <p className="mb-6 font-body text-[14px] uppercase tracking-[0.16em] text-white/80">
              // The set
            </p>
            <h2 className="font-heading text-5xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[5.5rem]">
              Planning,
              <br />
              then a smooth night.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <CapabilityCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      <SoundwaveDivider className="bg-black" />

      {/* Event types preview — dark, glass cards laid out like a setlist */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        {/* Warm bleed from the Capabilities video above — links the
            flat section back to the floral/crystal warmth so the
            transition reads as one continuous atmosphere. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-48 bg-gradient-to-b from-gold/15 to-transparent blur-2xl"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:px-16 lg:px-20">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <p className="font-body text-[14px] uppercase tracking-[0.16em] text-white/70">// Set list</p>
              <h2 className="mt-3 max-w-2xl font-heading text-4xl italic leading-[0.95] tracking-[-2px] text-white md:text-6xl">
                A simple quote for any of these.
              </h2>
            </div>
            <Link
              href="/event-types"
              className="group inline-flex items-center gap-2 self-start font-body text-[15px] font-medium text-white/90 transition hover:text-goldsoft md:self-end"
            >
              See all event types
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {previewTypes.map((e, i) => (
              <EventTypeCard
                key={e.key}
                trackNumber={String(i + 1).padStart(2, "0")}
                title={e.title}
                bestFor={e.bestFor}
                vibe={e.vibe}
                why={e.why}
              />
            ))}
          </div>
        </div>
      </section>

      <SoundwaveDivider className="bg-black" />

      {/* Planning notes — dark, three blog cards */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        {/* Light continuation of the warm atmosphere. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-40 bg-gradient-to-b from-goldsoft/8 to-transparent blur-2xl"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:px-16 lg:px-20">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <p className="font-body text-[14px] uppercase tracking-[0.16em] text-white/70">
                // Planning notes
              </p>
              <h2 className="mt-3 max-w-2xl font-heading text-4xl italic leading-[0.95] tracking-[-2px] text-white md:text-6xl">
                Helpful reads before you book.
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 self-start font-body text-[15px] font-medium text-white/90 transition hover:text-goldsoft md:self-end"
            >
              All posts
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <SoundwaveDivider className="bg-black" />

      {/* Final CTA — dramatic dark callout with EqBars + cinematic glass card */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        {/* Top warmth carries the atmosphere through; centered halo
            blooms behind the CTA card so the glass picks up depth. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-40 bg-gradient-to-b from-goldsoft/8 to-transparent blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 mx-auto h-96 max-w-4xl translate-y-12 rounded-full bg-gradient-to-r from-transparent via-gold/12 to-transparent blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:px-16 lg:px-20">
          <div className="liquid-glass-strong relative overflow-hidden rounded-[1.5rem] px-8 py-16 text-center sm:px-14 sm:py-20">
            <div className="mx-auto mb-6 flex justify-center">
              <RecordIcon size={44} />
            </div>
            <p className="flex items-center justify-center gap-2 font-body text-[13px] font-medium uppercase tracking-[0.18em] text-gold">
              <EqBars className="h-3 text-gold" />
              Ready when you are
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-7xl">
              Tell us about your night.
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-base font-light text-white/85">
              A quick form for showers, restaurants, private parties, and
              community events. You&apos;ll see an estimate on screen and hear
              back from {BRAND.name}.
            </p>
            <Link
              href="/quote"
              className="liquid-glass-strong group mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 font-body text-[15px] font-medium text-white transition-all duration-200 ease-out hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(168,133,75,0.12)] motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]"
            >
              Get a Quick Quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------- */
/* Capability cards — adapted from the existing WHY content. The chip   */
/* arrays summarize what each pillar covers; the body text comes from   */
/* the original cream-themed copy.                                      */
/* -------------------------------------------------------------------- */

type Capability = {
  icon: React.ReactNode;
  title: string;
  body: string;
  chips: readonly string[];
};

const CAPABILITIES: readonly Capability[] = [
  {
    icon: <ChatIcon />,
    title: "Read the room first",
    chips: ["Vibe", "Must-plays", "Do-not-plays", "Layout"],
    body: "Music vibe, must-plays, do-not-plays, and room layout — covered before the date, not improvised at the event.",
  },
  {
    icon: <SpeakerIcon />,
    title: "Clean, professional gear",
    chips: ["Pro audio", "Tidy cables", "Right-sized", "Setup ready"],
    body: "Equipment that fits the venue without dominating it. No nightclub footprint, no tangled cables.",
  },
  {
    icon: <ClockIcon />,
    title: "Easy to reach, on time",
    chips: ["Clear emails", "On-time arrival", "Mic ready", "Announcements"],
    body: "Clear emails, on-time arrival, and a microphone ready when hosts need it for announcements.",
  },
];

function CapabilityCard({ icon, title, body, chips }: Capability) {
  return (
    <div className="liquid-glass-dim group flex min-h-[360px] flex-col rounded-[1.25rem] p-6 transition-all duration-[250ms] ease-out hover:shadow-[0_8px_32px_rgba(168,133,75,0.10)] motion-safe:hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div className="liquid-glass flex h-11 w-11 items-center justify-center rounded-[0.75rem]">
          <div className="text-white">{icon}</div>
        </div>
        <div className="flex max-w-[70%] flex-wrap justify-end gap-1.5">
          {chips.map((c) => (
            <span
              key={c}
              className="liquid-glass whitespace-nowrap rounded-full px-3 py-1 font-body text-[12px] text-white/90"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1" />
      <div className="mt-6">
        <h3 className="font-heading text-3xl italic leading-none tracking-[-1px] text-white md:text-4xl">
          {title}
        </h3>
        <p className="mt-3 max-w-[32ch] font-body text-[15px] font-light leading-relaxed text-white/90">
          {body}
        </p>
      </div>
    </div>
  );
}

/* ---------- Capability + nav icons ---------- */

function ChatIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
