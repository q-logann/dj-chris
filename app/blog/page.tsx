import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import EqBars from "@/components/EqBars";
import SoundwaveDivider from "@/components/SoundwaveDivider";
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
      {/* Page header — dark, glass kicker, italic headline */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-16 md:py-24 lg:px-20">
          <p className="flex items-center gap-2 font-body text-[13px] font-medium uppercase tracking-[0.18em] text-gold">
            <EqBars className="h-3 text-gold" />
            // Planning notes
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-5xl italic leading-[0.95] tracking-[-2px] text-white md:text-7xl">
            Helpful reads before you book.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base text-white/80 md:text-lg">
            Short, practical articles on planning music for the kinds of events
            we DJ most often.
          </p>
        </div>
      </section>

      <SoundwaveDivider className="bg-black" />

      {/* Notes grid */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 pb-24 md:px-16 lg:px-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
