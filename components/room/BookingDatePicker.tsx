"use client";
import { IRoom } from "@/backend/models/room";
import { calculateDaysOfStay } from "@/helpers/helpers";
import {
  useGetBookedDatesQuery,
  useLazyCheckBookingAvailiabilityQuery,
  useLazyStripeCheckoutQuery,
} from "@/redux/api/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

interface Props {
  room: IRoom;
}
const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [daysOfStay, setDaysOfStay] = useState(0);

  const router = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailiabilityQuery();

  const isAvailable = data?.isAvailable;
  const { data: { bookedDates: dates } = {} } = useGetBookedDatesQuery(
    room?._id
  );

  const excludeDates = dates?.map((date: string) => new Date(date)) || [];

  const onChange = (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = calculateDaysOfStay(checkInDate, checkOutDate);

      setDaysOfStay(days);

      // Check Booking Availiability
      checkBookingAvailability({
        id: room?._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      });
    }
  };

  const [stripeCheckout, { error, isLoading, data: checkoutData }] =
    useLazyStripeCheckoutQuery();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (checkoutData) {
      router.replace(checkoutData?.url);
    }
  }, [error, checkoutData]);

  const bookRoom = () => {
    const amount = room?.pricePerNight * daysOfStay;
    const checkoutData = {
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      daysOfStay,
      amount,
    };

    stripeCheckout({ id: room?._id, checkoutData });
  };

  // const bookRoom = async () => {
  //   if (!checkInDate || !checkOutDate) return;

  //   const bookingData = {
  //     room: room?._id,
  //     checkInDate,
  //     checkOutDate,
  //     daysOfStay,
  //     amountPaid: room.pricePerNight * daysOfStay,
  //     paymentInfo: {
  //       id: "STRIPE_PAYMENT_ID",
  //       status: "STRIPE_PAYMENT_STATUS",
  //     },
  //   };

  //   newBooking(bookingData);
  // };

  return (
    <div className="booking-card shadow p-4">
      <p className="price-per-night">
        <b>€{room?.pricePerNight}</b> / night
      </p>
      <hr />
      <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

      <DatePicker
        className="w-100"
        selected={checkInDate}
        onChange={onChange}
        minDate={new Date()}
        startDate={checkInDate}
        endDate={checkOutDate}
        excludeDates={excludeDates}
        selectsRange
        inline
      />

      {isAvailable === true && (
        <div className="alert alert-success my-3 font-weight-bold">
          Room is available. Book now.
        </div>
      )}

      {isAvailable === false && (
        <div className="alert alert-danger my-3 font-weight-bold">
          Room not available. Try different dates.
        </div>
      )}

      {isAvailable && !isAuthenticated && (
        <div className="alert alert-danger my-3 font-weight-bold">
          Login to book the room.
        </div>
      )}

      {isAuthenticated && isAvailable && (
        <button
          className="btn py-3 form-btn w-100"
          onClick={bookRoom}
          disabled={isLoading}>
          Pay - €{room?.pricePerNight * daysOfStay}
        </button>
      )}
    </div>
  );
};
export default BookingDatePicker;
