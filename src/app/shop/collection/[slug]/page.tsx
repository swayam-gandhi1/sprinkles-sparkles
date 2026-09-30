import { redirect } from "next/navigation";
import { shopHref } from "@/lib/products/query";

export default async function ShopCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(shopHref({ collection: slug }));
}
