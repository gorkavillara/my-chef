import React, { useContext } from "react"
import { MdDraw } from "react-icons/md"
import { IoText } from "react-icons/io5"
import { FaRestroom } from "react-icons/fa"
import { AdminContext } from ".."
import { Booking, Dish, Note, Pairing } from "../../../models"
import Color from "./Color"

const Dish = ({ dish, allergies, onClick }) => (
    <button className="flex-grow" onClick={onClick}>
        {dish.status === "preparing" ? (
            <div className="text-2xl px-4 py-2 rounded-2xl flex justify-between items-center text-yellow-700 bg-yellow-200 italic">
                <span
                    className={`line-through ${
                        dish.allergies?.some(
                            (all) => allergies?.indexOf(all) >= 0
                        )
                            ? "text-red-700"
                            : ""
                    }`}
                >
                    {dish.name}
                </span>
            </div>
        ) : dish.status === "served" ? (
            <div className="text-2xl px-4 py-2 rounded-2xl flex justify-between items-center text-slate-300 bg-slate-100 italic">
                <span
                    className={`line-double ${
                        dish.allergies?.some(
                            (all) => allergies?.indexOf(all) >= 0
                        )
                            ? "text-red-300"
                            : ""
                    }`}
                >
                    {dish.name}
                </span>
            </div>
        ) : (
            <div
                className={`text-2xl px-4 py-2 rounded-2xl flex justify-between items-center text-slate-800`}
            >
                <span
                    className={`${
                        dish.allergies?.some(
                            (all) => allergies?.indexOf(all) >= 0
                        )
                            ? "text-red-500"
                            : ""
                    }`}
                >
                    {dish.name}
                </span>
            </div>
        )}
    </button>
)

const DishDisplayActive = ({
    dish,
    booking,
    i,
    toggleStop,
    stopped,
    changeStatus,
    notRandom = false,
}: {
    dish: Dish
    booking: Booking
    i: number
    toggleStop: React.MouseEventHandler<HTMLButtonElement>
    stopped: boolean
    changeStatus: Function
    notRandom?: boolean
}) => {
    const { openModal } = useContext(AdminContext)
    const isNext =
        booking &&
        booking.menu &&
        i === booking.menu.dishes.filter((d) => d.status === "served").length
    const isActive =
        booking &&
        booking.menu &&
        i ===
            booking.menu.dishes.filter((d) => d.status === "served").length - 1
    return dish ? (
        <div className="flex py-1 px-4 gap-4 items-center cursor-pointer">
            <button
                className={`w-4 h-4 rounded-full ${
                    dish.side ? "bg-green-500" : "bg-slate-100"
                }`}
                onClick={() => openModal("dishOptions", { booking, dish })}
            ></button>
            <Dish
                dish={dish}
                allergies={booking.allergies}
                onClick={() => {
                    if (!notRandom) return changeStatus(i)
                    if (isActive || isNext) return changeStatus(i)
                }}
            />
            <div className="flex items-center gap-1">
                {dish.notes &&
                    dish.notes.map((note: Note, i: number) => (
                        <button
                            key={i}
                            className="border flex items-center rounded-2xl p-3 text-2xl"
                            onClick={() =>
                                openModal("dishNotes", { booking, dish, note })
                            }
                        >
                            <span className="text-left w-24 text-lg truncate text-ellipsis">
                                {note.text}
                            </span>
                            {note.tags.length > 0 && (
                                <div className="flex items-center gap-1">
                                    {note.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-sm bg-blue-400 text-white rounded-full py-1 px-2"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </button>
                    ))}
                {!dish.notes || dish.notes.length <= 3 ? (
                    <button
                        className="border flex items-center rounded-2xl p-3 text-2xl opacity-25"
                        onClick={() =>
                            openModal("newDishNotes", { booking, dish })
                        }
                    >
                        +<IoText />
                    </button>
                ) : null}
                <button
                    className={`border flex items-center rounded-2xl p-3 text-2xl ${
                        dish.handwrittenNotesUrl ? "" : "opacity-25"
                    }`}
                    onClick={() =>
                        openModal("handwrittenNotesModal", { booking, dish })
                    }
                >
                    <MdDraw className="text-slate-800" />
                </button>
                <button
                    className={`border flex items-center rounded-2xl p-3 text-2xl ${
                        dish.status === "preparing" && stopped
                            ? "bg-yellow-200 animate-pulse text-yellow-600"
                            : "text-slate-800 opacity-25"
                    }`}
                    onClick={toggleStop}
                >
                    <FaRestroom />
                </button>
            </div>
            <button
                className="flex gap-1"
                onClick={() => openModal("dishOptions", { booking, dish })}
            >
                {dish.wine ? (
                    booking.pairings?.length > 0 ? (
                        booking.pairings?.map((pairing: Pairing, i: number) => (
                            <Color size="lg" key={i} color={pairing.color} />
                        ))
                    ) : (
                        <Color size="lg" color="waiting" />
                    )
                ) : (
                    <Color size="lg" color="disabled" />
                )}
            </button>
        </div>
    ) : null
}

export default DishDisplayActive
