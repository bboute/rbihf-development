export interface AcademyPathway {
  slug: string
  title: string
  stage: string
  audience: string
  format: string
  summary: string
  goals: string[]
  preparation: string[]
  nextStep: string
}

export interface AcademyTopic {
  slug: string
  title: string
  kind: "clinic" | "guide" | "library"
  summary: string
  audience: string
  examples: string[]
}

export const academyPathways: AcademyPathway[] = [
  {
    slug: "learn-to-play",
    title: "Learn to Play",
    stage: "U8 to U12",
    audience: "Foundation stage for trainers and coaches working with younger players.",
    format: "In-person weekend course with teacher-led instruction and companion manual.",
    summary:
      "Create a fun, safe and positive first experience with ice hockey. Focus on skating, puck skills, confidence, creativity and love for the game through playful, active and age-appropriate activities.",
    goals: [
      "Understand station-based practices that maximize repetitions and puck touches.",
      "Learn age-appropriate coaching for U8, U10 and U12 players.",
      "Master small-area games as development tools, not just fun activities.",
      "Give first-time coaches a shared RBIHF foundation for youth delivery.",
    ],
    preparation: [
      "Review the course weekend format and expectations.",
      "Use Academy topic pages as follow-up learning before and after the course.",
      "Bring questions from real sessions with younger players.",
    ],
    nextStep: "Play to Compete",
  },
  {
    slug: "play-to-compete",
    title: "Play to Compete",
    stage: "U14 to U16",
    audience: "Coaches working with developing players as practices become more structured and demanding.",
    format: "In-person course path supported by digital guidance, topic pages, and follow-up resources.",
    summary:
      "Bridge between foundation and performance. Players learn to apply skills under pressure, compete consistently, and understand basic team principles while development remains the priority.",
    goals: [
      "Develop session planning for game-like, demanding practices.",
      "Teach skills under pressure, at speed, and with tactical purpose.",
      "Prepare players for the standards required at U18, Talent Pool and National Team level.",
    ],
    preparation: [
      "Review practice design and age-specific coaching topics in Academy.",
      "Bring session plans or examples from your current team environment.",
      "Use topic pages to deepen knowledge between course weekends.",
    ],
    nextStep: "Compete to Win",
  },
  {
    slug: "compete-to-win",
    title: "Compete to Win",
    stage: "U18+",
    audience: "Advanced coaches working with older players and more demanding tactical or performance contexts.",
    format: "Higher-level coach education with in-person teaching and extended specialist support material.",
    summary:
      "Prepare players for senior hockey, national team standards and international competition. Players must apply skills within a team identity, accept roles, prepare properly and compete to win.",
    goals: [
      "Improve advanced practice structure and coaching communication.",
      "Support tactical teaching and team systems within a performance environment.",
      "Prepare coaches for national team and international competition standards.",
    ],
    preparation: [
      "Review specialist topics such as systems teaching and advanced practice design.",
      "Bring examples from real game and practice situations.",
      "Use Academy library material to extend formal learning.",
    ],
    nextStep: "Specialist clinics and future advanced tracks",
  },
]

export const academyTopics: AcademyTopic[] = [
  {
    slug: "running-practice-with-kids",
    title: "Running Practice with Kids",
    kind: "guide",
    audience: "Best for first-time and early-stage coaches.",
    summary:
      "Practical guidance on session rhythm, attention spans, activity flow, and what good youth practices should feel like.",
    examples: ["session rhythm", "attention spans", "station flow"],
  },
  {
    slug: "practice-design",
    title: "Practice Design",
    kind: "guide",
    audience: "For coaches who want stronger session structure and progression.",
    summary:
      "How to build practices with clear objectives, progression, repetition, and game relevance.",
    examples: ["station planning", "session templates", "small-area games"],
  },
  {
    slug: "teaching-skills",
    title: "Teaching Skills",
    kind: "guide",
    audience: "For coaches improving how they teach skating, puck skills, and habits.",
    summary:
      "A library of teaching principles and examples focused on skill instruction and player understanding.",
    examples: ["skating cues", "skill progression", "feedback habits"],
  },
  {
    slug: "systems-teaching",
    title: "Systems Teaching",
    kind: "clinic",
    audience: "For coaches moving into more structured tactical teaching.",
    summary:
      "Specialist learning on how to introduce team concepts without losing player understanding or game realism.",
    examples: ["team concepts", "teaching progressions", "decision-making"],
  },
  {
    slug: "body-checking",
    title: "Body Checking Clinic",
    kind: "clinic",
    audience: "For coaches preparing players for contact environments and safe teaching progression.",
    summary:
      "Specialist clinic content around safe teaching, progression, and the demands of contact or body checking education.",
    examples: ["safe progression", "contact habits", "coach language"],
  },
  {
    slug: "age-specific-coaching",
    title: "Age-Specific Coaching",
    kind: "library",
    audience: "For coaches who want guidance tied to player stage and maturity.",
    summary:
      "Learning material connected to how coaching should change by age band, stage, and player readiness.",
    examples: ["U8-U12", "U14-U16", "U18+"],
  },
  {
    slug: "communication-leadership",
    title: "Communication & Leadership",
    kind: "guide",
    audience: "For coaches growing their influence with players, staff, and families.",
    summary:
      "Guidance on language, parent communication, team culture, and leading a positive learning environment.",
    examples: ["parent meetings", "feedback", "team standards"],
  },
]

export const academyLibraryHighlights = [
  {
    title: "Explanatory Video Library",
    body: "Short visual explanations that extend course weekends and help coaches revisit practical teaching points.",
  },
  {
    title: "Clinics & Workshops",
    body: "Specialist topics such as body checking and systems teaching that go beyond the core qualification ladder.",
  },
  {
    title: "Course Companion Resources",
    body: "Preparation notes, follow-up documents, and practical material that support in-person learning rather than replace it.",
  },
] as const

export const academySupportItems = [
  {
    title: "Upcoming Courses",
    body: "Show upcoming weekend courses, target audience, and how registration or contact works.",
  },
  {
    title: "Preparation & What to Bring",
    body: "Give coaches a simple view of what to expect before they arrive for a course weekend.",
  },
  {
    title: "Downloads & Manuals",
    body: "Support current delivery with manuals, templates, and follow-up material when appropriate.",
  },
] as const

export function getAcademyPathway(slug: string): AcademyPathway | null {
  return academyPathways.find((pathway) => pathway.slug === slug) ?? null
}

export function getAcademyTopic(slug: string): AcademyTopic | null {
  return academyTopics.find((topic) => topic.slug === slug) ?? null
}
