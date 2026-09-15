"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * App-wide Motion setup:
 * - `LazyMotion strict` keeps the initial JS small; use `m.*` from "motion/react-m".
 * - `reducedMotion="user"` disables transform/layout animation for users who
 *   prefer reduced motion (opacity fades are kept).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
