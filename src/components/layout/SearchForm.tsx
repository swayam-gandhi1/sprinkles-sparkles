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
        className="h-11 w-full rounded-button border border-border bg-cream pr-16 pl-5 text-sm text-foreground transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-muted-foreground hover:border-blush-strong focus:border-pink focus:bg-white focus:shadow-[0_0_0_4px_rgb(247_37_133/0.18)] focus-visible:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute top-1 right-1 grid h-9 w-12 place-items-center rounded-full bg-linear-to-r from-primary to-primary-hover text-primary-foreground shadow-pink transition-[filter,scale] duration-200 ease-premium hover:brightness-95 active:scale-95"
      >
        <Search aria-hidden className="size-4" />
      </button>
    </form>
  );
}
