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

interface Tags {
  _id: string;
  name: string;
  isActive: boolean;
}
interface TagResponse {
  success: boolean;
  data: Tags[];
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

    //------------------tags setup --------------------------
    getallTagsForDashboard: builder.query<TagResponse, void>({
      query: () => "/dashboard/getAllTags",
      keepUnusedDataFor: 300,
      providesTags: ["tag"],
    }),

    createTag: builder.mutation<any, any>({
      query: (createTag) => ({
        url: "/dashboard/addTags",
        method: "POST",
        body: createTag,
      }),
      invalidatesTags: ["tag"],
    }),

    EditTags: builder.mutation<any, any>({
      query: (EditTags) => ({
        url: "/dashboard/editTags",
        method: "PUT",
        body: EditTags,
      }),
      invalidatesTags: ["tag"],
    }),

    //-------------------------------------------------------

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

    EditUnit: builder.mutation<any, any>({
      query: (EditUnit) => ({
        url: "/dashboard/editUnit",
        method: "PUT",
        body: EditUnit,
      }),
      invalidatesTags: ["unit"],
    }),
  }),
});

export const {
  useGetUnitsForDashboardQuery,
  useCreateUnitMutation,
  useCreateBrandMutation,
  useEditBrandMutation,
  useEditUnitMutation,
  useGetBrandsForDashboardQuery,
  useGetallTagsForDashboardQuery,
  useCreateTagMutation,
  useEditTagsMutation,
} = UnitBrandApiForDashboard;
