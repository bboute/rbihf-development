import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PathwayDetailPage } from "@/components/PathwayDetailPage";
import { isTalentPoolAgeGroup } from "@/lib/talentPool";
import { filterCalendarEntries } from "@/lib/calendar";
import {
  getEventLabels,
  getCalendarEntries,
  getPostsByCategory,
  getPathwayPageContent,
  getTalentPoolCategoryBySlug,
} from "@/lib/sanityClient";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isTalentPoolAgeGroup(category)) notFound();
  const { copy } = await getPathwayPageContent(`talent-pool-${category}-page`);
  return {
    title: copy.heroTitle || undefined,
    description: copy.heroDescription || undefined,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  if (!isTalentPoolAgeGroup(category)) notFound();
  const [categoryData, content, labels, calendarEntries] = await Promise.all([
    getTalentPoolCategoryBySlug(category),
    getPathwayPageContent(`talent-pool-${category}-page`),
    getEventLabels(),
    getCalendarEntries(),
  ]);
  const posts = categoryData ? await getPostsByCategory(categoryData._id) : [];
  return (
    <PathwayDetailPage
      kind="talent-pool"
      slug={category}
      content={content}
      events={filterCalendarEntries(calendarEntries, category.toLowerCase())}
      posts={posts}
      labels={labels}
    />
  );
}
