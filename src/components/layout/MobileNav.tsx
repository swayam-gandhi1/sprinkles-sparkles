"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, stagger, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { ChevronDown, Heart, Menu, Phone, ShoppingBag, User, X } from "lucide-react";
import { premiumEase } from "@/components/animations/presets";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { buttonVariants } from "@/components/ui/Button";
import { mainNav } from "@/data/navigation";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import { trapFocus } from "@/lib/utils/focus";
import { isActivePath } from "@/lib/utils/nav";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(0.035, { startDelay: 0.12 }) } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: premiumEase } },
};

const rowClass =
  "flex w-full items-center justify-between rounded-xl px-3 py-3 text-[0.9375rem] font-medium text-foreground transition-colors hover:bg-blush aria-[current=page]:bg-blush aria-[current=page]:text-primary-strong";

const iconButton = cn(buttonVariants({ variant: "ghost", size: "icon" }), "[&_svg]:size-6");

const accountLinks = [
  { label: "Login", href: routes.account, icon: User },
  { label: "Wishlist", href: routes.wishlist, icon: Heart },
  { label: "Cart", href: routes.cart, icon: ShoppingBag },
] as const;

/** Slide-in navigation drawer for screens below `lg`. */
export function MobileNav({ logo }: { logo: ReactNode }) {
  const pathname = usePathname();
  // Remember the page the drawer was opened on — navigating anywhere closes it.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const [moreOpen, setMoreOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const moreId = useId();
  const { phone, phoneHref, whatsappHref } = siteConfig.contact;

  const close = () => setOpenedOn(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenedOn(null);
      else if (event.key === "Tab") trapFocus(event, panelRef.current);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenedOn(null);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpenedOn(pathname)}
        className={cn(iconButton, "-ml-2 lg:hidden")}
      >
        <Menu aria-hidden strokeWidth={1.6} />
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            key="backdrop"
            aria-hidden
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-foreground/40 lg:hidden"
          />
        ) : null}
        {open ? (
          <m.div
            key="drawer"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, visualDuration: 0.35 }}
            className="fixed inset-y-0 left-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-white shadow-card-hover lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div onClick={close}>{logo}</div>
              <button ref={closeRef} type="button" aria-label="Close menu" onClick={close} className={cn(iconButton, "-mr-2")}>
                <X aria-hidden strokeWidth={1.6} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
              <m.ul variants={listVariants} initial="hidden" animate="visible" className="space-y-0.5">
                {mainNav.map((item) => (
                  <m.li key={item.label} variants={itemVariants}>
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={moreOpen}
                          aria-controls={moreId}
                          onClick={() => setMoreOpen((value) => !value)}
                          className={rowClass}
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden
                            className={cn(
                              "size-4 text-muted-foreground transition-transform duration-300 ease-premium",
                              moreOpen && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {moreOpen ? (
                            <m.ul
                              key="more"
                              id={moreId}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.2, ease: premiumEase }}
                              className="mt-1 mb-2 ml-4 space-y-0.5 border-l-2 border-blush-strong pl-3"
                            >
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={close}
                                    aria-current={isActivePath(pathname, child.href) ? "page" : undefined}
                                    className="block rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-blush hover:text-primary-strong aria-[current=page]:text-primary-strong"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </m.ul>
                          ) : null}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                        className={rowClass}
                      >
                        {item.label}
                      </Link>
                    )}
                  </m.li>
                ))}
              </m.ul>
            </nav>

            <div className="space-y-4 border-t border-border bg-cream/70 px-5 py-5">
              <ul className="grid grid-cols-3 gap-2">
                {accountLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={close}
                      className="flex flex-col items-center gap-1.5 rounded-xl bg-white py-3 text-xs font-medium shadow-card transition-colors hover:text-primary-strong"
                    >
                      <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-1 text-sm font-medium">
                <a href={phoneHref} className="flex items-center gap-2.5 py-1.5">
                  <Phone aria-hidden className="size-4 text-primary-strong" />
                  {phone}
                </a>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 py-1.5">
                  <WhatsAppIcon aria-hidden className="size-4 text-whatsapp" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
