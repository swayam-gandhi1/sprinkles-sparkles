import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Small uppercase label above a heading. Use sparingly. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.8125rem] font-semibold tracking-[0.16em] text-primary-strong uppercase", className)}>
      {children}
    </p>
  );
}
