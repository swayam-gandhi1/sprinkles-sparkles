"use client";

import type { HTMLMotionProps, Variants } from "motion/react";
import { stagger as staggerDelay } from "motion/react";
import * as m from "motion/react-m";
import { revealVariants, viewportOnce, type RevealVariant } from "./presets";

type OrchestrationProps = "variants" | "initial" | "animate" | "whileInView";

export type StaggerContainerProps = Omit<HTMLMotionProps<"div">, OrchestrationProps> & {
  /** Seconds between each child. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delay?: number;
  trigger?: "inView" | "mount";
};

/**
 * Orchestrates `StaggerItem` children. Items inherit the animation through
 * React context, so they can sit inside semantic wrappers (e.g. `ul > li`).
 */
export function StaggerContainer({
  stagger = 0.08,
  delay = 0,
  trigger = "inView",
  viewport,
  ...props
}: StaggerContainerProps) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: staggerDelay(stagger, { startDelay: delay }) } },
  };
  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { ...viewportOnce, ...viewport } };

  return <m.div variants={variants} initial="hidden" {...triggerProps} {...props} />;
}

export type StaggerItemProps = Omit<HTMLMotionProps<"div">, OrchestrationProps> & {
  variant?: RevealVariant;
};

export function StaggerItem({ variant = "fadeUp", ...props }: StaggerItemProps) {
  return <m.div variants={revealVariants[variant]} {...props} />;
}
