import React from "react"
import { Pairing } from "../../../models"
import Color from "./Color"

const Dish = ({ dish, allergies }) =>
    dish.status === "preparing" ? (
        <div
            className={`flex-grow text-lg px-2 rounded-lg flex justify-between items-center text-yellow-700 bg-yellow-200 italic ${
                dish.allergies?.some((all) => allergies?.indexOf(all) >= 0)
                    ? "text-red-500"
                    : ""
            }`}
        >
            <span className="line-through">{dish.name}</span>
        </div>
    ) : dish.status === "served" ? (
        <div
            className={`flex-grow text-lg px-2 rounded-lg flex justify-between items-center text-slate-300 bg-slate-100 italic ${
                dish.allergies?.some((all) => allergies?.indexOf(all) >= 0)
                    ? "text-red-500"
                    : ""
            }`}
        >
            <span className="line-double">{dish.name}</span>
        </div>
    ) : (
        <div
            className={`flex-grow text-lg px-2 rounded-lg flex justify-between items-center text-slate-800 ${
                dish.allergies?.some((all) => allergies?.indexOf(all) >= 0)
                    ? "text-red-500"
                    : ""
            }`}
        >
            <span>{dish.name}</span>
        </div>
    )

const DishDisplayInactive = ({ dish, booking }) => {
    // return false ? (
    return dish ? (
        <div className="flex py-1 px-2 gap-4 items-center cursor-pointer">
            <div
                className={`w-3 h-3 rounded-full ${
                    dish.side ? "bg-green-500" : "bg-slate-100"
                }`}
            ></div>
            <Dish dish={dish} allergies={booking.allergies} />
            {dish.notes && dish.notes.length > 0 && (
                <>
                    <div className="border flex items-center rounded-lg p-1 text-2xl">
                        <span className="text-left w-16 text-sm truncate text-ellipsis">
                            {dish.notes[0].text}
                        </span>
                        {dish.notes[0].tags.length > 0 && (
                            <div className="flex items-center gap-1">
                                {dish.notes[0].tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-sm bg-blue-400 text-white rounded-full p-1"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {dish.notes.length > 1 && (
                        <div className="border flex items-center rounded-lg p-1 text-2xl">
                            <span className="text-left text-sm">
                                +{dish.notes.length - 1}
                            </span>
                        </div>
                    )}
                </>
            )}
            <div className="flex gap-1">
                {dish.wine ? (
                    booking.pairings?.length > 0 ? (
                        booking.pairings?.map((pairing: Pairing, i: number) => (
                            <Color key={i} color={pairing.color} />
                        ))
                    ) : (
                        <Color color="waiting" />
                    )
                ) : (
                    <Color color="disabled" />
                )}
            </div>
        </div>
    ) : null
}

export default DishDisplayInactive
