import type {
  ApiOccasion,
  ApiOccasionsListResponse,
  ApiOccasionDetailResponse,
} from "@/types/api";
import { apiFetch, ApiError } from "./client";

/**
 * Fetch all occasions from GET /api/public/occasions
 */
export async function getOccasions(): Promise<readonly ApiOccasion[]> {
  try {
    const res = await apiFetch<ApiOccasionsListResponse>("/api/public/occasions", {
      next: { revalidate: 3600 },
    });
    return res?.data ?? [];
  } catch (error) {
    console.error("Failed to load occasions from API:", error);
    return [];
  }
}

/**
 * Fetch a single occasion by slug from GET /api/public/occasions/[slug]
 */
export async function getOccasion(slug: string): Promise<ApiOccasion | null> {
  try {
    const res = await apiFetch<ApiOccasionDetailResponse>(`/api/public/occasions/${slug}`, {
      next: { revalidate: 3600 },
    });
    return res?.data ?? null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    console.error(`Failed to load occasion ${slug} from API:`, error);
    return null;
  }
}
