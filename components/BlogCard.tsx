import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatDateLong } from "@/lib/format";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="liquid-glass group flex h-full flex-col rounded-[1.25rem] p-6 transition-all duration-[250ms] ease-out hover:shadow-[0_8px_32px_rgba(168,133,75,0.12)] motion-safe:hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-body text-[12px] uppercase tracking-[0.18em] text-gold">
          // Notes
        </p>
        <p className="font-body text-[13px] text-white/70">
          {formatDateLong(post.date)}
        </p>
      </div>
      <h3 className="mt-4 font-heading text-2xl italic leading-tight tracking-[-0.5px] text-white">
        <Link href={`/blog/${post.slug}`} className="transition hover:text-white/85">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 font-body text-[15px] leading-relaxed text-white/85">
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 font-body text-[15px] font-medium text-white transition-all duration-200 group-hover:gap-2.5 hover:text-goldsoft"
      >
        Read more
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
