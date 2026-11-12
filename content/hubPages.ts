export const talentPoolPageCopy = {
  heroEyebrow: "U14 · U15 · U16",
  heroTitle: "Talent Pool",
  heroDescription:
    "The practical home for federation dates, official updates and documents as players prepare for future national-team environments.",
  heroImageAlt: "Belgian youth ice hockey players on the rink",
  heroPlannerLink: "Plan the season",
  heroNewsLink: "Read updates",
  heroDocumentsLink: "Find documents",
  plannerEyebrow: "Season planning",
  plannerTitle: "Know what comes next.",
  plannerDescription:
    "Provisional dates help families plan and may still change.",
  plannerFilterLabel: "Filter planner",
  plannerAllGroups: "All groups",
  plannerLastEvent: "Last event",
  plannerEmptyTitle: "No upcoming dates published yet",
  plannerEmptyDescription:
    "Confirmed and provisional dates will appear here as planning is released.",
  plannerCount: "Showing {shown} of {total} upcoming events",
  plannerShowMore: "Show more events",
  plannerHideMore: "Show fewer events",
  plannerShowPrevious: "Show earlier events",
  plannerHidePrevious: "Hide earlier events",
  calendarEyebrow: "The year at a glance",
  calendarTitle: "Year planner",
  calendarDescription:
    "Highlighted days mark published events. Completed events are shown in grey.",
  calendarThisYear: "This year",
  calendarPreviousYear: "Previous year",
  calendarNextYear: "Next year",
  calendarToday: "Today",
  calendarThisMonth: "This month",
  calendarCount: "{count} events in {year}",
  calendarSingleCount: "{count} event in {year}",
  calendarEmptyYear: "No dates published for this year and age group yet.",
  calendarEmptyMonth: "No published events",
  newsEyebrow: "Official updates",
  newsTitle: "Talent Pool news",
  newsLink: "All news",
  newsEmptyTitle: "No updates for this group yet",
  documentsEyebrow: "Practical library",
  documentsTitle: "Documents, ready when needed.",
  documentsDescription:
    "Blank school, medical, consent and travel documents are available here. Completed forms are never stored on this public page.",
  documentsDownload: "Download",
  documentsEmptyTitle: "No public documents available yet",
  documentsEmptyDescription:
    "Current forms and guidance will appear here when published.",
  documentsSchoolLabel: "School",
  documentsMedicalLabel: "Medical",
  documentsConsentLabel: "Consent",
  documentsTravelLabel: "Travel",
  documentsProgramLabel: "Program",
  documentsOtherLabel: "Other",
  programEyebrow: "How we work",
  programTitle: "Federation preparation, built around club development.",
  programDescription:
    "Clubs carry the weekly development load. Talent Pool identifies promising players, creates shared references and adds federation camps and international experience from U14 through U16.",
  programPartnershipEyebrow: "Shared development",
  programPartnershipTitle: "Clubs and federation, working together.",
  programClubTitle: "Clubs carry the heaviest load",
  programClubDescription:
    "Weekly repetition, coaching, match minutes, and daily habits stay rooted in the club environment. Talent Pool adds reference points and experiences, but it does not replace club development.",
  programFederationTitle: "Talent Pool adds federation preparation",
  programFederationDescription:
    "RBIHF uses Talent Pool to introduce common concepts, observe progression over time, and connect players with the demands of future national-team environments.",
  programU14Title: "U14 · Connect",
  programU14Description:
    "First federation contact, belonging, team building and shared language.",
  programU15Title: "U15 · Experience",
  programU15Description:
    "International tournament rhythm and stronger shared references across the season.",
  programU16Title: "U16 · Prepare",
  programU16Description:
    "A development checkpoint connecting club progress to future U18 national-team potential.",
  programStageLink: "Stage details",
};

export const nationalTeamsPageCopy = {
  heroEyebrow: "Belgian Ice Hockey Federation",
  heroTitle: "National Teams",
  heroDescription:
    "U18 men, U18 women, and U20 men represent Belgium in international competition.",
  heroImageAlt: "",
  heroHowWeWorkLink: "How we work",
  heroCalendarLink: "Team calendar",
  heroNewsLink: "Official news",
  howWeWorkEyebrow: "How we work",
  howWeWorkTitle: "Prepared together. Ready to represent Belgium.",
  howWeWorkDescription:
    "National-team coaches set clear expectations, prepare players through focused camps, and bring teams together for international competition.",
  howWeWorkPreparationTitle: "Prepare with purpose",
  howWeWorkPreparationDescription:
    "Focused camps help players understand team expectations and prepare for the demands of international competition.",
  howWeWorkTeamTitle: "Build as a team",
  howWeWorkTeamDescription:
    "Coaches bring players together around shared standards, communication and collective responsibility.",
  howWeWorkCompetitionTitle: "Represent Belgium",
  howWeWorkCompetitionDescription:
    "U18 men's, U18 women's, and U20 men's teams test their preparation against international opponents and represent Belgium on the ice.",
  howWeWorkU18MenTitle: "U18 Men",
  howWeWorkU18MenDescription:
    "The under-18 men's national-team environment, connecting player development with international competition.",
  howWeWorkU18WomenTitle: "U18 Women",
  howWeWorkU18WomenDescription:
    "The under-18 women's national-team environment, building a shared identity and preparing to represent Belgium.",
  howWeWorkU20MenTitle: "U20 Men",
  howWeWorkU20MenDescription:
    "The under-20 men's national-team environment, with greater responsibility and preparation for senior hockey.",
  calendarEyebrow: "Team calendar",
  calendarTitle: "The season, by team.",
  calendarDescription:
    "Choose U18 men, U18 women, or U20 men to see each team's published fixtures and results.",
  calendarFilterLabel: "Select team",
  calendarEmptyTitle: "No {team} dates published yet",
  calendarEmptyDescription:
    "Fixtures and results will appear here when they are announced.",
  newsEyebrow: "Official updates",
  newsTitle: "National Team news.",
  newsDescription:
    "Selection announcements, team news and official updates categorized for National Teams.",
  newsLink: "All news",
  newsEmptyTitle: "No National Team news published yet",
  newsEmptyDescription:
    "Official updates will appear here when they are published.",
};

export type TalentPoolPageCopy = typeof talentPoolPageCopy;
export type NationalTeamsPageCopy = typeof nationalTeamsPageCopy;

export function formatPageCopy(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match: string, key: string) =>
    values[key] === undefined ? match : String(values[key]),
  );
}
