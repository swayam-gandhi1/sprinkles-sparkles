import Image from "next/image";
import Link from "next/link";
import { tones } from "@/components/common/tones";
import { shopCategories } from "@/data/shop";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./AddToCartButton";
import { discountPercent, ProductPrice } from "./ProductPrice";
import { WishlistButton } from "./WishlistButton";

type ProductCardProps = {
  product: Product;
  /** Eager-load the image (first row above the fold). */
  priority?: boolean;
  className?: string;
};

/**
 * Reusable product tile. Contains no server-only code, so it renders from both
 * Server Components (shop grid) and Client Components (wishlist page).
 */
export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const category = shopCategories.find((c) => c.slug === product.category);
  const tone = tones[category?.tone ?? "blush"];
  const href = routes.product(product.slug);
  const discount = discountPercent(product);

  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-card transition-[translate,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-1 hover:border-blush-strong hover:shadow-card-hover",
        className,
      )}
    >
      {/* Tinted frame doubles as the loading placeholder while the photo arrives */}
      <div className={cn("relative aspect-square overflow-hidden bg-linear-to-br", tone.gradient)}>
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1280px) 17rem, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
          preload={priority}
          style={product.image.position ? { objectPosition: product.image.position } : undefined}
          className="object-cover transition-transform duration-700 ease-premium group-hover/card:scale-[1.06]"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-2.5 top-2.5 z-10 flex items-start justify-between gap-2">
        <div className="flex flex-col items-start gap-1.5">
          {!product.inStock ? (
            <span className="rounded-full bg-navy px-2.5 py-1 text-[0.6875rem] font-semibold text-white">Out of stock</span>
          ) : discount ? (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[0.6875rem] font-semibold text-white">
              {discount}% off
            </span>
          ) : product.isNew ? (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[0.6875rem] font-semibold text-white">New</span>
          ) : null}
        </div>
        <WishlistButton slug={product.slug} name={product.name} className="pointer-events-auto" />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className={cn("text-[0.6875rem] font-semibold tracking-wide uppercase sm:text-xs", tone.text)}>
          {category?.name}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.5em] text-sm leading-snug font-semibold sm:text-[0.9375rem]">
          <Link href={href} className="transition-colors after:absolute after:inset-0 after:z-0 hover:text-primary-strong">
            {product.name}
          </Link>
        </h3>
        <ProductPrice product={product} className="mt-2" />
        <div className="relative z-10 mt-auto pt-3">
          <AddToCartButton
            slug={product.slug}
            name={product.name}
            inStock={product.inStock}
            size="sm"
            className="h-10 text-[0.8125rem]"
          />
        </div>
      </div>
    </article>
  );
}
