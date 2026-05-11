import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import EqBars from "@/components/EqBars";
import SoundwaveDivider from "@/components/SoundwaveDivider";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Get a Quick Quote — ${BRAND.name}`,
  description:
    "Tell us about your event and get an approximate quote on screen. DJ Christina will follow up with next steps.",
};

export default function QuotePage() {
  return (
    <>
      {/* Page header */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <p className="flex items-center gap-2 font-body text-[13px] font-medium uppercase tracking-[0.18em] text-gold">
            <EqBars className="h-3 text-gold" />
            // Quote
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-5xl italic leading-[0.95] tracking-[-2px] text-white md:text-7xl">
            Tell us about your night.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base text-white/80 md:text-lg">
            A few minutes of details so we can give you an approximate quote on
            this page and have a real conversation about the day.{" "}
            {BRAND.serviceAreaLine}
          </p>
        </div>
      </section>

      <SoundwaveDivider className="bg-black" />

      {/* Form — wrapped in a glass shell to match the dark cinematic feel */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 pb-24 md:px-16 lg:px-20">
          <div className="liquid-glass mx-auto max-w-3xl rounded-[1.5rem] p-6 sm:p-10">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
