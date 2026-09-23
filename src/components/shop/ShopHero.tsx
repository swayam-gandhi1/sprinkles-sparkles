import Image from "next/image";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Container } from "@/components/layout/Container";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[18%] left-[46%] hidden size-6 text-sunny md:block", float: true },
  { shape: "sprinkle", className: "bottom-[26%] left-[40%] hidden h-2.5 w-7 rotate-45 text-turquoise md:block", float: true, delay: -3 },
  { shape: "heart", className: "top-[20%] left-[3%] hidden size-5 -rotate-12 text-pink/60 lg:block", float: true, delay: -1.5 },
  { shape: "dot", className: "bottom-[30%] left-[30%] size-2.5 text-lavender-vivid" },
];

type ShopHeroProps = {
  title?: string;
  /** Script-lettered last word of the title. */
  accent?: string;
  subtitle?: string;
};

/**
 * Colourful banner. The flat-lay photo is an AI-generated placeholder
 * (public/images/products/placeholder/shop-hero.webp) — replace with a real
 * shop photo when available.
 */
export function ShopHero({
  title = "Shop All",
  accent = "Products",
  subtitle = "Everything You Need to Bake, Decorate & Create",
}: ShopHeroProps) {
  return (
    <section aria-labelledby="shop-title" className="relative isolate overflow-hidden bg-blush">
      <Image
        src="/images/products/placeholder/shop-hero.webp"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[78%_50%] md:object-right"
      />
      {/* Keeps the heading readable over the photo at every width */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-blush/95 via-blush/80 to-blush/20 md:bg-linear-to-r md:from-blush md:via-blush/80 md:via-45% md:to-transparent"
      />
      <div aria-hidden className="confetti-pattern absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_right,black,transparent_55%)]" />
      <DecorLayer items={decor} />

      <Container className="relative pt-12 pb-24 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
        <h1 id="shop-title" className="text-[2.5rem] leading-[1.05] font-bold tracking-tight sm:text-[3.25rem] lg:text-[3.75rem]">
          {title}{" "}
          <span className="font-script text-[1.2em] leading-none text-gradient-brand">{accent}</span>
        </h1>
        <p className="mt-4 max-w-[26ch] text-lg sm:max-w-[42ch] font-medium text-foreground/85 sm:text-xl">{subtitle}</p>
      </Container>
    </section>
  );
}
