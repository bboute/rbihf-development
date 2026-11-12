"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SeasonPlanningSection } from "@/components/sections/SeasonPlanningSection";
import type { NationalTeamsPageCopy, EventLabels } from "@/lib/hubPageContent";
import type { CalendarEntry } from "@/lib/calendar";
import type { NationalTeamPost } from "@/lib/nationalTeams";
import { formatEventDate } from "@/lib/eventFormatting";

interface NationalTeamsHubProps {
  events: CalendarEntry[];
  posts: NationalTeamPost[];
  copy: NationalTeamsPageCopy;
  labels: EventLabels;
}

export function NationalTeamsHub({
  events,
  posts,
  copy,
  labels,
}: NationalTeamsHubProps) {
  return (
    <>
      {events.length > 0 && (
        <SeasonPlanningSection
          events={events}
          labels={labels}
          theme="light"
          copy={{
            eyebrow: copy.calendarEyebrow,
            title: copy.calendarTitle,
            description: copy.calendarDescription,
            filterLabel: copy.calendarFilterLabel,
            emptyTitle: copy.calendarEmptyTitle,
            emptyDescription: copy.calendarEmptyDescription,
          }}
        />
      )}

      {posts.length > 0 && (
        <section
          id="updates"
          className="section-rhythm scroll-mt-32 bg-[#152E35] text-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {copy.newsEyebrow && (
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F08992]">
                    {copy.newsEyebrow}
                  </p>
                )}
                {copy.newsTitle && (
                  <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
                    {copy.newsTitle}
                  </h2>
                )}
                {copy.newsDescription && (
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
                    {copy.newsDescription}
                  </p>
                )}
              </div>
              {copy.newsLink && (
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white"
                >
                  {copy.newsLink}{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
            <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {posts.slice(0, 6).map((post) => (
                <article key={post._id} className="py-6">
                  <Link
                    href={`/news/${post.slug.current}`}
                    className="group grid gap-3 sm:grid-cols-[10rem_1fr_auto] sm:items-center"
                  >
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs font-bold uppercase tracking-[0.14em] text-white/50"
                    >
                      {formatEventDate(post.publishedAt)}
                    </time>
                    <span>
                      <span className="block text-xl font-bold leading-snug group-hover:text-[#F08992]">
                        {post.title}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-white/65">
                        {post.excerpt}
                      </span>
                    </span>
                    <ArrowRight
                      className="hidden h-5 w-5 text-white/55 transition-transform group-hover:translate-x-1 group-hover:text-white sm:block"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
