import type { Product } from "@/types/product";

/**
 * DEPRECATED: Catalog products are now fetched exclusively from the live backend
 * API via `src/lib/api/products.ts` (GET /api/public/products).
 *
 * Hardcoded mock products have been removed in compliance with the backend-only architecture.
 */
export const products: readonly Product[] = [];
