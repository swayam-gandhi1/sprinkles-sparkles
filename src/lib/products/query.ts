import { priceBands, SHOP_PAGE_SIZE, shopCategories, shopCollections, shopOccasions, sortOptions } from "@/data/shop";
import { routes } from "@/lib/config/routes";
import type { FacetOption, Product, ShopQuery, ShopResult, SortKey } from "@/types/product";

/*
 * Pure shop logic: URL ⇄ query parsing, filtering, facet counts, sorting and
 * pagination. No I/O — the data source is passed in, so this keeps working
 * unchanged when products come from an API.
 */

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

const categorySlugs = new Set(shopCategories.map((c) => c.slug));
const sortKeys = new Set<string>(sortOptions.map((o) => o.value));

/** Parse and validate URL search params; unknown values are dropped, never trusted. */
export function parseShopQuery(params: RawParams): ShopQuery {
  const categories = first(params.category)
    .split(",")
    .map((s) => s.trim())
    .filter((s) => categorySlugs.has(s));
  const collection = first(params.collection);
  const occasion = first(params.occasion);
  const price = first(params.price);
  const sort = first(params.sort);
  const page = Number.parseInt(first(params.page), 10);

  return {
    q: first(params.q).slice(0, 80),
    categories: [...new Set(categories)],
    collection: collection in shopCollections ? collection : null,
    occasion: occasion in shopOccasions ? occasion : null,
    price: priceBands.some((b) => b.id === price) ? price : null,
    inStockOnly: first(params.stock) === "in",
    sort: sortKeys.has(sort) ? (sort as SortKey) : "featured",
    page: Number.isFinite(page) && page > 1 ? page : 1,
  };
}

/** Serialise a query back to a `/shop?…` URL, omitting defaults. */
export function shopHref(query: Partial<ShopQuery>) {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.categories?.length) params.set("category", query.categories.join(","));
  if (query.collection) params.set("collection", query.collection);
  if (query.occasion) params.set("occasion", query.occasion);
  if (query.price) params.set("price", query.price);
  if (query.inStockOnly) params.set("stock", "in");
  if (query.sort && query.sort !== "featured") params.set("sort", query.sort);
  if (query.page && query.page > 1) params.set("page", String(query.page));
  const search = params.toString();
  return search ? `${routes.shop}?${search}` : routes.shop;
}

export const hasActiveFilters = (q: ShopQuery) =>
  Boolean(q.q || q.categories.length || q.collection || q.occasion || q.price || q.inStockOnly);

const normalise = (s: string) => s.toLowerCase().normalize("NFKD");

type Predicate = (p: Product) => boolean;

function predicates(q: ShopQuery): Record<"q" | "category" | "collection" | "occasion" | "price" | "stock", Predicate> {
  const band = priceBands.find((b) => b.id === q.price);
  const terms = normalise(q.q).split(/\s+/).filter(Boolean);
  const categoryName = (slug: string) => shopCategories.find((c) => c.slug === slug)?.name ?? "";

  return {
    q: (p) => {
      if (!terms.length) return true;
      const haystack = normalise(`${p.name} ${categoryName(p.category)} ${p.description}`);
      return terms.every((t) => haystack.includes(t));
    },
    category: (p) => !q.categories.length || q.categories.includes(p.category),
    collection: (p) => !q.collection || p.collections.includes(q.collection),
    occasion: (p) => !q.occasion || (p.occasions ?? []).includes(q.occasion),
    price: (p) => !band || (p.price >= band.min && (band.max === null || p.price < band.max)),
    stock: (p) => !q.inStockOnly || p.inStock,
  };
}

/** Products matching every active filter except `skip` — used for facet counts. */
function matching(products: readonly Product[], q: ShopQuery, skip?: keyof ReturnType<typeof predicates>) {
  const preds = Object.entries(predicates(q))
    .filter(([key]) => key !== skip)
    .map(([, fn]) => fn);
  return products.filter((p) => preds.every((fn) => fn(p)));
}

const sorters: Record<SortKey, ((a: Product, b: Product) => number) | null> = {
  featured: null,
  newest: (a, b) => b.addedAt.localeCompare(a.addedAt),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "name-asc": (a, b) => a.name.localeCompare(b.name, "en-IN"),
};

function countBy(items: readonly Product[], keys: (p: Product) => readonly string[]) {
  const counts = new Map<string, number>();
  for (const item of items) for (const key of keys(item)) counts.set(key, (counts.get(key) ?? 0) + 1);
  return counts;
}

/** Filter, count, sort and paginate. Facet counts reflect the other active filters. */
export function queryProducts(products: readonly Product[], q: ShopQuery): ShopResult {
  const filtered = matching(products, q);
  const sorter = sorters[q.sort];
  const sorted = sorter ? [...filtered].sort(sorter) : filtered;

  const pageCount = Math.max(1, Math.ceil(sorted.length / SHOP_PAGE_SIZE));
  const page = Math.min(q.page, pageCount);
  const start = (page - 1) * SHOP_PAGE_SIZE;

  const categoryCounts = countBy(matching(products, q, "category"), (p) => [p.category]);
  const collectionCounts = countBy(matching(products, q, "collection"), (p) => p.collections);
  const occasionCounts = countBy(matching(products, q, "occasion"), (p) => p.occasions ?? []);
  const priceBase = matching(products, q, "price");

  // Only offer options that exist in the catalog at all (a zero count may still show
  // while other filters narrow it, so the list doesn't jump around).
  const inCatalog = {
    categories: new Set(products.map((p) => p.category)),
    collections: new Set(products.flatMap((p) => p.collections)),
    occasions: new Set(products.flatMap((p) => p.occasions ?? [])),
  };

  const facet = (entries: [string, string][], counts: Map<string, number>, present: Set<string>): FacetOption[] =>
    entries
      .filter(([value]) => present.has(value))
      .map(([value, label]) => ({ value, label, count: counts.get(value) ?? 0 }));

  return {
    items: sorted.slice(start, start + SHOP_PAGE_SIZE),
    total: sorted.length,
    page,
    pageCount,
    pageSize: SHOP_PAGE_SIZE,
    facets: {
      categories: facet(
        shopCategories.map((c) => [c.slug, c.name]),
        categoryCounts,
        inCatalog.categories,
      ),
      collections: facet(Object.entries(shopCollections), collectionCounts, inCatalog.collections),
      occasions: facet(Object.entries(shopOccasions), occasionCounts, inCatalog.occasions),
      prices: priceBands.map((b) => ({
        value: b.id,
        label: b.label,
        count: priceBase.filter((p) => p.price >= b.min && (b.max === null || p.price < b.max)).length,
      })),
      outOfStock: products.filter((p) => !p.inStock).length,
    },
  };
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const formatPrice = (value: number) => inr.format(value);
