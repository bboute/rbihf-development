import type { JSX } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import { academyTopics, getAcademyTopic } from "@/lib/academy"

interface AcademyTopicPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return academyTopics.map((topic) => ({ slug: topic.slug }))
}

export default async function AcademyTopicPage({
  params,
}: AcademyTopicPageProps): Promise<JSX.Element> {
  const { slug } = await params
  const topic = getAcademyTopic(slug)

  if (!topic) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              {topic.kind}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              {topic.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              {topic.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/academy/topics">Back to Topics</Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/academy/library">Browse Library</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.75rem] border border-primary/10 bg-card p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-foreground">Why This Topic Matters</h2>
              <p className="mt-4 text-muted-foreground leading-7">{topic.audience}</p>
              <p className="mt-4 text-muted-foreground leading-7">{topic.summary}</p>
            </div>
            <div className="rounded-[1.75rem] border border-primary/10 bg-muted/20 p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-primary">What This Can Include</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground leading-7">
                {topic.examples.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                In the first Academy version, these surfaces can stay lightweight and editorial while the richer content model matures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
