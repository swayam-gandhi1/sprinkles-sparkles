"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: readonly ProductImage[];
  /** Classes for the main photo frame (tinted background, radius, shadow). */
  frameClassName?: string;
  /** Overlay inside the main frame, e.g. a "New" badge. */
  children?: ReactNode;
};

/** Main product photo, with a thumbnail strip to switch views when there are several photos. */
export function ProductGallery({ images, frameClassName, children }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div>
      <div className={cn("relative aspect-square overflow-hidden", frameClassName)}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          preload={active === 0}
          sizes="(min-width: 1024px) 38rem, 92vw"
          style={current.position ? { objectPosition: current.position } : undefined}
          className="object-cover"
        />
        {children}
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 flex flex-wrap gap-2 sm:gap-3" aria-label="Product photos">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                aria-pressed={i === active}
                className={cn(
                  "relative block size-16 overflow-hidden rounded-2xl border-2 bg-blush transition-colors sm:size-20",
                  i === active ? "border-primary" : "border-transparent hover:border-blush-strong",
                )}
              >
                <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
