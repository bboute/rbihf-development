import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { HubHero } from "@/components/HubHero";
import { NationalTeamsHub } from "@/components/national-teams/NationalTeamsHub";
import { ContentSections } from "@/components/sections/ContentSections";
import {
  getCalendarEntries,
  getNationalTeamPosts,
  getNationalTeamsPageContent,
  getEventLabels,
} from "@/lib/sanityClient";
import { scopeCalendarEntries } from "@/lib/calendar";

export default async function NationalTeamsPage() {
  const [
    calendarEntries,
    posts,
    { copy, heroImageUrl, heroImagePosition, contentSections },
    labels,
  ] = await Promise.all([
    getCalendarEntries(),
    getNationalTeamPosts(),
    getNationalTeamsPageContent(),
    getEventLabels(),
  ]);
  const events = scopeCalendarEntries(calendarEntries, "national-teams");
  const cards = [
    {
      number: "01",
      slug: "u18m",
      title: copy.howWeWorkU18MenTitle,
      body: copy.howWeWorkU18MenDescription,
    },
    {
      number: "02",
      slug: "u18w",
      title: copy.howWeWorkU18WomenTitle,
      body: copy.howWeWorkU18WomenDescription,
    },
    {
      number: "03",
      slug: "u20",
      title: copy.howWeWorkU20MenTitle,
      body: copy.howWeWorkU20MenDescription,
    },
  ].filter((card) => card.title);
  const showProgram = cards.length > 0 || !!copy.howWeWorkDescription;

  return (
    <main className="min-h-screen bg-background">
      <HubHero
        title={copy.heroTitle}
        fallbackTitle="National Teams"
        eyebrow={copy.heroEyebrow}
        description={copy.heroDescription}
        imageUrl={heroImageUrl}
        imagePosition={heroImagePosition}
        imageAlt={copy.heroImageAlt}
        links={[
          {
            href: "#how-we-work",
            label: showProgram ? copy.heroHowWeWorkLink : "",
            icon: ArrowRight,
          },
          {
            href: "#calendar",
            label: events.length > 0 ? copy.heroCalendarLink : "",
            icon: CalendarDays,
          },
          {
            href: "#updates",
            label: posts.length > 0 ? copy.heroNewsLink : "",
            icon: Newspaper,
          },
        ]}
      />
      {showProgram && (
        <section
          id="how-we-work"
          className="section-rhythm scroll-mt-32 bg-background"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {copy.howWeWorkEyebrow && (
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  {copy.howWeWorkEyebrow}
                </p>
              )}
              {copy.howWeWorkTitle && (
                <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
                  {copy.howWeWorkTitle}
                </h2>
              )}
              {copy.howWeWorkDescription && (
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  {copy.howWeWorkDescription}
                </p>
              )}
            </div>
            {cards.length > 0 && (
              <div className="mt-12 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
                {cards.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/national-teams/${item.slug}`}
                    className="group relative flex h-full flex-col px-4 py-8 transition-colors duration-300 hover:bg-muted focus-visible:bg-muted md:px-7"
                  >
                    <span className="relative font-mono text-sm text-secondary transition-colors duration-300 group-hover:text-primary">
                      {item.number}
                    </span>
                    <h3 className="relative mt-5 font-heading text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {item.title}
                    </h3>
                    {item.body && (
                      <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                        {item.body}
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-primary">
                      <span className="relative">
                        View team
                        <span
                          className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                          aria-hidden="true"
                        />
                      </span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      <ContentSections sections={contentSections} />
      <NationalTeamsHub
        events={events}
        posts={posts}
        copy={copy}
        labels={labels}
      />
    </main>
  );
}
