import { type BentoProductRecord, getLocalBentoProducts } from "@/data/bento-products";
import { type DiwaliProductRecord, getLocalDiwaliProducts } from "@/data/diwali-products";
import { products as sampleCatalog } from "@/data/products";
import { queryProducts } from "@/lib/products/query";
import type { Product, ProductImage, ShopQuery, ShopResult } from "@/types/product";

/*
 * Product data-access layer. Today it serves the sample catalog in
 * src/data/products.ts plus the client's Diwali range in
 * src/data/diwali-products.ts; when the backend is connected, replace the
 * loaders with `apiFetch` calls and map the response to `Product` — callers
 * don't change.
 */

/** Maps a Diwali record (shaped like the future API response) onto the shop's `Product`. */
function fromDiwaliRecord(record: DiwaliProductRecord): Product {
  const images: ProductImage[] = record.images.map((src, i) => ({
    src,
    alt: record.images.length > 1 ? `${record.name} — photo ${i + 1}` : record.name,
  }));
  const [image] = images;
  if (!image) throw new Error(`Diwali product "${record.slug}" has no images`);
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    description: record.description,
    category: "diwali-collection",
    collections: ["gifting"],
    occasions: ["festivals"],
    image,
    ...(images.length > 1 ? { images } : {}),
  };
}

/**
 * Maps a Bento Boxes record onto the shop `Product`. Pack-priced items expose
 * the cheapest per-piece rate as `price` with `priceFrom`, so cards, sorting and
 * the price filter all read "From ₹x/pc" from the same number the tiers quote.
 */
function fromBentoRecord(record: BentoProductRecord): Product {
  const images: ProductImage[] = record.images.map((src, i) => ({
    src,
    alt: record.alts[i] ?? record.name,
  }));
  const [image] = images;
  if (!image) throw new Error(`Bento product "${record.slug}" has no images`);

  const tiers = record.packTiers;
  const price = tiers?.length ? Math.min(...tiers.map((t) => t.unitPrice)) : record.unitPrice;

  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    description: record.description,
    category: "bento-boxes",
    collections: ["packaging"],
    occasions: ["birthdays", "special-occasions"],
    image,
    sku: record.sku,
    priceUnit: "pc",
    ...(images.length > 1 ? { images } : {}),
    ...(price !== undefined ? { price } : {}),
    // Several packs to choose from ⇒ the headline price is a starting point.
    ...(tiers && tiers.length > 1 ? { priceFrom: true } : {}),
    ...(tiers?.length ? { packTiers: tiers } : {}),
    ...(record.pricePending ? { pricePending: true } : {}),
    ...(record.dimensions ? { dimensions: record.dimensions } : {}),
    ...(record.isNew ? { isNew: true } : {}),
    ...(record.inStock !== undefined ? { inStock: record.inStock } : {}),
    ...(record.addedAt ? { addedAt: record.addedAt } : {}),
  };
}

async function loadCatalog(): Promise<readonly Product[]> {
  const diwali = (await getLocalDiwaliProducts()).map(fromDiwaliRecord);
  const bento = (await getLocalBentoProducts()).map(fromBentoRecord);
  return [...sampleCatalog, ...bento, ...diwali];
}

export async function getAllProducts(): Promise<readonly Product[]> {
  return loadCatalog();
}

export async function getProduct(slug: string): Promise<Product | null> {
  return (await loadCatalog()).find((p) => p.slug === slug) ?? null;
}

export async function searchProducts(query: ShopQuery): Promise<ShopResult> {
  return queryProducts(await loadCatalog(), query);
}

/** Same-category products first, then shared collections. */
export async function getRelatedProducts(product: Product, limit = 4): Promise<readonly Product[]> {
  const others = (await loadCatalog()).filter((p) => p.slug !== product.slug);
  const score = (p: Product) =>
    (p.category === product.category ? 2 : 0) + p.collections.filter((c) => product.collections.includes(c)).length;
  return others
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}
