## ADDED Requirements

### Requirement: News grid adapts to viewport size

The news grid SHALL display posts in a responsive layout that changes based on viewport width.

#### Scenario: Mobile layout (viewport < 640px)
- **WHEN** the viewport width is less than 640px
- **THEN** the news grid SHALL display cards in a single column
- **AND** each card SHALL span the full width of the container
- **AND** the featured post (if present) SHALL appear before the grid

#### Scenario: Tablet layout (viewport 640px - 1024px)
- **WHEN** the viewport width is between 640px and 1024px
- **THEN** the news grid SHALL display cards in 2 columns
- **AND** cards SHALL have equal width
- **AND** there SHALL be consistent gap between cards (1.5rem / gap-6)

#### Scenario: Desktop layout (viewport >= 1024px)
- **WHEN** the viewport width is 1024px or greater
- **THEN** the news grid SHALL display cards in 3 columns
- **AND** cards SHALL have equal width
- **AND** there SHALL be consistent gap between cards (1.5rem / gap-6)

### Requirement: Cards display consistently across breakpoints

Each news card SHALL have consistent styling across all viewport sizes.

#### Scenario: Card structure
- **WHEN** a news card renders
- **THEN** it SHALL display the post image (if available)
- **AND** it SHALL display the category badge (if available)
- **AND** it SHALL display the post title
- **AND** it SHALL display the publication date
- **AND** it SHALL use rounded-3xl border-radius

#### Scenario: Card hover effect (desktop only)
- **WHEN** user hovers over a news card on desktop (viewport >= 1024px)
- **THEN** the card SHALL translate upward by 4px (hover:-translate-y-1)
- **AND** the card SHALL show an enhanced shadow
- **AND** the transition SHALL take 300ms

### Requirement: Category filter buttons are accessible on mobile

The category filter buttons SHALL be horizontally scrollable on mobile for touch accessibility.

#### Scenario: Category filter on mobile
- **WHEN** the viewport width is less than 640px
- **THEN** category filter buttons SHALL be in a horizontally scrollable container
- **AND** the container SHALL not hide horizontal scrollbar
- **AND** buttons SHALL have minimum touch target of 44px height

#### Scenario: Category filter on desktop
- **WHEN** the viewport width is 640px or greater
- **THEN** category filter buttons SHALL wrap to multiple lines if needed
- **AND** buttons SHALL not require horizontal scrolling

### Requirement: Section background uses warm gradient

The news section background SHALL use a warm gradient matching the HeroSection aesthetic.

#### Scenario: Section background rendering
- **WHEN** the news section renders
- **THEN** the background SHALL use a radial gradient with warm beige tones
- **AND** a subtle texture overlay SHALL be applied at low opacity (4%)
- **AND** the texture SHALL not interfere with text readability

### Requirement: Grid excludes featured post from regular cards

When a featured post is displayed, it SHALL NOT also appear in the regular grid.

#### Scenario: No duplicate featured post
- **WHEN** the first post is displayed as featured
- **THEN** the regular news grid SHALL start from the second post
- **AND** the featured post SHALL NOT appear twice on the page
