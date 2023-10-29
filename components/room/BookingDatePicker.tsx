"use client";
import { IRoom } from "@/backend/models/room";
import { calculateDaysOfStay } from "@/helpers/helpers";
import {
  useLazyCheckBookingAvailiabilityQuery,
  useNewBookingMutation,
} from "@/redux/api/bookingApi";
import { set } from "mongoose";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  room: IRoom;
}
const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [daysOfStay, setDaysOfStay] = useState(0);

  const [newBooking, { isLoading, isError, error }] = useNewBookingMutation();
  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailiabilityQuery();

  const isAvailable = data?.isAvailable;

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

  const bookRoom = async () => {
    if (!checkInDate || !checkOutDate) return;

    const bookingData = {
      room: room?._id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: room.pricePerNight * daysOfStay,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS",
      },
    };

    newBooking(bookingData);
  };

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
        selectsRange
        inline
      />

      {isAvailable && (
        <div className="alert alert-success my-3 font-weight-bold">
          Room is available. Book now.
        </div>
      )}

      {!isAvailable && (
        <div className="alert alert-danger my-3 font-weight-bold">
          Room not available. Try different dates.
        </div>
      )}
      <button className="btn  py-3 form-btn w-100" onClick={bookRoom}>
        Pay and Book
      </button>
    </div>
  );
};
export default BookingDatePicker;
