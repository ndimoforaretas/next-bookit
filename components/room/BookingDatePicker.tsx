const BookingDatePicker = ({ room }) => {
  return (
    <div className="booking-card shadow p-4">
      <p className="price-per-night">
        <b>$100</b> / night
      </p>
      <hr />
      <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
    </div>
  );
};
export default BookingDatePicker;
