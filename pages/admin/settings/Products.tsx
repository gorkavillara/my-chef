import React, { useContext } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AdminContext } from "..";
import ProductTable from "../components/ProductTable";

const Products = () => {
  const { store, setStore } = useContext(AdminContext);
  return (
    <div className="">
      <ProductTable products={store.products} />
    </div>
  );
};

export default Products;
