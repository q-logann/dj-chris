import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatDateLong } from "@/lib/format";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="liquid-glass group flex h-full flex-col rounded-[1.25rem] p-6 transition-transform duration-300 ease-out hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <p className="font-body text-[11px] uppercase tracking-[0.18em] text-gold">
          // Notes
        </p>
        <p className="font-body text-xs text-white/60">
          {formatDateLong(post.date)}
        </p>
      </div>
      <h3 className="mt-4 font-heading text-2xl italic leading-tight tracking-[-0.5px] text-white">
        <Link href={`/blog/${post.slug}`} className="transition hover:text-white/85">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-white/80">
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 font-body text-sm font-medium text-white transition group-hover:gap-2.5"
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
