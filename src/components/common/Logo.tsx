import { existsSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  /** Sets the rendered width (height follows the logo's aspect ratio). */
  className?: string;
  /** Link destination; pass `null` to render the logo without a link. */
  href?: string | null;
  /** Load eagerly — set for the above-the-fold (header) instance. */
  priority?: boolean;
  /** Rendered image width hint for next/image (≈ 1.4× the frame width). */
  sizes?: string;
};

/**
 * The single place the brand logo is rendered — the supplied artwork, unaltered.
 * Its built-in whitespace is trimmed by a CSS crop frame (see `siteConfig.logo.crop`).
 *
 * Server Component (checks the asset exists). Client components receive it
 * as a rendered prop rather than importing it.
 */
export function Logo({ className, href = "/", priority = false, sizes = "220px" }: LogoProps) {
  const { src, width, height, crop } = siteConfig.logo;
  const available = existsSync(path.join(process.cwd(), "public", src));

  const frameStyle: CSSProperties = {
    aspectRatio: `${crop.width * width} / ${crop.height * height}`,
  };
  const imageStyle: CSSProperties = {
    position: "absolute",
    left: `${(-crop.x / crop.width) * 100}%`,
    top: `${(-crop.y / crop.height) * 100}%`,
    width: `${100 / crop.width}%`,
    height: "auto",
    maxWidth: "none",
  };

  const frame = (
    <span className={cn("relative block overflow-hidden", className)} style={frameStyle}>
      {available ? (
        <Image
          src={src}
          alt={siteConfig.name}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          style={imageStyle}
          // Blends the artwork's white background into tinted surfaces.
          className="mix-blend-multiply"
        />
      ) : (
        <span className="sr-only">{siteConfig.name}</span>
      )}
    </span>
  );

  if (href === null) return frame;

  return (
    <Link href={href} className="inline-flex shrink-0 rounded-lg">
      {frame}
    </Link>
  );
}
