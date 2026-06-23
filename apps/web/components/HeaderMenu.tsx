"use client"

import type { JSX } from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "RBIHF Academy", href: "/academy" },
  { label: "Club Development", href: "/club-development" },
  { label: "Talent Pool", href: "/talent-pool" },
  { label: "National Teams", href: "/national-teams" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/#contact" },
]

export function HeaderMenu(): JSX.Element {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="header-menu-panel"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={[
          "fixed inset-0 z-[60] transition-opacity duration-300",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-foreground/35"
        />

        <aside
          id="header-menu-panel"
          aria-hidden={!isOpen}
          className={[
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-primary/15 bg-background shadow-2xl transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="border-b border-primary/10 bg-primary px-6 py-5 text-primary-foreground">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
                  Navigation
                </p>
                <p className="mt-2 text-sm text-primary-foreground/85">
                  Quick access to the homepage sections that matter.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/40"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const itemPath = item.href.split("#")[0] || "/"
                const isActive = itemPath === pathname

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={[
                      "block rounded-2xl border px-4 py-4 text-base font-medium transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/60 bg-card text-foreground hover:border-primary/30 hover:bg-primary/5",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="mt-8 rounded-3xl border border-primary/10 bg-muted/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                Program Focus
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                RBIHF updates for academy learning, club development, talent identification, national teams, and the wider youth pathway.
              </p>
            </div>
          </div>

          <div className="border-t border-primary/10 bg-muted/30 px-6 py-4">
            <p className="text-sm text-muted-foreground">
              RBIHF Development Hub
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}