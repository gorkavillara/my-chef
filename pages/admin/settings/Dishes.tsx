import React, { useContext } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AdminContext } from "..";
import DishTable from "../components/DishTable";

const Dishes = () => {
  const { store } = useContext(AdminContext);
  return <>{store ? <DishTable dishes={store.dishes} /> : null}</>;
};

export default Dishes;
