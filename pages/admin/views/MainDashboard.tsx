import React, { useContext } from "react";
import TablesView from "./TablesView";
import ChartsView from "./ChartsView";
import { AdminContext } from "..";
import SettingsView from "./SettingsView";

const MainDashboard = () => {
  const { route } = useContext(AdminContext);
  return (
    <div className="ml-20 flex-grow bg-slate-100 min-h-screen">
      {route === "tables" && <TablesView />}
      {route === "charts" && <ChartsView />}
      {route === "settings" && <SettingsView />}
    </div>
  );
};

export default MainDashboard;
