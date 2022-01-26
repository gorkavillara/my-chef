import React, { useContext, useEffect, useState } from "react";
import StatesToggle from "./StatesToggle";
import { Booking, Dish } from "../../../models";
import AllergiesList from "./AllergiesList";
import { AdminContext } from "..";

const Card = ({ booking }: { booking: Booking }) => {
  const [activeDishes, setActiveDishes] = useState<Dish[]>([]);
  const [greeted, setGreeted] = useState<boolean>(false);
  const { openModal } = useContext(AdminContext);
  const time = booking ? new Date(booking.time.seconds * 1000) : new Date();

  useEffect(() => {
    const { menu } = booking;
    const { dishes } = menu;
    setActiveDishes(dishes);
  }, []);

  const toggleStatus = (category: string, i: number) => {
    const newDishes = activeDishes;
    let prop = category + "Status";
    if (prop === "sideStatus") {
      if (newDishes[i].sideStatus === "pending") {
        newDishes[i].sideStatus = "done";
      } else if (newDishes[i].sideStatus === "done") {
        newDishes[i].sideStatus = "pending";
      }
    }
    if (prop === "wineStatus") {
      if (newDishes[i].wineStatus === "pending") {
        newDishes[i].wineStatus = "done";
      } else if (newDishes[i].wineStatus === "done") {
        newDishes[i].wineStatus = "pending";
      }
    }
    if (prop === "juiceStatus") {
      if (newDishes[i].juiceStatus === "pending") {
        newDishes[i].juiceStatus = "done";
      } else if (newDishes[i].juiceStatus === "done") {
        newDishes[i].juiceStatus = "pending";
      }
    }
    if (category === "general") {
      newDishes[i].done = !newDishes[i].done;
    }
    setActiveDishes([...newDishes]);
  };
  return (
    <>
      {booking ? (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-2 p-1">
            <label className="p-1">
              <span className="font-semibold">PAX: </span>
              <span>{booking.pax}</span>
            </label>
            <label className="p-1">
              <span className="font-semibold">TABLE: </span>
              <span>{booking.table}</span>
            </label>
            <label className="p-1 flex gap-1 flex-wrap">
              <span className="font-semibold">NAME: </span>
              <span>{booking.name}</span>
            </label>
            <div
              onClick={() => openModal("allergies", booking.allergies)}
              className="p-1 flex gap-1 flex-wrap"
            >
              <span className="font-semibold">ALLERGIES:</span>
              {booking.allergies ? (
                <AllergiesList allergies={booking.allergies} style="display" />
              ) : (
                "none"
              )}
            </div>
            <label className="p-1 flex gap-1 flex-wrap">
              <span className="font-semibold">TIME:</span>
              <span>{time.toLocaleTimeString("es-ES")}</span>
            </label>
            <label className="p-1 flex gap-1 flex-wrap">
              <span className="font-semibold">NATIONALITY</span>
              <span>{booking.nationality}</span>
            </label>
            <label className="p-1 flex gap-1 flex-wrap">
              <span className="font-semibold">MENU</span>
              <span>{booking.menu.name}</span>
            </label>
            <label className="p-1 flex gap-1 flex-wrap">
              <span className="font-semibold">NOTES</span>
              <span>{booking.notes}</span>
            </label>
          </div>
          <div className="border-t">
            {activeDishes.map((dish, i) => (
              <div key={i} className="flex py-1 px-2 gap-1 items-center">
                <StatesToggle
                  status={dish.sideStatus}
                  onClick={() => toggleStatus("side", i)}
                />
                <span
                  className={`flex-grow ${dish.done && "italic line-through"}`}
                  onClick={() => toggleStatus("general", i)}
                >
                  {dish.name}
                </span>
                <StatesToggle
                  status={dish.wineStatus}
                  onClick={() => toggleStatus("wine", i)}
                />
                <StatesToggle
                  status={dish.juiceStatus}
                  onClick={() => toggleStatus("juice", i)}
                />
              </div>
            ))}
          </div>
          <div className="flex border-t">
            <div className="flex-grow p-2">
              <h1 className="text-sm font-semibold">Notes</h1>
              <span className="text-sm">{booking.notes}</span>
            </div>
            <div
              onClick={() => setGreeted(!greeted)}
              className={`p-2 flex transition items-center ${
                greeted ? "text-white bg-green-400" : "border-l text-slate-600"
              }`}
            >
              <h1 className="text-sm font-semibold">Welcome</h1>
            </div>
          </div>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};

export default Card;
