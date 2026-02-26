import { baseApi } from "./baseApi";

export interface ContactQuery {
  _id: string;
  name: string;
  address: string;
  phone: number;
  query: string;
  message: string;
  isAction: boolean;
  createdAt: string;
}

export interface ContactResponse {
  success: boolean;
  data: ContactQuery[];
}

export const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContactinfo: builder.query<any[], void>({
      query: () => "/dashboard/getcontactuspagedetailsfromwebsite",
      providesTags: ["contactquerydetail"],
    }),

    markasreadincontact: builder.mutation<
      { success: boolean },
      { queryId: string }
    >({
      query: (body) => ({
        url: `/dashboard/markasreadincontactus`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["contactquerydetail"],
    }),
  }),
});

export const { useGetContactinfoQuery, useMarkasreadincontactMutation } =
  contactUsApi;
