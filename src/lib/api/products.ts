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

async function loadCatalog(): Promise<readonly Product[]> {
  const diwali = (await getLocalDiwaliProducts()).map(fromDiwaliRecord);
  return [...sampleCatalog, ...diwali];
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
