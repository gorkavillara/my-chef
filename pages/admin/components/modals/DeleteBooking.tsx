import React, { useContext } from "react"
import { AdminContext } from "../.."
import { editBookingStatus } from "../../../../controllers/DBController"

const DeleteBooking = ({ booking }) => {
    const { setBookings, bookings, closeModal } = useContext(AdminContext)
    const closeBooking = () => {
        closeModal()
        return editBookingStatus({ booking, bookings, newStatus: "deleted" })
            .then((data) => setBookings(data.bookings))
            .catch((e) => console.error(e))
    }
    return booking ? (
        <div className="w-full flex flex-col gap-4 text-center items-center">
            <span className="text-lg">
                Are you sure you want to delete booking {booking.table} permanently?
            </span>
            <button
                className="btn-primary-green max-w-lg"
                onClick={closeBooking}
            >
                Yes, delete it!
            </button>
        </div>
    ) : null
}

export default DeleteBooking
