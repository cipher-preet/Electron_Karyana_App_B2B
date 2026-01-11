import { baseApi } from "./baseApi";

interface Unit {
  _id: string;
  name: string;
  shortName: string;
  baseUnit: string;
  multiplier: number;
  isActive: boolean;
}

interface UnitApiResponse {
  success: boolean;
  message: string;
  data: Unit[];
}

interface Brand {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
}

interface BrandResponse {
  success: boolean;
  message: string;
  data: Brand[];
}

const UnitBrandApiForDashboard = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnitsForDashboard: builder.query<UnitApiResponse, void>({
      query: () => "/dashboard/getUnitFordashboard",
      keepUnusedDataFor: 300,
      providesTags: ["unit"],
    }),

    getBrandsForDashboard: builder.query<BrandResponse, void>({
      query: () => "/dashboard/getBrandFordashboard",
      keepUnusedDataFor: 300,
      providesTags: ["brand"],
    }),

    createUnit: builder.mutation<any, any>({
      query: (createUnit) => ({
        url: "/dashboard/addUnit",
        method: "POST",
        body: createUnit,
      }),
      invalidatesTags: ["unit"],
    }),

    createBrand: builder.mutation<any, any>({
      query: (createBrand) => ({
        url: "/dashboard/addBrand",
        method: "POST",
        body: createBrand,
      }),
      invalidatesTags: ["brand"],
    }),

    EditBrand: builder.mutation<any, any>({
      query: (EditBrand) => ({
        url: "/dashboard/editBrand",
        method: "PUT",
        body: EditBrand,
      }),
      invalidatesTags: ["brand"],
    }),

  }),
});

export const {
  useGetUnitsForDashboardQuery,
  useCreateUnitMutation,
  useCreateBrandMutation,
  useEditBrandMutation,
  useGetBrandsForDashboardQuery,
} = UnitBrandApiForDashboard;
