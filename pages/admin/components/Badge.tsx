import React from "react"

const Badge = ({
    text,
    color,
    size,
    opacity = 100,
}: {
    text: string
    color: "slate" | "gray" | "blue" | "red" | "green" | "yellow"
    size: "sm" | "base" | "lg"
    opacity?: 25 | 50 | 75 | 100
}) => {
    return (
        <span
            className={`text-${size} bg-${color}-200 text-${color}-600 rounded-full px-3 py-0 opacity-${opacity}`}
        >
            {text}
        </span>
    )
}

export default Badge
