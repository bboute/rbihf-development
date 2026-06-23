import Link from "next/link";

export default function QuickActionsWidget() {
  const quickActions = [
    {
      title: "Coaching Resources",
      description: "View guides and coaching materials",
      href: "/portal/coaching-resources",
      icon: "📚",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Club Growth",
      description: "Manage club development initiatives",
      href: "/portal/club-growth",
      icon: "📈",
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group block p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:border-primary/50"
          >
            <div className="flex items-start space-x-3">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${action.color}`}
              >
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
