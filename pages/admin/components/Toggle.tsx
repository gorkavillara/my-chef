import React, { MouseEventHandler } from "react";

type ToggleTypes = {
  isActive: boolean;
  onToggle: MouseEventHandler;
};

const Toggle = ({ isActive, onToggle }: ToggleTypes) => {
  return (
    <div
      onClick={onToggle}
      className={`w-3 h-3 rounded-sm ${
        isActive ? "bg-green-400" : "bg-yellow-300"
      }`}
    ></div>
  );
};

export default Toggle;
