## 1. Section Background Setup

- [x] 1.1 Update NewsSection container with warm gradient background matching HeroSection (radial-gradient with navy/red/yellow tones)
- [x] 1.2 Add subtle brush-stroke texture overlay as inline SVG data URI at 4% opacity

## 2. Featured Post Component

- [x] 2.1 Extract first post from posts array as featuredPost
- [x] 2.2 Create featured post dark card with #111111 background and rounded-[2rem]
- [x] 2.3 Add gradient overlay to featured card with Belgian colors (red/yellow tones)
- [x] 2.4 Implement featured post image container with aspect-video ratio and gradient overlay for text
- [x] 2.5 Add category badge with navy/coral red pill styling (rounded-full, bg-primary/10 or bg-secondary/10)
- [x] 2.6 Display featured post title, excerpt, and formatted date
- [x] 2.7 Add "Read More" and "View All News" buttons with rounded-full styling
- [x] 2.8 Handle case when featured post has no image (show placeholder/solid background)

## 3. Regular Card Component

- [x] 3.1 Update card container to use rounded-3xl border-radius
- [x] 3.2 Apply white/75 background with backdrop-blur
- [x] 3.3 Add subtle texture overlay to card background at 3% opacity
- [x] 3.4 Implement hover effect with -translate-y-1 lift and enhanced shadow
- [x] 3.5 Update card border to use primary/10 color with hover state change to secondary/20
- [x] 3.6 Style category badges with navy/red pill design matching featured post

## 4. Responsive Grid Layout

- [x] 4.1 Implement mobile-first grid: 1 column default, sm:2 columns, lg:3 columns
- [x] 4.2 Ensure featured post spans full width above the grid
- [x] 4.3 Update filteredPosts logic to exclude featured post from regular grid (slice from index 1)
- [x] 4.4 Add consistent gap-6 between grid cards
- [x] 4.5 Verify cards have equal width in multi-column layouts

## 5. Category Filter Enhancement

- [x] 5.1 Wrap category filter buttons in horizontally scrollable container for mobile
- [x] 5.2 Add overflow-x-auto and pb-2 for scroll hint on mobile
- [x] 5.3 Keep flex-wrap for tablet/desktop breakpoints
- [x] 5.4 Ensure button touch targets are minimum 44px height

## 6. News Archive Page (/news)

- [ ] 6.1 Apply same section background styling to /news/page.tsx
- [ ] 6.2 Update card styling to match NewsSection regular cards
- [ ] 6.3 Apply responsive grid layout (same 1→2→3 columns)
- [ ] 6.4 Add page header with consistent styling

## 7. Testing & Verification

- [ ] 7.1 Test responsive layout at 375px, 768px, and 1440px viewports
- [ ] 7.2 Verify featured post displays correctly with and without image
- [ ] 7.3 Verify category filtering works correctly (featured post excluded from filter logic OR always shown)
- [ ] 7.4 Test card hover effects on desktop
- [ ] 7.5 Test horizontal scroll of category filters on mobile
- [ ] 7.6 Verify accessibility: color contrast, keyboard navigation, screen reader labels
- [ ] 7.7 Run `pnpm lint` and `pnpm typecheck` to verify no errors
