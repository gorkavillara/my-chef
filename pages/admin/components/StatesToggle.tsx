import React, { MouseEventHandler } from "react"
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi"

type ToggleTypes = {
    status: string
    onClick: MouseEventHandler
}

const Toggle = ({ status, onClick }: ToggleTypes) => {
    return (
        <div
            onClick={onClick}
            className={`w-4 h-4 rounded-sm flex justify-center items-center ${
                status === "necessary" && "bg-yellow-300"
            } ${status === "pending" && "bg-orange-300"} ${
                status === "done" && "bg-green-300"
            } ${status === "unnecessary" && "bg-slate-100"}`}
        >
            {status === "pending" && <HiOutlineMinus className="rotate-45" />}
            {status === "done" && <HiOutlinePlus className="rotate-45" />}
        </div>
    )
}

export default Toggle
