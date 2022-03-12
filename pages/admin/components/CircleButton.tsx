import React, { MouseEventHandler } from "react"

type CircleButtonProps = {
    onClick?: MouseEventHandler
}

const CircleButton = ({ onClick }: CircleButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="my-8 w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-green-300 text-white flex justify-center items-center shadow-lg"
        >
            <span className="text-lg self-center">+</span>
        </button>
    )
}

export default CircleButton
