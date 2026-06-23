import type { JSX } from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

interface FundamentalCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  ageRange: string;
  description: string;
  heroImage?: string;
  comingSoon?: boolean;
}

interface FundamentalCategoriesProps {
  categories: FundamentalCategory[];
}

const comingSoonCategories: FundamentalCategory[] = [
  {
    _id: "u14",
    title: "U14 Play to Compete",
    slug: { current: "u14" },
    ageRange: "12-14 years",
    description:
      "Bridge phase between foundation and performance. Players apply skills under pressure, learn to compete consistently, and understand basic team principles with more intensity.",
    comingSoon: true,
  },
  {
    _id: "u16",
    title: "U16 Play to Compete",
    slug: { current: "u16" },
    ageRange: "14-16 years",
    description:
      "Advanced competitive preparation. Players develop individual tactics, group play (2v1, 2v2, 3v2), and team structure while maintaining skill development priority.",
    comingSoon: true,
  },
  {
    _id: "u18",
    title: "U18 Compete to Win",
    slug: { current: "u18" },
    ageRange: "16-18 years",
    description:
      "Performance-driven phase preparing players for senior hockey, national team standards and international competition. Individual development supports team performance.",
    comingSoon: true,
  },
];

export function FundamentalCategories({
  categories,
}: FundamentalCategoriesProps): JSX.Element {
  const defaultCategories: FundamentalCategory[] = [
    {
      _id: "u8",
      title: "U8 Learn to Play",
      slug: { current: "u8" },
      ageRange: "6-8 years",
      description:
        "Fun first approach with balance, coordination, and basic ice skills. Station-based practices with maximum 5-6 players per station. Cross-ice mini-games and playful activities build confidence and love for the game.",
    },
    {
      _id: "u10",
      title: "U10 Learn to Play",
      slug: { current: "u10" },
      ageRange: "8-10 years",
      description:
        "Continued skating development, fundamental puck skills, passing, receiving, shooting. Decision-making and small-area games. Players learn through repetition, many puck touches, and active engagement.",
    },
    {
      _id: "u12",
      title: "U12 Learn to Play",
      slug: { current: "u12" },
      ageRange: "10-12 years",
      description:
        "Applying skills at speed and under pressure. Individual tactics, puck support, decision-making and basic team principles. Cross-ice games until December, then progression to full-ice competition.",
    },
  ];

  const categoriesToShow =
    categories && categories.length > 0 ? categories : defaultCategories;
  
  const allCategories = [...categoriesToShow, ...comingSoonCategories];

  return (
    <section id="fundamentals" className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Club Development Pathway
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Age-based development stages that help clubs, coaches, and parents
            understand what should be taught, supported, and expected at each
            step.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allCategories.map((category) => (
            <div
              key={category._id}
              className={`bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                category.comingSoon ? 'opacity-60 grayscale' : ''
              }`}
            >
              {/* Image */}
              <div className="aspect-video bg-muted relative overflow-hidden">
                {category.heroImage ? (
                  <img
                    src={category.heroImage}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary/20">
                      {category.title.split(" ")[0]}
                    </div>
                  </div>
                )}
                {category.comingSoon && (
                  <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-primary">
                    {category.title}
                  </h3>
                  <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {category.ageRange}
                  </span>
                </div>

                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {category.description}
                </p>

                <div className="space-y-3">
                  <Button 
                    asChild 
                    className="w-full"
                    disabled={category.comingSoon}
                  >
                    <Link href={`/club-development/${category.slug.current}`}>
                      {category.comingSoon ? 'Under Construction' : 'View Age Overview'}
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full"
                    disabled={category.comingSoon}
                  >
                    <Link
                      href={`/club-development/${category.slug.current}/skills`}
                    >
                      {category.comingSoon ? 'Under Construction' : 'View Skills & Practice'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
