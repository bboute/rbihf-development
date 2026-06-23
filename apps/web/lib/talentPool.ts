export interface TalentPoolStageContent {
  slug: string
  label: string
  summary: string
  stagePurpose: string
  playerExperience: string
  concepts: string
  futureConnection: string
  exposure: string
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
  },
  u18: {
    slug: "u18",
    label: "U18",
    summary:
      "Performance stage where preparation starts resembling full national-team demands.",
    stagePurpose:
      "U18 builds on the earlier pipeline and shifts the emphasis toward executing the federation model at a higher level rather than learning it for the first time.",
    playerExperience:
      "Players are expected to arrive with shared references already in place, allowing camps and tournaments to focus more on performance and role clarity.",
    concepts:
      "Federation concepts are refined through sharper tactical expectations and competitive execution.",
    futureConnection:
      "This stage connects directly to youth national-team performance and later senior progression.",
    exposure:
      "Events and camps become more explicitly tied to selection and performance outcomes.",
  },
  u20: {
    slug: "u20",
    label: "U20",
    summary:
      "Final youth bridge before senior transition and full representative demands.",
    stagePurpose:
      "U20 is the final youth step in the federation pathway, focusing on readiness for senior expectations while keeping the national-team connection explicit.",
    playerExperience:
      "Players operate in an environment shaped by performance, maturity, and responsibility rather than introductory pathway education.",
    concepts:
      "The federation model is no longer presented as a new framework but as the expected base for execution.",
    futureConnection:
      "The emphasis is on converting youth potential into readiness for senior international pathways.",
    exposure:
      "Competitive moments serve as final youth benchmarks before senior transition.",
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