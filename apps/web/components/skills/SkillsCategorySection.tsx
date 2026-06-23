"use client";

import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface Skill {
  name: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  mastery?: number;
}

interface SkillsCategorySectionProps {
  category: string;
  description: string;
  skills: Skill[];
  categoryColor?: string;
  showMastery?: boolean;
  onSkillClick?: (skill: Skill) => void;
  className?: string;
}

const categoryColorMap = {
  skating: "from-blue-500 to-cyan-500",
  puck: "from-green-500 to-emerald-500",
  shooting: "from-red-500 to-orange-500",
  passing: "from-purple-500 to-pink-500",
  tactical: "from-indigo-500 to-blue-500",
  physical: "from-yellow-500 to-amber-500",
  mental: "from-gray-500 to-slate-500",
};

const levelConfig = {
  beginner: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Beginner",
    icon: "⏰",
  },
  intermediate: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Intermediate",
    icon: "📈",
  },
  advanced: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    label: "Advanced",
    icon: "⭐",
  },
  expert: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    label: "Expert",
    icon: "🏆",
  },
};

export function SkillsCategorySection({
  category,
  description,
  skills,
  categoryColor,
  showMastery = true,
  onSkillClick,
  className,
}: SkillsCategorySectionProps): React.JSX.Element {
  const gradientClass =
    categoryColor ||
    categoryColorMap[category.toLowerCase() as keyof typeof categoryColorMap] ||
    "from-gray-500 to-slate-500";

  return (
    <div
      className={cn(
        "bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm",
        className,
      )}
    >
      {/* Category Header */}
      <div className={cn("bg-gradient-to-r text-white p-6", gradientClass)}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{category}</h2>
            <p className="text-white/90 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
          <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
            {skills.length} Skills
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((skill, index) => {
            const config = levelConfig[skill.level];

            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:shadow-lg hover:shadow-gray-100 hover:border-gray-300 cursor-pointer"
                onClick={() => onSkillClick?.(skill)}
              >
                {/* Skill Header */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                      config.color,
                    )}
                  >
                    <span>{config.icon}</span>
                    {config.label}
                  </div>

                  {showMastery && skill.mastery !== undefined && (
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Progress</div>
                      <div className="text-sm font-bold text-gray-900">
                        {skill.mastery}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Skill Content */}
                <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {skill.description}
                </p>

                {/* Progress Bar */}
                {showMastery && skill.mastery !== undefined && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500 ease-out",
                          skill.level === "beginner" &&
                            "bg-gradient-to-r from-green-400 to-green-500",
                          skill.level === "intermediate" &&
                            "bg-gradient-to-r from-blue-400 to-blue-500",
                          skill.level === "advanced" &&
                            "bg-gradient-to-r from-purple-400 to-purple-500",
                          skill.level === "expert" &&
                            "bg-gradient-to-r from-amber-400 to-amber-500",
                        )}
                        style={{ width: `${skill.mastery}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-6 h-1.5 rounded-full transition-all duration-200",
                          i < (skill.mastery || 0) / 33
                            ? "bg-primary"
                            : "bg-gray-200",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">
                    Click to explore →
                  </span>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-xl" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
