import { redirect } from "next/navigation";
import { routes } from "@/lib/config/routes";

export default async function ProductRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(routes.product(slug));
}
