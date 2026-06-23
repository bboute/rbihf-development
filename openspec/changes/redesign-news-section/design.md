## Context

The Latest News section (`apps/web/components/sections/NewsSection.tsx`) currently displays posts in a uniform 3-column grid with basic card styling. The redesign aims to:

1. Match the premium aesthetic of `HeroSection.tsx` which uses dark featured cards with gradient overlays
2. Incorporate subtle Belgian identity through texture inspired by the national football jersey
3. Prioritize mobile experience with responsive layout
4. Create visual hierarchy between featured and regular posts

**Current Implementation:**
- Component receives `posts` array from Sanity via `getAllPosts()`
- Client-side category filtering with `useState`
- Basic image + title + excerpt + date card structure
- No featured post treatment
- Fixed 3-column grid

**Constraints:**
- Must maintain existing props interface (`posts: Post[]`)
- Must preserve client-side category filtering
- Must work with existing Sanity schema (no backend changes)
- Must follow style guide colors: Primary (#00576B), Secondary (#E65C6B), Background (#F5F2EB)

## Goals / Non-Goals

**Goals:**
- Create featured post with dark card treatment matching HeroSection
- Implement mobile-first responsive grid (1→2→3 columns)
- Add subtle texture overlay to white cards
- Improve card hover effects with lift animation
- Apply warm gradient background
- Style category badges with navy/red pill design
- Ensure accessibility (contrast, keyboard navigation)

**Non-Goals:**
- No changes to Sanity schema or data structure
- No changes to URLs or routing
- No server-side pagination (keeping existing client-side approach)
- No new dependencies (using existing Tailwind, Radix UI)
- No changes to article detail page (`/news/[slug]`) in this change

## Decisions

### Decision 1: Featured Post Implementation

**Choice:** First post in array gets featured treatment with dark card

**Rationale:**
- Simplicity: No need for additional Sanity field to mark "featured"
- Automatic: Most recent post is naturally most relevant
- Consistent with HeroSection: Already uses `posts[0]` as featured

**Alternatives Considered:**
- Sanity "featured" boolean field → Rejected: Adds complexity, requires CMS changes
- Manual selection → Rejected: Not scalable for community news workflow
- Random rotation → Rejected: Confusing for users, loses recency signal

### Decision 2: Texture Pattern Approach

**Choice:** SVG pattern as CSS background-image with low opacity (3-4%)

**Rationale:**
- Lightweight: No image files to load
- Scalable: Works at any resolution
- Performant: No additional HTTP requests
- Subtle: At low opacity, adds depth without distraction

**Implementation:**
```css
background-image: url('data:image/svg+xml,...'); /* brush-stroke pattern */
opacity: 0.04;
```

### Decision 3: Responsive Breakpoints

**Choice:** Mobile-first with breakpoints at 640px (sm) and 1024px (lg)

**Layout:**
- Mobile (<640px): 1 column, featured full-width
- Tablet (640-1024px): 2 columns, featured full-width
- Desktop (>1024px): 3 columns, featured full-width

**Rationale:**
- Standard Tailwind breakpoints
- Feature post always prominent
- Easy thumb-scroll on mobile

### Decision 4: Card Styling

**Choice:** Match HeroSection gateway cards with enhanced effects

**Implementation:**
```css
/* Regular cards */
background: rgba(255,255,255,0.75);
border: 1px solid rgba(0,87,107,0.1);
border-radius: 1.5rem; /* rounded-3xl */
backdrop-filter: blur(8px);

/* Hover */
transform: translateY(-4px);
box-shadow: 0 12px 40px rgba(0,87,107,0.1);
border-color: rgba(230,92,107,0.2);
```

### Decision 5: Category Filter on Mobile

**Choice:** Horizontal scrolling pills (not dropdown)

**Rationale:**
- Visibility: All categories visible without extra tap
- Familiar: Standard mobile pattern
- Current code already has pill buttons - just need horizontal scroll wrapper

## Risks / Trade-offs

### Risk: Featured post may not always be most important
**Mitigation:** Future enhancement could add Sanity "featured" field. Current approach prioritizes recency which matches community news patterns.

### Risk: Texture pattern may affect performance
**Mitigation:** Using inline SVG data URI (no HTTP request). Opacity at 4% minimizes rendering impact.

### Risk: Horizontal scroll on mobile category filters may be hidden
**Mitigation:** Add subtle scroll hint (first category partially cut off on right, or fade gradient on edges).

### Trade-off: No lazy loading for images
**Current state:** Images load immediately. Future enhancement could add Intersection Observer for performance.

### Trade-off: Client-side filtering only
**Current state:** All posts loaded, filtered in browser. Acceptable for typical news volume (<50 posts). Would need server-side pagination if volume grows significantly.
