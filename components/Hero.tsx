import Link from "next/link";
import { BRAND, PRICING } from "@/lib/constants";
import FadingVideo from "@/components/FadingVideo";
import BlurText from "@/components/BlurText";
import EqBars from "@/components/EqBars";

// PLACEHOLDER — swap for a DJ-appropriate background clip (warm event/venue
// b-roll, candlelit room, or an abstract gradient loop). Using a stock CDN
// reference from the original style prompt as a temporary placeholder so the
// FadingVideo crossfade can be validated end-to-end.
const HERO_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-black text-white">
      {/* Background video — full bleed, top-aligned, slightly oversized */}
      <FadingVideo
        src={HERO_VIDEO_SRC}
        className="absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top"
        style={{ width: "120%", height: "120%" }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Hero content — centered vertically and horizontally */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center">
          {/* Badge */}
          <div
            className="liquid-glass inline-flex items-center gap-2 rounded-full pr-4 opacity-0"
            style={{ animation: "fade-blur-up 0.7s 0.4s ease-out both" }}
          >
            <span className="rounded-full bg-white px-3 py-1 font-body text-xs font-semibold text-black">
              New
            </span>
            <span className="font-body text-sm text-white/90">
              Now booking — Lawrenceville &amp; Suwanee
            </span>
            <EqBars className="h-3 text-gold" />
          </div>

          {/* Headline */}
          <BlurText
            text={BRAND.tagline}
            startDelayMs={200}
            className="mt-6 max-w-2xl font-heading text-6xl italic leading-[0.85] tracking-[-0.04em] text-white md:text-7xl lg:text-[5.5rem]"
          />

          {/* Subheading */}
          <p
            className="mt-4 max-w-2xl font-body text-sm font-light leading-tight text-white opacity-0 md:text-base"
            style={{ animation: "fade-blur-up 0.7s 0.8s ease-out both" }}
          >
            Professional DJ services for baby showers, restaurants, birthdays,
            private family events, and community gatherings near Lawrenceville
            and Suwanee.
          </p>

          {/* CTAs */}
          <div
            className="mt-6 flex items-center gap-6 opacity-0"
            style={{ animation: "fade-blur-up 0.7s 1.1s ease-out both" }}
          >
            <Link
              href="/quote"
              className="liquid-glass-strong group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-white transition hover:bg-white/[0.06] active:scale-[0.98]"
            >
              Get a Quick Quote
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/event-types"
              className="group inline-flex items-center gap-2 font-body text-sm font-medium text-white/90 transition hover:text-white"
            >
              View Event Types
              <Play className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Stats — honest numbers from lib/constants.ts (no fabricated metrics) */}
          <div
            className="mt-8 flex flex-wrap items-stretch justify-center gap-4 opacity-0"
            style={{ animation: "fade-blur-up 0.7s 1.3s ease-out both" }}
          >
            <StatCard
              icon={<ClockIcon />}
              number={`From $${PRICING.basePriceByEventType.restaurant}`}
              label="Restaurant sets, 2-hour starting block"
            />
            <StatCard
              icon={<GlobeIcon />}
              number="25 miles"
              label="Service radius from Lawrenceville–Suwanee"
            />
          </div>
        </div>

        {/* Communities served — replaces the "partners" row from the original
            prompt with real cities. */}
        <div
          className="flex flex-col items-center gap-4 px-4 pb-8 opacity-0"
          style={{ animation: "fade-blur-up 0.7s 1.4s ease-out both" }}
        >
          <span className="liquid-glass rounded-full px-3.5 py-1 font-body text-xs font-medium text-white">
            Serving nearby communities
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
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
  );
}

function StatCard({
  icon,
  number,
  label,
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
}) {
  return (
    <div className="liquid-glass flex w-[220px] flex-col gap-3 rounded-[1.25rem] p-5 text-left">
      <div className="text-white">{icon}</div>
      <div>
        <div className="font-heading text-4xl italic leading-none tracking-[-1px] text-white">
          {number}
        </div>
        <div className="mt-2 font-body text-xs font-light text-white">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ---------- Inline icons (lucide-style, currentColor) ---------- */

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

function Play({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </svg>
  );
}
