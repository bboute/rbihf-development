import type { JSX } from "react"
import { academySupportItems } from "@/lib/academy"

export default function AcademyResourcesPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              RBIHF Academy
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Resources
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              A practical support surface for manuals, preparation notes, downloadable templates, and course companion material.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {academySupportItems.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground">{item.title}</h2>
                <p className="mt-4 text-muted-foreground leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
