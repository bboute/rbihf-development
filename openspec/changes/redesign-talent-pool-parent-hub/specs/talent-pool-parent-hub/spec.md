## ADDED Requirements

### Requirement: Families can plan the Talent Pool season
The system SHALL present Talent Pool events in a year-planner view and SHALL allow users to filter the view by All, U14, U15, or U16.

#### Scenario: Parent filters the planner
- **WHEN** a parent selects an age group
- **THEN** only events associated with that age group are shown

#### Scenario: Event date is provisional
- **WHEN** an event has provisional status
- **THEN** the planner labels it as provisional and visually distinguishes it from confirmed events

### Requirement: Families can find Talent Pool updates
The system SHALL show recent Talent Pool news associated with U14-U16 and apply the active age-group filter.

#### Scenario: Parent selects U15
- **WHEN** a parent selects U15
- **THEN** the news section shows posts associated with U15

### Requirement: Public documents are downloadable
The system SHALL provide public blank forms and guidance documents with category, age-group applicability, season, and publication metadata.

#### Scenario: Parent downloads a school document
- **WHEN** a public school absence document is available
- **THEN** the parent can identify its purpose and download the current file

#### Scenario: Sensitive information is handled
- **WHEN** a family completes a medical or consent form
- **THEN** the public hub does not accept or store the completed document

### Requirement: Talent Pool scope is U14-U16
The system SHALL present U14, U15, and U16 as the only Talent Pool stages and SHALL treat U18 and U20 as National Teams stages.

#### Scenario: User opens a later-stage Talent Pool URL
- **WHEN** a user requests a U18 or U20 Talent Pool category page
- **THEN** the system does not present that stage as Talent Pool content

### Requirement: Program explanation remains concise
The system SHALL explain how Talent Pool works, including club and federation responsibilities, without requiring families to read the full stage curriculum.

#### Scenario: Parent scans the overview
- **WHEN** a parent views the hub
- **THEN** they can understand the program model and reach stage details without scanning a long narrative page

### Requirement: Talent Pool pages share one visual system
The system SHALL use a consistent visual language across the Talent Pool hub, U14-U16 stage pages, and their skills pages.

#### Scenario: User moves from overview to stage detail
- **WHEN** a user follows a stage link from the Talent Pool hub
- **THEN** the destination preserves the same hero treatment, typography, palette, spacing, and information hierarchy