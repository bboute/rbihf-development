"use client"

import type { JSX } from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser, UserButton } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { HeaderMenu } from "@/components/HeaderMenu"
import {
  isAcademyEnabled,
  isClubDevelopmentEnabled,
} from "@/lib/featureFlags"

const primaryLinks = [
  ...(isAcademyEnabled ? [{ label: "Academy", href: "/academy" }] : []),
  ...(isClubDevelopmentEnabled
    ? [{ label: "Club Development", href: "/club-development" }]
    : []),
  { label: "Talent Pool", href: "/talent-pool" },
  { label: "National Teams", href: "/national-teams" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/#contact" },
]

export function Header(): JSX.Element {
  const { isSignedIn } = useUser()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const isScrolled = window.scrollY > 24
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled))
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85"
          : "bg-transparent"
      }`}
    >
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 after:absolute after:inset-x-4 after:bottom-0 after:h-px after:content-[''] after:[background:linear-gradient(to_right,transparent,currentColor_20%,currentColor_80%,transparent)] sm:px-6 lg:px-8 ${
          scrolled ? "h-16 text-foreground/20" : "h-24 text-white/25"
        }`}
      >
        <Link href="/" className="flex h-full items-center gap-3">
          <span className="relative -my-px block h-[calc(100%+2px)] w-[2.05rem] shrink-0 overflow-hidden">
            <Image
              src="/rbihf-logo.png"
              alt="RBIHF logo"
              fill
              priority
              sizes="33px"
              className="scale-[1.05] object-contain object-center"
            />
          </span>
          <div className="flex flex-col justify-center py-1">
            <p
              className={`text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                scrolled ? "text-primary" : "text-white"
              }`}
            >
              RBIHF
            </p>
            <p
              className={`text-sm transition-colors duration-500 ${
                scrolled ? "text-foreground" : "text-white/85"
              }`}
            >
              Development Centre of Excellence
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-500 after:absolute after:inset-x-4 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  scrolled
                    ? "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="lg:hidden">
            <HeaderMenu />
          </div>

          {isSignedIn && (
            <div className="flex items-center">
              <UserButton />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
