import Link from "next/link";
import { tones } from "@/components/common/tones";
import { Container } from "@/components/layout/Container";
import { getCategories } from "@/lib/api/categories";
import { shopHref } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";
import type { ShopQuery } from "@/types/product";

/** Colourful quick filters overlapping the banner's lower edge; dynamically driven by backend categories. */
export async function CategoryShortcuts({ query }: { query: ShopQuery }) {
  const categories = await getCategories();
  const shortcuts = categories.slice(0, 8);

  if (!shortcuts.length) return null;

  return (
    <Container className="relative z-10 -mt-14 sm:-mt-16">
      <nav aria-label="Shop by category" className="rounded-panel border border-white bg-white p-2 shadow-card-hover sm:p-3">
        <ul className="-mx-2 flex snap-x gap-1 overflow-x-auto px-2 [scrollbar-width:none] sm:-mx-3 sm:px-3 lg:mx-0 lg:grid lg:grid-cols-8 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {shortcuts.map((category) => {
            const current = query.categories.includes(category.slug);
            const Icon = category.icon;
            const targetQuery = {
              ...query,
              categories: current ? [] : [category.slug],
              page: 1,
            };

            return (
              <li key={category.slug} className="w-[5.75rem] shrink-0 snap-start sm:w-28 lg:w-auto">
                <Link
                  href={shopHref(targetQuery)}
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
                      tones[category.tone].icon,
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
                    {category.name}
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
