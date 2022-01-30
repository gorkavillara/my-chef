import axios from "axios";
import React, { useContext, useState } from "react";
import { AdminContext } from "../..";
import { Menu } from "../../../../models";
import AllergiesList from "../AllergiesList";
import CompanionList from "../CompanionList";
import Input from "../forms/Input";

const MenusModal = ({ editMenu = null }) => {
  const { store, setStore, closeModal } = useContext(AdminContext);
  const emptyMenu = {
    name: "",
    dishes: [],
  };
  const [newMenu, setNewMenu] = useState<Menu>(editMenu ? editMenu : emptyMenu);
  const registerMenu = () => {
    const action = editMenu === null ? "register" : "update";
    axios
      .post("/api/menus", { action, menu: newMenu, store })
      .then((r) => {
        setStore({ ...r.data.store });
        closeModal();
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-lg font-semibold">
        {editMenu ? "Edit menu" : "Add New Menu"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={newMenu.name}
          containerClassName="col-span-2"
          disabled={editMenu !== null}
          onChange={(e: any) =>
            setNewMenu({ ...newMenu, name: e.target.value })
          }
        />
        <div className="col-span-2 px-4 flex flex-col">
          <h2 className="text-lg">Dishes</h2>
          <table>
            <thead>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Allergies
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Companions
              </th>
            </thead>
            {newMenu.dishes?.map((dish, i) => (
              <tr key={i}>
                <td className="px-5 py-2">{dish.name}</td>
                <td className="px-5 py-2">
                  <AllergiesList allergies={dish.allergies} style="modal" />
                </td>
                <td className="px-5 py-2">
                  <CompanionList dish={dish} />
                </td>
              </tr>
            ))}

            <tr className="my-4">
              <td
                colSpan={3}
                className="bg-slate-100 py-2 text-center font-semibold rounded-lg active:bg-slate-200"
              >
                Add Dish
              </td>
            </tr>
          </table>
        </div>
        <button
          className="btn-primary-green mx-6 col-span-2"
          onClick={registerMenu}
          disabled={newMenu.name === ""}
        >
          {editMenu ? "Update Menu" : "Add Menu"}
        </button>
      </div>
    </div>
  );
};

export default MenusModal;
