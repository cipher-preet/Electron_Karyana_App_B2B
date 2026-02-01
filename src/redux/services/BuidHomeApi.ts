import { baseApi } from "./baseApi";

type Category = {
  _id: string;
  name: string;
};

type GetAllCategoriesResponse = {
  data: Category[];
};

type getproductsBasic = {
  _id: string;
  name: string;
  images: [string];
  mrp: number;
};

export const BuildHomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<GetAllCategoriesResponse, void>({
      query: () => "/dashboard/getAllChildCategories",
      keepUnusedDataFor: 300,
      providesTags: ["buildhomecategory"],
    }),

    getProductBasicInfoByChildCategoryId: builder.query<getproductsBasic, void>(
      {
        query: (childCategoryId) =>
          `/dashboard/getProductBasicInfoByChildCategoryId?childCategoryId=${childCategoryId}`,
        providesTags: ["buildhomecategory"],
      },
    ),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetProductBasicInfoByChildCategoryIdQuery,
} = BuildHomeApi;
