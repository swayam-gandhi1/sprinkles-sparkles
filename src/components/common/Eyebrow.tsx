import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Small uppercase label above a heading, led by a tiny sprinkle. Use sparingly. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.16em] text-primary-strong uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-4 -rotate-12 rounded-full bg-linear-to-r from-pink to-sunny" />
      {children}
    </p>
  );
}
