"use client";

import { type JSX, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
  imageUrl?: string;
}

interface NewsSectionProps {
  posts: Post[];
}

// Consistent date formatting that works on both server and client
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function NewsSection({ posts }: NewsSectionProps): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract featured post (first in array)
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  // Extract unique categories from posts
  const categories = Array.from(
    new Set(
      posts.flatMap(
        (post: Post) =>
          post.categories?.map((cat: { title: string }) => cat.title) || [],
      ),
    ),
  ) as string[];

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return remainingPosts;
    }
    return remainingPosts.filter((post: Post) =>
      post.categories?.some(
        (cat: { title: string }) => cat.title === selectedCategory,
      ),
    );
  }, [selectedCategory, remainingPosts]);

  // No posts case
  if (posts.length === 0) {
    return (
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Latest News</h2>
            <p className="text-muted-foreground">
              No news articles available yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="news"
      className="relative overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(200,43,58,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(242,194,48,0.12),_transparent_28%),linear-gradient(180deg,_rgba(245,242,235,1)_0%,_rgba(255,251,245,1)_100%)] py-20"
    >
      {/* Subtle brush-stroke texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Latest News
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Stay updated with announcements from RBIHF Development Hub.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center rounded-full border border-foreground/15 bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            View All
          </Link>
        </div>

        {/* Category Filter - Horizontal scroll on mobile */}
        <div className="mb-10 -mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
          <div className="flex gap-2 sm:flex-wrap">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary/20 bg-background text-foreground hover:bg-primary/10"
              }`}
            >
              All News
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary/20 bg-background text-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post - Dark Card */}
        {featuredPost && selectedCategory === "all" && (
          <article className="mb-12">
            <Link
              href={`/news/${featuredPost.slug.current}`}
              className="group relative block overflow-hidden rounded-[2rem] bg-[#111111] text-white shadow-[0_25px_80px_rgba(17,17,17,0.18)]"
            >
              {/* Gradient overlay with Belgian colors */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%,rgba(200,43,58,0.18),rgba(242,194,48,0.12))]" />

              {/* Image */}
              {featuredPost.imageUrl && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="relative p-6 sm:p-8">
                {/* Category Badge */}
                {featuredPost.categories?.[0] && (
                  <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
                    {featuredPost.categories[0].title}
                  </span>
                )}

                <h3 className="mb-3 text-2xl font-bold leading-tight sm:text-3xl">
                  {featuredPost.title}
                </h3>

                <p className="mb-5 max-w-2xl text-base leading-relaxed text-white/80">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <time className="text-sm text-white/60">
                    {formatDate(featuredPost.publishedAt)}
                  </time>

                  <span className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors group-hover:bg-white/90">
                    Read Article
                  </span>
                </div>
              </div>

              {/* Placeholder if no image */}
              {!featuredPost.imageUrl && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
              )}
            </Link>
          </article>
        )}

        {/* Regular Posts Grid */}
        {filteredPosts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post._id}
                className="group overflow-hidden rounded-3xl border border-primary/10 bg-white/75 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-lg"
              >
                <Link
                  href={`/news/${post.slug.current}`}
                  className="block"
                >
                  {/* Image */}
                  {post.imageUrl && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    {/* Category Badge */}
                    {post.categories?.[0] && (
                      <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {post.categories[0].title}
                      </span>
                    )}

                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight text-foreground group-hover:text-secondary">
                      {post.title}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <time className="text-xs text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* No results */}
        {filteredPosts.length === 0 && selectedCategory !== "all" && (
          <div className="rounded-2xl border border-primary/10 bg-white/50 py-16 text-center">
            <p className="text-muted-foreground">
              No news articles found for the selected category.
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Show all news
            </button>
          </div>
        )}

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
