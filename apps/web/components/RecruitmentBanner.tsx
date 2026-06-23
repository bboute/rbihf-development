import Link from 'next/link'

interface RecruitmentBannerProps {
  bannerData: {
    headline: string
    bodyText: string
    ctaButtonText: string
    ctaLink: string
  }
  variant?: 'player' | 'coach'
}

export default function RecruitmentBanner({ bannerData, variant = "player" }: RecruitmentBannerProps) {
  const { headline, bodyText, ctaButtonText, ctaLink } = bannerData

  const bannerClasses = variant === 'coach' 
    ? "bg-secondary py-16 px-4 md:py-20"
    : "bg-tertiary py-16 px-4 md:py-20"

  const textClasses = variant === 'coach'
    ? "text-secondary-foreground"
    : "text-tertiary-foreground"

  const buttonClasses = variant === 'coach'
    ? "inline-block px-8 py-4 bg-white text-secondary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary shadow-lg"
    : "inline-block px-8 py-4 bg-white text-tertiary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tertiary shadow-lg"

  return (
    <section className={bannerClasses}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textClasses}`}>
          {headline}
        </h2>
        <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${textClasses} opacity-90`}>
          {bodyText}
        </p>
        <Link 
          href={ctaLink}
          className={buttonClasses}
        >
          {ctaButtonText}
        </Link>
      </div>
    </section>
  )
}