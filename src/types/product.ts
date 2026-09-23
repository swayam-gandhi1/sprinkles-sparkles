import type { LucideIcon } from "lucide-react";
import type { ImageAsset, Tone } from "./content";

/**
 * A product photo. `placeholder: true` marks an AI-generated stand-in used
 * until the client supplies the real product photograph — swap `src` and
 * drop the flag; nothing else changes.
 */
export type ProductImage = ImageAsset & {
  src: string;
  placeholder?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Slug of a `ShopCategory`. */
  category: string;
  /** Homepage collection slugs (`/shop?collection=…`), e.g. "decorate". */
  collections: readonly string[];
  /** Occasion slugs (`/shop?occasion=…`), e.g. "birthdays". */
  occasions?: readonly string[];
  /** One or two sentences for the product page. */
  description: string;
  /** Selling price in INR. */
  price: number;
  /** Original price in INR; shown struck through when higher than `price`. */
  compareAtPrice?: number;
  /** Price is a starting point (customised items) — shown as "From ₹…". */
  priceFrom?: boolean;
  isNew?: boolean;
  inStock: boolean;
  /** ISO date, used for "Newest" sorting. */
  addedAt: string;
  image: ProductImage;
};

export type ShopCategory = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
};

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "name-asc";

/** Price bands offered by the price filter (INR, inclusive min / exclusive max). */
export type PriceBand = {
  id: string;
  label: string;
  min: number;
  max: number | null;
};

/** Parsed, validated shop URL state. */
export type ShopQuery = {
  q: string;
  categories: readonly string[];
  collection: string | null;
  occasion: string | null;
  price: string | null;
  inStockOnly: boolean;
  sort: SortKey;
  page: number;
};

export type FacetOption = {
  value: string;
  label: string;
  count: number;
};

export type ShopResult = {
  items: readonly Product[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  facets: {
    categories: readonly FacetOption[];
    collections: readonly FacetOption[];
    occasions: readonly FacetOption[];
    prices: readonly FacetOption[];
    /** Out-of-stock count; the availability filter only renders when > 0. */
    outOfStock: number;
  };
};
