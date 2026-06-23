import type { JSX } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { academyLibraryHighlights, academyTopics } from "@/lib/academy"

export default function AcademyLibraryPage(): JSX.Element {
  const libraryTopics = academyTopics.filter(
    (topic) => topic.kind === "clinic" || topic.kind === "library",
  )

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              RBIHF Academy
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Video & Clinic Library
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              A discovery surface for explanatory videos, specialist clinics, and companion learning material that extend the in-person education model.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              {academyLibraryHighlights.map((item) => (
                <div key={item.title} className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-foreground">{item.title}</h2>
                  <p className="mt-3 text-muted-foreground leading-7">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="rounded-[1.75rem] border border-primary/10 bg-muted/20 p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-primary">Featured Topic Areas</h2>
              <div className="mt-6 space-y-4">
                {libraryTopics.map((topic) => (
                  <div key={topic.slug} className="rounded-3xl bg-background p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">{topic.kind}</p>
                    <h3 className="mt-2 text-xl font-bold text-foreground">{topic.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{topic.summary}</p>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="mt-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/academy/topics">Browse All Topics</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
