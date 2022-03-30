import React from "react"
import { colors } from "../../../utils/colors"

const PlaceHolder = ({ name }) => {
    const color = colors.find(
        (col) => col.letter.toLowerCase() === name[0].toLowerCase()
    )
    return (
        <div
            style={{ backgroundColor: color ? color.color : "#999999" }}
            className={`h-full w-full flex justify-center items-center`}
        >
            <span className="text-white text-4xl font-semibold">
                {name[0].toUpperCase()}
            </span>
        </div>
    )
}

export default PlaceHolder
