import React, { MouseEventHandler } from "react"

type SidebarIconProps = {
    icon: JSX.Element
    isActive?: boolean
    notifications?: number
    onClick: MouseEventHandler
}

const SidebarIcon = ({
    icon,
    isActive = false,
    notifications = 0,
    onClick,
}: SidebarIconProps) => {
    return (
        <>
            <button
                className={`text-3xl ${isActive && "text-green-600"} relative`}
                onClick={onClick}
            >
                {icon}
                {notifications > 0 && (
                    <span className="absolute right-0 top-0 w-2 h-2 rounded-full bg-red-500"></span>
                )}
            </button>
        </>
    )
}

export default SidebarIcon
