export interface ClubDevelopmentStage {
  slug: string
  label: string
  ageRange: string
  practiceSetup: string[]
  staffingMinimum: string[]
  clubStandards: string[]
  parentExpectations: string[]
}

export const clubDevelopmentStages: Record<string, ClubDevelopmentStage> = {
  u8: {
    slug: "u8",
    label: "U8 Learn to Play",
    ageRange: "6-8 years",
    practiceSetup: [
      "Station-based practices with maximum 5-6 players per station.",
      "45-60 minute sessions with short explanations and maximum participation.",
      "35-40% fun skating and movement, 20-25% puck control, 15-20% skill games, 20-25% small-area games.",
      "4-6 stations including balance, starting/stopping, turning, puck control, passing, and small-area games.",
    ],
    staffingMinimum: [
      "1 main coach responsible for practice plan and station rotation.",
      "1 experienced coach moving between stations to support station coaches.",
      "Station coaches or helpers who manage exercises.",
      "Timekeeper to manage clock and rotation signals.",
    ],
    clubStandards: [
      "Sessions prioritize enjoyment, confidence, and safety over outcomes.",
      "Minimum 15 tournaments per season with 4 cross-ice mini-games per event.",
      "All players rotate through positions including goaltender.",
      "Equal playing time for all players regardless of ability.",
    ],
    parentExpectations: [
      "Expect smiles, movement, and fun through repetition and games.",
      "Progress visible in balance, comfort on ice, and confidence.",
      "Players should be active, not standing in long lines.",
      "Development before results - focus on skills, not scores.",
    ],
  },
  u10: {
    slug: "u10",
    label: "U10 Learn to Play",
    ageRange: "8-10 years",
    practiceSetup: [
      "60 minute sessions with station-based skill work and small-area games.",
      "Continued skating development with fundamental puck skills.",
      "Passing, receiving, shooting introduced through playful activities.",
      "Small-area games as development tools, not just end-of-practice fun.",
    ],
    staffingMinimum: [
      "1 main coach to manage progression and session flow.",
      "2-3 support coaches or helpers for stations and engagement.",
      "Coaches use short instructions, clear demonstrations, and simple coaching points.",
    ],
    clubStandards: [
      "Minimum 20 tournaments per season with 4 cross-ice mini-games per event.",
      "Practices blend structure and play without becoming static.",
      "Players allowed to make mistakes, solve problems, and learn through repetition.",
      "Goalie rotation system so every interested player can experience goaltending.",
    ],
    parentExpectations: [
      "Expect better skating mechanics, puck confidence, and growing awareness.",
      "Skill development matters more than standings or early specialization.",
      "Many puck touches and decisions in every session.",
      "Focus on love for the game and continued participation.",
    ],
  },
  u12: {
    slug: "u12",
    label: "U12 Learn to Play",
    ageRange: "10-12 years",
    practiceSetup: [
      "60-75 minute sessions with clear blocks for skating, skills, and decision-making.",
      "Applying skills at speed and under pressure.",
      "Individual tactics, passing in motion, puck support, and basic team principles.",
      "Cross-ice games until December, then progression to full-ice competition.",
    ],
    staffingMinimum: [
      "1 lead coach responsible for progression and standards.",
      "2 support coaches for station delivery and small-area games.",
      "Position-specific support where possible.",
    ],
    clubStandards: [
      "Minimum 30 games per season: cross-ice until December, then full-ice.",
      "Visible progression plan from fundamentals into talent-pool readiness.",
      "Challenge players while protecting good technique and decision-making.",
      "Players may show positional preferences but continued rotation encouraged.",
    ],
    parentExpectations: [
      "Expect more structure, competitive moments, and accountability around habits.",
      "Progress visible in technique, decisions, and consistency under light pressure.",
      "Quality club protects long-term growth over short-term winning.",
      "Understanding of what development should look like beyond results.",
    ],
  },
  u14: {
    slug: "u14",
    label: "U14 Play to Compete",
    ageRange: "12-14 years",
    practiceSetup: [
      "Bridge between foundation and performance - applying skills under pressure.",
      "More game-like and demanding practices with individual tactics.",
      "1v1, 2v1, 2v2, 3v2 situations with specific tactical objectives.",
      "Flow drills, transition drills, and basic team concepts.",
    ],
    staffingMinimum: [
      "1 main coach responsible for full practice and development goals.",
      "Assistant coaches for specific drills or player groups.",
      "Detailed feedback on technical details, decision-making, and tactical understanding.",
    ],
    clubStandards: [
      "Players learn to compete, make decisions, support teammates, defend with purpose.",
      "Development remains priority but environment becomes more demanding.",
      "Prepare players for standards required at U18, Talent Pool and National Team level.",
    ],
    parentExpectations: [
      "Expect higher intensity, more accountability, and acceptance of feedback.",
      "Players challenged to train with intensity and take responsibility for development.",
      "Understanding that this phase prepares for future competitive environments.",
    ],
  },
  u16: {
    slug: "u16",
    label: "U16 Play to Compete",
    ageRange: "14-16 years",
    practiceSetup: [
      "Advanced competitive preparation with team structure and systems.",
      "Special teams (power play, penalty kill) and face-off responsibilities.",
      "Physical development: strength, speed, power, mobility, injury prevention.",
      "Game preparation and video learning where available.",
    ],
    staffingMinimum: [
      "Head coach with clear team identity and performance objectives.",
      "Assistant coaches for units or tactical areas.",
      "Goalie coach where possible.",
      "Support for physical preparation and recovery.",
    ],
    clubStandards: [
      "Players train with maturity and understand competitive standards.",
      "Accountability, leadership, preparation, resilience, and team-first behaviour.",
      "Off-ice training discipline and physical base for U18 and senior hockey.",
    ],
    parentExpectations: [
      "Expect preparation for senior hockey and national team pathways.",
      "Understanding of team roles and acceptance of different responsibilities.",
      "Support for holistic development including physical and mental preparation.",
    ],
  },
  u18: {
    slug: "u18",
    label: "U18 Compete to Win",
    ageRange: "16-18 years",
    practiceSetup: [
      "Performance-driven phase preparing for senior hockey and national team standards.",
      "Team identity, structured game model, and role execution.",
      "Quality and purpose in every drill - connects to individual improvement or team performance.",
      "Practice tempo with pace, urgency, and attention to detail.",
    ],
    staffingMinimum: [
      "Head coach responsible for practice plan, team identity, and performance.",
      "Assistant coaches for specific units and tactical areas.",
      "Goalie coach and support for video, physical preparation, and recovery.",
      "Clear communication between club, Talent Pool, and national team staff.",
    ],
    clubStandards: [
      "Players technically capable, tactically responsible, physically prepared, mentally disciplined.",
      "Ready for higher-level hockey, international competition, and senior environments.",
      "Professional habits: preparation, accountability, role acceptance, leadership.",
    ],
    parentExpectations: [
      "Expect behaviour like a performance athlete with team responsibility.",
      "Understanding that individual development supports team performance.",
      "Support for mature decisions based on game situations and team needs.",
    ],
  },
}

export const clubDevelopmentOrder = ["u8", "u10", "u12", "u14", "u16", "u18"] as const

export function getClubDevelopmentStage(category: string): ClubDevelopmentStage | null {
  return clubDevelopmentStages[category] ?? null
}
