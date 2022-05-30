import React, { useContext } from "react"
import { MdDraw } from "react-icons/md"
import { IoText } from "react-icons/io5"
import { AdminContext } from ".."
import { Note, Pairing } from "../../../models"
import Color from "./Color"

const Dish = ({ dish, booking, setDish, setTimeLimit, i }) => {
    const { openModal } = useContext(AdminContext)
    const changeStatus = () => {
        let newStatus = dish.status ? dish.status : "waiting"
        if (!dish.status || dish.status === "waiting") {
            newStatus = "preparing"
        } else if (dish.status === "preparing") {
            newStatus = "served"
        } else if (dish.status === "served") {
            newStatus = "waiting"
        }
        const newDish = { ...dish, status: newStatus }
        setDish(i, newDish)
        setTimeLimit(newDish.timeLimit ? newDish.timeLimit : 0)
        return
    }
    return dish ? (
        <div className="flex py-1 px-4 gap-4 items-center cursor-pointer">
            <button
                className={`w-4 h-4 rounded-full ${
                    dish.side ? "bg-green-500" : "bg-slate-100"
                }`}
                onClick={() => openModal("dishOptions", { booking, dish })}
            ></button>
            <div
                className={`flex-grow rounded-2xl px-4 py-2 flex justify-between items-center ${
                    dish.allergies?.some(
                        (all) => booking.allergies?.indexOf(all) >= 0
                    )
                        ? "text-red-500"
                        : ""
                }
        ${dish.status === "preparing" && "text-yellow-700 bg-yellow-200 italic"}
        ${dish.status === "prepared" && "text-green-700 bg-green-200 italic"}
        ${dish.status === "served" && "text-slate-300 bg-slate-100 italic"}
        `}
                onClick={changeStatus}
            >
                <span
                    className={`text-2xl
          ${dish.status === "preparing" && "line-through"} 
          ${
              (dish.status === "prepared" || dish.status === "served") &&
              "line-double"
          }`}
                >
                    {dish.name}
                </span>
            </div>
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

export default Dish
