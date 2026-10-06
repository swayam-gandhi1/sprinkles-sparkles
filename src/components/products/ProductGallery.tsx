"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: readonly ProductImage[];
  /** Classes for the main photo frame (tinted background, radius, shadow). */
  frameClassName?: string;
  /** Overlay inside the main frame, e.g. a "New" badge. */
  children?: ReactNode;
};

const arrowClass =
  "pointer-events-auto grid size-10 place-items-center rounded-full bg-white/90 text-foreground shadow-card backdrop-blur-sm transition-[background-color,translate,opacity] duration-200 ease-premium hover:bg-white disabled:pointer-events-none disabled:opacity-0 sm:size-11";

/**
 * Product photos as a swipeable slider: a scroll-snapped track (native touch
 * swipe and trackpad flick), arrow buttons, a thumbnail strip and a slide
 * counter. Falls back to a single static photo when there is only one.
 *
 * Paging uses the browser's own scrolling rather than animated transforms, so
 * it stays smooth on phones and needs no JS to render the photos at all.
 */
export function ProductGallery({ images, frameClassName, children }: ProductGalleryProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = images.length;

  /** Every slide is exactly one track wide, so the index is the scroll offset. */
  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActive((current) => (current === index ? current : Math.min(Math.max(index, 0), count - 1)));
  }, [count]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.min(Math.max(index, 0), count - 1);
      track.scrollTo({ left: next * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
      setActive(next);
    },
    [count, reduceMotion],
  );

  // Keep the index right after a resize (orientation change, devtools, zoom).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(syncActive);
    observer.observe(track);
    return () => observer.disconnect();
  }, [syncActive]);

  const first = images[0];
  if (!first) return null;

  if (count === 1) {
    return (
      <div className={cn("relative aspect-square overflow-hidden", frameClassName)}>
        <Image
          src={first.src}
          alt={first.alt}
          fill
          preload
          sizes="(min-width: 1024px) 38rem, 92vw"
          style={first.position ? { objectPosition: first.position } : undefined}
          className="object-cover"
        />
        {children}
      </div>
    );
  }

  return (
    <div>
      <div
        className={cn("relative aspect-square overflow-hidden", frameClassName)}
        role="group"
        aria-roledescription="carousel"
        aria-label="Product photos"
      >
        <ul
          ref={trackRef}
          onScroll={syncActive}
          tabIndex={0}
          aria-label={`Product photos, ${count} in total`}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(active + 1);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(active - 1);
            }
          }}
          className="flex size-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <li
              key={image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className="relative size-full shrink-0 snap-start"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload={i === 0}
                sizes="(min-width: 1024px) 38rem, 92vw"
                style={image.position ? { objectPosition: image.position } : undefined}
                className="object-cover"
              />
            </li>
          ))}
        </ul>

        {/* Controls sit above the track; the wrapper stays click-through. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-3 sm:p-4">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous photo"
            className={arrowClass}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === count - 1}
            aria-label="Next photo"
            className={arrowClass}
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </div>

        <p className="absolute right-3 bottom-3 rounded-full bg-navy/70 px-2.5 py-1 text-xs font-semibold text-white tabular-nums sm:right-4 sm:bottom-4">
          <span aria-hidden>
            {active + 1} / {count}
          </span>
          <span className="sr-only">
            Photo {active + 1} of {count}
          </span>
        </p>

        {children}
      </div>

      {/* Dots on phones, where a thumbnail strip would crowd the width; thumbnails from sm up. */}
      <ul className="mt-1 flex justify-center sm:hidden" aria-label="Choose a photo">
        {images.map((image, i) => (
          <li key={image.src}>
            {/* Padding gives the small dot a 44px touch target. */}
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1} of ${count}`}
              aria-pressed={i === active}
              className="grid size-11 place-items-center"
            >
              <span
                aria-hidden
                className={cn(
                  "block h-2 rounded-full transition-[width,background-color] duration-300 ease-premium",
                  i === active ? "w-6 bg-primary" : "w-2 bg-blush-strong",
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      <ul className="mt-3 hidden flex-wrap gap-2 sm:flex sm:gap-3" aria-label="Choose a photo">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1} of ${count}`}
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
    </div>
  );
}
