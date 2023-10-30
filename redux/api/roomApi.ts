import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (body) => ({
        url: "/reviews",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { usePostReviewMutation } = roomApi;
