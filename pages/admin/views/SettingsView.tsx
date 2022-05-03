import React, { useContext, useState } from "react"
import { AdminContext } from ".."
import Menus from "../settings/Menus"
import Dishes from "../settings/Dishes"
import Pairings from "../settings/Pairings"
import Users from "../settings/Users"
import Tables from "../settings/Tables"
import General from "../settings/General"
import Integrations from "../settings/Integrations"

const NavMenu = ({ route, setRoute }) => (
    <div className="flex gap-2 overflow-x-auto">
        <span
            className={`px-6 py-3 transition bg-white rounded-t-lg cursor-pointer ${
                route === "main" ? "z-10" : "opacity-50"
            }`}
            onClick={() => setRoute("main")}
        >
            General
        </span>
        <span
            className={`px-6 py-3 transition bg-white rounded-t-lg cursor-pointer ${
                route === "integrations" ? "z-10" : "opacity-50"
            }`}
            onClick={() => setRoute("integrations")}
        >
            Integrations
        </span>
        <span
            className={`px-6 py-3 transition bg-white rounded-t-lg cursor-pointer ${
                route === "menus" ? "z-10" : "opacity-50"
            }`}
            onClick={() => setRoute("menus")}
        >
            Menus
        </span>
        <span
            className={`px-6 py-3 transition bg-white rounded-t-lg cursor-pointer ${
                route === "dishes" ? "z-10" : "opacity-50"
            }`}
            onClick={() => setRoute("dishes")}
        >
            Dishes
        </span>
        <span
            className={`px-6 py-3 transition bg-white rounded-t-lg cursor-pointer ${
                route === "pairings" ? "z-10" : "opacity-50"
            }`}
            onClick={() => setRoute("pairings")}
        >
            Pairings
        </span>
        <span
            className={`px-6 py-3 transition bg-white rounded-t-lg cursor-pointer ${
                route === "tables" ? "z-10" : "opacity-50"
            }`}
            onClick={() => setRoute("tables")}
        >
            Tables
        </span>
        <span
            className={`px-6 py-3 transition bg-white rounded-t-lg cursor-pointer ${
                route === "users" ? "z-10" : "opacity-50"
            }`}
            onClick={() => setRoute("users")}
        >
            Users
        </span>
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
                    <NavMenu route={route} setRoute={setRoute} />
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
