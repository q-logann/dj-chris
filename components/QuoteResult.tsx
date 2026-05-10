import type { QuoteResult } from "@/types/inquiry";
import { formatUSD } from "@/lib/format";

export default function QuoteResultCard({ quote }: { quote: QuoteResult }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl2 border border-mist/70 bg-ivory p-6 shadow-soft sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">
        Estimated quote
      </p>
      <p className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">
        {formatUSD(quote.lowEstimate)} – {formatUSD(quote.highEstimate)}
      </p>
      <p className="mt-3 text-sm text-graphite">
        DJ Christina will review your details and follow up.
      </p>

      <div className="mt-6 border-t border-mist pt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-graphite">
          Breakdown
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-charcoal">
          {quote.breakdown.map((line, i) => (
            <li key={i} className="leading-snug">{line}</li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-xs text-graphite">{quote.disclaimer}</p>
    </div>
  );
}
