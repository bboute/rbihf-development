## Why

The current Latest News section uses a basic 3-column grid layout that lacks visual hierarchy and mobile responsiveness. For a community-focused platform serving Belgian hockey parents, coaches, and players, the news section needs to better highlight important announcements and provide a modern, scannable experience that works seamlessly on mobile devices where most users will access it.

This redesign aligns with the existing HeroSection's premium aesthetic and incorporates subtle texture elements inspired by the Belgian national team jersey, creating a cohesive Belgian identity throughout the platform.

## What Changes

- **Featured post treatment**: The most recent/important article gets prominent display in a dark card matching HeroSection style
- **Mobile-first responsive layout**: Single column on mobile, 2 columns on tablet, 3 columns on desktop
- **Subtle texture overlay**: Light brush-stroke pattern on white cards inspired by Belgian jersey fabric
- **Enhanced card design**: Rounded corners (rounded-3xl), lift hover effects, better shadows
- **Category badge styling**: Navy (#00576B) and coral red (#E65C6B) pill badges
- **Warm gradient background**: Matches HeroSection's radial gradient treatment
- **Improved typography hierarchy**: Clearer distinction between featured and regular posts
- **Better image treatment**: Consistent aspect ratios, subtle texture overlay

## Capabilities

### New Capabilities

- `news-featured-post`: Featured article display with dark card styling and prominent visual treatment
- `news-responsive-grid`: Mobile-first responsive grid layout (1→2→3 columns)

### Modified Capabilities

- None (this is a visual/design change, no spec-level behavior changes)

## Impact

**Files Modified:**
- `apps/web/components/sections/NewsSection.tsx` - Complete redesign of component
- `apps/web/app/news/page.tsx` - Apply consistent styling to full news archive page
- `apps/web/components/dashboard/NewsWidget.tsx` - Optional: update styling for consistency

**Design System:**
- Introduces subtle texture pattern for use across platform
- Establishes news section as a reference pattern for future card-based sections

**No Breaking Changes:**
- Existing props interface remains compatible
- Sanity schema unchanged
- URLs and routing unchanged
