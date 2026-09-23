import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// Filled variants lift slightly on hover (pointer devices only) and press on tap.
const lift = "hover:-translate-y-0.5 active:translate-y-0";

const variantClasses = {
  /** Pink — the main call to action. */
  primary: cn(
    "bg-linear-to-r from-primary to-primary-hover text-primary-foreground shadow-pink hover:from-primary-hover hover:to-primary-hover",
    lift,
  ),
  /** Turquoise — secondary actions and trust-led sections (shopping, support). */
  accent: cn("bg-accent text-accent-foreground shadow-teal hover:bg-accent-hover", lift),
  /** Light/outline — pairs with a filled button, or sits on photos and colour. */
  outline: "border-2 border-primary/25 bg-white text-primary-strong hover:border-primary hover:bg-blush",
  ghost: "bg-transparent text-foreground hover:bg-blush hover:text-primary-strong",
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
    "transition-[color,background-color,border-color,box-shadow,scale,translate,--tw-gradient-from,--tw-gradient-to] duration-200 ease-premium active:scale-[0.97]",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
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
