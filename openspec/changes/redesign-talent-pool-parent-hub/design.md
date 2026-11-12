## Context

Talent Pool already has category-tagged events and news, but the overview prioritizes explanation over the recurring parent tasks of checking dates, planning absences, reading updates, and finding forms. Event records have a single date and no certainty state. No public Talent Pool document model exists.

## Goals / Non-Goals

**Goals:**
- Make upcoming commitments and season planning the primary landing-page experience.
- Filter operational content across U14, U15, and U16.
- Distinguish provisional dates clearly from confirmed dates.
- Publish blank, non-sensitive documents without collecting personal information.
- Preserve a concise explanation of the program and club/federation roles.

**Non-Goals:**
- Collect completed medical, consent, or school forms.
- Expose protected coaching or tactical material.
- Keep U18 or U20 inside the Talent Pool information architecture.
- Build an authenticated document workflow.

## Decisions

### Keep the age-group filter inside the planner

An All, U14, U15, and U16 segmented control filters upcoming events and the year planner. News and documents remain complete Talent Pool feeds so the control does not read as a site-wide mode switch.

### Show confirmed and provisional dates together

Confirmed events use a strong status treatment. Provisional events use a quieter outlined treatment and explicit label. Every event remains category-tagged and may gain an optional end date.

### Use a scannable year planner

The planner groups events by month in chronological order. Desktop uses a horizontal month rail; mobile uses a vertical sequence. Empty months are omitted so the interface remains useful on small screens.

### Create a dedicated public document type

Documents include title, description, file, document category, applicable age groups, publication date, and optional season. Only blank templates and public guidance are stored. Completed forms and medical data remain outside the public site.

### Keep program copy concise on the hub

The hub explains scouting, federation preparation, club responsibility, and progression in a short process section. Detailed stage explanations remain on U14-U16 pages.

### Carry the hub visual system through Talent Pool subpages

U14-U16 stage and skills pages use the same immersive hockey imagery, dark teal and warm neutral bands, restrained corners, editorial typography, and rule-based lists as the parent hub. Shared Talent Pool components avoid emoji-led cards, decorative gradients, and nested panels so moving between overview and detail feels continuous.

### Enforce the U14-U16 boundary

Talent Pool queries and navigation include only U14, U15, and U16. Requests for U18 or U20 Talent Pool category pages resolve as not found; National Teams owns those stages.

## Risks / Trade-offs

- Provisional dates may be mistaken for commitments. Mitigation: always show a status label and explanatory legend.
- Public forms can become stale. Mitigation: show publication date and season and order newest first.
- Existing events lack status. Mitigation: treat missing status as confirmed for backward compatibility.
- The hub can become dense again. Mitigation: prioritize planning, limit news previews, and keep program explanation compact.