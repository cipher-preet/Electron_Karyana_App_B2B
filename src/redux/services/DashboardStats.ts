import { baseApi } from "./baseApi";

export const dashboardStatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStatsForDashboard: builder.query<any[], void>({
      query: () => "/dashboard/getOrderStatsForDashboard",
      keepUnusedDataFor: 300,
    }),

    getGraphsStatsForDashboard: builder.query<any[], void>({
      query: () => "/dashboard/getGraphsStatsForDashboard",
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetOrderStatsForDashboardQuery,
  useGetGraphsStatsForDashboardQuery,
} = dashboardStatApi;
