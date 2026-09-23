"use client";

import type { ReactNode } from "react";
import { useScrolled } from "@/hooks/useScrolled";

/** Sticky header frame; exposes `data-scrolled` so children can respond to scroll via CSS. */
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useScrolled(24);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className="group/header sticky top-0 z-40 border-b border-border/70 bg-white transition-shadow duration-300 ease-premium data-[scrolled=true]:border-transparent data-[scrolled=true]:shadow-header"
    >
      {children}
    </header>
  );
}
