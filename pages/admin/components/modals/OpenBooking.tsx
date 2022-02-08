import React, { useContext } from "react";
import { AdminContext } from "../..";
import { editBookingStatus } from "../../../../controllers/DBController";

const OpenBooking = ({ booking }) => {
  const { bookings, closeModal } = useContext(AdminContext);
  
  const openBooking = async () => {
    closeModal();
    return await editBookingStatus({
      booking,
      bookings,
      newStatus: "open",
    }).catch((e) => console.error(e));
  };
  
  return booking ? (
    <div className="w-full flex flex-col gap-4 text-center items-center">
      <span className="text-lg">
        Are you sure you want to open booking {booking.table}?
      </span>
      <button className="btn-primary-green max-w-lg" onClick={openBooking}>
        Yes, open it!
      </button>
    </div>
  ) : null;
};

export default OpenBooking;
