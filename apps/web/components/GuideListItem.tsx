import Link from 'next/link'
import Image from 'next/image'

interface Guide {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  ageCategory?: string
  targetRole?: string
  imageUrl?: string
}

interface GuideListItemProps {
  guide: Guide
  href?: string
  showAgeCategory?: boolean
  showRole?: boolean
}

export default function GuideListItem({ 
  guide, 
  href,
  showAgeCategory = false,
  showRole = false 
}: GuideListItemProps) {
  const linkHref = href || `/portal/guides/${guide.slug.current}`

  return (
    <Link 
      href={linkHref}
      className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden block"
    >
      {guide.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={guide.imageUrl}
            alt={guide.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          {showAgeCategory && guide.ageCategory && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {guide.ageCategory.toUpperCase()}
            </span>
          )}
          {showRole && guide.targetRole && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {guide.targetRole}
            </span>
          )}
          {!showAgeCategory && !showRole && guide.targetRole && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {guide.targetRole}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {guide.title}
        </h3>
        {guide.excerpt && (
          <p className="text-gray-600 text-sm line-clamp-3">{guide.excerpt}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          {guide.publishedAt && (
            <span className="text-sm text-gray-500">
              {new Date(guide.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          )}
          <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
            Read more
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}