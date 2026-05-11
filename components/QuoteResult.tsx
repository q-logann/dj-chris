import type { QuoteResult } from "@/types/inquiry";
import { formatUSD } from "@/lib/format";

export default function QuoteResultCard({ quote }: { quote: QuoteResult }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="liquid-glass rounded-[1.25rem] p-6 sm:p-8"
    >
      <p className="font-body text-[13px] font-medium uppercase tracking-[0.18em] text-gold">
        // Estimated quote
      </p>
      <p className="mt-3 font-heading text-4xl italic leading-none tracking-[-0.02em] text-white sm:text-5xl">
        {formatUSD(quote.lowEstimate)} – {formatUSD(quote.highEstimate)}
      </p>
      <p className="mt-4 font-body text-[15px] text-white/85">
        DJ Christina will review your details and follow up.
      </p>

      <div className="mt-6 border-t border-white/15 pt-5">
        <p className="font-body text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
          Breakdown
        </p>
        <ul className="mt-3 space-y-1.5 font-body text-[15px] text-white/90">
          {quote.breakdown.map((line, i) => (
            <li key={i} className="leading-snug">
              {line}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 font-body text-[13px] text-white/70">{quote.disclaimer}</p>
    </div>
  );
}
