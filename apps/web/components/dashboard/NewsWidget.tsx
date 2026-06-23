import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  imageUrl?: string;
}

interface NewsWidgetProps {
  posts: Post[];
}

export default function NewsWidget({ posts }: NewsWidgetProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Latest News</h2>
        <Link
          href="/news"
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.slice(0, 5).map((post) => (
            <article key={post._id} className="group">
              <Link
                href={`/news/${post.slug.current}`}
                className="block hover:bg-muted rounded-lg p-3 -m-3 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  {post.imageUrl && (
                    <div className="flex-shrink-0 w-16 h-12 bg-muted rounded overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <time className="text-xs text-muted-foreground mt-2 block">
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            No news available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
