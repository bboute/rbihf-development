import type { JSX } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { getGuideBySlug } from "@/lib/sanityClient"
import { portableTextComponents } from "@/lib/portableTextComponents"

interface GuidePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function GuidePage({ params }: GuidePageProps): Promise<JSX.Element> {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link 
              href={`/portal/curriculum/${guide.ageCategory.toLowerCase()}`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to {guide.ageCategory.toUpperCase()} Curriculum
            </Link>
          </div>

          {/* Hero Section */}
          {guide.imageUrl && (
            <div className="relative h-64 md:h-80 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={guide.imageUrl}
                alt={guide.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {guide.ageCategory.toUpperCase()}
              </span>
              {guide.targetRole && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                  {guide.targetRole}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {guide.title}
            </h1>
            {guide.excerpt && (
              <p className="text-lg text-gray-600 mb-4">{guide.excerpt}</p>
            )}
            {guide.publishedAt && (
              <p className="text-sm text-gray-500">
                Published on {new Date(guide.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            )}
          </header>

          {/* Content */}
          {guide.body && (
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="prose prose-neutral max-w-none">
                <PortableText value={guide.body} components={portableTextComponents} />
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}