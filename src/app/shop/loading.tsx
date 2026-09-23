import { Container } from "@/components/layout/Container";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

/** Shown while the shop's first render streams in (e.g. navigating here from another page). */
export default function ShopLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading products…</span>
      <div className="h-56 animate-pulse bg-linear-to-r from-blush via-cream to-lavender-mist sm:h-64 lg:h-72" />
      <Container className="relative z-10 -mt-14">
        <div className="h-28 animate-pulse rounded-panel bg-white shadow-card-hover" />
      </Container>
      <Container className="grid gap-8 py-10 lg:grid-cols-[16.5rem_1fr] lg:gap-10">
        <div className="hidden h-[32rem] animate-pulse rounded-card bg-muted lg:block" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4 xl:gap-5">
          {Array.from({ length: 8 }, (_, i) => (
            <li key={i}>
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
