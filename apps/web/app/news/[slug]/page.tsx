import type { JSX } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { getPostBySlug } from "@/lib/sanityClient"
import { portableTextComponents } from "@/lib/portableTextComponents"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function NewsArticlePage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/news"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to News
            </Link>
          </div>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <time className="text-sm text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </header>

            {post.imageUrl && (
              <div className="mb-8 aspect-video relative overflow-hidden rounded-lg">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="max-w-none">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}