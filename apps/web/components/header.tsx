"use client"

import type { JSX } from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser, UserButton } from "@clerk/nextjs"
import { HeaderMenu } from "@/components/HeaderMenu"

const primaryLinks = [
  { label: "Academy", href: "/academy" },
  { label: "Club Development", href: "/club-development" },
  { label: "Talent Pool", href: "/talent-pool" },
  { label: "National Teams", href: "/national-teams" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/#contact" },
]

export function Header(): JSX.Element {
  const { isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              RBIHF
            </p>
            <p className="text-sm text-foreground">Development Hub</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
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
