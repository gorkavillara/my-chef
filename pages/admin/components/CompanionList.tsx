import React from "react"
import { Dish } from "../../../models"
import { GiWineGlass } from "react-icons/gi"
import { BiDish } from "react-icons/bi"

const CompanionList = ({ dish }: { dish: Dish }) => {
    return dish ? (
        <div className="flex gap-1 flex-wrap">
            <div
                className={`flex gap-1 items-center p-1 rounded text-2xl ${
                    dish.side
                        ? "bg-green-300 text-green-700"
                        : "bg-slate-100 text-slate-300"
                }`}
            >
                <BiDish />
            </div>
            <div
                className={`flex gap-1 items-center p-1 rounded text-2xl ${
                    dish.pairings && dish.pairings.length > 0
                        ? "bg-green-300 text-green-700"
                        : "bg-slate-100 text-slate-300"
                }`}
            >
                <GiWineGlass />
            </div>
        </div>
    ) : null
}

export default CompanionList
