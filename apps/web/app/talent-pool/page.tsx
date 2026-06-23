import type { JSX } from "react"
import Link from "next/link"
import {
  talentPoolPathway,
  talentPoolStageContent,
} from "@/lib/talentPool"

const pathwayItems = [
  {
    title: "Scout And Follow",
    body: "RBIHF identifies promising players across Belgium and keeps following how they develop over time, always in connection with the work done inside their clubs.",
  },
  {
    title: "Prepare Step By Step",
    body: "The pathway runs from U14 through U20, with each stage introducing stronger shared references, more demanding experiences, and clearer links to future national-team environments.",
  },
  {
    title: "Support Club Development",
    body: "The federation adds concepts, camps, and international exposure, but clubs remain the place where the heaviest weekly development work happens.",
  },
] as const

const stageOrder = ["u14", "u15", "u16", "u18", "u20"] as const

export default function TalentPoolPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Talent Pool
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              The federation layer between club development and future national teams.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Talent Pool helps RBIHF scout promising players in Belgium, support their long-term development, and gradually prepare them for future national-team environments without replacing the work done every week in clubs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {pathwayItems.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-secondary">{item.title}</h2>
                <p className="mt-4 text-muted-foreground leading-7">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-primary/10 bg-card p-8 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">How The Pathway Fits Together</h2>
                <p className="mt-2 max-w-3xl text-muted-foreground leading-7">
                  Clubs carry the daily development load. Talent Pool adds shared federation concepts, international exposure, and a progressive bridge toward future national-team environments.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {talentPoolPathway.map((item) => (
                <div key={item.slug} className="rounded-3xl border border-primary/10 bg-background p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                    {item.label}
                  </p>
                  <p className="mt-3 text-muted-foreground leading-7">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-primary/10 bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground">Stage Progression</h2>
            <div className="mt-6 grid gap-4 xl:grid-cols-5">
              {stageOrder.map((slug) => {
                const stage = talentPoolStageContent[slug]

                return (
                  <div key={stage.slug} className="rounded-3xl border border-primary/10 bg-background p-5">
                    <p className="text-2xl font-bold text-secondary">{stage.label}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{stage.summary}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-primary/10 bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground">U14 To U16: The Core Preparation Years</h2>
              <div className="mt-6 space-y-5">
                {(["u14", "u15", "u16"] as const).map((slug) => {
                  const stage = talentPoolStageContent[slug]

                  return (
                    <div key={stage.slug} className="rounded-3xl border border-primary/10 bg-background p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                        {stage.label}
                      </p>
                      <p className="mt-3 text-foreground leading-7">{stage.stagePurpose}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-primary/10 bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground">What Families And Clubs Should Expect</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground leading-7">
                <li>Talent Pool is not a replacement for club development.</li>
                <li>Players experience federation camps, events, and international moments that add context to their club season.</li>
                <li>Shared concepts begin early so future national-team integration is smoother.</li>
                <li>Progression is observed over time, especially as players move toward U16 and later U18 selection questions.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#calendar" className="inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary/90">
              View Calendar
            </Link>
            <Link href="/#talent-pools" className="inline-flex items-center rounded-full border border-primary/15 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent">
              Browse Categories
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}