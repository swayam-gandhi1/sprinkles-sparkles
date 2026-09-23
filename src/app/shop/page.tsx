import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Newsletter } from "@/components/home/Newsletter";
import { TrustBar } from "@/components/home/TrustBar";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryShortcuts } from "@/components/shop/CategoryShortcuts";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { MobileFilters } from "@/components/shop/MobileFilters";
import { ShopHero } from "@/components/shop/ShopHero";
import {
  ActiveFilters,
  EmptyState,
  Pagination,
  shopBreadcrumbs,
  ShopPromo,
} from "@/components/shop/ShopListingParts";
import { ShopNavigationProvider, ShopResults } from "@/components/shop/ShopNavigation";
import { SortSelect } from "@/components/shop/SortSelect";
import { searchProducts } from "@/lib/api/products";
import { parseShopQuery } from "@/lib/products/query";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Shop baking ingredients, sprinkles, colours and essences, toppers, chocolates, baking tins, tools, boxes and packaging from Sprinkle & Sparkle, Khanna.",
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const query = parseShopQuery(await searchParams);
  const result = await searchProducts(query);
  const first = (result.page - 1) * result.pageSize + 1;
  const last = first + result.items.length - 1;

  return (
    <>
      <ShopHero />
      <CategoryShortcuts query={query} />

      <ShopNavigationProvider>
        <Container className="pt-6 pb-section-sm lg:pt-8">
          <Breadcrumbs items={shopBreadcrumbs} />

          <div className="mt-6 grid gap-8 lg:grid-cols-[16.5rem_1fr] lg:gap-10">
            <aside aria-label="Product filters" className="hidden lg:block">
              <div className="space-y-5">
                <div className="rounded-card border border-border bg-white p-3 shadow-card">
                  <FilterPanel query={query} facets={result.facets} />
                </div>
                <ShopPromo />
              </div>
            </aside>

            <section aria-labelledby="results-title" className="min-w-0">
              <h2 id="results-title" className="sr-only">
                Products
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p role="status" className="text-sm text-muted-foreground">
                  {result.total ? (
                    <>
                      Showing{" "}
                      <strong className="font-semibold text-foreground">
                        {first}–{last}
                      </strong>{" "}
                      of <strong className="font-semibold text-foreground">{result.total}</strong>{" "}
                      {result.total === 1 ? "product" : "products"}
                      {query.q ? (
                        <>
                          {" "}
                          for “<span className="font-semibold text-foreground">{query.q}</span>”
                        </>
                      ) : null}
                    </>
                  ) : (
                    "No products match these filters"
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <MobileFilters query={query} facets={result.facets} total={result.total} />
                  <SortSelect query={query} />
                </div>
              </div>

              <div className="mt-4">
                <ActiveFilters query={query} />
              </div>

              <ShopResults className="mt-6">
                {result.items.length ? (
                  // No entrance animation: products must be visible the moment the HTML arrives.
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4 xl:gap-5">
                    {result.items.map((product, index) => (
                      <li key={product.id}>
                        <ProductCard product={product} priority={index < 4} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState query={query} />
                )}
              </ShopResults>

              <div className="mt-10">
                <Pagination query={query} page={result.page} pageCount={result.pageCount} />
              </div>
            </section>
          </div>
        </Container>
      </ShopNavigationProvider>

      <TrustBar variant="inline" />
      <Newsletter />
    </>
  );
}
