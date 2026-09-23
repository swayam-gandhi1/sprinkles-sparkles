"use client";

import { createContext, useContext, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type ShopNavigation = {
  /** Navigate to a new shop URL, keeping the current results on screen until the next ones render. */
  navigate: (href: string) => void;
  pending: boolean;
};

const ShopNavigationContext = createContext<ShopNavigation | null>(null);

export function useShopNavigation() {
  const value = useContext(ShopNavigationContext);
  if (!value) throw new Error("useShopNavigation must be used inside <ShopNavigationProvider>");
  return value;
}

export function ShopNavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const navigate = (href: string) => startTransition(() => router.push(href, { scroll: false }));

  return <ShopNavigationContext value={{ navigate, pending }}>{children}</ShopNavigationContext>;
}

/** Results region: dims and reports busy while a filter change is loading. */
export function ShopResults({ children, className }: { children: ReactNode; className?: string }) {
  const { pending } = useShopNavigation();
  return (
    <div
      aria-busy={pending}
      className={cn("transition-opacity duration-200", pending && "pointer-events-none opacity-60", className)}
    >
      {children}
    </div>
  );
}
