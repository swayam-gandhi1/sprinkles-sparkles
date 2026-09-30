import type { Category } from "@/types/content";

/**
 * DEPRECATED: Catalog categories are now fetched exclusively from the live backend
 * API via `src/lib/api/categories.ts` (GET /api/public/categories).
 *
 * Hardcoded catalog data has been removed in compliance with the backend-only architecture.
 */
export const categories: readonly Category[] = [];
