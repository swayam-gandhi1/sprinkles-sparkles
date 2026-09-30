import { redirect } from "next/navigation";
import { getCategories } from "@/lib/api/categories";
import { getCollections } from "@/lib/api/collections";
import { shopHref } from "@/lib/products/query";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [categories, collections] = await Promise.all([
    getCategories(),
    getCollections(),
  ]);

  // If slug matches a known collection, redirect to collection query
  const isCollection = collections.some((c) => c.slug === slug);
  if (isCollection || slug.includes("collection")) {
    redirect(shopHref({ collection: slug }));
  }

  // If slug is a category or alias
  const targetCategorySlug = slug === "boxes" ? "boxes-packaging" : slug;
  redirect(shopHref({ categories: [targetCategorySlug] }));
}
