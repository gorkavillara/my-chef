import React, { useContext, useState } from "react"
import { AdminContext } from "../.."
import { changeTable } from "../../../../controllers/DBController"
import { Booking } from "../../../../models"
import Input from "../forms/Input"

const ChangeTable = ({ booking }: { booking: Booking }) => {
    const [loading] = useState<boolean>(false)
    const [selectedTablesArray, setSelectedTablesArray] = useState<string[]>(
        booking && booking.table ? booking.table.split(", ") : []
    )

    const { setBookings, bookings, closeModal, store } =
        useContext(AdminContext)
    const changeBookingTable = () => {
        const newTable = selectedTablesArray.join(", ")
        closeModal()
        return changeTable({
            booking,
            bookings,
            newTable,
        })
            .then((data) => setBookings(data.bookings))
            .catch((e) => console.error(e))
    }

    const toggleTable = (table: string) => {
        let tabs = []
        if (selectedTablesArray.some((tab) => tab === table)) {
            tabs = selectedTablesArray.filter((tab) => tab !== table)
        } else {
            tabs = [...selectedTablesArray, table]
        }
        tabs = tabs.filter((tab) => tab !== "")
        setSelectedTablesArray([...tabs])
    }

    const tableNames = store ? store.tables.map((tab) => tab.name) : []

    return booking ? (
        <div className="flex flex-col gap-4 items-stretch justify-between">
            <div className="flex flex-col gap-4">
                <span className="text-lg font-semibold">
                    Change booking time for {booking.table}
                </span>
                <Input
                    type="chip-select"
                    color="blue"
                    name="table"
                    value={selectedTablesArray}
                    options={tableNames}
                    disabled={loading}
                    onChange={toggleTable}
                />
            </div>
            <button
                className="btn-primary-green max-w-lg self-center"
                onClick={changeBookingTable}
                disabled={loading}
            >
                Save changes
            </button>
        </div>
    ) : null
}

export default ChangeTable
