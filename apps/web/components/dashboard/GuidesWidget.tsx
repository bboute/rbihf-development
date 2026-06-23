import Link from 'next/link'

interface Guide {
  _id: string
  title: string
  slug: { current: string }
  summary: string
  publishedAt: string
  targetRole: string
  category?: string
  imageUrl?: string
}

interface GuidesWidgetProps {
  guides: Guide[]
}

export default function GuidesWidget({ guides }: GuidesWidgetProps) {
  return (
    <div className="bg-card border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Featured Guides</h2>
        <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
          {guides.length}
        </span>
      </div>
      
      {guides.length > 0 ? (
        <div className="space-y-4">
          {guides.slice(0, 5).map((guide) => (
            <Link 
              key={guide._id}
              href={`/portal/curriculum/guides/${guide.slug.current}`}
              className="group block border-l-4 border-secondary pl-4 py-2 hover:bg-muted/50 transition-colors rounded-r"
            >
              <h3 className="font-medium text-sm group-hover:text-secondary transition-colors">
                {guide.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {guide.category && (
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded">
                    {guide.category}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(guide.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              {guide.summary && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {guide.summary}
                </p>
              )}
            </Link>
          ))}
          {guides.length > 5 && (
            <div className="pt-2 border-t">
              <Link 
                href="/portal/coaching-resources" 
                className="text-secondary hover:underline text-sm font-medium"
              >
                View all guides →
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">No guides available at this time.</p>
        </div>
      )}
    </div>
  )
}