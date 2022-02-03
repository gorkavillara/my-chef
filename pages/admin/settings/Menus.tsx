import React, { useContext } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AdminContext } from "..";

const Menus = () => {
  const { store, openModal } = useContext(AdminContext);
  return store ? (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {store.menus?.map((menu, i) => (
        <button
          key={i}
          className="p-4 flex flex-col gap-4 shadow rounded bg-white transition hover:bg-slate-50 active:ring ring-slate-50"
          onClick={() => openModal("editMenu", menu)}
        >
          <span className="text-lg font-semibold">{menu.name}</span>
          <span>Dishes: {menu.dishes.length}</span>
        </button>
      ))}
      <button
        className="p-4 flex flex-col gap-2 shadow rounded bg-green-400 text-white justify-center items-center font-semibold transition hover:bg-green-500 active:ring ring-green-200"
        onClick={() => openModal("newMenu")}
      >
        <BsPlusCircle className="text-3xl" />
        <span>Add Menu</span>
      </button>
    </div>
  ) : null;
};

export default Menus;
