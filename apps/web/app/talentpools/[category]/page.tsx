import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { CategoryHero } from "@/components/talentpools/CategoryHero";
import { EventList } from "@/components/talentpools/EventList";
import { CategoryNavigation } from "@/components/talentpools/CategoryNavigation";
import {
  getTalentPoolCategoryBySlug,
  getEventsByCategory,
  getPostsByCategory,
} from "@/lib/sanityClient";
import { getTalentPoolStageContent } from "@/lib/talentPool";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  imageUrl?: string;
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function CategoryPage({
  params,
}: CategoryPageProps): Promise<React.JSX.Element> {
  const { category } = await params;
  const categoryData = await getTalentPoolCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  const events = await getEventsByCategory(categoryData._id);
  const posts = await getPostsByCategory(categoryData._id);
  const stageContent = getTalentPoolStageContent(category) ?? {
    slug: category.toLowerCase(),
    label: categoryData.title,
    summary: categoryData.description,
    stagePurpose: categoryData.description,
    playerExperience:
      "Players stay connected to their club environment while experiencing federation expectations through camps, events, and official updates.",
    concepts:
      "Federation concepts are introduced at a public level here, with deeper coaching detail reserved for staff-facing work.",
    futureConnection:
      "Each stage is part of the long-term pathway toward future national-team environments.",
    exposure:
      "Events and pathway moments give players and families a clearer reference point for development over time.",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <CategoryHero
        title={categoryData.title}
        description={stageContent.summary}
        imageUrl={categoryData.imageUrl}
        videoUrl={categoryData.videoUrl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Talent Pool Overview */}
        <div className="mb-12">
          <Button variant="outline" asChild>
            <Link
              href="/#talent-pools"
              className="inline-flex items-center gap-2"
            >
              ← Back to Talent Pool Overview
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Stage Overview */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Stage Purpose
              </p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Why {categoryData.title} exists in the pathway
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                {stageContent.stagePurpose}
              </p>
              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                {stageContent.playerExperience}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="flex-1">
                  <Link href={`/talentpools/${category}/skills`}>
                    <span className="mr-2">⭐</span>
                    View Pathway Skills
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="flex-1">
                  <Link href="/portal/videos">
                    <span className="mr-2">🎥</span>
                    Coach Videos
                  </Link>
                </Button>
              </div>
            </section>

            {/* Stage Details */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What players, families, and coaches should understand
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                    👥
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    Player Experience
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {stageContent.playerExperience}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                    🧠
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    Federation Concepts
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {stageContent.concepts}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                    🔁
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    Future Connection
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {stageContent.futureConnection}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                    🌍
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    Exposure And Events
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {stageContent.exposure}
                  </p>
                </div>
              </div>
            </section>

            {/* Club vs Federation */}
            <section className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl p-8 border border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-white/80 p-6 border border-primary/10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Clubs carry the heaviest load
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Weekly repetition, coaching, match minutes, and daily habits stay rooted in the club environment. Talent Pool adds reference points and experiences, but it does not replace club development.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/80 p-6 border border-primary/10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Talent Pool adds federation preparation
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    RBIHF uses this stage to introduce common concepts, observe progression over time, and connect players with the demands of future national-team environments.
                  </p>
                </div>
              </div>
            </section>

            {/* Upcoming Events */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Events And International Experience
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {stageContent.exposure}
              </p>
              {events && events.length > 0 ? (
                <EventList events={events} />
              ) : (
                <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-600">
                  Official events linked to this stage will appear here when they are published.
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Category Navigation */}
            <CategoryNavigation currentCategory={category} />

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href={`/talentpools/${category}/skills`}>
                    <span className="mr-3">⭐</span>
                    Pathway Skills Overview
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href="/portal/videos">
                    <span className="mr-3">🎥</span>
                    Coach Videos
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href="/talent-pool">
                    <span className="mr-3">🧭</span>
                    Talent Pool Overview
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Pathway Snapshot
              </h3>
              <div className="space-y-4 text-sm leading-relaxed text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900">Stage summary</p>
                  <p className="mt-1">{stageContent.summary}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Future connection</p>
                  <p className="mt-1">{stageContent.futureConnection}</p>
                </div>
              </div>
            </div>

            {/* Category News */}
            {posts && posts.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {categoryData.title} News
                  </h3>
                  <Link
                    href="/news"
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post: Post) => (
                    <article key={post._id} className="group">
                      <Link
                        href={`/news/${post.slug.current}`}
                        className="block hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
                      >
                        <div className="flex gap-4">
                          {post.imageUrl && (
                            <div className="flex-shrink-0">
                              <Image
                                src={post.imageUrl}
                                alt={post.title}
                                width={80}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">
                              {formatDate(post.publishedAt)}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Public And Coach-Facing Content
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                This page explains why the stage exists and what families should expect. Detailed systems teaching and coaching implementation stay in coach-facing resources rather than on the public pathway page.
              </p>
              <Button asChild className="w-full">
                <Link href="/portal/videos">Coach Videos</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
