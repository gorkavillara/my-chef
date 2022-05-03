import React, { useContext } from "react"
import SidebarIcon from "./SidebarIcon"
import {
    IoAlbumsOutline,
    // IoNotificationsOutline,
    // IoBarChartOutline,
    IoOptionsOutline,
    IoCalendarClearOutline,
} from "react-icons/io5"
import { AiOutlineDoubleLeft } from "react-icons/ai"
import CircleButton from "./CircleButton"
import Avatar from "./Avatar"
import { AdminContext } from ".."
import Image from "next/image"

const Sidebar = () => {
    const {
        route,
        setRoute,
        openModal,
        store,
        setDate,
        expanded,
        setExpanded,
        user,
    } = useContext(AdminContext)
    const toggleSidebar = () => setExpanded(!expanded)
    return (
        <div
        className={`fixed bottom-0 w-full h-20 flex flex-row sm:flex-col z-50 justify-evenly items-center transition-all bg-white sm:h-full sm:w-20 sm:py-8 sm:px-2 sm:justify-between ${expanded ? "sm:left-0" : "sm:-left-20"}`}
        >
            <div className="flex flex-row sm:flex-col items-center gap-4">
                <button
                    onClick={() => {
                        setRoute("tables")
                        setDate(new Date())
                    }}
                >
                    <picture className="hidden sm:flex w-16 justify-center items-center sm:mb-8">
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
                <div className="flex flex-row sm:flex-col items-center text-slate-500 gap-6">
                    <SidebarIcon
                        icon={<IoAlbumsOutline />}
                        isActive={route === "tables"}
                        onClick={() => {
                            setRoute("tables")
                            setDate(new Date())
                        }}
                    />
                    {/* <SidebarIcon
                        icon={<IoBarChartOutline />}
                        isActive={route === "charts"}
                        onClick={() => setRoute("charts")}
                    /> */}
                    <SidebarIcon
                        icon={<IoCalendarClearOutline />}
                        isActive={route === "calendar"}
                        onClick={() => setRoute("calendar")}
                    />
                </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center gap-8 text-slate-500">
                <SidebarIcon
                    icon={<IoOptionsOutline />}
                    isActive={route === "settings"}
                    onClick={() => setRoute("settings")}
                />
                {/* <SidebarIcon
                    icon={<IoNotificationsOutline />}
                    notifications={2}
                    onClick={() => null}
                /> */}
                <button onClick={() => setRoute("profile")}>
                    <Avatar image={user?.photoURL} />
                </button>
            </div>
            <button
                className="hidden sm:flex absolute bg-white rounded-r-full w-12 h-12 top-4 left-20 justify-center gap-0 items-center"
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
