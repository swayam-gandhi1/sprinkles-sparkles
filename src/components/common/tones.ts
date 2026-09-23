import type { Tone } from "@/types/content";

/**
 * Colour families shared by icon tiles, cards and placeholders, so every
 * section draws from the same palette. Text colours meet WCAG AA on their
 * own `surface` and `icon` backgrounds.
 */
export const tones: Record<
  Tone,
  {
    /** Soft section/card background. */
    surface: string;
    /** Icon tile: tinted background + readable icon colour. */
    icon: string;
    /** Small readable text on white or the tone's surface. */
    text: string;
    /** Vivid fill for dots, rings and decorative accents (not text). */
    vivid: string;
    /** Gradient art panel (use with `bg-linear-to-br`). */
    gradient: string;
  }
> = {
  blush: {
    surface: "bg-blush",
    icon: "bg-blush text-primary-strong",
    text: "text-primary-strong",
    vivid: "bg-pink",
    gradient: "from-blush-strong via-blush to-white",
  },
  aqua: {
    surface: "bg-aqua-mist",
    icon: "bg-aqua-mist text-accent-strong",
    text: "text-accent-strong",
    vivid: "bg-turquoise",
    gradient: "from-turquoise/30 via-aqua-mist to-white",
  },
  cream: {
    surface: "bg-cream",
    icon: "bg-coral/15 text-primary-strong",
    text: "text-primary-strong",
    vivid: "bg-coral",
    gradient: "from-coral/25 via-cream to-white",
  },
  lavender: {
    surface: "bg-lavender-mist",
    icon: "bg-lavender-mist text-lavender-strong",
    text: "text-lavender-strong",
    vivid: "bg-lavender-vivid",
    gradient: "from-lavender via-lavender-mist to-white",
  },
  sunny: {
    surface: "bg-sunny-mist",
    icon: "bg-sunny-mist text-sunny-strong",
    text: "text-sunny-strong",
    vivid: "bg-sunny",
    gradient: "from-sunny/55 via-sunny-mist to-white",
  },
};

/** Rotation used when a list has no tone of its own. */
export const toneCycle: readonly Tone[] = ["blush", "aqua", "lavender", "sunny", "cream"];

export const toneAt = (index: number): Tone => toneCycle[index % toneCycle.length] ?? "blush";
