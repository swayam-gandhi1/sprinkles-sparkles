/**
 * Central route map. Most destinations are built in later phases — linking
 * through here keeps URLs consistent and easy to change.
 */
export const routes = {
  home: "/",
  shop: "/shop",
  categories: "/categories",
  cart: "/cart",
  checkout: "/checkout",
  wishlist: "/wishlist",
  account: "/account",
  about: "/about",
  contact: "/contact",
  faqs: "/faqs",
  inspiration: "/inspiration",
  category: (slug: string) => `/category/${slug}`,
  product: (slug: string) => `/products/${slug}`,
  collection: (slug: string) => `/shop?collection=${slug}`,
  occasion: (slug: string) => `/shop?occasion=${slug}`,
  policy: (slug: "shipping" | "returns" | "privacy" | "terms") => `/policies/${slug}`,
} as const;
