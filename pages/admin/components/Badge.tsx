import React from "react"

const Badge = ({
    text,
    color,
    size,
}: {
    text: string
    color: "slate" | "gray" | "blue" | "red" | "green" | "yellow"
    size: "sm" | "base" | "lg"
}) => {
    return (
        <span
            className={`text-${size} bg-${color}-200 text-${color}-600 rounded-full px-3 py-0`}
        >
            {text}
        </span>
    )
}

export default Badge
