"use client";

import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface ProgressionPhase {
  phase: string;
  skills: string[];
  timeframe?: string;
  focus?: string;
}

interface SkillProgressionTimelineProps {
  phases: ProgressionPhase[];
  currentPhase?: number;
  className?: string;
}

export function SkillProgressionTimeline({
  phases,
  currentPhase = 0,
  className,
}: SkillProgressionTimelineProps): React.JSX.Element {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20" />

      <div className="space-y-12">
        {phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="relative">
            {/* Timeline Node */}
            <div className="absolute left-6 flex items-center justify-center">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all duration-200",
                  phaseIndex <= currentPhase
                    ? "bg-primary border-primary shadow-lg shadow-primary/25"
                    : "bg-white border-gray-300",
                )}
              />
            </div>

            {/* Phase Content */}
            <div className="ml-16 pb-8">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Phase Header */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {phase.phase}
                    </h3>
                    <div className="flex items-center gap-2">
                      {phase.timeframe && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          {phase.timeframe}
                        </span>
                      )}
                      <span
                        className={cn(
                          "px-2 py-1 text-xs font-medium rounded-full",
                          phaseIndex <= currentPhase
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600",
                        )}
                      >
                        {phaseIndex < currentPhase
                          ? "Completed"
                          : phaseIndex === currentPhase
                            ? "Current"
                            : "Upcoming"}
                      </span>
                    </div>
                  </div>
                  {phase.focus && (
                    <p className="text-sm text-gray-600">{phase.focus}</p>
                  )}
                </div>

                {/* Skills Grid */}
                <div className="p-6">
                  <div className="grid gap-3 md:grid-cols-2">
                    {phase.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={cn(
                          "group flex items-start gap-3 p-4 rounded-lg border transition-all duration-200",
                          phaseIndex <= currentPhase
                            ? "bg-green-50 border-green-200 hover:bg-green-100"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100",
                        )}
                      >
                        {/* Skill Status */}
                        <div className="flex-shrink-0 mt-0.5">
                          {phaseIndex < currentPhase ? (
                            <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                              ✓
                            </div>
                          ) : phaseIndex === currentPhase ? (
                            <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {skillIndex + 1}
                            </div>
                          ) : (
                            <div className="w-5 h-5 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                              {skillIndex + 1}
                            </div>
                          )}
                        </div>

                        {/* Skill Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 leading-relaxed">
                            {skill}
                          </p>

                          {/* Progress Indicators */}
                          <div className="mt-2 flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "w-6 h-1.5 rounded-full transition-all duration-200",
                                  phaseIndex < currentPhase ||
                                    (phaseIndex === currentPhase &&
                                      i <= skillIndex / 2)
                                    ? "bg-green-400"
                                    : "bg-gray-200",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
