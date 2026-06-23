import type { JSX } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import { academyPathways, getAcademyPathway } from "@/lib/academy"

interface AcademyPathwayPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return academyPathways.map((pathway) => ({ slug: pathway.slug }))
}

export default async function AcademyPathwayPage({
  params,
}: AcademyPathwayPageProps): Promise<JSX.Element> {
  const { slug } = await params
  const pathway = getAcademyPathway(slug)

  if (!pathway) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              {pathway.stage}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              {pathway.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              {pathway.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/academy/pathways">Back to Pathways</Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/academy/courses">View Course Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="rounded-[1.75rem] border border-primary/10 bg-card p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-foreground">Who This Supports</h2>
                <p className="mt-4 text-muted-foreground leading-7">{pathway.audience}</p>
                <p className="mt-4 text-sm text-muted-foreground">{pathway.format}</p>
              </div>

              <div className="rounded-[1.75rem] border border-primary/10 bg-card p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-foreground">Learning Goals</h2>
                <ul className="mt-6 space-y-4 text-muted-foreground leading-7">
                  {pathway.goals.map((goal) => (
                    <li key={goal} className="flex gap-3">
                      <span className="text-primary">•</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[1.75rem] border border-primary/10 bg-muted/20 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-primary">Preparation & Follow-up</h2>
                <ul className="mt-6 space-y-4 text-muted-foreground leading-7">
                  {pathway.preparation.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-primary/10 bg-primary p-8 text-primary-foreground shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">
                  Next Step
                </p>
                <p className="mt-4 text-2xl font-bold">{pathway.nextStep}</p>
                <p className="mt-4 text-sm leading-6 text-primary-foreground/80">
                  The Academy supports the current in-person qualification model and adds practical digital guidance around it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
