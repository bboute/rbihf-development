import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { YearPlanner } from "@/components/calendar/YearPlanner";
import {
  getEventLabels,
  getCalendarEntries,
  getCalendarPageContent,
} from "@/lib/sanityClient";

export const metadata: Metadata = {
  title: "Calendar | RBIHF Development Centre of Excellence",
  description:
    "Explore events, camps and games across all age groups in the RBIHF year planner.",
};

export default async function CalendarPage() {
  const [events, { copy, heroImageUrl, heroImagePosition }, labels] =
    await Promise.all([
      getCalendarEntries(),
      getCalendarPageContent(),
      getEventLabels(),
    ]);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative flex min-h-[60svh] items-end overflow-hidden bg-[#102D35] text-white">
        <Image
          src={heroImageUrl ?? "/image.png"}
          alt={copy.heroImageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: heroImagePosition }}
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-3 pt-32 sm:px-6 sm:pb-4 lg:px-8 lg:pb-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
              {copy.heroEyebrow}
            </p>
            <h1 className="mt-4 font-heading text-6xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              Calendar
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              {copy.calendarDescription}
            </p>
            <Link
              href="/talent-pool#planner"
              className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-white/85 hover:text-white"
            >
              {copy.heroPlannerLink}{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <div className="section-rhythm mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <YearPlanner
          events={events}
          now={Date.now()}
          copy={copy}
          labels={labels}
        />
      </div>
    </main>
  );
}
