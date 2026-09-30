import type { PriceBand, SortKey } from "@/types/product";

/* Shop UI configuration: price filters, sort options and pagination size. */

export const priceBands: readonly PriceBand[] = [
  { id: "under-200", label: "Under ₹200", min: 0, max: 200 },
  { id: "200-500", label: "₹200 – ₹500", min: 200, max: 500 },
  { id: "500-1000", label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { id: "over-1000", label: "₹1,000 & above", min: 1000, max: null },
];

export const sortOptions: readonly { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export const SHOP_PAGE_SIZE = 12;
