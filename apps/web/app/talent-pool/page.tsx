import { CalendarDays, FileText, Newspaper } from "lucide-react";
import { HubHero } from "@/components/HubHero";
import { TalentPoolHub } from "@/components/talentpools/TalentPoolHub";
import { ContentSections } from "@/components/sections/ContentSections";
import {
  getTalentPoolDocuments,
  getCalendarEntries,
  getTalentPoolPosts,
  getTalentPoolPageContent,
  getEventLabels,
} from "@/lib/sanityClient";
import { scopeCalendarEntries } from "@/lib/calendar";

export default async function TalentPoolPage() {
  const [
    calendarEntries,
    posts,
    documents,
    { copy, heroImageUrl, heroImagePosition, contentSections },
    labels,
  ] = await Promise.all([
    getCalendarEntries(),
    getTalentPoolPosts(),
    getTalentPoolDocuments(),
    getTalentPoolPageContent(),
    getEventLabels(),
  ]);
  const events = scopeCalendarEntries(calendarEntries, "talent-pool");
  return (
    <main className="min-h-screen bg-background">
      <HubHero
        title={copy.heroTitle}
        fallbackTitle="Talent Pool"
        eyebrow={copy.heroEyebrow}
        description={copy.heroDescription}
        imageUrl={heroImageUrl}
        imagePosition={heroImagePosition}
        imageAlt={copy.heroImageAlt}
        links={[
          {
            href: "#planner",
            label: events.length > 0 ? copy.heroPlannerLink : "",
            icon: CalendarDays,
          },
          {
            href: "#updates",
            label: posts.length > 0 ? copy.heroNewsLink : "",
            icon: Newspaper,
          },
          {
            href: "#documents",
            label: documents.length > 0 ? copy.heroDocumentsLink : "",
            icon: FileText,
          },
        ]}
      />
      <TalentPoolHub
        events={events}
        posts={posts}
        documents={documents}
        copy={copy}
        labels={labels}
      >
        <ContentSections sections={contentSections} />
      </TalentPoolHub>
    </main>
  );
}
