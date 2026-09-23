"use client";

import * as m from "motion/react-m";
import { Heart } from "lucide-react";
import { toggleWishlist, useIsWishlisted } from "@/lib/cart/store";
import { cn } from "@/lib/utils/cn";

/** Heart toggle for the browser wishlist. */
export function WishlistButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const saved = useIsWishlisted(slug);

  return (
    <m.button
      type="button"
      onClick={() => toggleWishlist(slug)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      whileTap={{ scale: 0.85 }}
      className={cn(
        "grid size-10 place-items-center rounded-full bg-white/95 text-primary-strong shadow-card transition-colors duration-200 hover:bg-blush",
        className,
      )}
    >
      <Heart aria-hidden className={cn("size-[18px] transition-colors", saved && "fill-pink text-pink")} strokeWidth={2} />
    </m.button>
  );
}
