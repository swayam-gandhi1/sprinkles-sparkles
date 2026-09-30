import type { ApiProduct, ApiProductImage, ApiProductVariant } from "@/types/api";
import type { Product, ProductImage, ProductVariant } from "@/types/product";

const DEFAULT_FALLBACK_IMAGE = "/images/products/placeholder/baking-essentials-hamper.webp";

/**
 * Extracts a normalized image URL and alt text from diverse API image representations.
 */
export function normalizeProductImage(
  img: ApiProductImage | null | undefined,
  fallbackAlt: string,
): ProductImage | null {
  if (!img) return null;

  if (typeof img === "string") {
    const trimmed = img.trim();
    if (!trimmed) return null;
    return {
      src: trimmed,
      alt: fallbackAlt,
    };
  }

  const src = (img.url || img.src || "").trim();
  if (!src) return null;

  return {
    src,
    alt: (img.alt || fallbackAlt).trim(),
  };
}

/**
 * Normalizes all images attached to a product, ensuring a valid primary image exists.
 */
export function normalizeProductImages(
  rawImages: ApiProductImage[] | undefined,
  singleImage: ApiProductImage | null | undefined,
  fallbackAlt: string,
): { primary: ProductImage; gallery: readonly ProductImage[] } {
  const list: ProductImage[] = [];

  // Check single image first if marked primary
  const single = normalizeProductImage(singleImage, fallbackAlt);

  if (Array.isArray(rawImages)) {
    for (const item of rawImages) {
      const norm = normalizeProductImage(item, fallbackAlt);
      if (norm && !list.some((existing) => existing.src === norm.src)) {
        list.push(norm);
      }
    }
  }

  if (single && !list.some((existing) => existing.src === single.src)) {
    list.unshift(single);
  }

  const primary: ProductImage = list[0] ?? {
    src: DEFAULT_FALLBACK_IMAGE,
    alt: fallbackAlt,
    placeholder: true,
  };

  return { primary, gallery: list };
}

/**
 * Normalizes product variants.
 */
export function normalizeVariants(
  variants: ApiProductVariant[] | undefined,
  parentPrice: number,
): readonly ProductVariant[] {
  if (!Array.isArray(variants) || !variants.length) return [];

  return variants.map((v, index) => {
    const price = typeof v.price === "number" ? v.price : parentPrice;
    const salePrice = typeof v.salePrice === "number" ? v.salePrice : undefined;
    const inStock =
      typeof v.inStock === "boolean"
        ? v.inStock
        : typeof v.stock === "number"
          ? v.stock > 0
          : true;

    return {
      id: v.id || v._id || v.sku || `variant-${index}`,
      name: v.name || v.title || `Option ${index + 1}`,
      sku: v.sku,
      price,
      salePrice,
      stock: v.stock,
      inStock,
      options: v.options,
    };
  });
}

/**
 * Normalizes a raw backend ApiProduct into the frontend Product model.
 * Handles differences in MongoDB _id, pricing representations, images,
 * and nested populated objects vs raw strings.
 */
export function normalizeProduct(raw: ApiProduct): Product {
  const name = raw.name || "Untitled Product";
  const slug = raw.slug || (raw._id ? String(raw._id) : "product");
  const id = raw.id || raw._id || slug;

  // Category normalization
  let categorySlug = "all";
  let categoryName: string | undefined;
  if (raw.category) {
    if (typeof raw.category === "object") {
      categorySlug = raw.category.slug || "all";
      categoryName = raw.category.name;
    } else {
      categorySlug = String(raw.category);
    }
  }

  // Subcategory normalization
  let subcategorySlug: string | undefined;
  let subcategoryName: string | undefined;
  if (raw.subcategory) {
    if (typeof raw.subcategory === "object") {
      subcategorySlug = raw.subcategory.slug;
      subcategoryName = raw.subcategory.name;
    } else {
      subcategorySlug = String(raw.subcategory);
    }
  }

  // Collections normalization
  const collections: string[] = [];
  if (Array.isArray(raw.collections)) {
    for (const c of raw.collections) {
      if (typeof c === "object" && c?.slug) {
        collections.push(c.slug);
      } else if (typeof c === "string" && c) {
        collections.push(c);
      }
    }
  }

  // Occasions normalization
  const occasions: string[] = [];
  if (Array.isArray(raw.occasions)) {
    for (const o of raw.occasions) {
      if (typeof o === "object" && o?.slug) {
        occasions.push(o.slug);
      } else if (typeof o === "string" && o) {
        occasions.push(o);
      }
    }
  }

  // Brand normalization
  let brand: string | undefined;
  if (raw.brand) {
    if (typeof raw.brand === "object") {
      brand = raw.brand.name;
    } else {
      brand = String(raw.brand);
    }
  }

  // Price & Sale Price calculation
  const rawPrice = Number(raw.price) || 0;
  let effectivePrice = rawPrice;
  let compareAtPrice: number | undefined = raw.compareAtPrice ? Number(raw.compareAtPrice) : undefined;
  let salePrice: number | undefined = raw.salePrice ? Number(raw.salePrice) : undefined;

  if (salePrice && salePrice > 0 && salePrice < rawPrice) {
    // If salePrice is lower, current price is salePrice and original is compareAtPrice
    compareAtPrice = rawPrice;
    effectivePrice = salePrice;
  } else if (compareAtPrice && compareAtPrice > rawPrice) {
    // Standard compareAtPrice pattern
    effectivePrice = rawPrice;
  }

  // Stock status
  const stockCount = typeof raw.stock === "number" ? raw.stock : typeof raw.stockQuantity === "number" ? raw.stockQuantity : undefined;
  const inStock =
    typeof raw.inStock === "boolean"
      ? raw.inStock
      : typeof stockCount === "number"
        ? stockCount > 0
        : true;

  // Dimensions
  let dimensions: string | undefined;
  if (raw.dimensions) {
    if (typeof raw.dimensions === "string") {
      dimensions = raw.dimensions;
    } else if (typeof raw.dimensions === "object") {
      const d = raw.dimensions;
      if (d.length || d.width || d.height) {
        dimensions = `${d.length ?? 0} × ${d.width ?? 0} × ${d.height ?? 0} ${d.unit || "cm"}`.trim();
      }
    }
  }

  // Images
  const { primary, gallery } = normalizeProductImages(raw.images, raw.image, name);

  return {
    id,
    slug,
    name,
    category: categorySlug,
    categoryName,
    subcategory: subcategorySlug,
    subcategoryName,
    brand,
    collections,
    occasions: occasions.length ? occasions : undefined,
    description: (raw.description || raw.shortDescription || "").trim(),
    shortDescription: raw.shortDescription?.trim(),
    price: effectivePrice,
    compareAtPrice,
    salePrice,
    inStock,
    stockCount,
    isNew: Boolean(raw.isNew),
    isFeatured: Boolean(raw.isFeatured || raw.featured),
    addedAt: raw.createdAt || raw.updatedAt || new Date().toISOString(),
    image: primary,
    images: gallery,
    variants: normalizeVariants(raw.variants, effectivePrice),
    weight: raw.weight ? String(raw.weight) : undefined,
    dimensions,
  };
}
