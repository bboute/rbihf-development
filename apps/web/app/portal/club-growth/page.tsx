import type { JSX } from 'react'
import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabaseClient'
import { getGuidesByRole } from '@/lib/sanityClient'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'

interface Guide {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  targetRole: string
  imageUrl?: string
}

export default async function ClubGrowthPage(): Promise<JSX.Element | null> {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  // Fetch user role from Supabase
  const { data: user, error } = await supabase
    .from('users')
    .select('role')
    .eq('clerk_id', userId)
    .single()

  if (error || !user) {
    console.error('Error fetching user role:', error)
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Content</h2>
        <p className="text-red-600">We couldn't load your user data. Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    )
  }

  // Check if user has staff role
  if (user.role !== 'staff') {
    redirect('/portal')
  }

  // Fetch guides for staff role
  const guides = await getGuidesByRole('staff')

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Club Development Support</h2>
        <p className="text-gray-600">
          Access staff-facing guides that help clubs deliver the Club Development framework with stronger staffing, recruitment, onboarding, and youth planning.
        </p>
      </div>

      {guides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Available</h3>
          <p className="text-gray-500 mb-4">
            There are currently no club development support guides available.
          </p>
          <p className="text-sm text-gray-400">
            Content will be added as it becomes available. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide: Guide) => (
            <Link 
              key={guide._id} 
              href={`/portal/guides/${guide.slug.current}`}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden"
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {guide.targetRole}
                  </span>
                  {guide.publishedAt && (
                    <span className="text-sm text-gray-500">
                      {new Date(guide.publishedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {guide.title}
                </h3>
                {guide.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-3">{guide.excerpt}</p>
                )}
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  Read more
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}