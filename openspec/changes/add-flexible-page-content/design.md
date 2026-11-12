## Context

Hub and pathway pages use additive Sanity fields and published, uncached reads. Fixed sections hide absent copy. Portable Text, Next Image and crop/hotspot utilities already exist.

## Goals / Non-Goals

**Goals:** Reuse one typed renderer across the two hubs and six detail pages; keep content editable and ordered independently of page code.

**Non-Goals:** A general layout builder, custom CSS, moving operational feeds into editor-managed arrays, remote content mutation or deployment.

## Decisions

- Add an optional `contentSections` object array through shared page fields. Reuse seven registered object schemas rather than duplicate definitions per page.
- Keep blocks self-contained and use an exhaustive discriminated union. Rich text uses existing Portable Text support with constrained heading/list/link options; FAQs use native accessible disclosures.
- Permit only light and deep-green section treatments; image blocks honor existing crop/hotspot handling. Text/image blocks stack text first on mobile and support either desktop image position.
- Resolve content images alongside page data on the server. Pass rendered sections as children to the client-side Talent Pool hub to avoid pushing the renderer into its client bundle.
- Put flexible content after introductory content and before operational feeds. Keep the Talent Pool calendar last, preserving news, partnership and document sections.
- Validate required block bodies, image descriptions and safe link destinations in Studio. Incomplete historical blocks render no empty section; unsupported types and unsafe links surface warnings rather than execute or silently fail.

## Risks / Trade-offs

- Sparse old documents → missing arrays render nothing and need no migration.
- Longer pages → editors control section count; no artificial placeholder content.
- Layout fragmentation → no arbitrary colors, spacing or nested blocks.
- Hosted editors do not expose new fields until deployed → document the one-time Studio and web rollout.

## Migration Plan

Deploy web and Studio code normally; no dataset writes are needed. Editors then add and publish sections individually. Rollback ignores the additive field without deleting authored content.
