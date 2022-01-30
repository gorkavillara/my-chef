import React, { useContext } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AdminContext } from "..";
import DishTable from "../components/DishTable";

const Dishes = () => {
  const { store, setStore } = useContext(AdminContext);
  return (
    <div className="">
      <DishTable dishes={store.dishes} />
    </div>
  );
};

export default Dishes;
