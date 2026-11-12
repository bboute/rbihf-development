import Image from "next/image";
import Link from "next/link";
import { CategoryHero } from "@/components/talentpools/CategoryHero";
import { SeasonPlanningSection } from "@/components/sections/SeasonPlanningSection";
import { ContentSections } from "@/components/sections/ContentSections";
import { NationalTeamsHub } from "@/components/national-teams/NationalTeamsHub";
import type { getPathwayPageContent } from "@/lib/sanityClient";
import type { EventLabels } from "@/lib/hubPageContent";
import type {
  NationalTeamAgeGroup,
  NationalTeamPost,
} from "@/lib/nationalTeams";
import type { CalendarEntry } from "@/lib/calendar";
import { nationalTeamsPageCopy } from "../../../content/hubPages";
import { pathwayPages } from "../../../content/pathwayPages";
import {
  filledContentItems,
  filledStaffMembers,
  normalizePageCopy,
} from "../../../content/pageContent";

interface PathwayDetailPageProps {
  kind: "talent-pool" | "national-teams";
  slug: string;
  content: Awaited<ReturnType<typeof getPathwayPageContent>>;
  events: CalendarEntry[];
  posts: NationalTeamPost[];
  labels: EventLabels;
  team?: NationalTeamAgeGroup;
}

export function PathwayDetailPage({
  kind,
  slug,
  content,
  events,
  posts,
  labels,
}: PathwayDetailPageProps) {
  const { copy } = content;
  const expectations = filledContentItems(content.expectations);
  const staff = filledStaffMembers(content.staffing);
  const overviewHref =
    kind === "talent-pool" ? "/talent-pool" : "/national-teams";
  const overviewLabel =
    kind === "talent-pool" ? "Talent Pool overview" : "National Teams overview";
  const pageLabel = pathwayPages.find(
    (page) => page.kind === kind && page.slug === slug,
  )?.label;

  return (
    <main className="min-h-screen scroll-smooth bg-background">
      <CategoryHero
        cmsOnly
        title={copy.heroTitle || pageLabel || slug.toUpperCase()}
        description={copy.heroDescription}
        eyebrow={copy.heroEyebrow}
        imageUrl={content.heroImageUrl}
        imagePosition={content.heroImagePosition}
        imageAlt={copy.heroImageAlt}
        videoUrl={content.heroVideoUrl}
        backHref={overviewHref}
        backLabel={copy.heroBackLink}
        primaryCta={
          events.length > 0 && copy.heroEventsLink
            ? { href: "#events", label: copy.heroEventsLink }
            : undefined
        }
      />

      <nav
        className="border-y border-border bg-background"
        aria-label={
          kind === "talent-pool" ? "Talent Pool stages" : "National teams"
        }
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={overviewHref}
            className="mr-3 shrink-0 text-sm font-bold text-primary hover:text-primary/75"
          >
            {overviewLabel}
          </Link>
          {pathwayPages
            .filter((page) => page.kind === kind)
            .map((page) => (
              <Link
                key={page.id}
                href={`${kind === "talent-pool" ? "/talentpools" : "/national-teams"}/${page.slug}`}
                aria-current={slug === page.slug ? "page" : undefined}
                className={`shrink-0 rounded px-5 py-2 text-sm font-bold transition-colors ${slug === page.slug ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {page.label}
              </Link>
            ))}
        </div>
      </nav>

      {(copy.purposeDescription || copy.purposeExperience) && (
        <section id="purpose" className="section-rhythm bg-background">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-8">
            {(copy.purposeEyebrow || copy.purposeTitle) && (
              <div>
                {copy.purposeEyebrow && (
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    {copy.purposeEyebrow}
                  </p>
                )}
                {copy.purposeTitle && (
                  <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
                    {copy.purposeTitle}
                  </h2>
                )}
              </div>
            )}
            <div>
              {copy.purposeDescription && (
                <p className="whitespace-pre-line text-lg leading-8 text-muted-foreground">
                  {copy.purposeDescription}
                </p>
              )}
              {copy.purposeExperience && (
                <p className="mt-4 whitespace-pre-line text-lg leading-8 text-muted-foreground">
                  {copy.purposeExperience}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <ContentSections sections={content.contentSections} />

      {expectations.length > 0 && (
        <section
          id="expectations"
          className="section-rhythm bg-[#152E35] text-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {copy.expectationsTitle && (
              <h2 className="max-w-3xl font-heading text-4xl font-bold sm:text-5xl">
                {copy.expectationsTitle}
              </h2>
            )}
            <div className="mt-10 grid border-t border-white/15 md:grid-cols-2">
              {expectations.map((item) => (
                <div
                  key={item._key}
                  className="border-b border-white/15 py-6 md:odd:pr-8 md:even:border-l md:even:pl-8"
                >
                  {item.title?.trim() && (
                    <h3 className="mb-3 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  )}
                  {item.description?.trim() && (
                    <p className="whitespace-pre-line text-sm leading-6 text-white/75">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {staff.length > 0 && (
        <section
          id="staffing"
          className="section-rhythm scroll-mt-32 bg-background"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {copy.staffingEyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                {copy.staffingEyebrow}
              </p>
            )}
            {copy.staffingTitle && (
              <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
                {copy.staffingTitle}
              </h2>
            )}
            {copy.staffingDescription && (
              <p className="mt-5 max-w-3xl whitespace-pre-line text-lg leading-8 text-muted-foreground">
                {copy.staffingDescription}
              </p>
            )}
            <div className="mt-10 grid border-t border-border md:grid-cols-2">
              {staff.map((person) => (
                <article
                  key={person._key}
                  className="border-b border-border py-6 md:odd:pr-8 md:even:border-l md:even:pl-8"
                >
                  {person.imageUrl && (
                    <Image
                      src={person.imageUrl}
                      alt={person.imageAlt ?? ""}
                      width={96}
                      height={96}
                      className="mb-4 h-24 w-24 rounded-md object-cover"
                    />
                  )}
                  {person.title?.trim() && (
                    <h3 className="mb-3 text-xl font-bold text-foreground">
                      {person.title}
                    </h3>
                  )}
                  {person.name?.trim() && (
                    <p className="mb-3 font-bold text-foreground">
                      {person.name}
                    </p>
                  )}
                  {person.description?.trim() && (
                    <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {person.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {events.length > 0 && (
        <SeasonPlanningSection
          id="events"
          theme="light"
          events={events}
          labels={labels}
          copy={{
            eyebrow: copy.eventsEyebrow || copy.fixturesEyebrow,
            title: copy.eventsTitle || copy.fixturesTitle,
            description: copy.eventsDescription || copy.fixturesDescription,
          }}
        />
      )}

      <NationalTeamsHub
        events={[]}
        posts={posts}
        labels={labels}
        copy={{
          ...normalizePageCopy(nationalTeamsPageCopy),
          newsEyebrow: copy.newsEyebrow,
          newsTitle: copy.newsTitle,
          newsDescription: copy.newsDescription,
          newsLink: copy.newsLink,
        }}
      />
    </main>
  );
}
