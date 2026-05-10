import Link from "next/link";

type Props = {
  title: string;
  bestFor: string;
  vibe: string;
  why: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function EventTypeCard({ title, bestFor, vibe, why, ctaHref = "/quote", ctaLabel = "Request a quote" }: Props) {
  return (
    <article className="flex h-full flex-col rounded-xl2 border border-mist/70 bg-ivory p-6 shadow-soft transition hover:border-goldsoft/40">
      <h3 className="font-serif text-xl text-charcoal">{title}</h3>
      <dl className="mt-4 space-y-3 text-sm text-graphite">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Best for</dt>
          <dd className="mt-1 text-charcoal">{bestFor}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Vibe</dt>
          <dd className="mt-1 text-charcoal">{vibe}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Why book</dt>
          <dd className="mt-1 text-charcoal">{why}</dd>
        </div>
      </dl>
      <div className="mt-6 pt-2">
        <Link
          href={ctaHref}
          className="inline-flex items-center text-sm font-medium text-charcoal underline-offset-4 hover:text-gold hover:underline"
        >
          {ctaLabel} →
        </Link>
      </div>
    </article>
  );
}
