import type { Metadata } from "next";
import Section from "@/components/Section";
import QuoteForm from "@/components/QuoteForm";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Get a Quick Quote — ${BRAND.name}`,
  description:
    "Tell us about your event and get an approximate quote on screen. DJ Christina will follow up with next steps.",
};

export default function QuotePage() {
  return (
    <>
      <Section bg="ivory">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Quick quote</p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl text-charcoal sm:text-5xl">
          Tell us about your event.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-graphite">
          A few minutes of details so we can give you an approximate quote on this page and have
          a real conversation about the day. {BRAND.serviceAreaLine}
        </p>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl rounded-xl2 border border-mist/70 bg-ivory p-6 shadow-soft sm:p-10">
          <QuoteForm />
        </div>
      </Section>
    </>
  );
}
