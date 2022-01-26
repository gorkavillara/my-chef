import React, { useContext, useState } from "react";
import SidebarIcon from "./SidebarIcon";
import {
  IoAlbumsOutline,
  IoNotificationsOutline,
  IoBarChartOutline,
  IoOptionsOutline,
} from "react-icons/io5";
import CircleButton from "./CircleButton";
import Avatar from "./Avatar";
import { AdminContext } from "..";

const Sidebar = () => {
  const { route, setRoute, openModal, store } = useContext(AdminContext);
  return (
    <div className="fixed left-0 h-full w-20 bg-white flex flex-col py-8 px-2 items-center justify-between">
      <div className="flex flex-col items-center">
        <img src="favicon_256x256.png" className="mb-8" />
        <CircleButton onClick={() => openModal("newBooking", { store })} />
        <div className="flex flex-col items-center text-slate-500 gap-4">
          <SidebarIcon
            icon={<IoAlbumsOutline />}
            isActive={route === "tables"}
            onClick={() => setRoute("tables")}
          />
          <SidebarIcon
            icon={<IoBarChartOutline />}
            isActive={route === "charts"}
            onClick={() => setRoute("charts")}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 text-slate-500">
        <SidebarIcon
          icon={<IoOptionsOutline />}
          isActive={route === "settings"}
          onClick={() => setRoute("settings")}
        />
        <SidebarIcon
          icon={<IoNotificationsOutline />}
          notifications={2}
          onClick={() => null}
        />
        <Avatar image="/paulo.jpg" />
      </div>
    </div>
  );
};

export default Sidebar;
