"use client";

import type { ReactNode } from "react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils/cn";
import { premiumEase, viewportOnce } from "./presets";

type ImageRevealProps = {
  children: ReactNode;
  /** Frame classes — size, aspect ratio, radius. The frame clips the zoom. */
  className?: string;
  delay?: number;
};

/**
 * Photo reveal: fades in while settling from a slight zoom. Reduced-motion
 * users get the fade only (MotionConfig strips the scale).
 */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <m.div
        className="size-full"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: premiumEase, delay }}
      >
        {children}
      </m.div>
    </div>
  );
}
