import { publicEnv } from "./env";

export const siteConfig = {
  name: "Sprinkle & Sparkle",
  tagline: "The Cake Decor Shop",
  description:
    "Cake decorating supplies, baking essentials, packaging, toppers and gifting products from Sprinkle & Sparkle, Khanna, Punjab.",
  url: publicEnv.siteUrl,
  locale: "en-IN",
  currency: "INR",
  contact: {
    phone: "+91 98553 00373",
    phoneHref: "tel:+919855300373",
    email: "sprinkleandsparkle@gmail.com",
    location: "Khanna, Punjab",
    whatsappHref: "https://wa.me/919855300373",
  },
  social: {
    /** The shop's Instagram profile URL. Instagram links stay hidden while this is null. */
    instagram: "https://www.instagram.com/sprinkle_and_sparkle__/" as string | null,
  },
  /**
   * Official logo artwork (public/images/branding/). `width`/`height` are the
   * file's intrinsic size. `crop` is the fraction of the artwork holding the
   * logo itself — the surrounding whitespace is trimmed with CSS, never by
   * editing the file.
   */
  logo: {
    src: "/images/branding/logo.png",
    width: 4500,
    height: 3288,
    // Measured artwork bounds (x 16.1%, y 9.6%, 69.7% × 80.1%) plus ~1% breathing room.
    crop: { x: 0.151, y: 0.084, width: 0.717, height: 0.825 },
  },
} as const;
