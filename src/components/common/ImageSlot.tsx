import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ImageAsset, Tone } from "@/types/content";

const toneClasses: Record<Tone, string> = {
  blush: "bg-blush text-primary-strong",
  aqua: "bg-aqua-mist text-accent",
  cream: "bg-cream text-primary-strong",
};

type ImageSlotProps = {
  image: ImageAsset;
  /** Responsive `sizes` hint for next/image. */
  sizes: string;
  tone?: Tone;
  /** Placeholder icon until the real photo is supplied. */
  icon?: LucideIcon;
  /** Placeholder caption until the real photo is supplied. */
  label?: string;
  /** Hide from assistive tech when adjacent text already names the subject. */
  decorative?: boolean;
  preload?: boolean;
  /** Container classes — set the size or aspect ratio here. */
  className?: string;
  /** Classes for the image/placeholder layer (e.g. hover zoom). */
  imageClassName?: string;
};

/**
 * Fixed-ratio image frame. Renders the real photo with `object-cover` when
 * `image.src` is set, otherwise a clearly replaceable branded placeholder —
 * no stock or invented photography.
 */
export function ImageSlot({
  image,
  sizes,
  tone = "blush",
  icon: Icon,
  label,
  decorative = false,
  preload,
  className,
  imageClassName,
}: ImageSlotProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {image.src ? (
        <Image
          src={image.src}
          alt={decorative ? "" : image.alt}
          fill
          sizes={sizes}
          preload={preload}
          style={image.position ? { objectPosition: image.position } : undefined}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : image.alt}
          aria-hidden={decorative || undefined}
          className={cn(
            "sprinkle-pattern absolute inset-0 flex flex-col items-center justify-center gap-3 p-4",
            toneClasses[tone],
            imageClassName,
          )}
        >
          {Icon ? (
            <span className="grid size-12 place-items-center rounded-full bg-white/85 shadow-card sm:size-14">
              <Icon aria-hidden className="size-5 sm:size-6" strokeWidth={1.5} />
            </span>
          ) : null}
          {label ? (
            <span className="max-w-[18ch] text-center text-xs leading-snug font-medium opacity-80">{label}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}
