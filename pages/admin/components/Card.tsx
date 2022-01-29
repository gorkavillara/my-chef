import React, { useContext, useEffect, useState } from "react";
import {
  GiCrabClaw,
  GiTrashCan,
  GiWaterSplash,
  GiWineGlass,
} from "react-icons/gi";
import { MdEdit } from "react-icons/md";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import StatesToggle from "./StatesToggle";
import { Booking, Dish } from "../../../models";
import AllergiesList from "./AllergiesList";
import { AdminContext } from "..";

const Card = ({ booking }: { booking: Booking }) => {
  const [activeDishes, setActiveDishes] = useState<Dish[]>([]);
  const [greeted, setGreeted] = useState<boolean>(false);
  const [activePopup, setActivePopup] = useState<boolean>(false);
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
        <div className="bg-white rounded-xl shadow-xl overflow-hidden relative">
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
              <span className="font-semibold">TIME: </span>
              <span>{time.toLocaleTimeString("es-ES")}</span>
            </label>
            <label className="p-1 flex gap-1 flex-wrap">
              <span className="font-semibold">NATIONALITY: </span>
              <span>{booking.nationality}</span>
            </label>
            <label className="p-1 flex gap-1 flex-wrap">
              <span className="font-semibold">MENU: </span>
              <span>{booking.menu.name}</span>
            </label>
            <div
              className="p-1 flex gap-1 flex-wrap"
              onClick={() => openModal("notes", { booking, store })}
            >
              <span className="font-semibold">NOTES: </span>
              <span>{booking.notes}</span>
            </div>
          </div>
          {booking.status === "open" && (
            <div className="border-t">
              <div className="flex py-1 px-2 gap-4 items-center justify-between text-lg text-slate-800">
                <span>
                  <GiCrabClaw />
                </span>
                <div className="flex items-center gap-4">
                  <span>
                    <GiWineGlass />
                  </span>
                  <span>
                    <GiWaterSplash />
                  </span>
                </div>
              </div>
              {activeDishes.map((dish, i) => (
                <div key={i} className="flex py-1 px-2 gap-4 items-center">
                  <StatesToggle
                    status={dish.sideStatus}
                    onClick={() => changeStatus("side", i)}
                  />
                  <span
                    className={`flex-grow text-lg ${
                      dish.done && "italic line-through"
                    }`}
                    onClick={() => changeStatus("general", i)}
                  >
                    {dish.name}
                  </span>
                  <StatesToggle
                    status={dish.wineStatus}
                    onClick={() => changeStatus("wine", i)}
                  />
                  <StatesToggle
                    status={dish.juiceStatus}
                    onClick={() => changeStatus("juice", i)}
                  />
                </div>
              ))}
            </div>
          )}
          {booking.status === "open" && (
            <div className="flex border-t">
              <div
                className="flex-grow p-2"
                onClick={() => openModal("notes", { booking, store })}
              >
                <h1 className="text-sm font-semibold">Notes</h1>
                <span className="text-sm">{booking.notes}</span>
              </div>
              <div
                onClick={() => setGreeted(!greeted)}
                className={`p-2 flex transition items-center ${
                  greeted
                    ? "text-white bg-green-400"
                    : "border-l text-slate-600"
                }`}
              >
                <h1 className="text-sm font-semibold">Welcome</h1>
              </div>
            </div>
          )}
          {booking.status === "waiting" && (
            <div className="flex border-t bg-green-400 text-white justify-center items-center text-lg py-4">
              Open Table
            </div>
          )}
          {booking.status === "open" && (
            <div
              className="absolute right-2 top-2 w-8 h-8 cursor-pointer transition flex justify-center items-center bg-white text-slate-800 hover:bg-gray-400 hover:text-white rounded-full bisel"
              onClick={() => setActivePopup(!activePopup)}
            >
              <BsThreeDots />
            </div>
          )}
          <div
            className={`absolute top-8 right-2 transition ${
              !activePopup && "scale-0"
            } bg-gray-100 flex flex-col rounded shadow py-2`}
          >
            {/* <h3
              className="hover:bg-gray-400 hover:text-white px-6 cursor-pointer flex gap-2 items-center"
              onClick={null}
            >
              <MdEdit /> Editar
            </h3> */}
            <h3
              className="text-red-600 hover:bg-red-600 hover:text-white px-6 cursor-pointer flex gap-2 items-center"
              onClick={() =>
                confirm(
                  `Are you sure you want to close booking ${booking.table}?`
                ) && null
              }
            >
              <HiOutlinePlus className="rotate-45" /> Close
            </h3>
          </div>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};

export default Card;
