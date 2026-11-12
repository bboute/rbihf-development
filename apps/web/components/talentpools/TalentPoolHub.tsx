"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SeasonPlanningSection } from "@/components/sections/SeasonPlanningSection";
import type { CalendarEntry } from "@/lib/calendar";
import {
  type TalentPoolPageCopy,
  type EventLabels,
} from "@/lib/hubPageContent";
import { formatEventDate as formatDate } from "@/lib/eventFormatting";
import { ArrowDownToLine, ArrowRight, FileText, Newspaper } from "lucide-react";
import type { TalentPoolDocument, TalentPoolPost } from "@/lib/talentPool";

interface TalentPoolHubProps {
  events: CalendarEntry[];
  posts: TalentPoolPost[];
  documents: TalentPoolDocument[];
  copy: TalentPoolPageCopy;
  labels: EventLabels;
  children?: ReactNode;
}

function categoryLabel(
  categories: Array<{ title: string }>,
  allGroupsLabel: string,
): string {
  return (
    categories.map((category) => category.title).join(" · ") || allGroupsLabel
  );
}

export function TalentPoolHub({
  events,
  posts,
  documents,
  copy,
  labels,
  children,
}: TalentPoolHubProps) {
  const documentLabels: Record<TalentPoolDocument["documentType"], string> = {
    school: copy.documentsSchoolLabel,
    medical: copy.documentsMedicalLabel,
    consent: copy.documentsConsentLabel,
    travel: copy.documentsTravelLabel,
    program: copy.documentsProgramLabel,
    other: copy.documentsOtherLabel,
  };
  const filteredPosts = posts;
  const filteredDocuments = documents;
  const stageCards = [
    {
      number: "01",
      slug: "u14",
      title: copy.programU14Title,
      body: copy.programU14Description,
    },
    {
      number: "02",
      slug: "u15",
      title: copy.programU15Title,
      body: copy.programU15Description,
    },
    {
      number: "03",
      slug: "u16",
      title: copy.programU16Title,
      body: copy.programU16Description,
    },
  ].filter((card) => card.title);

  return (
    <>
      {(stageCards.length > 0 || copy.programDescription) && (
        <section
          id="how-we-work"
          className="section-rhythm scroll-mt-32 bg-background"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {copy.programEyebrow && (
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  {copy.programEyebrow}
                </p>
              )}
              {copy.programTitle && (
                <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
                  {copy.programTitle}
                </h2>
              )}
              {copy.programDescription && (
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  {copy.programDescription}
                </p>
              )}
            </div>

            {stageCards.length > 0 && (
              <div className="mt-12 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
                {stageCards.map(({ number, slug, title, body }) => (
                  <Link
                    key={number}
                    href={`/talentpools/${slug}`}
                    className="group relative flex h-full flex-col px-4 py-8 transition-colors duration-300 hover:bg-muted focus-visible:bg-muted md:px-7"
                  >
                    <span className="relative font-mono text-sm text-secondary transition-colors duration-300 group-hover:text-primary">
                      {number}
                    </span>
                    <h3 className="relative mt-5 font-heading text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {title}
                    </h3>
                    {body && (
                      <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                        {body}
                      </p>
                    )}
                    {copy.programStageLink && (
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-primary">
                        <span className="relative">
                          {copy.programStageLink}
                          <span
                            className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                            aria-hidden="true"
                          />
                        </span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {children}

      {filteredPosts.length > 0 && (
        <section
          id="updates"
          className="section-rhythm scroll-mt-32 bg-[#152E35] text-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {copy.newsEyebrow && (
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F08992]">
                    {copy.newsEyebrow}
                  </p>
                )}
                {copy.newsTitle && (
                  <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
                    {copy.newsTitle}
                  </h2>
                )}
              </div>
              {copy.newsLink && (
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white"
                >
                  {copy.newsLink} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {filteredPosts.length > 0 ? (
              <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <Link
                  href={`/news/${filteredPosts[0]!.slug.current}`}
                  className="group relative min-h-[24rem] overflow-hidden rounded-md bg-black"
                >
                  {filteredPosts[0]!.imageUrl && (
                    <Image
                      src={filteredPosts[0]!.imageUrl}
                      alt={filteredPosts[0]!.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">
                      {categoryLabel(
                        filteredPosts[0]!.categories,
                        copy.plannerAllGroups,
                      )}{" "}
                      · {formatDate(filteredPosts[0]!.publishedAt)}
                    </p>
                    <h3 className="mt-3 max-w-2xl font-heading text-3xl font-bold leading-tight">
                      {filteredPosts[0]!.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
                      {filteredPosts[0]!.excerpt}
                    </p>
                  </div>
                </Link>
                <div className="divide-y divide-white/15 border-y border-white/15">
                  {filteredPosts.slice(1, 4).map((post) => (
                    <Link
                      key={post._id}
                      href={`/news/${post.slug.current}`}
                      className="group block py-6"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                        {categoryLabel(post.categories, copy.plannerAllGroups)}{" "}
                        · {formatDate(post.publishedAt)}
                      </p>
                      <h3 className="mt-2 text-xl font-bold leading-snug group-hover:text-[#F08992]">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">
                        {post.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-10 border-y border-white/15 py-12 text-center text-white/65">
                <Newspaper className="mx-auto h-8 w-8" aria-hidden="true" />
                <p className="mt-3 font-bold text-white">
                  {copy.newsEmptyTitle}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {(copy.programClubDescription || copy.programFederationDescription) && (
        <section
          id="club-and-federation"
          aria-labelledby={
            copy.programPartnershipTitle
              ? "club-and-federation-title"
              : undefined
          }
          className="section-rhythm scroll-mt-32 bg-[#152E35] text-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {copy.programPartnershipEyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F08992]">
                {copy.programPartnershipEyebrow}
              </p>
            )}
            {copy.programPartnershipTitle && (
              <h2
                id="club-and-federation-title"
                className="mt-3 max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl"
              >
                {copy.programPartnershipTitle}
              </h2>
            )}
            <div className="mt-10 grid divide-y divide-white/15 border-y border-white/15 md:grid-cols-2 md:divide-x md:divide-y-0">
              {copy.programClubDescription && (
                <div className="py-8 md:pr-8">
                  {copy.programClubTitle && (
                    <h3 className="mb-4 font-heading text-3xl font-bold text-white">
                      {copy.programClubTitle}
                    </h3>
                  )}
                  <p className="text-lg leading-8 text-white/75">
                    {copy.programClubDescription}
                  </p>
                </div>
              )}
              {copy.programFederationDescription && (
                <div className="py-8 md:pl-8">
                  {copy.programFederationTitle && (
                    <h3 className="mb-4 font-heading text-3xl font-bold text-white">
                      {copy.programFederationTitle}
                    </h3>
                  )}
                  <p className="text-lg leading-8 text-white/75">
                    {copy.programFederationDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {filteredDocuments.length > 0 && (
        <section
          id="documents"
          className="section-rhythm scroll-mt-32 bg-[#F5F2EB]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                {copy.documentsEyebrow && (
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    {copy.documentsEyebrow}
                  </p>
                )}
                {copy.documentsTitle && (
                  <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
                    {copy.documentsTitle}
                  </h2>
                )}
              </div>
              {copy.documentsDescription && (
                <p className="max-w-xl text-base leading-7 text-muted-foreground lg:justify-self-end">
                  {copy.documentsDescription}
                </p>
              )}
            </div>

            <div className="mt-10 border-y border-foreground/15">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((document, index) => (
                  <article
                    key={document._id}
                    className={`grid gap-4 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center ${index > 0 ? "border-t border-foreground/15" : ""}`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded bg-background text-primary">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                        {[
                          documentLabels[document.documentType],
                          categoryLabel(
                            document.categories,
                            copy.plannerAllGroups,
                          ),
                          document.season,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-foreground">
                        {document.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {document.description}
                      </p>
                    </div>
                    <a
                      href={document.fileUrl}
                      aria-label={copy.documentsDownload || document.title}
                      download={document.fileName}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded bg-foreground px-4 text-sm font-bold text-background hover:bg-foreground/85"
                    >
                      <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />{" "}
                      {copy.documentsDownload}
                    </a>
                  </article>
                ))
              ) : (
                <div className="py-12 text-center">
                  <FileText
                    className="mx-auto h-8 w-8 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-bold text-foreground">
                    {copy.documentsEmptyTitle}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {copy.documentsEmptyDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {events.length > 0 && (
        <SeasonPlanningSection
          id="planner"
          theme="light"
          events={events}
          labels={labels}
          copy={{
            eyebrow: copy.plannerEyebrow,
            title: copy.plannerTitle,
            description: copy.plannerDescription,
            filterLabel: copy.plannerFilterLabel,
            allGroups: copy.plannerAllGroups,
            showPrevious: copy.plannerShowPrevious,
            hidePrevious: copy.plannerHidePrevious,
            showMore: copy.plannerShowMore,
            hideMore: copy.plannerHideMore,
            lastEvent: copy.plannerLastEvent,
            emptyTitle: copy.plannerEmptyTitle,
            emptyDescription: copy.plannerEmptyDescription,
          }}
        />
      )}
    </>
  );
}
