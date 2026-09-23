import {
  CakeSlice,
  Candy,
  Flame,
  Flower2,
  Gift,
  Package,
  Palette,
  Sparkles,
  Star,
  UtensilsCrossed,
  WandSparkles,
  Wheat,
} from "lucide-react";
import type { Tone } from "@/types/content";
import type { PriceBand, ShopCategory, SortKey } from "@/types/product";

/* Shop taxonomy. Product records live in ./products.ts. */

export const shopCategories: readonly ShopCategory[] = [
  { slug: "baking-ingredients", name: "Baking Ingredients", icon: Wheat, tone: "sunny" },
  { slug: "baking-tins", name: "Baking Tins", icon: CakeSlice, tone: "aqua" },
  { slug: "sprinkles", name: "Sprinkles", icon: Sparkles, tone: "blush" },
  { slug: "colours-essences", name: "Colours & Essences", icon: Palette, tone: "lavender" },
  { slug: "toppers", name: "Toppers", icon: Star, tone: "lavender" },
  { slug: "decorations", name: "Decorations", icon: Flower2, tone: "blush" },
  { slug: "chocolates", name: "Chocolates", icon: Candy, tone: "cream" },
  { slug: "tools-equipment", name: "Tools & Equipment", icon: UtensilsCrossed, tone: "aqua" },
  { slug: "boxes", name: "Boxes & Packaging", icon: Package, tone: "blush" },
  { slug: "gifting", name: "Gifts & Hampers", icon: Gift, tone: "sunny" },
  { slug: "diwali-collection", name: "Diwali Collection", icon: Flame, tone: "sunny" },
];

/** Labels for the collection slugs the homepage links to (`/shop?collection=…`). */
export const shopCollections: Readonly<Record<string, string>> = {
  decorate: "Cake Decoration",
  "baking-ingredients": "Baking Essentials",
  "colours-essences": "Colours & Essences",
  toppers: "Toppers & Accessories",
  chocolates: "Chocolates",
  packaging: "Packaging",
  gifting: "Gifting",
  celebrations: "Celebrations",
};

/** Labels for the occasion slugs the homepage links to (`/shop?occasion=…`). */
export const shopOccasions: Readonly<Record<string, string>> = {
  birthdays: "Birthdays",
  festivals: "Festivals",
  rakhi: "Rakhi",
  "teachers-day": "Teacher's Day",
  "corporate-gifting": "Corporate Gifting",
  "special-occasions": "Special Occasions",
};

export const priceBands: readonly PriceBand[] = [
  { id: "under-200", label: "Under ₹200", min: 0, max: 200 },
  { id: "200-500", label: "₹200 – ₹500", min: 200, max: 500 },
  { id: "500-1000", label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { id: "over-1000", label: "₹1,000 & above", min: 1000, max: null },
];

// "Featured" is the curated catalog order — there is no sales data to rank real popularity.
export const sortOptions: readonly { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export const SHOP_PAGE_SIZE = 12;

/** Colourful shortcuts under the shop banner; each maps to real filter params. */
export const shopShortcuts: readonly {
  label: string;
  params: Record<string, string>;
  icon: typeof Wheat;
  tone: Tone;
}[] = [
  { label: "Baking Essentials", params: { collection: "baking-ingredients" }, icon: Wheat, tone: "sunny" },
  { label: "Decoration Supplies", params: { collection: "decorate" }, icon: WandSparkles, tone: "blush" },
  { label: "Packaging & Gifting", params: { category: "boxes,gifting" }, icon: Gift, tone: "lavender" },
  { label: "Toppers & Accessories", params: { category: "toppers" }, icon: Star, tone: "cream" },
  { label: "Colours & Essences", params: { category: "colours-essences" }, icon: Palette, tone: "lavender" },
  { label: "Sprinkles", params: { category: "sprinkles" }, icon: Sparkles, tone: "blush" },
  { label: "Tools & Equipment", params: { category: "tools-equipment" }, icon: UtensilsCrossed, tone: "aqua" },
  { label: "Chocolates", params: { category: "chocolates" }, icon: Candy, tone: "cream" },
];
