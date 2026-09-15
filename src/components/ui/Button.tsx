import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const variantClasses = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_rgb(216_27_96/0.65)] hover:bg-primary-hover",
  accent: "bg-accent text-accent-foreground shadow-[0_10px_24px_-12px_rgb(31_122_147/0.6)] hover:bg-accent-hover",
  outline: "border border-primary/35 bg-white text-primary-strong hover:border-primary hover:bg-blush",
  ghost: "bg-transparent text-foreground hover:bg-muted",
} as const;

// `md`, `lg` and `icon` meet the 44px minimum touch target.
const sizeClasses = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[0.9375rem]",
  icon: "size-11",
} as const;

export type ButtonVariant = keyof typeof variantClasses;
export type ButtonSize = keyof typeof sizeClasses;

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/** Trailing arrow that nudges right when its button is hovered. */
export function ButtonArrow() {
  return (
    <ArrowRight
      aria-hidden
      className="transition-transform duration-300 ease-premium group-hover/button:translate-x-0.5"
    />
  );
}

/** Shared button styling, usable on any element. */
export function buttonVariants({ variant = "primary", size = "md", className }: ButtonStyleProps = {}) {
  return cn(
    "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-button font-semibold whitespace-nowrap select-none",
    "transition-[color,background-color,border-color,box-shadow,scale] duration-200 ease-premium active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:size-[1.125em] [&_svg]:shrink-0",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />;
}

export type ButtonLinkProps = ComponentProps<typeof Link> & ButtonStyleProps;

/** Navigation styled as a button. Use this — not `<Button>` — whenever the action changes the URL. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonVariants({ variant, size, className })} {...props} />;
}
