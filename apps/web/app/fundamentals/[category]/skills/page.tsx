"use client";

import { use, type JSX } from "react";
import { SkillOverviewCard } from "@/components/skills/SkillOverviewCard";
import { TeachingProgressionTimeline } from "@/components/skills/TeachingProgressionTimeline";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

interface SkillsPageProps {
  params: Promise<{
    category: string;
  }>;
}

interface SkillsOverviewData {
  title: string;
  subtitle: string;
  introduction: string;
  essentialSkills: Array<{
    category: string;
    icon: string;
    description: string;
    skills: string[];
    priority: "primary" | "secondary" | "foundational";
  }>;
  teachingProgression: Array<{
    phase: string;
    timeframe: string;
    focus: string;
    skills: string[];
    teachingTips?: string[];
  }>;
}

const skillsData: Record<string, SkillsOverviewData> = {
  u8: {
    title: "U8 Fundamentals",
    subtitle: "Introduction to Ice Hockey",
    introduction:
      "Building foundation through fun, movement-based activities that develop coordination and basic hockey skills.",
    essentialSkills: [
      {
        category: "Balance & Movement",
        icon: "⛸️",
        description: "Core balance and basic movement skills on ice",
        priority: "primary",
        skills: [
          "Standing balance on skates",
          "Forward gliding with confidence",
          "Backward movement basics",
          "Falling and getting up safely",
        ],
      },
      {
        category: "Stick & Puck",
        icon: "🏒",
        description: "Introduction to stick handling and puck control",
        priority: "primary",
        skills: [
          "Proper stick grip and stance",
          "Stationary puck touches",
          "Simple puck retrieval",
          "Basic puck pushing",
        ],
      },
      {
        category: "Coordination",
        icon: "🤸",
        description: "Body coordination and spatial awareness",
        priority: "foundational",
        skills: [
          "Hand-eye coordination games",
          "Body awareness exercises",
          "Simple direction following",
          "Balance challenges",
        ],
      },
      {
        category: "Game Concepts",
        icon: "🎯",
        description: "Basic understanding of hockey through play",
        priority: "secondary",
        skills: [
          "Following simple instructions",
          "Sharing ice space",
          "Basic starting and stopping",
          "Fun team activities",
        ],
      },
    ],
    teachingProgression: [
      {
        phase: "Phase 1: Ice Comfort & Balance",
        timeframe: "Months 1-2",
        focus: "Getting comfortable on ice through fun activities and games",
        skills: [
          "Marching in place on ice to build balance",
          "Supported gliding with coach or parent assistance",
          "Two-foot glides starting from boards",
          "Simple balance games (Simon Says, Red Light/Green Light)",
          "Learning to fall safely and get back up",
        ],
        teachingTips: [
          "Use plenty of encouragement and positive reinforcement",
          "Keep activities short (5-7 minutes) to match attention spans",
          "Incorporate familiar games adapted for ice",
          "Focus on fun rather than perfect technique",
        ],
      },
      {
        phase: "Phase 2: Movement & Confidence",
        timeframe: "Months 3-4",
        focus: "Building movement confidence and basic puck introduction",
        skills: [
          "Independent two-foot glides for longer distances",
          "Basic stopping using snowplow method",
          "Introduction to stick handling (stationary)",
          "Simple direction changes while gliding",
          "Group activities and basic games",
        ],
        teachingTips: [
          "Celebrate small victories and progress",
          "Use visual cues and demonstrations",
          "Group activities build social skills",
          "Introduce equipment gradually",
        ],
      },
      {
        phase: "Phase 3: Basic Skills Development",
        timeframe: "Months 5-8",
        focus: "Developing fundamental skills and game understanding",
        skills: [
          "Basic forward skating with arm movement",
          "Simple backward movement",
          "Puck handling while stationary",
          "Basic shooting motion",
          "Understanding boundaries and basic rules",
        ],
        teachingTips: [
          "Use age-appropriate explanations",
          "Incorporate storytelling into activities",
          "Allow plenty of free play time",
          "Focus on effort over results",
        ],
      },
    ],
  },
  u10: {
    title: "U10 Skills Development",
    subtitle: "Building Hockey Fundamentals",
    introduction:
      "Developing core skating and puck skills through structured practice and small-area games.",
    essentialSkills: [
      {
        category: "Skating Fundamentals",
        icon: "⛸️",
        description: "Forward and backward skating with improved technique",
        priority: "primary",
        skills: [
          "Forward skating with proper stride",
          "Backward skating basics",
          "Hockey stops (both sides)",
          "Quick starts and acceleration",
        ],
      },
      {
        category: "Puck Skills",
        icon: "🏒",
        description: "Basic puck handling and shooting techniques",
        priority: "primary",
        skills: [
          "Stationary puck handling",
          "Puck handling while moving slowly",
          "Basic wrist shot technique",
          "Simple passing and receiving",
        ],
      },
      {
        category: "Game Awareness",
        icon: "👁️",
        description: "Understanding space, teammates, and basic strategy",
        priority: "foundational",
        skills: [
          "Looking up while handling puck",
          "Finding open space",
          "Basic positioning concepts",
          "Communication with teammates",
        ],
      },
      {
        category: "Physical Skills",
        icon: "💪",
        description: "Strength, coordination, and body control",
        priority: "secondary",
        skills: [
          "Balance during movement",
          "Change of direction",
          "Body positioning",
          "Spatial awareness",
        ],
      },
    ],
    teachingProgression: [
      {
        phase: "Phase 1: Skating Foundation",
        timeframe: "Months 1-3",
        focus: "Establishing proper skating mechanics and balance",
        skills: [
          "Forward skating with full stride extension",
          "Two-foot stops progressing to hockey stops",
          "Backward skating with confidence",
          "Basic crossover introduction",
          "Agility through simple cone courses",
        ],
        teachingTips: [
          "Focus on proper knee bend and posture",
          "Use wall support for backward skating initially",
          "Break down hockey stops into steps",
          "Encourage full stride extension",
        ],
      },
      {
        phase: "Phase 2: Puck Introduction",
        timeframe: "Months 4-6",
        focus: "Developing comfort and control with the puck",
        skills: [
          "Stationary puck handling (forehand/backhand)",
          "Moving with puck at slow pace",
          "Simple passing against boards",
          "Basic shooting form development",
          "Puck retrieval and protection basics",
        ],
        teachingTips: [
          "Start without pressure, add complexity gradually",
          "Use smaller practice areas for better control",
          "Emphasize soft hands and puck feel",
          "Practice both forehand and backhand equally",
        ],
      },
      {
        phase: "Phase 3: Game Application",
        timeframe: "Months 7-12",
        focus: "Applying skills in game-like situations",
        skills: [
          "Skating and puck handling combined",
          "Passing and receiving on the move",
          "Basic 1v1 and 2v1 situations",
          "Understanding offensive/defensive concepts",
          "Small area games and scrimmages",
        ],
        teachingTips: [
          "Use small area games for maximum touches",
          "Encourage decision making",
          "Keep explanations simple and visual",
          "Focus on fun through games and competition",
        ],
      },
    ],
  },
  u12: {
    title: "U12 Skill Advancement",
    subtitle: "Technical Development & Game Understanding",
    introduction:
      "Advanced skill development with emphasis on technical proficiency and tactical awareness in game situations.",
    essentialSkills: [
      {
        category: "Advanced Skating",
        icon: "⛸️",
        description: "Refined skating with speed and agility",
        priority: "primary",
        skills: [
          "Powerful forward skating",
          "Confident backward skating",
          "Crossovers (forward/backward)",
          "Tight turns and transitions",
        ],
      },
      {
        category: "Puck Mastery",
        icon: "🏒",
        description: "Advanced puck control and shooting",
        priority: "primary",
        skills: [
          "Dynamic puck handling",
          "Accurate passing (forehand/backhand)",
          "Various shot types",
          "Puck protection in traffic",
        ],
      },
      {
        category: "Tactical Awareness",
        icon: "🧠",
        description: "Reading the game and making smart decisions",
        priority: "foundational",
        skills: [
          "Reading defensive pressure",
          "Support positioning",
          "Transition play understanding",
          "Basic systems knowledge",
        ],
      },
      {
        category: "Competitive Edge",
        icon: "🏆",
        description: "Mental toughness and competitive skills",
        priority: "secondary",
        skills: [
          "Battle skills along boards",
          "Checking preparation",
          "Leadership development",
          "Pressure situation management",
        ],
      },
    ],
    teachingProgression: [
      {
        phase: "Phase 1: Technical Refinement",
        timeframe: "Months 1-4",
        focus: "Perfecting fundamental techniques with increased speed",
        skills: [
          "Explosive starts and acceleration",
          "Advanced stopping and starting techniques",
          "Mohawk and other advanced turns",
          "Edge control and balance",
          "Power skating fundamentals",
        ],
        teachingTips: [
          "Video analysis for technique improvement",
          "Focus on efficiency of movement",
          "Individual skill corrections",
          "Increase tempo progressively",
        ],
      },
      {
        phase: "Phase 2: Skill Integration",
        timeframe: "Months 5-8",
        focus: "Combining skills under increasing pressure and speed",
        skills: [
          "High-speed puck handling",
          "Passing while under pressure",
          "Shooting in stride and from various angles",
          "1v1, 2v1, 2v2 battle drills",
          "Transition between offense and defense",
        ],
        teachingTips: [
          "Add defensive pressure gradually",
          "Use competition to motivate improvement",
          "Focus on decision-making speed",
          "Emphasize quick skill execution",
        ],
      },
      {
        phase: "Phase 3: Game Mastery",
        timeframe: "Months 9-12",
        focus: "Advanced game situations and tactical development",
        skills: [
          "Complex passing plays and systems",
          "Advanced offensive and defensive strategies",
          "Specialty team concepts (power play/penalty kill)",
          "Leadership and communication skills",
          "High-pressure game situations",
        ],
        teachingTips: [
          "Use game film for tactical learning",
          "Encourage creative play within structure",
          "Develop multiple solutions to game problems",
          "Foster competitive mentality and resilience",
        ],
      },
    ],
  },
};

