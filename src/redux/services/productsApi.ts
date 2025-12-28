// import { Product } from "@/shared/types/types";
import { baseApi } from "./baseApi";



export const productsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getProducts : builder.query<any[],void>({
            query : () => '/dashboard/getParentCategories',
            keepUnusedDataFor : 300,
            providesTags : ['parentcategories']
        }),
    })
})

export const {useGetProductsQuery} = productsApi;