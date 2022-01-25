import React from "react";

type BigCardProps = {
  icon: JSX.Element;
  text: string;
  value: number;
  isActive: boolean;
};

const BigCard = ({ icon, text, value, isActive }: BigCardProps) => {
  return (
    <div className={`${isActive ? "bg-gradient-to-tr from-green-400 to-green-300 text-white" : "bg-white text-slate-500" } rounded-xl p-8 pt-16 flex flex-col gap-1`}>
      <span className="text-4xl text-semibold">{icon}</span>
      <span className="text-sm">{text}</span>
      <span className={`text-2xl text-semibold ${!isActive && "text-slate-900"}`}>{value}</span>
    </div>
  );
};

export default BigCard;
