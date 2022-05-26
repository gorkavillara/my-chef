import React, { useContext, useState } from "react"
import { GiWineGlass } from "react-icons/gi"
import { BiDish } from "react-icons/bi"
import { HiOutlinePlus } from "react-icons/hi"
import { BsThreeDots } from "react-icons/bs"
import { AdminContext } from "../.."
import {
    editBookingGreeting,
    editBookingMenu,
} from "../../../../controllers/DBController"
import { Booking, Dish } from "../../../../models"
import AllergiesList from "../AllergiesList"
import { default as DishDisplay } from "../Dish"

const ActiveCard = ({
    booking,
    watchTime,
    timeLimit,
    setTimeLimit
}: {
    booking: Booking
    watchTime: number
    timeLimit: number
    setTimeLimit: React.Dispatch<React.SetStateAction<number>>
}) => {
    const [activePopup, setActivePopup] = useState<boolean>(false)
    const { bookings, setBookings, openModal } = useContext(AdminContext)
    const time = booking ? new Date(booking.time.seconds * 1000) : new Date()

    const setDish = async (i: number, dish: Dish) => {
        const newDishes = booking.menu.dishes.map((d, j) =>
            j === i ? dish : d
        )
        const newMenu = { ...booking.menu, dishes: newDishes }
        return editBookingMenu({
            booking,
            bookings,
            newMenu,
        })
            .then((data) => setBookings([...data.bookings]))
            .catch((e) => console.error(e))
    }
    const changeGreeted = async () => {
        let greeted = ""
        if (booking.greeted === "" || !booking.greeted) {
            greeted = "greeted"
        } else if (booking.greeted === "greeting") {
            greeted = "greeted"
        } else if (booking.greeted === "greeted") {
            greeted = ""
        }
        return editBookingGreeting({
            booking,
            bookings,
            greeted,
        })
            .then((data) => setBookings([...data.bookings]))
            .catch((e) => console.log(e))
    }
    return booking ? (
        <>
            <div
                className="bg-white rounded-xl shadow-xl relative flex flex-col"
            >
                <div
                    className={`${
                        activePopup ? "absolute" : "hidden"
                    } top-0 left-0 w-full h-full z-40`}
                    onClick={() => setActivePopup(false)}
                ></div>
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
                {booking.menu?.dishes ? (
                    <div className="border-t">
                        <div className="flex py-2 px-2 gap-4 items-center justify-between text-2xl text-slate-800">
                            <span className="p-2">
                                <BiDish />
                            </span>
                            <button
                                className={`${
                                    booking.pairings
                                        ? booking.pairings?.length === 0
                                            ? "bg-red-100 animate-pulse"
                                            : "bg-green-100"
                                        : "bg-red-100 animate-pulse"
                                } p-2 rounded-lg`}
                                onClick={() => openModal("pairings", booking)}
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
                                setTimeLimit={setTimeLimit}
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
                    <button
                        className="flex-grow p-4 text-left"
                        onClick={() => openModal("notes", { booking })}
                    >
                        <h1 className="text-xl font-semibold">Notes</h1>
                        <span className="text-xl">{booking.notes}</span>
                    </button>
                    {booking.status === "open" && (
                        <button
                            onClick={changeGreeted}
                            className={`p-4 flex rounded-br-xl transition items-center outline-none 
                  ${
                      !booking.greeted || booking.greeted === ""
                          ? "border-l text-red-500 bg-red-100 animate-pulse"
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
                            <h1 className="text-xl font-semibold py-4">
                                Welcome
                            </h1>
                        </button>
                    )}
                    <button
                        className="absolute right-0 top-1 w-8 h-8 cursor-pointer transition flex justify-center items-center text-slate-800 hover:bg-gray-400 hover:text-white rounded-full z-50"
                        onClick={() => setActivePopup(!activePopup)}
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
                                className="bg-red-500 text-white px-6 cursor-pointer flex gap-2 items-center py-2"
                                onClick={() =>
                                    openModal("closeBooking", booking)
                                }
                            >
                                <HiOutlinePlus className="rotate-45" /> Close Booking
                            </h3>
                        )}
                        {booking.status === "closed" && (
                            <h3
                                className="text-green-600 hover:bg-green-600 hover:text-white px-6 cursor-pointer flex gap-2 items-center py-2"
                                onClick={() =>
                                    openModal("openBooking", booking)
                                }
                            >
                                <HiOutlinePlus /> Reopen Booking
                            </h3>
                        )}
                    </div>
                </div>
                {watchTime > 700 && (
                    <div className="absolute w-full -top-6 flex justify-center">
                        <span
                            className={`rounded-lg shadow-lg px-4 text-2xl font-semibold w-32 flex justify-center ${
                                timeLimit === 0 || watchTime < 0.75 * timeLimit * 60000
                                    ? "bg-white"
                                    : watchTime < timeLimit * 60000
                                    ? "bg-yellow-400"
                                    : "bg-red-400 animate-bounce text-white"
                            }
                    `}
                        >
                            <span>
                                {(
                                    "0" + Math.floor((watchTime / 60000) % 60)
                                ).slice(-2)}
                                :
                            </span>
                            <span>
                                {(
                                    "0" + Math.floor((watchTime / 1000) % 60)
                                ).slice(-2)}
                            </span>
                        </span>
                    </div>
                )}
            </div>
        </>
    ) : null
}

export default ActiveCard
