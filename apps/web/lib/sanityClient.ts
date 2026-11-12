import { createClient } from "@sanity/client"
import { calendarEntriesQuery, type CalendarEntry } from "@/lib/calendar"
import type { SanityImageObject } from "@sanity/image-url"
import { getSanityImage } from "@/lib/sanityImage"
import {
  contentSectionsProjection,
  resolveContentSections,
  type ContentSection,
} from "@/lib/pageSections"
import {
  talentPoolPageCopy,
  nationalTeamsPageCopy,
  eventLabels,
} from "@/lib/hubPageContent"
import type { EventLabels } from "@/lib/hubPageContent"
import {
  normalizePageCopy,
  type ContentItem,
  type StaffMember,
} from "../../../content/pageContent"
import { pathwayPageCopy } from "../../../content/pathwayPages"
import type { NationalTeamGame, NationalTeamPost } from "@/lib/nationalTeams"
import {
  nationalTeamCategorySlugs,
  type NationalTeamAgeGroup,
} from "@/lib/nationalTeams"
import type {
  TalentPoolDocument,
  TalentPoolEvent,
  TalentPoolPost,
} from "@/lib/talentPool"

const projectId = process.env.SANITY_PROJECT_ID!
const dataset = process.env.SANITY_DATASET || "production"
const apiVersion = process.env.SANITY_API_VERSION || "2024-05-21"

if (!projectId) {
  throw new Error("Missing Sanity project ID in environment variables")
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
})

async function getHubPageContent<T extends Record<string, string>>(
  id: string,
  type: string,
  defaults: T,
  useDefaults = false,
) {
  const page = await sanityClient.withConfig({ useCdn: false }).fetch<{
    copy?: Partial<{ [K in keyof T]: T[K] | null }> | null
    heroImage?: SanityImageObject | null
    contentSections?: Array<ContentSection | null> | null
  } | null>(
    `*[_id == $id && _type == $type][0] {
      copy,
      heroImage { asset->{_id, url}, crop, hotspot },
      ${contentSectionsProjection}
    }`,
    { id, type },
    { perspective: "published", cache: "no-store" },
  )
  const copy = normalizePageCopy(defaults, page?.copy)
  const heroImage = getSanityImage(page?.heroImage, { projectId, dataset })
  if (useDefaults) {
    for (const key in defaults) {
      copy[key] = page?.copy?.[key] ?? defaults[key] ?? ""
    }
  }
  return {
    copy,
    heroImageUrl: heroImage?.url ?? (useDefaults ? "/image.png" : undefined),
    heroImagePosition: heroImage?.objectPosition,
    contentSections: resolveContentSections(page?.contentSections, {
      projectId,
      dataset,
    }),
  }
}

export function getTalentPoolPageContent() {
  return getHubPageContent(
    "talent-pool-page",
    "talentPoolPage",
    talentPoolPageCopy,
  )
}

export function getCalendarPageContent() {
  return getHubPageContent(
    "talent-pool-page",
    "talentPoolPage",
    talentPoolPageCopy,
    true,
  )
}

export async function getPathwayPageContent(id: string) {
  const page = await sanityClient.withConfig({ useCdn: false }).fetch<{
    copy?: Partial<Record<keyof typeof pathwayPageCopy, string | null>> | null
    heroImage?: SanityImageObject | null
    heroVideoUrl?: string | null
    contentSections?: Array<ContentSection | null> | null
    expectations?: Array<ContentItem | null> | null
    staffing?: Array<
      (StaffMember & { image?: SanityImageObject | null }) | null
    > | null
  } | null>(
    `*[_id == $id && _type == "pathwayPage"][0] {
      copy,
      heroImage { asset->{_id, url}, crop, hotspot },
      "heroVideoUrl": heroVideo.asset->url,
      expectations[]{_key, title, description},
      staffing[]{_key, title, name, description, imageAlt, image { asset->{_id, url}, crop, hotspot }},
      ${contentSectionsProjection}
    }`,
    { id },
    { perspective: "published", cache: "no-store" },
  )
  const heroImage = getSanityImage(page?.heroImage, { projectId, dataset })
  return {
    copy: normalizePageCopy(pathwayPageCopy, page?.copy),
    heroImageUrl: heroImage?.url,
    heroImagePosition: heroImage?.objectPosition,
    heroVideoUrl: page?.heroVideoUrl ?? undefined,
    contentSections: resolveContentSections(page?.contentSections, {
      projectId,
      dataset,
    }),
    expectations: page?.expectations,
    staffing: page?.staffing?.map((entry) => {
      if (!entry) return null
      const { image, ...person } = entry
      return {
        ...person,
        imageUrl: getSanityImage(
          image,
          { projectId, dataset },
          { width: 192, height: 192 },
        )?.url,
      }
    }),
  }
}

