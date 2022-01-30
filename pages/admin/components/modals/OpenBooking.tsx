import axios from "axios";
import React, { useContext } from "react";
import { AdminContext } from "../..";

const OpenBooking = ({ booking }) => {
  const { setBookings, bookings, closeModal } = useContext(AdminContext);
  const openBooking = () => {
    axios
      .post("/api/bookings", { action: "openBooking", booking, bookings })
      .then((r) => {
        setBookings(r.data.bookings);
        closeModal();
      })
      .catch((e) => console.error(e));
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
