import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    newBooking: builder.mutation({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
    }),

    checkBookingAvailiability: builder.query({
      query: ({ id, checkInDate, checkOutDate }) => ({
        url: `/bookings/check_room_availability?roomId=${id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
      }),
    }),

    getBookedDates: builder.query({
      query: (id) => ({
        url: `/bookings/booked_dates?roomId=${id}`,
      }),
    }),
  }),
});

export const {
  useNewBookingMutation,
  useLazyCheckBookingAvailiabilityQuery,
  useGetBookedDatesQuery,
} = bookingApi;
