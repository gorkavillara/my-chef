import React, { useContext } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AdminContext } from "..";
import ProductTable from "../components/ProductTable";

const Products = () => {
  const { store } = useContext(AdminContext);
  return <>{store ? <ProductTable products={store.products} /> : null}</>;
};

export default Products;
