import React, { useContext } from "react"
import { AdminContext } from "../.."
import { Booking } from "../../../../models"
import { GiWineGlass } from "react-icons/gi"
import { BiDish } from "react-icons/bi"
import { default as DishDisplay } from "../Dish"

const BookingBody = ({
    booking,
    stopped,
    toggleStop,
    changeStatus,
    notRandom,
}: {
    booking: Booking
    stopped: boolean
    toggleStop: React.MouseEventHandler<HTMLButtonElement>
    changeStatus: Function
    notRandom?: boolean
}) => {
    const { openModal } = useContext(AdminContext)
    return booking.menu?.dishes ? (
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
                    booking={booking}
                    stopped={stopped}
                    toggleStop={toggleStop}
                    changeStatus={changeStatus}
                    notRandom={notRandom}
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
    )
}

export default BookingBody
