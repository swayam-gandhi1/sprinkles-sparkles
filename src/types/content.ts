import type { LucideIcon } from "lucide-react";

/** An image slot. `src: null` renders a branded placeholder. */
export type ImageAsset = {
  src: string | null;
  alt: string;
  /** CSS `object-position` focal point, e.g. "70% 50%". */
  position?: string;
};

/** Colour family for icons, panels and placeholders (see src/components/common/tones.ts). */
export type Tone = "blush" | "aqua" | "cream" | "lavender" | "sunny";

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  children?: readonly NavLink[];
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Category = {
  slug: string;
  name: string;
  image: ImageAsset;
  tone: Tone;
  icon: LucideIcon;
};

/** A top-level product group card (links to a category or shop filter). */
export type ProductGroup = {
  name: string;
  href: string;
  icon: LucideIcon;
  tone: Tone;
};

export type ShoppingNeed = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  tone: Tone;
};

export type Occasion = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: Tone;
};
