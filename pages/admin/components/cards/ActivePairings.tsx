import React from "react"
import { Booking, Dish, Pairing } from "../../../../models"
import Color from "../Color"

const ActivePairings = ({
    booking,
    dish,
    openModal,
}: {
    booking: Booking
    dish: Dish
    openModal: Function
}) => {
    const activePairings = booking && booking.pairings?.filter((bookPairing: Pairing) =>
        dish.pairings?.some(
            (dishPairing: Pairing) => bookPairing.name === dishPairing.name
        )
    )
    return booking && (
        <button
            className="flex gap-1"
            onClick={() => openModal("dishOptions", { booking, dish })}
        >
            {activePairings && activePairings.length > 0 ? (
                activePairings.map((p: Pairing) => (
                    <Color size="lg" key={p.name} color={p.color} />
                ))
            ) : (
                <Color size="lg" color="disabled" />
            )}
        </button>
    )
}

export default ActivePairings
