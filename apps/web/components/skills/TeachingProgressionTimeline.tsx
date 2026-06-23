"use client";

import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface TeachingPhase {
  phase: string;
  timeframe: string;
  focus: string;
  skills: string[];
  teachingTips?: string[];
}

interface TeachingProgressionTimelineProps {
  phases: TeachingPhase[];
  className?: string;
}

export function TeachingProgressionTimeline({
  phases,
  className,
}: TeachingProgressionTimelineProps): React.JSX.Element {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20" />

      <div className="space-y-8">
        {phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="relative">
            {/* Timeline Node */}
            <div className="absolute left-6 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />
            </div>

            {/* Phase Content */}
            <div className="ml-16">
              <div className="bg-muted/20 rounded-xl border border-primary/10 overflow-hidden">
                {/* Phase Header */}
                <div className="bg-primary/5 p-6 border-b border-primary/10">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary">
                      {phase.phase}
                    </h3>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
                      {phase.timeframe}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {phase.focus}
                  </p>
                </div>

                {/* Skills to Teach */}
                <div className="p-6">
                  <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Skills to Introduce & Develop
                  </h4>

                  <div className="grid gap-3 md:grid-cols-2">
                    {phase.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-primary/10"
                      >
                        <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                          {skillIndex + 1}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {skill}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Teaching Tips */}
                  {phase.teachingTips && phase.teachingTips.length > 0 && (
                    <div className="mt-6 p-4 bg-tertiary/5 rounded-lg border border-tertiary/10">
                      <h5 className="font-medium text-tertiary mb-3 flex items-center gap-2">
                        <span>💡</span>
                        Teaching Tips for This Phase
                      </h5>
                      <ul className="space-y-2">
                        {phase.teachingTips.map((tip, tipIndex) => (
                          <li
                            key={tipIndex}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-tertiary mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      <div className="relative ml-16 mt-8">
        <div className="absolute left-[-48px] flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-secondary border-4 border-background shadow-lg" />
        </div>
        <div className="bg-secondary/5 border border-secondary/10 rounded-xl p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">🏒</div>
            <h4 className="font-bold text-secondary mb-2">
              Skills Foundation Complete
            </h4>
            <p className="text-muted-foreground text-sm">
              Players should now have a solid foundation in these essential
              skills and be ready to progress to more advanced techniques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
