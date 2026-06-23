import Link from 'next/link'

interface Announcement {
  _id: string
  title: string
  date: string
  body: any
  targetRole: string
}

interface AnnouncementsWidgetProps {
  announcements: Announcement[]
}

export default function AnnouncementsWidget({ announcements }: AnnouncementsWidgetProps) {
  return (
    <div className="bg-card border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Latest Announcements</h2>
        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          {announcements.length}
        </span>
      </div>
      
      {announcements.length > 0 ? (
        <div className="space-y-4">
          {announcements.slice(0, 5).map((announcement) => (
            <div 
              key={announcement._id} 
              className="group border-l-4 border-primary pl-4 py-2 hover:bg-muted/50 transition-colors rounded-r cursor-pointer"
            >
              <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                {announcement.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(announcement.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))}
          {announcements.length > 5 && (
            <div className="pt-2 border-t">
              <Link 
                href="/portal/announcements" 
                className="text-primary hover:underline text-sm font-medium"
              >
                View all announcements →
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">No announcements at this time.</p>
        </div>
      )}
    </div>
  )
}