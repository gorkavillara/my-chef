import React, { useContext, useEffect, useState } from "react"
import { AdminContext } from "../.."
import { changeTime as changeBookingTime } from "../../../../controllers/DBController"

const Time = ({ booking }) => {
    const [loading] = useState<boolean>(false)
    const [time, setTime] = useState<Date>()

    useEffect(() => {
        if (!booking) return
        const t = new Date(booking.time.seconds * 1000)
        setTime(t)
    }, [booking])

    const getTimeInputValue = () => {
        if (!booking || !time) return ""
        const h = time.getHours()
        const m = time.getMinutes()
        return `${h}:${m}`
    }

    const handleTimeChange = (t) => {
        const [h, m] = t.target.value.split(":")
        let newTime = time
        newTime.setHours(h)
        newTime.setMinutes(m)
        setTime(new Date(newTime))
    }

    const { bookings, closeModal } = useContext(AdminContext)
    const changeTime = () => {
        closeModal()
        changeBookingTime({
            booking,
            bookings,
            time,
        }).catch((e) => console.error(e))
    }

    return booking && time ? (
        <div className="flex flex-col gap-4 items-center justify-between">
            <div className="flex flex-col gap-4 items-center">
                <span className="text-lg font-semibold">
                    Change booking time for {booking.table}
                </span>
                <input
                    type="time"
                    name="time"
                    className="outline-none border rounded-lg text-center text-xl focus:ring ring-green-200 px-2 py-1"
                    value={getTimeInputValue()}
                    disabled={loading}
                    onChange={handleTimeChange}
                />
            </div>
            <button
                className="btn-primary-green max-w-lg self-center"
                onClick={changeTime}
                disabled={loading}
            >
                Save changes
            </button>
        </div>
    ) : null
}

export default Time
