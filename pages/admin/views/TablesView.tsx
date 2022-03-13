import React, { useContext, useState } from "react"
import { IoCaretBack, IoCaretForward, IoPrintOutline } from "react-icons/io5"
import { AdminContext } from ".."
import { Booking } from "../../../models"
import BookingsDisplay from "../components/BookingsDisplay"
import MottoPhrase from "../components/MottoPhrase"

const TablesView = () => {
    const [filter, setFilter] = useState("all")
    const { bookings, date, setDate } = useContext(AdminContext)
    const todayBookings = (booking: Booking) => {
        const d = new Date(booking.time.seconds * 1000)
        return (
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        )
    }
    return bookings ? (
        <>
            <div className="flex items-center justify-between pl-6 py-5">
                <div className="flex gap-2 items-center justify-center">
                    <h1 className="font-semibold text-lg ml-10">Bookings:</h1>
                    <button
                        className="bg-slate-300 p-1 rounded hidden"
                        onClick={() => {
                            const newDate = date.valueOf() - 3600 * 1000 * 24
                            setDate(new Date(newDate))
                        }}
                    >
                        <IoCaretBack />
                    </button>
                    <h1 className="font-semibold text-lg">
                        {date.toLocaleDateString("en-GB")}
                    </h1>
                    <button
                        className="bg-slate-300 p-1 rounded hidden"
                        onClick={() => {
                            const newDate = date.valueOf() + 3600 * 1000 * 24
                            setDate(new Date(newDate))
                        }}
                    >
                        <IoCaretForward />
                    </button>
                </div>
                <div className="flex items-center gap-2 px-6">
                    <button className="text-blue-500 text-4xl px-4">
                        <IoPrintOutline />
                    </button>
                    <button
                        onClick={() => setFilter("all")}
                        className={`${
                            filter === "all"
                                ? "btn-primary-blue"
                                : "btn-secondary-blue"
                        }`}
                    >
                        All ({bookings.filter(todayBookings).length})
                    </button>
                    <button
                        onClick={() => setFilter("open")}
                        className={`${
                            filter === "open"
                                ? "btn-primary-blue"
                                : "btn-secondary-blue"
                        }`}
                    >
                        Open (
                        {
                            bookings
                                .filter(
                                    (booking: Booking) =>
                                        booking.status === "open"
                                )
                                .filter(todayBookings).length
                        }
                        )
                    </button>
                    <button
                        onClick={() => setFilter("closed")}
                        className={`${
                            filter === "closed"
                                ? "btn-primary-blue"
                                : "btn-secondary-blue"
                        }`}
                    >
                        Closed (
                        {
                            bookings
                                .filter(
                                    (booking: Booking) =>
                                        booking.status === "closed"
                                )
                                .filter(todayBookings).length
                        }
                        )
                    </button>
                </div>
            </div>
            <BookingsDisplay bookings={bookings} filter={filter} />
            <MottoPhrase />
        </>
    ) : null
}

export default TablesView
