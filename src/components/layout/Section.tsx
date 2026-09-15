import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";
import { Container, type ContainerSize } from "./Container";

const spacingClasses = {
  none: "",
  sm: "py-section-sm",
  md: "py-section",
  lg: "py-section-lg",
} as const;

export type SectionProps = ComponentProps<"section"> & {
  spacing?: keyof typeof spacingClasses;
  /** Container width for the content, or `false` for full-bleed content. */
  container?: ContainerSize | false;
};

/**
 * Vertical page section with consistent rhythm. Give it an accessible name
 * via `aria-labelledby` pointing at the section heading.
 */
export function Section({ spacing = "md", container = "default", className, children, ...props }: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)} {...props}>
      {container ? <Container size={container}>{children}</Container> : children}
    </section>
  );
}
