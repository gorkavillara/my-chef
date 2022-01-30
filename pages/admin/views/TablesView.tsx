import React, { useContext, useState } from "react";
import { AdminContext } from "..";
import { Booking } from "../../../models";
import BookingsDisplay from "../components/BookingsDisplay";

const TablesView = () => {
  const [filter, setFilter] = useState("all");
  const { bookings, setBookings } = useContext(AdminContext);
  const vals = useContext(AdminContext);
  const today = new Date();
  return (
    <>
      {bookings ? (
        <>
          <div className="flex items-center justify-between p-6">
            <h1 className="font-semibold text-lg">
              Bookings: {today.toLocaleDateString("es-ES")}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`${
                  filter === "all" ? "btn-primary-blue" : "btn-secondary-blue"
                }`}
              >
                All ({bookings.length})
              </button>
              <button
                onClick={() => setFilter("open")}
                className={`${
                  filter === "open" ? "btn-primary-blue" : "btn-secondary-blue"
                }`}
              >
                Open (
                {
                  bookings.filter(
                    (booking: Booking) => booking.status === "open"
                  ).length
                }
                )
              </button>
              <button
                onClick={() => setFilter("closed")}
                className={`${
                  filter === "closed"
                    ? "btn-primary-blue"
                    : "btn-secondary-blue"
                }`}
              >
                Closed (
                {
                  bookings.filter(
                    (booking: Booking) => booking.status === "closed"
                  ).length
                }
                )
              </button>
            </div>
          </div>
          <BookingsDisplay bookings={bookings} filter={filter} />
        </>
      ) : null}
    </>
  );
};

export default TablesView;
