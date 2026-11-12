import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

interface CategoryHeroProps {
  title: string
  description: string
  imageUrl?: string
  imagePosition?: string
  imageAlt?: string
  videoUrl?: string
  eyebrow?: string
  backHref?: string
  backLabel?: string
  primaryCta?: { href: string; label: string }
  cmsOnly?: boolean
}

export function CategoryHero({
  title,
  description,
  imageUrl,
  imagePosition,
  imageAlt,
  videoUrl,
  eyebrow,
  backHref,
  backLabel = "Back to overview",
  primaryCta,
  cmsOnly = false,
}: CategoryHeroProps) {
  if (cmsOnly && !(title || description || eyebrow || imageUrl || videoUrl)) {
    return null
  }
  const heroImage = imageUrl ?? (cmsOnly ? undefined : "/image.png")
  const heroEyebrow = eyebrow ?? (cmsOnly ? undefined : "Development pathway")
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-[#102D35] text-white">
      {videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {!videoUrl && heroImage && (
        <Image
          src={heroImage}
          alt={imageAlt ?? (cmsOnly ? "" : title)}
          fill
          sizes="100vw"
          style={{ objectPosition: imagePosition }}
          className="object-cover object-center"
          priority
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-3 pt-32 sm:px-6 sm:pb-4 lg:px-8 lg:pb-20">
        <div className="max-w-3xl">
          {backHref && backLabel && (
            <Link
              href={backHref}
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {backLabel}
            </Link>
          )}
          {heroEyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
              {heroEyebrow}
            </p>
          )}
          {title && (
            <h1 className="mt-4 font-heading text-6xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              {description}
            </p>
          )}
          {primaryCta && (
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-white/85">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {primaryCta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
