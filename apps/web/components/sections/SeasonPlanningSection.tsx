"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarDays, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { formatEventRange } from "@/lib/eventFormatting";
import { formatPageCopy, type EventLabels } from "@/lib/hubPageContent";
import {
  calendarAgeFilters,
  calendarEntryStatus,
  filterCalendarEntries,
  type CalendarEntry,
} from "@/lib/calendar";

interface PlannerCopy {
  eyebrow: string;
  title: string;
  description: string;
  filterLabel: string;
  allGroups: string;
  showPrevious: string;
  hidePrevious: string;
  showMore: string;
  hideMore: string;
  lastEvent: string;
  emptyTitle: string;
  emptyDescription: string;
}

interface SeasonPlanningSectionProps {
  events: CalendarEntry[];
  labels: EventLabels;
  id?: string;
  theme?: "light" | "dark";
  copy?: Partial<PlannerCopy>;
}

const defaultCopy: PlannerCopy = {
  eyebrow: "Calendar",
  title: "Season planning",
  description:
    "Events, camps and games for each age group, together in one schedule.",
  filterLabel: "Age group",
  allGroups: "All groups",
  showPrevious: "Show earlier events",
  hidePrevious: "Show fewer previous events",
  showMore: "Show more events",
  hideMore: "Show fewer events",
  lastEvent: "Last event",
  emptyTitle: "No upcoming activity planned.",
  emptyDescription: "",
};

const initialUpcomingEventCount = 5;
const eventsPerPage = 5;

