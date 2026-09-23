import {
  CakeSlice,
  Candy,
  Flame,
  Gem,
  Package,
  PartyPopper,
  Scissors,
  Sparkles,
  Star,
  Sticker,
  UtensilsCrossed,
} from "lucide-react";
import type { Category } from "@/types/content";

// `image.src` stays null until the client's category photography is added
// (e.g. /images/categories/baking-tins.jpg). Placeholders render meanwhile.
export const categories: readonly Category[] = [
  { slug: "baking-tins", name: "Baking Tins", tone: "aqua", icon: CakeSlice, image: { src: null, alt: "Baking tins" } },
  { slug: "boxes", name: "Boxes", tone: "blush", icon: Package, image: { src: null, alt: "Cake and gift boxes" } },
  { slug: "diwali-collection", name: "Diwali Collection", tone: "sunny", icon: Flame, image: { src: null, alt: "Diwali collection" } },
  { slug: "knife-cutters", name: "Knife Cutters", tone: "lavender", icon: Scissors, image: { src: null, alt: "Knife cutters" } },
  { slug: "sprinkles", name: "Sprinkles", tone: "blush", icon: Sparkles, image: { src: null, alt: "Sprinkles" } },
  { slug: "tools-equipment", name: "Tools & Equipment", tone: "aqua", icon: UtensilsCrossed, image: { src: null, alt: "Baking tools and equipment" } },
  { slug: "diwali-exclusive-range", name: "Diwali Exclusive Range", tone: "sunny", icon: Gem, image: { src: null, alt: "Diwali exclusive range" } },
  { slug: "birthday-collection", name: "Birthday Collection", tone: "cream", icon: PartyPopper, image: { src: null, alt: "Birthday collection" } },
  { slug: "acrylic-toppers", name: "Acrylic Toppers", tone: "lavender", icon: Star, image: { src: null, alt: "Acrylic cake toppers" } },
  { slug: "paper-theme-toppers", name: "Paper Theme Toppers", tone: "blush", icon: Sticker, image: { src: null, alt: "Paper theme toppers" } },
  { slug: "chocolate-boxes", name: "Chocolate Boxes", tone: "cream", icon: Candy, image: { src: null, alt: "Chocolate boxes" } },
];
