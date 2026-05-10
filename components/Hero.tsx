import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <p className="font-serif text-sm uppercase tracking-[0.18em] text-gold">
          {BRAND.serviceAreaShort}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] text-charcoal sm:text-6xl">
          {BRAND.tagline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-graphite">
          Professional DJ services for baby showers, restaurants, birthdays, private family
          events, and community gatherings near Lawrenceville and Suwanee.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-cream transition hover:bg-graphite"
          >
            Get a Quick Quote
          </Link>
          <Link
            href="/event-types"
            className="inline-flex items-center justify-center rounded-full border border-charcoal/15 bg-ivory px-6 py-3 text-sm font-medium text-charcoal transition hover:border-charcoal/30"
          >
            View Event Types
          </Link>
        </div>
      </div>
      {/* Decorative warm gradient — no nightclub imagery */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-blush/40 to-goldsoft/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-mist to-cream blur-3xl"
      />
    </div>
  );
}
