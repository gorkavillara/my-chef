import React from "react";
import Color from "./Color";

const Dish = ({ dish, booking, setDish, i }) => {
  const changeStatus = () => {
    let newStatus = dish.status ? dish.status : "waiting";
    if (!dish.status || dish.status === "waiting") {
      newStatus = "preparing";
    } else if (dish.status === "preparing") {
      newStatus = "prepared";
    } else if (dish.status === "prepared") {
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
        ${dish.status === "preparing" && "text-yellow-700 bg-yellow-200 italic"}
        ${dish.status === "prepared" && "text-green-700 bg-green-200 italic"}
        ${dish.status === "served" && "text-slate-300 bg-slate-100 italic"}
        `}
        onClick={changeStatus}
      >
        <span
          className={`${
            (dish.status === "prepared" || dish.status === "served") &&
            "line-through"
          }`}
        >
          {dish.name}
        </span>{" "}
        <span className="text-sm">
          {dish.status !== "waiting" ? dish.status : ""}
        </span>
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
  ) : null;
};

export default Dish;
