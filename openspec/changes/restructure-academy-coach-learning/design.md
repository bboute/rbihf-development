# Design: Restructure Academy Coach Learning

## Overview
Academy should be the digital extension of coach education, not an artificial replacement for in-person instruction. The website should explain qualification pathways, support existing course delivery, and provide extra learning material that helps coaches improve beyond the official course weekends.

## Product Role
Academy should answer:
- how coaches learn to deliver better youth hockey
- how current formal courses fit together
- where coaches can find extra topic-based learning

This creates a clean distinction with Club Development:
- Club Development explains what good youth hockey should look like.
- Academy explains how coaches learn to deliver it.

## Core Information Architecture
The Academy should be structured around five main areas:
- Overview
- Qualification Pathways
- Coaching Topics
- Video & Clinic Library
- Resources / Upcoming Courses

### Overview
The Academy landing page should explain that RBIHF Academy supports official coach education and ongoing practical learning. It should avoid broad audience framing such as players and parents as equal first-class tracks.

### Qualification Pathways
This branch should explain official learning progression.

Suggested structure:
- Learn to Play
- Level 1
- Level 2

Current pathway logic from exploration:
- Learn to Play: U8 to U12 context, combining trainer and coach basics
- Level 1: U14 to U16 context
- Level 2: U18+ context

Each pathway page should clarify:
- who it is for
- what stage of coaching it supports
- current delivery format
- preparation and follow-up material
- what progression comes next

### Coaching Topics
This branch should organize learning by practical coaching need rather than certification level.

Suggested topics:
- Running Practice with Kids
- Practice Design
- Teaching Skills
- Systems Teaching
- Body Checking / Contact
- Age-Specific Coaching
- Communication & Leadership

This branch is where specialist clinics and explanatory material belong.

### Video & Clinic Library
This branch should provide a browsing surface for:
- explanatory videos
- clinics
- featured learning items
- workshop recordings or supporting material

This area should work as a discovery surface for coaches who want topic-specific help without first navigating the formal pathway structure.

### Resources and Upcoming Courses
The Academy should also surface practical support around real-world in-person delivery:
- upcoming course weekends
- how registration works
- what to bring or prepare
- manuals and downloadable resources
- follow-up documents or companion material

## Navigation Model
Coaches should be able to browse Academy in two ways:

### By Pathway
- Learn to Play
- Level 1
- Level 2

### By Topic
- Practice Design
- Skills Teaching
- Systems Teaching
- Body Checking
- Age-Specific Coaching
- Leadership / Communication

This dual-browse model reflects real user behavior and avoids forcing all learning into a single hierarchy.

## Content Model Implications
The current guide model is too flat to fully support this Academy structure. Future content work will likely need richer distinctions such as:
- pathway item versus clinic versus video versus resource
- official versus optional learning
- topic tags
- delivery format
- stage or level relevance

That taxonomy expansion does not need to happen in the first Academy restructure, but the information architecture should anticipate it.

### Initial Delivery Decisions
- The first Academy version is implemented primarily in code so the information architecture can move faster than the current guide schema.
- Existing guide content remains useful as supporting portal material, but it does not yet model pathways, clinics, or library media cleanly enough to drive Academy on its own.
- The website supports current in-person course weekends rather than replacing them with full online delivery.
- Future structured content work should add distinctions for pathway pages, clinic content, video items, and support resources.

## Delivery Strategy
A phased delivery is appropriate.

### Phase 1
- Reframe the Academy page around coach education
- Present qualification pathways and practical coaching topics
- Position the site as support for current in-person delivery

### Phase 2
- Add topic pages, clinic pages, and explanatory video surfaces
- Improve taxonomy and browsing across pathway and topic dimensions

### Phase 3
- Expand into richer trainer and coach tracks if RBIHF formalizes separate pathways
- Consider deeper digital course experiences if course ownership and curriculum mature

## Risks
- Academy may overlap with Coaching Resources unless the boundary is clear.
- If in-person delivery remains primary, overpromising digital learning could mislead users.
- Flat guide taxonomy may constrain implementation until content types are clarified.

## Success Criteria
- Academy clearly reads as coach-first.
- Coaches can understand both the official pathway and the extra learning offer.
- The website supports current in-person course delivery without pretending to be a full LMS.
- Future trainer and coach branches remain possible without rebuilding the information architecture.

## Implemented In This Change
- Replaced the generic Academy placeholder with a coach-first landing page.
- Added structured qualification pathway content for Learn to Play, Level 1, and Level 2.
- Added Academy browsing by coaching topic.
- Added route surfaces for pathways, topics, library, course support, and resources.
- Aligned Coaching Resources portal wording with the Academy role.
