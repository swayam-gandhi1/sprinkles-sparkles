import { formatPrice } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";

type ProductPriceProps = {
  product: Pick<Product, "price" | "compareAtPrice" | "priceFrom" | "priceUnit" | "pricePending">;
  size?: "md" | "lg";
  className?: string;
};

/**
 * Selling price, "From" prefix for pack-priced and made-to-order items, the unit
 * the price is quoted in ("/pc"), and a struck-through original price. Renders
 * nothing when the product has no price at all, and a plain "Price on request"
 * when a price is expected but not yet confirmed.
 */
export function ProductPrice({ product, size = "md", className }: ProductPriceProps) {
  const { price, compareAtPrice, priceFrom, priceUnit, pricePending } = product;

  if (pricePending || price === undefined) {
    return pricePending ? (
      <p className={cn("font-semibold text-muted-foreground", size === "lg" ? "text-lg" : "text-sm", className)}>
        Price on request
      </p>
    ) : null;
  }

  const onSale = compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      {priceFrom ? (
        <span className={cn("font-medium text-muted-foreground", size === "lg" ? "text-base" : "text-xs")}>From</span>
      ) : null}
      <span className={cn("font-bold tracking-tight text-foreground", size === "lg" ? "text-3xl" : "text-lg")}>
        {formatPrice(price)}
        {priceUnit ? (
          <span className={cn("font-semibold text-muted-foreground", size === "lg" ? "text-lg" : "text-sm")}>
            /{priceUnit}
          </span>
        ) : null}
      </span>
      {onSale ? (
        <>
          <span className="sr-only">, was</span>
          <s className={cn("text-muted-foreground", size === "lg" ? "text-lg" : "text-sm")}>
            {formatPrice(compareAtPrice)}
          </s>
        </>
      ) : null}
    </p>
  );
}

/** Rounded percentage saved, or null when not on sale. */
export function discountPercent(product: Pick<Product, "price" | "compareAtPrice">) {
  const { price, compareAtPrice } = product;
  if (price === undefined || compareAtPrice === undefined || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
