import React, { useContext, useState } from "react"
import { AdminContext } from ".."
import { Booking } from "../../../models"
import Card from "./Card"

const BookingsDisplay = ({
    filter,
    bookings,
}: {
    filter: string
    bookings: object[]
}) => {
    const { date } = useContext(AdminContext)
    const [expandedCard, setExpandedCard] = useState(null)
    const todayBookings = (booking: Booking) => {
        const d = new Date(booking.time.seconds * 1000)
        return (
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        )
    }
    const changeExpandedCard = (i: number) => {
        if (expandedCard === null) return setExpandedCard(i)
        setExpandedCard(null)
    }
    return bookings ? (
        bookings.filter(todayBookings).length > 0 ? (
            <>
                {filter === "all" && (
                    <main className="flex-grow bg-slate-100 px-0 pb-6 gap-4 sm:gap-0 h-full">
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4 relative">
                            {bookings ? (
                                bookings
                                    .filter(
                                        (booking: Booking) =>
                                            booking.status === "open"
                                    )
                                    .filter(todayBookings)
                                    .map((booking: Booking, i) => (
                                        <Card
                                            booking={booking}
                                            expanded={expandedCard === i}
                                            onClick={() =>
                                                changeExpandedCard(i)
                                            }
                                            key={i}
                                        />
                                    ))
                            ) : (
                                <h1>Cargando...</h1>
                            )}
                        </div>
                        <div className="relative">
                            <div className="flex overflow-x-auto space-x-8 py-10 pl-6 pr-12 relative">
                                {bookings ? (
                                    bookings
                                        .filter(
                                            (booking: Booking) =>
                                                !booking.status ||
                                                booking.status === "waiting"
                                        )
                                        .filter(todayBookings)
                                        .map((booking: Booking, i) => (
                                            <Card
                                                booking={booking}
                                                expanded={false}
                                                onClick={() =>
                                                    changeExpandedCard(i)
                                                }
                                                key={i}
                                            />
                                        ))
                                ) : (
                                    <h1>Cargando</h1>
                                )}
                            </div>
                            <div className="h-full w-16 absolute top-0 right-0 horizontal-transparent"></div>
                        </div>
                    </main>
                )}
                {filter === "open" && (
                    <main className="flex-grow bg-slate-100 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4 relative h-full">
                        {bookings ? (
                            bookings
                                .filter(
                                    (booking: Booking) =>
                                        booking.status === "open"
                                )
                                .filter(todayBookings)
                                .map((booking: Booking, i) => (
                                    <Card
                                        booking={booking}
                                        expanded={expandedCard === i}
                                        onClick={() =>
                                            changeExpandedCard(i)
                                        }
                                        key={i}
                                    />
                                ))
                        ) : (
                            <h1>Cargando</h1>
                        )}
                    </main>
                )}
                {filter === "closed" && (
                    <main className="flex-grow bg-slate-100 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-4 relative h-full">
                        {bookings ? (
                            bookings
                                .filter(
                                    (booking: Booking) =>
                                        booking.status === "closed"
                                )
                                .filter(todayBookings)
                                .map((booking: Booking, i) => (
                                    <Card
                                        booking={booking}
                                        expanded={expandedCard === i}
                                        onClick={() =>
                                            changeExpandedCard(i)
                                        }
                                        key={i}
                                    />
                                ))
                        ) : (
                            <h1>Cargando</h1>
                        )}
                    </main>
                )}
                {expandedCard !== null && (
                    <div
                        className="absolute left-0 right-0 z-40 w-full h-full bg-slate-100 opacity-70"
                        onClick={() => setExpandedCard(null)}
                    ></div>
                )}
            </>
        ) : (
            <div className="flex justify-center py-32">
                <span className="text-lg font-semibold text-slate-500">
                    There are no bookings for today...
                </span>
            </div>
        )
    ) : null
}

export default BookingsDisplay
