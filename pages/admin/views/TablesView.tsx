import React, { useContext } from "react";
import { AdminContext } from "..";
import Card from "../components/Card";
import { Booking } from "../../../models";

const TablesView = () => {
  const { bookings, setBookings } = useContext(AdminContext);
  const today = new Date();
  return (
    <>
      <div className="flex items-center justify-between p-6">
        <h1 className="font-semibold text-lg">
          Bookings: {today.toLocaleDateString("es-ES")}
        </h1>
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
          <h1 className="sm:hidden font-semibold text-lg">
            Pending Bookings
          </h1>
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
