import type { JSX } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { PathwayAccordion } from "@/components/sections/PathwayAccordion";
import { NewsSection } from "@/components/sections/NewsSection";
import { SeasonPlanningSection } from "@/components/sections/SeasonPlanningSection";
import {
  getAllPosts,
  getCalendarEntries,
  getHomePage,
  getAllFundamentalCategoriesForPathway,
  getEventLabels,
} from "@/lib/sanityClient";
import { isClubDevelopmentEnabled } from "@/lib/featureFlags";

export default async function Page(): Promise<JSX.Element> {
  const [posts, events, homePage, pathwayStages, labels] = await Promise.all([
    getAllPosts(),
    getCalendarEntries(),
    getHomePage(),
    getAllFundamentalCategoriesForPathway(),
    getEventLabels(),
  ]);
  const featuredPost = posts[0];

  return (
    <main>
      <HeroSection
        videoUrl={homePage?.heroVideoUrl}
        featuredPost={featuredPost}
        highlightedPosts={posts.slice(1, 4)}
      />
      {isClubDevelopmentEnabled && <PathwayAccordion stages={pathwayStages} />}
      <NewsSection posts={posts} />
      <SeasonPlanningSection events={events} labels={labels} />
    </main>
  );
}
