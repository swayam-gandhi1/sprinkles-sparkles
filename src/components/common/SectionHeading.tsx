import type { ReactNode } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  /** Id for the section's `aria-labelledby`. */
  id: string;
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  /** Optional trailing action (e.g. "View all"), right-aligned on desktop. */
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ id, title, eyebrow, description, action, align = "left", className }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
        <h2 id={id} className="text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-[2rem] lg:text-[2.375rem]">
          {title}
          <Heart
            aria-hidden
            strokeWidth={2.25}
            className="ml-2 inline-block size-[0.55em] -translate-y-[0.5em] rotate-12 text-primary"
          />
        </h2>
        {description ? (
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
