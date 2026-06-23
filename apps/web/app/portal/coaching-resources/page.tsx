import type { JSX } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'
import { getGuidesByRole } from '@/lib/sanityClient'
import { supabase } from '@/lib/supabaseClient'

export default async function CoachingResourcesPage(): Promise<JSX.Element> {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user role from Supabase
  const { data: userRole, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single()

  if (error || !userRole || userRole.role !== 'coach') {
    redirect('/portal')
  }

  const guides = await getGuidesByRole('coach')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Coaching Resources</h1>
      <p className="text-lg text-muted-foreground mb-8">
        This area supports RBIHF Academy with coach-facing implementation material, qualification support, and practical follow-up resources that extend the in-person learning pathways.
      </p>

      <div className="mb-8 flex flex-wrap gap-3">
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Link href="/academy">Back to Academy</Link>
        </Button>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/academy/pathways">View Qualification Pathways</Link>
        </Button>
      </div>
      
      {guides.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide: any) => (
            <div key={guide._id} className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{guide.title}</h3>
              <p className="text-muted-foreground mb-4">{guide.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
                  {guide.category || 'General'}
                </span>
                <Link 
                  href={`/portal/curriculum/guides/${guide.slug.current}`}
                  className="text-primary hover:underline font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No coaching resources available at the moment. Check back soon for updates.
          </p>
        </div>
      )}
    </div>
  )
}