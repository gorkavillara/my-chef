import React, {
    useContext,
    Dispatch,
    SetStateAction,
    MouseEventHandler,
} from "react"
import { AdminContext } from "../.."
import { Booking } from "../../../../models"
import { HiOutlinePlus, HiTrash } from "react-icons/hi"
import { BsThreeDots } from "react-icons/bs"

const BookingFooter = ({
    booking,
    activePopup,
    setActivePopup,
    changeGreeted,
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
                    className={`flex items-center rounded-br-xl p-4 outline-none transition 
                  ${
                      !booking.greeted || booking.greeted === ""
                          ? "animate-pulse border-l bg-red-100 text-red-500"
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
                    <h1 className="py-4 text-xl font-semibold">Welcome</h1>
                </button>
            )}
            <button
                className="absolute right-0 top-1 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-800 transition hover:bg-gray-400 hover:text-white"
                onClick={() => setActivePopup(!activePopup)}
            >
                <BsThreeDots className="rotate-90 text-xl opacity-25" />
            </button>
            <div
                className={`absolute top-8 right-2 transition ${
                    !activePopup && "scale-0"
                } z-50 flex flex-col overflow-hidden rounded bg-gray-100 shadow`}
            >
                {booking.status === "open" && (
                    <h3
                        className="flex cursor-pointer items-center gap-2 bg-red-500 px-6 py-2 text-white"
                        onClick={() => openModal("closeBooking", booking)}
                    >
                        <HiOutlinePlus className="rotate-45" /> Close Booking
                    </h3>
                )}
                {booking.status === "closed" && (
                    <div className="">
                        <button
                            className="flex cursor-pointer items-center gap-2 px-6 py-2 text-green-600 hover:bg-green-600 hover:text-white"
                            onClick={() => openModal("openBooking", booking)}
                        >
                            <HiOutlinePlus /> Reopen Booking
                        </button>
                        <button
                            className="flex cursor-pointer items-center gap-2 bg-red-600 px-6 py-2 text-white"
                            onClick={() => openModal("deleteBooking", booking)}
                        >
                            <HiTrash /> Delete Permanently
                        </button>
                    </div>
                )}
            </div>
        </div>
    ) : null
}

export default BookingFooter
