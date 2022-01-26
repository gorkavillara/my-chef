import React, { MouseEventHandler } from "react";

type ToggleTypes = {
  status: string;
  onClick: MouseEventHandler;
};

const Toggle = ({ status, onClick }: ToggleTypes) => {
  return (
    <div
      onClick={onClick}
      className={`w-4 h-4 rounded-sm ${
        status === "pending" && "bg-yellow-300"
      } ${status === "done" && "bg-green-300"} ${
        status === "unnecessary" && "bg-slate-100"
      }`}
    ></div>
  );
};

export default Toggle;
