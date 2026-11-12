export interface TalentPoolStageContent {
  slug: string
  label: string
  summary: string
  stagePurpose: string
  playerExperience: string
  concepts: string
  futureConnection: string
  exposure: string
  staffing: {
    intro: string
    roles: { title: string; description: string }[]
  }
}

export const talentPoolAgeGroups = ["u14", "u15", "u16"] as const

export type TalentPoolAgeGroup = (typeof talentPoolAgeGroups)[number]

export function isTalentPoolAgeGroup(slug: string): boolean {
  return talentPoolAgeGroups.includes(slug.toLowerCase() as TalentPoolAgeGroup)
}

export interface TalentPoolCategoryReference {
  title: string
  slug: TalentPoolAgeGroup
}

export interface TalentPoolEvent {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  eventDate: string
  endDate?: string
  venue: string
  status: "confirmed" | "provisional"
  categories: TalentPoolCategoryReference[]
}

export interface TalentPoolPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  imageUrl?: string
  categories: TalentPoolCategoryReference[]
}

export interface TalentPoolDocument {
  _id: string
  title: string
  description: string
  documentType: "school" | "medical" | "consent" | "travel" | "program" | "other"
  fileUrl: string
  fileName?: string
  season?: string
  publishedAt: string
  categories: TalentPoolCategoryReference[]
}

export const talentPoolPathway = [
  {
    slug: "clubs",
    label: "Clubs",
    summary: "Daily development, repetition, coaching, and match minutes.",
  },
  {
    slug: "talent-pool",
    label: "Talent Pool",
    summary:
      "Federation scouting, shared concepts, international exposure, and long-term preparation.",
  },
  {
    slug: "national-teams",
    label: "National Teams",
    summary:
      "Selection, execution, and representation in the federation playing model.",
  },
] as const

export const talentPoolStageContent: Record<string, TalentPoolStageContent> = {
  u14: {
    slug: "u14",
    label: "U14",
    summary:
      "First federation contact focused on belonging, team building, and shared concepts.",
    stagePurpose:
      "U14 introduces selected players to the federation environment. The annual event prioritizes team building so players start recognizing each other, understanding expectations, and building friendships that support future returns to the pathway.",
    playerExperience:
      "Players meet peers from across Belgium, experience the Talent Pool environment, and begin learning how the federation works alongside their club season.",
    concepts:
      "The federation starts explaining the playing concepts and common language that will be built on in later age groups.",
    futureConnection:
      "The goal is not early national-team performance. It is creating familiarity, trust, and a foundation that makes future U15 and U16 integration smoother.",
    exposure:
      "The flagship moment is the annual U14 event, where social cohesion is treated as part of long-term preparation.",
    staffing: {
      intro:
        "The U14 stage is staffed to prioritize a safe, welcoming first federation experience with strong supervision and guidance.",
      roles: [
        {
          title: "Lead Coach",
          description:
            "Guides on-ice sessions and introduces the federation's shared concepts in an accessible way.",
        },
        {
          title: "Support Coaches",
          description:
            "Work in smaller groups so every player gets individual attention during camps and events.",
        },
        {
          title: "Team Manager",
          description:
            "Coordinates logistics, communication with families, and the daily schedule around the event.",
        },
        {
          title: "Equipment & Safety Staff",
          description:
            "Ensure equipment fits, safety standards are met, and players are cared for throughout.",
        },
      ],
    },
  },
  u15: {
    slug: "u15",
    label: "U15",
    summary:
      "International exposure stage with four tournaments and stronger shared references.",
    stagePurpose:
      "U15 turns the pathway outward. Players continue building on federation concepts while gaining an international reference point through repeated competition against other countries across the year.",
    playerExperience:
      "Players move from introduction into rhythm: more travel, more tournament moments, and more opportunities to compare themselves and their group against international peers.",
    concepts:
      "The same shared language from U14 is reinforced in more demanding situations so players start recognizing how federation concepts translate into game reality.",
    futureConnection:
      "This stage helps identify who adapts well to international tempo and who keeps progressing toward later national-team consideration.",
    exposure:
      "The pathway is anchored by four international tournaments spread across the season.",
    staffing: {
      intro:
        "With more travel and international competition, the U15 staff focuses on preparation, structure, and player support on the road.",
      roles: [
        {
          title: "Head Coach",
          description:
            "Leads the program across the four tournaments and reinforces the federation playing model.",
        },
        {
          title: "Assistant Coaches",
          description:
            "Support game preparation, video review, and individual player feedback during international events.",
        },
        {
          title: "Team Manager",
          description:
            "Manages travel, accommodation, and communication with families across the season.",
        },
        {
          title: "Equipment Manager",
          description:
            "Handles equipment transport and maintenance throughout the tournament calendar.",
        },
      ],
    },
  },
  u16: {
    slug: "u16",
    label: "U16",
    summary:
      "Development checkpoint where systems understanding and future U18 projection become clearer.",
    stagePurpose:
      "U16 is where preparation becomes more selective. The federation looks closely at who has continued developing well and who is projecting toward the future U18 national-team environment.",
    playerExperience:
      "Players are asked to connect their club development with clearer tactical expectations, stronger habits, and greater responsibility inside the federation model.",
    concepts:
      "Practices are more explicitly based on the systems and concepts the federation wants to see carried into future national teams.",
    futureConnection:
      "U16 is the clearest early checkpoint for players with potential to progress toward U18 national-team level.",
    exposure:
      "International and camp moments are used less for introduction and more for evaluating progression inside the shared playing model.",
    staffing: {
      intro:
        "The U16 stage uses a more focused staff profile that mirrors the expectations of future national-team environments.",
      roles: [
        {
          title: "Head Coach",
          description:
            "Leads evaluation and preparation with a direct line to the U18 national-team staff.",
        },
        {
          title: "Skills & Systems Coaches",
          description:
            "Deepen tactical understanding and prepare players for the demands of the national-team playing model.",
        },
        {
          title: "Team Manager",
          description:
            "Coordinates camps, travel, and the evaluation communication process.",
        },
        {
          title: "Athletic Support Staff",
          description:
            "Support off-ice development, recovery, and physical preparation appropriate to the age group.",
        },
      ],
    },
  },
}

export const talentPoolContentGovernance = {
  codeDefinedFields: [
    "stage summaries",
    "stage purpose",
    "player experience",
    "concept progression",
    "future connection",
    "exposure notes",
  ],
  futureSanityCandidates: [
    "stage-purpose copy",
    "pathway explainer sections",
    "federation-versus-club messaging",
    "public stage expectations",
  ],
  publicVsProtectedBoundary: {
    publicContent:
      "Why the stage exists, what players and families should expect, and how the stage connects to clubs and future national teams.",
    protectedOrLaterContent:
      "Detailed systems teaching, coaching implementation, and internal tactical language used by staff.",
  },
} as const

export function getTalentPoolStageContent(slug: string) {
  return talentPoolStageContent[slug.toLowerCase()]
}