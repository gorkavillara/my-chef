import React, { useContext } from "react"
import { GiWineGlass } from "react-icons/gi"
import { BiDish } from "react-icons/bi"
import { AdminContext } from "../.."
import { Booking } from "../../../../models"
import DishDisplayInactive from "../DishDisplayInactive"
import Timer from "./Timer"

const InactiveCard = ({
    booking,
    onClick,
    watchTime,
    timeLimit,
    stopped,
}: {
    booking: Booking
    onClick: any
    watchTime: number
    timeLimit: number
    stopped: boolean
}) => {
    const { openModal } = useContext(AdminContext)
    const time = booking ? new Date(booking.time.seconds * 1000) : new Date()

    return booking ? (
        <div
            className="relative flex flex-col rounded-xl bg-white"
            onClick={onClick}
        >
            <div className="grid grid-cols-2 p-2">
                <div
                    className={`
                    col-span-2 flex items-center gap-4 rounded-lg p-2 text-left
                    ${
                        booking.dinnerStatus === "arrived" &&
                        "bg-yellow-100 text-yellow-600"
                    }
                    ${
                        booking.dinnerStatus === "seated" &&
                        "bg-green-100 text-green-600"
                    }
                `}
                >
                    <span className="text-3xl font-semibold">TABLE: </span>
                    <span>{booking.table}</span>
                </div>
                <div className="flex flex-wrap gap-1 p-1">
                    <span className="font-semibold">NAME: </span>
                    <span>{booking.name}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1 p-1">
                    <span className="font-semibold">ALLERG:</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 p-1 text-sm text-white">
                        <span>
                            {booking.allergies
                                ? booking.allergies.length
                                : "none"}
                        </span>
                    </span>
                </div>
                <div className="flex flex-wrap gap-1 p-1">
                    <span className="font-semibold">TIME: </span>
                    <span>
                        {time.toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
                <div className="flex flex-wrap gap-1 p-1">
                    <span className="font-semibold">NATION: </span>
                    <span>{booking.nationality}</span>
                </div>
            </div>
            {booking.menu?.dishes ? (
                <div className="border-t">
                    <div className="flex items-center justify-between gap-4 py-1 px-2 text-lg text-slate-800">
                        <span className="p-1">
                            <BiDish />
                        </span>
                        <span className="p-1">
                            <GiWineGlass />
                        </span>
                    </div>
                    {booking.menu.dishes.map((dish, i) => (
                        <DishDisplayInactive
                            key={i}
                            dish={dish}
                            booking={booking}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 border-t p-4">
                    <span className="text-center">
                        There is no menu assigned to this booking
                    </span>
                    <button
                        className="btn-primary-green"
                        onClick={() => openModal("menu", { booking })}
                    >
                        Choose Menu
                    </button>
                </div>
            )}
            <div className="flex flex-grow border-t">
                <div className="flex flex-grow items-center p-2 text-left">
                    <h1 className="text-sm font-semibold">Notes</h1>
                    <span className="text-sm">{booking.notes}</span>
                </div>
                {booking.status === "open" && (
                    <div
                        className={`flex items-center rounded-br-xl p-2 outline-none transition 
                  ${
                      !booking.greeted || booking.greeted === ""
                          ? "border-l text-red-500"
                          : ""
                  }
                  ${
                      booking.greeted === "greeting"
                          ? "border-l bg-yellow-100 text-yellow-600"
                          : ""
                  }
                  ${
                      booking.greeted === "greeted"
                          ? "bg-green-400 text-white line-through"
                          : ""
                  }
                      `}
                    >
                        <h1 className="py-4 text-sm font-semibold">Welcome</h1>
                    </div>
                )}
            </div>
            <Timer
                watchTime={watchTime}
                timeLimit={timeLimit}
                stopped={stopped}
            />
        </div>
    ) : null
}

export default InactiveCard
