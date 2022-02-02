import React from "react";

const Color = ({ color }) => (
  <span
    className={`w-3 h-3 rounded-full
      ${color === "red" && "bg-red-400"}
      ${color === "green" && "bg-green-400"}
      ${color === "blue" && "bg-blue-400"}
      ${color === "purple" && "bg-purple-400"}
      ${color === "pink" && "bg-pink-400"}
      ${color === "slate" && "bg-slate-400"}
      ${color === "yellow" && "bg-yellow-400"}
      ${color === "orange" && "bg-orange-400"}
      ${color === "teal" && "bg-teal-400"}
      ${color === "indigo" && "bg-indigo-400"}
      ${color === "black" && "bg-black"}
      ${color === "disabled" && "bg-slate-100"}
      `}
  ></span>
);

export default Color;
