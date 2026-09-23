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

const stepButton =
  "grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-blush hover:text-primary-strong disabled:opacity-40";

/** Cart contents resolved against the catalog. Checkout is not built yet, so orders go via WhatsApp. */
export function CartView({ products }: { products: readonly Product[] }) {
  const ready = useCartReady();
  const { cart } = useCartState();
  const lines = cart
    .map((line) => ({ ...line, product: products.find((p) => p.slug === line.slug) }))
    .filter((line): line is typeof line & { product: Product } => Boolean(line.product));
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);

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
    `Estimated subtotal: ${formatPrice(subtotal)}`,
  ].join("\n");
  const whatsappOrder = `${siteConfig.contact.whatsappHref}?text=${encodeURIComponent(message)}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
      <ul className="divide-y divide-border rounded-card border border-border bg-white shadow-card">
        {lines.map(({ product, qty }) => (
          <li key={product.slug} className="flex gap-4 p-4 sm:p-5">
            <Link href={routes.product(product.slug)} className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-blush sm:size-24">
              <Image src={product.image.src} alt={product.image.alt} fill sizes="96px" className="object-cover" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={routes.product(product.slug)} className="line-clamp-2 font-semibold hover:text-primary-strong">
                  {product.name}
                </Link>
                <p className="mt-0.5 text-sm text-muted-foreground">{formatPrice(product.price)} each</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
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
                <p className="w-20 text-right font-bold tabular-nums">{formatPrice(product.price * qty)}</p>
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

      <aside aria-label="Order summary" className="rounded-card border border-border bg-white p-6 shadow-card lg:sticky lg:top-32">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Items</dt>
            <dd className="font-semibold">{lines.reduce((s, l) => s + l.qty, 0)}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base">
            <dt className="font-semibold">Subtotal</dt>
            <dd className="font-bold">{formatPrice(subtotal)}</dd>
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
