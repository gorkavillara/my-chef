import React, { useContext, useState } from "react";
import { AdminContext } from "..";
import Card from "../components/Card";
import { Booking } from "../../../models";

const TablesView = () => {
  const [filter, setFilter] = useState("all");
  const { bookings, setBookings } = useContext(AdminContext);
  const today = new Date();
  return (
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
              bookings.filter((booking: Booking) => booking.status === "open")
                .length
            }
            )
          </button>
          <button
            onClick={() => setFilter("closed")}
            className={`${
              filter === "closed" ? "btn-primary-blue" : "btn-secondary-blue"
            }`}
          >
            Closed (
            {
              bookings.filter((booking: Booking) => booking.status === "closed")
                .length
            }
            )
          </button>
        </div>
        <h1 className="hidden sm:block font-semibold text-lg">
          Pending Bookings
        </h1>
      </div>
      <main className="flex-grow bg-slate-100 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4 sm:gap-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 col-span-1 sm:col-span-2 xl:col-span-3 gap-2 sm:pr-2">
          {bookings ? (
            bookings
              .filter((booking: Booking) => booking.status === "open")
              .map((booking: Booking, i) => <Card booking={booking} key={i} />)
          ) : (
            <h1>Cargando</h1>
          )}
        </div>
        <div className="flex flex-col col-span-1 gap-4 sm:border-l-2 sm:pl-2">
          <h1 className="sm:hidden font-semibold text-lg">Pending Bookings</h1>
          {bookings ? (
            bookings
              .filter((booking: Booking) => booking.status === "waiting")
              .map((booking: Booking, i) => <Card booking={booking} key={i} />)
          ) : (
            <h1>Cargando</h1>
          )}
        </div>
      </main>
    </>
  );
};

export default TablesView;
