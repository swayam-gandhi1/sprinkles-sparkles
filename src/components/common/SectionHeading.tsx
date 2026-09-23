import type { ReactNode } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  /** Id for the section's `aria-labelledby`. */
  id: string;
  /** Wrap a key word in `<Highlight>` to colour it. */
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  /** Optional trailing action (e.g. "View all"), right-aligned on desktop. */
  action?: ReactNode;
  align?: "left" | "center";
  /** Colour of the eyebrow and heart accent. */
  accent?: "pink" | "teal";
  className?: string;
};

/** Colours a key word or phrase inside a section title with the pink brand gradient. */
export function Highlight({ children, tone = "pink" }: { children: ReactNode; tone?: "pink" | "teal" }) {
  return <span className={tone === "pink" ? "text-gradient-brand" : "text-accent"}>{children}</span>;
}

export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  action,
  align = "left",
  accent = "pink",
  className,
}: SectionHeadingProps) {
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
        {eyebrow ? (
          <Eyebrow className={cn("mb-3", accent === "teal" && "text-accent-strong")}>{eyebrow}</Eyebrow>
        ) : null}
        <h2 id={id} className="text-[1.75rem] leading-tight font-bold tracking-tight sm:text-[2rem] lg:text-[2.375rem]">
          {title}
          <Heart
            aria-hidden
            strokeWidth={2.25}
            className={cn(
              "ml-2 inline-block size-[0.55em] -translate-y-[0.5em] rotate-12",
              accent === "teal" ? "text-turquoise" : "text-pink",
            )}
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