export async function getEventLabels(): Promise<EventLabels> {
  const labels = await sanityClient
    .withConfig({ useCdn: false })
    .fetch<Partial<{ [K in keyof EventLabels]: string | null }> | null>(
      `*[_id == "event-labels" && _type == "eventLabels"][0] {
      confirmed, provisional, completed, upcoming, cancelled
    }`,
      {},
      { perspective: "published", cache: "no-store" },
    )
  return {
    confirmed: labels?.confirmed ?? eventLabels.confirmed,
    provisional: labels?.provisional ?? eventLabels.provisional,
    completed: labels?.completed ?? eventLabels.completed,
    upcoming: labels?.upcoming ?? eventLabels.upcoming,
    cancelled: labels?.cancelled ?? eventLabels.cancelled,
  }
}

export function getNationalTeamsPageContent() {
  return getHubPageContent(
    "national-teams-page",
    "nationalTeamsPage",
    nationalTeamsPageCopy,
  )
}

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
  }`

  return await sanityClient.fetch(query)
}

// GROQ query to get a page by slug
export async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body
  }`

  return await sanityClient.fetch(query, { slug })
}

// GROQ query to get all pages for static generation
export async function getAllPages() {
  const query = `*[_type == "page"] {
    _id,
    title,
    slug
  }`

  return await sanityClient.fetch(query)
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
  }`

  return await sanityClient.fetch(query, { slug })
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
  }`

  return await sanityClient.fetch(query, { role })
}

// GROQ query to get announcements by target role
export async function getAnnouncementsByRole(role: string) {
  const query = `*[_type == "announcement" && targetRole == $role] | order(date desc) {
    _id,
    title,
    date,
    body,
    targetRole
  }`

  return await sanityClient.fetch(query, { role })
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
  }`

  return await sanityClient.fetch(query, { ageCategory })
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
  }`

  return await sanityClient.fetch(query, { slug })
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
  }`

  return await sanityClient.fetch(query)
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
  }`

  return await sanityClient.withConfig({ useCdn: false }).fetch<{
    _id: string
    title: string
    slug: { current: string }
    description?: string
    imageUrl?: string
    videoUrl?: string
  } | null>(query, { slug }, { perspective: "published", cache: "no-store" })
}

// GROQ query to get events by talent pool category
export async function getEventsByCategory(
  categoryId: string,
): Promise<Omit<TalentPoolEvent, "categories">[]> {
  const query = `*[_type == "event" && references($categoryId)] | order(startDate asc) {
    _id,
    title,
    slug,
    "eventDate": coalesce(startDate, eventDate),
    endDate,
    "status": coalesce(status, "confirmed"),
    venue,
    description,
    "imageUrl": mainImage.asset->url
  }`

  return await sanityClient
    .withConfig({ useCdn: false })
    .fetch(
      query,
      { categoryId },
      { perspective: "published", cache: "no-store" },
    )
}

