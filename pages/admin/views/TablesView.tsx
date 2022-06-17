import React, { useContext, useState } from "react"
import toast from "react-hot-toast"
import { IoRefresh } from "react-icons/io5"
import { AdminContext } from ".."
import { Booking } from "../../../models"
import BookingsDisplay from "../components/BookingsDisplay"
import MottoPhrase from "../components/MottoPhrase"

const TablesView = () => {
    const [filter, setFilter] = useState("all")
    const [loading, setLoading] = useState(false)
    const { bookings, date, refreshBookings, store } = useContext(AdminContext)
    const todayBookings = (booking: Booking) => {
        const d = new Date(booking.time.seconds * 1000)
        return (
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        )
    }
    const refBookings = async () => {
        setLoading(true)
        toast.promise(refreshBookings(), {
            loading: "Updating today's bookings",
            success: (r: Array<Object>) => {
                setLoading(false)
                return `We found ${r.length} bookings`
            },
            error: (e) => {
                setLoading(false)
                console.error(e)
                return "Oops, there was a problem! We could not update today's bookings 😨"
            },
        })
    }
    return bookings ? (
        <div className="flex min-h-full w-full flex-col bg-slate-100 px-4 pb-16">
            <div className="flex flex-col items-center justify-between gap-2 py-5 sm:flex-row sm:pl-6">
                <div className="flex items-center justify-center gap-2">
                    <h1 className="ml-10 text-lg font-semibold">
                        Bookings: {date.toLocaleDateString("en-GB")}
                    </h1>
                    {store?.settings.integrations?.find(
                        (int) => int.provider === "sevenrooms"
                    ) && (
                        <button
                            onClick={refBookings}
                            className={`px-4 text-3xl text-blue-500 sm:text-4xl ${
                                loading ? "animate-spin" : ""
                            }`}
                        >
                            <IoRefresh />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-2 px-6 text-sm sm:text-base">
                    <button
                        onClick={() => setFilter("all")}
                        className={`${
                            filter === "all"
                                ? "btn-primary-blue px-4 py-1"
                                : "btn-secondary-blue px-4 py-1"
                        }`}
                    >
                        All (
                        {
                            bookings
                                .filter(todayBookings)
                                .filter(
                                    (booking: Booking) =>
                                        booking.status !== "deleted"
                                ).length
                        }
                        )
                    </button>
                    <button
                        onClick={() => setFilter("open")}
                        className={`${
                            filter === "open"
                                ? "btn-primary-blue px-4 py-1"
                                : "btn-secondary-blue px-4 py-1"
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
                                ? "btn-primary-blue px-4 py-1"
                                : "btn-secondary-blue px-4 py-1"
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
        </div>
    ) : null
}

export default TablesView
