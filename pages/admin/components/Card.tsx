import React, { useContext, useEffect, useState } from "react";
import { GiCrabClaw, GiWaterSplash, GiWineGlass } from "react-icons/gi";
import { HiOutlinePlus } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import StatesToggle from "./StatesToggle";
import { Booking, Dish, Pairing } from "../../../models";
import AllergiesList from "./AllergiesList";
import Color from "./Color";
import { AdminContext } from "..";
import { default as DishDisplay } from "./Dish";

const Card = ({ booking }: { booking: Booking }) => {
  const [activeDishes, setActiveDishes] = useState<Dish[]>([]);
  const [greeted, setGreeted] = useState<boolean>(false);
  const [activePopup, setActivePopup] = useState<boolean>(false);
  const [pairing, setPairing] = useState<Pairing>({ name: "", color: "" });
  const { openModal, store } = useContext(AdminContext);
  const time = booking ? new Date(booking.time.seconds * 1000) : new Date();

  useEffect(() => {
    const { menu } = booking;
    const { dishes } = menu;
    setActiveDishes(dishes);
  }, []);

  const changeStatus = (category: string, i: number) => {
    const newDishes = activeDishes;
    let prop = category + "Status";
    if (prop === "sideStatus") {
      if (newDishes[i].sideStatus === "pending") {
        newDishes[i].sideStatus = "done";
      } else if (newDishes[i].sideStatus === "done") {
        newDishes[i].sideStatus = "necessary";
      } else if (newDishes[i].sideStatus === "necessary") {
        newDishes[i].sideStatus = "pending";
      }
    }
    if (prop === "wineStatus") {
      if (newDishes[i].wineStatus === "pending") {
        newDishes[i].wineStatus = "done";
      } else if (newDishes[i].wineStatus === "done") {
        newDishes[i].wineStatus = "necessary";
      } else if (newDishes[i].wineStatus === "necessary") {
        newDishes[i].wineStatus = "pending";
      }
    }
    if (prop === "juiceStatus") {
      if (newDishes[i].juiceStatus === "pending") {
        newDishes[i].juiceStatus = "done";
      } else if (newDishes[i].juiceStatus === "done") {
        newDishes[i].juiceStatus = "necessary";
      } else if (newDishes[i].juiceStatus === "necessary") {
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
        <div className="bg-white rounded-xl shadow-xl overflow-hidden relative flex flex-col">
          <div
            className={`${
              activePopup ? "absolute" : "hidden"
            } top-0 left-0 w-full h-full z-40`}
            onClick={() => setActivePopup(false)}
          ></div>
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
              onClick={() => openModal("allergies", booking)}
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
              <span className="font-semibold">TIME: </span>
              <span>{time.toLocaleTimeString("es-ES")}</span>
            </label>
            <label className="p-1 flex gap-1 flex-wrap">
              <span className="font-semibold">NATIONALITY: </span>
              <span>{booking.nationality}</span>
            </label>
          </div>
          {(booking.status === "open" || booking.status === "closed") && (
            <div className="border-t">
              <div className="flex py-1 px-2 gap-4 items-center justify-between text-lg text-slate-800">
                <span className="p-1">
                  <GiCrabClaw />
                </span>
                <button
                  className={`${
                    booking.pairings
                      ? booking.pairings?.length === 0
                        ? "bg-red-100 animate-pulse"
                        : "bg-green-100"
                      : "bg-red-100 animate-pulse"
                  } p-1 rounded-lg`}
                  onClick={() => openModal("pairings", booking)}
                >
                  <GiWineGlass />
                </button>
              </div>
              {activeDishes.map((dish, i) => (
                <DishDisplay key={i} dish={dish} booking={booking} />
              ))}
            </div>
          )}
          {(booking.status === "open" || booking.status === "closed") && (
            <div className="flex flex-grow border-t">
              <div
                className="flex-grow p-2"
                onClick={() => openModal("notes", { booking, store })}
              >
                <h1 className="text-sm font-semibold">Notes</h1>
                <span className="text-sm">{booking.notes}</span>
              </div>
              {booking.status === "open" && (
                <div
                  onClick={() => setGreeted(!greeted)}
                  className={`p-2 flex transition items-center ${
                    greeted
                      ? "text-white bg-green-400"
                      : "border-l text-slate-600 bg-red-100 animate-pulse"
                  }`}
                >
                  <h1 className="text-sm font-semibold">Welcome</h1>
                </div>
              )}
            </div>
          )}
          {booking.status === "waiting" && (
            <div
              className="flex border-t bg-green-400 text-white justify-center items-center text-lg py-4 cursor-pointer active:bg-green-500"
              onClick={() => openModal("openBooking", booking)}
            >
              Open Table
            </div>
          )}
          {(booking.status === "open" || booking.status === "closed") && (
            <div
              className="absolute right-0 top-1 w-8 h-8 cursor-pointer transition flex justify-center items-center text-slate-800 hover:bg-gray-400 hover:text-white rounded-full z-50"
              onClick={() => setActivePopup(!activePopup)}
            >
              <BsThreeDots className="rotate-90 text-xl opacity-25" />
            </div>
          )}
          <div
            className={`absolute top-8 right-2 transition ${
              !activePopup && "scale-0"
            } bg-gray-100 flex flex-col rounded shadow overflow-hidden z-50`}
          >
            {booking.status === "open" && (
              <h3
                className="text-red-600 hover:bg-red-600 hover:text-white px-6 cursor-pointer flex gap-2 items-center py-2"
                onClick={() => openModal("closeBooking", booking)}
              >
                <HiOutlinePlus className="rotate-45" /> Close
              </h3>
            )}
            {booking.status === "closed" && (
              <h3
                className="text-green-600 hover:bg-green-600 hover:text-white px-6 cursor-pointer flex gap-2 items-center py-2"
                onClick={() => openModal("openBooking", booking)}
              >
                <HiOutlinePlus /> Reopen
              </h3>
            )}
          </div>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};

export default Card;
