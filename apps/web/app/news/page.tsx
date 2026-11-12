import type { JSX } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Newspaper } from "lucide-react"
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

export default async function NewsPage(): Promise<JSX.Element> {
  const posts: Post[] = await getAllPosts()
  const featuredPosts = posts.slice(0, 4)
  const archivePosts = posts.slice(4)

  return (
    <main className="min-h-screen bg-background">
      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-[#102D35] text-white">
        <Image
          src="/image.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-3 pt-32 sm:px-6 sm:pb-4 lg:px-8 lg:pb-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
              RBIHF Development Centre of Excellence
            </p>
            <h1 className="mt-4 font-heading text-6xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              News
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              Official updates, announcements and stories from Belgian ice
              hockey development.
            </p>
            <a
              href={featuredPosts.length > 0 ? "#latest" : "#archive"}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white/85 hover:text-white"
            >
              Browse updates
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section
          id="latest"
          className="section-rhythm scroll-mt-32 bg-background"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Featured updates
                </p>
                <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
                  Start with the latest.
                </h2>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/news/${post.slug.current}`}
                  className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-md bg-black"
                >
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(240,137,146,0.4),transparent_55%),linear-gradient(135deg,#1B3A42,#102D35)]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                  <div className="relative p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/65">
                      {post.categories?.[0]
                        ? `${post.categories[0].title} · `
                        : ""}
                      {formatDate(post.publishedAt)}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-bold leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        id="archive"
        className="section-rhythm scroll-mt-32 bg-[#152E35] text-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F08992]">
                News archive
              </p>
              <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
                All updates.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/70 lg:justify-self-end">
              Everything else from across the RBIHF development pathway,
              newest first.
            </p>
          </div>

          {archivePosts.length > 0 ? (
            <div className="mt-10 border-y border-white/15">
              {archivePosts.map((post: Post, index: number) => (
                <article
                  key={post._id}
                  className={`py-6 ${index > 0 ? "border-t border-white/15" : ""}`}
                >
                  <Link
                    href={`/news/${post.slug.current}`}
                    className="group grid gap-3 sm:grid-cols-[10rem_1fr_auto] sm:items-center"
                  >
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs font-bold uppercase tracking-[0.14em] text-white/50"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    <span>
                      {post.categories?.[0] && (
                        <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#F08992]">
                          {post.categories[0].title}
                        </span>
                      )}
                      <span className="mt-1 block text-xl font-bold leading-snug transition-colors group-hover:text-[#F08992]">
                        {post.title}
                      </span>
                      {post.excerpt && (
                        <span className="mt-2 block text-sm leading-6 text-white/65">
                          {post.excerpt}
                        </span>
                      )}
                    </span>
                    <ArrowRight
                      className="hidden h-5 w-5 text-white/55 transition-transform group-hover:translate-x-1 group-hover:text-white sm:block"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 border-y border-white/15 py-12 text-center text-white/65">
              <Newspaper
                className="mx-auto h-8 w-8"
                aria-hidden="true"
              />
              <p className="mt-3 font-bold text-white">
                {posts.length > 0 ? "You’re all caught up." : "No news published yet"}
              </p>
              <p className="mt-1 text-sm">
                {posts.length > 0
                  ? "More official updates will appear here as they are announced."
                  : "Official updates will appear here when they are published."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
