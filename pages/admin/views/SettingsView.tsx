import React, { useContext, useState } from "react";
import { AdminContext } from "..";
import Menus from "../settings/Menus";
import Dishes from "../settings/Dishes";
import Table from "../settings/Table";

const NavMenu = ({ route, setRoute }) => (
  <div className="flex gap-2">
    <span
      className={`px-6 py-3 transition bg-white rounded-t-lg ${
        route === "menus" ? "z-10" : "opacity-50"
      }`}
      onClick={() => setRoute("menus")}
    >
      Menus
    </span>
    <span
      className={`px-6 py-3 transition bg-white rounded-t-lg ${
        route === "dishes" ? "z-10" : "opacity-50"
      }`}
      onClick={() => setRoute("dishes")}
    >
      Dishes
    </span>
    <span
      className={`px-6 py-3 transition bg-white rounded-t-lg ${
        route === "tables" ? "z-10" : "opacity-50"
      }`}
      onClick={() => setRoute("tables")}
    >
      Tables
    </span>
    <span
      className={`px-6 py-3 transition bg-white rounded-t-lg ${
        route === "users" ? "z-10" : "opacity-50"
      }`}
      onClick={() => setRoute("users")}
    >
      Users
    </span>
    <span
      className={`px-6 py-3 transition bg-white rounded-t-lg ${
        route === "main" ? "z-10" : "opacity-50"
      }`}
      onClick={() => setRoute("main")}
    >
      Info
    </span>
  </div>
);

const SettingsView = () => {
  const [route, setRoute] = useState("main");
  const { store, openModal } = useContext(AdminContext);
  return (
    <div className="min-h-full w-full flex flex-col">
      <h1 className="font-semibold text-lg p-6">Settings</h1>
      {store ? (
        <main className="flex-grow flex flex-col bg-slate-100 px-6 pb-6">
          <NavMenu route={route} setRoute={setRoute} />
          <div className="flex-grow flex flex-col w-full h-full">
            <div
              className={`p-6 bg-white flex-grow shadow-lg w-full rounded-b rounded-r ${
                route !== "main" ? "rounded" : ""
              } shadow-up flex flex-col gap-4`}
            >
              {route === "main" && (
                <>
                  <h1 className="font-semibold text-lg">Public Info</h1>
                </>
              )}
              {route === "tables" && (
                <>
                  <div className="flex justify-between mb-2">
                    <div className="flex gap-4 items-center">
                      <h1 className="font-semibold text-lg">Tables</h1>
                      <button
                        onClick={() => openModal("tables", { store })}
                        className="btn-primary-green"
                      >
                        + Add Table
                      </button>
                      <button
                        onClick={() => openModal("tables-multiple")}
                        className="btn-primary-green"
                      >
                        + Add Multiple
                      </button>
                    </div>
                    {/* <div className="flex gap-2">
                    <button
                      disabled={selectedTables.length === 0}
                      color="red"
                      onClick={() =>
                        confirm(
                          `¿Estás seguro de querer eliminar estas ${selectedTables.length} mesas?`
                        ) && deleteMultiple()
                      }
                    >
                      <IoTrash />
                      Eliminar
                    </button>
                  </div> */}
                  </div>
                  <Table
                    items={store.tables}
                    deleteItems={() => console.log("delete")}
                    selectedTables={[]}
                    toggleSelected={() => console.log("toggle")}
                    editItem={() => console.log("edit")}
                  />
                </>
              )}
              {route === "menus" && (
                <>
                  <h1 className="font-semibold text-lg">Menus</h1>
                  <Menus />
                </>
              )}
              {route === "dishes" && (
                <>
                  <h1 className="font-semibold text-lg">Dishes</h1>
                  <Dishes />
                </>
              )}
              {route === "users" && (
                <>
                  <h1 className="font-semibold text-lg">Users</h1>
                </>
              )}
            </div>
          </div>
        </main>
      ) : null}
    </div>
  );
};

export default SettingsView;