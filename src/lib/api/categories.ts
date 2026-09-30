import {
  CakeSlice,
  Candy,
  Flame,
  Gift,
  Package,
  Palette,
  Scissors,
  Sparkles,
  Star,
  Sticker,
  UtensilsCrossed,
  Wheat,
  Folder,
  type LucideIcon,
} from "lucide-react";
import type { Tone } from "@/types/content";
import type {
  ApiCategory,
  ApiCategoriesListResponse,
  ApiCategoryDetailResponse,
  ApiSubcategoriesListResponse,
  ApiSubcategory,
} from "@/types/api";
import type { ShopCategory } from "@/types/product";
import { apiFetch, ApiError } from "./client";

const iconMap: Record<string, { icon: LucideIcon; tone: Tone }> = {
  "baking-ingredients": { icon: Wheat, tone: "sunny" },
  "baking-tins": { icon: CakeSlice, tone: "aqua" },
  sprinkles: { icon: Sparkles, tone: "blush" },
  "colours-essences": { icon: Palette, tone: "lavender" },
  toppers: { icon: Star, tone: "lavender" },
  "knife-cutters": { icon: Scissors, tone: "lavender" },
  "acrylic-toppers": { icon: Star, tone: "lavender" },
  "paper-theme-toppers": { icon: Sticker, tone: "blush" },
  chocolates: { icon: Candy, tone: "cream" },
  "chocolate-boxes": { icon: Candy, tone: "cream" },
  "tools-equipment": { icon: UtensilsCrossed, tone: "aqua" },
  boxes: { icon: Package, tone: "blush" },
  "boxes-packaging": { icon: Package, tone: "blush" },
  gifting: { icon: Gift, tone: "sunny" },
  "gifting-hampers": { icon: Gift, tone: "sunny" },
  "diwali-collection": { icon: Flame, tone: "sunny" },
  "diwali-exclusive-range": { icon: Flame, tone: "sunny" },
  "festive-collection": { icon: Flame, tone: "sunny" },
};

const tonesList: Tone[] = ["blush", "aqua", "lavender", "sunny", "cream"];

export function getCategoryVisuals(slug: string, index = 0): { icon: LucideIcon; tone: Tone } {
  if (iconMap[slug]) return iconMap[slug];
  return {
    icon: Folder,
    tone: tonesList[index % tonesList.length] ?? "blush",
  };
}

export function formatShopCategory(cat: ApiCategory, index = 0): ShopCategory {
  const visuals = getCategoryVisuals(cat.slug, index);
  return {
    slug: cat.slug,
    name: cat.name,
    icon: visuals.icon,
    tone: visuals.tone,
    description: cat.description ?? undefined,
    subcategories: cat.subcategories?.map((s) => ({
      slug: s.slug,
      name: s.name,
      description: s.description ?? undefined,
    })),
  };
}

/**
 * Fetch all categories from GET /api/public/categories
 */
export async function getCategories(): Promise<readonly ShopCategory[]> {
  try {
    const res = await apiFetch<ApiCategoriesListResponse>("/api/public/categories", {
      next: { revalidate: 3600 },
    });
    const items = res?.data ?? [];
    return items.map((cat, i) => formatShopCategory(cat, i));
  } catch (error) {
    console.error("Failed to load categories from API:", error);
    return [];
  }
}

/**
 * Fetch a single category by slug from GET /api/public/categories/[slug]
 */
export async function getCategory(slug: string): Promise<ShopCategory | null> {
  try {
    const res = await apiFetch<ApiCategoryDetailResponse>(`/api/public/categories/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res?.data) return null;
    return formatShopCategory(res.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    console.error(`Failed to load category ${slug} from API:`, error);
    return null;
  }
}

/**
 * Fetch all subcategories from GET /api/public/subcategories
 */
export async function getSubcategories(): Promise<readonly ApiSubcategory[]> {
  try {
    const res = await apiFetch<ApiSubcategoriesListResponse>("/api/public/subcategories", {
      next: { revalidate: 3600 },
    });
    return res?.data ?? [];
  } catch (error) {
    console.error("Failed to load subcategories from API:", error);
    return [];
  }
}
