"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { formatEventDate, formatEventRange } from "@/lib/eventFormatting";
import {
  formatPageCopy,
  type TalentPoolPageCopy,
  type EventLabels,
} from "@/lib/hubPageContent";
import {
  calendarAgeFilters,
  calendarEntryStatus,
  filterCalendarEntries,
  type CalendarEntry,
} from "@/lib/calendar";

interface YearPlannerProps {
  events: CalendarEntry[];
  now: number;
  copy: TalentPoolPageCopy;
  labels: EventLabels;
}

function calendarDay(dateString: string): number {
  const date = new Date(dateString);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function YearPlanner({ events, now, copy, labels }: YearPlannerProps) {
  const currentYear = new Date(now).getUTCFullYear();
  const [year, setYear] = useState(currentYear);
  const [selectedAge, setSelectedAge] = useState("all");
  const today = calendarDay(new Date(now).toISOString());
  const yearStart = Date.UTC(year, 0, 1);
  const yearEnd = Date.UTC(year + 1, 0, 1);
  const yearEvents = filterCalendarEntries(events, selectedAge)
    .filter(
      (event) =>
        calendarDay(event.eventDate) < yearEnd &&
        calendarDay(event.endDate ?? event.eventDate) >= yearStart,
    )
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
    );

  return (
    <section aria-labelledby="year-planner-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {copy.calendarEyebrow}
          </p>
          <h2
            id="year-planner-heading"
            className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl"
          >
            {copy.calendarTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {copy.calendarDescription}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setYear(currentYear)}
            className="rounded px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {copy.calendarThisYear}
          </button>
          <div className="flex items-center rounded-md border border-border bg-card">
            <button
              type="button"
              aria-label={copy.calendarPreviousYear}
              onClick={() => setYear((value) => value - 1)}
              className="rounded-l-md p-3 text-foreground hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span
              aria-live="polite"
              aria-atomic="true"
              className="min-w-16 text-center font-heading text-xl font-bold tabular-nums"
            >
              {year}
            </span>
            <button
              type="button"
              aria-label={copy.calendarNextYear}
              onClick={() => setYear((value) => value + 1)}
              className="rounded-r-md p-3 text-foreground hover:bg-muted"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {copy.plannerFilterLabel}
        </span>
        <div
          className="flex w-fit max-w-full overflow-x-auto rounded-md border border-border bg-muted/40 p-1"
          aria-label="Filter calendar by age group"
        >
          {calendarAgeFilters(events).map(({ value: age, label }) => (
            <button
              key={age}
              type="button"
              onClick={() => setSelectedAge(age)}
              aria-pressed={selectedAge === age}
              className={`min-w-max rounded px-4 py-2 text-sm font-bold transition-colors ${selectedAge === age ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {age === "all" ? copy.plannerAllGroups || "All groups" : label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <p role="status">
          {formatPageCopy(
            yearEvents.length === 1
              ? copy.calendarSingleCount
              : copy.calendarCount,
            { count: yearEvents.length, year },
          )}
          {yearEvents.length === 0 && ` · ${copy.calendarEmptyYear}`}
        </p>
        <div
          className="flex flex-wrap gap-x-4 gap-y-2"
          aria-label="Calendar legend"
        >
          <span className="inline-flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm bg-primary"
              aria-hidden="true"
            />
            {labels.confirmed}
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm border border-dashed border-secondary"
              aria-hidden="true"
            />
            {labels.provisional}
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm border border-border bg-muted"
              aria-hidden="true"
            />
            {labels.completed}
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm outline outline-2 outline-secondary"
              aria-hidden="true"
            />
            {copy.calendarToday}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }, (_, month) => {
          const monthStart = Date.UTC(year, month, 1);
          const nextMonth = Date.UTC(year, month + 1, 1);
          const daysInMonth = new Date(nextMonth - 1).getUTCDate();
          const firstWeekday = (new Date(monthStart).getUTCDay() + 6) % 7;
          const monthName = new Date(monthStart).toLocaleDateString("en-BE", {
            month: "long",
            timeZone: "UTC",
          });
          const monthEvents = yearEvents.filter(
            (event) =>
              calendarDay(event.eventDate) < nextMonth &&
              calendarDay(event.endDate ?? event.eventDate) >= monthStart,
          );
          const isCurrentMonth =
            year === currentYear && month === new Date(now).getUTCMonth();

          return (
            <section
              key={month}
              aria-label={`${monthName} ${year}`}
              className="min-w-0 bg-card p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {monthName}
                </h3>
                {isCurrentMonth && (
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">
                    {copy.calendarThisMonth}
                  </span>
                )}
              </div>

              <table
                aria-label={`${monthName} ${year} event dates`}
                className="mt-4 w-full table-fixed border-separate border-spacing-y-1 text-center text-xs"
              >
                <thead>
                  <tr>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <th
                        key={day}
                        scope="col"
                        className="pb-2 font-normal text-muted-foreground"
                      >
                        <abbr title={day} className="no-underline">
                          {day.slice(0, 2)}
                        </abbr>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }, (_, week) => (
                    <tr key={week}>
                      {Array.from({ length: 7 }, (_, weekday) => {
                        const day = week * 7 + weekday - firstWeekday + 1;
                        if (day < 1 || day > daysInMonth)
                          return <td key={weekday} className="h-8" />;

                        const date = Date.UTC(year, month, day);
                        const dayEvents = monthEvents.filter(
                          (event) =>
                            calendarDay(event.eventDate) <= date &&
                            calendarDay(event.endDate ?? event.eventDate) >=
                              date,
                        );
                        const hasEvents = dayEvents.length > 0;
                        const allCompleted =
                          hasEvents &&
                          dayEvents.every(
                            (event) =>
                              calendarEntryStatus(event, now) === "completed",
                          );
                        const allProvisional =
                          hasEvents &&
                          dayEvents.every(
                            (event) =>
                              calendarEntryStatus(event, now) === "provisional",
                          );
                        const allCancelled =
                          hasEvents &&
                          dayEvents.every(
                            (event) =>
                              calendarEntryStatus(event, now) === "cancelled",
                          );
                        const dateString = new Date(date)
                          .toISOString()
                          .slice(0, 10);
                        const label = `${formatEventDate(dateString)}${hasEvents ? `: ${dayEvents.map((event) => `${event.title} (${labels[calendarEntryStatus(event, now)]})`).join("; ")}` : ""}`;

                        return (
                          <td key={weekday} className="h-8">
                            <time
                              dateTime={dateString}
                              aria-label={label}
                              aria-current={date === today ? "date" : undefined}
                              title={label}
                              className={`mx-auto flex h-8 w-8 items-center justify-center rounded text-xs tabular-nums ${
                                allCompleted
                                  ? "bg-muted font-bold text-muted-foreground"
                                  : allCancelled
                                    ? "border border-secondary font-bold text-secondary line-through"
                                    : allProvisional
                                      ? "border border-dashed border-secondary font-bold text-secondary"
                                      : hasEvents
                                        ? "bg-primary font-bold text-primary-foreground"
                                        : "text-muted-foreground"
                              } ${date === today ? "outline outline-2 outline-offset-2 outline-secondary" : ""}`}
                            >
                              {day}
                            </time>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 border-t border-border">
                {monthEvents.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {monthEvents.map((event) => {
                      const isCompleted =
                        calendarEntryStatus(event, now) === "completed";

                      return (
                        <li key={event._id} className="py-4">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold">
                            <time
                              dateTime={event.eventDate}
                              className="text-muted-foreground"
                            >
                              {formatEventRange(event)}
                            </time>
                            <span
                              className={
                                isCompleted
                                  ? "text-muted-foreground"
                                  : event.status === "provisional" ||
                                      event.status === "cancelled"
                                    ? "text-secondary"
                                    : "text-primary"
                              }
                            >
                              {labels[calendarEntryStatus(event, now)]}
                            </span>
                          </div>
                          <p
                            className={`mt-2 break-words text-sm font-bold leading-5 ${isCompleted ? "text-muted-foreground" : "text-foreground"}`}
                          >
                            {event.title}
                          </p>
                          <p className="mt-1 text-xs font-bold text-muted-foreground">
                            {event.categories
                              .map((category) => category.title)
                              .join(" · ") || copy.plannerAllGroups}
                          </p>
                          <p className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
                            <MapPin
                              className="mt-0.5 h-3.5 w-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            {event.venue}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="py-4 text-xs text-muted-foreground">
                    {copy.calendarEmptyMonth}
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
