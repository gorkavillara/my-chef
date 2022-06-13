import React from "react"
import InactivePairings from "./cards/InactivePairings"

const Dish = ({ dish, allergies }) =>
    dish.status === "preparing" ? (
        <div className="flex flex-grow items-center justify-between rounded-lg bg-yellow-200 px-2 text-lg italic text-yellow-700">
            <span
                className={`line-through ${
                    dish.allergies?.some((all) => allergies?.indexOf(all) >= 0)
                        ? "text-red-700"
                        : ""
                }`}
            >
                {dish.name}
            </span>
        </div>
    ) : dish.status === "served" ? (
        <div className="flex flex-grow items-center justify-between rounded-lg bg-slate-100 px-2 text-lg italic text-slate-300">
            <span
                className={`line-double ${
                    dish.allergies?.some((all) => allergies?.indexOf(all) >= 0)
                        ? "text-red-300"
                        : ""
                }`}
            >
                {dish.name}
            </span>
        </div>
    ) : (
        <div
            className={`flex flex-grow items-center justify-between rounded-lg px-2 text-lg text-slate-800`}
        >
            <span
                className={`${
                    dish.allergies?.some((all) => allergies?.indexOf(all) >= 0)
                        ? "text-red-500"
                        : ""
                }`}
            >
                {dish.name}
            </span>
        </div>
    )

const DishDisplayInactive = ({ dish, booking }) => {
    return dish ? (
        <div className="flex cursor-pointer items-center gap-4 py-1 px-2">
            <div
                className={`h-3 w-3 rounded-full ${
                    dish.side ? "bg-green-500" : "bg-slate-100"
                }`}
            ></div>
            <Dish dish={dish} allergies={booking.allergies} />
            {dish.notes && dish.notes.length > 0 && (
                <>
                    <div className="flex items-center rounded-lg border p-1 text-2xl">
                        <span className="w-16 truncate text-ellipsis text-left text-sm">
                            {dish.notes[0].text}
                        </span>
                        {dish.notes[0].tags.length > 0 && (
                            <div className="flex items-center gap-1">
                                {dish.notes[0].tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-blue-400 p-1 text-sm text-white"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {dish.notes.length > 1 && (
                        <div className="flex items-center rounded-lg border p-1 text-2xl">
                            <span className="text-left text-sm">
                                +{dish.notes.length - 1}
                            </span>
                        </div>
                    )}
                </>
            )}
            <InactivePairings booking={booking} dish={dish} />
        </div>
    ) : null
}

export default DishDisplayInactive
