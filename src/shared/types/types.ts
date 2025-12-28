export type ProductStatus = "Active" | "Inactive";

export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  barcode: string;
  price: number;
  sellingPrice: number;
  gst: number;
  unit: string;
  minOrderQty: number;
  stock: number;
  reorderLevel: number;
  status: ProductStatus;
  description: string;
  image?: string;
}


export type CategoryStatus = "Active" | "Inactive";

export interface Category {
  _id: string;
  name: string;
  parentCategory?: string;
  // status: "Active" | "Inactive";
  isActive : boolean;
  images?: string; 
}

export interface CategoryApiResponse {
  success : boolean;
  data : {
    categories : Category[];
    nextCursor : string | null;
    hasNextPage : boolean;
  }
}