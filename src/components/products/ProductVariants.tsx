"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";
import type { ProductVariant } from "@/types/product";

type ProductVariantsProps = {
  variants: readonly ProductVariant[];
  basePrice: number;
  onSelectVariant?: (variant: ProductVariant) => void;
};

export function ProductVariants({
  variants,
  basePrice,
  onSelectVariant,
}: ProductVariantsProps) {
  const [selectedId, setSelectedId] = useState<string>(variants[0]?.id ?? "");

  if (!variants.length) return null;

  const handleSelect = (variant: ProductVariant) => {
    setSelectedId(variant.id);
    onSelectVariant?.(variant);
  };

  return (
    <div className="mt-5 space-y-2.5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Available Options / Variants
      </h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const selected = v.id === selectedId;
          const displayPrice = v.salePrice ?? v.price ?? basePrice;

          return (
            <button
              key={v.id}
              type="button"
              onClick={() => handleSelect(v)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200",
                selected
                  ? "border-primary bg-blush text-primary-strong ring-2 ring-primary/20"
                  : "border-border bg-white text-foreground hover:border-blush-strong",
                !v.inStock && "opacity-50 line-through",
              )}
            >
              <span>{v.name}</span>
              <span className="text-[11px] text-muted-foreground font-normal">
                {formatPrice(displayPrice)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
