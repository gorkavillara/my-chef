import React from "react";
import Card from "../components/Card";
import BigCard from "../components/BigCard";
import {
  IoAlbumsOutline,
  IoPersonAddOutline,
  IoBarChartOutline,
  IoOptionsOutline,
} from "react-icons/io5";

const ChartsView = () => {
  return (
    <>
      <h1 className="font-semibold text-lg p-6">Dashboard</h1>
      <main className="flex-grow bg-slate-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 px-6 pb-6 gap-4">
        <BigCard
          icon={<IoAlbumsOutline />}
          text={"Bookings Today"}
          value={24}
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
  );
};

export default ChartsView;
