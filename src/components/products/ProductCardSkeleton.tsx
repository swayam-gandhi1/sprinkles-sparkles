/** Placeholder matching ProductCard's footprint, to avoid layout shift while loading. */
export function ProductCardSkeleton() {
  return (
    <div aria-hidden className="overflow-hidden rounded-card border border-border bg-white shadow-card">
      <div className="aspect-square animate-pulse bg-linear-to-br from-blush to-cream" />
      <div className="space-y-2.5 p-3 sm:p-4">
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-2/5 animate-pulse rounded-full bg-muted" />
        <div className="mt-4 h-10 animate-pulse rounded-button bg-blush" />
      </div>
    </div>
  );
}
