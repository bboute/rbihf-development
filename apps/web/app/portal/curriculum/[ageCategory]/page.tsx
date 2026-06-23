import { getGuidesByAgeCategory } from '@/lib/sanityClient'
import GuideListItem from '@/components/GuideListItem'

interface Guide {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  ageCategory: string
  targetRole?: string
  imageUrl?: string
}

export default async function AgeCategoryPage({
  params,
}: {
  params: Promise<{ ageCategory: string }>
}) {
  const { ageCategory } = await params
  
  // Fetch guides for the specific age category
  const guides = await getGuidesByAgeCategory(ageCategory)

  // Format age category for display (e.g., "u12" -> "U12")
  const formattedAgeCategory = ageCategory.toUpperCase()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          {formattedAgeCategory} Development Curriculum
        </h1>
        <p className="text-gray-600">
          Age-specific training guides and development resources for {formattedAgeCategory} players.
        </p>
      </div>

      {guides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Curriculum Available</h3>
          <p className="text-gray-500 mb-4">
            There are currently no development guides available for {formattedAgeCategory}.
          </p>
          <p className="text-sm text-gray-400">
            Curriculum content will be added as it becomes available. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide: Guide) => (
            <GuideListItem
              key={guide._id}
              guide={guide}
              href={`/portal/curriculum/guides/${guide.slug.current}`}
              showAgeCategory={true}
              showRole={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}