## 1. Editable stage content

- [ ] 1.1 Load relevant Sanity development rules and extend the local category schema with purpose, intended audience, player experience, named staff and one shared contact; verify the Studio schema accepts valid entries and reports incomplete staff or invalid provided emails.
- [ ] 1.2 Add typed category query fields and category-scoped public document retrieval using existing query patterns; verify U14/U15/U16 resources are correctly scoped, including documents shared across groups.
- [ ] 1.3 Replace the hard-coded primary stage copy with published category content and concise transitional overview fallbacks; verify old category records still render and published descriptions control the hero.

## 2. Shared stage presentation

- [x] 2.0 Apply the requested visual-only first pass without changing editorial content or events behavior: match the hub's warm background, full-width teal bands, typography, containers and dividers; verified U14/U15/U16 and the overview at 1440px and 390px with matching rgb(245, 242, 235) backgrounds, no page overflow and unchanged event lists. Targeted ESLint passes; full typecheck remains blocked by existing stale generated skills-route types and an implicit-any error on the news page.
- [x] 2.0a Move the club-versus-federation explanation off all stage pages and show it once between the overview planner and documents on a dark green background. Wire both headings and descriptions through the existing Talent Pool Page Program fields; verified location, single occurrence, absence on all three stage pages, extracted Studio schema fields and targeted ESLint.
- [ ] 2.1 Restructure the category template using hub typography, full-width section bands and shared navigation; verify hero, overview, staff/contact, resources/updates and events appear in that order on all three routes.
- [ ] 2.2 Render only complete staff names and roles with one optional shared contact; verify no staff hides the whole section, contact-only content stays hidden, and staff without contact has no placeholder.
- [ ] 2.3 Display scoped public documents and news using existing presentation patterns where practical; verify each empty feed hides independently and all displayed links work.
- [ ] 2.4 Preserve the existing events list at the bottom, its empty state and configuration; verify ordering, category association, confirmed/provisional labels, configured label copy and event-detail links remain unchanged.
- [ ] 2.5 Remove redundant prose, hypothetical staff descriptions and obsolete hidden markup; verify section links target only rendered sections and overview/age-group navigation still works.

## 3. Validation and editor handoff

- [ ] 3.1 Update related editor guidance to explain Talent Pool Categories fields, publication, staff visibility and category-tagged resources; verify the instructions distinguish editable content from fixed page layout and never require fabricated staff data.
- [ ] 3.2 Run the existing web typecheck, targeted lint and appropriate Studio schema/type validation; verify no new errors are introduced and report any pre-existing blockers separately.
- [ ] 3.3 Check U14/U15/U16 in the browser at mobile and desktop widths, including populated and missing optional content; verify no horizontal overflow, readable headings, working anchors and events as the last section.
- [ ] 3.4 Check the parent Talent Pool hub and unsupported category routes; verify the hub remains unchanged and unsupported or missing categories return not found.
- [ ] 3.5 Document remaining editorial population and deployment steps without deploying Studio or publishing content unless explicitly requested; verify real staff/contact details are left for approved editorial input.
