import React, { useContext } from "react";
import { AdminContext } from "..";
import DishTable from "../components/DishTable";
import PairingsTable from "../components/PairingsTable";

const Dishes = () => {
  const { store } = useContext(AdminContext);
  return <>{store ? <PairingsTable pairings={store.pairings} /> : null}</>;
};

export default Dishes;
