import type { JSX } from "react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { getAllTalentPoolCategories } from "@/lib/sanityClient";
import { talentPoolStageContent } from "@/lib/talentPool";

interface TalentPoolCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  heroImage?: string;
}

const categoryOrder = ["u14", "u15", "u16", "u18", "u20"] as const;

const categoryDescriptions: Record<(typeof categoryOrder)[number], string> = {
  u14: talentPoolStageContent.u14.summary,
  u15: talentPoolStageContent.u15.summary,
  u16: talentPoolStageContent.u16.summary,
  u18: talentPoolStageContent.u18.summary,
  u20: talentPoolStageContent.u20.summary,
};

export async function TalentPoolCategories(): Promise<JSX.Element> {
  const categories =
    (await getAllTalentPoolCategories()) as TalentPoolCategory[];

  const categoriesBySlug = new Map(
    categories.map((category) => [category.slug.current.toLowerCase(), category]),
  );

  const orderedCategories = categoryOrder.map((slug) => {
    const existingCategory = categoriesBySlug.get(slug);

    return (
      existingCategory ?? {
        _id: slug,
        title: slug.toUpperCase(),
        slug: { current: slug },
        description: categoryDescriptions[slug],
      }
    );
  });

  return (
    <section id="talent-pools" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Talent Pool Categories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each stage has a different job in the pathway, from first federation contact to later national-team preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orderedCategories.map((category) => {
            const hasLivePage = categoriesBySlug.has(category.slug.current.toLowerCase());

            return hasLivePage ? (
              <Link
                key={category._id}
                href={`/talentpools/${category.slug.current}`}
              >
                <div
                  className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-[1.75rem] border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:h-80"
                  style={
                    category.heroImage
                      ? {
                          backgroundImage: `url(${category.heroImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  <div
                    className={`absolute inset-0 ${category.heroImage ? "bg-gradient-to-t from-black/80 via-black/35 to-black/10" : "bg-[linear-gradient(135deg,#111111_0%,#c82b3a_58%,#f2c230_100%)]"}`}
                  ></div>

                  <div className="relative z-10 p-6 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                      Category
                    </p>
                    <h3 className="mt-3 text-3xl font-bold">{category.title}</h3>
                    <p className="mt-3 text-white/80">
                      {categoryDescriptions[category.slug.current as (typeof categoryOrder)[number]] || category.description}
                    </p>
                  </div>

                  <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Button variant="secondary" size="lg">
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={category._id}
                className="flex h-64 flex-col justify-between rounded-[1.75rem] border border-dashed border-primary/25 bg-primary/5 p-6 md:h-80"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
                    Planned Category
                  </p>
                  <h3 className="mt-3 text-3xl font-bold text-foreground">{category.title}</h3>
                  <p className="mt-3 text-muted-foreground">{category.description}</p>
                </div>

                <div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    This slot is visible on the homepage and can be linked as soon as the U15 category is published in Sanity.
                  </p>
                  <Button variant="outline" size="lg" disabled>
                    Category Setup Pending
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