export function SeasonPlanningSection({
  events,
  labels,
  id = "calendar",
  theme = "dark",
  copy,
}: SeasonPlanningSectionProps) {
  const text = { ...defaultCopy, ...copy };
  const [selectedAge, setSelectedAge] = useState("all");
  const [visibleEventCount, setVisibleEventCount] = useState(
    initialUpcomingEventCount,
  );
  const [visiblePastEventCount, setVisiblePastEventCount] = useState(1);
  const reduceMotion = useReducedMotion();
  const ageFilters = useMemo(() => calendarAgeFilters(events), [events]);
  const filteredEvents = useMemo(
    () => filterCalendarEntries(events, selectedAge),
    [events, selectedAge],
  );
  const now = Date.now();
  const isPast = (event: CalendarEntry) =>
    new Date(event.endDate ?? event.eventDate).getTime() < now ||
    event.status === "completed";
  const upcomingEvents = filteredEvents.filter((event) => !isPast(event));
  const pastEvents = filteredEvents
    .filter(isPast)
    .sort(
      (a, b) =>
        new Date(b.endDate ?? b.eventDate).getTime() -
        new Date(a.endDate ?? a.eventDate).getTime(),
    );
  const previousEvents = pastEvents.slice(0, visiblePastEventCount).reverse();
  const nextEvents = upcomingEvents.slice(0, visibleEventCount);
  const plannerEvents = [...previousEvents, ...nextEvents];
  const rowsId = `${id}-event-rows`;
  const controlClass =
    "flex h-16 min-w-0 flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary";

  return (
    <section
      id={id}
      className={`section-rhythm scroll-mt-32 bg-background text-foreground ${
        theme === "dark"
          ? "[--background:#152E35] [--foreground:#ffffff] [--primary:#ffffff] [--secondary:#F08992] [--muted:#203940] [--muted-foreground:#a6b0b3] [--border:#ffffff26]"
          : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            {text.eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                {text.eyebrow}
              </p>
            )}
            {text.title && (
              <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
                {text.title}
              </h2>
            )}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground lg:justify-end">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              {labels.confirmed}
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full border-2 border-secondary"
                aria-hidden="true"
              />
              {labels.provisional}
            </span>
            {text.description && (
              <p className="basis-full">{text.description}</p>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          {text.filterLabel && (
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {text.filterLabel}
            </span>
          )}
          <div
            role="group"
            aria-label="Filter calendar by age group"
            className="flex w-fit max-w-full overflow-x-auto rounded-md border border-border bg-muted/40 p-1"
          >
            {ageFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={selectedAge === filter.value}
                onClick={() => {
                  setSelectedAge(filter.value);
                  setVisibleEventCount(initialUpcomingEventCount);
                  setVisiblePastEventCount(1);
                }}
                className={`min-w-max rounded px-4 py-2 text-sm font-bold transition-colors ${selectedAge === filter.value ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {filter.value === "all"
                  ? text.allGroups || "All groups"
                  : filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 border-y border-border">
          {pastEvents.length > 1 && (
            <div className="flex border-b border-border">
              {previousEvents.length < pastEvents.length && (
                <button
                  type="button"
                  aria-label={text.showPrevious || defaultCopy.showPrevious}
                  aria-controls={rowsId}
                  aria-expanded={previousEvents.length > 1}
                  onClick={() =>
                    setVisiblePastEventCount((count) => count + eventsPerPage)
                  }
                  className={controlClass}
                >
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                  {text.showPrevious}
                </button>
              )}
              {previousEvents.length > 1 && (
                <button
                  type="button"
                  aria-label={text.hidePrevious || defaultCopy.hidePrevious}
                  aria-controls={rowsId}
                  aria-expanded={true}
                  onClick={() => setVisiblePastEventCount(1)}
                  className={controlClass}
                >
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  {text.hidePrevious}
                </button>
              )}
            </div>
          )}
          <div id={rowsId} key={selectedAge}>
            <AnimatePresence initial={false}>
              {plannerEvents.map((event, index) => {
                const past = isPast(event);
                const status = calendarEntryStatus(event, now);
                const isLastPastEvent = event._id === pastEvents[0]?._id;
                const isExtraEvent = past
                  ? !isLastPastEvent
                  : index - previousEvents.length >= initialUpcomingEventCount;
                return (
                  <motion.div
                    key={event._id}
                    initial={
                      isExtraEvent && !reduceMotion
                        ? { height: 0, opacity: 0 }
                        : false
                    }
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <article
                      className={`grid gap-4 px-4 py-6 sm:px-6 md:grid-cols-[9rem_1fr_auto] md:items-center ${index > 0 ? "border-t border-border" : ""} ${past ? "bg-muted/40 text-muted-foreground" : ""}`}
                    >
                      <time
                        dateTime={event.eventDate}
                        className="font-heading text-2xl font-bold"
                      >
                        {formatEventRange(event)}
                      </time>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] ${status === "provisional" || status === "cancelled" ? "border border-secondary text-secondary" : past ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}
                          >
                            {labels[status]}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                            {isLastPastEvent &&
                              text.lastEvent &&
                              `${text.lastEvent} · `}
                            {event.categories
                              .map((category) => category.title)
                              .join(" · ") || text.allGroups}
                          </span>
                        </div>
                        <h3 className="mt-2 text-xl font-bold">
                          {event.title}
                        </h3>
                        {event.kind === "exhibitionGame" && (
                          <>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Belgium vs {event.opponent}
                              {event.result ? ` · ${event.result}` : ""}
                            </p>
                            {event.ticketUrl &&
                              !past &&
                              status !== "cancelled" && (
                                <Link
                                  href={event.ticketUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary"
                                >
                                  Event details{" "}
                                  <span aria-hidden="true">→</span>
                                </Link>
                              )}
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground md:justify-end">
                        <MapPin
                          className={`h-4 w-4 shrink-0 ${past ? "text-muted-foreground" : "text-secondary"}`}
                          aria-hidden="true"
                        />
                        {event.venue}
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {nextEvents.length === 0 &&
            (text.emptyTitle || text.emptyDescription) && (
              <div
                className={`py-12 text-center ${plannerEvents.length > 0 ? "border-t border-border" : ""}`}
              >
                <CalendarDays
                  className="mx-auto h-8 w-8 text-muted-foreground"
                  aria-hidden="true"
                />
                {text.emptyTitle && (
                  <p className="mt-3 font-bold">
                    {formatPageCopy(text.emptyTitle, {
                      team:
                        ageFilters.find(
                          (filter) => filter.value === selectedAge,
                        )?.label ?? text.allGroups,
                    })}
                  </p>
                )}
                {text.emptyDescription && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {text.emptyDescription}
                  </p>
                )}
              </div>
            )}
        </div>
        {upcomingEvents.length > initialUpcomingEventCount && (
          <div className="flex">
            {nextEvents.length < upcomingEvents.length && (
              <button
                type="button"
                aria-label={text.showMore || defaultCopy.showMore}
                aria-controls={rowsId}
                aria-expanded={nextEvents.length > initialUpcomingEventCount}
                onClick={() =>
                  setVisibleEventCount((count) => count + eventsPerPage)
                }
                className={controlClass}
              >
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                {text.showMore}
              </button>
            )}
            {nextEvents.length > initialUpcomingEventCount && (
              <button
                type="button"
                aria-label={text.hideMore || defaultCopy.hideMore}
                aria-controls={rowsId}
                aria-expanded={true}
                onClick={() => setVisibleEventCount(initialUpcomingEventCount)}
                className={controlClass}
              >
                <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                {text.hideMore}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
