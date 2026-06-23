import type { JSX } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { academyTopics } from "@/lib/academy"

export default function AcademyTopicsPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              RBIHF Academy
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Coaching Topics
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Browse Academy by practical coaching need, from running practices with kids to specialist clinics and explanatory media.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {academyTopics.map((topic) => (
              <div key={topic.slug} className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  {topic.kind}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-foreground">{topic.title}</h2>
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
    </main>
  )
}
