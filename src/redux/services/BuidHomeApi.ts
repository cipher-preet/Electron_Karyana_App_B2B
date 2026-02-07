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

type GetUserProfileCardInDashboardResponse = {
  success: boolean;
  data: {
    users: UserProfileCard[];
    nextCursor?: string;
    hasNextPage: boolean;
  };
};
type UserProfileCard = {
  _id: string;
  shopName: string;
  ownerName: string;
  address: string;
  image?: string;
};

//-------------------------------------------------------------------------------

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

    getUserOProfileCardInDashboard: builder.query<
      GetUserProfileCardInDashboardResponse,
      { cursor?: string }
    >({
      query: ({ cursor }) => ({
        url: "/dashboard/getUserProfileForCardsInDashboard",
        params: cursor ? { cursor } : {},
      }),

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newData) => {
        if (!currentCache?.data?.users) {
          return newData;
        }

        const existingIds = new Set(
          currentCache.data.users.map((u: any) => u._id),
        );

        const freshUsers = newData.data.users.filter(
          (u: any) => !existingIds.has(u._id),
        );

        currentCache.data.users.push(...freshUsers);
        currentCache.data.nextCursor = newData.data.nextCursor;
        currentCache.data.hasNextPage = newData.data.hasNextPage;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor;
      },
    }),

    getUserAdditionalProfileDetails: builder.query<any, string>({
      query: (userId) => ({
        url: `/dashboard/getUserAdditionalProfileDetail?_id=${userId}`,
      }),
      keepUnusedDataFor: 300,
    }),

    // ----------- here is the mutation starts -------------
    createHomePage: builder.mutation<any, any>({
      query: (homePageData) => ({
        url: "/dashboard/buildHomePage",
        method: "POST",
        body: homePageData,
      }),
      invalidatesTags: ["buildhomecategory"],
    }),

    getHomePageDetailsForDashboard: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/getHomePageDetailsForDashboard",
        method: "GET",
      }),
      providesTags: ["buildhomecategory"],
    }),

  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetUserOProfileCardInDashboardQuery,
  useGetUserAdditionalProfileDetailsQuery,
  useGetProductBasicInfoByChildCategoryIdQuery,
  useCreateHomePageMutation,
  useGetHomePageDetailsForDashboardQuery,
} = BuildHomeApi;
