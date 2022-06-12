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

    const setDishes = (
        dishes: Dish[],
        status: string,
        prepareNext: boolean
    ) => {
        const newDishes = booking.menu.dishes.map((d: Dish) =>
            dishes.find((dish: Dish) => dish.name === d.name)
                ? {
                      ...dishes.find((dish: Dish) => dish.name === d.name),
                      status,
                  }
                : d
        )
        let newMenu: Menu
        let preparingDish: Dish
        // Si prepareNext -> Chequeamos cuál es el siguiente plato y si forma parte de un grupo lo ponemos a tope
        if (!prepareNext) {
            newMenu = { ...booking.menu, dishes: newDishes }
        } else {
            const nextIndex =
                booking.menu.dishes.findIndex(
                    (d: Dish) => dishes[dishes.length - 1].name === d.name
                ) + 1
            if (nextIndex < booking.menu.dishes.length) {
                preparingDish = booking.menu.dishes[nextIndex]
                const nextDishes = getGroupedDishes(preparingDish)
                const newNewDishes = newDishes.map((d: Dish) =>
                    nextDishes.find((dish: Dish) => dish.name === d.name)
                        ? {
                              ...nextDishes.find(
                                  (dish: Dish) => dish.name === d.name
                              ),
                              status: "preparing",
                          }
                        : d
                )
                newMenu = { ...booking.menu, dishes: newNewDishes }
            } else {
                newMenu = { ...booking.menu, dishes: newDishes }
            }
        }
        return editBookingMenu({
            booking,
            bookings,
            newMenu,
        })
            .then((data) => {
                setBookings([...data.bookings])
                return preparingDish ? preparingDish : null
            })
            .catch((e) => console.error(e))
    }

    const getGroupedDishes = (dish: Dish): Dish[] => {
        const groupedDishes =
            dish.groupId && dish.groupId !== 0
                ? booking.menu.dishes.filter(
                      (d: Dish) => d.groupId === dish.groupId
                  )
                : [dish]
        return groupedDishes
    }
    const changeStatus = async (i: number) => {
        const dish = booking.menu.dishes[i]
        // activeDishes son los dishes (que comparten grupo) que se han pulsado
        const activeDishes = getGroupedDishes(dish)
        let newStatus = dish.status ? dish.status : "waiting"
        if (!dish.status || dish.status === "waiting") {
            newStatus = "preparing"
        } else if (dish.status === "preparing") {
            newStatus = "served"
        } else if (dish.status === "served") {
            newStatus = "waiting"
        }

        const nextDish = await setDishes(
            activeDishes,
            newStatus,
            prepareNext(autoSelect, newStatus, booking.menu, i)
        )
        return nextDish
            ? setTimeLimit(nextDish.timeLimit ? nextDish.timeLimit : 0)
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
            <div className="relative flex flex-col rounded-xl bg-white shadow-xl">
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
