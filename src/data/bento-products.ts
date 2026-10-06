import type { PackTier } from "@/types/product";

/*
 * BENTO BOXES — the client's bento / compact cake packaging range.
 *
 * Built only from the assets in `public/Bento boxes` and the pricing sheet
 * supplied with them. The records mirror the future backend Product response
 * so the API can replace this file without UI changes — only
 * src/lib/api/products.ts reads it.
 *
 * Pricing: this range is sold BY THE PACK, PRICED PER PIECE, so each product
 * carries `packTiers` ({ qty, unitPrice }) rather than one flat price. The UI
 * never shows a bare "₹18" — see src/lib/products/pricing.ts.
 *
 * Open questions for the client are marked `REVIEW:`; nothing here is invented.
 */

export type BentoProductRecord = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  /** Public URLs; the first image is the primary (card) photo. */
  images: readonly string[];
  /** Alt text per image, same order. */
  alts: readonly string[];
  /** Pack sizes with per-piece pricing, smallest pack first. */
  packTiers?: readonly PackTier[];
  /** Flat per-piece price for items sold loose rather than in fixed packs. */
  unitPrice?: number;
  /** No price confirmed yet — the UI asks the customer to enquire. */
  pricePending?: boolean;
  dimensions?: string;
  isNew?: boolean;
  inStock?: boolean;
  addedAt?: string;
};

/**
 * URL for a product photo. The client's originals are JPEGs in
 * `public/Bento boxes`; they are served from `optimized/` as full-resolution
 * WebP masters (q85, visually lossless — RMSE under 3/255 against the original,
 * and 59% smaller overall). next/image then derives responsive AVIF/WebP from
 * those. The JPEG originals stay in the folder as untouched source assets.
 *
 * The folder name contains a space and one filename an `@`; `encodeURI` leaves
 * `@` raw, which the static file server and the image optimizer both reject, so
 * it is escaped too.
 */
const photo = (file: string) =>
  encodeURI(`/Bento boxes/optimized/${file.replace(/\.jpe?g$/i, ".webp")}`).replace(/@/g, "%40");

