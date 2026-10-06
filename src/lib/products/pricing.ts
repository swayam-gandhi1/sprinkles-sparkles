import { formatPrice } from "@/lib/products/query";
import type { PackTier, Product } from "@/types/product";

/*
 * Pure helpers for pack / bulk pricing. Packaging is sold by the pack, priced
 * per piece, so every surface has to say both numbers — "25 pcs · ₹18/pc" —
 * and never a bare "₹18". No I/O, so this stays valid when products come from
 * an API.
 */

type WithTiers = Pick<Product, "price" | "priceUnit" | "packTiers">;

/** Total for a pack: the shop's own quote when it gave one, else qty × unit. */
export const packTotal = (tier: PackTier) => tier.packPrice ?? tier.qty * tier.unitPrice;

/** Cheapest per-piece price across the tiers — the "From ₹…" figure. */
export function startingUnitPrice(product: WithTiers): number | undefined {
  if (!product.packTiers?.length) return product.price;
  return Math.min(...product.packTiers.map((t) => t.unitPrice));
}

/**
 * Per-piece price actually earned at `qty` pieces: the best tier the order
 * already qualifies for. Below the smallest pack the smallest pack's rate
 * applies, so a single piece is never cheaper than a pack.
 */
export function unitPriceFor(product: WithTiers, qty: number): number | undefined {
  const tiers = product.packTiers;
  if (!tiers?.length) return product.price;
  const earned = tiers.filter((t) => qty >= t.qty).sort((a, b) => b.qty - a.qty)[0];
  const smallest = [...tiers].sort((a, b) => a.qty - b.qty)[0];
  return (earned ?? smallest)?.unitPrice;
}

/** "25 pcs" — the pack size on its own. */
export const packSizeLabel = (tier: PackTier) => `${tier.qty} ${tier.qty === 1 ? "pc" : "pcs"}`;

/** "₹18/pc" — a per-piece rate that always carries its unit. */
export const unitPriceLabel = (value: number, unit = "pc") => `${formatPrice(value)}/${unit}`;

/** "25 pcs · ₹18/pc" — the full, unambiguous pack label. */
export const packTierLabel = (tier: PackTier, unit = "pc") =>
  `${packSizeLabel(tier)} · ${unitPriceLabel(tier.unitPrice, unit)}`;

/** Tiers smallest pack first, for consistent ordering wherever they are listed. */
export const orderedTiers = (product: WithTiers): readonly PackTier[] =>
  product.packTiers ? [...product.packTiers].sort((a, b) => a.qty - b.qty) : [];

/** Percentage saved per piece against the smallest pack, or null for that pack itself. */
export function tierSaving(tiers: readonly PackTier[], tier: PackTier): number | null {
  const base = tiers.find((t) => t.qty === Math.min(...tiers.map((x) => x.qty)));
  if (!base || base.unitPrice <= tier.unitPrice) return null;
  return Math.round(((base.unitPrice - tier.unitPrice) / base.unitPrice) * 100);
}
