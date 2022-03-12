import React, { useContext, useEffect, useState } from "react"
import { GiCrabClaw, GiWineGlass } from "react-icons/gi"
import { HiOutlinePlus } from "react-icons/hi"
import { BsThreeDots } from "react-icons/bs"
import { Booking, Dish } from "../../../models"
import AllergiesList from "./AllergiesList"
import { AdminContext } from ".."
import { default as DishDisplay } from "./Dish"
import axios from "axios"

const minuteThreshold = 4

const Card = ({ booking }: { booking: Booking }) => {
    const [watchTime, setWatchTime] = useState(0)
    const [start, setStart] = useState(false)
    const [activePopup, setActivePopup] = useState<boolean>(false)
    const { openModal, store, bookings, setBookings } = useContext(AdminContext)
    const time = booking ? new Date(booking.time.seconds * 1000) : new Date()

    const setDish = (i: number, dish: Dish) => {
        const newDishes = booking.menu.dishes.map((d, j) =>
            j === i ? dish : d
        )
        const newMenu = { ...booking.menu, dishes: newDishes }
        return axios
            .post("/api/bookings", {
                action: "updateMenu",
                booking,
                bookings,
                newMenu,
            })
            .then((r) => {
                setBookings([...r.data.bookings])
                newDishes.some((d) => d.status === "preparing")
                    ? setStart(true)
                    : restartTimer()
            })
            .catch((e) => console.log(e))
    }

    const restartTimer = () => {
        setWatchTime(0)
        setStart(false)
    }

    const changeGreeted = () => {
        let greeted = ""
        if (booking.greeted === "" || !booking.greeted) {
            greeted = "greeted"
        } else if (booking.greeted === "greeting") {
            greeted = "greeted"
        } else if (booking.greeted === "greeted") {
            greeted = ""
        }
        return axios
            .post("/api/bookings", {
                action: "updateGreeting",
                booking,
                bookings,
                greeted,
            })
            .then((r) => {
                setBookings([...r.data.bookings])
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        let interval = null
        if (start) {
            interval = setInterval(() => {
                setWatchTime((prevTime) => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [start])

    return (
        <>
            {booking ? (
                <>
                    {(booking.status === "open" ||
                        booking.status === "closed") && (
                        <div className="relative">
                            <div className="bg-white rounded-xl shadow-xl overflow-hidden relative flex flex-col">
                                <div
                                    className={`${
                                        activePopup ? "absolute" : "hidden"
                                    } top-0 left-0 w-full h-full z-40`}
                                    onClick={() => setActivePopup(false)}
                                ></div>
                                <div className="grid grid-cols-2 p-1">
                                    <label className="p-1">
                                        <span className="font-semibold">
                                            PAX:{" "}
                                        </span>
                                        <span>{booking.pax}</span>
                                    </label>
                                    <button
                                        onClick={() =>
                                            openModal("changeTable", booking)
                                        }
                                        className="text-left p-1"
                                    >
                                        <span className="font-semibold">
                                            TABLE:{" "}
                                        </span>
                                        <span>{booking.table}</span>
                                    </button>
                                    <label className="p-1 flex gap-1 flex-wrap">
                                        <span className="font-semibold">
                                            NAME:{" "}
                                        </span>
                                        <span>{booking.name}</span>
                                    </label>
                                    <div
                                        onClick={() =>
                                            openModal("allergies", booking)
                                        }
                                        className="p-1 flex gap-1 flex-wrap"
                                    >
                                        <span className="font-semibold">
                                            ALLERGIES:
                                        </span>
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
                                        onClick={() =>
                                            openModal("time", booking)
                                        }
                                        className="p-1 flex gap-1 flex-wrap"
                                    >
                                        <span className="font-semibold">
                                            TIME:{" "}
                                        </span>
                                        <span>
                                            {time.toLocaleTimeString("es-ES", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <div
                                        onClick={() =>
                                            openModal("nationality", booking)
                                        }
                                        className="p-1 flex gap-1 flex-wrap"
                                    >
                                        <span className="font-semibold">
                                            NATIONALITY:{" "}
                                        </span>
                                        <span>{booking.nationality}</span>
                                    </div>
                                </div>
                                <div className="border-t">
                                    <div className="flex py-1 px-2 gap-4 items-center justify-between text-lg text-slate-800">
                                        <span className="p-1">
                                            <GiCrabClaw />
                                        </span>
                                        <button
                                            className={`${
                                                booking.pairings
                                                    ? booking.pairings
                                                          ?.length === 0
                                                        ? "bg-red-100 animate-pulse"
                                                        : "bg-green-100"
                                                    : "bg-red-100 animate-pulse"
                                            } p-1 rounded-lg`}
                                            onClick={() =>
                                                openModal("pairings", booking)
                                            }
                                        >
                                            <GiWineGlass />
                                        </button>
                                    </div>
                                    {booking.menu.dishes.map((dish, i) => (
                                        <DishDisplay
                                            key={i}
                                            i={i}
                                            dish={dish}
                                            setDish={setDish}
                                            booking={booking}
                                        />
                                    ))}
                                </div>
                                <div className="flex flex-grow border-t">
                                    <button
                                        className="flex-grow p-2 text-left"
                                        onClick={() =>
                                            openModal("notes", {
                                                booking,
                                                store,
                                            })
                                        }
                                    >
                                        <h1 className="text-sm font-semibold">
                                            Notes
                                        </h1>
                                        <span className="text-sm">
                                            {booking.notes}
                                        </span>
                                    </button>
                                    {booking.status === "open" && (
                                        <button
                                            onClick={changeGreeted}
                                            className={`p-2 flex transition items-center outline-none 
                  ${
                      booking.greeted === "" &&
                      "border-l text-red-500 bg-red-100 animate-pulse"
                  }
                  ${
                      booking.greeted === "greeting" &&
                      "border-l text-yellow-600 bg-yellow-100"
                  }
                  ${
                      booking.greeted === "greeted" &&
                      "text-white bg-green-400 line-through"
                  }
                      `}
                                        >
                                            <h1 className="text-sm font-semibold py-4">
                                                Welcome
                                            </h1>
                                        </button>
                                    )}
                                    <button
                                        className="absolute right-0 top-1 w-8 h-8 cursor-pointer transition flex justify-center items-center text-slate-800 hover:bg-gray-400 hover:text-white rounded-full z-50"
                                        onClick={() =>
                                            setActivePopup(!activePopup)
                                        }
                                    >
                                        <BsThreeDots className="rotate-90 text-xl opacity-25" />
                                    </button>
                                    <div
                                        className={`absolute top-8 right-2 transition ${
                                            !activePopup && "scale-0"
                                        } bg-gray-100 flex flex-col rounded shadow overflow-hidden z-50`}
                                    >
                                        {booking.status === "open" && (
                                            <h3
                                                className="text-red-600 hover:bg-red-600 hover:text-white px-6 cursor-pointer flex gap-2 items-center py-2"
                                                onClick={() =>
                                                    openModal(
                                                        "closeBooking",
                                                        booking
                                                    )
                                                }
                                            >
                                                <HiOutlinePlus className="rotate-45" />{" "}
                                                Close
                                            </h3>
                                        )}
                                        {booking.status === "closed" && (
                                            <h3
                                                className="text-green-600 hover:bg-green-600 hover:text-white px-6 cursor-pointer flex gap-2 items-center py-2"
                                                onClick={() =>
                                                    openModal(
                                                        "openBooking",
                                                        booking
                                                    )
                                                }
                                            >
                                                <HiOutlinePlus /> Reopen
                                            </h3>
                                        )}
                                    </div>
                                </div>
                                {watchTime > 700 && (
                                    <div className="absolute w-full -top-6 flex justify-center">
                                        <span
                                            className={`rounded px-4 text-2xl font-semibold w-32 flex justify-center 
                
                ${
                    watchTime < 0.75 * minuteThreshold * 60000
                        ? "bg-white"
                        : watchTime < minuteThreshold * 60000
                        ? "bg-yellow-400"
                        : "bg-red-400 animate-bounce"
                }
                
                `}
                                        >
                                            <span>
                                                {(
                                                    "0" +
                                                    Math.floor(
                                                        (watchTime / 60000) % 60
                                                    )
                                                ).slice(-2)}
                                                :
                                            </span>
                                            <span>
                                                {(
                                                    "0" +
                                                    Math.floor(
                                                        (watchTime / 1000) % 60
                                                    )
                                                ).slice(-2)}
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {booking.status === "waiting" && (
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden relative flex justify-between flex-shrink-0">
                            <div className="flex p-1">
                                <div className="flex flex-col">
                                    <label className="p-1 flex gap-1 flex-wrap">
                                        <span className="font-semibold">
                                            NAME:{" "}
                                        </span>
                                        <span>{booking.name}</span>
                                    </label>
                                    <label className="p-1">
                                        <span className="font-semibold">
                                            PAX:{" "}
                                        </span>
                                        <span>{booking.pax}</span>
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        onClick={() =>
                                            openModal("changeTable", booking)
                                        }
                                        className="text-left p-1"
                                    >
                                        <span className="font-semibold">
                                            TABLE:{" "}
                                        </span>
                                        <span>{booking.table}</span>
                                    </button>
                                    <div
                                        onClick={() =>
                                            openModal("time", booking)
                                        }
                                        className="p-1 flex gap-1"
                                    >
                                        <span className="font-semibold">
                                            TIME:{" "}
                                        </span>
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
                                onClick={() =>
                                    openModal("openBooking", booking)
                                }
                            >
                                Open Table
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <h1>Cargando...</h1>
            )}
        </>
    )
}

export default Card
