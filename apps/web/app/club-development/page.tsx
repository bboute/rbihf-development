import type { JSX } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { FundamentalCategories } from "@/components/sections/FundamentalCategories"
import { getAllFundamentalCategories } from "@/lib/sanityClient"

interface FundamentalCategory {
  _id: string
  title: string
  slug: {
    current: string
  }
  ageRange: string
  description: string
  heroImage?: string
}

const audiencePaths = [
  {
    title: "For Coaches",
    description:
      "See what to teach, how to structure sessions, and what good delivery looks like on the ice.",
    href: "/portal/coaching-resources",
    cta: "Open Coach Resources",
  },
  {
    title: "For Club Leaders",
    description:
      "Use one shared framework for staffing, session standards, parent communication, and youth planning.",
    href: "/portal/club-growth",
    cta: "See Club Support",
  },
  {
    title: "For Parents",
    description:
      "Understand what development should look like at each age and what questions to ask a club.",
    href: "/clubs",
    cta: "Find a Club",
  },
] as const

const standards = [
  {
    title: "Age-Appropriate Teaching",
    body: "Each age band should match how children learn, balancing repetition, fun, and clear progressions.",
  },
  {
    title: "Practice Setup",
    body: "Small-area stations, frequent touches, short explanations, and active engagement should define every session.",
  },
  {
    title: "Staffing Minimums",
    body: "Clubs should plan enough coaches and helping hands on the ice to keep sessions safe, organized, and active.",
  },
  {
    title: "Parent Clarity",
    body: "Families should understand the pathway, the purpose of each age stage, and what good development looks like beyond results.",
  },
] as const

export default async function ClubDevelopmentPage(): Promise<JSX.Element> {
  const categories = (await getAllFundamentalCategories()) as FundamentalCategory[]

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(200,43,58,0.12),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(0,123,143,0.16),_transparent_26%),linear-gradient(180deg,_rgba(245,242,235,1)_0%,_rgba(255,251,245,1)_100%)] py-24 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-6">
            <p className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Fourth Pillar
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Club Development
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A national framework for helping every Belgian club deliver the basics well, with a clear age pathway, better session design, and visible standards for coaches, parents, leaders, and helpers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#age-pathway">Explore the Age Pathway</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/clubs">Find a Club</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[2rem] border border-primary/10 bg-white/85 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Why This Exists
              </p>
              <h2 className="mt-4 text-3xl font-bold text-foreground">
                Every child deserves the basics done right.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Club Development gives RBIHF one public language for youth hockey: what players should learn, how practices should be run, what staffing is needed on the ice, and what families should expect from a healthy development environment.
              </p>
            </div>

            <div className="rounded-[2rem] border border-primary/10 bg-primary p-8 text-primary-foreground shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">
                Shared Promise
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-primary-foreground/90 sm:text-base">
                <p>Fun stays essential.</p>
                <p>Progression becomes clearer.</p>
                <p>Standards become visible across clubs.</p>
                <p>Parents and coaches see the same pathway.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="age-pathway" className="border-y border-primary/10 bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-4 text-center mx-auto mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Age Pathway
            </p>
            <h2 className="text-4xl font-bold text-foreground">
              One pathway, made visible by age.
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              Start with the public age-band overview, then go deeper into practice expectations, staffing, and coach resources for each stage.
            </p>
          </div>

          <div className="mb-12">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Phase 1
                </p>
                <h3 className="mt-3 text-2xl font-bold text-foreground">Learn to Play</h3>
                <p className="mt-2 text-sm font-medium text-foreground/80">U8, U10, U12</p>
                <p className="mt-4 text-muted-foreground leading-7">
                  Create a fun, safe and positive first experience. Focus on skating, puck skills, confidence, creativity and love for the game through playful, active activities.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Phase 2
                </p>
                <h3 className="mt-3 text-2xl font-bold text-foreground">Play to Compete</h3>
                <p className="mt-2 text-sm font-medium text-foreground/80">U14, U16</p>
                <p className="mt-4 text-muted-foreground leading-7">
                  Bridge between foundation and performance. Players learn to apply skills under pressure, compete consistently, and understand basic team principles.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Phase 3
                </p>
                <h3 className="mt-3 text-2xl font-bold text-foreground">Compete to Win</h3>
                <p className="mt-2 text-sm font-medium text-foreground/80">U18+</p>
                <p className="mt-4 text-muted-foreground leading-7">
                  Prepare for senior hockey, national team standards and international competition. Players apply skills within a team identity and compete to win.
                </p>
              </div>
            </div>
          </div>

          <FundamentalCategories categories={categories} />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-4 mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Minimum Standards
            </p>
            <h2 className="text-4xl font-bold text-foreground">
              What good youth delivery should include in every club.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {standards.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-4 mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Audience Views
            </p>
            <h2 className="text-4xl font-bold text-foreground">
              One framework, different entry points.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {audiencePaths.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-primary/10 bg-background p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 min-h-24 text-base leading-7 text-muted-foreground">{item.description}</p>
                <Button asChild variant="outline" className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link href={item.href}>{item.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
