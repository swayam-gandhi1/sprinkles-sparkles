"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ChevronDown } from "lucide-react";
import { premiumEase } from "@/components/animations/presets";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils/cn";
import { isActivePath } from "@/lib/utils/nav";
import type { NavLink } from "@/types/content";

const linkClass =
  "relative inline-flex h-10 items-center gap-1 px-2 text-[0.8125rem] font-medium text-foreground/80 transition-colors hover:text-primary-strong xl:px-3 xl:text-sm " +
  "after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 after:ease-premium hover:after:scale-x-100 xl:after:inset-x-3";
const activeClass = "text-primary-strong after:scale-x-100";

export function DesktopNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex flex-wrap items-center">
        {mainNav.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.label}>
              {item.children ? (
                <MoreMenu label={item.label} items={item.children} pathname={pathname} />
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(linkClass, active && activeClass)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type MoreMenuProps = {
  label: string;
  items: readonly NavLink[];
  pathname: string;
};

/**
 * Disclosure-style dropdown: opens on mouse hover, or on click/tap/Enter.
 * Escape, outside clicks and focus leaving the menu close it.
 */
function MoreMenu({ label, items, pathname }: MoreMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pointerType = useRef("");
  const panelId = useId();
  const active = items.some((child) => isActivePath(pathname, child.href));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onPointerDown={(event) => {
          pointerType.current = event.pointerType;
        }}
        onClick={() => {
          // Mouse users already opened it by hovering; don't toggle it shut.
          const viaMouse = pointerType.current === "mouse";
          pointerType.current = "";
          if (!viaMouse) setOpen((value) => !value);
        }}
        className={cn(linkClass, (open || active) && activeClass)}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform duration-300 ease-premium", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open ? (
          <m.div
            key="panel"
            id={panelId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: premiumEase }}
            className="absolute top-full left-1/2 z-50 w-60 -translate-x-1/2 pt-2"
          >
            <ul className="rounded-card border border-border bg-white p-2 shadow-card-hover">
              {items.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActivePath(pathname, child.href) ? "page" : undefined}
                    className="block rounded-xl px-3 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-blush hover:text-primary-strong aria-[current=page]:text-primary-strong"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
