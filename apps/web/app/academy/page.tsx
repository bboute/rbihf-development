import type { JSX } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import {
  academyLibraryHighlights,
  academyPathways,
  academySupportItems,
  academyTopics,
} from "@/lib/academy"

export default function AcademyPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(200,43,58,0.12),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(0,123,143,0.14),_transparent_28%),linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              RBIHF Academy
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Coach Education for Better Youth Hockey.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              RBIHF Academy supports official coach education, practical learning topics, and specialist clinics. It extends the real in-person course weekends with clearer pathway guidance, explanatory material, and follow-up resources for coaches.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#pathways">Explore Qualification Pathways</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="#topics">Browse Coaching Topics</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" id="pathways">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-4 mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Qualification Pathways
            </p>
            <h2 className="text-4xl font-bold text-foreground">
              Official learning pathways, explained clearly.
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              The Academy helps coaches understand where they start, what each level supports, and how in-person course weekends connect to ongoing learning.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {academyPathways.map((pathway) => (
              <div key={pathway.slug} className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  {pathway.stage}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-foreground">{pathway.title}</h3>
                <p className="mt-4 text-muted-foreground leading-7">{pathway.summary}</p>
                <p className="mt-4 text-sm text-muted-foreground">{pathway.format}</p>
                <Button asChild className="mt-6 w-full">
                  <Link href={`/academy/pathways/${pathway.slug}`}>View Pathway</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-muted/20 py-16" id="topics">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-4 mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Coaching Topics
            </p>
            <h2 className="text-4xl font-bold text-foreground">
              Browse by real coaching need, not only by qualification level.
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              Topic pages and clinics are where the Academy becomes practical: how to run a session with kids, how to teach systems, how to use video explanation, and where specialist topics belong.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {academyTopics.map((topic) => (
              <div key={topic.slug} className="rounded-[1.75rem] border border-primary/10 bg-background p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  {topic.kind}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-foreground">{topic.title}</h3>
                <p className="mt-4 text-sm font-medium text-foreground/80">{topic.audience}</p>
                <p className="mt-3 text-muted-foreground leading-7">{topic.summary}</p>
                <Button asChild variant="outline" className="mt-6 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link href={`/academy/topics/${topic.slug}`}>Open Topic</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-primary/10 bg-card p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Video & Clinic Library
              </p>
              <h2 className="mt-4 text-3xl font-bold text-foreground">
                Extend course weekends with practical learning.
              </h2>
              <div className="mt-6 space-y-5">
                {academyLibraryHighlights.map((item) => (
                  <div key={item.title} className="rounded-3xl bg-muted/30 p-5">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="mt-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/academy/library">Browse Library</Link>
              </Button>
            </div>

            <div className="rounded-[1.75rem] border border-primary/10 bg-primary p-8 text-primary-foreground shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/75">
                Courses & Resources
              </p>
              <div className="mt-6 space-y-5">
                {academySupportItems.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/10 p-5">
                    <p className="font-semibold text-primary-foreground">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-primary-foreground/80">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/academy/courses">View Course Support</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/academy/resources">Open Resources</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}