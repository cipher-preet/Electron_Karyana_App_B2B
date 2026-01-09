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


    
    getAllProducts: builder.query<
            {
              items: any[];
              nextCursor: string | null;
            },
            { cursor?: string | null }
          >({
            query: ({ cursor = null }) => ({
              url: "/dashboard/getProductsBasicDetails",
              params: cursor ? { cursor } : {},
            }),

            serializeQueryArgs: ({ endpointName }) => endpointName,

            merge: (currentCache, newData) => {
              currentCache.items.push(...newData.items);
              currentCache.nextCursor = newData.nextCursor;
            },

            forceRefetch({ currentArg, previousArg }) {
              return currentArg?.cursor !== previousArg?.cursor;
            },

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

     createProduct: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/dashboard/addNewProduct",
          method: "POST",
          body: formData,
        }),
        invalidatesTags: ["products"],
      }),


      //this api is to get unit  in 

        getUnits: builder.query<any[], void>({
          query: () => "/dashboard/getUnit",
          keepUnusedDataFor: 300,
          providesTags: ["products"],
        }),

        getBrands: builder.query<any[], void>({
          query: () => "/dashboard/getBrandsForForms",
          keepUnusedDataFor: 300,
          providesTags: ["products"],
        }),

         getParentCategoriesForForms: builder.query<any[], void>({
          query: () => "/dashboard/getParentCategoriesForForms",
          keepUnusedDataFor: 300,
          providesTags: ["products"],
        }),

        getChildCategoriesForForms: builder.query<any[], string>({
              query: (parentCategoryId) =>
                `/dashboard/getchildCategoriesForForms?ParentCategoryId=${parentCategoryId}`,
              keepUnusedDataFor: 300,
              providesTags: ["products"],
            }),




     


  }),
});

export const { useGetProductsQuery, useGetChildCategoriesQuery,useCreateChildCategoryMutation,useCreateParentCategoryMutation,
  useEditChildCategoryMutation,useEditParentCategoryMutation,useGetAllProductsQuery,useCreateProductMutation,useGetBrandsQuery,useGetChildCategoriesForFormsQuery,
  useGetParentCategoriesForFormsQuery,useGetUnitsQuery
 } = productsApi;
