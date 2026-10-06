"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { orderedTiers, packSizeLabel, packTotal, tierSaving, unitPriceLabel } from "@/lib/products/pricing";
import { formatPrice } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";

type PackPickerProps = {
  product: Pick<Product, "slug" | "name" | "inStock" | "packTiers" | "priceUnit">;
};

/**
 * Pack selector for packaging sold by the pack and priced per piece. Picking a
 * pack updates the per-piece rate and the pack total, and adds that many pieces
 * to the cart — so what the customer sees is exactly what they buy.
 */
export function PackPicker({ product }: PackPickerProps) {
  const tiers = orderedTiers(product);
  const [selected, setSelected] = useState(0);
  const groupId = useId();
  const unit = product.priceUnit ?? "pc";

  const tier = tiers[selected] ?? tiers[0];
  if (!tier) return null;

  const total = packTotal(tier);
  const wasTotal = tier.compareAtPackPrice;

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-semibold text-foreground">
          Choose a pack <span className="font-normal text-muted-foreground">— priced per piece</span>
        </legend>

        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {tiers.map((option, i) => {
            const active = i === selected;
            const saving = tierSaving(tiers, option);
            return (
              <label
                key={option.qty}
                className={cn(
                  "relative flex cursor-pointer items-center gap-3 rounded-card border-2 bg-white p-3.5 transition-colors duration-200 ease-premium",
                  active ? "border-primary bg-blush/40 shadow-card" : "border-border hover:border-blush-strong",
                )}
              >
                <input
                  type="radio"
                  name={groupId}
                  value={option.qty}
                  checked={active}
                  onChange={() => setSelected(i)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                    active ? "border-primary bg-primary text-white" : "border-border",
                  )}
                >
                  {active ? <Check className="size-3" strokeWidth={3} /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[0.9375rem] font-bold tabular-nums">{packSizeLabel(option)}</span>
                    {saving ? (
                      <span className="rounded-full bg-aqua-mist px-2 py-0.5 text-[0.625rem] font-semibold text-accent-strong">
                        Save {saving}%
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-primary-strong tabular-nums">
                    {unitPriceLabel(option.unitPrice, unit)}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground tabular-nums">
                    {formatPrice(packTotal(option))} per pack
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <p
        aria-live="polite"
        className="mt-4 flex flex-wrap items-baseline gap-x-2 rounded-card bg-lavender-mist px-4 py-3 text-sm text-foreground/85"
      >
        <span className="tabular-nums">
          {packSizeLabel(tier)} × {unitPriceLabel(tier.unitPrice, unit)}
        </span>
        <span aria-hidden className="text-muted-foreground">
          =
        </span>
        <span className="text-base font-bold tabular-nums">{formatPrice(total)}</span>
        {wasTotal !== undefined && wasTotal > total ? (
          <>
            <span className="sr-only">, was</span>
            <s className="text-muted-foreground tabular-nums">{formatPrice(wasTotal)}</s>
          </>
        ) : null}
      </p>

      <div className="mt-4 max-w-xs">
        <AddToCartButton
          slug={product.slug}
          name={`${product.name} (${packSizeLabel(tier)})`}
          inStock={product.inStock !== false}
          quantity={tier.qty}
          size="lg"
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Adds {packSizeLabel(tier)} to your cart.</p>
    </div>
  );
}
