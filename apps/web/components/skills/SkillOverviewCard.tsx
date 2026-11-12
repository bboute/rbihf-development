import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface SkillOverviewCardProps {
  category: string;
  icon: string;
  skills: string[];
  description: string;
  priority: "primary" | "secondary" | "foundational";
  className?: string;
}

const priorityConfig = {
  primary: {
    borderColor: "border-primary",
    textColor: "text-primary",
    label: "Primary focus",
  },
  secondary: {
    borderColor: "border-secondary",
    textColor: "text-secondary",
    label: "Supporting focus",
  },
  foundational: {
    borderColor: "border-foreground/25",
    textColor: "text-foreground/65",
    label: "Foundation",
  },
};

export function SkillOverviewCard({
  category,
  skills,
  description,
  priority,
  className,
}: SkillOverviewCardProps): React.JSX.Element {
  const config = priorityConfig[priority];

  return (
    <div
      className={cn(
        "border-t-2 py-6",
        config.borderColor,
        className,
      )}
    >
      <div>
        <p className={cn("text-xs font-bold uppercase tracking-[0.16em]", config.textColor)}>
          {config.label}
        </p>
        <div className="mt-3">
          <h3 className="font-heading text-2xl font-bold text-foreground">
            {category}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 divide-y divide-border border-y border-border">
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-4 py-3 text-sm">
            <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-foreground">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
