export const pathwayPages = [
  {
    id: "talent-pool-u14-page",
    slug: "u14",
    label: "U14",
    kind: "talent-pool",
  },
  {
    id: "talent-pool-u15-page",
    slug: "u15",
    label: "U15",
    kind: "talent-pool",
  },
  {
    id: "talent-pool-u16-page",
    slug: "u16",
    label: "U16",
    kind: "talent-pool",
  },
  {
    id: "national-teams-u18m-page",
    slug: "u18m",
    label: "U18 Men",
    kind: "national-teams",
  },
  {
    id: "national-teams-u18w-page",
    slug: "u18w",
    label: "U18 Women",
    kind: "national-teams",
  },
  {
    id: "national-teams-u20-page",
    slug: "u20",
    label: "U20 Men",
    kind: "national-teams",
  },
] as const

export const pathwayPageCopy = {
  heroTitle: "",
  heroEyebrow: "",
  heroDescription: "",
  heroImageAlt: "",
  heroBackLink: "",
  heroEventsLink: "",
  purposeEyebrow: "",
  purposeTitle: "",
  purposeDescription: "",
  purposeExperience: "",
  expectationsTitle: "",
  staffingEyebrow: "",
  staffingTitle: "",
  staffingDescription: "",
  eventsEyebrow: "",
  eventsTitle: "",
  eventsDescription: "",
  fixturesEyebrow: "",
  fixturesTitle: "",
  fixturesDescription: "",
  newsEyebrow: "",
  newsTitle: "",
  newsDescription: "",
  newsLink: "",
}

export type PathwayPageCopy = typeof pathwayPageCopy
