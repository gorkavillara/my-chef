import React from "react";
import { Booking } from "../../../models";
import Card from "./Card";

const BookingsDisplay = ({
  filter,
  bookings,
}: {
  filter: string;
  bookings: object[];
}) => {
  return (
    <>
      {filter === "all" && (
        <main className="flex-grow bg-slate-100 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4 sm:gap-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 col-span-1 sm:col-span-2 xl:col-span-3 gap-2 sm:pr-2">
            {bookings ? (
              bookings
                .filter((booking: Booking) => booking.status === "open")
                .map((booking: Booking, i) => (
                  <Card booking={booking} key={i} />
                ))
            ) : (
              <h1>Cargando...</h1>
            )}
          </div>
          <div className="flex flex-col col-span-1 gap-4 sm:border-l-2 sm:pl-2">
            <h1 className="font-semibold text-lg">
              Pending Bookings
            </h1>
            {bookings ? (
              bookings
                .filter((booking: Booking) => booking.status === "waiting")
                .map((booking: Booking, i) => (
                  <Card booking={booking} key={i} />
                ))
            ) : (
              <h1>Cargando</h1>
            )}
          </div>
        </main>
      )}
      {filter === "open" && (
        <main className="flex-grow bg-slate-100 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4">
          {bookings ? (
            bookings
              .filter((booking: Booking) => booking.status === "open")
              .map((booking: Booking, i) => <Card booking={booking} key={i} />)
          ) : (
            <h1>Cargando</h1>
          )}
        </main>
      )}
      {filter === "closed" && (
        <main className="flex-grow bg-slate-100 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4">
          {bookings ? (
            bookings
              .filter((booking: Booking) => booking.status === "closed")
              .map((booking: Booking, i) => <Card booking={booking} key={i} />)
          ) : (
            <h1>Cargando</h1>
          )}
        </main>
      )}
    </>
  );
};

export default BookingsDisplay;
