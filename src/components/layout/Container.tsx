import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const sizeClasses = {
  narrow: "max-w-narrow",
  default: "max-w-site",
  wide: "max-w-wide",
  full: "max-w-none",
} as const;

export type ContainerSize = keyof typeof sizeClasses;

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "header" | "footer" | "nav" | "article";
  size?: ContainerSize;
};

/** Centers content horizontally with the site's responsive gutter. */
export function Container({ as: Component = "div", size = "default", className, ...props }: ContainerProps) {
  return <Component className={cn("mx-auto w-full px-gutter", sizeClasses[size], className)} {...props} />;
}
