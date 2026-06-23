"use client";

import React from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";

interface SkillCardProps {
  skill: string;
  description?: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  mastery?: number; // 0-100
  isCompleted?: boolean;
  showProgress?: boolean;
  onViewDrills?: () => void;
  className?: string;
}

const levelConfig = {
  beginner: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Beginner",
    bgGradient: "from-green-50 to-emerald-50",
    icon: "⏰",
  },
  intermediate: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Intermediate",
    bgGradient: "from-blue-50 to-cyan-50",
    icon: "📈",
  },
  advanced: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    label: "Advanced",
    bgGradient: "from-purple-50 to-indigo-50",
    icon: "⭐",
  },
  expert: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    label: "Expert",
    bgGradient: "from-amber-50 to-orange-50",
    icon: "🏆",
  },
};

export function SkillCard({
  skill,
  description,
  level,
  mastery = 0,
  isCompleted = false,
  showProgress = true,
  onViewDrills,
  className,
}: SkillCardProps): React.JSX.Element {
  const config = levelConfig[level];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br transition-all duration-200 hover:shadow-lg hover:shadow-gray-100 hover:border-gray-300",
        config.bgGradient,
        isCompleted && "ring-2 ring-green-500 ring-opacity-20",
        className,
      )}
    >
      {/* Completion Badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
            ✓
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Level Badge */}
        <div className="mb-4 flex items-center justify-between">
          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
              config.color,
            )}
          >
            <span>{config.icon}</span>
            {config.label}
          </div>

          {showProgress && (
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Progress</div>
              <div className="text-sm font-semibold text-gray-900">
                {mastery}%
              </div>
            </div>
          )}
        </div>

        {/* Skill Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {skill}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Progress Bar */}
        {showProgress && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Skill Mastery</span>
              <span>{mastery}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out",
                  level === "beginner" &&
                    "bg-gradient-to-r from-green-400 to-green-500",
                  level === "intermediate" &&
                    "bg-gradient-to-r from-blue-400 to-blue-500",
                  level === "advanced" &&
                    "bg-gradient-to-r from-purple-400 to-purple-500",
                  level === "expert" &&
                    "bg-gradient-to-r from-amber-400 to-amber-500",
                )}
                style={{ width: `${mastery}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        {onViewDrills && (
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDrills}
            className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
          >
            View Drills & Exercises
          </Button>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </div>
  );
}
