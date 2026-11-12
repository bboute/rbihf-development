export type NationalTeamAgeGroup = "u18m" | "u18w" | "u20"
export type NationalTeamCategorySlug = NationalTeamAgeGroup | "u18"

export const nationalTeams = [
  { value: "u18m", label: "U18 Men" },
  { value: "u18w", label: "U18 Women" },
  { value: "u20", label: "U20 Men" },
] as const

export function isNationalTeam(value: string): value is NationalTeamAgeGroup {
  return nationalTeams.some((team) => team.value === value)
}

export function nationalTeamCategorySlugs(
  team?: NationalTeamAgeGroup,
): NationalTeamCategorySlug[] {
  if (!team) return ["u18", "u18m", "u18w", "u20"]
  return team === "u20" ? ["u20"] : [team, "u18"]
}

export interface NationalTeamGame {
  _id: string
  title: string
  matchDate: string
  homeTeam: string
  awayTeam: string
  venue: string
  status: "upcoming" | "completed"
  result?: string
  ticketUrl?: string
  categories: Array<{
    title: string
    slug: NationalTeamCategorySlug
  }>
}

export interface NationalTeamPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  imageUrl?: string
}
