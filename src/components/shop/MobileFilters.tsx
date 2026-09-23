"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { SlidersHorizontal, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { hasActiveFilters, shopHref } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";
import { trapFocus } from "@/lib/utils/focus";
import type { ShopQuery, ShopResult } from "@/types/product";
import { FilterPanel } from "./FilterPanel";
import { useShopNavigation } from "./ShopNavigation";

type MobileFiltersProps = {
  query: ShopQuery;
  facets: ShopResult["facets"];
  total: number;
};

/** "Filters" button + bottom sheet for screens below `lg`. */
export function MobileFilters({ query, facets, total }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);
  const { navigate, pending } = useShopNavigation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const activeCount =
    query.categories.length + [query.collection, query.occasion, query.price, query.inStockOnly].filter(Boolean).length;

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      else if (event.key === "Tab") trapFocus(event, sheetRef.current);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onViewport = (event: MediaQueryListEvent) => event.matches && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewport);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewport);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(buttonVariants({ variant: "outline", size: "md" }), "px-4 lg:hidden")}
      >
        <SlidersHorizontal aria-hidden />
        Filters
        {activeCount ? (
          <span className="grid size-5 place-items-center rounded-full bg-primary text-[0.6875rem] text-white">
            {activeCount}
          </span>
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            key="backdrop"
            aria-hidden
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-navy/45 lg:hidden"
          />
        ) : null}
        {open ? (
          <m.div
            key="sheet"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filters-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, visualDuration: 0.35 }}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col rounded-t-[1.75rem] bg-white shadow-card-hover lg:hidden"
          >
            <div aria-hidden className="mx-auto mt-2.5 h-1.5 w-12 shrink-0 rounded-full bg-border" />
            <div className="flex items-center justify-between px-5 pt-2 pb-3">
              <h2 id="mobile-filters-title" className="text-lg font-bold">
                Filters
              </h2>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close filters"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "-mr-2")}
              >
                <X aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain border-y border-border px-3">
              <FilterPanel query={query} facets={facets} showTitle={false} />
            </div>
            <div className="flex gap-3 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {hasActiveFilters(query) ? (
                <button
                  type="button"
                  onClick={() => navigate(shopHref({ sort: query.sort }))}
                  className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
                >
                  Clear all
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "primary" }), "flex-[2]")}
              >
                {pending ? "Updating…" : `Show ${total} ${total === 1 ? "product" : "products"}`}
              </button>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
