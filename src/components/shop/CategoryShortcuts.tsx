import Link from "next/link";
import { tones } from "@/components/common/tones";
import { Container } from "@/components/layout/Container";
import { shopShortcuts } from "@/data/shop";
import { parseShopQuery, shopHref } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";
import type { ShopQuery } from "@/types/product";

/** A shortcut is "current" when the page shows exactly its filter. */
function isCurrent(params: Record<string, string>, query: ShopQuery) {
  const target = parseShopQuery(params);
  const same = (a: readonly string[], b: readonly string[]) =>
    a.length === b.length && a.every((value) => b.includes(value));
  return same(target.categories, query.categories) && target.collection === query.collection && !query.occasion;
}

/** Colourful quick filters overlapping the banner's lower edge; swipeable on phones. */
export function CategoryShortcuts({ query }: { query: ShopQuery }) {
  return (
    <Container className="relative z-10 -mt-14 sm:-mt-16">
      <nav aria-label="Shop by category" className="rounded-panel border border-white bg-white p-2 shadow-card-hover sm:p-3">
        <ul className="-mx-2 flex snap-x gap-1 overflow-x-auto px-2 [scrollbar-width:none] sm:-mx-3 sm:px-3 lg:mx-0 lg:grid lg:grid-cols-8 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {shopShortcuts.map(({ label, params, icon: Icon, tone }) => {
            const current = isCurrent(params, query);
            return (
              <li key={label} className="w-[5.75rem] shrink-0 snap-start sm:w-28 lg:w-auto">
                <Link
                  href={shopHref({ ...parseShopQuery(params), sort: query.sort })}
                  aria-current={current ? "page" : undefined}
                  scroll={false}
                  className={cn(
                    "group flex h-full flex-col items-center gap-2 rounded-2xl px-1.5 py-3 text-center transition-colors duration-200 hover:bg-blush",
                    current && "bg-blush ring-2 ring-pink/40",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:-rotate-6 sm:size-14",
                      tones[tone].icon,
                    )}
                  >
                    <Icon aria-hidden className="size-6" strokeWidth={1.7} />
                  </span>
                  <span
                    className={cn(
                      "text-xs leading-tight font-semibold sm:text-[0.8125rem]",
                      current ? "text-primary-strong" : "text-foreground",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Container>
  );
}
