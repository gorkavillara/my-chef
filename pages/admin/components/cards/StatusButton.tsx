import React from "react"

const StatusButton = ({
    status = "default",
    onClick,
}: {
    status?: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
    const statusVariables = {
        seated: {
            classNames: "bg-green-100 border-green-300 text-green-500",
            text: "Seated",
        },
        arrived: {
            classNames: "bg-yellow-100 border-yellow-300 text-yellow-500",
            text: "Arrived",
        },
        default: {
            classNames: "bg-slate-100 border-slate-300 text-slate-500",
            text: "Waiting",
        },
    }
    return (
        <button
            className={`px-3 py-1 flex gap-1 flex-wrap rounded-lg font-semibold border ${statusVariables[status].classNames}`}
            onClick={onClick}
        >
            {statusVariables[status].text}
        </button>
    )
}

export default StatusButton
