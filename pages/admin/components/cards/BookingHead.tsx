import React, { useContext } from "react"
import { AdminContext } from "../.."
import { Booking } from "../../../../models"
import AllergiesList from "../AllergiesList"

const BookingHead = ({ booking }: { booking: Booking }) => {
    const { openModal } = useContext(AdminContext)
    const time = booking ? new Date(booking.time.seconds * 1000) : new Date()
    return (
        <div className="grid grid-cols-2 p-4 text-xl">
            <label className="p-1">
                <span className="font-semibold">PAX: </span>
                <span>{booking.pax}</span>
            </label>
            <button
                onClick={() => openModal("changeTable", booking)}
                className="text-left p-1"
            >
                <span className="font-semibold">TABLE: </span>
                <span>{booking.table}</span>
            </button>
            <label className="p-1 flex gap-1 flex-wrap">
                <span className="font-semibold">NAME: </span>
                <span>{booking.name}</span>
            </label>
            <div
                onClick={() => openModal("allergies", booking)}
                className="p-1 flex gap-1 flex-wrap"
            >
                <span className="font-semibold">ALLERGIES:</span>
                {booking.allergies ? (
                    <AllergiesList
                        allergies={booking.allergies}
                        style="display"
                    />
                ) : (
                    "none"
                )}
            </div>
            <div
                onClick={() => openModal("time", booking)}
                className="p-1 flex gap-1 flex-wrap"
            >
                <span className="font-semibold">TIME: </span>
                <span>
                    {time.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
            <div
                onClick={() => openModal("nationality", booking)}
                className="p-1 flex gap-1 flex-wrap"
            >
                <span className="font-semibold">NATIONALITY: </span>
                <span>{booking.nationality}</span>
            </div>
        </div>
    )
}

export default BookingHead
