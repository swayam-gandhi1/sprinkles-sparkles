import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Inline "Explore →" style text link. */
export function ArrowLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong transition-colors hover:text-primary",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
    </Link>
  );
}
