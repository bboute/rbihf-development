import type { JSX } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { academyPathways } from "@/lib/academy"

export default function AcademyPathwaysPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              RBIHF Academy
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Qualification Pathways
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Understand the current qualification ladder, who each stage is for, and how the Academy supports learning around in-person course delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {academyPathways.map((pathway) => (
              <div key={pathway.slug} className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  {pathway.stage}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-foreground">{pathway.title}</h2>
                <p className="mt-4 text-muted-foreground leading-7">{pathway.summary}</p>
                <p className="mt-4 text-sm text-muted-foreground">{pathway.format}</p>
                <Button asChild className="mt-6 w-full">
                  <Link href={`/academy/pathways/${pathway.slug}`}>Open Pathway</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
