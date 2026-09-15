import type { CSSProperties } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type DecorShape = "sprinkle" | "sparkle" | "heart" | "dot";

export type DecorItem = {
  shape: DecorShape;
  /** Position, size, color and rotation utilities. */
  className: string;
  /** Gentle CSS float (disabled automatically for reduced motion). */
  float?: boolean;
  /** Animation delay in seconds; negative values desync the floats. */
  delay?: number;
};

function Shape({ shape }: { shape: DecorShape }) {
  switch (shape) {
    case "sprinkle":
      return (
        <svg viewBox="0 0 20 6" className="size-full">
          <rect width="20" height="6" rx="3" fill="currentColor" />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 24 24" className="size-full">
          <path
            d="M12 0C12.9 7.2 16.8 11.1 24 12 16.8 12.9 12.9 16.8 12 24 11.1 16.8 7.2 12.9 0 12 7.2 11.1 11.1 7.2 12 0Z"
            fill="currentColor"
          />
        </svg>
      );
    case "heart":
      return <Heart className="size-full" strokeWidth={2.25} />;
    case "dot":
      return <span className="block size-full rounded-full bg-current" />;
  }
}

/** Tasteful sprinkles, sparkles and hearts scattered over a positioned parent. */
export function DecorLayer({ items, className }: { items: readonly DecorItem[]; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {items.map((item, index) => (
        <span
          key={index}
          className={cn("absolute block", item.float && "animate-float", item.className)}
          style={item.delay ? ({ animationDelay: `${item.delay}s` } satisfies CSSProperties) : undefined}
        >
          <Shape shape={item.shape} />
        </span>
      ))}
    </div>
  );
}
