import React, { useContext } from "react"
import TablesView from "./TablesView"
import ChartsView from "./ChartsView"
import { AdminContext } from ".."
import SettingsView from "./SettingsView"
import CalendarView from "./CalendarView"

const MainDashboard = () => {
    const { route, expanded } = useContext(AdminContext)
    return (
        <div
            className={`transition-all ${
                expanded ? "ml-20" : "ml-0"
            } flex-grow bg-slate-100 min-h-full`}
        >
            {route === "tables" && <TablesView />}
            {route === "charts" && <ChartsView />}
            {route === "calendar" && <CalendarView />}
            {route === "settings" && <SettingsView />}
        </div>
    )
}

export default MainDashboard
