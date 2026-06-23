"use client"

import type { JSX } from "react"
import { useState } from "react"

export function ClubFinder(): JSX.Element {
  const [postalCode, setPostalCode] = useState("")

  const hasSearch = postalCode.trim().length > 0

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.75rem] border border-primary/10 bg-card p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          Club Finder
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">Find the closest next step into hockey</h2>
        <p className="mt-4 text-muted-foreground leading-7">
          The RBIHF club directory will eventually help families search by postal code, compare nearby clubs and connect directly with youth contacts.
        </p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Postal code or city</span>
            <input
              type="text"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              placeholder="Example: 1000 or Brussels"
              className="w-full rounded-2xl border border-primary/10 bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-secondary"
            />
          </label>

          <div className="rounded-3xl bg-accent/40 p-4 text-sm text-muted-foreground">
            First version goal: parents can search locally and quickly see which club to contact, where it is based and who manages youth hockey.
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-dashed border-primary/20 bg-card p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-foreground">Directory status</h3>
          {hasSearch ? (
            <p className="mt-4 text-muted-foreground leading-7">
              The live club directory is still being connected, so results for <span className="font-semibold text-foreground">{postalCode}</span> will appear here once RBIHF club records and locations are published.
            </p>
          ) : (
            <p className="mt-4 text-muted-foreground leading-7">
              Search input is ready. The next step is connecting real RBIHF club records, addresses and contact information.
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-primary/10 bg-card p-5 shadow-sm">
            <p className="font-semibold text-secondary">What each club card should show</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Club name and city</li>
              <li>Nearest rink or training base</li>
              <li>Youth coordinator details</li>
              <li>Age groups and entry information</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-card p-5 shadow-sm">
            <p className="font-semibold text-secondary">Map view</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A map module can sit beside the results so families can immediately understand which clubs are closest to home.
            </p>
            <div className="mt-4 flex min-h-32 items-center justify-center rounded-3xl border border-dashed border-primary/20 bg-background text-sm text-muted-foreground">
              Club map placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}