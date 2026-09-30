import type {
  ApiCollection,
  ApiCollectionsListResponse,
  ApiCollectionDetailResponse,
} from "@/types/api";
import { apiFetch, ApiError } from "./client";

/**
 * Fetch all collections from GET /api/public/collections
 */
export async function getCollections(): Promise<readonly ApiCollection[]> {
  try {
    const res = await apiFetch<ApiCollectionsListResponse>("/api/public/collections", {
      next: { revalidate: 3600 },
    });
    return res?.data ?? [];
  } catch (error) {
    console.error("Failed to load collections from API:", error);
    return [];
  }
}

/**
 * Fetch a single collection by slug from GET /api/public/collections/[slug]
 */
export async function getCollection(slug: string): Promise<ApiCollection | null> {
  try {
    const res = await apiFetch<ApiCollectionDetailResponse>(`/api/public/collections/${slug}`, {
      next: { revalidate: 3600 },
    });
    return res?.data ?? null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    console.error(`Failed to load collection ${slug} from API:`, error);
    return null;
  }
}
