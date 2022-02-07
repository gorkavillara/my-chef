import React, { useContext } from "react";
import BigCard from "../components/BigCard";
import { IoAlbumsOutline, IoPersonAddOutline } from "react-icons/io5";
import { AdminContext } from "..";

const ChartsView = () => {
  const { bookings } = useContext(AdminContext);
  const todayBookings = () => {
    const d = new Date();
    return bookings.filter((b) => {
      const date = new Date(b.time.seconds * 1000);
      return (
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
      );
    });
  };
  return bookings ? (
    <>
      <h1 className="font-semibold text-lg p-6">Dashboard</h1>
      <main className="flex-grow bg-slate-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 px-6 pb-6 gap-4">
        <BigCard
          icon={<IoAlbumsOutline />}
          text={"Bookings Today"}
          value={todayBookings().length}
          isActive={true}
        />
        <BigCard
          icon={<IoPersonAddOutline />}
          text={"New Clients"}
          value={12}
          isActive={false}
        />
      </main>
    </>
  ) : null;
};

export default ChartsView;