// GROQ query to get posts by talent pool category
export async function getPostsByCategory(
  categoryId: string,
): Promise<NationalTeamPost[]> {
  const query = `*[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }`

  return await sanityClient
    .withConfig({ useCdn: false })
    .fetch(
      query,
      { categoryId },
      { perspective: "published", cache: "no-store" },
    )
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
  }`

  return await sanityClient.fetch(query, { categoryId })
}

// GROQ query to get ALL fundamental categories (for the homepage pathway accordion)
export async function getAllFundamentalCategoriesForPathway() {
  const query = `*[_type == "fundamentalCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    ageRange,
    description,
    "image": heroImage.asset->url
  }`

  return await sanityClient.fetch(query)
}

// GROQ query to get all talent pool categories
export async function getAllTalentPoolCategories() {
  const query = `*[_type == "talentPoolCategory" && slug.current in $slugs] | order(title asc) {
    _id,
    title,
    slug,
    description,
    "heroImage": heroImage.asset->url
  }`

  return await sanityClient.fetch(query, { slugs: ["u14", "u15", "u16"] })
}

export async function getCalendarEntries(): Promise<CalendarEntry[]> {
  return await sanityClient
    .withConfig({ useCdn: false })
    .fetch<
      CalendarEntry[]
    >(calendarEntriesQuery, {}, { perspective: "published", cache: "no-store" })
}

export async function getTalentPoolEvents(): Promise<TalentPoolEvent[]> {
  const query = `*[
    _type == "event" &&
    count(categories[@->slug.current in $slugs]) > 0
  ] | order(startDate asc) {
    _id,
    title,
    slug,
    description,
    "eventDate": coalesce(startDate, eventDate),
    endDate,
    venue,
    "status": coalesce(status, "confirmed"),
    "categories": coalesce(categories[@->slug.current in $slugs]->{title, "slug": slug.current}, [])
  }`

  return await sanityClient
    .withConfig({ useCdn: false })
    .fetch(
      query,
      { slugs: ["u14", "u15", "u16"] },
      { perspective: "published", cache: "no-store" },
    )
}

export async function getTalentPoolPosts(): Promise<TalentPoolPost[]> {
  const query = `*[
    _type == "post" &&
    count(categories[@->slug.current in $slugs]) > 0
  ] | order(publishedAt desc)[0...9] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    "categories": coalesce(categories[@->slug.current in $slugs]->{title, "slug": slug.current}, [])
  }`

  return await sanityClient
    .withConfig({ useCdn: false })
    .fetch(
      query,
      { slugs: ["u14", "u15", "u16"] },
      { perspective: "published", cache: "no-store" },
    )
}

export async function getTalentPoolDocuments(): Promise<TalentPoolDocument[]> {
  const query = `*[
    _type == "talentPoolDocument" &&
    (count(categories) == 0 || count(categories[@->slug.current in $slugs]) > 0)
  ] | order(publishedAt desc) {
    _id,
    title,
    description,
    documentType,
    season,
    publishedAt,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename,
    "categories": coalesce(categories[@->slug.current in $slugs]->{title, "slug": slug.current}, [])
  }`

  return await sanityClient
    .withConfig({ useCdn: false })
    .fetch(
      query,
      { slugs: ["u14", "u15", "u16"] },
      { perspective: "published", cache: "no-store" },
    )
}

export async function getNationalTeamGames(): Promise<NationalTeamGame[]> {
  const query = `*[
    _type == "exhibitionGame" &&
    count(categories[@->slug.current in $slugs]) > 0
  ] | order(date asc) {
    _id,
    title,
    "matchDate": date,
    "homeTeam": "Belgium",
    "awayTeam": opponent,
    "venue": location,
    status,
    result,
    "ticketUrl": ticketLink,
    "categories": categories[@->slug.current in $slugs]->{
      title,
      "slug": slug.current
    }
  }`

  return await sanityClient
    .withConfig({ useCdn: false })
    .fetch(
      query,
      { slugs: nationalTeamCategorySlugs() },
      { perspective: "published", cache: "no-store" },
    )
}

export async function getNationalTeamPosts(
  team?: NationalTeamAgeGroup,
): Promise<NationalTeamPost[]> {
  const query = `*[
    _type == "post" &&
    (
      ($team == null && count(categories[@->title == "National Teams"]) > 0) ||
      count(categories[@->slug.current in $slugs]) > 0
    )
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }`

  return await sanityClient
    .withConfig({ useCdn: false })
    .fetch(
      query,
      { team: team ?? null, slugs: nationalTeamCategorySlugs(team) },
      { perspective: "published", cache: "no-store" },
    )
}

export async function getNationalTeamEvents(
  team: NationalTeamAgeGroup,
): Promise<Omit<TalentPoolEvent, "categories">[]> {
  const query = `*[
    _type == "event" &&
    count(categories[@->slug.current in $slugs]) > 0
  ] | order(startDate asc) {
    _id,
    title,
    slug,
    description,
    "eventDate": coalesce(startDate, eventDate),
    endDate,
    "status": coalesce(status, "confirmed"),
    venue
  }`

  return await sanityClient
    .withConfig({ useCdn: false })
    .fetch(
      query,
      { slugs: nationalTeamCategorySlugs(team) },
      { perspective: "published", cache: "no-store" },
    )
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
  }`

  return await sanityClient.fetch(query)
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
  }`

  return await sanityClient.fetch(query, { slug })
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
  }`

  return await sanityClient.fetch(query, { categoryId })
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
  }`

  return await sanityClient.fetch(query, { categoryId })
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
  }`

  return await sanityClient.fetch(query)
}

// GROQ query to get pathway stage images (from talent pool category hero images, keyed by age-group slug)
export async function getPathwayStageImages() {
  const query = `*[_type == "talentPoolCategory" && slug.current in ["u8", "u10", "u12", "u14", "u16", "u18"]] {
    "slug": slug.current,
    "image": heroImage.asset->url
  }`

  const rows =
    await sanityClient.fetch<Array<{ slug: string; image: string | null }>>(
      query,
    )
  const map: Record<string, string> = {}
  for (const row of rows) {
    if (row.image) map[row.slug] = row.image
  }
  return map
}
