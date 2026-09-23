import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { CartView } from "@/components/products/CartView";
import { getAllProducts } from "@/lib/api/products";
import { routes } from "@/lib/config/routes";

export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false },
};

export default async function CartPage() {
  const products = await getAllProducts();

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Cart", href: routes.cart }]} />
      <h1 className="mt-5 text-[2rem] leading-tight font-bold tracking-tight sm:text-[2.5rem]">
        Your <span className="font-script text-[1.2em] text-gradient-brand">Cart</span>
      </h1>
      <div className="mt-8">
        <CartView products={products} />
      </div>
    </Container>
  );
}
