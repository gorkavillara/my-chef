import React, { useContext, Dispatch, SetStateAction, MouseEventHandler } from "react"
import { AdminContext } from "../.."
import { Booking } from "../../../../models"
import { HiOutlinePlus } from "react-icons/hi"
import { BsThreeDots } from "react-icons/bs"

const BookingFooter = ({
    booking,
    activePopup,
    setActivePopup,
    changeGreeted
}: {
    booking: Booking
    activePopup: boolean
    setActivePopup: Dispatch<SetStateAction<boolean>>
    changeGreeted: MouseEventHandler
}) => {
    const { openModal } = useContext(AdminContext)
    return booking ? (
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
                    <h1 className="text-xl font-semibold py-4">Welcome</h1>
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
                        onClick={() => openModal("closeBooking", booking)}
                    >
                        <HiOutlinePlus className="rotate-45" /> Close Booking
                    </h3>
                )}
                {booking.status === "closed" && (
                    <h3
                        className="text-green-600 hover:bg-green-600 hover:text-white px-6 cursor-pointer flex gap-2 items-center py-2"
                        onClick={() => openModal("openBooking", booking)}
                    >
                        <HiOutlinePlus /> Reopen Booking
                    </h3>
                )}
            </div>
        </div>
    ) : null
}

export default BookingFooter
