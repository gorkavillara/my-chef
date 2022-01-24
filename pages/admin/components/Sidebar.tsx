import React from "react";
import SidebarIcon from "./SidebarIcon";
import { IoAlbumsOutline, IoNotificationsOutline } from "react-icons/io5";
import CircleButton from "./CircleButton";
import Avatar from "./Avatar";

const Sidebar = () => {
  return (
    <div className="fixed left-0 h-full w-20 bg-white flex flex-col py-8 px-2 items-center justify-between">
      <div className="flex flex-col items-center">
        <img src="favicon_256x256.png" className="mb-8" />
        <CircleButton />
        <div className="flex flex-col items-center text-slate-500 gap-4">
          <SidebarIcon icon={<IoAlbumsOutline />} isActive={false} />
          <SidebarIcon icon={<IoAlbumsOutline />} isActive={false} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 text-slate-500">
        <SidebarIcon icon={<IoNotificationsOutline />} isActive={false} notifications={2} />
        <Avatar image="/paulo.jpg" />
      </div>
    </div>
  );
};

export default Sidebar;
