import React, { useContext } from "react";
import SidebarIcon from "./SidebarIcon";
import {
  IoAlbumsOutline,
  IoNotificationsOutline,
  IoBarChartOutline,
  IoOptionsOutline,
  IoCalendarClearOutline,
} from "react-icons/io5";
import CircleButton from "./CircleButton";
import Avatar from "./Avatar";
import { AdminContext } from "..";
import Image from "next/image";

const Sidebar = () => {
  const { route, setRoute, openModal, store } = useContext(AdminContext);
  return (
    <div className="fixed left-0 h-full w-20 bg-white flex flex-col py-8 px-2 items-center justify-between">
      <div className="flex flex-col items-center">
        <picture className="mb-8">
          <Image src="/favicon_256x256.png" width={256} height={256} alt="icon" />
        </picture>
        <CircleButton onClick={() => openModal("newBooking", { store })} />
        <div className="flex flex-col items-center text-slate-500 gap-6">
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
          <SidebarIcon
            icon={<IoCalendarClearOutline />}
            isActive={route === "calendar"}
            onClick={() => setRoute("calendar")}
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
