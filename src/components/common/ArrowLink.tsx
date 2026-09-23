import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ArrowLinkProps = ComponentProps<typeof Link> & {
  tone?: "pink" | "teal";
};

/** Inline "Explore →" style text link. */
export function ArrowLink({ className, children, tone = "pink", ...props }: ArrowLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-colors",
        tone === "pink" ? "text-primary-strong hover:text-primary" : "text-accent-strong hover:text-accent",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
    </Link>
  );
}
