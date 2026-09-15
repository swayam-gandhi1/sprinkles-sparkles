---
name: sprinkle-motion
description: Project conventions for animation in the Sprinkle & Sparkle storefront (Motion / Framer Motion in Next.js App Router). Use whenever adding or changing any animation, transition, hover/tap interaction, scroll effect, AnimatePresence, layout animation or stagger in this repo. Complements the official `motion` skill with this codebase's primitives and rules.
---

# Sprinkle & Sparkle — motion conventions

The goal is a polished, premium feel: **subtle, quick, purposeful**. Fewer, better
animations. If in doubt, leave it out. For API details and general best practice,
also consult the official `motion` skill (`.claude/skills/motion/`).

## Setup you must respect

- `MotionProvider` (in `src/app/layout.tsx`) wraps the app in
  `LazyMotion strict` + `MotionConfig reducedMotion="user"`.
- Therefore **always** `import * as m from "motion/react-m"` and use `m.div`, `m.li`, …
  Never import `motion` from `motion/react` / `motion/react-client`, and never
  import from `framer-motion` (ESLint enforces both).
- Hooks and utilities (`AnimatePresence`, `useScroll`, `useTransform`,
  `useReducedMotion`, `LayoutGroup`, `stagger`) come from `"motion/react"`.
- Animation code lives in client components. Keep them small leaf components and
  pass server-rendered content in as `children` — never mark a whole page `"use client"`
  just to animate it.

## Use the existing primitives first

All in `src/components/animations/` (import files directly, no barrel):

| Need | Use |
| --- | --- |
| Entrance on scroll | `FadeIn`, `FadeUp`, `FadeDown`, `ScaleIn` (`Reveal.tsx`) |
| Above-the-fold entrance (page load) | same, with `trigger="mount"` |
| Sequenced list/grid entrance | `StaggerContainer` + `StaggerItem` (`Stagger.tsx`) |
| Hover lift / tap press | spread `interactions.lift` / `interactions.press` from `presets.ts` onto an `m.*` element |
| Timings, easing, distances, springs | `duration`, `premiumEase`, `distance`, `softSpring` in `presets.ts` |

Add a new variant to `presets.ts` rather than hard-coding values in a component.
CSS-only hover states (color, shadow) should use Tailwind `transition-*` +
`ease-premium` and need no JS at all — prefer that for simple hovers.

## Patterns

- **Page transitions**: use `src/app/template.tsx` (re-mounts per navigation) with a
  short `FadeIn trigger="mount"`. No exit animations across routes; keep it < 0.4s.
- **Scroll-based**: `useScroll({ target, offset })` + `useTransform(value, input, output)`,
  bound through `style`. `MotionConfig` does NOT disable style-bound motion values —
  check `useReducedMotion()` and render static values when it is `true`. Use
  sparingly (one hero moment, not every section).
- **Layout animations**: `layout` / `layoutId` on `m.*` elements (e.g. filter chips,
  cart item reordering, tab underline). Wrap siblings sharing a `layoutId` in `LayoutGroup`.
- **AnimatePresence**: for things that mount/unmount (cart drawer, modals, toasts,
  mobile menu). Every direct child needs a stable `key`; define `exit`; use
  `mode="wait"` only when swapping one item for another; `initial={false}` to skip
  the first-render animation.
- **Stagger**: 0.05–0.1s between items; cap perceived total at ~0.6s (for long grids,
  stagger only the first row or two).
- **Responsive**: reduce travel distance on small screens and never tie heavy
  scroll-linked effects to touch devices. Hover effects are pointer-only by default.

## Performance & accessibility rules

- Animate only `opacity` and transforms (`x`, `y`, `scale`, `rotate`). Never animate
  `width`/`height`/`top`/`left` — use `layout` instead.
- Reveal animations run once (`viewport.once`). No infinite loops on content.
- Content must remain readable if JS fails to hydrate slowly — avoid hiding
  critical above-the-fold text (LCP) behind scroll-triggered reveals; use
  `trigger="mount"` or no animation for the hero heading.
- Respect `prefers-reduced-motion` (handled globally for transforms; handle
  motion values manually as above). Never convey information only via motion.
- Don't animate focus outlines or delay interactive affordances.
