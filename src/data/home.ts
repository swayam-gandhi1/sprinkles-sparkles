import {
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  ChefHat,
  Gift,
  HandHeart,
  Headset,
  MessageCircle,
  Package,
  Paintbrush,
  PartyPopper,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  WandSparkles,
} from "lucide-react";
import { routes } from "@/lib/config/routes";
import type { Feature, Occasion, ShoppingNeed } from "@/types/content";

/* Homepage copy. Imagery lives in ./images.ts. */

export const heroAudiences = ["Home Bakers", "Cake Artists", "Gift Makers", "Celebration Lovers"] as const;

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
    description: "For passionate home bakers who love creating beautiful cakes and treats.",
    icon: ChefHat,
  },
  {
    title: "Cake Artists",
    description: "For professionals who need decorating tools, toppers and finishing details.",
    icon: Paintbrush,
  },
  {
    title: "Gift Makers",
    description: "For people who love creating thoughtful hampers and beautifully presented gifts.",
    icon: Gift,
  },
  {
    title: "Businesses",
    description:
      "For bakeries, gifting businesses, event planners and other businesses looking for supplies and packaging.",
    icon: BriefcaseBusiness,
  },
];

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
    tone: "cream",
  },
  {
    title: "Celebrate",
    description: "Birthday, festive and special-occasion collections designed to make every celebration memorable.",
    cta: "Explore Celebrations",
    href: routes.collection("celebrations"),
    icon: PartyPopper,
    tone: "blush",
  },
];

export const hamperOccasions = ["Birthdays", "Festivals", "Corporate Gifts", "Return Gifts", "Special Occasions"] as const;

export const occasions: readonly Occasion[] = [
  { name: "Birthdays", description: "Make every birthday extra special.", href: routes.occasion("birthdays") },
  { name: "Festivals", description: "Celebrate the season with beautiful details.", href: routes.occasion("festivals") },
  { name: "Rakhi", description: "Thoughtful gifting for the bond you cherish.", href: routes.occasion("rakhi") },
  { name: "Teacher's Day", description: "Say thank you with something meaningful.", href: routes.occasion("teachers-day") },
  { name: "Corporate Gifting", description: "Elegant gifting solutions for teams and clients.", href: routes.occasion("corporate-gifting") },
  { name: "Special Occasions", description: "Because every special moment deserves a little sparkle.", href: routes.occasion("special-occasions") },
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
