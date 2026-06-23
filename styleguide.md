# Belgian Ice Hockey Talent Pool Program - Design Style Guide

## Brand Identity

### Brand Voice & Tone

- **Community-focused**: Emphasize belonging, inclusivity, and shared growth
- **Approachable**: Professional yet welcoming, accessible to families
- **Supportive**: Encouraging development and celebrating progress
- **Authentic**: Genuine passion for Belgian ice hockey development
- **Educational**: Focus on informing coaches and parents about development pathways

### Brand Values

- Excellence through fundamentals
- Community building and teamwork
- Player development at every level
- Belgian ice hockey pride
- Transparent development pathways

## Target Audience & User Experience

### Primary Audiences

- **Coaches (60%)**: Need pathway information, skill progressions, development resources
- **Parents (35%)**: Seeking understanding of player development, program benefits, next steps
- **Players (5%)**: Secondary audience, content should be accessible but coach/parent-focused

### Educational Content Strategy

- **Lead with Value**: Start with "what will my player achieve?"
- **Show Pathways**: Clear progression from current level to next milestone
- **Use Data**: Include skill benchmarks, success rates, development timelines
- **Build Trust**: Coach credentials, parent testimonials, transparent processes
- **Clear Next Steps**: Always provide actionable next steps for enrollment/participation

### Content Hierarchy for Coach/Parent Education

1. **Problem Recognition**: Current skill level assessment
2. **Solution Awareness**: How our pathway addresses their needs
3. **Consideration**: Comparison with other programs/approaches
4. **Decision**: Clear enrollment process and expectations

## Color Palette

### Primary Colors

```css
/* Primary - Deep Teal/Navy */
--primary: #00576b;
--primary-foreground: #ffffff;

/* Secondary - Coral Red */
--secondary: #e65c6b;
--secondary-foreground: #ffffff;

/* Tertiary - Bright Teal */
--tertiary: #007b8f;
--tertiary-foreground: #ffffff;
```

### Neutral Colors

```css
/* Background - Warm Beige */
--background: #f5f2eb;

/* Foreground - Near Black */
--foreground: #1a1a1a;

/* Muted Text */
--muted-foreground: #a0a0a0;

/* Borders */
--border: #a0a0a0;
```

### Usage Guidelines

