"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Calendar, MapPin, Trophy } from "lucide-react"

interface ExhibitionGame {
  _id: string
  title: string
  matchDate: string
  homeTeam: string
  awayTeam: string
  venue: string
  status: "upcoming" | "completed" | "cancelled"
  result?: string
  ticketUrl?: string
  categories?: Array<{
    _id: string
    title: string
    slug?: { current: string }
  }>
}

interface ExhibitionGamesSectionProps {
  games: ExhibitionGame[]
}

const categoryOrder = ["u14", "u15", "u16", "u18", "u20"] as const

const categoryLabels: Record<(typeof categoryOrder)[number], string> = {
  u14: "U14",
  u15: "U15",
  u16: "U16",
  u18: "U18",
  u20: "U20",
}

function getCategoryKey(game: ExhibitionGame) {
  const primaryCategory = game.categories?.[0]

  if (!primaryCategory) {
    return null
  }

  const slug = primaryCategory.slug?.current?.toLowerCase()

  if (slug && categoryOrder.includes(slug as (typeof categoryOrder)[number])) {
    return slug as (typeof categoryOrder)[number]
  }

  const normalizedTitle = primaryCategory.title.toLowerCase().replace(/\s+/g, "")
  return categoryOrder.find((category) => normalizedTitle.includes(category)) ?? null
}

function formatMatchDate(date: string) {
  return new Date(date).toLocaleDateString("en-BE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function ExhibitionGamesSection({ games }: ExhibitionGamesSectionProps) {
  const groupedGames = useMemo(() => {
    return categoryOrder.reduce(
      (accumulator, category) => {
        accumulator[category] = games.filter((game) => getCategoryKey(game) === category)
        return accumulator
      },
      {} as Record<(typeof categoryOrder)[number], ExhibitionGame[]>,
    )
  }, [games])

  const firstCategoryWithGames = categoryOrder.find(
    (category) => groupedGames[category].length > 0,
  )

  const [activeCategory, setActiveCategory] = useState<(typeof categoryOrder)[number]>(
    firstCategoryWithGames ?? "u14",
  )

  const visibleGames = groupedGames[activeCategory]

  return (
    <section
      id="calendar"
      className="relative overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(200,43,58,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(242,194,48,0.12),_transparent_28%),linear-gradient(180deg,_rgba(245,242,235,1)_0%,_rgba(255,251,245,1)_100%)] py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
              Calendar
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground">
              Upcoming activity by category
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Clear scheduling for each age group, including the new U15 step between U14 and U16.
            </p>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-white/75 px-5 py-4 text-sm text-muted-foreground backdrop-blur">
            Switch category to review upcoming matches, recent results and empty slots that still need planning.
          </div>
        </div>

        <div className="mb-10 -mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
          <div className="flex gap-2 sm:flex-wrap">
            {categoryOrder.map((category) => {
              const isActive = activeCategory === category
              const gameCount = groupedGames[category].length

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "border border-primary/20 bg-background text-foreground hover:bg-primary/10"
                  }`}
                >
                  {categoryLabels[category]}
                  <span
                    className={`ml-2 text-xs ${isActive ? "text-primary-foreground/75" : "text-muted-foreground"}`}
                  >
                    ({gameCount})
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {visibleGames.length > 0 ? (
          <>
            {(() => {
              const featuredGame = visibleGames[0]
              const remainingGames = visibleGames.slice(1)

              return (
                <>
                  <article className="mb-12">
                <div className="group relative block overflow-hidden rounded-[2rem] bg-[#111111] text-white shadow-[0_25px_80px_rgba(17,17,17,0.18)]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%,rgba(200,43,58,0.18),rgba(242,194,48,0.12))]" />

                  <div className="relative p-6 sm:p-8">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
                          {featuredGame.status}
                        </span>
                        <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
                          {featuredGame.title}
                        </h3>
                      </div>

                      <div className="rounded-2xl bg-white/10 px-4 py-3 text-right backdrop-blur">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                          Date
                        </p>
                        <p className="mt-1 text-sm font-medium text-white">
                          {formatMatchDate(featuredGame.matchDate)}
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                          Home
                        </p>
                        <p className="mt-2 text-xl font-semibold">{featuredGame.homeTeam}</p>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                          vs
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                          Opponent
                        </p>
                        <p className="mt-2 text-xl font-semibold">{featuredGame.awayTeam}</p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-4 backdrop-blur">
                        <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-white/70" />
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                            Venue
                          </p>
                          <p className="mt-2 text-sm font-medium text-white">
                            {featuredGame.venue}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-4 backdrop-blur">
                        {featuredGame.status === "completed" && featuredGame.result ? (
                          <>
                            <Trophy className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                            <div className="flex-1">
                              <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                                Result
                              </p>
                              <p className="mt-2 text-sm font-semibold text-secondary">
                                {featuredGame.result}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4 shrink-0 mt-0.5 text-white/70" />
                            <div className="flex-1">
                              <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                                Status
                              </p>
                              <p className="mt-2 text-sm font-medium text-white">
                                {featuredGame.status}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {featuredGame.ticketUrl && featuredGame.status === "upcoming" && (
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          href={featuredGame.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors group-hover:bg-white/90"
                        >
                          Event Details
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 pointer-events-none" />
                </div>
              </article>

                  {remainingGames.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {remainingGames.map((game) => (
              <article
                key={game._id}
                className="group overflow-hidden rounded-3xl border border-primary/10 bg-white/75 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-lg"
              >
                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span
                        className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                          game.status === "upcoming"
                            ? "bg-primary/10 text-primary"
                            : game.status === "completed"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {game.status}
                      </span>
                      <h3 className="text-lg font-semibold leading-tight text-foreground group-hover:text-secondary">
                        {game.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-6 flex items-center gap-4 rounded-2xl bg-primary/5 px-4 py-3">
                    <Calendar className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                        Date
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {formatMatchDate(game.matchDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Home
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        {game.homeTeam}
                      </p>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="rounded-full border border-primary/10 bg-background px-4 py-2 text-sm font-semibold text-primary">
                        vs
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Opponent
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        {game.awayTeam}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-2xl bg-muted/45 px-4 py-3">
                      <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Venue
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">{game.venue}</p>
                      </div>
                    </div>

                    {game.status === "completed" && game.result && (
                      <div className="flex items-start gap-3 rounded-2xl bg-secondary/10 px-4 py-3">
                        <Trophy className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-[0.16em] text-secondary/70">
                            Result
                          </p>
                          <p className="mt-1 text-sm font-semibold text-secondary">{game.result}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {game.ticketUrl && game.status === "upcoming" && (
                    <div className="mt-5">
                      <Button asChild className="w-full">
                        <Link href={game.ticketUrl} target="_blank" rel="noopener noreferrer">
                          Event Details
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
                  )}
                </>
              )
            })()}
          </>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-primary/20 bg-white/50 px-8 py-16 text-center backdrop-blur">
            <p className="text-lg font-semibold text-foreground">
              {categoryLabels[activeCategory]} calendar is still being prepared.
            </p>
            <p className="mt-3 text-muted-foreground">
              Add fixtures for this category in Sanity to populate the public schedule.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
