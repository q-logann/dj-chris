import type { Metadata } from "next";
import EventTypeCard from "@/components/EventTypeCard";
import EqBars from "@/components/EqBars";
import { BRAND, EVENT_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Event Types — ${BRAND.name}`,
  description:
    "DJ services for restaurants, baby showers, birthday parties, private family events, corporate gatherings, and community events near Lawrenceville and Suwanee, GA.",
};

export default function EventTypesPage() {
  return (
    <>
      {/* Page header — dark, glass kicker, italic headline */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <p className="flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-gold">
            <EqBars className="h-3 text-gold" />
            // Event types
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-5xl italic leading-[0.95] tracking-[-2px] text-white md:text-7xl">
            DJ services planned around the kind of event you&apos;re
            actually hosting.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base text-white/80 md:text-lg">
            The music for a baby shower is not the music for a restaurant
            night, and neither is the music for a corporate dinner.
            Here&apos;s how each one is approached.
          </p>
        </div>
      </section>

      {/* Setlist of event types — six glass cards numbered like tracks */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 pb-24 md:px-16 lg:px-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_TYPES.map((e, i) => (
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
    </>
  );
}
