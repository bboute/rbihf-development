import type { JSX } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/sanityClient"

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  imageUrl?: string
  categories?: Array<{
    _id: string
    title: string
  }>
}

export default async function NewsPage(): Promise<JSX.Element> {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen">
      {/* Section with matching background */}
      <section className="relative overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(200,43,58,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(242,194,48,0.12),_transparent_28%),linear-gradient(180deg,_rgba(245,242,235,1)_0%,_rgba(255,251,245,1)_100%)] py-20">
        {/* Subtle brush-stroke texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              News
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              All announcements and updates from RBIHF Development Hub.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-primary/10 bg-white/50 py-16 text-center">
              <p className="text-muted-foreground">
                No news articles available yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: Post) => (
                <article
                  key={post._id}
                  className="group overflow-hidden rounded-3xl border border-primary/10 bg-white/75 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-lg"
                >
                  <Link
                    href={`/news/${post.slug.current}`}
                    className="block"
                  >
                    {/* Image */}
                    {post.imageUrl && (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5">
                      {/* Category Badge */}
                      {post.categories?.[0] && (
                        <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {post.categories[0].title}
                        </span>
                      )}

                      <h2 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight text-foreground group-hover:text-secondary">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>
                      )}

                      <time className="text-xs text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          timeZone: 'UTC'
                        })}
                      </time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
