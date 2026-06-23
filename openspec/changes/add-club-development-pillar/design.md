# Design: Add Club Development Pillar

## Overview
Club Development will become a top-level public pillar that explains what good youth hockey delivery should look like in every Belgian club. It will connect the existing fundamentals and curriculum concepts into one understandable system with separate entry points for public audiences and portal users.

## Product Model
The public information architecture should evolve toward:
- Academy
- Talent Pool
- National Teams
- Club Development

Find a Club should no longer act as a peer pillar. It should become either:
- a supporting call to action within Club Development for families, or
- a utility entry point in the wider navigation

## Audience Model
Club Development should present one shared framework through multiple audience lenses.

### Coaches
Need to know:
- what to teach at each age
- how to structure practices
- how much instruction versus play is appropriate
- minimum staffing and helper needs on the ice

### Club Leaders
Need to know:
- minimum operational standards
- staffing expectations by age group
- equipment and session setup expectations
- what a baseline development environment should provide

### Parents
Need to know:
- what development should look like at each age
- what good sessions feel like
- what to expect from a club
- how to interpret progression without over-focusing on results

### Helpers and Volunteers
Need to know:
- what support roles look like on the ice
- how to assist safely and effectively
- where they fit in the delivery model

## Content Structure
Club Development should be organized around a public overview and age-specific subpages.

### Public Overview
The landing page should explain:
- why the framework exists
- the federation development philosophy
- that every child deserves the basics done right
- the age-band pathway
- the role-specific entry points
- the next step to find a club or access deeper resources

### Age-Band Pages
Each age band should answer the same core questions:
1. What should players learn at this age?
2. What should practices look like at this age?
3. How many coaches and helpers are minimally needed?
4. What standards should clubs meet?
5. What should parents expect?

Suggested age bands:
- U7-U8
- U9-U10
- U11-U12
- U13-U14
- U15+

### Standards Sections
Shared standards content should cover:
- practice design principles
- station-based delivery and touches per session
- player-to-coach or player-to-helper ratios
- minimum safety and supervision requirements
- communication expectations for families

## Integration With Existing Surfaces
The design should align existing surfaces rather than duplicate them.

### Existing Public Content
Current fundamentals pages can become age-band or pathway detail pages under Club Development.

### Existing Portal Content
Portal curriculum pages can become the deeper implementation layer for coaches.
Portal club-growth content can support club leaders and staff.

### Existing Club Finder
The clubs page should remain available, but be reframed as an action step after the user understands the development model.

## Navigation Impact
Top-level navigation, hero gateway cards, and homepage messaging should be updated to reflect Club Development as a pillar. Supporting copy should explain that this area defines how RBIHF wants youth hockey delivered across clubs.

## Content and Data Strategy
The first implementation can use existing static and Sanity-backed patterns already present in the repo. Content should be structured so that later work can move age-band messaging, standards, and audience-specific guidance into Sanity if editorial control becomes necessary.

### Initial Delivery Decisions
- Club Development landing-page messaging, standards, and audience framing are implemented in code for speed and consistency.
- Existing fundamental category data, media, and descriptions continue to come from Sanity.
- The standards model is implemented as a public minimum baseline, not a certification or tiered maturity program.
- Localization is deferred to a future pass once the app has a dedicated translation layer and a decision on whether pillar content lives in code or Sanity.

## Rollout Approach
A pragmatic rollout should happen in phases.

### Phase 1
- Introduce Club Development in homepage and navigation
- Reframe fundamentals content under the new pillar
- Define one consistent public pathway model

### Phase 2
- Add age-band templates with practice, staffing, and parent sections
- Link to deeper portal curriculum resources

### Phase 3
- Expand standards, downloads, and role-specific guidance
- Consider editorial and localization improvements if needed

## Risks
- The pillar may become too broad if age-pathway, standards, parent education, and coach resources are all mixed without clear hierarchy.
- Find a Club may lose visibility if moved without a strong replacement CTA.
- Existing fundamentals and portal content may overlap unless there is a clear public-versus-implementation distinction.

## Success Criteria
- The site presents a coherent four-pillar model.
- Users can understand what Club Development is within a few seconds.
- Coaches, parents, and club leaders can each find relevant guidance.
- Age-based expectations are visible and easy to compare.
- Find a Club remains accessible but no longer carries the burden of representing the entire fourth pillar.

## Implemented In This Change
- Added a public Club Development landing page.
- Updated homepage and navigation to present Club Development as the fourth pillar.
- Reframed Find a Club as a supporting family action rather than the peer pillar label.
- Added Club Development route wrappers over the existing fundamentals age-band and skills pages.
- Expanded age-band pages with practice setup, staffing minimums, club standards, and parent expectations.
- Added a portal curriculum hub and aligned portal copy with the Club Development model.
