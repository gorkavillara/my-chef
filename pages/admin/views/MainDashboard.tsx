import React, { useContext } from "react"
import TablesView from "./TablesView"
import ChartsView from "./ChartsView"
import { AdminContext } from ".."
import SettingsView from "./SettingsView"
import CalendarView from "./CalendarView"
import ProfileView from "./ProfileView"

const MainDashboard = () => {
    const { route, expanded } = useContext(AdminContext)
    return (
        <div
            className={`transition-all ${
                expanded ? "sm:ml-20" : "sm:ml-0"
            } flex-grow bg-slate-100 h-full w-screen`}
        >
            {route === "tables" && <TablesView />}
            {route === "charts" && <ChartsView />}
            {route === "calendar" && <CalendarView />}
            {route === "settings" && <SettingsView />}
            {route === "profile" && <ProfileView />}
        </div>
    )
}

export default MainDashboard
