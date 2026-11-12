"use client";

import type { JSX } from "react";
import Link from "next/link";

const DEFAULT_HERO_VIDEO =
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4";

interface HeroFeaturedPost {
  title: string;
  excerpt: string;
  publishedAt: string;
  slug: { current: string };
  categories?: Array<{
    _id: string;
    title: string;
  }>;
}

interface HeroSectionProps {
  videoUrl?: string;
  featuredPost?: HeroFeaturedPost;
  highlightedPosts?: HeroFeaturedPost[];
}

function formatHeroDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-BE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function HeroSection({
  videoUrl,
  featuredPost,
  highlightedPosts = [],
}: HeroSectionProps = {}): JSX.Element {
  const resolvedVideoUrl = videoUrl ?? DEFAULT_HERO_VIDEO;
  const updates = featuredPost
    ? [
        featuredPost,
        ...highlightedPosts.filter((p) => p.slug.current !== featuredPost.slug.current),
      ].slice(0, 3)
    : highlightedPosts.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#111111] text-white">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={resolvedVideoUrl} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"
      ></div>

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl items-center px-4 pb-3 pt-28 sm:px-6 sm:pb-4 lg:px-8 lg:pb-20">
        <div className="max-w-3xl space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            Youth Development Framework
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl xl:text-7xl">
            Belgian hockey has a clear next step.
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
            One development pathway for players, parents, coaches and clubs—from first contact with the game through national-team preparation.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/#pathway"
              className="inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              Find your age group
            </Link>
            <Link
              href="/#programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/80"
            >
              Explore the framework <span aria-hidden="true">→</span>
            </Link>
          </div>

          {updates.length > 0 && (
            <div className="space-y-3 border-t border-white/15 pt-6 text-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Latest updates
              </span>
              <ul className="space-y-2.5">
                {updates.map((post) => (
                  <li key={post.slug.current}>
                    <Link
                      href={`/news/${post.slug.current}`}
                      className="group/update inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
                    >
                      <span className="text-white/55">
                        {formatHeroDate(post.publishedAt)}
                      </span>
                      <span className="font-semibold text-white transition-colors group-hover/update:text-white/80">
                        {post.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-white/60 transition-transform duration-300 group-hover/update:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
              >
                All updates <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Scroll-down indicator */}
      {/* Scroll-down indicator */}
      <a
        href="#pathway"
        aria-label="Scroll to next section"
        className="group absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <span className="relative flex h-14 w-8 items-center justify-center overflow-hidden rounded-full border border-white/40 transition-colors group-hover:border-white/70">
          <span className="absolute h-4 w-px animate-[scrollhint_1.6s_ease-in-out_infinite] bg-white/80"></span>
        </span>
      </a>
    </section>
  );
}
