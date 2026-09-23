import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheck, CircleX, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { SectionHeading } from "@/components/common/SectionHeading";
import { tones } from "@/components/common/tones";
import { Container } from "@/components/layout/Container";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { ProductCard } from "@/components/products/ProductCard";
import { discountPercent, ProductPrice } from "@/components/products/ProductPrice";
import { WishlistButton } from "@/components/products/WishlistButton";
import { shopCategories } from "@/data/shop";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/api/products";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { shopHref } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";

export async function generateStaticParams() {
  return (await getAllProducts()).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const category = shopCategories.find((c) => c.slug === product.category);
  const tone = tones[category?.tone ?? "blush"];
  const related = await getRelatedProducts(product);
  const discount = discountPercent(product);
  const enquiry = `${siteConfig.contact.whatsappHref}?text=${encodeURIComponent(
    `Hi Sprinkle & Sparkle! I'd like to know more about: ${product.name}`,
  )}`;

  return (
    <>
      <Container className="py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: routes.home },
            { label: "Shop", href: routes.shop },
            ...(category ? [{ label: category.name, href: shopHref({ categories: [category.slug] }) }] : []),
            { label: product.name, href: routes.product(product.slug) },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-2 lg:gap-14">
          <div className={cn("relative aspect-square overflow-hidden rounded-panel bg-linear-to-br shadow-card", tone.gradient)}>
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 38rem, 92vw"
              style={product.image.position ? { objectPosition: product.image.position } : undefined}
              className="object-cover"
            />
            {discount ? (
              <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                {discount}% off
              </span>
            ) : product.isNew ? (
              <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white">
                New
              </span>
            ) : null}
          </div>

          <div className="lg:py-4">
            {category ? (
              <Link
                href={shopHref({ categories: [category.slug] })}
                className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold", tone.icon)}
              >
                <category.icon aria-hidden className="size-3.5" />
                {category.name}
              </Link>
            ) : null}
            <h1 className="mt-4 text-[1.875rem] leading-tight font-bold tracking-tight sm:text-[2.25rem]">{product.name}</h1>
            <ProductPrice product={product} size="lg" className="mt-4" />
            <p
              className={cn(
                "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold",
                product.inStock ? "text-accent-strong" : "text-primary-strong",
              )}
            >
              {product.inStock ? <CircleCheck aria-hidden className="size-4" /> : <CircleX aria-hidden className="size-4" />}
              {product.inStock ? "In stock" : "Out of stock"}
            </p>
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex-1 sm:max-w-xs">
                <AddToCartButton slug={product.slug} name={product.name} inStock={product.inStock} size="lg" />
              </div>
              <WishlistButton slug={product.slug} name={product.name} className="size-12 border border-border" />
            </div>
            <a
              href={enquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-strong hover:underline"
            >
              <WhatsAppIcon aria-hidden className="size-4 text-whatsapp" />
              Ask about this product on WhatsApp
            </a>

            <p className="mt-8 flex items-center gap-3 rounded-card bg-aqua-mist px-4 py-3 text-sm text-foreground/85">
              <Truck aria-hidden className="size-5 shrink-0 text-accent-strong" />
              Pan India delivery from our Khanna store.
            </p>
          </div>
        </div>
      </Container>

      {related.length ? (
        <section aria-labelledby="related-title" className="bg-cream py-section-sm">
          <Container>
            <SectionHeading id="related-title" title="You May Also Like" />
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
