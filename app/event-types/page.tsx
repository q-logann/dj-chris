import type { Metadata } from "next";
import Section from "@/components/Section";
import EventTypeCard from "@/components/EventTypeCard";
import { BRAND, EVENT_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Event Types — ${BRAND.name}`,
  description:
    "DJ services for restaurants, baby showers, birthday parties, private family events, corporate gatherings, and community events near Lawrenceville and Suwanee, GA.",
};

export default function EventTypesPage() {
  return (
    <>
      <Section bg="ivory">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Event types</p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl text-charcoal sm:text-5xl">
          DJ services planned around the kind of event you&apos;re actually hosting.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-graphite">
          The music for a baby shower is not the music for a restaurant night, and neither is the music
          for a corporate dinner. Here&apos;s how each one is approached.
        </p>
      </Section>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_TYPES.map((e) => (
            <EventTypeCard key={e.key} title={e.title} bestFor={e.bestFor} vibe={e.vibe} why={e.why} />
          ))}
        </div>
      </Section>
    </>
  );
}
