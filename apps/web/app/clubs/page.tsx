import type { JSX } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ClubFinder } from "@/components/clubs/ClubFinder"

export default function ClubsPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-primary/10 bg-[linear-gradient(180deg,rgba(245,242,235,1)_0%,rgba(252,250,245,1)_100%)] py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Club Development
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Find the right club inside the RBIHF development pathway.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              This page is the family-facing entry point inside Club Development. Use it to connect the public pathway with a real club, local contact information, and the next practical step for starting youth hockey.
            </p>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/club-development">Back to Club Development</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <ClubFinder />
        </div>
      </section>
    </main>
  )
}