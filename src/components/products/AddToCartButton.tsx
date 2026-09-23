"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Check, ShoppingBag } from "lucide-react";
import { premiumEase } from "@/components/animations/presets";
import { buttonVariants, type ButtonSize } from "@/components/ui/Button";
import { addToCart } from "@/lib/cart/store";
import { cn } from "@/lib/utils/cn";

type AddToCartButtonProps = {
  slug: string;
  name: string;
  inStock: boolean;
  quantity?: number;
  size?: ButtonSize;
  className?: string;
};

const FEEDBACK_MS = 1800;

/** Adds to the browser cart and confirms with a brief "Added" state (announced to screen readers). */
export function AddToCartButton({ slug, name, inStock, quantity = 1, size = "md", className }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [added]);

  if (!inStock) {
    return (
      <button type="button" disabled className={cn(buttonVariants({ variant: "outline", size }), "w-full", className)}>
        Out of Stock
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          addToCart(slug, quantity);
          setAdded(true);
        }}
        aria-label={`Add ${name} to cart`}
        className={cn(
          buttonVariants({ variant: "primary", size }),
          "relative w-full overflow-hidden",
          added && "from-accent to-accent-hover shadow-teal",
          className,
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={added ? "added" : "idle"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: premiumEase }}
            className="inline-flex items-center gap-2"
          >
            {added ? <Check aria-hidden /> : <ShoppingBag aria-hidden />}
            {added ? "Added" : "Add to Cart"}
          </m.span>
        </AnimatePresence>
      </button>
      <span role="status" className="sr-only">
        {added ? `${name} added to cart` : ""}
      </span>
    </>
  );
}
