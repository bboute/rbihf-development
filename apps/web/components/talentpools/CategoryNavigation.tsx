import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { getAllTalentPoolCategories } from "@/lib/sanityClient";

interface TalentPoolCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  heroImage?: string;
}

interface CategoryNavigationProps {
  currentCategory?: string;
}

export async function CategoryNavigation({
  currentCategory,
}: CategoryNavigationProps): Promise<React.JSX.Element | null> {
  const categories = await getAllTalentPoolCategories();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Talent Pool Categories
        </h3>
        <Button variant="outline" size="sm" asChild>
          <Link href="/" className="flex items-center gap-2">
            <span>🏠</span>
            Home
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {categories.map((category: TalentPoolCategory) => {
          const isActive = currentCategory === category.slug.current;

          return (
            <Button
              key={category._id}
              asChild
              variant={isActive ? "default" : "outline"}
              className="w-full justify-start"
              disabled={isActive}
            >
              <Link href={`/talentpools/${category.slug.current}`}>
                <span className="mr-3">{isActive ? "🎯" : "⭐"}</span>
                {category.title}
                {isActive && (
                  <span className="ml-auto text-xs opacity-75">Current</span>
                )}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-sm"
        >
          <Link href="/#talent-pools">
            <span className="mr-3">👀</span>
            View All Talent Pools
          </Link>
        </Button>
      </div>
    </div>
  );
}
