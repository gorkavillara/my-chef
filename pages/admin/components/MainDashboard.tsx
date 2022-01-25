import React, { useContext } from "react";
import TablesView from "../views/TablesView";
import ChartsView from "../views/ChartsView";
import ComponentsView from "../views/ComponentsView";
import { AdminContext } from "..";

const MainDashboard = () => {
  const { route } = useContext(AdminContext);
  return (
    <div className="ml-20 flex-grow bg-slate-100 min-h-screen">
      {route === "tables" && <TablesView />}
      {route === "charts" && <ChartsView />}
      {route === "settings" && <ComponentsView />}
    </div>
  );
};

export default MainDashboard;
