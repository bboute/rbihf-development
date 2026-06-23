## ADDED Requirements

### Requirement: Featured post displays prominently with dark card styling

The first post in the news array SHALL be displayed as a featured article with a dark background card (#111111), matching the HeroSection featured card style.

#### Scenario: Featured post renders with dark card
- **WHEN** the news section loads with at least one post
- **THEN** the first post SHALL be displayed in a dark card with background color #111111
- **AND** the dark card SHALL have a border-radius of 2rem (rounded-[2rem])
- **AND** the dark card SHALL have a gradient overlay with Belgian colors (red, yellow tones)

#### Scenario: Featured post spans full width
- **WHEN** the news section renders on any viewport size
- **THEN** the featured post card SHALL span the full width of the container
- **AND** remaining posts SHALL be displayed in a grid below the featured post

### Requirement: Featured post displays image with overlay

The featured post SHALL display its image prominently with a gradient overlay for text readability.

#### Scenario: Featured post with image
- **WHEN** the featured post has an image URL
- **THEN** the image SHALL be displayed at the top of the card
- **AND** the image SHALL have an aspect ratio of 16:9 (aspect-video)
- **AND** the image SHALL have a gradient overlay for text contrast

#### Scenario: Featured post without image
- **WHEN** the featured post has no image URL
- **THEN** the featured card SHALL still render with the title and excerpt
- **AND** a placeholder or solid color background SHALL be shown in the image area

### Requirement: Featured post includes category badge

The featured post SHALL display its category as a pill badge.

#### Scenario: Featured post with category
- **WHEN** the featured post has at least one category
- **THEN** the first category SHALL be displayed as a pill badge
- **AND** the badge SHALL have navy (#00576B) or coral red (#E65C6B) styling
- **AND** the badge SHALL use rounded-full border-radius

### Requirement: Featured post shows publication date

The featured post SHALL display its publication date.

#### Scenario: Date formatting
- **WHEN** the featured post has a publishedAt date
- **THEN** the date SHALL be formatted as "MMM D, YYYY" (e.g., "Jun 1, 2026")
- **AND** the date SHALL use UTC timezone for consistency

### Requirement: Featured post links to article detail

The featured post SHALL provide navigation to the full article.

#### Scenario: Click featured post
- **WHEN** user clicks on the featured post card or its "Read More" button
- **THEN** the application SHALL navigate to `/news/{slug}`
- **WHERE** slug is the post's slug.current value
