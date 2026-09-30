import { routes } from "@/lib/config/routes";
import type { NavItem } from "@/types/content";
import { getCategories } from "./categories";

// Static site navigation required by the application
export const staticNavItems: readonly NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Shop", href: routes.shop },
];

const PRIMARY_CATEGORY_LIMIT = 5;

/**
 * Builds dynamic, 100% backend-driven navigation from the catalog API.
 * Slices the first N active categories into the top-level navbar and places
 * the remaining active categories into the "More" dropdown menu.
 *
 * No hardcoded category or collection names are maintained here.
 */
export async function getNavigationItems(): Promise<readonly NavItem[]> {
  try {
    const categories = await getCategories();

    if (!categories.length) {
      // If backend returns 0 categories or is temporarily down, return only static site links
      return staticNavItems;
    }

    // Split based on backend ordering
    const primaryCats = categories.slice(0, PRIMARY_CATEGORY_LIMIT);
    const overflowCats = categories.slice(PRIMARY_CATEGORY_LIMIT);

    const navItems: NavItem[] = [
      ...staticNavItems,
      ...primaryCats.map((cat) => ({
        label: cat.name,
        href: routes.category(cat.slug),
      })),
    ];

    if (overflowCats.length > 0) {
      navItems.push({
        label: "More",
        href: routes.shop,
        children: overflowCats.map((cat) => ({
          label: cat.name,
          href: routes.category(cat.slug),
        })),
      });
    }

    return navItems;
  } catch (error) {
    console.error("Failed to load navigation items from API:", error);
    return staticNavItems;
  }
}
