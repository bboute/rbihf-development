## Context

See `proposal.md` for the motivation and requested brand. The project has several user-facing occurrences in application metadata, navigation, page copy, and the footer, plus references in documentation. This change alters the name only; existing route names, Sanity types, and domain terminology may still use “hub” to describe information architecture.

## Goals / Non-Goals

**Goals:**

- Use **RBIHF Development Centre of Excellence** as the canonical platform name and **RDCE** as its short form where space or repetition calls for it. In the navigation, “RBIHF” is already displayed as the wordmark directly above “Development Centre of Excellence”.
- Update user-facing branding and relevant project documentation consistently.
- Preserve behavior, URLs, schemas, and generic references to hubs that are not the product name.

**Non-Goals:**

- Reorganize the platform or rename routes, schemas, components, or data models solely because their identifiers contain “hub”.
- Redesign page layouts or add a new tagline.
- Rewrite historical or archived material where the old name is intentionally part of the record.

## Decisions

- **Include RBIHF in the full name wherever it is not already present.** The canonical name is “RBIHF Development Centre of Excellence”; the navigation displays RBIHF separately as the wordmark above the descriptor. Use “RDCE” as a short form when a concise label is needed.
- **Treat this as a targeted branding migration, not a blind global replacement.** Search case-insensitively for the old name and inspect each hit to distinguish platform branding from generic, historical, and file-identifier uses. This avoids changing internal “hub” concepts or historical context unnecessarily.
- **Do not change URLs or technical identifiers.** Keeping routes, schema names, and data contracts stable avoids breaking links or content integrations when only the brand is changing.

## Risks / Trade-offs

- [Some brand references may be embedded in less-obvious metadata or content] → Search the repository for spelling and casing variants, then review remaining matches before completion.
- [The full name may not fit in compact navigation or metadata] → Use “RDCE” in constrained contexts while retaining the full canonical name in prominent branding.
- [A generic or historical use may be mistaken for branding] → Review matches in context and leave non-brand uses unchanged.
