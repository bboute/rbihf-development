import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { CategoryHero } from "@/components/talentpools/CategoryHero";
import {
  getFundamentalCategoryBySlug,
  getPostsByFundamentalCategory,
} from "@/lib/sanityClient";
import { getClubDevelopmentStage } from "@/lib/clubDevelopment";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  imageUrl?: string;
}

interface FundamentalPageProps {
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

export default async function FundamentalPage({
  params,
}: FundamentalPageProps): Promise<React.JSX.Element> {
  const { category } = await params;
  const categoryData = await getFundamentalCategoryBySlug(category);
  const stage = getClubDevelopmentStage(category);

  if (!categoryData) {
    notFound();
  }

  // Get category-specific news posts
  const categoryPosts = await getPostsByFundamentalCategory(categoryData._id);

  return (
    <main className="min-h-screen bg-background">
      <CategoryHero
        title={categoryData.title}
        description={categoryData.description}
        imageUrl={categoryData.imageUrl}
        videoUrl={categoryData.videoUrl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Fundamentals Overview */}
        <div className="mb-12">
          <Button
            variant="outline"
            asChild
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link
              href="/club-development"
              className="inline-flex items-center gap-2"
            >
              ← Back to Club Development
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Program Overview */}
            <section className="bg-muted/20 rounded-xl p-8 border border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                  Program Overview
                </h2>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {categoryData.ageRange}
                </span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {categoryData.description}
              </p>

              {/* Trust Indicators */}
              <div className="bg-primary/5 rounded-lg p-4 mb-8 border border-primary/10">
                <div className="flex items-center gap-3 text-sm text-primary">
                  <span className="text-lg">✓</span>
                  <span className="font-medium">
                    Hockey Belgium Approved Program
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-primary mt-2">
                  <span className="text-lg">✓</span>
                  <span className="font-medium">Clear Development Pathway</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-primary mt-2">
                  <span className="text-lg">✓</span>
                  <span className="font-medium">Expert Certified Coaching</span>
                </div>
              </div>

              {/* Skills Overview CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href={`/club-development/${category}/skills`}>
                    <span className="mr-2">🏒</span>
                    View Skills & Practice
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link href={`/portal/curriculum/${category}`}>
                    <span className="mr-2">👨‍🏫</span>
                    Coach Curriculum
                  </Link>
                </Button>
              </div>
            </section>

            {stage && (
              <section className="bg-muted/20 rounded-xl p-8 border border-primary/10">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                  Practice Setup & Delivery Standards
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-primary/10 bg-background p-6">
                    <h4 className="text-xl font-bold text-foreground mb-4">
                      Practice Setup
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      {stage.practiceSetup.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-primary/10 bg-background p-6">
                    <h4 className="text-xl font-bold text-foreground mb-4">
                      Staffing Minimums
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      {stage.staffingMinimum.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Program Highlights */}
            <section className="bg-muted/20 rounded-xl p-8 border border-primary/10">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Program Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group p-6 rounded-xl bg-primary/5 border border-primary/10 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 transition-transform">
                    😄
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3">
                    Fun First
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Age-appropriate activities that prioritize enjoyment and
                    positive experiences with ice hockey fundamentals.
                  </p>
                </div>

                <div className="group p-6 rounded-xl bg-secondary/5 border border-secondary/10 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary text-2xl mb-4 group-hover:scale-110 transition-transform">
                    🏆
                  </div>
                  <h4 className="text-xl font-bold text-secondary mb-3">
                    Skill Building
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Progressive development of basic skating, stick handling,
                    and game awareness skills through structured play.
                  </p>
                </div>

                <div className="group p-6 rounded-xl bg-tertiary/5 border border-tertiary/10 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary text-2xl mb-4 group-hover:scale-110 transition-transform">
                    🤝
                  </div>
                  <h4 className="text-xl font-bold text-tertiary mb-3">
                    Team Spirit
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Building friendships, cooperation, and basic understanding
                    of teamwork in a supportive environment.
                  </p>
                </div>

                <div className="group p-6 rounded-xl bg-primary/5 border border-primary/10 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 transition-transform">
                    📚
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3">
                    Safe Learning
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Professional coaching in a safe, supportive environment that
                    builds confidence and hockey fundamentals.
                  </p>
                </div>
              </div>
            </section>

            {/* Development Philosophy */}
            <section className="bg-muted/30 rounded-xl p-8 border border-primary/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Development Philosophy for Coaches & Parents
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Understanding how your player progresses through our
                  structured approach to building hockey fundamentals and
                  fostering lifelong love of the game.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🎯
                  </div>
                  <h4 className="font-bold text-lg text-primary mb-3">
                    Individual Progress Tracking
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Clear benchmarks and assessments help coaches and parents
                    track each player's development journey.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🏒
                  </div>
                  <h4 className="font-bold text-lg text-primary mb-3">
                    Proven Teaching Methods
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Evidence-based coaching techniques ensure proper skill
                    development from the very beginning.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    ❤️
                  </div>
                  <h4 className="font-bold text-lg text-primary mb-3">
                    Community & Family Engagement
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Building a supportive hockey community where families
                    connect and players develop lifelong friendships.
                  </p>
                </div>
              </div>
            </section>

            {stage && (
              <section className="bg-muted/30 rounded-xl p-8 border border-primary/10">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                      Club Standards
                    </h3>
                    <ul className="space-y-3 text-muted-foreground leading-relaxed">
                      {stage.clubStandards.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                      Parent Expectations
                    </h3>
                    <ul className="space-y-3 text-muted-foreground leading-relaxed">
                      {stage.parentExpectations.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-muted/20 rounded-xl p-6 border border-primary/10">
              <h3 className="text-xl font-bold text-primary mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link href={`/club-development/${category}/skills`}>
                    <span className="mr-3">📋</span>
                    Skills & Practice
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link href={`/portal/curriculum/${category}`}>
                    <span className="mr-3">✍️</span>
                    Curriculum Hub
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link href="/portal/videos">
                    <span className="mr-3">🎥</span>
                    Coach Videos
                  </Link>
                </Button>
              </div>
            </div>

            {/* Category News */}
            {categoryPosts && categoryPosts.length > 0 && (
              <div className="bg-muted/20 rounded-xl p-6 border border-primary/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-primary">
                    {categoryData.title} News
                  </h3>
                  <Link
                    href="/news"
                    className="text-tertiary hover:text-tertiary/80 text-sm font-medium"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-4">
                  {categoryPosts.slice(0, 3).map((post: Post) => (
                    <article key={post._id} className="group">
                      <Link
                        href={`/news/${post.slug.current}`}
                        className="block hover:bg-primary/5 rounded-lg p-3 -m-3 transition-colors"
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
                            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                              {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              {formatDate(post.publishedAt)}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
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

            {/* Program Info */}
            <div className="bg-muted/30 rounded-xl p-6 border border-primary/10">
              <h3 className="text-xl font-bold text-primary mb-4">
                Program Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-primary/10">
                  <span className="font-medium text-foreground">
                    Age Range:
                  </span>
                  <span className="text-muted-foreground">
                    {categoryData.ageRange}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-primary/10">
                  <span className="font-medium text-foreground">
                    Program Type:
                  </span>
                  <span className="text-muted-foreground">Club Development</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-primary/10">
                  <span className="font-medium text-foreground">Focus:</span>
                  <span className="text-muted-foreground">
                    Skills, Practice, Standards
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-foreground">
                    Environment:
                  </span>
                  <span className="text-muted-foreground">
                    Fun & Supportive
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
