import React from "react";

const Color = ({ color, size = "md", className = "" }) => (
  <div
    className={`
      ${(size === "sm" && "w-1 h-1")}
      ${(size === "md" && "w-3 h-3")}
      ${(size === "lg" && "w-6 h-6")}
      ${(size === "xl" && "w-9 h-9")}
      
      rounded-full
      
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
      ${className}
      `}
  ></div>
);

export default Color;
