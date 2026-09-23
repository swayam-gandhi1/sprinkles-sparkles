import {
  BadgeCheck,
  BookHeart,
  Boxes,
  BriefcaseBusiness,
  Cake,
  CakeSlice,
  Candy,
  Croissant,
  ChefHat,
  Flame,
  Gift,
  HandHeart,
  HeartHandshake,
  Headset,
  MessageCircle,
  Package,
  Paintbrush,
  Palette,
  PartyPopper,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Truck,
  UtensilsCrossed,
  WandSparkles,
  Wheat,
} from "lucide-react";
import { routes } from "@/lib/config/routes";
import type { Feature, Occasion, ProductGroup, ShoppingNeed } from "@/types/content";

/* Homepage copy. Imagery lives in ./images.ts. */

export const heroAudiences = ["Home Bakers", "Professional Bakers", "Bakeries", "Cake Artists"] as const;

/** Short brand lines shown in the strip under the hero CTAs. */
export const heroHighlights = [
  { text: "Less Searching. More Creating.", icon: Flame },
  { text: "Your Baking Needs. Our Collection.", icon: Sparkles },
] as const;

export const essentialsIntro =
  "From essential baking ingredients to colourful decorations, premium sprinkles, cake toppers, chocolates and packaging supplies — explore a collection designed for every baking idea and celebration.";

// Existing category pages where one exists; otherwise a shop collection filter.
export const bakingEssentials: readonly ProductGroup[] = [
  { name: "Baking Ingredients", href: routes.collection("baking-ingredients"), icon: Wheat, tone: "sunny" },
  { name: "Cake Decoration", href: routes.collection("decorate"), icon: CakeSlice, tone: "blush" },
  { name: "Colours & Essences", href: routes.collection("colours-essences"), icon: Palette, tone: "lavender" },
  { name: "Sprinkles", href: routes.category("sprinkles"), icon: Sparkles, tone: "aqua" },
  { name: "Toppers", href: routes.collection("toppers"), icon: Star, tone: "lavender" },
  { name: "Chocolates", href: routes.collection("chocolates"), icon: Candy, tone: "cream" },
  { name: "Boxes & Packaging", href: routes.collection("packaging"), icon: Package, tone: "blush" },
  { name: "Tools & Equipment", href: routes.category("tools-equipment"), icon: UtensilsCrossed, tone: "aqua" },
];

export const trustItems: readonly Feature[] = [
  { title: "Wide Range of Products", description: "Everything you need in one place.", icon: Boxes },
  { title: "Wholesale & Retail", description: "Solutions for individuals, creators and businesses.", icon: Store },
  { title: "Pan India Delivery", description: "We make it easy to shop from anywhere in India.", icon: Truck },
  { title: "Secure Payments", description: "Simple and secure online shopping.", icon: ShieldCheck },
  { title: "Friendly Support", description: "We're always happy to help you choose.", icon: Headset },
];

export const aboutParagraphs = [
  "At Sprinkle & Sparkle, we believe the little details make every creation special. That's why we bring together a carefully selected range of cake decorating supplies, baking essentials, packaging, toppers, gifting products and festive accessories under one roof.",
  "Whether you're a home baker creating your next celebration cake, a professional looking for reliable supplies, a business preparing gifts or simply someone who loves beautiful presentation, our collection is designed to help you create with confidence.",
  "From the first sprinkle to the final ribbon, we're here to make your baking, decorating and gifting journey a little easier — and a lot more beautiful.",
] as const;

export const audiences: readonly Feature[] = [
  {
    title: "Home Bakers",
    description: "Bring your creative baking ideas to life from your own kitchen.",
    icon: ChefHat,
  },
  {
    title: "Professional Bakers",
    description: "Find the supplies you need to create beautiful and consistent results.",
    icon: Croissant,
  },
  {
    title: "Bakeries",
    description: "Explore essential products for everyday baking, decoration and packaging needs.",
    icon: Store,
  },
  {
    title: "Cake Artists",
    description: "Discover colourful details, toppers, tools and accessories for your creations.",
    icon: Paintbrush,
  },
];

