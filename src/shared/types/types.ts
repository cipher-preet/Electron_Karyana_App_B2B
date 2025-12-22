export type ProductStatus = "Active" | "Inactive";

export interface Product {
  id: string;
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
  id: string;
  name: string;
  parentCategory?: string;
  status: "Active" | "Inactive";
  image?: string; 
}