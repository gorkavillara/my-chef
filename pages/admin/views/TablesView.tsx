import React, { useContext } from "react";
import { AdminContext } from "..";
import Card from "../components/Card";
import { Booking } from "../../../models";

const TablesView = () => {
  const { bookings, setBookings } = useContext(AdminContext);

  return (
    <>
      <h1 className="font-semibold text-lg p-6">Comandas por mesa</h1>
      <main className="flex-grow bg-slate-100 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4">
        {bookings.map((booking: Booking, i) => (
          <Card booking={booking} key={i} />
        ))}
      </main>
    </>
  );
};

export default TablesView;