export const bentoProducts: readonly BentoProductRecord[] = [
  {
    id: "bento-001",
    sku: "BENTO-BOX-001",
    slug: "bento-cake-box",
    name: "Bento Cake Box",
    description:
      "Practical bento cake packaging designed for compact celebration cakes, birthdays, gifting and takeaway orders. The moulded bagasse clamshell closes with a tab and stacks for transport.",
    // REVIEW: the only plain white-bento-box asset supplied is the 6" shot, which
    // this product shares with `6-inch-bento-cake-box`. Confirm whether the two are
    // one product in two sizes, and supply a non-6" photo if they are not.
    images: [photo("2.jpeg")],
    alts: ["A white bento cake box holding a heart-decorated cake, with more boxes stacked behind"],
    packTiers: [
      { qty: 10, unitPrice: 12 },
      { qty: 25, unitPrice: 10 },
    ],
    inStock: true,
    isNew: true,
    addedAt: "2026-10-06",
  },
  {
    id: "bento-002",
    sku: "BENTO-BOX-002",
    slug: "dome-shape-bento-clear-cake-box",
    name: "Dome Shape Bento Clear Cake Box",
    description:
      "Clear dome-style bento cake box designed to showcase cakes while providing attractive and protective packaging. The domed lid clears tall toppings and sits on a firm gold base board.",
    images: [photo("3.jpeg")],
    alts: ["A chocolate cake on a gold base under a clear domed bento cake box lid"],
    // The sheet quotes "10 pcs @ ₹200" (a pack total of ₹200 = ₹20/pc) and
    // "50 pcs @ ₹18 each". REVIEW: confirm ₹200 is the pack total, not per piece.
    packTiers: [
      { qty: 10, unitPrice: 20, packPrice: 200 },
      { qty: 50, unitPrice: 18 },
    ],
    inStock: true,
    isNew: true,
    addedAt: "2026-10-06",
  },
  {
    id: "bento-003",
    sku: "BENTO-BOX-003",
    slug: "white-bento-cake-box-with-front-window",
    name: "White Bento Cake Box With Front Window",
    description:
      "White bento cake box with a transparent front window, suitable for displaying small cakes while keeping them protected during transportation and gifting.",
    images: [photo("4.jpeg")],
    alts: [
      "Two white bento cake boxes with clear front windows and pink ribbon bows, one holding a pink birthday cake",
    ],
    // Sheet: "₹20 each", with no pack size given — priced per piece until the
    // client confirms pack quantities. REVIEW: pack sizes wanted?
    unitPrice: 20,
    inStock: true,
    isNew: true,
    addedAt: "2026-10-06",
  },
  {
    id: "bento-004",
    sku: "BENTO-BOX-004",
    slug: "transparent-window-cake-box",
    name: "Transparent Window Cake Box",
    description:
      "Transparent window cake box designed to display bento cakes and small celebration cakes while keeping the product protected. The clear panel sits in the lid of a sturdy bagasse clamshell.",
    images: [photo("666.jpeg"), photo("6.jpeg"), photo("66.jpeg")],
    alts: [
      "A white bento cake box with a clear square window set into the lid",
      "A decorated Valentine's bento cake seen through the clear window of a white bento box",
      "Dimension guide: the window bento box measures 15.5 cm across the lid, 10 cm across the base and 8 cm tall",
    ],
    packTiers: [
      { qty: 10, unitPrice: 20 },
      { qty: 25, unitPrice: 18 },
    ],
    dimensions: 'Lid 15.5 cm (6") square · base 10 cm (4") square · 8 cm (3") tall · 4 cm (1.5") deep tray',
    inStock: true,
    isNew: true,
    addedAt: "2026-10-06",
  },
  {
    id: "bento-005",
    sku: "BENTO-BOX-005",
    slug: "fully-transparent-bento-cake-box",
    name: "Fully Transparent Bento Cake Box",
    description:
      "Fully transparent bento cake box that gives customers a clear view of the cake while providing secure packaging for takeaway, gifting and celebrations. The hinged clamshell snaps shut and shows the cake from every side.",
    images: [photo("5.jpeg"), photo("White color bento cake box with Front window @ 20 each.jpeg")],
    alts: [
      "A clear bento cake box holding a square anniversary cake, lid closed",
      "Dimension guide: the clear bento box measures 14.5 cm across the base, 11 cm across the lid and 7 cm tall",
    ],
    // REVIEW: the second file is named "White color bento cake box with Front
    // window @ 20 each.jpeg" but pictures this FULLY TRANSPARENT box, not the
    // white front-window one — filed by what it shows, not by its filename.
    packTiers: [
      { qty: 10, unitPrice: 15 },
      { qty: 50, unitPrice: 12 },
    ],
    dimensions: 'Base 14.5 cm (5.71") square · lid 11 cm (4.33") square · 7 cm (2.76") tall',
    inStock: true,
    isNew: true,
    addedAt: "2026-10-06",
  },
  {
    id: "bento-006",
    sku: "BENTO-BOX-006",
    slug: "square-dessert-box-with-clear-lid-and-fork",
    name: "Square Dessert Box with Clear Lid & Fork",
    description:
      "Individual cake, pastry and snack packaging: a white base tray with a moulded channel that holds a pink fork, under a tall clear lid. Sold as a pack of 25 — one ready-to-hand-over portion per box.",
    images: [photo("7.jpeg"), photo("88888.jpeg"), photo("8888.jpeg"), photo("888.jpeg")],
    alts: [
      "Two square dessert boxes with clear lids and pink forks, one holding a mango layer cake",
      "Several square dessert boxes with clear lids and pink forks, holding strawberry and cream cake slices",
      "The white base tray of the dessert box with its pink fork in the moulded channel",
      "Dimension guide: the dessert box measures 11 cm across the base, 10 cm across the lid and 7 cm tall",
    ],
    // Name and pricing read off the shop listing supplied with the assets
    // (88.jpeg, 8.jpeg): "Square Dessert Box with Clear Lid & Fork | Individual
    // Cake, Pastry & Snack Packaging | Pack of 25", Rs. 550.00 struck through,
    // Rs. 467.50 now, "Rs. 18.70 each" — a 15% Diwali Mega Carnival price.
    // REVIEW: ₹467.50 is a festive promo price; confirm it still applies.
    // REVIEW: the brief quoted ₹520 / ₹450 / ₹18 each; the asset says
    // ₹550 / ₹467.50 / ₹18.70 each, and the asset is the source of truth.
    packTiers: [{ qty: 25, unitPrice: 18.7, packPrice: 467.5, compareAtPackPrice: 550 }],
    dimensions: "Base 11 cm square · lid 10 cm square · 7 cm tall",
    inStock: true,
    isNew: true,
    addedAt: "2026-10-06",
  },
  {
    id: "bento-007",
    sku: "BENTO-BOX-007",
    slug: "6-inch-bento-cake-box",
    name: '6" Bento Cake Box',
    description:
      "The 6-inch bento cake box from our own range — a sturdy white bagasse clamshell sized for a single bento cake, with a tab closure and a flat lid that stacks for delivery.",
    images: [photo("2.jpeg")],
    alts: ["A 6-inch white bento cake box holding a heart-decorated cake, with more boxes stacked behind"],
    // No price appears anywhere in the supplied references for this item.
    // REVIEW: pricing needed from the client before this goes live.
    pricePending: true,
    dimensions: '6" (15.5 cm) square',
    inStock: true,
    isNew: true,
    addedAt: "2026-10-06",
  },
];

/** Local source for the Bento Boxes catalog; swap for an API call when the backend is ready. */
export async function getLocalBentoProducts(): Promise<readonly BentoProductRecord[]> {
  return bentoProducts;
}
