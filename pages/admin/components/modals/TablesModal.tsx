import React, { useContext, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { AdminContext } from "../..";
import {
  registerNewTable,
  updateTable,
  deleteTable as delTable,
} from "../../../../controllers/DBController";
import { Table } from "../../../../models";
import Input from "../forms/Input";

const TablesModal = ({ editTable = null }) => {
  const [loading, setLoading] = useState(false);
  const { store, setStore, closeModal } = useContext(AdminContext);
  const emptyTable = {
    name: "",
    store_id: store ? store.id : "",
  };
  const [newTable, setNewTable] = useState<Table>(
    editTable ? editTable : emptyTable
  );
  const registerTable = () => {
    setLoading(true);
    const id =
      editTable === null
        ? 0
        : store.tables.findIndex((tab) => tab.name === editTable.name);
    if (editTable === null) {
      registerNewTable({ table: newTable, store })
        .then((data) => {
          setStore({ ...data.store });
          setLoading(false);
          closeModal();
        })
        .catch((e) => console.error(e));
    } else {
      updateTable({ table: newTable, store, id })
        .then((data) => {
          setStore({ ...data.store });
          setLoading(false);
          closeModal();
        })
        .catch((e) => console.error(e));
    }
  };
  const deleteTable = () => {
    const id = store.tables.findIndex((tab) => tab.name === editTable.name);
    setLoading(true);
    delTable({ store, id })
      .then((data) => {
        setLoading(false);
        setStore({ ...data.store });
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
      <div className="flex justify-center gap-2 mx-6">
        {editTable && (
          <button
            className="btn-secondary-red"
            onClick={() =>
              confirm("Are you sure you want to delete this table?") &&
              deleteTable()
            }
            disabled={newTable.name === "" || loading}
          >
            <IoTrashBinOutline className="text-xl" />
          </button>
        )}
        <button
          className="btn-primary-green mx-6"
          onClick={registerTable}
          disabled={newTable.name === ""}
        >
          {editTable ? "Update table" : "Add Table"}
        </button>
      </div>
    </div>
  );
};

export default TablesModal;
