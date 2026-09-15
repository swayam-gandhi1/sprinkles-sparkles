import { Search } from "lucide-react";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";

type SearchFormProps = {
  /** Unique input id (the form renders in both the desktop and mobile header). */
  id: string;
  className?: string;
};

/** Product search. Submits to the shop as `?q=` (results page is a later phase). */
export function SearchForm({ id, className }: SearchFormProps) {
  return (
    <form action={routes.shop} method="get" role="search" className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <input
        id={id}
        name="q"
        type="search"
        autoComplete="off"
        placeholder="Search for baking tins, sprinkles, boxes, toppers…"
        className="h-11 w-full rounded-button border border-border bg-muted pr-14 pl-5 text-sm text-foreground transition-colors placeholder:text-muted-foreground hover:border-blush-strong focus:bg-white"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute top-1 right-1 grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        <Search aria-hidden className="size-4" />
      </button>
    </form>
  );
}
