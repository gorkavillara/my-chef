import React, { useContext, useState } from "react"
import { AdminContext } from ".."
import Menus from "../settings/Menus"
import Dishes from "../settings/Dishes"
import Pairings from "../settings/Pairings"
import Allergies from "../settings/Allergies"
import Users from "../settings/Users"
import Tables from "../settings/Tables"
import General from "../settings/General"
import Integrations from "../settings/Integrations"

const NavItem = ({ name, notification = false, isSelected, onClick }) => (
    <button
        className={`relative px-6 py-3 transition rounded-t-lg cursor-pointer ${
            isSelected ? "z-10" : "opacity-50"
        }
            ${
                notification
                    ? "bg-red-300 text-white font-semibold animate-pulse"
                    : "bg-white"
            }`}
        onClick={onClick}
    >
        <span>{name}</span>
    </button>
)

const NavMenu = ({ store, route, setRoute }) => (
    <div className="flex gap-2 overflow-x-auto">
        <NavItem
            name="General"
            isSelected={route === "main"}
            onClick={() => setRoute("main")}
        />
        <NavItem
            name="Integrations"
            isSelected={route === "integrations"}
            onClick={() => setRoute("integrations")}
        />
        <NavItem
            name="Pairings"
            notification={!store.pairings || store.pairings.length === 0}
            isSelected={route === "pairings"}
            onClick={() => setRoute("pairings")}
        />
        <NavItem
            name="Allergies"
            notification={!store.allergies || store.allergies.length === 0}
            isSelected={route === "allergies"}
            onClick={() => setRoute("allergies")}
        />
        <NavItem
            name="Dishes"
            notification={!store.dishes || store.dishes.length === 0}
            isSelected={route === "dishes"}
            onClick={() => setRoute("dishes")}
        />
        <NavItem
            name="Menus"
            notification={!store.menus || store.menus.length === 0}
            isSelected={route === "menus"}
            onClick={() => setRoute("menus")}
        />
        <NavItem
            name="Tables"
            notification={!store.tables || store.tables.length === 0}
            isSelected={route === "tables"}
            onClick={() => setRoute("tables")}
        />
        <NavItem
            name="Users"
            isSelected={route === "users"}
            onClick={() => setRoute("users")}
        />
    </div>
)

const SettingsView = () => {
    const [route, setRoute] = useState("main")
    const { store } = useContext(AdminContext)
    return (
        <div className="min-h-full w-full flex flex-col">
            <h1 className="font-semibold text-lg p-6 ml-10">Settings</h1>
            {store ? (
                <main className="flex-grow flex flex-col bg-slate-100 px-6 pb-6">
                    <NavMenu store={store} route={route} setRoute={setRoute} />
                    <div className="flex-grow flex flex-col w-full h-full">
                        <div
                            className={`p-6 bg-white flex-grow shadow-lg w-full rounded-b rounded-r ${
                                route !== "main" ? "rounded" : ""
                            } shadow-up flex flex-col gap-4`}
                        >
                            {route === "main" && (
                                <>
                                    <h1 className="font-semibold text-lg">
                                        General
                                    </h1>
                                    <General />
                                </>
                            )}
                            {route === "integrations" && (
                                <>
                                    <h1 className="font-semibold text-lg">
                                        Integrations
                                    </h1>
                                    <Integrations />
                                </>
                            )}
                            {route === "tables" && (
                                <>
                                    <h1 className="font-semibold text-lg">
                                        Tables
                                    </h1>
                                    <Tables />
                                </>
                            )}
                            {route === "menus" && (
                                <>
                                    <h1 className="font-semibold text-lg">
                                        Menus
                                    </h1>
                                    <Menus />
                                </>
                            )}
                            {route === "dishes" && (
                                <>
                                    <h1 className="font-semibold text-lg">
                                        Dishes
                                    </h1>
                                    <Dishes />
                                </>
                            )}
                            {route === "pairings" && (
                                <>
                                    <h1 className="font-semibold text-lg">
                                        Pairings
                                    </h1>
                                    <Pairings />
                                </>
                            )}
                            {route === "allergies" && (
                                <>
                                    <h1 className="font-semibold text-lg">
                                        Allergies
                                    </h1>
                                    <Allergies />
                                </>
                            )}
                            {route === "users" && (
                                <>
                                    <h1 className="font-semibold text-lg">
                                        Users
                                    </h1>
                                    <Users />
                                </>
                            )}
                        </div>
                    </div>
                </main>
            ) : null}
        </div>
    )
}

export default SettingsView
