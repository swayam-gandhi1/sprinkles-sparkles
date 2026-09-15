import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A swipeable, snap-scrolling row on small screens. Pass the wider-screen
 * layout via `className`, including the resets, e.g.
 * "md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0".
 */
export function ScrollRow({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "-mx-gutter flex snap-x snap-mandatory scroll-px-gutter gap-4 overflow-x-auto px-gutter pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    />
  );
}

/** Width/snap classes for a ScrollRow item (≈ 1.3 cards visible on phones). */
export const scrollItemClass = "w-[78%] shrink-0 snap-start sm:w-[46%]";
