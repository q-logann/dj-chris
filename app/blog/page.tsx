import type { Metadata } from "next";
import Section from "@/components/Section";
import BlogCard from "@/components/BlogCard";
import { BRAND } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: `Planning Tips — ${BRAND.name}`,
  description:
    "Practical articles on planning music for showers, restaurants, and private events near Lawrenceville and Suwanee, GA.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <Section bg="ivory">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Planning tips</p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl text-charcoal sm:text-5xl">
          Helpful reads before you book.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-graphite">
          Short, practical articles on planning music for the kinds of events we DJ most often.
        </p>
      </Section>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
