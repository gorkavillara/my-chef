import React, { useContext } from "react";
import { AdminContext } from "../..";
import { editBookingStatus } from "../../../../controllers/DBController";

const CloseBooking = ({ booking }) => {
  const { setBookings, bookings, closeModal } = useContext(AdminContext);
  const closeBooking = () => {
    closeModal();
    return editBookingStatus({ booking, bookings, newStatus: "closed" })
      .then((data) => setBookings(data.bookings))
      .catch((e) => console.error(e));
  };
  return booking ? (
    <div className="w-full flex flex-col gap-4 text-center items-center">
      <span className="text-lg">
        Are you sure you want to close booking {booking.table}?
      </span>
      <button className="btn-primary-green max-w-lg" onClick={closeBooking}>
        Yes, close it!
      </button>
    </div>
  ) : null;
};

export default CloseBooking;
