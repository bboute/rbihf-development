import React from "react";
import { notFound } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { getTalentPoolCategoryBySlug } from "@/lib/sanityClient";
import { SkillOverviewCard } from "@/components/skills/SkillOverviewCard";
import { TeachingProgressionTimeline } from "@/components/skills/TeachingProgressionTimeline";
import { getTalentPoolStageContent } from "@/lib/talentPool";

interface SkillsPageProps {
  params: Promise<{
    category: string;
  }>;
}

interface TalentPoolSkillsData {
  title: string;
  ageRange: string;
  description: string;
  essentialSkills: Array<{
    category: string;
    icon: string;
    description: string;
    skills: string[];
    priority: "primary" | "secondary" | "foundational";
  }>;
  developmentProgression: Array<{
    phase: string;
    timeframe: string;
    focus: string;
    skills: string[];
    teachingTips?: string[];
  }>;
}

const skillsByAge: Record<string, TalentPoolSkillsData> = {
  u14: {
    title: "U14 Skill Focus",
    ageRange: "Under 14 years",
    description:
      "Skills that support first federation contact, team building, and the first shared concepts in the pathway.",
    essentialSkills: [
      {
        category: "Skating Excellence",
        icon: "⚡",
        description: "Advanced skating techniques for speed and agility",
        priority: "primary",
        skills: [
          "Explosive crossovers both directions",
          "Advanced edge control and balance",
          "Multi-directional transitions",
          "Speed development techniques",
        ],
      },
      {
        category: "Puck Mastery",
        icon: "🎯",
        description: "Advanced puck control and precision skills",
        priority: "primary",
        skills: [
          "Advanced stickhandling patterns",
          "Puck control in tight spaces",
          "Deking and faking moves",
          "Accurate passing under pressure",
        ],
      },
      {
        category: "Shooting & Scoring",
        icon: "🏒",
        description: "Goal scoring techniques and shot variety",
        priority: "secondary",
        skills: [
          "Wrist shot accuracy and power",
          "Snap shot development",
          "Backhand shooting technique",
          "Shooting while in motion",
        ],
      },
      {
        category: "Game Intelligence",
        icon: "🧠",
        description: "Tactical awareness and decision making",
        priority: "foundational",
        skills: [
          "Reading developing plays",
          "Positional awareness",
          "Quick decision making",
          "Supporting teammates effectively",
        ],
      },
    ],
    developmentProgression: [
      {
        phase: "Phase 1: Technical Refinement",
        timeframe: "Months 1-4",
        focus: "Perfecting individual skill techniques for competitive play",
        skills: [
          "Crossover technique refinement for maximum efficiency",
          "Advanced stickhandling patterns including figure-8s and tight control",
          "Shooting technique development focusing on accuracy before power",
          "Passing precision under time pressure",
          "Edge control for quick direction changes",
        ],
        teachingTips: [
          "Focus on perfect technique over speed initially",
          "Use video analysis to help players see improvements",
          "Create competitive drills to simulate game pressure",
          "Emphasize muscle memory through repetition",
        ],
      },
      {
        phase: "Phase 2: Game Application",
        timeframe: "Months 5-7",
        focus: "Applying refined skills in competitive game situations",
        skills: [
          "1v1 and 2v2 situational play with advanced skills",
          "Reading and reacting to defensive pressure",
          "Combining skills fluidly (skating + stickhandling + passing)",
          "Positional play understanding in offensive and defensive zones",
          "Quick transitions between defense and offense",
        ],
        teachingTips: [
          "Use small-area games to create more touches and decisions",
          "Stop play to highlight good skill application",
          "Encourage creativity while maintaining team structure",
          "Focus on decision-making speed",
        ],
      },
      {
        phase: "Phase 3: Competitive Integration",
        timeframe: "Months 8-10",
        focus:
          "Consistent skill execution in high-pressure competitive situations",
        skills: [
          "Maintaining skill level under competitive pressure",
          "Leadership and communication during play",
          "Adapting skills to different game situations and opponents",
          "Mental preparation and focus techniques",
          "Understanding team systems and individual roles",
        ],
        teachingTips: [
          "Simulate high-pressure situations in practice",
          "Teach mental preparation routines",
          "Focus on consistency over flashy plays",
          "Develop pre-game mental preparation habits",
        ],
      },
    ],
  },
  u16: {
    title: "U16 Skill Focus",
    ageRange: "Under 16 years",
    description:
      "Skill priorities that help players connect their club development to stronger systems understanding and future U18 projection.",
    essentialSkills: [
      {
        category: "Elite Skating",
        icon: "🚀",
        description: "Professional-level skating techniques",
        priority: "primary",
        skills: [
          "Mohawk turns and complex transitions",
          "Explosive first-step quickness",
          "High-speed maneuvering and control",
          "Advanced stopping and starting techniques",
        ],
      },
      {
        category: "Advanced Skills",
        icon: "⭐",
        description: "Complex skill execution under pressure",
        priority: "primary",
        skills: [
          "Advanced deking sequences",
          "Between-the-legs and specialty moves",
          "One-touch passing and receiving",
          "Quick-release shooting techniques",
        ],
      },
      {
        category: "Tactical Systems",
        icon: "📋",
        description: "Team systems and strategic play",
        priority: "secondary",
        skills: [
          "Forechecking and backchecking systems",
          "Power play and penalty kill positioning",
          "Breakout patterns and execution",
          "Defensive zone coverage",
        ],
      },
      {
        category: "Leadership & Mental",
        icon: "🎖️",
        description: "Mental game and leadership development",
        priority: "foundational",
        skills: [
          "On-ice leadership and communication",
          "Mental preparation routines",
          "Pressure management techniques",
          "Goal setting and self-evaluation",
        ],
      },
    ],
    developmentProgression: [
      {
        phase: "Phase 1: Elite Skill Development",
        timeframe: "Months 1-4",
        focus: "Mastering advanced techniques for elite-level competition",
        skills: [
          "Complex skating patterns including mohawks and advanced transitions",
          "Specialty moves and advanced deking sequences for beating defenders",
          "One-timer shooting technique with proper timing",
          "Advanced passing including saucer passes and bank passes",
          "High-speed puck control and decision making",
        ],
        teachingTips: [
          "Demand perfection in technique before increasing speed",
          "Use competitive situations to test skill retention",
          "Encourage players to develop signature moves",
          "Focus on skill execution under fatigue",
        ],
      },
      {
        phase: "Phase 2: System Integration",
        timeframe: "Months 5-7",
        focus: "Understanding and executing team systems at high tempo",
        skills: [
          "Forechecking systems (1-2-2, 2-1-2) with proper timing",
          "Power play execution including player movement and rotation",
          "Penalty kill positioning and communication",
          "Breakout patterns under pressure with multiple options",
          "Defensive zone coverage and support positioning",
        ],
        teachingTips: [
          "Use full-ice drills to practice systems",
          "Emphasize communication and timing",
          "Create pressure situations to test system knowledge",
          "Video analysis of successful system execution",
        ],
      },
      {
        phase: "Phase 3: Elite Competition",
        timeframe: "Months 8-10",
        focus: "Performing at elite level with consistency and leadership",
        skills: [
          "Consistent performance in high-stakes competitions",
          "Adapting systems based on opponents and game situations",
          "Leading teammates through communication and example",
          "Mental preparation for elite-level competition",
          "Self-evaluation and continuous improvement mindset",
        ],
        teachingTips: [
          "Simulate championship-level pressure in practice",
          "Develop individual pre-game routines",
          "Focus on leadership development through responsibility",
          "Encourage self-analysis and goal setting",
        ],
      },
    ],
  },
  u18: {
    title: "U18 Skill Focus",
    ageRange: "Under 18 years",
    description:
      "Performance-oriented skills that build on the earlier pathway and support sharper national-team demands.",
    essentialSkills: [
      {
        category: "Professional Skills",
        icon: "🏆",
        description: "Elite-level technical and tactical skills",
        priority: "primary",
        skills: [
          "Position-specific advanced techniques",
          "Consistent skill execution under any pressure",
          "Creative playmaking and problem-solving",
          "Advanced team play and chemistry",
        ],
      },
      {
        category: "Mental Mastery",
        icon: "🎯",
        description: "Elite mental game and psychological skills",
        priority: "primary",
        skills: [
          "Pressure performance and clutch situations",
          "Focus and concentration for full games",
          "Confidence and self-belief development",
          "Resilience and bounce-back ability",
        ],
      },
      {
        category: "Leadership Excellence",
        icon: "👑",
        description: "On-ice and off-ice leadership capabilities",
        priority: "secondary",
        skills: [
          "Vocal and by-example leadership styles",
          "Motivating and supporting teammates",
          "Game management and situational awareness",
          "Mentoring younger players",
        ],
      },
      {
        category: "Professional Preparation",
        icon: "📈",
        description: "Readiness for next-level opportunities",
        priority: "foundational",
        skills: [
          "Professional training habits and discipline",
          "Nutrition and recovery protocols",
          "Media interaction and communication",
          "Career pathway planning and networking",
        ],
      },
    ],
    developmentProgression: [
      {
        phase: "Phase 1: Elite Performance Standards",
        timeframe: "Months 1-4",
        focus:
          "Establishing professional-level performance standards and consistency",
        skills: [
          "Position-specific elite techniques tailored to individual strengths",
          "Consistent performance regardless of external pressure or conditions",
          "Advanced game reading and anticipation skills",
          "Leadership through performance and example setting",
          "Professional preparation routines and habits",
        ],
        teachingTips: [
          "Set professional-level standards for all activities",
          "Focus on consistency over peak performance",
          "Develop individual performance analytics",
          "Emphasize preparation as performance predictor",
        ],
      },
      {
        phase: "Phase 2: Advanced Competition",
        timeframe: "Months 5-8",
        focus:
          "Competing at highest levels with advanced tactical understanding",
        skills: [
          "Advanced tactical adjustments during games based on opponent analysis",
          "Leadership in high-pressure championship situations",
          "Mentoring and developing younger players on the team",
          "Media responsibilities and professional representation",
          "Advanced physical and mental preparation protocols",
        ],
        teachingTips: [
          "Create leadership opportunities and responsibilities",
          "Use advanced statistics and video analysis",
          "Focus on in-game adjustments and adaptation",
          "Prepare for professional-level scrutiny and pressure",
        ],
      },
      {
        phase: "Phase 3: Next-Level Preparation",
        timeframe: "Months 9-12",
        focus:
          "Final preparation for college, junior, or professional opportunities",
        skills: [
          "Showcase performance in high-visibility competitions and events",
          "Advanced networking and relationship building in hockey community",
          "Academic and hockey balance for student-athletes",
          "Professional communication with scouts, coaches, and agents",
          "Long-term career planning and pathway decision-making",
        ],
        teachingTips: [
          "Focus on showcase events and visibility opportunities",
          "Develop professional communication skills",
          "Emphasize academic excellence alongside hockey",
          "Create connections with next-level opportunities",
        ],
      },
    ],
  },
};

