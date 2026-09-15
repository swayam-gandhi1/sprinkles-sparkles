"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Search, X } from "lucide-react";
import { premiumEase } from "@/components/animations/presets";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { SearchForm } from "./SearchForm";

const PANEL_ID = "mobile-search";
const INPUT_ID = "mobile-search-input";

/** Search toggle for small screens; the field drops down below the header. */
export function MobileSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.getElementById(INPUT_ID)?.focus();
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close search" : "Search products"}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((value) => !value)}
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "[&_svg]:size-[22px]")}
      >
        {open ? <X aria-hidden strokeWidth={1.6} /> : <Search aria-hidden strokeWidth={1.6} />}
      </button>
      <AnimatePresence>
        {open ? (
          <m.div
            key={PANEL_ID}
            id={PANEL_ID}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: premiumEase }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpen(false);
            }}
            className="absolute inset-x-0 top-full border-b border-border bg-white px-gutter py-3 shadow-header lg:hidden"
          >
            <SearchForm id={INPUT_ID} />
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
