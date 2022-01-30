import React from "react";
import { Dish } from "../../../models";
import { GiCrabClaw, GiWaterSplash, GiWineGlass } from "react-icons/gi";

const CompanionList = ({ dish }: { dish: Dish }) => {
  return dish ? (
    <div className="flex gap-1 flex-wrap">
      <div
        className={`flex gap-1 items-center p-1 rounded text-2xl ${
          dish.side
            ? "bg-green-300 text-green-700"
            : "bg-slate-100 text-slate-300"
        }`}
      >
        <GiCrabClaw />
      </div>
      <div
        className={`flex gap-1 items-center p-1 rounded text-2xl ${
          dish.wine
            ? "bg-green-300 text-green-700"
            : "bg-slate-100 text-slate-300"
        }`}
      >
        <GiWineGlass />
      </div>
      <div
        className={`flex gap-1 items-center p-1 rounded text-2xl ${
          dish.juice
            ? "bg-green-300 text-green-700"
            : "bg-slate-100 text-slate-300"
        }`}
      >
        <GiWaterSplash />
      </div>
    </div>
  ) : null;
};

export default CompanionList;
