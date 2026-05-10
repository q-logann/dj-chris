import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
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
    <Section bg="ivory">
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm text-graphite hover:text-charcoal">← All posts</Link>
        <p className="mt-6 text-xs uppercase tracking-wider text-graphite">
          {formatDateLong(post.date)}
        </p>
        <h1 className="mt-2 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-charcoal/90">
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-12 rounded-xl2 border border-mist/70 bg-cream p-6 text-sm text-graphite">
          Planning an event? <Link href="/quote" className="font-medium text-charcoal underline-offset-4 hover:underline">Get a quick quote →</Link>
        </div>
      </article>
    </Section>
  );
}
