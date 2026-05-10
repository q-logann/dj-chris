import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import EqBars from "@/components/EqBars";
import { BRAND } from "@/lib/constants";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDateLong } from "@/lib/format";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: `Not found — ${BRAND.name}` };
  return {
    title: `${post.title} — ${BRAND.name}`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default function BlogPostPage({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-16 md:py-24 lg:px-20">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-body text-sm text-white/65 transition hover:text-white"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            All notes
          </Link>

          <p className="mt-10 flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-gold">
            <EqBars className="h-3 text-gold" />
            {formatDateLong(post.date)}
          </p>

          <h1 className="mt-4 font-heading text-4xl italic leading-[1] tracking-[-1.5px] text-white sm:text-6xl">
            {post.title}
          </h1>

          <div className="mt-10 space-y-5 font-body text-base leading-relaxed text-white/85 md:text-lg">
            {post.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="liquid-glass mt-14 rounded-[1.25rem] p-6 font-body text-sm text-white/85 sm:p-8">
            <p>
              Planning an event?{" "}
              <Link
                href="/quote"
                className="font-medium text-white underline-offset-4 hover:underline"
              >
                Get a quick quote →
              </Link>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
