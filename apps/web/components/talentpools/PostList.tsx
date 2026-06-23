import Image from "next/image";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  author?: string;
  imageUrl?: string;
}

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No news posts available.</p>
      </div>
    );
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-card border border-border/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {post.imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <time className="text-sm text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </time>
                <span className="text-sm bg-blue-500/10 text-blue-600 px-2 py-1 rounded-full">
                  News
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                {post.title}
              </h3>

              {post.excerpt && (
                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
              )}

              {post.author && (
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <span>By {post.author}</span>
                </div>
              )}

              <Link
                href={`/news/${post.slug.current}`}
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
