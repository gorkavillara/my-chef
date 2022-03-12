import React, { useContext } from "react"
import SidebarIcon from "./SidebarIcon"
import {
    IoAlbumsOutline,
    IoNotificationsOutline,
    IoBarChartOutline,
    IoOptionsOutline,
    IoCalendarClearOutline,
} from "react-icons/io5"
import { AiOutlineDoubleLeft } from "react-icons/ai"
import CircleButton from "./CircleButton"
import Avatar from "./Avatar"
import { AdminContext } from ".."
import Image from "next/image"

const Sidebar = () => {
    const { route, setRoute, openModal, store, setDate, expanded, setExpanded } =
        useContext(AdminContext)
    const toggleSidebar = () => setExpanded(!expanded)
    return (
        <div
            className={`fixed transition-all h-full w-20 bg-white flex flex-col py-8 px-2 items-center justify-between ${
                expanded ? "left-0" : "-left-20"
            }`}
        >
            <div className="flex flex-col items-center">
                <button
                    onClick={() => {
                        setRoute("tables")
                        setDate(new Date())
                    }}
                >
                    <picture className="mb-8">
                        <Image
                            src="/favicon_color2d_256x256.png"
                            width={256}
                            height={256}
                            alt="icon"
                        />
                    </picture>
                </button>
                <CircleButton
                    onClick={() => openModal("newBooking", { store })}
                />
                <div className="flex flex-col items-center text-slate-500 gap-6">
                    <SidebarIcon
                        icon={<IoAlbumsOutline />}
                        isActive={route === "tables"}
                        onClick={() => {
                            setRoute("tables")
                            setDate(new Date())
                        }}
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
            <button
                className="absolute bg-white rounded-r-full w-12 h-12 bottom-8 left-20 flex justify-center gap-0 items-center"
                onClick={toggleSidebar}
            >
                <span className="text-3xl font-bold text-slate-800">
                    {expanded ? (
                        <AiOutlineDoubleLeft />
                    ) : (
                        <AiOutlineDoubleLeft className="rotate-180" />
                    )}
                </span>
            </button>
        </div>
    )
}

export default Sidebar
