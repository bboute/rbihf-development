import type { TalentPoolEvent } from "@/lib/talentPool";

export function formatEventDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatEventRange(
  event: Pick<TalentPoolEvent, "eventDate" | "endDate">,
): string {
  if (!event.endDate) return formatEventDate(event.eventDate);

  const start = new Date(event.eventDate);
  const end = new Date(event.endDate);
  if (start.toISOString().slice(0, 10) === end.toISOString().slice(0, 10)) {
    return formatEventDate(event.eventDate);
  }

  const sameMonth =
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCFullYear() === end.getUTCFullYear();

  if (sameMonth) {
    return `${start.getUTCDate()}–${end.toLocaleDateString("en-BE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })}`;
  }

  return `${formatEventDate(event.eventDate)} – ${formatEventDate(event.endDate)}`;
}
