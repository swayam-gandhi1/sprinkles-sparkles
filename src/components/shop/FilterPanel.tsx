"use client";

import { useId, type ReactNode } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import { hasActiveFilters, shopHref } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";
import type { FacetOption, ShopQuery, ShopResult } from "@/types/product";
import { useShopNavigation } from "./ShopNavigation";

type FilterPanelProps = {
  query: ShopQuery;
  facets: ShopResult["facets"];
  /** Heading level context: the sidebar owns an h2, the mobile sheet renders its own title. */
  showTitle?: boolean;
  className?: string;
};

const optionRow =
  "flex min-h-10 cursor-pointer items-center gap-3 rounded-xl px-2 text-sm transition-colors hover:bg-blush has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring";
const inputClass = "size-4 shrink-0 accent-primary";

function Group({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group/filter border-b border-border py-3 last:border-b-0">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-lg px-2 marker:content-none [&::-webkit-details-marker]:hidden">
        <h3 className="text-[0.9375rem] font-bold text-primary-strong">{title}</h3>
        <ChevronDown
          aria-hidden
          className="size-4 text-primary-strong transition-transform duration-300 ease-premium group-open/filter:rotate-180"
        />
      </summary>
      <div className="mt-1 space-y-0.5">{children}</div>
    </details>
  );
}

function Count({ value }: { value: number }) {
  return <span className="ml-auto text-xs text-muted-foreground tabular-nums">({value})</span>;
}

type RadioGroupProps = {
  name: string;
  legend: string;
  options: readonly FacetOption[];
  value: string | null;
  allLabel: string;
  onChange: (value: string | null) => void;
};

function RadioOptions({ name, legend, options, value, allLabel, onChange }: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <label className={optionRow}>
        <input type="radio" name={name} checked={value === null} onChange={() => onChange(null)} className={inputClass} />
        {allLabel}
      </label>
      {options.map((option) => (
        <label key={option.value} className={optionRow}>
          <input
            type="radio"
            name={name}
            checked={value === option.value}
            disabled={option.count === 0 && value !== option.value}
            onChange={() => onChange(option.value)}
            className={inputClass}
          />
          {option.label}
          <Count value={option.count} />
        </label>
      ))}
    </fieldset>
  );
}

/** Filter controls. Every change updates the URL, so filtered views are shareable and back-button friendly. */
export function FilterPanel({ query, facets, showTitle = true, className }: FilterPanelProps) {
  const { navigate } = useShopNavigation();
  const id = useId();
  const go = (patch: Partial<ShopQuery>) => navigate(shopHref({ ...query, ...patch, page: 1 }));

  const toggleCategory = (slug: string) =>
    go({
      categories: query.categories.includes(slug)
        ? query.categories.filter((c) => c !== slug)
        : [...query.categories, slug],
    });

  return (
    <div className={className}>
      {showTitle ? (
        <div className="flex items-center justify-between px-2 pb-1">
          <h2 className="text-lg font-bold">Filters</h2>
          {hasActiveFilters(query) ? (
            <button
              type="button"
              onClick={() => navigate(shopHref({ sort: query.sort }))}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-2 text-xs font-semibold text-primary-strong hover:bg-blush"
            >
              <RotateCcw aria-hidden className="size-3.5" />
              Clear all
            </button>
          ) : null}
        </div>
      ) : null}

      <Group title="Categories">
        <fieldset>
          <legend className="sr-only">Categories</legend>
          {facets.categories.map((option) => {
            const checked = query.categories.includes(option.value);
            return (
              <label key={option.value} className={optionRow}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={option.count === 0 && !checked}
                  onChange={() => toggleCategory(option.value)}
                  className={cn(inputClass, "rounded")}
                />
                {option.label}
                <Count value={option.count} />
              </label>
            );
          })}
        </fieldset>
      </Group>

      <Group title="Price">
        <RadioOptions
          name={`${id}-price`}
          legend="Price"
          options={facets.prices}
          value={query.price}
          allLabel="Any price"
          onChange={(price) => go({ price })}
        />
      </Group>

      {facets.collections.length ? (
        <Group title="Collections" defaultOpen={Boolean(query.collection)}>
          <RadioOptions
            name={`${id}-collection`}
            legend="Collections"
            options={facets.collections}
            value={query.collection}
            allLabel="All collections"
            onChange={(collection) => go({ collection })}
          />
        </Group>
      ) : null}

      {facets.occasions.length ? (
        <Group title="Occasion" defaultOpen={Boolean(query.occasion)}>
          <RadioOptions
            name={`${id}-occasion`}
            legend="Occasion"
            options={facets.occasions}
            value={query.occasion}
            allLabel="All occasions"
            onChange={(occasion) => go({ occasion })}
          />
        </Group>
      ) : null}

      {facets.outOfStock > 0 ? (
        <Group title="Availability">
          <label className={optionRow}>
            <input
              type="checkbox"
              checked={query.inStockOnly}
              onChange={() => go({ inStockOnly: !query.inStockOnly })}
              className={cn(inputClass, "rounded")}
            />
            In stock only
          </label>
        </Group>
      ) : null}
    </div>
  );
}
