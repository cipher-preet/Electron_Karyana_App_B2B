import { baseApi } from "./baseApi";

export const CarosolsAndBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBannersAndCarosels: builder.query<any, void>({
      query: () => "/dashboard/getBannerAndCarsolsForDashboard",
      providesTags: ["bannersandcarosels"],
    }),

    addProductCaresolsAndbanners: builder.mutation<any, any>({
      query: (updateMedia) => ({
        url: "/dashboard/addProductCaresolsAndbanners",
        method: "POST",
        body: updateMedia,
      }),
      invalidatesTags: ["bannersandcarosels"],
    }),
  }),
});

export const {
  useGetBannersAndCaroselsQuery,
  useAddProductCaresolsAndbannersMutation,
} = CarosolsAndBannerApi;
