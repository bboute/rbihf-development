## Purpose

Provide families, players and coaches with concise, editor-maintained age-group information and practical resources for the U14, U15 and U16 Talent Pool stages.

## ADDED Requirements

### Requirement: Consistent stage structure

The system SHALL present U14, U15 and U16 using the main Talent Pool hub's visual language and the ordered sections hero, stage overview, staff and contact, documents and updates, and events. Empty optional sections SHALL be omitted without changing the order of remaining sections. Stage navigation and the link back to the overview SHALL remain available.

#### Scenario: Complete stage page
- **WHEN** a visitor opens a supported category with all content populated
- **THEN** the page displays the sections in the specified order with events as the final content section
- **AND** the visitor can navigate between the three stages or return to the Talent Pool overview

#### Scenario: Unsupported stage
- **WHEN** a visitor opens an unsupported age group or a category without a published record
- **THEN** the page returns not found

### Requirement: Editor-maintained concise content

Editors SHALL be able to maintain the hero introduction, stage purpose, intended audience, player experience, hero media and title for each age group through its existing Talent Pool category record without changing application code. The page SHALL avoid duplicate pathway explanations and generic staff-role descriptions.

#### Scenario: Published content update
- **WHEN** an editor updates and publishes the description and overview fields for U15
- **THEN** the U15 page displays that content after the site's normal content refresh
- **AND** U14 and U16 retain their own content

#### Scenario: Existing category without new fields
- **WHEN** a published category has not yet been populated with new overview fields
- **THEN** the page still renders its hero, navigation and events
- **AND** any transitional overview copy is concise and does not invent commitments or staffing

### Requirement: Named staff and one shared contact

Editors SHALL be able to publish staff names and roles and one optional shared team contact for each stage. Only complete named staff entries SHALL be shown. The entire staff/contact section SHALL remain hidden until at least one complete staff entry is available. No hypothetical staff or placeholder contact SHALL be displayed.

#### Scenario: Staff and contact available
- **WHEN** complete staff entries and a shared team contact are published
- **THEN** the section shows the names, roles and one actionable shared contact

#### Scenario: No real staff populated
- **WHEN** no complete staff entries exist, even if a contact is populated
- **THEN** the entire staff/contact section and its section link are absent

#### Scenario: Staff without shared contact
- **WHEN** complete staff entries exist but no shared contact is published
- **THEN** the staff list is visible without a contact placeholder

### Requirement: Age-group-specific documents and updates

The page SHALL display only public documents and news associated with the current age group. Each feed SHALL be hidden independently when empty. Resource links SHALL remain functional, and documents SHALL be public guidance or blank templates rather than completed personal forms.

#### Scenario: Category-scoped resources
- **WHEN** a visitor opens U14
- **THEN** all displayed documents and news include U14 among their associated age groups
- **AND** documents associated with multiple age groups remain available to each applicable group

#### Scenario: Optional feed is empty
- **WHEN** the current category has documents but no news
- **THEN** documents appear and the news section and its section link are absent

### Requirement: Existing events experience is preserved

The page SHALL preserve the existing category-scoped event list behavior, chronological ordering, detail links, confirmed/provisional labels and configured event-label copy. Events SHALL remain the final content section even when other feeds are present.

#### Scenario: Events available
- **WHEN** events are associated with the current stage
- **THEN** the existing event information and interactions remain available at the bottom of the page
- **AND** the redesign does not introduce new date filtering that removes previously listed events

#### Scenario: No events available
- **WHEN** no events are associated with the current stage
- **THEN** the events section remains visible with an explicit empty-state message

### Requirement: Responsive and accessible navigation

The stage pages SHALL remain readable on mobile and desktop, with semantic headings, usable links and section navigation that targets only rendered sections.

#### Scenario: Mobile page navigation
- **WHEN** a visitor opens any supported stage on a narrow viewport
- **THEN** the content has no horizontal overflow
- **AND** section links reach their visible targets without being obscured by the page header
