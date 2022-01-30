import axios from "axios";
import React, { useContext } from "react";
import { AdminContext } from "../..";

const CloseBooking = ({ booking }) => {
  const { setBookings, bookings, closeModal } = useContext(AdminContext);
  const closeBooking = () => {
    axios
      .post("/api/bookings", { action: "closeBooking", booking, bookings })
      .then((r) => {
        setBookings(r.data.bookings);
        closeModal();
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="w-full flex flex-col gap-4 text-center items-center">
      <span className="text-lg">
        Are you sure you want to close booking {booking.table}?
      </span>
      <button className="btn-primary-green max-w-lg" onClick={closeBooking}>
        Yes, close it!
      </button>
    </div>
  );
};

export default CloseBooking;
