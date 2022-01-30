import axios from "axios";
import React, { useContext, useState } from "react";
import { AdminContext } from "../..";
import { Table } from "../../../../models";
import Input from "../forms/Input";

const TablesModal = ({ editTable = null }) => {
  const { store, setStore, closeModal } = useContext(AdminContext);
  const emptyTable = {
    name: "",
    store_id: store ? store.id : "",
  };
  const [newTable, setNewTable] = useState<Table>(
    editTable ? editTable : emptyTable
  );
  const registerTable = () => {
    axios
      .post("/api/tables", { action: "register", table: newTable, store })
      .then((r) => {
        setStore({ ...r.data.store });
        closeModal();
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-lg font-semibold">
        {editTable ? "Edit table" : "Add New Table"}
      </h1>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={newTable.name}
        onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
      />
      <button
        className="btn-primary-green mx-6"
        onClick={registerTable}
        disabled={newTable.name === ""}
      >
        {editTable ? "Update table" : "Add Table"}
      </button>
    </div>
  );
};

export default TablesModal;
