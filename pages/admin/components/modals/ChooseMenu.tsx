import React, { useContext, useState } from "react"
import { AdminContext } from "../.."
import { editBookingMenu } from "../../../../controllers/DBController"
import { Menu } from "../../../../models"

const ChooseMenu = ({ booking }) => {
    const [chosenMenu, setChosenMenu] = useState<Menu>(null)
    const { store, bookings, setBookings, closeModal } = useContext(AdminContext)
    const selectMenu = (menu: Menu) => {
        setChosenMenu(menu)
    }
    const chooseMenu = async () => {
        return editBookingMenu({
            booking,
            bookings,
            newMenu: chosenMenu,
        })
            .then((data) => {
                setBookings([...data.bookings])
                closeModal()
            })
            .catch((e) => console.error(e))
    }
    return store ? (
        <div className="w-full flex flex-col gap-4 text-center items-center">
            <h1 className="text-lg font-semibold">
                Choose a menu for this table
            </h1>
            <div className="w-full flex gap-4">
                {store.menus?.map((menu, i) => (
                    <button
                        key={i}
                        className={`p-4 flex flex-col gap-4 shadow rounded border-2 transition active:ring ring-slate-50 ${
                            menu.name === chosenMenu?.name
                                ? "bg-green-200 border-green-400"
                                : "bg-slate-50 border-slate-200"
                        }`}
                        onClick={() => selectMenu(menu)}
                    >
                        <span className="text-lg font-semibold">
                            {menu.name}
                        </span>
                        <span>Dishes: {menu.dishes.length}</span>
                    </button>
                ))}
            </div>
            <button
                className="btn-primary-green max-w-lg"
                onClick={chooseMenu}
                disabled={chosenMenu === null}
            >
                Select menu
            </button>
        </div>
    ) : null
}

export default ChooseMenu
