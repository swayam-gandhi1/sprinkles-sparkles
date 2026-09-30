import { Container } from "@/components/layout/Container";

export default function ProductLoading() {
  return (
    <Container className="py-8 lg:py-12" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading product details…</span>
      <div className="h-4 w-48 animate-pulse rounded-full bg-muted" />

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Image skeleton */}
        <div className="aspect-square animate-pulse rounded-panel bg-linear-to-br from-blush to-cream shadow-card" />

        {/* Text & Actions skeleton */}
        <div className="space-y-4 py-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-blush" />
          <div className="h-10 w-3/4 animate-pulse rounded-lg bg-muted" />
          <div className="h-8 w-1/3 animate-pulse rounded-lg bg-muted" />
          <div className="h-5 w-28 animate-pulse rounded-full bg-muted" />

          <div className="mt-6 space-y-2 pt-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>

          <div className="mt-8 flex gap-3 pt-4">
            <div className="h-12 w-48 animate-pulse rounded-button bg-primary/20" />
            <div className="size-12 animate-pulse rounded-button bg-muted" />
          </div>
        </div>
      </div>
    </Container>
  );
}
