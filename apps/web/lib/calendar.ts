export interface CalendarEntry {
  _id: string;
  kind: "event" | "exhibitionGame";
  title: string;
  eventDate: string;
  endDate?: string;
  venue: string;
  status: "confirmed" | "provisional" | "upcoming" | "completed" | "cancelled";
  categories: Array<{ title: string; slug: string }>;
  opponent?: string;
  result?: string;
  ticketUrl?: string;
}

export type CalendarScope = "all" | "talent-pool" | "national-teams";

const scopeCategories = {
  "talent-pool": ["u14", "u15", "u16"],
  "national-teams": ["u18", "u18m", "u18w", "u20"],
};

export function scopeCalendarEntries(
  entries: CalendarEntry[],
  scope: CalendarScope,
): CalendarEntry[] {
  if (scope === "all") return entries;
  const slugs = scopeCategories[scope];
  return entries
    .filter((entry) =>
      entry.categories.some((category) => slugs.includes(category.slug)),
    )
    .map((entry) => ({
      ...entry,
      categories: entry.categories.filter((category) =>
        slugs.includes(category.slug),
      ),
    }));
}

export const calendarEntriesQuery = `*[_type in ["event", "exhibitionGame"]] {
  _id,
  "kind": _type,
  title,
  "eventDate": select(_type == "exhibitionGame" => date, coalesce(startDate, eventDate)),
  endDate,
  "venue": select(_type == "exhibitionGame" => location, venue),
  "status": coalesce(status, select(_type == "exhibitionGame" => "upcoming", "confirmed")),
  "categories": coalesce(categories[]->{title, "slug": slug.current}, []),
  opponent,
  result,
  "ticketUrl": ticketLink
} | order(eventDate asc)`;

export function calendarAgeFilters(entries: CalendarEntry[]) {
  const categories = new Map(
    entries.flatMap((entry) =>
      entry.categories.map(
        (category) => [category.slug, category.title] as const,
      ),
    ),
  );

  return [
    { value: "all", label: "All groups" },
    ...Array.from(categories, ([value, label]) => ({ value, label })).sort(
      (a, b) => a.value.localeCompare(b.value, "en", { numeric: true }),
    ),
  ];
}

export function filterCalendarEntries(
  entries: CalendarEntry[],
  ageGroup: string,
): CalendarEntry[] {
  return entries
    .filter(
      (entry) =>
        ageGroup === "all" ||
        entry.categories.some(
          (category) =>
            category.slug === ageGroup ||
            (["u18m", "u18w"].includes(ageGroup) && category.slug === "u18"),
        ),
    )
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
    );
}

export function calendarEntryStatus(entry: CalendarEntry, now: number) {
  if (entry.status === "cancelled" || entry.status === "completed") {
    return entry.status;
  }
  return new Date(entry.endDate ?? entry.eventDate).getTime() < now
    ? "completed"
    : entry.status;
}
