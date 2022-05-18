import React, { useContext } from "react"
import { AdminContext } from "../.."
import { Booking } from "../../../../models"

const PendingCard = ({ booking }: { booking: Booking }) => {
    const { openModal } = useContext(AdminContext)
    const time = booking ? new Date(booking.time.seconds * 1000) : new Date()
    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden relative flex justify-between flex-shrink-0">
            <div className="flex p-1">
                <div className="flex flex-col">
                    <label className="p-1 flex gap-1 flex-wrap">
                        <span className="font-semibold">NAME: </span>
                        <span>{booking.name}</span>
                    </label>
                    <label className="p-1">
                        <span className="font-semibold">PAX: </span>
                        <span>{booking.pax}</span>
                    </label>
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => openModal("changeTable", booking)}
                        className="text-left p-1"
                    >
                        <span className="font-semibold">TABLE: </span>
                        <span>{booking.table}</span>
                    </button>
                    <div
                        onClick={() => openModal("time", booking)}
                        className="p-1 flex gap-1"
                    >
                        <span className="font-semibold">TIME: </span>
                        <span>
                            {time.toLocaleTimeString("es-ES", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                </div>
            </div>
            <button
                className="flex border-t bg-green-400 text-white justify-center items-center text-sm px-4 cursor-pointer active:bg-green-500"
                onClick={() => openModal("openBooking", booking)}
            >
                Open Table
            </button>
        </div>
    )
}

export default PendingCard
