import { routes } from "@/lib/config/routes";
import type { NavItem, NavLink } from "@/types/content";


export const footerQuickLinks: readonly NavLink[] = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Shop", href: routes.shop },
  { label: "Contact Us", href: routes.contact },
];

export const footerHelpLinks: readonly NavLink[] = [
  { label: "Shipping Policy", href: routes.policy("shipping") },
  { label: "Return & Refund", href: routes.policy("returns") },
  { label: "FAQs", href: routes.faqs },
  { label: "Privacy Policy", href: routes.policy("privacy") },
  { label: "Terms & Conditions", href: routes.policy("terms") },
];
