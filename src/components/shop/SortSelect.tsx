"use client";

import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { sortOptions } from "@/data/shop";
import { shopHref } from "@/lib/products/query";
import type { ShopQuery, SortKey } from "@/types/product";
import { useShopNavigation } from "./ShopNavigation";

/** Native select (best on mobile), styled to match the brand. */
export function SortSelect({ query }: { query: ShopQuery }) {
  const { navigate } = useShopNavigation();
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="hidden text-sm font-medium whitespace-nowrap text-muted-foreground sm:block">
        Sort by
      </label>
      <div className="relative">
        <select
          id={id}
          value={query.sort}
          onChange={(event) => navigate(shopHref({ ...query, sort: event.target.value as SortKey, page: 1 }))}
          aria-label="Sort products"
          className="h-11 appearance-none rounded-button border-2 border-border bg-white pr-10 pl-4 text-sm font-semibold text-foreground transition-colors hover:border-blush-strong focus-visible:border-pink"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-primary-strong"
        />
      </div>
    </div>
  );
}
