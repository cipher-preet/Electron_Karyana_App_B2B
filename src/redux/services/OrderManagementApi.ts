import { baseApi } from "./baseApi";

export const OrderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersForDashboard: builder.query<any, any>({
      query: () => "/dashboard/getUpcomingOrderDetailsforDashboard",
      keepUnusedDataFor: 300,
      providesTags: ["orders"],
    }),

    updateOrderStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: "/dashboard/updateOrderStatusInOrderPage",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

//-----------------------------------------------------------------------

export const { useGetOrdersForDashboardQuery, useUpdateOrderStatusMutation } =
  OrderManagementApi;
