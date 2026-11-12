## Why

The U14, U15 and U16 pages repeat broad pathway explanations and generic staff descriptions instead of giving families clear, stage-specific information. Most of that copy is hard-coded, preventing editors from maintaining the pages themselves even though category records already exist in Sanity.

## What Changes

- Give all three pages the main Talent Pool hub's visual structure and concise, practical tone.
- Use one consistent section order: hero, stage overview, staff and contact, documents and updates, events.
- Replace repeated pathway prose with editable purpose, intended audience and player-experience content.
- Replace hypothetical staff-role descriptions with named staff, their roles and one shared team contact; hide the section until actual staff details are published.
- Make stage content editable through the existing Talent Pool Categories area in Sanity.
- Show age-group-specific public documents and news only when available.
- Preserve the existing category events list, links, status labels and event-label configuration at the bottom.

## Capabilities

### New Capabilities

- `talent-pool-stage-pages`: Concise, editor-maintained U14-U16 pages with real staff information and category-scoped operational content.

### Modified Capabilities

None. There are no canonical capability specs currently under `openspec/specs/`. This proposal builds on the parent-hub redesign without changing its requirements.

## Impact

- Existing category route, shared Talent Pool components, stage types and Sanity queries.
- Existing Sanity talent pool category schema; no new CMS or dependency is required.
- Existing public document and news feeds reused with age-group filtering.
- Editor guidance and initial stage content need updating. Real names and contact details must be supplied by editors, never fabricated.
- Main Talent Pool hub and event detail pages remain outside the redesign scope.
