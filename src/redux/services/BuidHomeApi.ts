import { baseApi } from "./baseApi";

type Category = {
  _id: string;
  name: string;
};

type GetAllCategoriesResponse = {
  data: Category[];
};
type GetProductsBasicResponse = {
  data: getproductsBasic[];
};
type getproductsBasic = {
  _id: string;
  name: string;
  mrp: number;
  images?: string;
};

export const BuildHomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<GetAllCategoriesResponse, void>({
      query: () => "/dashboard/getAllChildCategories",
      keepUnusedDataFor: 300,
      providesTags: ["buildhomecategory"],
    }),

    getProductBasicInfoByChildCategoryId: builder.query<
      GetProductsBasicResponse,
      String
    >({
      query: (childCategoryId) =>
        `/dashboard/getProductBasicInfoByChildCategoryId?childCategoryId=${childCategoryId}`,
      providesTags: ["buildhomecategory"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetProductBasicInfoByChildCategoryIdQuery,
} = BuildHomeApi;
