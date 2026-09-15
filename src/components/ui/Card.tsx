import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li";
  padding?: keyof typeof paddingClasses;
  /** Adds hover elevation for clickable cards. */
  interactive?: boolean;
};

/** Neutral surface primitive. Domain cards (e.g. product cards) compose this. */
export function Card({
  as: Component = "div",
  padding = "md",
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-card border border-border bg-surface shadow-card",
        interactive && "transition-shadow duration-300 ease-premium hover:shadow-card-hover",
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  );
}
