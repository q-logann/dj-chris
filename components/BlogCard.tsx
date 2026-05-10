import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatDateLong } from "@/lib/format";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex h-full flex-col rounded-xl2 border border-mist/70 bg-ivory p-6 shadow-soft">
      <p className="text-xs uppercase tracking-wider text-graphite">
        {formatDateLong(post.date)}
      </p>
      <h3 className="mt-2 font-serif text-xl text-charcoal">
        <Link href={`/blog/${post.slug}`} className="hover:text-gold">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm text-graphite">{post.excerpt}</p>
      <div className="mt-auto pt-4">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-charcoal underline-offset-4 hover:text-gold hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
