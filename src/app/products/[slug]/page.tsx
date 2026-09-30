import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CircleCheck,
  CircleX,
  Layers,
  Ruler,
  Scale,
  Truck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { SectionHeading } from "@/components/common/SectionHeading";
import { tones } from "@/components/common/tones";
import { Container } from "@/components/layout/Container";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGallery } from "@/components/products/ProductGallery";
import { discountPercent, ProductPrice } from "@/components/products/ProductPrice";
import { ProductVariants } from "@/components/products/ProductVariants";
import { WishlistButton } from "@/components/products/WishlistButton";
import { getCategories, getCategoryVisuals } from "@/lib/api/categories";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/api/products";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { shopHref } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getAllProducts(20);
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Sprinkle & Sparkle`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([
    getProduct(slug),
    getCategories(),
  ]);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category) ?? null;
  const visuals = getCategoryVisuals(product.category);
  const tone = tones[category?.tone ?? visuals.tone ?? "blush"];
  const related = await getRelatedProducts(product);
  const discount = discountPercent(product);
  const enquiry = `${siteConfig.contact.whatsappHref}?text=${encodeURIComponent(
    `Hi Sprinkle & Sparkle! I'd like to know more about: ${product.name}`,
  )}`;

  // Compile all images: gallery + primary
  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <Container className="py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: routes.home },
            { label: "Shop", href: routes.shop },
            ...(category
              ? [{ label: category.name, href: shopHref({ categories: [category.slug] }) }]
              : product.categoryName
                ? [{ label: product.categoryName, href: shopHref({ categories: [product.category] }) }]
                : []),
            { label: product.name, href: routes.product(product.slug) },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-2 lg:gap-14">
          {/* Product Media Gallery */}
          <div>
            <ProductGallery
              images={allImages}
              productName={product.name}
              toneGradient={tone.gradient}
              discount={discount}
              isNew={product.isNew}
            />
          </div>

          {/* Product Details */}
          <div className="lg:py-2">
            {/* Category and Subcategory Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {category ? (
                <Link
                  href={shopHref({ categories: [category.slug] })}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
                    tone.icon,
                  )}
                >
                  <category.icon aria-hidden className="size-3.5" />
                  {category.name}
                </Link>
              ) : product.categoryName ? (
                <Link
                  href={shopHref({ categories: [product.category] })}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
                    tone.icon,
                  )}
                >
                  <Layers aria-hidden className="size-3.5" />
                  {product.categoryName}
                </Link>
              ) : null}

              {product.subcategory ? (
                <Link
                  href={`/shop?subcategory=${product.subcategory}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blush px-3 py-1.5 text-xs font-semibold text-primary-strong hover:bg-blush-strong"
                >
                  {product.subcategoryName || product.subcategory.replace(/-/g, " ")}
                </Link>
              ) : null}

              {product.brand ? (
                <span className="rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-foreground/80">
                  Brand: {product.brand}
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 text-[1.875rem] leading-tight font-bold tracking-tight sm:text-[2.25rem]">
              {product.name}
            </h1>

            <ProductPrice product={product} size="lg" className="mt-4" />

            <p
              className={cn(
                "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold",
                product.inStock ? "text-accent-strong" : "text-primary-strong",
              )}
            >
              {product.inStock ? (
                <CircleCheck aria-hidden className="size-4" />
              ) : (
                <CircleX aria-hidden className="size-4" />
              )}
              {product.inStock ? "In stock" : "Out of stock"}
              {product.stockCount !== undefined ? ` (${product.stockCount} available)` : null}
            </p>

            {/* Short description if provided */}
            {product.shortDescription ? (
              <p className="mt-3 text-sm font-medium text-foreground/80">
                {product.shortDescription}
              </p>
            ) : null}

            {/* Full description */}
            {product.description ? (
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            ) : null}

            {/* Product Variants */}
            {product.variants && product.variants.length > 0 ? (
              <ProductVariants variants={product.variants} basePrice={product.price} />
            ) : null}

            {/* Product Specifications (Weight / Dimensions) */}
            {product.weight || product.dimensions ? (
              <div className="mt-6 flex flex-wrap gap-4 rounded-xl border border-border bg-white p-3.5 text-xs">
                {product.weight ? (
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Scale className="size-4 text-primary" />
                    <span>Weight: <strong>{product.weight}</strong></span>
                  </div>
                ) : null}
                {product.dimensions ? (
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Ruler className="size-4 text-accent-strong" />
                    <span>Dimensions: <strong>{product.dimensions}</strong></span>
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Action buttons */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex-1 sm:max-w-xs">
                <AddToCartButton
                  slug={product.slug}
                  name={product.name}
                  inStock={product.inStock}
                  size="lg"
                />
              </div>
              <WishlistButton
                slug={product.slug}
                name={product.name}
                className="size-12 border border-border"
              />
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

      {/* Related Products */}
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
