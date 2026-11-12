# Belgian Ice Hockey Talent Pool Platform (BTPP)

A comprehensive platform for ice hockey development in Belgium, designed to connect players, coaches, and clubs while providing resources for talent identification and development.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Talent Pool planner

### Homepage season planning

The homepage calendar combines all published **Events** and **Exhibition Games**
in date order. Age-group filters come from their linked categories, including
older age groups; items linked to several categories appear under each one.
Uncategorized items appear only under **All groups**. Event date ranges and
planning statuses are preserved, while games also show opponents, results and
ticket links where available. Edit and publish the original event or game in
Sanity to update the schedule.

The homepage, Talent Pool overview, National Teams overview and age-group detail
pages share the same schedule component: age-group filters, the most recent past
activity, five upcoming items and controls to show more or earlier activity.
Talent Pool is scoped to `u14`, `u15` and `u16`; National Teams is scoped to
`u18`, `u18m`, `u18w` and `u20`. Both include events **and** games. Detail pages
show only their own group's activity; legacy `u18` activity is shared by both
U18 teams. Page headings and descriptions remain CMS-controlled, and the homepage
keeps its green background. The full-year Calendar also includes both content types.

### National team structure

The National Teams overview follows the Talent Pool pattern: three numbered,
clickable **How we work** cards open [U18 Men](/national-teams/u18m),
[U18 Women](/national-teams/u18w), and [U20 Men](/national-teams/u20).
Each detail page supports a pathway introduction, player/family expectations,
staffing, preparation events, fixtures/results, and team news. The team
navigation links each page back to the overview and to the other teams.

In Sanity, open **Talent Pool Stage Pages → U14/U15/U16** or **National Team
Detail Pages → U18 Men/U18 Women/U20 Men**. Each detail page has its own hero
image/video, grouped copy fields, ordered player/family/coach information blocks,
and an ordered **Staffing** array. Staff entries support a role, person name,
responsibilities/bio, photo, and photo alt text. No roles or people are inserted
automatically. Blank entries and an empty staffing list are hidden, including
the staffing heading/introduction. You can publish a role without naming a person.

Use category slugs `u18m`, `u18w`, and `u20` on Sanity events, exhibition games,
and posts to associate them with the correct team. Legacy `u18` entries remain
shared by both U18 teams; use a specific team category for gender-specific items.
General **National Teams** posts appear on the overview, while detail pages show
only posts associated with that team. The detail routes work even before team
categories contain published content. Sections without published events, games,
news, or documents are hidden rather than showing placeholder content.

Card titles and descriptions are editable in **National Teams
Page → Page Content → How**. The **View team** link wording, team routes and
navigation labels remain fixed.
Detail introductions and section headings are editable in each detail page's
**Page Content** fields. Document IDs and route mappings live in
[`content/pathwayPages.ts`](./content/pathwayPages.ts).

### Editing the landing pages

In Sanity Studio, open **Talent Pool Page** or **National Teams Page** in the
Content menu. Each is a single page document with a **Hero Image** and grouped
**Page Content** fields for the hero, calendar/planner, news, documents (Talent
Pool) and development pathway. New documents start empty; all copy is optional.
Edit and **Publish** to update the website on the next page load; drafts are not
shown. No website rebuild is needed for content changes.

The club-versus-federation explanation appears only on the Talent Pool overview,
before documents and the season planner, on a dark green background, not on the
U14/U15/U16 pages. Edit its overall heading using **Program Partnership Title**
in
**Talent Pool Page → Page Content → Program**. The coral-red eyebrow above it is
editable using **Program Partnership Eyebrow**.
Edit the two column headings and
descriptions using **Program Club
Title**, **Program Club Description**, **Program Federation Title** and **Program
Federation Description**, then publish. These fields are generated from the shared
page-content field definitions, so the updated Studio code must be running to edit them.
Each column is hidden when its description is empty; both empty descriptions
hide the entire partnership section.

The hero, introductory sections, navigation targets, age groups and calendar
behaviour stay fixed. Explanatory content can be composed using the Content
Sections list described below.
Changing a stage title does not change its destination. Events, games, news
articles and downloads (including their images) are still edited in their own
Sanity documents. Optional page content comes only from published fields: missing,
null, cleared, and whitespace-only fields do not restore placeholder copy or images.
The hero always remains visible, using the standard dark background when no image
is published. Its title uses the page/stage/team name unless a custom hero title
is published in Sanity. Other empty fields are omitted.
Overview cards need a title; information sections need body content
or populated entries. Links to hidden sections are omitted. Valid detail routes
keep their fixed navigation even before their first publication.
Existing published copy is preserved; this change does not rewrite remote content.

Hero images on both overviews and all six detail pages support Sanity's built-in
**Crop and Hotspot** editor. Open the image's editing controls, trim the crop,
move/resize the hotspot over the important subject, and publish the page.
The website applies the saved crop and uses the focal point when the hero adapts
to desktop/mobile widths. Staff photos use the same controls for their square
portraits. The Calendar shares the Talent Pool overview's image and framing.
Selections belong to each image field, so the same asset can be framed differently
on different pages. Existing images without selections remain centered.
The updated Studio code must be running or deployed to expose these controls.

