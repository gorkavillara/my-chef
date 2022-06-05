import React, { useContext, useState } from "react"
import { AdminContext } from "../.."
import { Booking } from "../../../../models"
import { setDinnerStatus } from "../../../../controllers/DBController"
import Color from "../Color"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

type Status = {
    name: string
    color: string
}

const allStatuses = [
    {
        name: "default",
        color: "slate",
    },
    {
        name: "arrived",
        color: "yellow",
    },
    {
        name: "seated",
        color: "green",
    },
]

const camelize = (str: string) =>
    str.replace(/([a-z])/, (char) => char.toUpperCase())

const DinnerStatusModal = ({ booking }: { booking: Booking }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [currentStatus, setCurrentStatus] = useState<string>(
        booking.dinnerStatus ? booking.dinnerStatus : "default"
    )
    const { bookings, closeModal } = useContext(AdminContext)
    const isSelected = (status: Status) => currentStatus === status.name
    const toggleSelected = (status: Status) => setCurrentStatus(status.name)
    const updateDinnerStatus = () => {
        setLoading(true)
        setDinnerStatus({ booking, bookings, newStatus: currentStatus })
            .then(() => null)
            .catch((e) => console.error(e))
            .finally(() => closeModal())
    }
    return booking ? (
        <div className="w-full flex flex-col gap-4 text-center items-center">
            <h1 className="text-lg font-semibold">
                Choose this table{"'"}s status
            </h1>
            <div className="w-full flex flex-col gap-2">
                {allStatuses.map((status: Status, i: number) => (
                    <button
                        key={i}
                        className={`flex justify-between items-center rounded-lg py-2 px-4 ${
                            isSelected(status)
                                ? "bg-green-200 border-green-400"
                                : "bg-slate-50 border-slate-100"
                        } border-2`}
                        onClick={() => toggleSelected(status)}
                    >
                        <span>{camelize(status.name)}</span>
                        <Color color={status.color} />
                    </button>
                ))}
            </div>
            <button
                className="btn-primary-green max-w-lg"
                onClick={updateDinnerStatus}
                disabled={loading}
            >
                {loading ? (
                    <span className="flex justify-center items-center gap-2">
                        <AiOutlineLoading3Quarters className="animate-spin" /> Loading
                    </span>
                ) : (
                    "Save"
                )}
            </button>
        </div>
    ) : null
}

export default DinnerStatusModal
