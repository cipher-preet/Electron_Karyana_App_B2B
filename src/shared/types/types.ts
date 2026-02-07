export type ProductStatus = "Active" | "Inactive";

export interface Product {
  _id: string;
  name: string;
  sku: string;
  categoryId: string;
  subcategoryId: string;
  brandId: string;
  mrp: number | string;
  marketPrice?: number | string;
  sellingPrice: number | string;
  unit: string;
  quantityPerUnit: number | string;
  offPercentage: number | string;
  tag?: string;
  images: string[];
  existingImages?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type CategoryStatus = "Active" | "Inactive";

export interface Category {
  _id: string;
  name: string;
  parentCategory?: string;
  // status: "Active" | "Inactive";
  isActive: boolean;
  images?: string;
}

export interface CategoryApiResponse {
  success: boolean;
  data: {
    categories: Category[];
    nextCursor: string | null;
    hasNextPage: boolean;
  };
}



export interface BannerCarouselConfig {
  _id: string;
  banners: string[];
  carosels: string[];
}

export interface ApiResponse {
  success: boolean;
  data: BannerCarouselConfig[];
}
