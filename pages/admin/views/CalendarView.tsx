import React, { useContext, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { BsChevronLeft } from "react-icons/bs"
import { AdminContext } from ".."
import { Booking } from "../../../models"

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(dayjs())
    const { bookings, setRoute, setDate } = useContext(AdminContext)

    const getMonth = () => {
        const month = Math.floor(currentDate.month())
        const year = currentDate.year()
        const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
        let currentMonthCount = 0 - firstDayOfTheMonth
        const daysMatrix = new Array(5).fill([]).map(() => {
            return new Array(7).fill(null).map(() => {
                currentMonthCount++
                return dayjs(new Date(year, month, currentMonthCount + 1))
            })
        })
        return daysMatrix
    }

    const dayBookings = (booking: Booking, date: Dayjs) => {
        const d = dayjs(new Date(booking.time.seconds * 1000))
        return d.format("DD-MM-YY") === date.format("DD-MM-YY")
    }

    return bookings ? (
        <div className="flex flex-col gap-4 p-6">
            <h1 className="font-semibold text-lg text-left ml-10">
                Bookings Calendar
            </h1>
            <div className="bg-white w-full rounded flex-col gap-2 shadow">
                <div className="flex gap-2 py-2 px-4 items-center justify-between">
                    <div className="flex gap-1">
                        <h1 className="font-bold text-slate-800">
                            {dayjs(
                                new Date(
                                    currentDate.year(),
                                    currentDate.month(),
                                    1
                                )
                            ).format("MMMM")}
                        </h1>
                        <span className="text-slate-500">
                            {dayjs(
                                new Date(
                                    currentDate.year(),
                                    currentDate.month(),
                                    1
                                )
                            ).format("YYYY")}
                        </span>
                    </div>
                    <div className="border border-slate-200 py-2 divide-x rounded flex items-center text-slate-600 font-semibold">
                        <button
                            className="px-2"
                            onClick={() => {
                                const newDate = currentDate.subtract(1, "month")
                                setCurrentDate(newDate)
                            }}
                        >
                            <BsChevronLeft />
                        </button>
                        <button
                            className="px-2"
                            onClick={() => {
                                const newDate = currentDate.add(1, "month")
                                setCurrentDate(newDate)
                            }}
                        >
                            <BsChevronLeft className="rotate-180" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-rows-7">
                    {getMonth().map((week, wid) => (
                        <div key={wid} className="grid grid-cols-7 h-24">
                            {new Array(7).fill(null).map((a, did) => (
                                <div
                                    key={did}
                                    className="border flex flex-col gap-1 py-1 px-2 relative items-baseline"
                                    onClick={() => {
                                        setRoute("tables")
                                        setDate(week[did].toDate())
                                    }}
                                >
                                    {wid === 0 && (
                                        <span className="absolute top-1 w-full text-center text-slate-400 font-bold uppercase">
                                            {weekdays[did]}
                                        </span>
                                    )}
                                    <span
                                        className={`
                    ${
                        week[did].format("DD-MM-YY") ===
                        dayjs().format("DD-MM-YY")
                            ? "px-2 bg-green-400 text-white rounded-full"
                            : ""
                    }
                    ${
                        week[did].month() !== currentDate.month()
                            ? "opacity-30"
                            : ""
                    }`}
                                    >
                                        {week[did].date()}
                                    </span>
                                    <div className="hidden lg:flex lg:flex-col lg:gap-1 w-full">
                                        {bookings
                                            .filter((b) =>
                                                dayBookings(b, week[did])
                                            )
                                            .map((b, i) => (
                                                <React.Fragment key={i}>
                                                    {i === 0 ? (
                                                        <div className="w-full text-sm text-center rounded-full bg-blue-300 p-1">
                                                            {dayjs(
                                                                new Date(
                                                                    b.time
                                                                        .seconds *
                                                                        1000
                                                                )
                                                            ).format(
                                                                "HH:mm"
                                                            )}{" "}
                                                            {b.name} {b.pax}p
                                                        </div>
                                                    ) : i === 1 ? (
                                                        <div className="w-full text-sm text-center rounded-full bg-slate-200 p-1">
                                                            See more...
                                                        </div>
                                                    ) : null}
                                                </React.Fragment>
                                            ))}
                                    </div>
                                    <div className="lg:hidden w-full">
                                        {bookings.filter((b) =>
                                            dayBookings(b, week[did])
                                        ).length > 0 && (
                                            <div className="w-full text-sm text-center rounded-full bg-blue-200 p-1">
                                                {bookings.filter((b) =>
                                                    dayBookings(b, week[did])
                                                ).length === 1
                                                    ? "1 booking"
                                                    : `${
                                                          bookings.filter((b) =>
                                                              dayBookings(
                                                                  b,
                                                                  week[did]
                                                              )
                                                          ).length
                                                      } bookings`}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null
}

export default CalendarView
