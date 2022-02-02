import React, { useState } from "react";
import Color from "./Color";

const statuses = ["waiting", "preparing", "prepared", "served"];

const Dish = ({ dish, booking }) => {
  const [status, setStatus] = useState("waiting");
  const changeStatus = () => {
    if (status === "waiting") {
      return setStatus("preparing");
    } else if (status === "preparing") {
      return setStatus("prepared");
    } else if (status === "prepared") {
      return setStatus("served");
    } else if (status === "served") {
      return setStatus("waiting");
    }
    return;
  };
  return (
    <div className="flex py-1 px-2 gap-4 items-center cursor-pointer">
      <span
        className={`w-3 h-3 rounded-full ${
          dish.side ? "bg-green-500" : "bg-slate-100"
        }`}
      ></span>
      <div
        className={`flex-grow text-lg px-2 rounded-full flex justify-between items-center ${
          dish.allergies?.some((all) => booking.allergies?.indexOf(all) >= 0)
            ? "text-red-500"
            : ""
        }
        ${status === "preparing" && "text-yellow-700 bg-yellow-200 italic"}
        ${status === "prepared" && "text-green-700 bg-green-200 italic"}
        ${status === "served" && "text-slate-300 bg-slate-100 italic"}
        `}
        onClick={changeStatus}
      >
        <span
          className={`${
            (status === "prepared" || status === "served") && "line-through"
          }`}
        >
          {dish.name}
        </span>{" "}
        <span className="text-sm">{status !== "waiting" ? status : ""}</span>
      </div>
      {dish.wine ? (
        <span className="flex gap-1">
          {booking.pairings?.map((pairing, i) => (
            <Color key={i} color={pairing.color} />
          ))}
        </span>
      ) : (
        <Color color={"disabled"} />
      )}
    </div>
  );
};

export default Dish;
