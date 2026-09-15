"use client";

import type { HTMLMotionProps } from "motion/react";
import * as m from "motion/react-m";
import { revealVariants, viewportOnce, type RevealVariant } from "./presets";

export type RevealProps = Omit<
  HTMLMotionProps<"div">,
  "variants" | "initial" | "animate" | "whileInView" | "custom"
> & {
  variant?: RevealVariant;
  /** "inView" reveals on scroll (default); "mount" animates immediately, for above-the-fold content. */
  trigger?: "inView" | "mount";
  /** Delay in seconds. */
  delay?: number;
};

/** Entrance animation wrapper. Prefer the named exports below. */
export function Reveal({
  variant = "fadeUp",
  trigger = "inView",
  delay,
  viewport,
  ...props
}: RevealProps) {
  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { ...viewportOnce, ...viewport } };

  return (
    <m.div
      variants={revealVariants[variant]}
      initial="hidden"
      custom={delay}
      {...triggerProps}
      {...props}
    />
  );
}

type NamedRevealProps = Omit<RevealProps, "variant">;

export function FadeIn(props: NamedRevealProps) {
  return <Reveal variant="fade" {...props} />;
}

export function FadeUp(props: NamedRevealProps) {
  return <Reveal variant="fadeUp" {...props} />;
}

export function FadeDown(props: NamedRevealProps) {
  return <Reveal variant="fadeDown" {...props} />;
}

export function ScaleIn(props: NamedRevealProps) {
  return <Reveal variant="scaleIn" {...props} />;
}
