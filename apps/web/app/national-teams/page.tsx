import type { JSX } from "react"
import Link from "next/link"

const nationalTeamItems = [
  {
    title: "Selections",
    body: "Official communication around player selection moments, invitations and squad planning.",
  },
  {
    title: "Camps & Events",
    body: "Track national team gatherings, tournaments, pathway events and preparation windows.",
  },
  {
    title: "Family Updates",
    body: "Keep parents informed with one central place for schedules, updates and next steps.",
  },
] as const

export default function NationalTeamsPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              National Teams
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              RBIHF national team activity in one place.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Use this page as the parent-facing entry point for representative team updates, camps, event communication and official national team news connected to the pathway.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {nationalTeamItems.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-secondary">{item.title}</h2>
                <p className="mt-4 text-muted-foreground leading-7">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-primary/10 bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground">What Families Need Most</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-background p-5">
                <p className="font-semibold text-secondary">Upcoming dates</p>
                <p className="mt-2 text-sm text-muted-foreground">Selection days, camps, game windows and federation planning moments.</p>
              </div>
              <div className="rounded-3xl bg-background p-5">
                <p className="font-semibold text-secondary">Official news</p>
                <p className="mt-2 text-sm text-muted-foreground">One reliable place for representative team communication instead of scattered updates.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#calendar" className="inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary/90">
              View Team Calendar
            </Link>
            <Link href="/news" className="inline-flex items-center rounded-full border border-primary/15 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent">
              Read Latest News
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}