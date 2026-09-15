import type { LucideIcon } from "lucide-react";

/** An image slot. `src: null` renders a branded placeholder. */
export type ImageAsset = {
  src: string | null;
  alt: string;
  /** CSS `object-position` focal point, e.g. "70% 50%". */
  position?: string;
};

/** Pastel surface used behind icons, panels and placeholders. */
export type Tone = "blush" | "aqua" | "cream";

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
};
