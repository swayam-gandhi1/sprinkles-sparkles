import { routes } from "@/lib/config/routes";
import type { NavItem, NavLink } from "@/types/content";

export const mainNav: readonly NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Shop", href: routes.shop },
  { label: "Baking Tins", href: routes.category("baking-tins") },
  { label: "Boxes", href: routes.category("boxes") },
  { label: "Diwali Collection", href: routes.category("diwali-collection") },
  { label: "Birthday Collection", href: routes.category("birthday-collection") },
  { label: "Tools & Equipment", href: routes.category("tools-equipment") },
  {
    label: "More",
    href: routes.categories,
    children: [
      { label: "Sprinkles", href: routes.category("sprinkles") },
      { label: "Knife Cutters", href: routes.category("knife-cutters") },
      { label: "Acrylic Toppers", href: routes.category("acrylic-toppers") },
      { label: "Paper Theme Toppers", href: routes.category("paper-theme-toppers") },
      { label: "Chocolate Boxes", href: routes.category("chocolate-boxes") },
      { label: "Diwali Exclusive Range", href: routes.category("diwali-exclusive-range") },
    ],
  },
];

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
