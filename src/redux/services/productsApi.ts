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
    createChildCategory: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/dashboard/addChildCategory",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["childcategories"],
    }),

<<<<<<< HEAD


 getAllProducts: builder.query<
  {
    products: any[];
    nextCursor: string | null;
  },
  { cursor?: string | null }
>({
  query: ({ cursor = null }) => ({
    url: "/dashboard/getProductsBasicDetails",
    params: cursor ? { cursor } : {},
  }),

  transformResponse: (response: any) => ({
    products: response.data.products,
    nextCursor: response.data.nextCursor,
  }),

  serializeQueryArgs: ({ endpointName }) => endpointName,

  merge: (currentCache, newData, { arg }) => {
 
    if (arg.cursor === null) {
      return {
        products: newData.products,
        nextCursor: newData.nextCursor,
      };
    }
    const existingIds = new Set(currentCache.products.map((p: any) => p._id));
    const filteredNew = newData.products.filter((p: any) => !existingIds.has(p._id));

    currentCache.products.push(...filteredNew);
    currentCache.nextCursor = newData.nextCursor;
  },

  forceRefetch({ currentArg, previousArg }) {
    return currentArg?.cursor !== previousArg?.cursor;
  },

  keepUnusedDataFor: 300,

  providesTags: ["paginationProducts"],
}),


=======
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
>>>>>>> 5f8ea2fe699b3294e67242726436d234566f2add

    editChildCategory: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/dashboard/editChildCategory",
        method: "PUT",
        body: formData,
      }),
<<<<<<< HEAD
      invalidatesTags: ["childcategories"],
      }),
      
=======
    }),
>>>>>>> 5f8ea2fe699b3294e67242726436d234566f2add

    editParentCategory: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/dashboard/editParentCategory",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["parentcategories"],
    }),

<<<<<<< HEAD
     createProduct: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/dashboard/addNewProduct",
          method: "POST",
          body: formData,
        }),
        invalidatesTags: ["paginationProducts"],
=======
    createProduct: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/dashboard/addNewProduct",
        method: "POST",
        body: formData,
>>>>>>> 5f8ea2fe699b3294e67242726436d234566f2add
      }),
      invalidatesTags: ["products"],
    }),

    //this api is to get unit  in

    getUnits: builder.query<any[], void>({
      query: () => "/dashboard/getUnit",
      keepUnusedDataFor: 300,
      providesTags: ["products"],
    }),

<<<<<<< HEAD
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


        editProductCategory: builder.mutation<any,FormData>({
              query: (formData) => ({
                url: "/dashboard/editProduct",
                method: "PUT",
                body:formData,
              }),
              invalidatesTags: ["paginationProducts"],
            }),




     
=======
    getBrands: builder.query<any[], void>({
      query: () => "/dashboard/getBrandsForForms",
      keepUnusedDataFor: 300,
      providesTags: ["products"],
    }),
>>>>>>> 5f8ea2fe699b3294e67242726436d234566f2add

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

<<<<<<< HEAD
export const { useGetProductsQuery, useGetChildCategoriesQuery,useCreateChildCategoryMutation,useCreateParentCategoryMutation,
  useEditChildCategoryMutation,useEditParentCategoryMutation,useGetAllProductsQuery,useCreateProductMutation,useGetBrandsQuery,useGetChildCategoriesForFormsQuery,
  useGetParentCategoriesForFormsQuery,useGetUnitsQuery,useEditProductCategoryMutation
 } = productsApi;
=======
export const {
  useGetProductsQuery,
  useGetChildCategoriesQuery,
  useCreateChildCategoryMutation,
  useCreateParentCategoryMutation,
  useEditChildCategoryMutation,
  useEditParentCategoryMutation,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useGetBrandsQuery,
  useGetChildCategoriesForFormsQuery,
  useGetParentCategoriesForFormsQuery,
  useGetUnitsQuery,
} = productsApi;
>>>>>>> 5f8ea2fe699b3294e67242726436d234566f2add
