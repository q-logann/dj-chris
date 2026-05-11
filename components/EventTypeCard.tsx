import Link from "next/link";

type Props = {
  title: string;
  bestFor: string;
  vibe: string;
  why: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** Optional track number — "01" / "02" — printed in italic serif at the
   *  top of the card to make the grid feel like a setlist. */
  trackNumber?: string;
};

export default function EventTypeCard({
  title,
  bestFor,
  vibe,
  why,
  ctaHref = "/quote",
  ctaLabel = "Request a quote",
  trackNumber,
}: Props) {
  return (
    <article className="liquid-glass group flex h-full flex-col rounded-[1.25rem] p-6 transition-all duration-[250ms] ease-out hover:shadow-[0_8px_32px_rgba(168,133,75,0.12)] motion-safe:hover:-translate-y-0.5">
      {trackNumber && (
        <p className="font-heading text-2xl italic leading-none tracking-[-0.02em] text-gold">
          {trackNumber}
        </p>
      )}
      <h3
        className={`font-heading text-2xl italic leading-tight tracking-[-0.5px] text-white md:text-3xl ${
          trackNumber ? "mt-3" : ""
        }`}
      >
        {title}
      </h3>
      <dl className="mt-5 flex-1 space-y-4 font-body text-[15px]">
        <Row tag="Best for" body={bestFor} />
        <Row tag="Vibe" body={vibe} />
        <Row tag="Why book" body={why} />
      </dl>
      <Link
        href={ctaHref}
        className="mt-6 inline-flex items-center gap-1.5 self-start font-body text-[15px] font-medium text-white transition-all duration-200 group-hover:gap-2.5 hover:text-goldsoft"
      >
        {ctaLabel}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

function Row({ tag, body }: { tag: string; body: string }) {
  return (
    <div>
      <dt className="text-[12px] font-medium uppercase tracking-[0.18em] text-gold">
        {tag}
      </dt>
      <dd className="mt-1 text-white/90">{body}</dd>
    </div>
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
