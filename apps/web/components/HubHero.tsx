import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface HubHeroProps {
  title: string
  fallbackTitle: string
  eyebrow: string
  description: string
  imageUrl?: string
  imagePosition?: string
  imageAlt: string
  links: Array<{ href: string; label: string; icon: LucideIcon }>
}

export function HubHero({
  title,
  fallbackTitle,
  eyebrow,
  description,
  imageUrl,
  imagePosition,
  imageAlt,
  links,
}: HubHeroProps) {
  const heroTitle = title || fallbackTitle
  const visibleLinks = links.filter((link) => link.label)
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-[#102D35] text-white">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: imagePosition }}
          className="object-cover object-center"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-3 pt-32 sm:px-6 sm:pb-4 lg:px-8 lg:pb-20">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 font-heading text-6xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
            {heroTitle}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-8 text-white/80 sm:text-xl">
              {description}
            </p>
          )}
          {visibleLinks.length > 0 && (
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-white/85">
              {visibleLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  {label} <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
