import { notFound, redirect } from "next/navigation";
import { shopHref } from "@/lib/products/query";
import type { ShopQuery } from "@/types/product";

/*
 * The header and homepage link to `/category/<slug>` (see src/data/navigation.ts
 * and categories.ts). Until dedicated category pages exist, each slug opens the
 * matching filtered shop view.
 */
const categoryFilters: Record<string, Partial<ShopQuery>> = {
  "baking-tins": { categories: ["baking-tins"] },
  boxes: { categories: ["boxes"] },
  "chocolate-boxes": { categories: ["boxes"] },
  sprinkles: { categories: ["sprinkles"] },
  "tools-equipment": { categories: ["tools-equipment"] },
  "knife-cutters": { categories: ["tools-equipment"] },
  "acrylic-toppers": { categories: ["toppers"] },
  "paper-theme-toppers": { categories: ["toppers"] },
  "diwali-collection": { categories: ["diwali-collection"] },
  "diwali-exclusive-range": { categories: ["diwali-collection"] },
  "birthday-collection": { occasion: "birthdays" },
};

export function generateStaticParams() {
  return Object.keys(categoryFilters).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const filter = categoryFilters[(await params).slug];
  if (!filter) notFound();
  redirect(shopHref(filter));
}
