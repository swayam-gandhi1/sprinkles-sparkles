"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

/** Product data failed to load. Surfaces the problem (logged) and offers a retry. */
export default function ShopError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error("Shop failed to load", error);
  }, [error]);

  return (
    <Container className="py-section">
      <div role="alert" className="mx-auto max-w-lg rounded-panel bg-linear-to-br from-blush to-cream px-6 py-14 text-center">
        <h1 className="text-2xl font-bold">We couldn&apos;t load the products</h1>
        <p className="mt-3 text-muted-foreground">
          Something went wrong while fetching the catalogue. Please try again in a moment.
        </p>
        {error.digest ? <p className="mt-2 text-xs text-muted-foreground">Reference: {error.digest}</p> : null}
        <Button onClick={() => retry()} className="mt-7">
          <RotateCcw aria-hidden />
          Try again
        </Button>
      </div>
    </Container>
  );
}
