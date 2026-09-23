import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { NavLink } from "@/types/content";

/** Breadcrumb trail; the last item is the current page. */
export function Breadcrumbs({ items, className }: { items: readonly NavLink[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex min-w-0 items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="truncate font-semibold text-primary-strong">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="rounded transition-colors hover:text-primary-strong">
                    {item.label}
                  </Link>
                  <ChevronRight aria-hidden className="size-3.5 shrink-0" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
