export type ProductStatus = "Active" | "Inactive";

// export interface Product {
//   _id: string;
//   name: string;
//   brand: string;
//   category: string;
//   subCategory: string;
//   barcode: string;
//   price: number;
//   sellingPrice: number;
//   gst: number;
//   unit: string;
//   minOrderQty: number;
//   stock: number;
//   reorderLevel: number;
//   status: ProductStatus;
//   description: string;
//   image?: string;
// }
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