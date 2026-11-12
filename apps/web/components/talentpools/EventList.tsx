import { CalendarDays, MapPin } from "lucide-react"
import type { EventLabels } from "@/lib/hubPageContent"

interface Event {
  _id: string
  title: string
  slug: { current: string }
  eventDate: string
  endDate?: string
  venue: string
  status?: "confirmed" | "provisional"
  description?: string
  imageUrl?: string
}

interface EventListProps {
  events: Event[]
  labels: EventLabels
}

export function EventList({ events, labels }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="border-y border-border py-10 text-center">
        <CalendarDays className="mx-auto h-7 w-7 text-muted-foreground" aria-hidden="true" />
        <p className="mt-3 font-bold text-foreground">No upcoming events scheduled</p>
        <p className="mt-1 text-sm text-muted-foreground">Dates will appear here when the federation publishes them.</p>
      </div>
    )
  }

  return (
    <div className="border-y border-border">
        {events.map((event, index) => (
          <article
            key={event._id}
            className={`grid gap-4 py-6 md:grid-cols-[8rem_1fr_auto] md:items-center ${index > 0 ? "border-t border-border" : ""}`}
          >
            <time className="font-heading text-xl font-bold text-foreground">
              {new Date(event.eventDate).toLocaleDateString("en-BE", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}
            </time>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] ${event.status === "provisional" ? "border border-secondary text-secondary" : "bg-primary/10 text-primary"}`}>
                  {labels[event.status ?? "confirmed"]}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-foreground">{event.title}</h3>
              {event.description && <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground md:justify-end">
              <MapPin className="h-4 w-4 text-secondary" aria-hidden="true" />
              {event.venue}
            </div>
          </article>
        ))}
    </div>
  )
}