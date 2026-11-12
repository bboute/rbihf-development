import Link from "next/link";
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
    <nav className="border-y border-border bg-[#F5F2EB]" aria-label="Talent Pool stages">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/talent-pool" className="mr-3 shrink-0 text-sm font-bold text-primary hover:text-primary/75">
          Talent Pool overview
        </Link>
        {categories.map((category: TalentPoolCategory) => {
          const isActive = currentCategory === category.slug.current;

          return (
            <Link
              key={category._id}
              href={`/talentpools/${category.slug.current}`}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 rounded px-5 py-2 text-sm font-bold transition-colors ${isActive ? "bg-foreground text-background" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}
            >
              {category.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
