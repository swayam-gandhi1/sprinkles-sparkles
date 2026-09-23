import { products as sampleCatalog } from "@/data/products";
import { queryProducts } from "@/lib/products/query";
import type { Product, ShopQuery, ShopResult } from "@/types/product";

/*
 * Product data-access layer. Today it serves the sample catalog in
 * src/data/products.ts; when Strapi is connected, replace `loadCatalog`
 * with an `apiFetch` call and map the response to `Product` — callers
 * don't change.
 */

async function loadCatalog(): Promise<readonly Product[]> {
  return sampleCatalog;
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
