import React, { useContext } from "react";
import { AdminContext } from "..";
import { Pairing } from "../../../models";
import Color from "./Color";

const Dish = ({ dish, booking, setDish, i }) => {
  const { openModal } = useContext(AdminContext);
  const changeStatus = () => {
    let newStatus = dish.status ? dish.status : "waiting";
    if (!dish.status || dish.status === "waiting") {
      newStatus = "preparing";
    } else if (dish.status === "preparing") {
      newStatus = "served";
    } else if (dish.status === "served") {
      newStatus = "waiting";
    }
    const newDish = { ...dish, status: newStatus };
    setDish(i, newDish);
    return;
  };
  return dish ? (
    <div className="flex py-1 px-2 gap-4 items-center cursor-pointer">
      <button
        className={`w-3 h-3 rounded-full ${
          dish.side ? "bg-green-500" : "bg-slate-100"
        }`}
        onClick={() => openModal("dishOptions", { booking, dish })}
      ></button>
      <div
        className={`flex-grow text-lg px-2 rounded-full flex justify-between items-center ${
          dish.allergies?.some((all) => booking.allergies?.indexOf(all) >= 0)
            ? "text-red-500"
            : ""
        }
        ${dish.status === "preparing" && "text-yellow-700 bg-yellow-200 italic"}
        ${dish.status === "prepared" && "text-green-700 bg-green-200 italic"}
        ${dish.status === "served" && "text-slate-300 bg-slate-100 italic"}
        `}
        onClick={changeStatus}
      >
        <span
          className={`
          ${dish.status === "preparing" && "line-through"} 
          ${
            (dish.status === "prepared" || dish.status === "served") &&
            "line-double"
          }`}
        >
          {dish.name}
        </span>{" "}
        <span className="text-sm">
          {dish.status === "waiting"
            ? ""
            : dish.status === "preparing"
            ? "almost ready..."
            : dish.status}
        </span>
      </div>
      <button
        className="flex gap-1"
        onClick={() => openModal("dishOptions", { booking, dish })}
      >
        {dish.wine ? (
          booking.pairings?.map((pairing: Pairing, i: number) => (
            <Color key={i} color={pairing.color} />
          ))
        ) : (
          <Color color={"disabled"} />
        )}
      </button>
    </div>
  ) : null;
};

export default Dish;
