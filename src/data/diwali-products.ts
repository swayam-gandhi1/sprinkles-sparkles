/*
 * DIWALI COLLECTION — temporary frontend-only catalog.
 *
 * Every product here is built from the client's photos in `public/Diwali Products/`.
 * The records deliberately mirror the future backend Product response
 * ({ id, slug, name, description, images }) so the API can replace this file
 * without UI changes — only src/lib/api/products.ts reads it.
 *
 * - No prices, stock levels, ratings or specifications: none are confirmed yet,
 *   and the UI hides the price when it is absent.
 * - Several files in the folder are copies of the same photo (byte-identical, or
 *   the same shot re-saved under a second name); each photo is listed once.
 * - Colour variants of a box are separate products; different shots of the same
 *   item share one product's `images` gallery.
 */

export type DiwaliProductRecord = {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Public URLs; the first image is the primary (card) photo. */
  images: readonly string[];
};

/** URL for a file in `public/Diwali Products/` (the folder name contains a space). */
const photo = (file: string) => encodeURI(`/Diwali Products/${file}`);

export const diwaliProducts: readonly DiwaliProductRecord[] = [
  /* ─────────────────────── Candle gift boxes ─────────────────────── */
  {
    id: "diwali-001",
    slug: "laddoo-modak-candle-boxes",
    name: "Laddoo & Modak Candle Boxes",
    description:
      "Laddoo and modak shaped candles nestled in pastel pink, blue and sage gift boxes — a sweet festive keepsake.",
    images: [photo("WhatsApp-Image-2026-09-18-at-20.43.21.jpeg")],
  },
  {
    id: "diwali-002",
    slug: "silver-leaf-laddoo-candle-box",
    name: "Silver Leaf Laddoo Candle Box",
    description:
      "Orange laddoo-shaped candles topped with silver leaf, presented in a pastel blue window gift box. Shown in boxes of four, six and nine.",
    images: [
      photo("WhatsApp-Image-2026-09-18-at-20.43.23.jpeg"),
      photo("WhatsApp-Image-2026-09-18-at-20.43.22-2.jpeg"),
      photo("WhatsApp-Image-2026-09-18-at-20.43.22-1.jpeg"),
    ],
  },
  {
    id: "diwali-003",
    slug: "gold-leaf-laddoo-candle-box",
    name: "Gold Leaf Laddoo Candle Box",
    description:
      "Laddoo-shaped candles finished with gold leaf, each in its own paper cup inside a pastel window gift box.",
    images: [
      photo("WhatsApp-Image-2026-09-18-at-20.43.25-3.jpeg"),
      photo("WhatsApp-Image-2026-09-18-at-20.43.26.jpeg"),
    ],
  },
  {
    id: "diwali-004",
    slug: "single-laddoo-candle-box",
    name: "Single Laddoo Candle Box",
    description:
      "A single laddoo-shaped candle with silver leaf in a white window box — a simple festive favour.",
    images: [photo("WhatsApp-Image-2026-09-18-at-20.43.23-1.jpeg")],
  },
  {
    id: "diwali-005",
    slug: "flower-laddoo-candle-gift-box",
    name: "Flower & Laddoo Candle Gift Box",
    description:
      "Gold-edged flower candles with yellow roses beside golden laddoo candles, arranged in a mint compartment gift box.",
    images: [photo("WhatsApp-Image-2026-09-18-at-20.43.21-1.jpeg")],
  },
  {
    id: "diwali-006",
    slug: "sunflower-candle-gift-box",
    name: "Sunflower Candle Gift Box",
    description:
      "Sunflower candles paired with an assortment of mini sweet-shaped candles in a pink compartment gift box.",
    images: [photo("WhatsApp-Image-2026-09-18-at-20.43.24.jpeg")],
  },
  {
    id: "diwali-007",
    slug: "daisy-laddoo-candle-hamper",
    name: "Daisy & Laddoo Candle Hamper",
    description:
      "A daisy-decorated candle tray surrounded by laddoo candles, presented in a pink window box with a ribbon band.",
    images: [photo("WhatsApp-Image-2026-09-18-at-20.43.23-3.jpeg")],
  },
  {
    id: "diwali-008",
    slug: "festive-sweets-candle-box",
    name: "Festive Sweets Candle Box",
    description:
      "Candles shaped like traditional Indian sweets, including laddoos, arranged in a scalloped white tray for Diwali gifting.",
    images: [photo("WhatsApp-Image-2026-09-18-at-20.43.21-2.jpeg")],
  },
  {
    id: "diwali-009",
    slug: "rose-candle-treats-box",
    name: "Rose Candle & Treats Box",
    description:
      "Colourful rose candles alongside festive snacks and treats in a white compartment gift box.",
    images: [photo("WhatsApp-Image-2026-09-18-at-20.43.26-2.jpeg")],
  },
  {
    id: "diwali-010",
    slug: "bubble-candle-gift-box",
    name: "Bubble Candle Gift Box",
    description:
      "A row of bubble candles in red, pink and green, presented in a long purple window box.",
    images: [photo("WhatsApp-Image-2026-09-18-at-20.43.25-2.jpeg")],
  },
  {
    id: "diwali-011",
    slug: "purple-tealight-candles",
    name: "Purple Tealight Candles",
    description:
      "Purple tealight candles in a white window box — easy colour for diyas, thalis and Diwali décor.",
    images: [photo("WhatsApp-Image-2026-09-18-at-20.43.31-2.jpeg")],
  },

  /* ───────────────────────── Treat boxes ───────────────────────── */
  {
    id: "diwali-012",
    slug: "nine-compartment-treat-box",
    name: "Nine-Compartment Treat Box",
    description:
      "A white compartment box filled with decorated cookies, brownies and chocolates — a festive assortment in one gift.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.21.58-2.jpeg")],
  },
  {
    id: "diwali-013",
    slug: "tea-cake-trio-box",
    name: "Tea Cake Trio Box",
    description: "Three tea cakes with nut and chocolate-chip toppings in a white three-compartment box.",
    images: [photo("e738f232-00a6-43e7-9329-8e3b34d09e5a.jpeg")],
  },
  {
    id: "diwali-014",
    slug: "chocolate-bar-window-box",
    name: "Chocolate Bar Window Box",
    description:
      "Slim white boxes with a clear window to show off handmade chocolate bars and festive slabs.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.06-3.jpeg")],
  },

  /* ─────────────────────── Packaging boxes ─────────────────────── */
  {
    id: "diwali-015",
    slug: "pink-sliding-window-box",
    name: "Pink Sliding Window Box",
    description:
      "A pink sleeve box with a clear top window and slide-out tray, ideal for presenting sweets and treats.",
    images: [photo("39c120fa-b638-48bc-97ee-016d64d6ba96.png")],
  },
  {
    id: "diwali-016",
    slug: "scallop-clear-lid-box-red",
    name: "Scallop Clear Lid Box — Red",
    description: "A red scallop-edged box with a clear lid that lets festive sweets and treats shine through.",
    images: [photo("5da7e162-bf9f-41e8-9c3b-7bd08f75632d-1.png")],
  },
  {
    id: "diwali-017",
    slug: "scallop-clear-lid-box-pink",
    name: "Scallop Clear Lid Box — Pink",
    description: "A blush pink scallop-edged box with a clear lid for elegant Diwali gifting.",
    images: [photo("de5f4de4-78d5-4a36-93c1-a56ff39fb1ac-1.png")],
  },
  {
    id: "diwali-018",
    slug: "scallop-clear-lid-box-blue",
    name: "Scallop Clear Lid Box — Blue",
    description: "A soft blue scallop-edged box with a clear lid for sweets, candles and small gifts.",
    images: [photo("b773a235-9e22-489e-8ecc-1b845be7084d.png")],
  },
  {
    id: "diwali-019",
    slug: "scallop-clear-lid-box-mint",
    name: "Scallop Clear Lid Box — Mint",
    description: "A pastel mint scallop-edged box with a clear lid — a fresh take on festive packaging.",
    images: [photo("98eec84d-4493-456e-befe-fcde4d3ea599.png")],
  },
  {
    id: "diwali-020",
    slug: "scallop-clear-lid-tray-white",
    name: "Scallop Clear Lid Tray — White",
    description: "A shallow white scallop-edged tray with a clear lid for arranging sweets and cookies.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.13-4.jpeg")],
  },
  {
    id: "diwali-021",
    slug: "window-gift-box-pink",
    name: "Window Gift Box — Pink",
    description: "A pink gift box with a clear window on the lid for sweets, candles and small treats.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.07-1.jpeg")],
  },
  {
    id: "diwali-022",
    slug: "window-gift-box-blue",
    name: "Window Gift Box — Blue",
    description: "A baby blue gift box with a clear window on the lid for sweets, candles and small treats.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.07-2.jpeg")],
  },
  {
    id: "diwali-023",
    slug: "window-gift-box-mint",
    name: "Window Gift Box — Mint",
    description: "A mint green gift box with a clear window on the lid for sweets, chocolates and treats.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.11-1.jpeg")],
  },
  {
    id: "diwali-024",
    slug: "mini-window-box-blue",
    name: "Mini Window Box — Blue",
    description: "A compact blue box with a clear window wrapping the front and top, ideal for single treats.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.12-2.jpeg")],
  },
  {
    id: "diwali-025",
    slug: "mini-window-box-white",
    name: "Mini Window Box — White",
    description: "A compact white box with a clear window wrapping the front and top, ideal for single treats.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.12-3.jpeg")],
  },
  {
    id: "diwali-026",
    slug: "white-cake-box-with-window",
    name: "White Cake Box with Window",
    description: "A white cake box with a wide clear window across the front and top to show off your cake.",
    images: [
      photo("WhatsApp-Image-2026-09-17-at-20.42.49-2.jpeg"),
      photo("WhatsApp-Image-2026-09-17-at-20.42.49.jpeg"),
    ],
  },
  {
    id: "diwali-027",
    slug: "tall-cake-box-with-window",
    name: "Tall Cake Box with Window",
    description: "A tall white cake box with a clear front-and-top window, with room for toppers on taller cakes.",
    images: [photo("WhatsApp-Image-2026-09-17-at-20.42.50-1.jpeg")],
  },
  {
    id: "diwali-028",
    slug: "handle-box-with-insert-white",
    name: "Handle Box with Insert — White",
    description: "A white carry box with a fold-up handle and a four-cavity insert that holds treats in place.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.14-2.jpeg")],
  },
  {
    id: "diwali-029",
    slug: "handle-box-with-insert-pink",
    name: "Handle Box with Insert — Pink",
    description: "A pink carry box with a fold-up handle and a four-cavity insert that holds treats in place.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.15-3.jpeg")],
  },
  {
    id: "diwali-030",
    slug: "handle-box-with-insert-blue",
    name: "Handle Box with Insert — Blue",
    description: "A baby blue carry box with a fold-up handle and a four-cavity insert that holds treats in place.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.16-1.jpeg")],
  },
  {
    id: "diwali-031",
    slug: "handle-box-with-insert-mint",
    name: "Handle Box with Insert — Mint",
    description: "A mint green carry box with a fold-up handle and a four-cavity insert that holds treats in place.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.15-1.jpeg")],
  },
  {
    id: "diwali-032",
    slug: "white-handle-gift-box",
    name: "White Handle Gift Box",
    description: "A white carry gift box with a cut-out handle, finished here with a navy satin bow.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.06.jpeg")],
  },
  {
    id: "diwali-033",
    slug: "window-gable-gift-box",
    name: "Window Gable Gift Box",
    description: "A white gable box with a carry handle and clear side window, shown holding two jars tied with a ribbon.",
    images: [photo("WhatsApp-Image-2026-09-20-at-19.22.01.jpeg")],
  },
];

/** Local source for the Diwali catalog; swap for an API call when the backend is ready. */
export async function getLocalDiwaliProducts(): Promise<readonly DiwaliProductRecord[]> {
  return diwaliProducts;
}
