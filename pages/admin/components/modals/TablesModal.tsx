import React, { useState } from "react";
import { Table } from "../../../../models";
import Input from "../forms/Input";

const TablesModal = ({ store, editTable = null }) => {
  const emptyTable = {
    name: "",
    store_id: store.id,
  };
  const [newTable, setNewTable] = useState<Table>(
    editTable ? editTable : emptyTable
  );
  return (
    <div className="flex flex-col gap-4">
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
        onClick={() => console.log(newTable)}
        disabled={newTable.name === ""}
      >
        {editTable ? "Update table" : "Add Table"}
      </button>
    </div>
  );
};

export default TablesModal;