export default function SkillsPage({ params }: SkillsPageProps): JSX.Element {
  const resolvedParams = use(params);
  const { category } = resolvedParams;

  const data = skillsData[category];

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Skills Overview Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The skills overview for this category is not available yet.
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/club-development">Back to Club Development</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-muted/20 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mb-6">
              <Button
                variant="outline"
                asChild
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link
                  href={`/club-development/${category}`}
                  className="inline-flex items-center gap-2"
                >
                  ← Back to {data.title} Overview
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {data.title}
            </h1>
            <h2 className="text-xl md:text-2xl text-secondary mb-6">
              {data.subtitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {data.introduction}
            </p>

            {/* Trust Indicators */}
            <div className="bg-primary/5 rounded-lg p-4 mb-8 border border-primary/10 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-6 text-sm text-primary">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span className="font-medium">
                    Age-Appropriate Progression
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span className="font-medium">Expert Teaching Methods</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href={`/portal/curriculum/${category}`}>
                  <span className="mr-2">🎥</span>
                  View Curriculum Hub
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="/portal/coaching-resources">
                  <span className="mr-2">👨‍🏫</span>
                  Access Coaching Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* Essential Skills Grid */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Essential Skills for Coaches & Parents
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Understanding what your player will learn and how to support
                their development journey
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.essentialSkills.map((skill, index) => (
                <SkillOverviewCard
                  key={index}
                  category={skill.category}
                  icon={skill.icon}
                  description={skill.description}
                  skills={skill.skills}
                  priority={skill.priority}
                />
              ))}
            </div>
          </section>

          {/* Teaching Progression */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Teaching Progression for Coaches
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Structured development pathway with proven teaching methods and
                timeline expectations
              </p>
            </div>
            <TeachingProgressionTimeline phases={data.teachingProgression} />
          </section>

          {/* Action Section */}
          <section className="bg-muted/30 rounded-xl p-8 text-center border border-primary/10">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Start Your Player's Development Journey
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access detailed coaching videos, progression tracking tools, and
              expert support to help your player master these fundamental
              skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/sign-in">Get Coach Access</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link href={`/club-development/${category}`}>Back to Overview</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
