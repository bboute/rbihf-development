import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { hasSectionText, type ContentSection } from "@/lib/pageSections";
import { OverlappingImageFeature } from "@/components/sections/OverlappingImageFeature";
import { isContentHref } from "../../../../content/contentLinks";

function ContentLink({
  href,
  children,
  className,
}: {
  href?: string | null;
  children: ReactNode;
  className?: string;
}) {
  if (!isContentHref(href)) {
    console.warn("Content section contains an invalid link destination.");
    return <span>{children}</span>;
  }
  const destination = href.trim();
  return destination.startsWith("/") || destination.startsWith("#") ? (
    <Link href={destination} className={className}>
      {children}
    </Link>
  ) : (
    <a href={destination} className={className}>
      {children}
    </a>
  );
}

const textComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-8 text-muted-foreground">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-2xl font-bold text-foreground">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-lg leading-8 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-lg leading-8 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <ContentLink
        href={value?.href}
        className="font-bold text-foreground underline underline-offset-4 hover:text-secondary"
      >
        {children}
      </ContentLink>
    ),
  },
};

function SectionText({ body }: { body: Parameters<typeof hasSectionText>[0] }) {
  if (!hasSectionText(body)) return null;
  return (
    <div className="space-y-5 break-words">
      <PortableText value={body ?? []} components={textComponents} />
    </div>
  );
}

function SectionHeading({ section }: { section: ContentSection }) {
  if (!section.title?.trim() && !section.eyebrow?.trim()) return null;
  return (
    <div className="mb-8 max-w-3xl">
      {section.eyebrow?.trim() && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          {section.eyebrow}
        </p>
      )}
      {section.title?.trim() && (
        <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          {section.title}
        </h2>
      )}
    </div>
  );
}

function renderSectionContent(section: ContentSection) {
  switch (section._type) {
    case "richTextSection":
      if (!hasSectionText(section.body)) return null;
      return (
        <div className="max-w-3xl">
          <SectionHeading section={section} />
          <SectionText body={section.body} />
        </div>
      );
    case "textImageSection": {
      if (!hasSectionText(section.body) || !section.imageUrl) return null;
      return (
        <OverlappingImageFeature
          imageUrl={section.imageUrl}
          imageAlt={section.imageAlt ?? ""}
          imageObjectPosition={section.imageObjectPosition}
          imageIsLeft={section.imagePosition === "left"}
          caption={section.caption}
        >
          <SectionHeading section={section} />
          <SectionText body={section.body} />
        </OverlappingImageFeature>
      );
    }
    case "quoteSection":
      if (!section.quote?.trim()) return null;
      return (
        <div className="max-w-4xl">
          <SectionHeading section={section} />
          <figure className="border-l-2 border-secondary pl-6 sm:pl-10">
            <blockquote className="whitespace-pre-line font-heading text-3xl font-bold leading-tight sm:text-4xl">
              {section.quote}
            </blockquote>
            {(section.attribution?.trim() ||
              section.role?.trim() ||
              section.imageUrl) && (
              <figcaption className="mt-6 flex items-center gap-4">
                {section.imageUrl && (
                  <Image
                    src={section.imageUrl}
                    alt={section.imageAlt ?? ""}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <div>
                  {section.attribution?.trim() && (
                    <p className="font-bold">{section.attribution}</p>
                  )}
                  {section.role?.trim() && (
                    <p className="text-sm text-muted-foreground">
                      {section.role}
                    </p>
                  )}
                </div>
              </figcaption>
            )}
          </figure>
        </div>
      );
    case "stepsSection": {
      const items = (section.items ?? []).filter((item) => item?.title?.trim());
      if (!items.length) return null;
      return (
        <>
          <SectionHeading section={section} />
          <ol className="grid border-t border-border md:grid-cols-3">
            {items.map(
              (item, index) =>
                item && (
                  <li
                    key={item._key}
                    className="border-b border-border px-4 py-8 md:px-7"
                  >
                    <span
                      className="font-mono text-sm text-secondary"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-heading text-2xl font-bold">
                      {item.title}
                    </h3>
                    {item.description?.trim() && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </li>
                ),
            )}
          </ol>
        </>
      );
    }
    case "faqSection": {
      const items = (section.items ?? []).filter(
        (item) => item?.question?.trim() && hasSectionText(item.answer),
      );
      if (!items.length) return null;
      return (
        <div className="max-w-4xl">
          <SectionHeading section={section} />
          <div className="divide-y divide-border border-y border-border">
            {items.map(
              (item) =>
                item && (
                  <details key={item._key} className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <ChevronDown
                        className="h-5 w-5 shrink-0 text-secondary transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="pt-5">
                      <SectionText body={item.answer} />
                    </div>
                  </details>
                ),
            )}
          </div>
        </div>
      );
    }
    case "calloutSection":
      if (!hasSectionText(section.body)) return null;
      return (
        <div className="border-y border-border py-8 lg:grid lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <SectionHeading section={section} />
          <div className="min-w-0">
            <SectionText body={section.body} />
            {section.link?.label?.trim() && (
              <div className="mt-6">
                <ContentLink
                  href={section.link.href}
                  className="inline-flex items-center gap-2 font-bold hover:text-secondary"
                >
                  {section.link.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ContentLink>
              </div>
            )}
          </div>
        </div>
      );
    case "imageSection":
      if (!section.imageUrl) return null;
      return (
        <>
          <SectionHeading section={section} />
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md sm:aspect-[16/9]">
              <Image
                src={section.imageUrl}
                alt={section.imageAlt ?? ""}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                style={{ objectPosition: section.imageObjectPosition }}
              />
            </div>
            {section.caption?.trim() && (
              <figcaption className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                {section.caption}
              </figcaption>
            )}
          </figure>
        </>
      );
    default:
      console.warn("Unsupported page content section type.");
      return null;
  }
}

export function ContentSections({
  sections,
}: {
  sections?: Array<ContentSection | null> | null;
}) {
  return (sections ?? []).map((section) => {
    if (!section) return null;
    const content = renderSectionContent(section);
    if (!content) return null;
    return (
      <section
        key={section._key}
        data-content-section={section._type}
        className={`section-rhythm bg-background text-foreground ${
          section.theme === "dark"
            ? "[--background:#152E35] [--foreground:#ffffff] [--primary:#ffffff] [--secondary:#F08992] [--muted:#203940] [--muted-foreground:#a6b0b3] [--border:#ffffff26]"
            : ""
        }`}
      >
        <div className="mx-auto max-w-7xl break-words px-4 sm:px-6 lg:px-8">
          {content}
        </div>
      </section>
    );
  });
}
