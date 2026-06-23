import type { JSX } from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

interface PortalLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug?: string[] }>
}

interface UserRoleContext {
  role: string
  userId: string
}

export default async function PortalLayout({
  children,
}: PortalLayoutProps): Promise<JSX.Element> {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Fetch user role from Supabase
  const { data: user, error } = await supabase
    .from('users')
    .select('role')
    .eq('clerk_id', userId)
    .single()

  if (error || !user) {
    console.error('Error fetching user role:', error)
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Portal Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Club Development Library</h1>
          <p className="text-gray-600 mt-2">
            Welcome back. These resources extend the public Club Development framework for your role as a <span className="font-semibold capitalize">{user.role}</span>.
          </p>
          
          {/* Portal Navigation */}
          <nav className="mt-6">
            <ul className="flex space-x-6 border-b border-gray-200">
              <li>
                <Link 
                  href="/portal" 
                  className="pb-2 px-1 text-sm font-medium text-gray-900 border-b-2 border-blue-500"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/portal/curriculum" 
                  className="pb-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Age Curriculum
                </Link>
              </li>
              {user.role === 'staff' && (
                <li>
                  <Link 
                    href="/portal/club-growth" 
                    className="pb-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Club Development Support
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </header>
        
        {/* Main Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}