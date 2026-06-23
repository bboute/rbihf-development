"use client";

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
    bgColor: "bg-primary/5",
    borderColor: "border-primary/10",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    textColor: "text-primary",
  },
  secondary: {
    bgColor: "bg-secondary/5",
    borderColor: "border-secondary/10",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    textColor: "text-secondary",
  },
  foundational: {
    bgColor: "bg-tertiary/5",
    borderColor: "border-tertiary/10",
    iconBg: "bg-tertiary/10",
    iconColor: "text-tertiary",
    textColor: "text-tertiary",
  },
};

export function SkillOverviewCard({
  category,
  icon,
  skills,
  description,
  priority,
  className,
}: SkillOverviewCardProps): React.JSX.Element {
  const config = priorityConfig[priority];

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg",
        config.bgColor,
        config.borderColor,
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
            config.iconBg,
            config.iconColor,
          )}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className={cn("text-lg font-bold mb-1", config.textColor)}>
            {category}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                config.iconColor.replace("text-", "bg-"),
              )}
            />
            <span className="text-foreground">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
