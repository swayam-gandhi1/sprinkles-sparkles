import { cn } from "@/lib/utils/cn";

/** Soft wave edge for pastel bands. Colour it with `text-*` to match the band. */
export function CurveDivider({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      className={cn("pointer-events-none block h-8 w-full sm:h-12", flip && "rotate-180", className)}
    >
      <path d="M0 64V32C180 8 360 0 540 12s360 40 540 40 270-18 360-28V64Z" fill="currentColor" />
    </svg>
  );
}
