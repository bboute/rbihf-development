## Purpose

Allow editors to compose explanatory content using reusable sections while preserving recognizable page structure and the site's editorial visual language.

## ADDED Requirements

### Requirement: Ordered reusable content sections

Talent Pool, National Teams and stage/team pages SHALL support an optional ordered list of rich text, text/image, quote, steps, FAQ, callout and full-width image sections.

#### Scenario: An editor composes and reorders a page
- **WHEN** an editor adds, reorders or removes sections and publishes the page
- **THEN** the website displays the authored sections in that order on the next page load
- **AND** the same block options are available on both overview pages and all stage/team pages

### Requirement: Constrained responsive presentation

Sections MUST use established typography, containers and light/deep-green treatments. Text/image sections SHALL support image-left and image-right desktop layouts and a readable stacked mobile layout. Images MUST honor saved crop/hotspot selections.

#### Scenario: Text and image on mobile
- **WHEN** a published text/image section with image-left positioning is viewed on mobile
- **THEN** the text and image stack without horizontal overflow

#### Scenario: Quote and FAQ semantics
- **WHEN** quote and FAQ sections are published
- **THEN** the quote displays its attribution when supplied
- **AND** FAQ answers can be expanded using keyboard-accessible controls

### Requirement: Fixed anchors and operational content

Existing heroes, navigation and data-driven feeds MUST remain outside editor-managed sections. Talent Pool How we work MUST remain the first content section when populated, and its season calendar MUST be the last page section when events exist.

#### Scenario: Talent Pool has flexible and operational content
- **WHEN** introductory copy, flexible sections, news, documents and events are populated
- **THEN** How we work precedes the flexible sections
- **AND** the season calendar follows all other page sections
- **AND** operational records still come from their existing scoped sources

### Requirement: Optional content and valid inputs

Pages without content sections MUST retain their existing content without inserted placeholder blocks. Empty block bodies MUST NOT create empty sections. Studio MUST validate required content and image alt text, and links MUST reject executable or unsafe destinations.

#### Scenario: Existing document with no sections
- **WHEN** a previously published page has no content-sections field
- **THEN** no additional empty content area is rendered

#### Scenario: Unsafe content link
- **WHEN** a link contains an executable scheme or protocol-relative destination
- **THEN** Studio prevents publication of that invalid link
- **AND** the website does not render it as a clickable destination
