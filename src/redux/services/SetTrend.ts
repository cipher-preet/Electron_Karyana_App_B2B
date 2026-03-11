import { baseApi } from "./baseApi";

export const SetTrendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getproductsForTrends: builder.query<any, any>({
      query: ({ cursor, search }) =>
        `/dashboard/getProductsForTrendBuilding?cursor=${cursor || ""}&search=${search}`,
      keepUnusedDataFor: 300,
    }),

    createTrend: builder.mutation<any, any>({
      query: (trendData) => ({
        url: "/dashboard/creteTrends",
        method: "POST",
        body: trendData,
      }),
    }),
  }),
});

export const { useGetproductsForTrendsQuery, useCreateTrendMutation } =
  SetTrendApi;
