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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-BE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function NewsSection({ posts }: NewsSectionProps): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          posts.flatMap(
            (post) => post.categories?.map((category) => category.title) ?? [],
          ),
        ),
      ),
    [posts],
  );

  const visiblePosts = useMemo(
    () =>
      selectedCategory === "all"
        ? posts
        : posts.filter((post) =>
            post.categories?.some(
              (category) => category.title === selectedCategory,
            ),
          ),
    [posts, selectedCategory],
  );

  const featuredPost = visiblePosts[0];
  const recentPosts = visiblePosts.slice(1, 4);
  const remainingPosts = visiblePosts.slice(4);

  return (
    <section id="news" className="section-rhythm bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              News &amp; updates
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Framework updates, without the noise.
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 lg:justify-end">
            <p className="max-w-md text-lg leading-8 text-muted-foreground">
              Official development guidance and practical announcements,
              organised by pillar.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary"
            >
              View all updates <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 -mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
          <div
            aria-label="Filter news by category"
            role="group"
            className="flex w-fit gap-1 rounded-md border border-border bg-muted/40 p-1"
          >
            {["all", ...categories].map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded px-4 py-2 text-sm font-bold transition-colors ${
                    isSelected
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category === "all" ? "All updates" : category}
                </button>
              );
            })}
          </div>
        </div>

        {featuredPost ? (
          <>
            <div
              className={`mt-8 grid gap-8 ${
                recentPosts.length > 0 ? "lg:grid-cols-[1.2fr_0.8fr]" : ""
              }`}
            >
              <Link
                href={`/news/${featuredPost.slug.current}`}
                className="group relative flex min-h-[22rem] overflow-hidden rounded-md bg-[#152E35] text-white"
              >
                {featuredPost.imageUrl && (
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <div className="relative mt-auto p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">
                    {featuredPost.categories?.[0]?.title ?? "Update"} ·{" "}
                    {formatDate(featuredPost.publishedAt)}
                  </p>
                  <h3 className="mt-3 max-w-2xl font-heading text-3xl font-bold leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
                    {featuredPost.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                    Read the update
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>

              {recentPosts.length > 0 && (
                <div className="divide-y divide-border border-y border-border">
                  {recentPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/news/${post.slug.current}`}
                      className="group block py-5 first:pt-5"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        {post.categories?.[0]?.title ?? "Update"} ·{" "}
                        {formatDate(post.publishedAt)}
                      </p>
                      <h3 className="mt-2 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {remainingPosts.length > 0 && (
              <div className="mt-8 grid border-t border-border md:grid-cols-2 md:divide-x md:divide-border">
                {remainingPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/news/${post.slug.current}`}
                    className="group border-b border-border px-4 py-6 transition-colors hover:bg-muted/40 md:px-7"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {post.categories?.[0]?.title ?? "Update"} ·{" "}
                      {formatDate(post.publishedAt)}
                    </p>
                    <h3 className="mt-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 border-y border-border py-12 text-center">
            <p className="font-bold text-foreground">
              {posts.length === 0
                ? "No updates available yet."
                : "No updates in this category."}
            </p>
            {selectedCategory !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="mt-3 text-sm font-bold text-primary hover:text-secondary"
              >
                Show all updates
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
