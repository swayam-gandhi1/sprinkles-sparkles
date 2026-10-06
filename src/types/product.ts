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

/**
 * One pack size the shop sells an item in, with the price **per piece** at that
 * quantity. `packPrice` is set only when the shop quotes a pack total of its own
 * (otherwise the total is `qty × unitPrice`); `compareAtPackPrice` is the
 * struck-through pack total when that pack is on offer.
 */
export type PackTier = {
  /** Pieces in the pack. */
  qty: number;
  /** Price per piece in INR at this pack size. */
  unitPrice: number;
  /** Pack total quoted by the shop, when it differs from `qty × unitPrice`. */
  packPrice?: number;
  /** Original pack total, shown struck through. */
  compareAtPackPrice?: number;
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
  /** Selling price in INR. Absent while a price isn't confirmed — the UI then hides it. */
  price?: number;
  /** Original price in INR; shown struck through when higher than `price`. */
  compareAtPrice?: number;
  /** Price is a starting point (customised items) — shown as "From ₹…". */
  priceFrom?: boolean;
  isNew?: boolean;
  /** Absent when stock isn't tracked; only `false` shows as out of stock. */
  inStock?: boolean;
  /** ISO date, used for "Newest" sorting. */
  addedAt?: string;
  /** Primary photo (cards, cart). */
  image: ProductImage;
  /** Full gallery starting with `image`, when there is more than one photo. */
  images?: readonly ProductImage[];
  /**
   * Pack sizes with per-piece pricing, smallest pack first. When present,
   * `price` is the lowest per-piece price and `priceFrom` is set, so every
   * surface reads "From ₹x/pc".
   */
  packTiers?: readonly PackTier[];
  /** Unit the price is quoted in, e.g. "pc" — rendered as "₹20/pc". */
  priceUnit?: string;
  /** Stated dimensions, shown in the product information panel. */
  dimensions?: string;
  /** Stock-keeping unit. Shown on the product page, never in listings. */
  sku?: string;
  /** Price isn't confirmed by the client yet — the UI invites an enquiry instead. */
  pricePending?: boolean;
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
