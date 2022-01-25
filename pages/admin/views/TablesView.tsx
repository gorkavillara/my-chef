import React from "react";
import Card from "../components/Card";

const TablesView = () => {
  return (
    <>
      <h1 className="font-semibold text-lg p-6">Comandas por mesa</h1>
      <main className="flex-grow bg-slate-100 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </main>
    </>
  );
};

export default TablesView;
