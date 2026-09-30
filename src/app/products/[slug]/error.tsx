"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PackageX, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button, buttonVariants } from "@/components/ui/Button";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product failed to load:", error);
  }, [error]);

  return (
    <Container className="py-section">
      <div
        role="alert"
        className="mx-auto max-w-lg rounded-panel bg-linear-to-br from-blush to-cream px-6 py-14 text-center shadow-card"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white text-primary-strong shadow-card">
          <PackageX aria-hidden className="size-8" strokeWidth={1.6} />
        </span>
        <h1 className="mt-5 text-2xl font-bold">We couldn&apos;t load this product</h1>
        <p className="mt-3 text-muted-foreground">
          Something went wrong while fetching product details from the catalog. Please try again.
        </p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <Button onClick={() => reset()}>
            <RotateCcw aria-hidden className="size-4" />
            Try again
          </Button>
          <Link
            href={routes.shop}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </Container>
  );
}
