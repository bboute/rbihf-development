import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID!;
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2024-05-21";

if (!projectId) {
  throw new Error("Missing Sanity project ID in environment variables");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

// GROQ query to get all posts
export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug
    },
    "imageUrl": mainImage.asset->url
  }`;

  return await sanityClient.fetch(query);
}

// GROQ query to get a page by slug
export async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body
  }`;

  return await sanityClient.fetch(query, { slug });
}

// GROQ query to get a single post by slug
export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    body,
    "imageUrl": mainImage.asset->url
  }`;

  return await sanityClient.fetch(query, { slug });
}

// GROQ query to get guides filtered by user role
export async function getGuidesByRole(role: string) {
  const query = `*[_type == "guide" && targetRole == $role] | order(publishedAt desc) {
    _id,
    title,
    slug,
    summary,
    publishedAt,
    targetRole,
    category,
    "imageUrl": mainImage.asset->url
  }`;

  return await sanityClient.fetch(query, { role });
}

// GROQ query to get announcements by target role
export async function getAnnouncementsByRole(role: string) {
  const query = `*[_type == "announcement" && targetRole == $role] | order(date desc) {
    _id,
    title,
    date,
    body,
    targetRole
  }`;

  return await sanityClient.fetch(query, { role });
}

// GROQ query to get guides filtered by age category
export async function getGuidesByAgeCategory(ageCategory: string) {
  const query = `*[_type == "guide" && ageCategory == $ageCategory] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    ageCategory,
    targetRole,
    "imageUrl": mainImage.asset->url
  }`;

  return await sanityClient.fetch(query, { ageCategory });
}

// GROQ query to get a single guide by slug
export async function getGuideBySlug(slug: string) {
  const query = `*[_type == "guide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    ageCategory,
    targetRole,
    "imageUrl": mainImage.asset->url
  }`;

  return await sanityClient.fetch(query, { slug });
}

// GROQ query to get all exhibition games
export async function getAllExhibitionGames() {
  const query = `*[_type == "exhibitionGame"] | order(matchDate asc) {
    _id,
    title,
    "matchDate": date,
    "homeTeam": "Belgium",
    "awayTeam": opponent,
    "venue": location,
    status,
    result,
    "ticketUrl": ticketLink,
    categories[]->{
      _id,
      title,
      slug
    }
  }`;

  return await sanityClient.fetch(query);
}

// GROQ query to get a talent pool category by slug
export async function getTalentPoolCategoryBySlug(slug: string) {
  const query = `*[_type == "talentPoolCategory" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "imageUrl": heroImage.asset->url,
    "videoUrl": heroVideo.asset->url
  }`;

  return await sanityClient.fetch(query, { slug });
}

// GROQ query to get events by talent pool category
export async function getEventsByCategory(categoryId: string) {
  const query = `*[_type == "event" && references($categoryId)] | order(eventDate asc) {
    _id,
    title,
    slug,
    eventDate,
    venue,
    description,
    "imageUrl": mainImage.asset->url
  }`;

  return await sanityClient.fetch(query, { categoryId });
}

// GROQ query to get posts by talent pool category
export async function getPostsByCategory(categoryId: string) {
  const query = `*[_type == "post" && categories[]._ref == $categoryId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }`;

  return await sanityClient.fetch(query, { categoryId });
}

// GROQ query to get posts by fundamental category
export async function getPostsByFundamentalCategory(categoryId: string) {
  const query = `*[_type == "post" && fundamentalCategories[]._ref == $categoryId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }`;

  return await sanityClient.fetch(query, { categoryId });
}

// GROQ query to get all talent pool categories
export async function getAllTalentPoolCategories() {
  const query = `*[_type == "talentPoolCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    "heroImage": heroImage.asset->url
  }`;

  return await sanityClient.fetch(query);
}

// GROQ query to get all fundamental categories
export async function getAllFundamentalCategories() {
  const query = `*[_type == "fundamentalCategory" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    ageRange,
    description,
    "heroImage": heroImage.asset->url
  }`;

  return await sanityClient.fetch(query);
}

// GROQ query to get a fundamental category by slug
export async function getFundamentalCategoryBySlug(slug: string) {
  const query = `*[_type == "fundamentalCategory" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    ageRange,
    description,
    "imageUrl": heroImage.asset->url,
    "videoUrl": heroVideo.asset->url
  }`;

  return await sanityClient.fetch(query, { slug });
}

// GROQ query to get skills by fundamental category
export async function getSkillsByFundamentalCategory(categoryId: string) {
  const query = `*[_type == "skillCategory" && fundamentalCategory._ref == $categoryId] | order(order asc) {
    _id,
    title,
    description,
    order,
    skills[] | order(order asc) {
      title,
      description,
      order
    }
  }`;

  return await sanityClient.fetch(query, { categoryId });
}

// GROQ query to get skills by talent pool category
export async function getSkillsByCategory(categoryId: string) {
  const query = `*[_type == "skillCategory" && talentPoolCategory._ref == $categoryId] | order(order asc) {
    _id,
    title,
    description,
    order,
    skills[] | order(order asc) {
      title,
      description,
      order
    }
  }`;

  return await sanityClient.fetch(query, { categoryId });
}

// GROQ query to get home page data including recruitment banner
export async function getHomePage() {
  const query = `*[_type == "homePage"][0] {
    _id,
    title,
    "heroVideoUrl": heroVideo.asset->url,
    recruitmentBanner {
      headline,
      bodyText,
      ctaButtonText,
      ctaLink
    },
    coachRecruitmentBanner {
      headline,
      bodyText,
      ctaText
    }
  }`;

  return await sanityClient.fetch(query);
}
