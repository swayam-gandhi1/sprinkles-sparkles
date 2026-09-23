"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useCartState } from "@/lib/cart/store";
import { cn } from "@/lib/utils/cn";

/**
 * Live count on the header's cart / wishlist icons. Renders nothing until the
 * saved cart loads, so server HTML and hydration always match. The count is
 * also exposed to assistive tech via `sr-only` text.
 */
export function CountBadge({ kind, className }: { kind: "cart" | "wishlist"; className?: string }) {
  const { cart, wishlist } = useCartState();
  const count = kind === "cart" ? cart.reduce((sum, line) => sum + line.qty, 0) : wishlist.length;
  const noun = kind === "cart" ? "item" : "saved item";
  const label = `${count === 1 ? noun : `${noun}s`}${kind === "cart" ? " in cart" : ""}`;

  return (
    <AnimatePresence>
      {count > 0 ? (
        <m.span
          key={count}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.45, visualDuration: 0.3 }}
          className={cn(
            "pointer-events-none absolute -top-1 -right-1 grid h-[1.125rem] min-w-[1.125rem] place-items-center rounded-full bg-primary px-1 text-[0.625rem] leading-none font-bold text-white ring-2 ring-white",
            className,
          )}
        >
          {count > 99 ? "99+" : count}
          <span className="sr-only"> {label}</span>
        </m.span>
      ) : null}
    </AnimatePresence>
  );
}
