import Link from "next/link";
import { Heart, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { buttonVariants } from "@/components/ui/Button";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";
import { CountBadge } from "./CountBadge";
import { DesktopNav } from "./DesktopNav";
import { HeaderShell } from "./HeaderShell";
import { MobileNav } from "./MobileNav";
import { MobileSearch } from "./MobileSearch";
import { SearchForm } from "./SearchForm";

const actions = [
  { label: "Login", href: routes.account, icon: User, badge: null },
  { label: "Wishlist", href: routes.wishlist, icon: Heart, badge: "wishlist" },
  { label: "Cart", href: routes.cart, icon: ShoppingBag, badge: "cart" },
] as const;

const iconButton = cn(buttonVariants({ variant: "ghost", size: "icon" }), "[&_svg]:size-[22px]");

export function SiteHeader() {
  return (
    <HeaderShell>
      <Container className="flex items-center gap-1 py-2 sm:gap-2 lg:gap-6 lg:py-3 xl:gap-8">
        <MobileNav logo={<Logo className="w-[92px]" sizes="130px" />} />

        <Logo
          priority
          sizes="(min-width: 1024px) 210px, 135px"
          className="w-[84px] transition-[width] duration-300 ease-premium sm:w-[96px] lg:w-[148px] lg:group-data-[scrolled=true]/header:w-[116px]"
        />

        {/* Desktop: search + account row above the category navigation */}
        <div className="hidden min-w-0 flex-1 lg:block">
          <div className="flex items-center gap-6">
            <SearchForm id="header-search" className="max-w-xl flex-1" />
            <ul className="ml-auto flex items-center gap-1">
              {actions.map(({ label, href, icon: Icon, badge }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group/action flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1 text-[0.6875rem] font-medium text-foreground/80 transition-colors hover:text-primary-strong"
                  >
                    <span className="relative grid size-9 place-items-center rounded-full transition-colors duration-300 ease-premium group-hover/action:bg-blush">
                      <Icon aria-hidden className="size-[21px]" strokeWidth={1.7} />
                      {badge ? <CountBadge kind={badge} /> : null}
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 shrink-0 items-center gap-2 rounded-button bg-whatsapp-strong px-4 text-[0.8125rem] font-semibold text-white shadow-[0_10px_22px_-12px_rgb(26_158_80/0.8)] transition-[translate,filter] duration-200 ease-premium hover:-translate-y-0.5 hover:brightness-90 xl:inline-flex"
            >
              <WhatsAppIcon aria-hidden className="size-4" />
              WhatsApp Us
            </a>
          </div>
          <DesktopNav className="mt-1 -ml-1.5 xl:-ml-3" />
        </div>

        {/* Mobile / tablet actions */}
        <div className="ml-auto flex items-center lg:hidden">
          <MobileSearch />
          <Link href={routes.wishlist} className={cn(iconButton, "relative hidden sm:inline-flex")}>
            <span className="sr-only">Wishlist</span>
            <Heart aria-hidden strokeWidth={1.6} />
            <CountBadge kind="wishlist" className="top-1 right-1" />
          </Link>
          <Link href={routes.cart} className={cn(iconButton, "relative -mr-2")}>
            <span className="sr-only">Cart</span>
            <ShoppingBag aria-hidden strokeWidth={1.6} />
            <CountBadge kind="cart" className="top-1 right-1" />
          </Link>
        </div>
      </Container>
    </HeaderShell>
  );
}
