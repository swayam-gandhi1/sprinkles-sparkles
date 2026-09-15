import Link from "next/link";
import { Heart, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { buttonVariants } from "@/components/ui/Button";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { HeaderShell } from "./HeaderShell";
import { MobileNav } from "./MobileNav";
import { MobileSearch } from "./MobileSearch";
import { SearchForm } from "./SearchForm";

const actions = [
  { label: "Login", href: routes.account, icon: User },
  { label: "Wishlist", href: routes.wishlist, icon: Heart },
  { label: "Cart", href: routes.cart, icon: ShoppingBag },
] as const;

const iconButton = cn(buttonVariants({ variant: "ghost", size: "icon" }), "[&_svg]:size-[22px]");

export function SiteHeader() {
  return (
    <HeaderShell>
      <Container className="flex items-center gap-1 py-2 sm:gap-2 lg:gap-8 lg:py-3">
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
              {actions.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[0.6875rem] font-medium text-foreground/75 transition-colors hover:text-primary-strong"
                  >
                    <Icon aria-hidden className="size-[22px]" strokeWidth={1.6} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <DesktopNav className="mt-1.5 -ml-2 xl:-ml-3" />
        </div>

        {/* Mobile / tablet actions */}
        <div className="ml-auto flex items-center lg:hidden">
          <MobileSearch />
          <Link href={routes.wishlist} aria-label="Wishlist" className={cn(iconButton, "hidden sm:inline-flex")}>
            <Heart aria-hidden strokeWidth={1.6} />
          </Link>
          <Link href={routes.cart} aria-label="Cart" className={cn(iconButton, "-mr-2")}>
            <ShoppingBag aria-hidden strokeWidth={1.6} />
          </Link>
        </div>
      </Container>
    </HeaderShell>
  );
}
