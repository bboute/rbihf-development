## Context

The current Talent Pool surface mixes three different ideas into one generic elite-program narrative:
- federation scouting and long-term preparation
- club-led weekly development
- national-team selection and performance

This creates a messaging gap across the public landing page, homepage summaries, category pages, and skills pages. The actual federation intent is more specific. Talent Pool exists to identify promising players in Belgium, give them shared concepts and experiences that support future national-team integration, and provide international exposure while clubs continue to carry the heaviest development load.

The change affects multiple content layers:
- homepage and gateway summaries that introduce Talent Pool
- Talent Pool landing page positioning
- category pages for U14, U15, U16, and later stages
- category skills pages that currently use generic elite terminology
- Sanity-backed category content that currently only stores title, slug, description, and media

The design therefore needs to solve both information architecture and content governance. It is not enough to change copy in one page; the pathway meaning needs a repeatable model.

## Goals / Non-Goals

**Goals:**
- Clarify that Talent Pool supports long-term national-team preparation without claiming ownership of primary player development.
- Define distinct age-stage purposes for U14, U15, and U16.
- Create a public narrative that shows how Talent Pool relates to clubs and national teams.
- Establish a reusable page structure for the Talent Pool landing page and age-category pages.
- Define where stage-specific content should live so future editorial updates can remain accurate.

**Non-Goals:**
- Implement the website changes in this design artifact.
- Redesign the broader federation IA outside the Talent Pool surfaces.
- Define internal coaching curriculum details for public publication.
- Create a complete multilingual editorial model in the same change.

## Decisions

### Decision: Position Talent Pool as a preparation layer, not a standalone elite academy
The public message will define Talent Pool as the federation layer between club development and national-team selection.

Rationale:
- This matches the stated purpose more closely than the current elite-program framing.
- It reduces the risk of implying that the federation replaces club work.
- It makes the progression toward future national teams clearer to parents and players.

Alternatives considered:
- Keep the current elite-development framing. Rejected because it flattens the distinction between Talent Pool and national teams.
- Position Talent Pool mainly as a scouting program. Rejected because it underplays the developmental and social preparation role.

### Decision: Give each stage a distinct narrative job
The category pages will not be treated as the same template with harder wording at older ages. Each stage needs a different purpose:
- U14: first federation contact, belonging, team building, introduction to shared concepts
- U15: international exposure, tournament rhythm, learning against other countries, strengthening shared concepts
- U16: development checkpoint, systems application, identifying players progressing toward future U18 national-team level
- U18 and U20: later performance and selection stages can remain connected, but the core narrative emphasis belongs on the earlier pipeline that prepares them

Rationale:
- The user story describes real developmental differences, not just age increments.
- This produces clearer public pages and more useful editorial guidance.

Alternatives considered:
- Keep one generic "development pillars" model for every category. Rejected because it does not reflect the actual pathway logic.

### Decision: Use a two-layer content model for public messaging
The design separates:
- public pathway explanation: why the stage exists, what families should expect, what experiences players receive
- internal coaching depth: systems, terminology, and training details that may belong in protected or later content

Rationale:
- Public users need clarity, not full tactical detail.
- Coaches may need more detail than should appear in the public layer.

Alternatives considered:
- Put all system-level detail directly on public pages. Rejected because it risks overexposure and weakens page clarity.
- Keep everything generic in public and reserve all meaning for internal tools. Rejected because it hides the actual value of the pathway.

### Decision: Standardize the page structure around pathway meaning rather than only skills
The landing page should follow this structure:
1. Positioning statement: what Talent Pool is and is not
2. Pathway diagram: clubs to Talent Pool to national teams
3. Stage overview: U14, U15, U16, U18, U20 with distinct purpose summaries
4. Federation versus clubs section: who owns what part of development
5. International exposure and event rhythm section
6. Next actions for parents, players, and coaches

Each age-category page should follow this structure:
1. Stage purpose
2. What players experience in this stage
3. What concepts are introduced or reinforced
4. How this stage connects to future national-team preparation
5. Events or international exposure relevant to the stage
6. Links to related updates, resources, or protected deeper material

Rationale:
- This aligns the information architecture with the real product story.
- It gives implementation a repeatable pattern across categories.

Alternatives considered:
- Continue using skills-heavy pages as the primary narrative surface. Rejected because skills alone do not explain why the stage exists.

### Decision: Treat structured stage content as a future editorial concern, but allow an initial implementation in code
The first implementation can still use code-defined content if that is fastest, but the design explicitly treats stage-specific purpose, expectations, and pathway messaging as likely candidates for future structured content.

Rationale:
- The current Sanity model is too thin for the pathway story.
- Forcing an immediate schema expansion may slow the first public clarification.
- Naming this as a future editorial boundary avoids locking the site into generic hardcoded messaging again.

Alternatives considered:
- Move all pathway narrative into Sanity immediately. Rejected for initial scope because the immediate need is clarity, not a full CMS redesign.

## Risks / Trade-offs

- [Public pages may still sound too generic] -> Anchor every stage around its explicit purpose before describing skills or performance.
- [The federation-versus-club boundary may remain blurry] -> Add a dedicated comparison section that states clubs handle the heaviest weekly development load.
- [U18 and U20 may feel underdefined compared with U14-U16] -> Accept lighter treatment initially and focus the first narrative pass on the earlier preparation stages.
- [Hardcoded copy may drift again] -> Document which stage-purpose fields should become structured content in a follow-up change.
- [Public exposure of systems language may create confusion] -> Keep public references conceptual and reserve full tactical detail for deeper or protected materials.