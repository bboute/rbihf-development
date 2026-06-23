import Image from "next/image"
import Link from "next/link"

interface Event {
  _id: string
  title: string
  slug: { current: string }
  eventDate: string
  venue: string
  description?: string
  imageUrl?: string
}

interface EventListProps {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No upcoming events scheduled.</p>
      </div>
    )
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <article
            key={event._id}
            className="bg-card border border-border/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {event.imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <time className="text-sm text-muted-foreground">
                  {new Date(event.eventDate).toLocaleDateString()}
                </time>
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Event
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                {event.title}
              </h3>
              
              <p className="text-muted-foreground mb-3 line-clamp-2">
                {event.description}
              </p>
              
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <span>📍 {event.venue}</span>
              </div>
              
              <Link 
                href={`/events/${event.slug.current}`}
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                View Details →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}