export const sparkleBanner =
  "Your baking needs, our collection. Discover the products that help you create something beautiful, delicious and memorable.";

export const shoppingNeeds: readonly ShoppingNeed[] = [
  {
    title: "Decorate",
    description: "Sprinkles, toppers, piping tools and cake decorating essentials to help bring your ideas to life.",
    cta: "Explore Decoration",
    href: routes.collection("decorate"),
    icon: WandSparkles,
    tone: "blush",
  },
  {
    title: "Package",
    description: "Beautiful boxes, containers and packaging accessories for cakes, chocolates, hampers and gifts.",
    cta: "Explore Packaging",
    href: routes.collection("packaging"),
    icon: Package,
    tone: "aqua",
  },
  {
    title: "Gift",
    description: "Hamper boxes, jars, ribbons and gifting essentials for thoughtful presents and special moments.",
    cta: "Explore Gifting",
    href: routes.collection("gifting"),
    icon: Gift,
    tone: "sunny",
  },
  {
    title: "Celebrate",
    description: "Birthday, festive and special-occasion collections designed to make every celebration memorable.",
    cta: "Explore Celebrations",
    href: routes.collection("celebrations"),
    icon: PartyPopper,
    tone: "lavender",
  },
];

export const hamperOccasions = ["Birthdays", "Festivals", "Corporate Gifts", "Return Gifts", "Special Occasions"] as const;

export const occasions: readonly Occasion[] = [
  { name: "Birthdays", description: "Make every birthday extra special.", href: routes.occasion("birthdays"), icon: Cake, tone: "blush" },
  { name: "Festivals", description: "Celebrate the season with beautiful details.", href: routes.occasion("festivals"), icon: Flame, tone: "sunny" },
  { name: "Rakhi", description: "Thoughtful gifting for the bond you cherish.", href: routes.occasion("rakhi"), icon: HeartHandshake, tone: "cream" },
  { name: "Teacher's Day", description: "Say thank you with something meaningful.", href: routes.occasion("teachers-day"), icon: BookHeart, tone: "aqua" },
  { name: "Corporate Gifting", description: "Elegant gifting solutions for teams and clients.", href: routes.occasion("corporate-gifting"), icon: BriefcaseBusiness, tone: "lavender" },
  { name: "Special Occasions", description: "Because every special moment deserves a little sparkle.", href: routes.occasion("special-occasions"), icon: PartyPopper, tone: "blush" },
];

export const whyIntro =
  "We're here to make finding the right baking, decorating and gifting essentials simple, convenient and enjoyable.";

export const benefits: readonly Feature[] = [
  { title: "Wide Product Range", description: "From everyday essentials to celebration favourites, discover more under one roof.", icon: Sparkles },
  { title: "Quality & Trusted Brands", description: "Carefully selected products to help you create with confidence.", icon: BadgeCheck },
  { title: "Wholesale & Retail", description: "Whether you're shopping for yourself or stocking up for your business, we've got you covered.", icon: Store },
  { title: "Pan India Delivery", description: "Shop from Khanna and get your essentials delivered across India.", icon: Truck },
  { title: "Friendly Support", description: "Not sure what you need? We're happy to help.", icon: MessageCircle },
];

export const promise = {
  title: "The Little Details Matter",
  body: "We curate products that help you go from idea to finished presentation with ease — whether that's a beautifully decorated cake, a thoughtfully packed gift or a festive celebration.",
  points: [
    { title: "Curated with Care", description: "Useful, beautiful and celebration-ready.", icon: Sparkles },
    { title: "Easy to Explore", description: "Find your essentials without the endless searching.", icon: Search },
    { title: "Here When You Need Us", description: "Friendly support from selection to shopping.", icon: HandHeart },
  ] satisfies readonly Feature[],
};
