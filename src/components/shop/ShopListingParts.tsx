import Link from "next/link";
import { ChevronLeft, ChevronRight, SearchX, X } from "lucide-react";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { priceBands, shopCategories, shopCollections, shopOccasions } from "@/data/shop";
import { routes } from "@/lib/config/routes";
import { hasActiveFilters, shopHref } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";
import type { ShopQuery } from "@/types/product";

/* Server-rendered pieces of the product listing: chips, pagination, empty state, promo. */

/** Removable chips for each active filter; each chip is a plain link. */
export function ActiveFilters({ query }: { query: ShopQuery }) {
  if (!hasActiveFilters(query)) return null;

  const chips: { label: string; href: string }[] = [
    ...(query.q ? [{ label: `“${query.q}”`, href: shopHref({ ...query, q: "", page: 1 }) }] : []),
    ...query.categories.map((slug) => ({
      label: shopCategories.find((c) => c.slug === slug)?.name ?? slug,
      href: shopHref({ ...query, categories: query.categories.filter((c) => c !== slug), page: 1 }),
    })),
    ...(query.collection
      ? [{ label: shopCollections[query.collection] ?? query.collection, href: shopHref({ ...query, collection: null, page: 1 }) }]
      : []),
    ...(query.occasion
      ? [{ label: shopOccasions[query.occasion] ?? query.occasion, href: shopHref({ ...query, occasion: null, page: 1 }) }]
      : []),
    ...(query.price
      ? [{ label: priceBands.find((b) => b.id === query.price)?.label ?? "", href: shopHref({ ...query, price: null, page: 1 }) }]
      : []),
    ...(query.inStockOnly ? [{ label: "In stock", href: shopHref({ ...query, inStockOnly: false, page: 1 }) }] : []),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="sr-only">Active filters:</span>
      {chips.map((chip) => (
        <Link
          key={chip.href + chip.label}
          href={chip.href}
          scroll={false}
          aria-label={`Remove filter: ${chip.label}`}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-blush px-3.5 text-[0.8125rem] font-semibold text-primary-strong transition-colors hover:bg-blush-strong"
        >
          {chip.label}
          <X aria-hidden className="size-3.5" />
        </Link>
      ))}
      <Link
        href={shopHref({ sort: query.sort })}
        scroll={false}
        className="inline-flex min-h-9 items-center px-2 text-[0.8125rem] font-semibold text-accent-strong underline-offset-4 hover:underline"
      >
        Clear all
      </Link>
    </div>
  );
}

/** Numbered pagination with ellipses; plain links so it works without JS. */
export function Pagination({ query, page, pageCount }: { query: ShopQuery; page: number; pageCount: number }) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 1,
  );
  const withGaps = pages.flatMap((p, i) => (i > 0 && p - (pages[i - 1] ?? p) > 1 ? ["gap" as const, p] : [p]));
  const item = "grid size-11 place-items-center rounded-full text-sm font-semibold transition-colors";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      {page > 1 ? (
        <Link href={shopHref({ ...query, page: page - 1 })} aria-label="Previous page" className={cn(item, "hover:bg-blush")}>
          <ChevronLeft aria-hidden className="size-5" />
        </Link>
      ) : null}
      {withGaps.map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={shopHref({ ...query, page: p })}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            className={cn(
              item,
              p === page ? "bg-linear-to-r from-primary to-primary-hover text-white shadow-pink" : "hover:bg-blush",
            )}
          >
            {p}
          </Link>
        ),
      )}
      {page < pageCount ? (
        <Link href={shopHref({ ...query, page: page + 1 })} aria-label="Next page" className={cn(item, "hover:bg-blush")}>
          <ChevronRight aria-hidden className="size-5" />
        </Link>
      ) : null}
    </nav>
  );
}

const emptyDecor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-8 left-[18%] size-5 text-sunny", float: true },
  { shape: "sprinkle", className: "right-[20%] bottom-10 h-2 w-6 rotate-45 text-turquoise", float: true, delay: -2 },
  { shape: "heart", className: "top-10 right-[16%] size-5 rotate-12 text-pink/60", float: true, delay: -1 },
];

export function EmptyState({ query }: { query: ShopQuery }) {
  return (
    <div className="relative overflow-hidden rounded-panel bg-linear-to-br from-blush via-cream to-lavender-mist px-6 py-16 text-center">
      <DecorLayer items={emptyDecor} />
      <span className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-white text-primary-strong shadow-card">
        <SearchX aria-hidden className="size-8" strokeWidth={1.6} />
      </span>
      <h2 className="relative mt-5 text-xl font-bold sm:text-2xl">No products found</h2>
      <p className="relative mx-auto mt-2 max-w-[42ch] text-muted-foreground">
        Try adjusting your filters and explore something new!
      </p>
      <ButtonLink href={shopHref({ sort: query.sort })} scroll={false} className="relative mt-7">
        Reset Filters
        <ButtonArrow />
      </ButtonLink>
    </div>
  );
}

/** Small sidebar promo beneath the filters. */
export function ShopPromo() {
  return (
    <div className="relative overflow-hidden rounded-card bg-linear-to-br from-primary-hover via-primary to-lavender-strong p-5 text-white shadow-card">
      <div aria-hidden className="confetti-pattern absolute inset-0 opacity-30 mix-blend-screen" />
      <p className="relative text-base leading-snug font-bold">
        Bakers, Don&apos;t Just Bake…
        <span className="mt-0.5 block font-script text-[2.25rem] leading-none text-sunny">Sparkle!</span>
      </p>
      <p className="relative mt-2 text-sm text-white/90">Toppers, sprinkles and tools for your next showstopper.</p>
      <Link
        href={shopHref({ collection: "decorate" })}
        className="relative mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-button bg-white px-4 text-sm font-semibold text-primary-strong transition-transform duration-200 ease-premium hover:-translate-y-0.5"
      >
        Explore decorating
        <ChevronRight aria-hidden className="size-4" />
      </Link>
    </div>
  );
}

export const shopBreadcrumbs = [
  { label: "Home", href: routes.home },
  { label: "Shop", href: routes.shop },
] as const;
