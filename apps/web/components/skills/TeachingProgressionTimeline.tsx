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
      <div className="absolute bottom-0 left-4 top-0 w-px bg-border" />

      <div className="space-y-8">
        {phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="relative">
            <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-mono text-xs font-bold text-background">
              {String(phaseIndex + 1).padStart(2, "0")}
            </div>

            {/* Phase Content */}
            <div className="ml-14 border-t-2 border-primary py-6">
              <div>
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary">
                      {phase.phase}
                    </h3>
                    <span className="text-sm font-bold text-secondary">
                      {phase.timeframe}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {phase.focus}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Skills to Introduce & Develop
                  </h4>

                  <div className="grid gap-3 md:grid-cols-2">
                    {phase.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-start gap-3 border-t border-border py-3">
                        <div className="mt-0.5 flex-shrink-0 font-mono text-xs text-muted-foreground">
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
                    <div className="mt-6 border-l-2 border-secondary pl-5">
                      <h5 className="font-medium text-tertiary mb-3 flex items-center gap-2">
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

      <div className="relative ml-14 mt-8">
        <div className="border-t-2 border-secondary py-6">
          <div className="text-center">
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
