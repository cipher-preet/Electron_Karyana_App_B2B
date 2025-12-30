// import { Product } from "@/shared/types/types";
import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => "/dashboard/getParentCategories",
      keepUnusedDataFor: 300,
      providesTags: ["parentcategories"],
    }),

    getChildCategories: builder.query<any[], string>({
      query: (parentId) =>
        `/dashboard/getchildcategorybyparentId?ParentCategoryId=${parentId}`,
      keepUnusedDataFor: 300,
      providesTags: ["childcategories"],
    }),

    // Create Parent Category (with image)
    createParentCategory: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/dashboard/addParentCategory",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["parentcategories"],
    }),

    // Create Child Category
    createChildCategory: builder.mutation<any,FormData>({
      query: (formData) => ({
        url: "/dashboard/addChildCategory",
        method: "POST",
        body:formData,
      }),
      invalidatesTags: ["childcategories"],
    }),

    getAllProducts: builder.query<any[], void>({
      query: () => "/dashboard/",
      keepUnusedDataFor: 300,
      providesTags: ["products"],
    }),

    editChildCategory: builder.mutation<any,FormData>({
      query: (formData) => ({
        url: "/dashboard/editChildCategory",
        method: "PUT",
        body:formData,
      }),
    }),
      

    editParentCategory: builder.mutation<any,FormData>({
      query: (formData) => ({
        url: "/dashboard/editParentCategory",
        method: "PUT",
        body:formData,
      }),
    }),
     


  }),
});

export const { useGetProductsQuery, useGetChildCategoriesQuery,useCreateChildCategoryMutation,useCreateParentCategoryMutation,
  useEditChildCategoryMutation,useEditParentCategoryMutation
 } = productsApi;
