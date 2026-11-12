import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageObject } from "@sanity/image-url";
import { getSanityImage } from "@/lib/sanityImage";

interface SectionBase {
  _key: string;
  title?: string | null;
  eyebrow?: string | null;
  theme?: "light" | "dark" | null;
}

interface SectionImage {
  image?: SanityImageObject | null;
  imageAlt?: string | null;
  imageUrl?: string;
  imageObjectPosition?: string;
}

export type ContentSection = SectionBase &
  (
    | { _type: "richTextSection"; body?: PortableTextBlock[] | null }
    | (SectionImage & {
        _type: "textImageSection";
        body?: PortableTextBlock[] | null;
        imagePosition?: "left" | "right" | null;
        caption?: string | null;
      })
    | (SectionImage & {
        _type: "quoteSection";
        quote?: string | null;
        attribution?: string | null;
        role?: string | null;
      })
    | {
        _type: "stepsSection";
        items?: Array<{
          _key: string;
          title?: string | null;
          description?: string | null;
        } | null> | null;
      }
    | {
        _type: "faqSection";
        items?: Array<{
          _key: string;
          question?: string | null;
          answer?: PortableTextBlock[] | null;
        } | null> | null;
      }
    | {
        _type: "calloutSection";
        body?: PortableTextBlock[] | null;
        link?: { label?: string | null; href?: string | null } | null;
      }
    | (SectionImage & { _type: "imageSection"; caption?: string | null })
  );

export const contentSectionsProjection = `contentSections[]{
  ...,
  image { asset->{_id, url}, crop, hotspot }
}`;

export function resolveContentSections(
  sections: Array<ContentSection | null> | null | undefined,
  config: { projectId: string; dataset: string },
): ContentSection[] {
  return (sections ?? []).flatMap((section) => {
    if (!section) return [];
    if (!("image" in section)) return [section];
    const { image, ...content } = section;
    const size =
      section._type === "quoteSection"
        ? { width: 192, height: 192 }
        : { width: 1600 };
    const resolved = getSanityImage(image, config, size);
    return [
      {
        ...content,
        imageUrl: resolved?.url,
        imageObjectPosition: resolved?.objectPosition,
      },
    ];
  });
}

export function hasSectionText(body?: PortableTextBlock[] | null): boolean {
  return !!body?.some((block) =>
    block.children?.some((span) => span.text?.trim()),
  );
}
