import { formatPrice } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";

type ProductPriceProps = {
  product: Pick<Product, "price" | "compareAtPrice" | "priceFrom">;
  size?: "md" | "lg";
  className?: string;
};

/** Selling price, "From" prefix for made-to-order items, and a struck-through original price. */
export function ProductPrice({ product, size = "md", className }: ProductPriceProps) {
  const { price, compareAtPrice, priceFrom } = product;
  const onSale = compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      {priceFrom ? (
        <span className={cn("font-medium text-muted-foreground", size === "lg" ? "text-base" : "text-xs")}>From</span>
      ) : null}
      <span className={cn("font-bold tracking-tight text-foreground", size === "lg" ? "text-3xl" : "text-lg")}>
        {formatPrice(price)}
      </span>
      {onSale ? (
        <>
          <span className="sr-only">, was</span>
          <s className={cn("text-muted-foreground", size === "lg" ? "text-lg" : "text-sm")}>{formatPrice(compareAtPrice)}</s>
        </>
      ) : null}
    </p>
  );
}

/** Rounded percentage saved, or null when not on sale. */
export function discountPercent(product: Pick<Product, "price" | "compareAtPrice">) {
  const { price, compareAtPrice } = product;
  if (compareAtPrice === undefined || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
