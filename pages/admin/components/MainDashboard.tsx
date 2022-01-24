import React from "react";
import Card from "./Card";

const MainDashboard = () => {
  return (
    <div className="ml-20 flex-grow bg-slate-100 min-h-screen">
      <h1 className="font-semibold text-lg p-6">Comandas por mesa</h1>
      <main className="flex-grow bg-slate-100 grid grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </main>
    </div>
  );
};

export default MainDashboard;
