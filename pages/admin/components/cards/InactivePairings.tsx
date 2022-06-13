import React from "react"
import { Booking, Dish, Pairing } from "../../../../models"
import Color from "../Color"

const InactivePairings = ({
    booking,
    dish
}: {
    booking: Booking
    dish: Dish
}) => {
    const activePairings = booking && booking.pairings?.filter((bookPairing: Pairing) =>
        dish.pairings?.some(
            (dishPairing: Pairing) => bookPairing.name === dishPairing.name
        )
    )
    return booking && (
        <span
            className="flex gap-1"
        >
            {activePairings && activePairings.length > 0 ? (
                activePairings.map((p: Pairing) => (
                    <Color size="md" key={p.name} color={p.color} />
                ))
            ) : (
                <Color size="md" color="disabled" />
            )}
        </span>
    )
}

export default InactivePairings
