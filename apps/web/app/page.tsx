import type { JSX } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FundamentalCategories } from "@/components/sections/FundamentalCategories";
import { NewsSection } from "@/components/sections/NewsSection";
import { ExhibitionGamesSection } from "@/components/sections/ExhibitionGamesSection";
import {
  getAllPosts,
  getAllExhibitionGames,
  getAllFundamentalCategories,
} from "@/lib/sanityClient";

export default async function Page(): Promise<JSX.Element> {
  const posts = await getAllPosts();
  const games = await getAllExhibitionGames();
  const fundamentalCategories = await getAllFundamentalCategories();
  const featuredPost = posts[0];

  return (
    <main>
      <HeroSection
        featuredPost={featuredPost}
      />
      <NewsSection posts={posts} />
      <ExhibitionGamesSection games={games} />
      <FundamentalCategories categories={fundamentalCategories} />
    </main>
  );
}