export default async function TalentPoolSkillsOverview({
  params,
}: SkillsPageProps): Promise<React.JSX.Element> {
  const { category } = await params;
  const categoryData = await getTalentPoolCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  const skillsData = skillsByAge[category.toLowerCase()];
  const stageContent = getTalentPoolStageContent(category) ?? {
    summary: categoryData.description,
    stagePurpose: categoryData.description,
    playerExperience:
      "This stage builds on the club environment and adds federation reference points over time.",
    concepts:
      "The public pathway explains concepts at a high level while deeper coaching detail stays separate.",
    futureConnection:
      "The stage remains part of the long-term progression toward future national-team environments.",
  };

  if (!skillsData) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <Button variant="outline" asChild>
              <a
                href={`/talentpools/${category}`}
                className="inline-flex items-center gap-2"
              >
                ← Back to {categoryData.title}
              </a>
            </Button>
          </div>
          <div className="text-center bg-white rounded-2xl p-16 shadow-sm border border-gray-200">
            <div className="text-6xl mb-6">🚧</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Detailed Skill Layer Coming Soon
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {stageContent.stagePurpose}
            </p>
            <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The public pathway for {categoryData.title} is already available, while the richer coaching-oriented skill breakdown for this stage is still being prepared.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-8">
            <Button variant="secondary" asChild>
              <a
                href={`/talentpools/${category}`}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                ← Back to {categoryData.title}
              </a>
            </Button>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span>🧭</span>
              Talent Pool Pathway Skills
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {skillsData.title}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90">
              {skillsData.ageRange}
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              {skillsData.description}
            </p>
            <p className="mt-4 text-base text-white/75 max-w-3xl mx-auto leading-relaxed">
              Clubs remain the base for weekly development. This overview shows which skill areas matter in the federation pathway and how they support later national-team preparation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How skills fit this stage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Public pathway meaning comes first: why the stage exists, what players experience, and which concepts the federation starts reinforcing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Stage purpose</h3>
              <p className="text-gray-600 leading-relaxed">{stageContent.stagePurpose}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Player experience</h3>
              <p className="text-gray-600 leading-relaxed">{stageContent.playerExperience}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Federation concepts</h3>
              <p className="text-gray-600 leading-relaxed">{stageContent.concepts}</p>
            </div>
          </div>
        </section>

        {/* Essential Skills Overview */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Skill categories in this stage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These are the visible skill priorities that support the pathway story for this stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.essentialSkills.map((skillCategory, index) => (
              <SkillOverviewCard
                key={index}
                category={skillCategory.category}
                icon={skillCategory.icon}
                skills={skillCategory.skills}
                description={skillCategory.description}
                priority={skillCategory.priority}
              />
            ))}
          </div>
        </section>

        {/* Development Progression Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How development builds through this stage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Progression remains gradual. The pathway reinforces what clubs build and adds federation context over time.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <TeachingProgressionTimeline
              phases={skillsData.developmentProgression}
            />
          </div>
        </section>

        {/* Pathway Reading Guide */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How to read this overview
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                This page stays public-facing. It explains the stage at a high level without trying to replace the deeper coaching layer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🎯
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Club Foundation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Clubs keep owning the weekly training base, repetition, and match development that make this stage possible.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🧠
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Federation Layer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Talent Pool adds shared concepts, reference points, and experiences that help future national-team integration feel more familiar.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🚀
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Future Connection
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {stageContent.futureConnection}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Need the deeper coaching layer?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              This overview explains the public pathway. Coaching implementation, video examples, and richer systems detail belong in coach-facing resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <a href="/portal/videos">Coach Videos</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="text-lg px-8"
              >
                <a href={`/talentpools/${category}`}>
                  Back to {categoryData.title}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
