import { baseApi } from "./baseApi";

export const SetTrendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getproductsForTrends: builder.query<any, any>({
      query: ({ cursor, search }) =>
        `/dashboard/getProductsForTrendBuilding?cursor=${cursor || ""}&search=${search}`,
      keepUnusedDataFor: 300,
      providesTags: ["trend"],
    }),

    createTrend: builder.mutation<any, any>({
      query: (trendData) => ({
        url: "/dashboard/creteTrends",
        method: "POST",
        body: trendData,
      }),
      invalidatesTags: ["trend"],
    }),

    getTrendsForDashboard: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/getTrendsForDashboard",
        keepUnusedDataFor: 300,
        providesTags: ["trend"],
      }),
    }),

    deleteTrends: builder.mutation<any, any>({
      query: (deleteData) => ({
        url: "/dashboard/deleteTrends",
        method: "DELETE",
        body: deleteData,
      }),
      invalidatesTags: ["trend"],
    }),

    editTrends: builder.mutation<any, any>({
      query: (editData) => ({
        url: "/dashboard/editTrends",
        method: "PUT",
        body: editData,
      }),
      invalidatesTags: ["trend"],
    }),
  }),
});

export const {
  useGetproductsForTrendsQuery,
  useCreateTrendMutation,
  useGetTrendsForDashboardQuery,
  useDeleteTrendsMutation,
  useEditTrendsMutation,
} = SetTrendApi;
