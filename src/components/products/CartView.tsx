"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { removeFromCart, setQuantity, useCartReady, useCartState } from "@/lib/cart/store";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/products/query";
import type { Product } from "@/types/product";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

// 44px touch targets on phones, the original 40px from `sm` up.
const stepButton =
  "grid size-11 place-items-center rounded-full text-foreground transition-colors hover:bg-blush hover:text-primary-strong disabled:opacity-40 sm:size-10";

/** Cart contents resolved against the catalog. Checkout is not built yet, so orders go via WhatsApp. */
export function CartView({ products }: { products: readonly Product[] }) {
  const ready = useCartReady();
  const { cart } = useCartState();
  const lines = cart
    .map((line) => ({ ...line, product: products.find((p) => p.slug === line.slug) }))
    .filter((line): line is typeof line & { product: Product } => Boolean(line.product));
  // Items without a confirmed price make the total unknowable — it's then confirmed on WhatsApp.
  const subtotal = lines.every((line) => line.product.price !== undefined)
    ? lines.reduce((sum, line) => sum + (line.product.price ?? 0) * line.qty, 0)
    : null;

  if (!ready) {
    return (
      <div aria-busy="true" className="grid gap-4 sm:grid-cols-2">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="rounded-panel bg-linear-to-br from-blush via-cream to-lavender-mist px-6 py-16 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white text-primary-strong shadow-card">
          <ShoppingBag aria-hidden className="size-8" strokeWidth={1.6} />
        </span>
        <h2 className="mt-5 text-xl font-bold sm:text-2xl">Your cart is empty</h2>
        <p className="mx-auto mt-2 max-w-[40ch] text-muted-foreground">Find sprinkles, toppers, tools and more for your next bake.</p>
        <ButtonLink href={routes.shop} className="mt-7">
          Start Shopping
          <ButtonArrow />
        </ButtonLink>
      </div>
    );
  }

  const message = [
    "Hi Sprinkle & Sparkle! I'd like to order:",
    ...lines.map((l) => `• ${l.product.name} × ${l.qty}`),
    ...(subtotal !== null ? [`Estimated subtotal: ${formatPrice(subtotal)}`] : []),
  ].join("\n");
  const whatsappOrder = `${siteConfig.contact.whatsappHref}?text=${encodeURIComponent(message)}`;

  const itemCount = lines.reduce((s, l) => s + l.qty, 0);

  /*
   * Item rows are a grid so nothing needs a fixed width:
   * - phones: image + details, controls on their own full-width line below;
   * - sm–md: image | details | controls in one line;
   * - lg (summary alongside, narrower list): controls drop under the details;
   * - xl: back to one line.
   */
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground sm:mb-4">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
        <ul className="divide-y divide-border rounded-card border border-border bg-white shadow-card">
          {lines.map(({ product, qty }) => (
            <li
              key={product.slug}
              className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 p-4 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:p-5 lg:grid-cols-[6rem_minmax(0,1fr)] xl:grid-cols-[6rem_minmax(0,1fr)_auto]"
            >
              <Link
                href={routes.product(product.slug)}
                className="relative size-20 overflow-hidden rounded-2xl bg-blush sm:size-24 lg:row-span-2 xl:row-span-1"
              >
                <Image src={product.image.src} alt={product.image.alt} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="min-w-0 self-center lg:self-end xl:self-center">
                <Link
                  href={routes.product(product.slug)}
                  className="line-clamp-3 text-[0.9375rem] leading-snug font-semibold break-words hover:text-primary-strong sm:line-clamp-2 sm:text-base"
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.price !== undefined ? `${formatPrice(product.price)} each` : "Price on request"}
                </p>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-end sm:gap-4 lg:col-start-2 lg:self-start lg:justify-between xl:col-start-auto xl:self-center xl:justify-end">
                <div className="flex items-center rounded-full border border-border" role="group" aria-label={`Quantity of ${product.name}`}>
                  <button
                    type="button"
                    className={stepButton}
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(product.slug, qty - 1)}
                  >
                    <Minus aria-hidden className="size-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    className={stepButton}
                    aria-label="Increase quantity"
                    disabled={qty >= 99}
                    onClick={() => setQuantity(product.slug, qty + 1)}
                  >
                    <Plus aria-hidden className="size-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <p className="min-w-16 text-right font-bold tabular-nums">
                    {product.price !== undefined ? formatPrice(product.price * qty) : "—"}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.slug)}
                    aria-label={`Remove ${product.name}`}
                    className={stepButton}
                  >
                    <Trash aria-hidden className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tablets: a compact summary aligned under the list; desktop: the original sticky sidebar. */}
      <aside
        aria-label="Order summary"
        className="rounded-card border border-border bg-white p-5 shadow-card sm:p-6 md:ml-auto md:w-full md:max-w-sm lg:sticky lg:top-32 lg:ml-0 lg:max-w-none"
      >
        <h2 className="text-lg font-bold">Order Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Items</dt>
            <dd className="font-semibold">{itemCount}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base">
            <dt className="font-semibold">Subtotal</dt>
            <dd className="font-bold">{subtotal !== null ? formatPrice(subtotal) : "On request"}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Shipping is confirmed with your order. Online checkout is coming soon — for now, send us your order on
          WhatsApp and we&apos;ll take it from there.
        </p>
        <a
          href={whatsappOrder}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-button bg-whatsapp-strong text-[0.9375rem] font-semibold text-white shadow-card transition-[filter] hover:brightness-90"
        >
          <WhatsAppIcon aria-hidden className="size-5" />
          Send order on WhatsApp
        </a>
        <Link
          href={routes.shop}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-sm font-semibold text-primary-strong hover:underline"
        >
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
