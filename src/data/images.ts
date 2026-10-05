import type { ImageAsset } from "@/types/content";

/*
 * Homepage imagery — ONLY real Sprinkle & Sparkle photos, taken from the
 * shop's Instagram (@sprinkle_and_sparkle__) and stored as high-quality WebP
 * in public/images/client/ (originals up to 1440px).
 *
 * Logged out, Instagram exposes only the 12 newest posts, so this set is
 * small. Add more of the client's originals here as they arrive; sections
 * without a real photo are designed to work without one.
 */
const photo = (file: string, alt: string, position?: string): ImageAsset => ({
  src: `/images/client/${file}`,
  alt,
  ...(position ? { position } : {}),
});

export const siteImages = {
  heroHampers: photo("hampers-pink-blue-batch.webp", "Customized hampers wrapped in pink and blue net fabric"),
  heroFlowers: photo("flowers-mixed-yellow.webp", "A decorative flower arrangement at the Sprinkle & Sparkle store", "50% 45%"),
  heroJars: photo("hampers-jars-batch.webp", "Steel jars being filled for customized hampers"),
  about: photo("flowers-red-peony.webp", "Decorative flowers on display inside the Sprinkle & Sparkle store in Khanna", "50% 55%"),
  hamper: photo("hampers-net-fabric.webp", "Customized gift hampers decorated with net fabric, pearls and flowers", "50% 60%"),
  occasions: photo("flowers-roses-blue-peach.webp", "Blue and peach decorative roses", "40% 50%"),
} satisfies Record<string, ImageAsset>;

/** Client-supplied Diwali product photos (public/Diwali Products/ — the folder name has a space). */
const diwali = (file: string, alt: string, position?: string): ImageAsset => ({
  src: encodeURI(`/Diwali Products/${file}`),
  alt,
  ...(position ? { position } : {}),
});

/** Homepage Diwali feature collage: one featured photo, then supporting shots. */
export const diwaliFeatureImages = {
  featured: diwali(
    "WhatsApp-Image-2026-09-18-at-20.43.25-3.jpeg",
    "Gold leaf laddoo candles in a mint gift box",
    "50% 55%",
  ),
  roses: diwali("WhatsApp-Image-2026-09-18-at-20.43.26-2.jpeg", "Rose candles and festive treats in a compartment gift box"),
  treats: diwali("WhatsApp-Image-2026-09-20-at-19.21.58-2.jpeg", "Cookies, brownies and chocolates in a nine-compartment treat box"),
  scallop: diwali("optimized/5da7e162-bf9f-41e8-9c3b-7bd08f75632d-1.webp", "Red scallop-edged box with a clear lid"),
} satisfies Record<string, ImageAsset>;

/** Instagram gallery — the shop's own posts. */
export const instagramGallery: readonly ImageAsset[] = [
  photo("flowers-lilies-pink.webp", "Pink decorative lilies"),
  photo("hampers-pink-blue-batch.webp", "A batch of pink and blue net-fabric hampers"),
  photo("flowers-roses-yellow-red.webp", "Yellow and red decorative roses"),
  photo("flowers-peony-blue.webp", "Decorative peonies in pink and blue"),
  photo("hampers-jars-batch.webp", "Jars prepared for customized hampers"),
  photo("flowers-red-bunch.webp", "A bunch of red decorative flowers"),
];
