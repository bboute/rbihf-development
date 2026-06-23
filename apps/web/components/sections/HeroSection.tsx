"use client";

import type { JSX } from "react";
import Link from "next/link";

const heroGatewayItems = [
  {
    title: "RBIHF Academy",
    description:
      "Future RBIHF learning platform for players, parents, coaches and federation staff.",
    href: "/academy",
    cta: "Explore Academy",
  },
  {
    title: "Talent Pool",
    description:
      "See how RBIHF scouts players, adds federation concepts and international exposure, and prepares the pathway toward future national teams alongside club development.",
    href: "/talent-pool",
    cta: "View Pathway",
  },
  {
    title: "National Teams",
    description:
      "Follow representative team activity, selection moments, camps and event communication.",
    href: "/national-teams",
    cta: "See Teams",
  },
  {
    title: "Club Development",
    description:
      "See the age pathway, minimum practice standards, and what good youth development should look like in every Belgian club.",
    href: "/club-development",
    cta: "View Framework",
  },
] as const;

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
}

function formatHeroDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-BE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function HeroSection({ videoUrl, featuredPost }: HeroSectionProps = {}): JSX.Element {
  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(200,43,58,0.14),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(242,194,48,0.18),_transparent_28%),linear-gradient(180deg,_rgba(245,242,235,1)_0%,_rgba(255,251,245,1)_100%)] pt-28 text-foreground">
      {/* Background video */}
      {videoUrl && (
        <div className="absolute inset-0 opacity-25">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      <div className="absolute inset-0 bg-background/88"></div>

      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxQTFBMUEiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxNSIgc3Ryb2tlPSIjMUExQTFBIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start xl:gap-10">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <p className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                RBIHF Development
              </p>

              <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl xl:text-7xl">
                Youth Development Framework
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                A clear structure for academy learning, club development, talent identification, and national team pathways, helping Belgian players, parents, coaches, and clubs understand each next step from first contact to U20.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#news"
                className="inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                Latest News
              </Link>
              <Link
                href="/#calendar"
                className="inline-flex items-center rounded-full border border-foreground/15 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                View Calendar
              </Link>
            </div>
          </div>

          <div className="w-full lg:self-start lg:pt-16 xl:pt-[4.5rem]">
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-black/10 bg-[#111111] p-6 text-white shadow-[0_25px_80px_rgba(17,17,17,0.18)] lg:mt-0">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%,rgba(200,43,58,0.24),rgba(242,194,48,0.12))]"></div>
              <div className="relative space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                    Highlighted News
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">
                    {featuredPost ? featuredPost.title : "Latest federation update"}
                  </h2>
                </div>

                {featuredPost ? (
                  <>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
                        {formatHeroDate(featuredPost.publishedAt)}
                      </span>
                      {featuredPost.categories?.[0] && (
                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
                          {featuredPost.categories[0].title}
                        </span>
                      )}
                    </div>

                    <p className="text-base leading-7 text-white/82">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/news/${featuredPost.slug.current}`}
                        className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/90"
                      >
                        Read More
                      </Link>
                      <Link
                        href="/news"
                        className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                      >
                        All News
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-base leading-7 text-white/82">
                      Add at least one news item in Sanity and the hero will automatically feature it here with direct links into the newsroom.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/news"
                        className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/90"
                      >
                        All News
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {heroGatewayItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-primary/10 bg-white/75 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-lg"
            >
              <p className="text-2xl font-bold text-secondary">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
              <p className="mt-5 text-sm font-semibold text-foreground transition-colors group-hover:text-secondary">
                {item.cta}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