- **Primary (#00576B)**: Main CTAs, headings, brand elements, pathway indicators
- **Secondary (#E65C6B)**: Accent elements, success highlights, achievement badges
- **Tertiary (#007B8F)**: Supporting elements, links, progress indicators
- **Background (#F5F2EB)**: Page background, card backgrounds
- **Foreground (#1A1A1A)**: Body text, dark headers

## Typography

### Font Families

- **Primary**: Geist (Sans-serif) - Body text, UI elements
- **Monospace**: Geist Mono - Code, technical content

### Heading Hierarchy

```css
h1 {
  @apply text-4xl md:text-5xl font-bold tracking-tight;
}
h2 {
  @apply text-3xl md:text-4xl font-bold tracking-tight;
}
h3 {
  @apply text-2xl md:text-3xl font-bold tracking-tight;
}
h4 {
  @apply text-xl md:text-2xl font-bold tracking-tight;
}
h5 {
  @apply text-lg md:text-xl font-bold tracking-tight;
}
h6 {
  @apply text-base md:text-lg font-bold tracking-tight;
}
```

### Typography Usage for Educational Content

- **Headlines**: Use primary color (#00576B) for pathway titles
- **Subheadings**: Use muted-foreground for skill descriptions
- **Body Text**: Standard foreground color with good contrast
- **Emphasis**: Use font-bold or primary color for key concepts
- **Success Metrics**: Use secondary color for achievements and progress

### Font Sizes & Responsive Scaling

- Large screens: Larger text sizes (5xl, 4xl, 3xl)
- Mobile devices: Smaller but readable sizes (4xl, 3xl, 2xl)
- Always include responsive scaling (text-xl md:text-2xl)

## Layout & Spacing

### Container System

```css
/* Standard content width */
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Section spacing */
.section {
  @apply py-16;
}

/* Card spacing */
.card-content {
  @apply p-6;
}

/* Educational panel spacing */
.info-panel {
  @apply p-8 space-y-6;
}
```

### Grid Systems

- **3-column**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **2-column**: `grid-cols-1 md:grid-cols-2`
- **Gap spacing**: `gap-8` for cards, `gap-4` for smaller elements
- **Pathway spacing**: `gap-12` for timeline components

### Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `md:` (≥ 768px)
- **Large**: `lg:` (≥ 1024px)

## Components

### Buttons

#### Primary Button (Main CTAs)

```jsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  View Our Pathway
</Button>
```

#### Outline Button (Secondary Actions)

```jsx
<Button
  variant="outline"
  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
>
  Download Requirements
</Button>
```

#### Call-to-Action Hierarchy

1. **Primary**: "View Our Pathway" / "Assess My Player's Level"
2. **Secondary**: "Download Skill Requirements" / "Schedule Evaluation"
3. **Tertiary**: "Contact a Coach" / "Join Information Session"

#### Button Sizes

- **Default**: `h-10 px-6 py-2`
- **Small**: `h-8 px-3` (sm variant)
- **Large**: `h-12 px-8` (lg variant)

### Cards

#### Standard Card Structure

```jsx
<div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
  <div className="aspect-video bg-muted relative overflow-hidden">
    {/* Image or placeholder */}
  </div>
  <div className="p-6">{/* Content */}</div>
</div>
```

#### Educational Information Cards

```jsx
<div className="bg-muted/20 rounded-lg p-6 border border-primary/10">
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h4 className="font-bold text-primary mb-2">For Parents</h4>
      <p className="text-muted-foreground mb-4">{parentInfo}</p>
      <Button variant="outline" size="sm">
        Learn More
      </Button>
    </div>
  </div>
</div>
```

#### Card Hover Effects

- `hover:shadow-md` - Subtle shadow increase
- `hover:scale-105` - Slight image scaling on image hover
- `transition-shadow` - Smooth shadow transitions

### Navigation

#### Header

- Background: `#1A1A1A` (dark)
- Height: `h-16`
- Text: White with transparency variations
- Sticky positioning: `sticky top-0 z-50`

#### Navigation Links

- Default: `text-white/60`
- Hover: `text-white/80`
- Smooth transitions: `transition-colors`

## Educational Component Patterns

### Pathway Visualization

```jsx
// Progress Timeline Component
<div className="relative">
  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
  {stages.map((stage, index) => (
    <div key={stage.id} className="relative flex items-center mb-8">
      <div
        className={`
        absolute left-0 w-8 h-8 rounded-full border-4 border-background
        ${stage.completed ? "bg-primary" : "bg-muted"}
      `}
      ></div>
      <div className="ml-12">
        <h4 className="font-bold text-primary">{stage.title}</h4>
        <p className="text-muted-foreground">{stage.description}</p>
        <div className="mt-2 text-sm text-tertiary">{stage.duration}</div>
      </div>
    </div>
  ))}
</div>
```

### Skill Assessment Cards

```jsx
<div className="bg-card border-l-4 border-primary rounded-lg p-6">
  <div className="flex justify-between items-start mb-4">
    <h4 className="font-bold text-lg">{skill.name}</h4>
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        skill.level === "beginner"
          ? "bg-secondary/10 text-secondary"
          : skill.level === "intermediate"
            ? "bg-tertiary/10 text-tertiary"
            : "bg-primary/10 text-primary"
      }`}
    >
      {skill.level}
    </span>
  </div>
  <p className="text-muted-foreground mb-4">{skill.description}</p>

  {/* Progress indicator */}
  <div className="w-full bg-muted rounded-full h-2 mb-2">
    <div
      className="bg-primary h-2 rounded-full transition-all duration-500"
      style={{ width: `${skill.progress}%` }}
    ></div>
  </div>
  <div className="flex justify-between text-sm text-muted-foreground">
    <span>Current Level</span>
    <span>{skill.progress}% Complete</span>
  </div>
</div>
```

### Trust Building Elements

- **Progress Indicators**: Show completion status, next steps
- **Social Proof**: "127 players advanced to next level this season"
- **Certification Badges**: Display coaching qualifications, program accreditations
- **Success Metrics**: Visual progress tracking, before/after skill assessments

## Interactive Elements - Industry Best Practices

### Progressive Disclosure

- **Expandable Content**: Use accordion components for detailed skill requirements
- **Layered Information**: Overview → Details → Deep Dive pattern
- **Contextual Help**: Tooltip explanations for technical terms
- **Smart Defaults**: Show most relevant content first based on user type

### Micro-interactions (200ms standard)

```jsx
// Button interactions
.btn-primary {
  @apply transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98];
}

// Card hover states
.card-interactive {
  @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
}

// Loading states
.loading-skeleton {
  @apply animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted;
}
```

### Focus States

- Outline: `outline-ring/50`
- Ring: `focus-visible:ring-ring/50 focus-visible:ring-[3px]`
- Border: `focus-visible:border-ring`

### Loading States

- Use `animate-pulse` for skeleton loading
- Opacity reduction: `opacity-50` for disabled states

## Sections & Page Structure

### Hero Section

- Full viewport height: `min-h-screen`
- Centered content: `flex items-center justify-center`
- Background overlay: `bg-background/70` over video
- Text hierarchy: Large heading + subtext + CTA buttons

### Educational Content Sections

- Background options:
  - Default: transparent
  - Alternate: `bg-muted/30` for visual separation
  - Info panels: `bg-muted/20` with `border-primary/10`
- Padding: `py-16` standard
- Content centering: `text-center mb-12` for section intros

### Section Headers

```jsx
<div className="text-center mb-12">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">Section Title</h2>
  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
    Supporting description text
  </p>
</div>
```

## Icons & Graphics

### Icon Guidelines

- Use Lucide React icons for consistency
- Standard size: `w-5 h-5` or `size-4` utility
- Color: Inherit from parent text color
- Align with text baseline

### Educational Icons

- **Pathway**: Arrow right, chevron right for progression
- **Skills**: Target, check circle for achievements
- **Assessment**: Clipboard, bar chart for evaluation
- **Support**: Users, message circle for community

### Image Treatment

- Aspect ratios: `aspect-video` (16:9) for featured images
- Object fit: `object-cover` for consistent sizing
- Border radius: `rounded-lg` for cards, `rounded-md` for smaller elements

## Accessibility & Performance - Industry Standards

### WCAG 2.1 AA Compliance

- **Contrast Ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Color Independence**: Never rely on color alone for meaning
- **Keyboard Navigation**: Full tab order, skip links, focus indicators
- **Screen Reader Support**: Proper ARIA labels, semantic HTML structure

### Interactive Elements

- Minimum touch target: 44px (satisfied by button heights)
- Keyboard navigation support
- Screen reader friendly markup

### Performance Optimization

```css
/* Critical CSS inlined */
.above-fold {
  @apply font-sans text-foreground bg-background;
}

/* Progressive image loading */
.image-lazy {
  @apply opacity-0 transition-opacity duration-300;
}
.image-lazy.loaded {
  @apply opacity-100;
}
```

### Web Vitals Targets

- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5 seconds

### Mobile Optimization

- **Touch Targets**: Minimum 44x44px for interactive elements
- **Viewport Meta**: Properly configured responsive viewport
- **Performance Budget**: < 500KB initial page load

### Responsive Design

- Mobile-first approach
- Touch-friendly spacing
- Readable font sizes across devices

## Content Strategy for Coaches & Parents

### Information Architecture

1. **Entry Level Assessment**: "Where is my player now?"
2. **Pathway Overview**: "What's the complete journey?"
3. **Detailed Requirements**: "What exactly do they need to learn?"
4. **Timeline & Expectations**: "How long does each stage take?"
5. **Support Resources**: "How do we help them succeed?"

### Messaging Frameworks

#### For Parents

- **Emotional Connection**: "Help your child reach their potential"
- **Practical Benefits**: "Clear development pathway with measurable progress"
- **Community Aspect**: "Join other families committed to excellence"
- **Long-term Vision**: "Building skills that last beyond hockey"

#### For Coaches

- **Professional Development**: "Enhance your coaching effectiveness"
- **Resource Access**: "Comprehensive curriculum and training materials"
- **Peer Network**: "Connect with other dedicated coaches"
- **Player Success**: "See your players advance to higher levels"

### Trust Indicators

- Coach certifications and experience levels
- Player advancement statistics
- Parent and player testimonials
- Partnership with Hockey Belgium
- Transparent skill assessment criteria

## Usage Examples

### Homepage Hero Pattern

```jsx
<section className="relative min-h-screen flex items-center justify-center">
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
      Belgian Ice Hockey
      <span className="block text-primary mt-2">Talent Pool Program</span>
    </h1>
    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
      Developing the next generation through clear pathways and expert coaching
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
      <Button size="lg">View Our Pathway</Button>
      <Button variant="outline" size="lg">
        Coach Resources
      </Button>
    </div>
  </div>
</section>
```

### Educational Category Card Pattern

```jsx
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  {categories.map((category) => (
    <div
      key={category.id}
      className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img className="w-full h-full object-cover transition-transform hover:scale-105" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold text-primary">{category.title}</h3>
          <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {category.ageRange}
          </span>
        </div>
        <p className="text-muted-foreground mb-6">{category.description}</p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={category.pathwayUrl}>View Pathway</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href={category.skillsUrl}>Skill Requirements</Link>
          </Button>
        </div>
      </div>
    </div>
  ))}
</div>
```

## Dark Mode Support

The design system includes dark mode variants using CSS custom properties. Dark mode automatically adjusts:

- Background becomes dark (`oklch(0.145 0 0)`)
- Text becomes light (`oklch(0.985 0 0)`)
- Component backgrounds adapt accordingly
- Contrast ratios maintained

## Brand Applications

### Logo Usage

- Use "BTPP" abbreviation in headers
- Full "Belgian Ice Hockey Talent Pool Program" in hero sections
- Maintain proper spacing and sizing

### Photography Style

- Action shots of players in training/games
- Coach-player interaction moments
- Parent-child celebration moments
- Clean, well-lit imagery
- Consistent with community-focused values

### Content Tone for Educational Material

- Use inclusive language ("your player", "our community")
- Emphasize development and growth pathways
- Celebrate achievements at all levels
- Maintain professional yet approachable tone
- Focus on actionable information for coaches and parents

---

_This style guide should be referenced for all design and development decisions across the BTPP platform. Special attention should be paid to the educational content patterns when creating resources for coaches and parents._
