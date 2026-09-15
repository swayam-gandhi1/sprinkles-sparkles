import type { MotionProps, Transition, Variants } from "motion/react";

/** Smooth deceleration curve. Mirrors `--ease-premium` in src/styles/theme.css. */
export const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Durations in seconds. Keep entrances short — premium feels quick, not slow. */
export const duration = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
} as const;

/** Travel distances in px. Subtle by design. */
export const distance = {
  sm: 12,
  md: 24,
} as const;

/** Gentle spring for user-driven interactions (hover, tap, layout). */
export const softSpring: Transition = {
  type: "spring",
  bounce: 0.2,
  visualDuration: 0.3,
};

/** Only sets `delay` when given, so parent stagger orchestration isn't overridden. */
function enter(delay?: number): Transition {
  return {
    duration: duration.base,
    ease: premiumEase,
    ...(delay ? { delay } : {}),
  };
}

/**
 * Entrance variants shared by `Reveal` and `StaggerItem`.
 * Independent transforms (`y`, `scale`) are used deliberately: `MotionConfig
 * reducedMotion="user"` strips them for reduced-motion users, leaving a fade.
 * `visible` receives an optional delay through the `custom` prop.
 */
export const revealVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: (delay?: number) => ({ opacity: 1, transition: enter(delay) }),
  },
  fadeUp: {
    hidden: { opacity: 0, y: distance.md },
    visible: (delay?: number) => ({ opacity: 1, y: 0, transition: enter(delay) }),
  },
  fadeDown: {
    hidden: { opacity: 0, y: -distance.md },
    visible: (delay?: number) => ({ opacity: 1, y: 0, transition: enter(delay) }),
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: (delay?: number) => ({ opacity: 1, scale: 1, transition: enter(delay) }),
  },
} satisfies Record<string, Variants>;

export type RevealVariant = keyof typeof revealVariants;

/** Reveal once, when a fifth of the element is visible. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/**
 * Hover/tap presets to spread onto `m.*` elements, e.g. `<m.div {...interactions.lift}>`.
 * Motion only fires `whileHover` for real pointer hovers, so these are touch-safe.
 */
export const interactions = {
  lift: {
    whileHover: { y: -4 },
    whileTap: { scale: 0.98 },
    transition: softSpring,
  },
  press: {
    whileTap: { scale: 0.97 },
    transition: softSpring,
  },
} satisfies Record<string, Pick<MotionProps, "whileHover" | "whileTap" | "transition">>;
