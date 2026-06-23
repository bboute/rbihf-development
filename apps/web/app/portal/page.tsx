import type { JSX } from 'react'
import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabaseClient'
import { getGuidesByRole } from '@/lib/sanityClient'
import Link from 'next/link'
import Image from 'next/image'

interface Guide {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  targetRole: string
  imageUrl?: string
}

export default async function PortalPage(): Promise<JSX.Element> {
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

  // Fetch guides for the user's role
  const guides = await getGuidesByRole(user.role)

  return (
    <div className="p-8">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Your Guides</h2>
        <p className="text-muted-foreground text-lg">
          Here are the training guides and implementation resources that extend the Club Development framework for your role as a <span className="font-semibold capitalize text-foreground">{user.role}</span>.
        </p>
      </div>

      {guides.length === 0 ? (
        <div className="bg-card rounded-lg shadow-sm border border-border p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">No Content Available</h3>
          <p className="text-muted-foreground mb-4">
            There are currently no guides available for your role ({user.role}).
          </p>
          <p className="text-sm text-muted-foreground">
            Content will be added as it becomes available. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide: Guide) => (
            <Link 
              key={guide._id} 
              href={`/portal/guides/${guide.slug.current}`}
              className="group bg-card rounded-lg shadow-sm border border-border hover:shadow-md hover:border-primary transition-all duration-200 overflow-hidden"
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                    {guide.targetRole}
                  </span>
                  {guide.publishedAt && (
                    <span className="text-sm text-muted-foreground">
                      {new Date(guide.publishedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {guide.title}
                </h3>
                {guide.excerpt && (
                  <p className="text-muted-foreground text-sm line-clamp-3">{guide.excerpt}</p>
                )}
                <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:text-primary/80">
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