## Context

See [proposal.md](./proposal.md) for motivation. The category route already shares a hero, age-group navigation and events list. It retrieves category media and description from Sanity, but uses `lib/talentPool.ts` for stage descriptions, repeated explanations and hypothetical staff roles. Public news and document models already support age-group references.

## Goals / Non-Goals

**Goals:**
- Keep one server-rendered template for U14, U15 and U16.
- Give editors structured content fields without requiring a free-form page builder.
- Preserve existing category URLs, events behavior and parent-hub behavior.

**Non-Goals:**
- Redesigning the main hub, event details, selection workflows or protected player information.
- Creating a federation-wide staff directory or collecting completed forms.
- Inventing names, eligibility rules, tournament counts or contact information.

## Decisions

### Extend the existing category record

Reuse title, description and hero media. Add stage-purpose, intended-audience and player-experience text fields, plus an optional staff array containing name and role and an optional shared team-contact object containing label and email. Keep the contact separate from individuals to avoid requiring public personal addresses.

Alternative: separate page documents or a page builder. Rejected because each age group already has its own category record and the agreed layout is deliberately consistent.

### Treat Sanity as the source of stage-specific content

Wire the existing description into the hero instead of overriding it with the code-defined summary. Fetch the new fields explicitly and type the result. Use concise, existing stage context only as a documented transitional fallback for missing overview text; never restore the long generic sections or fictitious staff descriptions. An intentionally empty optional field must not summon placeholder content.

Alternative: retain hard-coded primary content with CMS overrides. Rejected as the permanent design because it leaves two editorial sources of truth.

### Keep presentation structured and aligned with the hub

Use the shared category hero and navigation, then full-width section bands with the hub's container widths, typography, backgrounds and rule-based lists. The overview contains three short labeled facts: purpose, who it is for and what players can expect. Remove the repeated experience cards and club-versus-federation explanation.

Place staff/contact after the overview, documents and updates after staff, and events last. Reuse existing document/news presentation where practical without refactoring unrelated hub behavior.

Per the subsequent editorial request, retain the club-versus-federation explanation
only on the parent overview, between planner and documents, on its standard dark
green background. Both headings and descriptions use the existing Talent Pool Page
Program copy fields, generated from the shared defaults. This is a narrow exception
to the original boundary excluding parent-hub changes.

### Publish real staff details only

Only entries with both a real name and role are displayable. Hide the entire staff/contact section when no complete staff entries exist. If staff exists but the shared contact is absent, show the staff without a placeholder contact. Validate provided email addresses and staff entries in Studio. Do not add biographies or staff photos to the initial scope.

### Reuse operational content and preserve event behavior

Filter existing public documents and news by the current category. Hide each empty feed independently and omit links to missing sections. Keep events visible, including their existing empty state, list component, category association, chronological ordering, confirmed/provisional states, detail links and configurable labels. No new upcoming-only or past-event filtering is introduced.

Fetch independent page resources concurrently once the category ID is known. Maintain not-found behavior for unsupported or missing categories.

## Risks / Trade-offs

- Existing records lack overview fields -> Introduce fields additively and use a concise transitional fallback; document that editors should populate all three records.
- Initial editorial copy could imply unverified commitments -> Avoid unsupported numbers, eligibility promises or staffing claims; leave factual details for editors.
- Shared helpers affect the hub -> Keep query additions backward-compatible and validate the hub alongside stage pages.
- Staff fields publish personal information -> Limit to approved names, roles and one shared team contact; no player data or private forms.
- Sparse content makes some pages shorter -> Deliberately omit empty optional sections rather than add filler.

## Migration Plan

1. Add and validate the local Studio schema and typed query changes.
2. Implement the shared stage template and document the editor workflow.
3. Verify old records without new fields still render and verify populated records, mixed empty states and all three routes.
4. Deploy the Studio schema through the existing project workflow only when explicitly requested; populate and publish approved stage copy in Sanity.
5. Roll back the template if necessary; additive category fields can remain without affecting the previous renderer.
