import { priceBands, SHOP_PAGE_SIZE } from "@/data/shop";
import type {
  ApiProductDetailResponse,
  ApiProductsListResponse,
} from "@/types/api";
import type {
  FacetOption,
  Product,
  ShopQuery,
  ShopResult,
} from "@/types/product";
import { getCategories } from "./categories";
import { getCollections } from "./collections";
import { getOccasions } from "./occasions";
import { apiFetch, ApiError, buildApiUrl } from "./client";
import { normalizeProduct } from "./normalizers";

/**
 * Fetch all published products from GET /api/public/products
 */
export async function getAllProducts(pageSize = 100): Promise<readonly Product[]> {
  try {
    const url = buildApiUrl("/api/public/products", {
      pageSize,
      status: "published",
    });

    const res = await apiFetch<ApiProductsListResponse>(url, {
      next: { revalidate: 60 },
    });

    const items = res?.data?.items ?? [];
    return items.map(normalizeProduct);
  } catch (error) {
    console.error("Failed to fetch all products from API:", error);
    return [];
  }
}

/**
 * Fetch a single product by slug from GET /api/public/products/[slug]
 */
export async function getProduct(slug: string): Promise<Product | null> {
  if (!slug) return null;

  try {
    const url = buildApiUrl(`/api/public/products/${encodeURIComponent(slug)}`);
    const res = await apiFetch<ApiProductDetailResponse>(url, {
      next: { revalidate: 60 },
    });

    if (!res?.data) return null;

    // Safety check: ensure backend marked product as public
    if (res.data.status && res.data.status !== "published") {
      return null;
    }

    return normalizeProduct(res.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    console.error(`Failed to fetch product [${slug}] from API:`, error);
    return null;
  }
}

/**
 * Connect the shop search and filtering directly to the backend API.
 * Uses GET /api/public/products with query parameters.
 */
export async function searchProducts(query: ShopQuery): Promise<ShopResult> {
  const page = query.page > 0 ? query.page : 1;
  const pageSize = SHOP_PAGE_SIZE;

  // Build backend query parameters
  const params: Record<string, string | number | boolean | null | undefined> = {
    page,
    pageSize,
  };

  if (query.q) {
    params.search = query.q;
  }

  if (query.categories?.length) {
    params.category = query.categories.join(",");
  }

  if (query.subcategory) {
    params.subcategory = query.subcategory;
  }

  if (query.collection) {
    params.collection = query.collection;
  }

  if (query.occasion) {
    params.occasion = query.occasion;
  }

  if (query.brand) {
    params.brand = query.brand;
  }

  if (query.inStockOnly) {
    params.inStock = true;
  }

  if (query.price) {
    const band = priceBands.find((b) => b.id === query.price);
    if (band) {
      params.minPrice = band.min;
      if (band.max !== null) {
        params.maxPrice = band.max;
      }
    }
  }

  if (query.sort && query.sort !== "featured") {
    params.sort = query.sort;
  }

  try {
    const url = buildApiUrl("/api/public/products", params);
    const [productsRes, categoriesList, collectionsList, occasionsList] =
      await Promise.all([
        apiFetch<ApiProductsListResponse>(url, { next: { revalidate: 60 } }),
        getCategories(),
        getCollections(),
        getOccasions(),
      ]);

    const rawItems = productsRes?.data?.items ?? [];
    const pagination = productsRes?.data?.pagination ?? {
      page,
      pageSize,
      total: rawItems.length,
      totalPages: Math.max(1, Math.ceil(rawItems.length / pageSize)),
    };

    const items = rawItems.map(normalizeProduct);

    // Build facet options based on live backend catalog categories, collections, and occasions
    const categoryFacets: FacetOption[] = categoriesList.map((c) => ({
      value: c.slug,
      label: c.name,
      count: items.filter((p) => p.category === c.slug).length,
    }));

    const collectionFacets: FacetOption[] = collectionsList.map((c) => ({
      value: c.slug,
      label: c.name,
      count: items.filter((p) => p.collections.includes(c.slug)).length,
    }));

    const occasionFacets: FacetOption[] = occasionsList.map((o) => ({
      value: o.slug,
      label: o.name,
      count: items.filter((p) => (p.occasions ?? []).includes(o.slug)).length,
    }));

    const priceFacets: FacetOption[] = priceBands.map((b) => ({
      value: b.id,
      label: b.label,
      count: items.filter(
        (p) => p.price >= b.min && (b.max === null || p.price < b.max),
      ).length,
    }));

    const outOfStockCount = items.filter((p) => !p.inStock).length;

    return {
      items,
      total: pagination.total,
      page: pagination.page,
      pageCount: Math.max(1, pagination.totalPages),
      pageSize: pagination.pageSize,
      facets: {
        categories: categoryFacets,
        collections: collectionFacets,
        occasions: occasionFacets,
        prices: priceFacets,
        outOfStock: outOfStockCount,
      },
    };
  } catch (error) {
    console.error("Failed to search products from API:", error);

    // Return empty results with graceful facets if backend is temporarily unreachable
    return {
      items: [],
      total: 0,
      page: 1,
      pageCount: 1,
      pageSize,
      facets: {
        categories: [],
        collections: [],
        occasions: [],
        prices: priceBands.map((b) => ({ value: b.id, label: b.label, count: 0 })),
        outOfStock: 0,
      },
    };
  }
}

/**
 * Fetch related products for the product detail page.
 * Prioritizes same-category products from the backend.
 */
export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<readonly Product[]> {
  try {
    const url = buildApiUrl("/api/public/products", {
      category: product.category !== "all" ? product.category : undefined,
      pageSize: limit + 1,
    });

    const res = await apiFetch<ApiProductsListResponse>(url, {
      next: { revalidate: 60 },
    });

    const items = (res?.data?.items ?? [])
      .map(normalizeProduct)
      .filter((p) => p.slug !== product.slug)
      .slice(0, limit);

    return items;
  } catch (error) {
    console.error("Failed to fetch related products from API:", error);
    return [];
  }
}
