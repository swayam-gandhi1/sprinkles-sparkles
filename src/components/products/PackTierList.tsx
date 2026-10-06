import { orderedTiers, packSizeLabel, unitPriceLabel } from "@/lib/products/pricing";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";

type PackTierListProps = {
  product: Pick<Product, "packTiers" | "priceUnit">;
  className?: string;
};

/**
 * The pack sizes on a product card, each spelling out its own per-piece rate
 * ("25 pcs · ₹18/pc") so a price is never shown without saying what it buys.
 * Renders nothing for products that aren't sold in packs.
 */
export function PackTierList({ product, className }: PackTierListProps) {
  const tiers = orderedTiers(product);
  if (!tiers.length) return null;
  const unit = product.priceUnit ?? "pc";

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Pack sizes and price per piece">
      {tiers.map((tier) => (
        <li
          key={tier.qty}
          className="rounded-full bg-aqua-mist px-2 py-1 text-[0.6875rem] leading-none font-semibold text-accent-strong"
        >
          <span className="tabular-nums">{packSizeLabel(tier)}</span>
          <span aria-hidden className="mx-1 text-accent-strong/50">
            ·
          </span>
          <span className="tabular-nums">{unitPriceLabel(tier.unitPrice, unit)}</span>
        </li>
      ))}
    </ul>
  );
}
