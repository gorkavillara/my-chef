import React, { useContext, useState } from "react"
import { AdminContext } from "../.."
import {
    editBookingGreeting,
    editBookingMenu,
} from "../../../../controllers/DBController"
import { Booking, Dish, Menu } from "../../../../models"
import Timer from "./Timer"
import BookingHead from "./BookingHead"
import CardPopup from "./CardPopup"
import BookingFooter from "./BookingFooter"
import BookingBody from "./BookingBody"

const autoSelect: boolean = true
const notRandom: boolean = true

const ActiveCard = ({
    booking,
    watchTime,
    timeLimit,
    setTimeLimit,
    toggleStop,
    stopped,
}: {
    booking: Booking
    watchTime: number
    timeLimit: number
    setTimeLimit: React.Dispatch<React.SetStateAction<number>>
    toggleStop: React.MouseEventHandler<HTMLButtonElement>
    stopped: boolean
}) => {
    const [activePopup, setActivePopup] = useState<boolean>(false)
    const { bookings, setBookings } = useContext(AdminContext)
    const setDish = async (i: number, dish: Dish, prepareNext: boolean) => {
        const newDishes = booking.menu.dishes.map((d, j) =>
            j === i ? dish : d
        )
        if (prepareNext) {
            newDishes[i + 1].status = "preparing"
        }
        const newMenu = { ...booking.menu, dishes: newDishes }
        return editBookingMenu({
            booking,
            bookings,
            newMenu,
        })
            .then((data) => {
                setBookings([...data.bookings])
                return newDishes[i + 1]
            })
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
            .catch((e) => console.error(e))
    }
    const changeStatus = async (i: number) => {
        const dish = booking.menu.dishes[i]
        let newStatus = dish.status ? dish.status : "waiting"
        if (!dish.status || dish.status === "waiting") {
            newStatus = "preparing"
        } else if (dish.status === "preparing") {
            newStatus = "served"
        } else if (dish.status === "served") {
            newStatus = "waiting"
        }
        const newDish = { ...dish, status: newStatus }
        const resDish = await setDish(
            i,
            newDish,
            prepareNext(autoSelect, newStatus, booking.menu, i)
        )
        return resDish
            ? setTimeLimit(resDish.timeLimit ? resDish.timeLimit : 0)
            : null
    }
    const prepareNext = (
        autoSelect: boolean,
        newStatus: string,
        menu: Menu,
        i: number
    ) => {
        if (!autoSelect) return false
        if (newStatus !== "served") return false
        if (menu.dishes.length === i + 1) return false
        return true
    }
    return booking ? (
        <>
            <div className="bg-white rounded-xl shadow-xl relative flex flex-col">
                <CardPopup
                    activePopup={activePopup}
                    setActivePopup={setActivePopup}
                />
                <BookingHead booking={booking} />
                <BookingBody
                    booking={booking}
                    stopped={stopped}
                    toggleStop={toggleStop}
                    changeStatus={changeStatus}
                    notRandom={notRandom}
                />
                <BookingFooter
                    booking={booking}
                    activePopup={activePopup}
                    setActivePopup={setActivePopup}
                    changeGreeted={changeGreeted}
                />
                <Timer
                    watchTime={watchTime}
                    timeLimit={timeLimit}
                    stopped={stopped}
                    size="lg"
                />
            </div>
        </>
    ) : null
}

export default ActiveCard
