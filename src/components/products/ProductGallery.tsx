"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: readonly ProductImage[];
  productName: string;
  toneGradient: string;
  discount?: number | null;
  isNew?: boolean;
};

export function ProductGallery({
  images,
  productName,
  toneGradient,
  discount,
  isNew,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = images[selectedIndex] ?? images[0];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-panel bg-linear-to-br shadow-card",
          toneGradient,
        )}
      >
        {currentImage?.src ? (
          <Image
            src={currentImage.src}
            alt={currentImage.alt || productName}
            fill
            priority
            sizes="(min-width: 1024px) 38rem, 92vw"
            style={
              currentImage.position ? { objectPosition: currentImage.position } : undefined
            }
            className="object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground text-sm">
            Image coming soon
          </div>
        )}

        {discount ? (
          <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            {discount}% off
          </span>
        ) : isNew ? (
          <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            New
          </span>
        ) : null}
      </div>

      {/* Gallery Thumbnails */}
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {images.map((img, idx) => (
            <button
              key={img.src + idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View image ${idx + 1} of ${productName}`}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-all duration-200",
                selectedIndex === idx
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent opacity-75 hover:opacity-100",
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
