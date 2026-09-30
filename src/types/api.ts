/**
 * Backend API response contracts and data types.
 *
 * Sourced from the Sprinkle & Sparkle backend at:
 * https://sprinkles-sparkles-backend.vercel.app/api/public/*
 */

export type ApiPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type ApiSubcategory = {
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null | { url: string; alt?: string };
  category?: string | { name: string; slug: string };
};

export type ApiCategory = {
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null | { url: string; alt?: string };
  subcategories?: ApiSubcategory[];
};

export type ApiCollection = {
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null | { url: string; alt?: string };
};

export type ApiOccasion = {
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null | { url: string; alt?: string };
};

export type ApiBrand = {
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null | { url: string; alt?: string };
};

export type ApiProductVariant = {
  id?: string;
  _id?: string;
  name?: string;
  title?: string;
  sku?: string;
  price?: number;
  salePrice?: number;
  compareAtPrice?: number;
  stock?: number;
  inStock?: boolean;
  options?: Record<string, string>;
};

export type ApiProductImageObj = {
  url?: string;
  src?: string;
  alt?: string;
  isPrimary?: boolean;
};

export type ApiProductImage = string | ApiProductImageObj;

export type ApiProduct = {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  salePrice?: number | null;
  compareAtPrice?: number | null;
  images?: ApiProductImage[];
  image?: ApiProductImage | null;
  category?: string | { _id?: string; name: string; slug: string };
  subcategory?: string | { _id?: string; name: string; slug: string };
  collections?: (string | { _id?: string; name: string; slug: string })[];
  occasions?: (string | { _id?: string; name: string; slug: string })[];
  brand?: string | { _id?: string; name: string; slug: string };
  variants?: ApiProductVariant[];
  stock?: number;
  stockQuantity?: number;
  inStock?: boolean;
  weight?: string | number;
  dimensions?: string | { length?: number; width?: number; height?: number; unit?: string };
  status?: "published" | "draft" | "inactive" | string;
  isFeatured?: boolean;
  featured?: boolean;
  isNew?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiProductsListResponse = {
  data: {
    items: ApiProduct[];
    pagination: ApiPagination;
  };
};

export type ApiCategoriesListResponse = {
  data: ApiCategory[];
};

export type ApiCategoryDetailResponse = {
  data: ApiCategory;
};

export type ApiSubcategoriesListResponse = {
  data: ApiSubcategory[];
};

export type ApiCollectionsListResponse = {
  data: ApiCollection[];
};

export type ApiCollectionDetailResponse = {
  data: ApiCollection;
};

export type ApiOccasionsListResponse = {
  data: ApiOccasion[];
};

export type ApiOccasionDetailResponse = {
  data: ApiOccasion;
};

export type ApiBrandsListResponse = {
  data: ApiBrand[];
};

export type ApiProductDetailResponse = {
  data: ApiProduct;
};