The Talent Pool **Planner Description** is optional: clear it and publish to hide
the text below the status legend. Shared status wording is not editable per page.
Use **Site Settings → Event Labels** for Confirmed, Provisional, Completed,
Upcoming and Cancelled. These labels are shared by the Talent Pool planner,
category event lists, National Teams calendar and homepage exhibition games.
Status values, styling and filtering remain fixed regardless of display wording.

Count/empty-state templates contain placeholders such as `{shown}`, `{total}`,
`{count}`, `{year}` or `{team}`. Keep those placeholders when editing the text;
Studio validates non-empty templates before publishing. Shared field definitions live in
[`content/hubPages.ts`](./content/hubPages.ts), used by both Studio and the web app.

The new Studio entries require the updated local Studio code (or a Studio
deployment for the hosted editor). Changes to the website code also need to be
deployed once before the hosted website can read these documents. No schema,
Studio deployment, or remote content migration is performed automatically.
The separate Calendar page retains its existing defaults and behavior.

Run the CMS normalization and rendering tests using the existing Node, TypeScript,
and React dependencies:

```bash
node --experimental-strip-types --test content/pageContent.test.mjs content/pageRendering.test.mjs
```

### Flexible content sections

Open **Talent Pool Page**, **National Teams Page**, or any **Stage / Team Page**
in Sanity and use **Content Sections** to add, remove, duplicate or drag sections
into the desired order. Each page has its own list; it starts empty and has no
placeholder content. Publish the page to show changes on the next website load.

Available sections:

| Section | Editor controls |
| --- | --- |
| Rich text | Optional heading/label; paragraphs, subheadings, bold, italic, lists and links |
| Text + image | Rich text, image, left/right desktop position and optional caption |
| Quote | Quote, optional attribution, role/organisation and portrait |
| Steps / principles | Reorderable numbered steps with titles and optional explanations |
| Frequently asked questions | Reorderable questions with rich-text answers; expandable using mouse or keyboard |
| Callout / guidance | Rich text and an optional labelled link |
| Full-width image | Image and optional caption |

Every section supports an optional label, heading and **Light** or **Deep green**
background. Typography, spacing and responsive layout remain controlled by the
website. Text/image sections stack text before the image on mobile. Image fields
support Crop and Hotspot; selected images require a screen-reader description.
Links accept `/path`, `#section`, `https://`, `http://`, `mailto:` and `tel:`
destinations. Empty or incomplete sections do not create blank bands.

On the Talent Pool overview, **How we work** remains first, followed by flexible
sections and the existing news, partnership and document sections. **Season
planning** is always the last section when activity exists. National Teams
sections appear after How we work and before the existing calendar/news feeds.
On stage/team pages they follow the introductory purpose and precede the
expectations, staffing and operational sections. News, downloads and calendar
activity are still edited in their own existing documents, not in this list.

These are additive fields: existing pages do not need a content migration.
The updated Studio and website code must be deployed once to make the new
controls and rendering available on the hosted site. This change does not
deploy either application or add content to the remote dataset automatically.

### Planner behaviour

The Talent Pool page shows the first 5 upcoming or ongoing events in date order.
When more dates are available, the subtle **Show more events** drawer control
reveals the next 5 with a downward expansion. **Show fewer events** animates
the extra rows closed, returning to the first 5. The controls match the
earlier-events drawer, with equal heights, the page background and no count.
Changing
the age-group filter resets the list to 5 upcoming events and one completed event.

The most recently finished event for the selected group appears above the list
in a muted row labelled **Completed** and **Last event**. When older events exist,
The subtle **Show earlier events** drawer handle above the list reveals 5 more
at a time, smoothly expanding the older rows above the latest completed event
in date order. **Hide earlier events** closes the drawer again, keeping only
the latest completed event. Both animations respect reduced-motion preferences.
All previous events are muted and labelled **Completed**; only the
most recent carries **Last event**. Each show-more control disappears when all
matching events are visible; the hide control remains available.
The drawer button wording is editable
under **Talent Pool Page → Planner** in Sanity.
Multi-day events remain in the upcoming list until their end date.

The year planner lives on **Calendar** (`/calendar`), linked from the footer's
**Quick Links**, rather than on the Talent Pool landing page. Its styling follows
the Talent Pool page, with the same hero imagery and shared event labels.
It displays a Monday-first, January–December calendar grid for the
current year, with previous/next-year navigation and a **This year** shortcut.
It has its own U14/U15/U16 age-group filter. Each month highlights
event days and lists dates, age groups, venues and planning status below.
Multi-day events appear in every month/year they overlap. Finished events are
muted and explicitly labelled **Completed**; provisional dates have dashed
outlines, and today's date has a coral outline.

The existing **Talent Pool Page → Calendar** fields in Sanity continue to control
the calendar wording, so moving the planner does not discard published content.
The Talent Pool landing page retains only its paginated upcoming-events planner
and the most recent completed event.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```
