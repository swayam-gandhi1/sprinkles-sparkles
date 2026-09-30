import { redirect } from "next/navigation";
import { shopHref } from "@/lib/products/query";

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const targetCategorySlug = slug === "boxes" ? "boxes-packaging" : slug;
  redirect(shopHref({ categories: [targetCategorySlug] }));
}
