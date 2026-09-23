"use client";

import { Heart } from "lucide-react";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { useCartReady, useCartState } from "@/lib/cart/store";
import { routes } from "@/lib/config/routes";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

/** Saved products, rendered with the same card as the shop grid. */
export function WishlistView({ products }: { products: readonly Product[] }) {
  const ready = useCartReady();
  const { wishlist } = useCartState();
  const saved = wishlist.map((slug) => products.find((p) => p.slug === slug)).filter((p): p is Product => Boolean(p));

  if (!ready) {
    return (
      <div aria-busy="true" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    );
  }

  if (!saved.length) {
    return (
      <div className="rounded-panel bg-linear-to-br from-blush via-cream to-lavender-mist px-6 py-16 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white text-primary-strong shadow-card">
          <Heart aria-hidden className="size-8" strokeWidth={1.6} />
        </span>
        <h2 className="mt-5 text-xl font-bold sm:text-2xl">Your wishlist is empty</h2>
        <p className="mx-auto mt-2 max-w-[40ch] text-muted-foreground">Tap the heart on any product to save it for later.</p>
        <ButtonLink href={routes.shop} className="mt-7">
          Explore Products
          <ButtonArrow />
        </ButtonLink>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {saved.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
