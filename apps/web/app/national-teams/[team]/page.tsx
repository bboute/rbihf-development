import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PathwayDetailPage } from "@/components/PathwayDetailPage";
import { isNationalTeam } from "@/lib/nationalTeams";
import { filterCalendarEntries } from "@/lib/calendar";
import {
  getEventLabels,
  getCalendarEntries,
  getNationalTeamPosts,
  getPathwayPageContent,
} from "@/lib/sanityClient";

interface TeamPageProps {
  params: Promise<{ team: string }>;
}

export async function generateMetadata({
  params,
}: TeamPageProps): Promise<Metadata> {
  const { team } = await params;
  if (!isNationalTeam(team)) notFound();
  const { copy } = await getPathwayPageContent(`national-teams-${team}-page`);
  return {
    title: copy.heroTitle || undefined,
    description: copy.heroDescription || undefined,
  };
}

export default async function NationalTeamPage({ params }: TeamPageProps) {
  const { team } = await params;
  if (!isNationalTeam(team)) notFound();
  const [calendarEntries, posts, content, labels] = await Promise.all([
    getCalendarEntries(),
    getNationalTeamPosts(team),
    getPathwayPageContent(`national-teams-${team}-page`),
    getEventLabels(),
  ]);
  return (
    <PathwayDetailPage
      kind="national-teams"
      slug={team}
      team={team}
      content={content}
      events={filterCalendarEntries(calendarEntries, team)}
      posts={posts}
      labels={labels}
    />
  );
}
