import React, { useContext } from "react"
import { GiCrabClaw, GiWineGlass } from "react-icons/gi"
import { AdminContext } from "../.."
import { Booking } from "../../../../models"
import DishDisplayInactive from "../DishDisplayInactive"

const InactiveCard = ({
    booking,
    onClick,
    watchTime,
    timeLimit,
}: {
    booking: Booking
    onClick: any
    watchTime: number
    timeLimit: number
}) => {
    const { openModal } = useContext(AdminContext)
    const time = booking ? new Date(booking.time.seconds * 1000) : new Date()

    return booking ? (
        <div
            className="bg-white rounded-xl relative flex flex-col"
            onClick={onClick}
        >
            <div className="grid grid-cols-2 p-2">
                <div className="text-left p-1 col-span-2 flex items-center gap-4">
                    <span className="font-semibold text-3xl">TABLE: </span>
                    <span>{booking.table}</span>
                </div>
                <div className="p-1 flex gap-1 flex-wrap">
                    <span className="font-semibold">NAME: </span>
                    <span>{booking.name}</span>
                </div>
                <div className="p-1 flex gap-1 flex-wrap items-center">
                    <span className="font-semibold">ALLERG:</span>
                    <span className="w-5 h-5 rounded-full text-sm bg-red-400 text-white flex justify-center items-center p-1">
                        <span>
                            {booking.allergies
                                ? booking.allergies.length
                                : "none"}
                        </span>
                    </span>
                </div>
                <div className="p-1 flex gap-1 flex-wrap">
                    <span className="font-semibold">TIME: </span>
                    <span>
                        {time.toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
                <div className="p-1 flex gap-1 flex-wrap">
                    <span className="font-semibold">NATION: </span>
                    <span>{booking.nationality}</span>
                </div>
            </div>
            {booking.menu?.dishes ? (
                <div className="border-t">
                    <div className="flex py-1 px-2 gap-4 items-center justify-between text-lg text-slate-800">
                        <span className="p-1">
                            <GiCrabClaw />
                        </span>
                        <div
                            className={`${
                                booking.pairings
                                    ? booking.pairings?.length === 0
                                        ? "bg-red-100"
                                        : "bg-green-100"
                                    : "bg-red-100"
                            } p-1 rounded-lg`}
                        >
                            <GiWineGlass />
                        </div>
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
                <div className="border-t p-4 flex flex-col items-center gap-4">
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
                <div className="flex-grow p-2 text-left items-center flex">
                    <h1 className="text-sm font-semibold">Notes</h1>
                    <span className="text-sm">{booking.notes}</span>
                </div>
                {booking.status === "open" && (
                    <div
                        className={`p-2 flex rounded-br-xl transition items-center outline-none 
                  ${
                      !booking.greeted || booking.greeted === ""
                          ? "border-l text-red-500"
                          : ""
                  }
                  ${
                      booking.greeted === "greeting"
                          ? "border-l text-yellow-600 bg-yellow-100"
                          : ""
                  }
                  ${
                      booking.greeted === "greeted"
                          ? "text-white bg-green-400 line-through"
                          : ""
                  }
                      `}
                    >
                        <h1 className="text-sm font-semibold py-4">Welcome</h1>
                    </div>
                )}
            </div>
            {watchTime > 700 && timeLimit > 0 && (
                <div className="absolute w-full -top-6 flex justify-center">
                    <span
                        className={`rounded-lg shadow-lg px-4 text-2xl font-semibold w-32 flex justify-center ${
                            watchTime < 0.75 * timeLimit * 60000
                                ? "bg-white"
                                : watchTime < timeLimit * 60000
                                ? "bg-yellow-400"
                                : "bg-red-400 animate-bounce"
                        }
                    `}
                    >
                        <span>
                            {("0" + Math.floor((watchTime / 60000) % 60)).slice(
                                -2
                            )}
                            :
                        </span>
                        <span>
                            {("0" + Math.floor((watchTime / 1000) % 60)).slice(
                                -2
                            )}
                        </span>
                    </span>
                </div>
            )}
            {watchTime > 700 && (
                <div className="absolute w-full -top-6 flex justify-center">
                    <span
                        className={`rounded-lg shadow-lg px-4 text-2xl font-semibold w-32 flex justify-center ${
                            timeLimit === 0 ||
                            watchTime < 0.75 * timeLimit * 60000
                                ? "bg-white"
                                : watchTime < timeLimit * 60000
                                ? "bg-yellow-400"
                                : "bg-red-400 animate-bounce text-white"
                        }
                `}
                    >
                        <span>
                            {("0" + Math.floor((watchTime / 60000) % 60)).slice(
                                -2
                            )}
                            :
                        </span>
                        <span>
                            {("0" + Math.floor((watchTime / 1000) % 60)).slice(
                                -2
                            )}
                        </span>
                    </span>
                </div>
            )}
        </div>
    ) : null
}

export default InactiveCard
